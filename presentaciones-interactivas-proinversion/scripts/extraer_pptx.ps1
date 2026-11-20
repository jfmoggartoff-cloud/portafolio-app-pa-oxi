<#
  Extrae todo lo necesario de un .pptx, sin Python ni Node:
   - texto de cada diapositiva (por forma), tablas, imágenes usadas, gráficos y NOTAS DEL ORADOR  -> contenido.md
   - inventario de imágenes con tamaño y dimensiones                                               -> imagenes.txt
   - render PNG de cada diapositiva con PowerPoint (si está instalado)                              -> render\sNN.png
   - hoja de contactos de todas las diapositivas                                                     -> render\hoja-N.jpg
  Uso: powershell -ExecutionPolicy Bypass -File extraer_pptx.ps1 -Pptx "C:\ruta\deck.pptx" -Out "C:\tmp\deck-es"
#>
param([Parameter(Mandatory)] [string]$Pptx, [Parameter(Mandatory)] [string]$Out, [int]$AnchoRender = 1600, [switch]$SinRender)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force $Out | Out-Null
$unz = Join-Path $Out 'unzip'
if (-not (Test-Path $unz)) { [IO.Compression.ZipFile]::ExtractToDirectory($Pptx, $unz) }

$ns = @{ p = 'http://schemas.openxmlformats.org/presentationml/2006/main'; a = 'http://schemas.openxmlformats.org/drawingml/2006/main'; r = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'; c = 'http://schemas.openxmlformats.org/drawingml/2006/chart' }
function RelMap($relPath) { $m = @{}; if (Test-Path $relPath) { [xml]$x = Get-Content $relPath -Raw -Encoding UTF8; foreach ($r in $x.Relationships.Relationship) { $m[$r.Id] = $r.Target } }; return $m }
function NsMgr($doc) { $nm = New-Object System.Xml.XmlNamespaceManager($doc.NameTable); foreach ($k in $ns.Keys) { $nm.AddNamespace($k, $ns[$k]) }; return , $nm }  # la coma evita que PowerShell "desenrolle" el objeto

[xml]$pres = Get-Content "$unz\ppt\presentation.xml" -Raw -Encoding UTF8
$prels = RelMap "$unz\ppt\_rels\presentation.xml.rels"
$sb = New-Object System.Text.StringBuilder
$conNotas = 0; $i = 0
foreach ($sid in $pres.presentation.sldIdLst.sldId) {
  $i++
  $file = Join-Path "$unz\ppt" $prels[$sid.GetAttribute('id', $ns.r)]
  $name = Split-Path $file -Leaf
  [void]$sb.AppendLine("`n<!-- Diapositiva $i ($name) -->")
  [xml]$sx = Get-Content $file -Raw -Encoding UTF8; $nm = NsMgr $sx
  $rels = RelMap ((Split-Path $file) + "\_rels\$name.rels")
  foreach ($sp in $sx.SelectNodes('//p:sp', $nm)) {
    $paras = foreach ($para in $sp.SelectNodes('.//a:p', $nm)) { $t = ($para.SelectNodes('.//a:t', $nm) | ForEach-Object { $_.InnerText }) -join ''; if ($t.Trim()) { $t.Trim() } }
    if ($paras) { [void]$sb.AppendLine('[' + $sp.SelectSingleNode('p:nvSpPr/p:cNvPr', $nm).name + '] ' + ($paras -join ' | ')) }
  }
  foreach ($tbl in $sx.SelectNodes('//a:tbl', $nm)) {
    [void]$sb.AppendLine('TABLA:')
    foreach ($tr in $tbl.SelectNodes('a:tr', $nm)) { $cells = foreach ($tc in $tr.SelectNodes('a:tc', $nm)) { (($tc.SelectNodes('.//a:t', $nm) | ForEach-Object { $_.InnerText }) -join ' ').Trim() }; [void]$sb.AppendLine('  | ' + ($cells -join ' | ') + ' |') }
  }
  $pics = foreach ($blip in $sx.SelectNodes('//a:blip', $nm)) { $e = $blip.GetAttribute('embed', $ns.r); if ($rels[$e]) { Split-Path $rels[$e] -Leaf } }
  if ($pics) { [void]$sb.AppendLine('IMAGENES: ' + (($pics | Select-Object -Unique) -join ', ')) }
  foreach ($ch in ($rels.Values | Where-Object { $_ -match 'charts/chart' })) {
    $cf = [IO.Path]::GetFullPath((Join-Path (Split-Path $file) $ch))
    [xml]$cx = Get-Content $cf -Raw -Encoding UTF8; $cn = NsMgr $cx
    [void]$sb.AppendLine("GRAFICO ($(Split-Path $cf -Leaf)):")
    foreach ($ser in $cx.SelectNodes('//c:ser', $cn)) {
      $sn = ($ser.SelectNodes('c:tx//c:v', $cn) | ForEach-Object { $_.InnerText }) -join ''
      $cats = ($ser.SelectNodes('c:cat//c:pt/c:v', $cn) | ForEach-Object { $_.InnerText }) -join ' ; '
      $vals = ($ser.SelectNodes('c:val//c:pt/c:v', $cn) | ForEach-Object { $_.InnerText }) -join ' ; '
      [void]$sb.AppendLine("  serie [$sn] categorias: $cats")
      [void]$sb.AppendLine("  valores: $vals")
    }
  }
  foreach ($n in ($rels.Values | Where-Object { $_ -match 'notesSlide' })) {
    [xml]$nx = Get-Content (Join-Path (Split-Path $file) $n) -Raw -Encoding UTF8; $nn = NsMgr $nx
    $nt = foreach ($para in $nx.SelectNodes('//p:sp[.//p:ph[@type="body"]]//a:p', $nn)) { (($para.SelectNodes('.//a:t', $nn) | ForEach-Object { $_.InnerText }) -join '').Trim() }
    $nt = ($nt | Where-Object { $_ }) -join ' / '
    if ($nt) { [void]$sb.AppendLine("NOTAS: $nt"); $conNotas++ }
  }
}
[void]$sb.Insert(0, "# Extracción de $(Split-Path $Pptx -Leaf)`nDiapositivas: $i · Con notas del orador: $conNotas`n")
[IO.File]::WriteAllText((Join-Path $Out 'contenido.md'), $sb.ToString(), [Text.Encoding]::UTF8)
"Diapositivas: $i  ·  con notas del orador: $conNotas"

# Inventario de imágenes
$inv = foreach ($f in Get-ChildItem "$unz\ppt\media" -File) {
  $d = ''; if ($f.Extension -notmatch 'emf|wmf|svg') { try { $im = [System.Drawing.Image]::FromFile($f.FullName); $d = "$($im.Width)x$($im.Height)"; $im.Dispose() } catch {} }
  '{0,-18} {1,8} KB  {2}' -f $f.Name, [math]::Round($f.Length / 1KB), $d
}
$inv | Set-Content (Join-Path $Out 'imagenes.txt') -Encoding UTF8
"Imágenes: $($inv.Count)  ·  peso total: {0:N1} MB" -f ((Get-ChildItem "$unz\ppt\media" -File | Measure-Object Length -Sum).Sum / 1MB)

# Render con PowerPoint (opcional)
if (-not $SinRender) {
  try {
    $rd = Join-Path $Out 'render'; New-Item -ItemType Directory -Force $rd | Out-Null
    $app = New-Object -ComObject PowerPoint.Application
    $p = $app.Presentations.Open((Resolve-Path $Pptx).Path, $true, $false, $false)
    $h = [int]($AnchoRender * $p.PageSetup.SlideHeight / $p.PageSetup.SlideWidth)
    foreach ($sl in $p.Slides) { $sl.Export((Join-Path $rd ('s{0:D2}.png' -f $sl.SlideIndex)), 'PNG', $AnchoRender, $h) }
    $p.Close(); $app.Quit()
    & (Join-Path $PSScriptRoot 'hoja-contactos.ps1') -Dir $rd -Patron 's*.png' -Prefijo 'hoja' | Out-Null
    "Render listo en $rd"
  } catch { "No se pudo renderizar con PowerPoint: $($_.Exception.Message)" }
}
