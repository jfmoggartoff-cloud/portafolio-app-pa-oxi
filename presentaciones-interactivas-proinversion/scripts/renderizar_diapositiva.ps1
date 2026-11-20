<#
  Exporta UNA diapositiva en alta resolución con PowerPoint, ocultando formas que no se quieren en la imagen
  (títulos, leyendas, paneles de texto). Útil para obtener mapas o composiciones limpias y sin texto de un idioma.
  -OcultarTexto: expresión regular; se ocultan las formas cuyo texto coincida.
  -OcultarDesdeX: oculta formas cuyo borde izquierdo (en puntos) sea >= a este valor (p. ej. paneles a la derecha).
  -OcultarCaja:   @(x, y, ancho, alto) en puntos; oculta formas contenidas en esa caja (p. ej. una leyenda).
  Ejemplo: renderizar_diapositiva.ps1 -Pptx deck.pptx -Indice 10 -Png mapa.png -OcultarTexto 'PORTAFOLIO|Proyectos' -OcultarDesdeX 470
  Luego recorte con imagenes.ps1 -> Save-Resized -Crop.
#>
param([Parameter(Mandatory)] [string]$Pptx, [Parameter(Mandatory)] [int]$Indice, [Parameter(Mandatory)] [string]$Png,
  [int]$Ancho = 2880, [string]$OcultarTexto = '', [double]$OcultarDesdeX = -1, [double[]]$OcultarCaja = $null)
$app = New-Object -ComObject PowerPoint.Application
$p = $app.Presentations.Open((Resolve-Path $Pptx).Path, $true, $false, $false)
try {
  $sl = $p.Slides.Item($Indice)
  foreach ($sh in $sl.Shapes) {
    $txt = ''; if ($sh.HasTextFrame) { $txt = $sh.TextFrame.TextRange.Text }
    $hide = $false
    if ($OcultarTexto -and $txt -match $OcultarTexto) { $hide = $true }
    if ($OcultarDesdeX -ge 0 -and $sh.Left -ge $OcultarDesdeX) { $hide = $true }
    if ($OcultarCaja) { $x, $y, $w, $h = $OcultarCaja; if ($sh.Left -ge $x -and $sh.Top -ge $y -and ($sh.Left + $sh.Width) -le ($x + $w) -and ($sh.Top + $sh.Height) -le ($y + $h)) { $hide = $true } }
    if ($hide) { $sh.Visible = 0 }
  }
  $alto = [int]($Ancho * $p.PageSetup.SlideHeight / $p.PageSetup.SlideWidth)
  $sl.Export($Png, 'PNG', $Ancho, $alto)
  "Exportada diapositiva $Indice -> $Png ($Ancho x $alto). 1 punto = $([math]::Round($Ancho / $p.PageSetup.SlideWidth, 3)) px"
} finally { $p.Close(); $app.Quit() }   # se cierra SIN guardar: el PPT original no se modifica
