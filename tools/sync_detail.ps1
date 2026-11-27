param(
  [Parameter(Mandatory=$true)][string]$JsonPath,
  [Parameter(Mandatory=$true)][string]$WorkbookPath
)

$ErrorActionPreference = "Stop"
$utf8 = New-Object System.Text.UTF8Encoding($false)
[Console]::InputEncoding = $utf8
[Console]::OutputEncoding = $utf8
$OutputEncoding = $utf8
$excel = $null
$workbook = $null

function Get-CellText($sheet, [int]$row, [int]$column) {
  return [string]$sheet.Cells.Item($row, $column).Text
}

try {
  if (-not (Test-Path -LiteralPath $WorkbookPath)) {
    throw "找不到檢測細目檔案：$WorkbookPath"
  }

  $payload = Get-Content -LiteralPath $JsonPath -Raw -Encoding UTF8 | ConvertFrom-Json
  $caseNo = [string]$payload.caseNo
  if ([string]::IsNullOrWhiteSpace($caseNo)) {
    throw "案件缺少案件編號。"
  }
  $syncKey = [string]$payload.syncKey
  if ([string]::IsNullOrWhiteSpace($syncKey)) {
    $syncKey = $caseNo
  }

  $syncDate = [datetime]::Today
  if ($payload.syncDate) {
    $syncDate = [datetime]::Parse([string]$payload.syncDate)
  }
  $rocYear = $syncDate.Year - 1911
  $month = $syncDate.Month
  $serviceType = [string]$payload.serviceType
  $isPaper = $serviceType -eq "paper"
  $serviceLabel = if ($isPaper) { "紙張適性檢測" } else { "印刷品適性檢測" }
  $testPrefix = if ($isPaper) { "P" } else { "PR" }

  $backupDir = Join-Path (Split-Path -Parent $WorkbookPath) "檢測細目備份"
  New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
  $stamp = Get-Date -Format "yyyyMMdd_HHmmss"
  $backupPath = Join-Path $backupDir (([IO.Path]::GetFileNameWithoutExtension($WorkbookPath)) + "_同步前_" + $stamp + [IO.Path]::GetExtension($WorkbookPath))
  Copy-Item -LiteralPath $WorkbookPath -Destination $backupPath -Force

  $excel = New-Object -ComObject Excel.Application
  $excel.Visible = $false
  $excel.DisplayAlerts = $false
  $workbook = $excel.Workbooks.Open($WorkbookPath, 0, $false)
  $sheet = $null
  foreach ($candidate in $workbook.Worksheets) {
    if ($candidate.Name -eq "收費一覽表") {
      $sheet = $candidate
      break
    }
  }
  if ($null -eq $sheet) {
    foreach ($candidate in $workbook.Worksheets) {
      if ($candidate.Name -ne "_Web同步紀錄" -and $candidate.Visible -eq -1) {
        $sheet = $candidate
        break
      }
    }
  }
  if ($null -eq $sheet) {
    throw "找不到檢測細目工作表。"
  }

  $logSheet = $null
  foreach ($candidate in $workbook.Worksheets) {
    if ($candidate.Name -eq "_Web同步紀錄") {
      $logSheet = $candidate
      break
    }
  }
  if ($null -eq $logSheet) {
    $logSheet = $workbook.Worksheets.Add()
    $logSheet.Name = "_Web同步紀錄"
    $logSheet.Cells.Item(1, 1).Value2 = "同步識別碼"
    $logSheet.Cells.Item(1, 2).Value2 = "同步時間"
    $logSheet.Cells.Item(1, 3).Value2 = "工作表列"
    $logSheet.Cells.Item(1, 4).Value2 = "案件編號"
    $logSheet.Visible = 2
  }

  $usedLogRows = $logSheet.UsedRange.Rows.Count
  for ($row = 2; $row -le $usedLogRows; $row++) {
    if ([string]$logSheet.Cells.Item($row, 1).Text -eq $syncKey) {
      throw "案件 $caseNo 已同步過檢測細目，未重複寫入。"
    }
  }

  $monthHeaderRow = 0
  $subtotalRow = 0
  $lastUsedRow = $sheet.UsedRange.Rows.Count
  for ($row = 1; $row -le $lastUsedRow; $row++) {
    $monthValue = $sheet.Cells.Item($row, 3).Value2
    $numericMonth = 0
    if ($null -ne $monthValue) {
      [int]::TryParse(
        ([string]$monthValue),
        [Globalization.NumberStyles]::Any,
        [Globalization.CultureInfo]::InvariantCulture,
        [ref]$numericMonth
      ) | Out-Null
    }
    if ($numericMonth -eq $month -and (Get-CellText $sheet $row 5) -match "月") {
      $monthHeaderRow = $row
      break
    }
  }
  if ($monthHeaderRow -eq 0) {
    throw "在檢測細目中找不到 ${month} 月份區段。"
  }
  for ($row = $monthHeaderRow + 1; $row -le $lastUsedRow; $row++) {
    if ((Get-CellText $sheet $row 9).Trim() -eq "小計") {
      $subtotalRow = $row
      break
    }
  }
  if ($subtotalRow -eq 0) {
    throw "找不到 ${month} 月份的小計列。"
  }

  $targetRow = 0
  for ($row = $monthHeaderRow + 1; $row -lt $subtotalRow; $row++) {
    if ([string]::IsNullOrWhiteSpace((Get-CellText $sheet $row 1)) -and [string]::IsNullOrWhiteSpace((Get-CellText $sheet $row 6))) {
      $targetRow = $row
      break
    }
  }
  if ($targetRow -eq 0) {
    $targetRow = $subtotalRow
    $sheet.Rows.Item($targetRow).Insert() | Out-Null
    $sourceRow = [Math]::Max($monthHeaderRow + 1, $targetRow - 1)
    $sheet.Rows.Item($sourceRow).Copy()
    $sheet.Rows.Item($targetRow).PasteSpecial(-4122) | Out-Null
    $sheet.Range("A${targetRow}:V${targetRow}").ClearContents()
    $subtotalRow = $targetRow + 1
    $firstDataRow = $monthHeaderRow + 1
    $sheet.Cells.Item($subtotalRow, 10).Formula = "=SUM(J${firstDataRow}:J${targetRow})"
  }

  $maxSequence = 0
  $maxTypeSequence = 0
  for ($row = 1; $row -le $sheet.UsedRange.Rows.Count; $row++) {
    $serialText = (Get-CellText $sheet $row 1).Trim()
    if ($serialText -match "^${rocYear}(\d{3})$") {
      $maxSequence = [Math]::Max($maxSequence, [int]$Matches[1])
    }
    $typeText = (Get-CellText $sheet $row 2).Trim()
    if ($typeText -match ("^" + [regex]::Escape($serviceLabel) + "(\d+)$")) {
      $maxTypeSequence = [Math]::Max($maxTypeSequence, [int]$Matches[1])
    }
  }

  $sequence = $maxSequence + 1
  $typeSequence = $maxTypeSequence + 1
  $serialNumber = [int]("{0}{1:000}" -f $rocYear, $sequence)
  $testNumber = "{0}{1:00}{2}" -f $testPrefix, $typeSequence, $rocYear
  $itemNames = @($payload.itemNames | ForEach-Object { [string]$_ }) -join "、"
  $caseType = [string]$payload.caseType
  if ($caseType -eq "一般件") { $caseType = "" }

  $sheet.Cells.Item($targetRow, 1).Value2 = $serialNumber
  $sheet.Cells.Item($targetRow, 2).Formula = "'${serviceLabel}${typeSequence}"
  $sheet.Cells.Item($targetRow, 3).NumberFormat = "@"
  $sheet.Cells.Item($targetRow, 3).Formula = "'${testNumber}"
  $sheet.Cells.Item($targetRow, 6).Formula = "'$([string]$payload.companyName)"
  $sheet.Cells.Item($targetRow, 7).Value = $syncDate
  $sheet.Cells.Item($targetRow, 9).Formula = "'${itemNames}"
  $sheet.Cells.Item($targetRow, 10).Value2 = [double]$payload.amount
  $sheet.Cells.Item($targetRow, 11).Formula = "'${caseType}"

  $nextLogRow = $logSheet.UsedRange.Rows.Count + 1
  if ($nextLogRow -lt 2) { $nextLogRow = 2 }
  $logSheet.Cells.Item($nextLogRow, 1).Formula = "'${syncKey}"
  $logSheet.Cells.Item($nextLogRow, 2).Formula = "'$((Get-Date).ToString("s"))"
  $logSheet.Cells.Item($nextLogRow, 3).Value2 = $targetRow
  $logSheet.Cells.Item($nextLogRow, 4).Formula = "'${caseNo}"

  $workbook.Save()
  $workbook.Close($true)
  $workbook = $null
  $excel.Quit()
  $excel = $null

  [pscustomobject]@{
    ok = $true
    caseNo = $caseNo
    row = $targetRow
    serialNumber = $serialNumber
    testNumber = $testNumber
    workbook = $WorkbookPath
    backup = $backupPath
  } | ConvertTo-Json -Compress
} catch {
  if ($null -ne $workbook) { $workbook.Close($false) }
  if ($null -ne $excel) { $excel.Quit() }
  throw
} finally {
  if ($null -ne $workbook) { [Runtime.InteropServices.Marshal]::ReleaseComObject($workbook) | Out-Null }
  if ($null -ne $excel) { [Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
