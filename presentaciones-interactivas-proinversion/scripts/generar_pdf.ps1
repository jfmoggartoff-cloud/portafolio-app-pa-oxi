<#
  Genera el PDF de la presentación (una página por escena) sin abrir el navegador, con Edge/Chrome.
  Útil para adjuntar por correo o publicar junto a la presentación. Es el mismo resultado que el botón «PDF» de la vista de audiencia.
  Uso: generar_pdf.ps1 -Url "http://localhost:8765/mi-presentacion/audiencia.html" -Lang es -Pdf "C:\...\presentacion-ES.pdf"
       (también acepta una ruta local: -Url "C:\...\salidas\mi-presentacion\audiencia.html"; en ese caso usa datos.js)
#>
param([Parameter(Mandatory)] [string]$Url, [string]$Lang = 'es', [Parameter(Mandatory)] [string]$Pdf)
$browser = @("C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "C:\Program Files\Microsoft\Edge\Application\msedge.exe", "C:\Program Files\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
if (Test-Path $Url) { $Url = 'file:///' + ((Resolve-Path $Url).Path -replace '\\', '/' -replace ' ', '%20') }
$u = $Url + "?pdf=1&lang=$Lang"
$prof = Join-Path $env:TEMP ('pinv-pdf-' + [guid]::NewGuid().ToString('N'))
$p = Start-Process -FilePath $browser -ArgumentList @('--headless=new', '--disable-gpu', "--user-data-dir=$prof", '--no-pdf-header-footer', '--virtual-time-budget=15000', "--print-to-pdf=$Pdf", $u) -PassThru -WindowStyle Hidden
$p.WaitForExit(120000) | Out-Null
Remove-Item $prof -Recurse -Force -ErrorAction SilentlyContinue
if (Test-Path $Pdf) { "PDF generado: $Pdf ({0:N1} MB)" -f ((Get-Item $Pdf).Length / 1MB) } else { throw 'No se generó el PDF.' }
