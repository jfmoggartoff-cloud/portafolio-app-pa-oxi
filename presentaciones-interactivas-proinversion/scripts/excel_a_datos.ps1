<#
  Convierte datos.xlsx en datos.js, para usar la presentación desde una USB o una carpeta local
  (los navegadores no permiten leer el Excel con file://). En un servidor web no es necesario:
  la presentación lee datos.xlsx directamente.
  Uso: excel_a_datos.ps1 -Salida "C:\...\salidas\mi-presentacion"
#>
param([Parameter(Mandatory)] [string]$Salida)
$ErrorActionPreference = 'Stop'
$Salida = (Resolve-Path $Salida).Path
$xlsx = Join-Path $Salida 'datos.xlsx'
if (-not (Test-Path $xlsx)) { throw "No existe $xlsx" }
$hojas = 'Cifras', 'Proyectos', 'Sectores', 'Series por sector', 'Series anuales', 'Distribución', 'Notas'
$xl = New-Object -ComObject Excel.Application
$xl.Visible = $false; $xl.DisplayAlerts = $false
$wb = $xl.Workbooks.Open($xlsx, 0, $true)   # solo lectura: no bloquea a quien lo esté editando
$wb.Application.Calculate()
$out = [ordered]@{}
foreach ($h in $hojas) {
  try { $ws = $wb.Worksheets.Item($h) } catch { continue }
  $v = $ws.UsedRange.Value2
  $r0 = $ws.UsedRange.Row
  $filas = New-Object System.Collections.ArrayList
  for ($k = 1; $k -lt $r0; $k++) { [void]$filas.Add(@()) }
  if ($v -is [array]) {
    $nr = $v.GetLength(0); $nc = $v.GetLength(1)
    for ($i = 1; $i -le $nr; $i++) {
      $fila = New-Object object[] $nc
      for ($j = 1; $j -le $nc; $j++) { $x = $v[$i, $j]; if ($x -is [double] -and [double]::IsNaN($x)) { $x = $null }; if ($x -is [int]) { $x = [double]$x }; $fila[$j - 1] = $x }
      [void]$filas.Add($fila)
    }
  }
  $out[$h] = $filas
}
$fecha = (Get-Item $xlsx).LastWriteTime
$wb.Close($false); $xl.Quit(); [void][Runtime.InteropServices.Marshal]::ReleaseComObject($xl); [GC]::Collect(); [GC]::WaitForPendingFinalizers()   # cierra Excel por completo
$json = @{ generado = $fecha.ToString('o'); fuente = 'datos.xlsx'; hojas = $out } | ConvertTo-Json -Depth 6 -Compress
$js = "/* Generado automáticamente desde datos.xlsx el $(Get-Date -Format 'dd/MM/yyyy HH:mm'). No editar: actualice el Excel y vuelva a ejecutar excel_a_datos.ps1 */`nwindow.DATOS_EXCEL = $json;`n"
[IO.File]::WriteAllText((Join-Path $Salida 'datos.js'), $js, (New-Object Text.UTF8Encoding $false))
"datos.js actualizado ({0:N0} KB) desde datos.xlsx del {1}" -f ((Get-Item (Join-Path $Salida 'datos.js')).Length / 1KB), $fecha.ToString('dd/MM/yyyy HH:mm')
