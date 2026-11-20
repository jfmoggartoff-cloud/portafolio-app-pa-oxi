# Captura cada escena (estado final) con Edge/Chrome sin interfaz, para control de calidad visual.
# Uso: capturar.ps1 -Url "http://localhost:8765/mi-presentacion/audiencia.html" -Total 37 -Lang es -Out "C:\tmp\qa"
param([string]$Url, [int]$Total, [string]$Lang = 'es', [string]$Out, [string]$Paso = 'final', [int[]]$Solo = $null)
$browser = @("C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "C:\Program Files\Microsoft\Edge\Application\msedge.exe", "C:\Program Files\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw 'No se encontro Edge ni Chrome.' }
New-Item -ItemType Directory -Force $Out | Out-Null
$prof = Join-Path $env:TEMP ('pinv-cap-' + [guid]::NewGuid().ToString('N'))
$list = if ($Solo) { $Solo } else { 1..$Total }
foreach ($i in $list) {
  $file = Join-Path $Out ('{0}-{1:D2}.png' -f $Lang, $i)
  $u = "$Url" + "?escena=$i&paso=$Paso&lang=$Lang&qa=1"
  $p = Start-Process -FilePath $browser -ArgumentList @('--headless=new', '--disable-gpu', '--hide-scrollbars', "--user-data-dir=$prof", '--window-size=1920,1080', '--virtual-time-budget=6000', "--screenshot=$file", $u) -PassThru -WindowStyle Hidden
  $p.WaitForExit(40000) | Out-Null
  if (Test-Path $file) { "ok $i" } else { "FALLO $i" }
}
Remove-Item $prof -Recurse -Force -ErrorAction SilentlyContinue
