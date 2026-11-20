<#
  Ensambla una presentación: copia el motor (HTML, CSS, JS) a la carpeta de salida.
  El contenido (contenido.js) y las imágenes (assets/img) los genera Claude en la carpeta de salida.
  Uso:  powershell -ExecutionPolicy Bypass -File ensamblar.ps1 -Salida "C:\...\salidas\mi-presentacion"
#>
param([Parameter(Mandatory)] [string]$Salida, [switch]$Nueva)
# Protección: si la carpeta no existe (p. ej. fue renombrada o movida), no se crea una vacía por error
if (-not $Nueva -and -not (Test-Path (Join-Path $Salida 'contenido.js'))) { throw "No existe una presentación en $Salida (falta contenido.js). Si es una presentación nueva, use -Nueva; si la carpeta fue renombrada o movida, use la ruta actual." }
$motor = Join-Path $PSScriptRoot '..\motor'
New-Item -ItemType Directory -Force (Join-Path $Salida 'assets\img') | Out-Null
Copy-Item (Join-Path $motor 'audiencia.html') $Salida -Force
Copy-Item (Join-Path $motor 'presentador.html') $Salida -Force
Copy-Item (Join-Path $motor 'index.html') $Salida -Force
Copy-Item (Join-Path $motor '.htaccess') $Salida -Force
Copy-Item (Join-Path $motor 'PUBLICAR-EN-SERVIDOR.md') $Salida -Force
foreach ($f in 'deck-core.js', 'deck-datos.js', 'audiencia.js', 'presentador.js', 'deck.css', 'presentador.css', 'inicio.css', 'inicio.js', 'exportar-datos.html') { Copy-Item (Join-Path $motor $f) (Join-Path $Salida 'assets') -Force }
if (-not (Test-Path (Join-Path $Salida 'assets\img\favicon.png'))) { Copy-Item (Join-Path $motor 'favicon.png') (Join-Path $Salida 'assets\img') -Force -ErrorAction SilentlyContinue }
$size = (Get-ChildItem $Salida -Recurse -File | Measure-Object Length -Sum).Sum
"Presentación ensamblada en $Salida  ·  peso total: {0:N2} MB" -f ($size / 1MB)
