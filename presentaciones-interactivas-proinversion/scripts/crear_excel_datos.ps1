<#
  Crea el Excel de datos (datos.xlsx) de una presentación a partir de su contenido.js.
  Los equipos técnicos actualizan cifras, proyectos, series y notas en ese Excel; la presentación lo lee
  directamente cuando está publicada en un servidor (o mediante datos.js, ver excel_a_datos.ps1).
  Requiere: Microsoft Excel y Microsoft Edge (o Chrome).
  Uso: crear_excel_datos.ps1 -Salida "C:\...\salidas\mi-presentacion" [-Forzar]
  Si ya existe datos.xlsx NO se sobrescribe (podría contener cambios de los equipos), salvo con -Forzar (se guarda respaldo).
#>
param([Parameter(Mandatory)] [string]$Salida, [switch]$Forzar)
$ErrorActionPreference = 'Stop'
$Salida = (Resolve-Path $Salida).Path
$destino = Join-Path $Salida 'datos.xlsx'
if (Test-Path $destino) {
  if (-not $Forzar) { throw "Ya existe $destino. Use -Forzar para regenerarlo (se guardará un respaldo)." }
  Copy-Item $destino (Join-Path $Salida ('datos-respaldo-' + (Get-Date -Format 'yyyyMMdd-HHmm') + '.xlsx'))
}

# 1) Modelo de datos desde contenido.js (página exportadora con Edge sin interfaz)
$browser = @("C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "C:\Program Files\Microsoft\Edge\Application\msedge.exe", "C:\Program Files\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
$pagina = 'file:///' + ((Join-Path $Salida 'assets\exportar-datos.html') -replace '\\', '/' -replace ' ', '%20')
$prof = Join-Path $env:TEMP ('pinv-exp-' + [guid]::NewGuid().ToString('N'))
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$ErrorActionPreference = 'Continue'; $dom = & $browser --headless=new --disable-gpu "--user-data-dir=$prof" --virtual-time-budget=3000 --dump-dom $pagina 2>$null | Out-String; $ErrorActionPreference = 'Stop'
Remove-Item $prof -Recurse -Force -ErrorAction SilentlyContinue
$m = [regex]::Match($dom, '<pre id="out">([\s\S]*?)</pre>')
if (-not $m.Success -or $m.Groups[1].Value -like 'cargando*') { throw 'No se pudo leer el contenido (revise que contenido.js no tenga errores).' }
$M = [System.Net.WebUtility]::HtmlDecode($m.Groups[1].Value) | ConvertFrom-Json
"Modelo: $($M.cifras.Count) cifras · $($M.proyectos.Count) filas de proyectos · $($M.sectores.Count) filas de sectores · $($M.notas.Count) escenas con notas"

# 2) Excel
$ROJO = 0x1223E4      # #E42312 en formato BGR de Excel
$GRIS = 0xF2F2F2; $GRIS_TXT = 0x7F7F7F; $VERDE = 0xCEEFC6; $ROJO_SUAVE = 0xCEC7FF; $AMARILLO = 0xCCF2FF
$xl = New-Object -ComObject Excel.Application
$xl.Visible = $false; $xl.DisplayAlerts = $false; $xl.ScreenUpdating = $false
$autoFill = $xl.AutoCorrect.AutoFillFormulasInLists; $xl.AutoCorrect.AutoFillFormulasInLists = $false   # cada fila conserva su propia fórmula
$wb = $xl.Workbooks.Add()
while ($wb.Worksheets.Count -gt 1) { $wb.Worksheets.Item($wb.Worksheets.Count).Delete() }
$M_ = [Type]::Missing

function Nueva-Hoja([string]$nombre, [int]$colorTab) {
  $ws = if ($script:primera) { $script:primera = $false; $wb.Worksheets.Item(1) } else { $wb.Worksheets.Add($M_, $wb.Worksheets.Item($wb.Worksheets.Count)) }
  $ws.Name = $nombre; if ($colorTab) { $ws.Tab.Color = $colorTab }
  $ws.Cells.Font.Name = 'Segoe UI'; $ws.Cells.Font.Size = 10
  return $ws
}
$script:primera = $true
function Escribir-Tabla($ws, [string[]]$encab, $filas, [string]$nombre, [int]$fila0 = 1, [int]$col0 = 1) {
  $n = [math]::Max(1, @($filas).Count); $c = $encab.Count
  $a = New-Object 'object[,]' ($n + 1), $c
  for ($j = 0; $j -lt $c; $j++) { $a[0, $j] = $encab[$j] }
  $formulas = @()
  $i = 1
  foreach ($f in @($filas)) {
    for ($j = 0; $j -lt $c; $j++) {
      $v = if ($j -lt @($f).Count) { $f[$j] } else { $null }
      if ($null -ne $v) { $v = $v.PSObject.BaseObject; if ($v -is [ValueType] -and $v -isnot [bool]) { $v = [double]$v } elseif ($v -isnot [string]) { $v = [string]$v } }
      if ($v -is [string] -and $v.StartsWith('=')) { $formulas += , @($i, $j, $v); $v = $null }
      elseif ($v -is [string] -and $v -match '^[\s\d.,%+\-/:]+$' -and $v -match '\d') { $v = "'" + $v }   # texto con forma de número (p. ej. «86 %»): se guarda como texto, no como número
      $a[$i, $j] = $v
    }
    $i++
  }
  $rng = $ws.Range($ws.Cells.Item($fila0, $col0), $ws.Cells.Item($fila0 + $n, $col0 + $c - 1))
  $rng.Value2 = $a
  $lo = $ws.ListObjects.Add(1, $rng, $M_, 1)
  try { $lo.Name = $nombre } catch { throw "Nombre de tabla no válido: $nombre" }; $lo.TableStyle = 'TableStyleLight1'; $lo.ShowTableStyleRowStripes = $true
  $h = $lo.HeaderRowRange; $h.Interior.Color = $ROJO; $h.Font.Color = 0xFFFFFF; $h.Font.Bold = $true; $h.WrapText = $true; $h.VerticalAlignment = -4108
  $ws.Rows.Item($fila0).RowHeight = 30
  return @{ lo = $lo; formulas = $formulas; fila0 = $fila0; col0 = $col0 }
}
function Poner-Formulas($ws, $t) { foreach ($f in $t.formulas) { $ws.Cells.Item($t.fila0 + $f[0], $t.col0 + $f[1]).Formula = $f[2] } }
function Col($t, [string]$n) { return $t.lo.ListColumns.Item($n) }
function Anchos($ws, [int[]]$w) { for ($k = 0; $k -lt $w.Count; $k++) { $ws.Columns.Item($k + 1).ColumnWidth = $w[$k] } }
function Calculada($t, [string]$nombre, [string]$formula) {
  $lc = $t.lo.ListColumns.Add(); try { $lc.Name = $nombre } catch { throw "Nombre de columna no válido: $nombre" }
  $lc.DataBodyRange.Formula = $formula
  $lc.DataBodyRange.Interior.Color = $GRIS; $lc.DataBodyRange.Font.Color = $GRIS_TXT; $lc.DataBodyRange.Font.Italic = $true
  return $lc
}
function Validar($rango, [string]$lista, [int]$alerta = 1, [string]$msg = '') {
  $rango.Validation.Delete(); $rango.Validation.Add(3, $alerta, 1, $lista) | Out-Null
  $rango.Validation.IgnoreBlank = $true; $rango.Validation.InCellDropdown = $true
  if ($msg) { $rango.Validation.ErrorTitle = 'Valor no previsto'; $rango.Validation.ErrorMessage = $msg }
}
function Congelar($ws, [int]$filas, [int]$cols) {
  try { $ws.Activate(); $w = $xl.ActiveWindow; $w.FreezePanes = $false; $w.SplitRow = $filas; $w.SplitColumn = $cols; $w.FreezePanes = $true } catch {}
}
function Si-Distinto-Rojo($rango, [string]$expr) {
  $fc = $rango.FormatConditions.Add(2, $M_, $expr); $fc.Interior.Color = $ROJO_SUAVE; $fc.Font.Color = 0x00009C
}

# --- Hojas (en orden de uso) ---
$wsI = Nueva-Hoja 'Instrucciones' $ROJO
$wsC = Nueva-Hoja 'Cifras' 0x6BA539
$wsP = Nueva-Hoja 'Proyectos' 0x6BA539
$wsS = Nueva-Hoja 'Sectores' 0xB0B0B0
$wsSS = Nueva-Hoja 'Series por sector' 0x6BA539
$wsSA = Nueva-Hoja 'Series anuales' 0x6BA539
$wsD = Nueva-Hoja 'Distribución' 0x6BA539
$wsN = Nueva-Hoja 'Notas' 0xC57B4E
$wsK = Nueva-Hoja 'Control' $ROJO
$wsCat = Nueva-Hoja 'Catálogo' 0xB0B0B0

# --- Catálogo (primero: lo usan las validaciones y fórmulas) ---
$tCat = Escribir-Tabla $wsCat @('Sector ES', 'Clave', 'Sector EN', 'Familia', 'Color') $M.catalogo 'Catalogo'
function Filas1($vals) { $l = New-Object System.Collections.ArrayList; foreach ($v in $vals) { [void]$l.Add([object[]]@($v)) }; return , $l }
Escribir-Tabla $wsCat @('Familia') (Filas1 @($M.catalogo | ForEach-Object { $_[3] } | Select-Object -Unique)) 'Familias' 1 8 | Out-Null
Escribir-Tabla $wsCat @('Id', 'Escena') $M.listas 'Listas' 1 10 | Out-Null
$tri = @(); foreach ($y in 2026..2032) { foreach ($q in 'I', 'II', 'III', 'IV') { $tri += "$q-$y" } }; foreach ($y in 2026..2035) { $tri += "$y" }
Escribir-Tabla $wsCat @('Trimestre o año') (Filas1 $tri) 'Trimestres' 1 13 | Out-Null
Escribir-Tabla $wsCat @('Mostrar') (Filas1 @('Sí', 'No')) 'SiNo' 1 15 | Out-Null
Escribir-Tabla $wsCat @('Tipo de resumen') (Filas1 @('Barra', 'Adenda')) 'TiposResumen' 1 17 | Out-Null
Anchos $wsCat @(26, 16, 26, 26, 10, 2, 2, 26, 2, 18, 40, 2, 18, 2, 10, 2, 16)
function Nombre-Lista([string]$nombre, [string]$tabla, [string]$columna) {
  $rg = $wsCat.ListObjects.Item($tabla).ListColumns.Item($columna).DataBodyRange
  $wb.Names.Add($nombre, "='Catálogo'!" + $rg.Address($true, $true)) | Out-Null
}
Nombre-Lista 'lstSectores' 'Catalogo' 'Sector ES'; Nombre-Lista 'lstFamilias' 'Familias' 'Familia'; Nombre-Lista 'lstListas' 'Listas' 'Id'
Nombre-Lista 'lstTrimestres' 'Trimestres' 'Trimestre o año'; Nombre-Lista 'lstSiNo' 'SiNo' 'Mostrar'; Nombre-Lista 'lstTipoResumen' 'TiposResumen' 'Tipo de resumen'

# --- Cifras ---
$filasC = foreach ($r in $M.cifras) { , @($r[0], $r[1], $r[2], $r[3], $r[4], $r[5], $r[6], '', '', '') }
$tC = Escribir-Tabla $wsC @('Ruta', 'Escena', 'Dato', 'Tipo', 'Valor', 'Texto ES', 'Texto EN', 'Responsable', 'Fecha de actualización', 'Comentarios') $filasC 'Cifras'
Anchos $wsC @(30, 34, 46, 12, 14, 52, 52, 18, 14, 30)
$tC.lo.Range.WrapText = $true; $tC.lo.Range.VerticalAlignment = -4160
(Col $tC 'Valor').DataBodyRange.NumberFormat = '#,##0.##'
(Col $tC 'Ruta').DataBodyRange.Font.Color = $GRIS_TXT; (Col $tC 'Ruta').DataBodyRange.Font.Size = 8
foreach ($cn in 'Ruta', 'Escena', 'Dato', 'Tipo') { (Col $tC $cn).DataBodyRange.Interior.Color = $GRIS }
$filaIni = $tC.lo.DataBodyRange.Row
$fcv = (Col $tC 'Valor').DataBodyRange.FormatConditions.Add(2, $M_, "=`$D$filaIni=""Texto""")
$fcv.Interior.Color = $GRIS
$rTx = $wsC.Range("F$($filaIni):G$($filaIni + $tC.lo.ListRows.Count - 1)")
foreach ($tipo in 'Número', 'Calculado') { $fct = $rTx.FormatConditions.Add(2, $M_, "=`$D$filaIni=""$tipo"""); $fct.Interior.Color = $GRIS }
$fcc = (Col $tC 'Valor').DataBodyRange.FormatConditions.Add(2, $M_, "=`$D$filaIni=""Calculado""")
$fcc.Font.Italic = $true; $fcc.Font.Color = $GRIS_TXT
Congelar $wsC 1 3

# --- Proyectos ---
$tP = Escribir-Tabla $wsP @('Lista', 'Pestaña', 'N°', 'Cantidad', 'Sector', 'Proyecto ES', 'Proyecto EN', 'EPTP', 'Adjudicación directa', 'Adjudicación concurso / año', 'Monto (USD millones)', 'Etiqueta ES', 'Etiqueta EN', 'Mostrar', 'Responsable', 'Comentarios') $M.proyectos 'Proyectos'
Anchos $wsP @(16, 22, 7, 9, 22, 44, 44, 18, 12, 14, 12, 11, 11, 9, 16, 26, 30, 22, 18)
(Col $tP 'Monto (USD millones)').DataBodyRange.NumberFormat = '#,##0.##'
(Col $tP 'N°').DataBodyRange.NumberFormat = '@'
Calculada $tP 'Escena (referencia)' '=IFERROR(VLOOKUP([@Lista],Listas,2,FALSE),"⚠ Lista no válida")' | Out-Null
Calculada $tP 'Familia' '=IFERROR(VLOOKUP([@Sector],Catalogo,4,FALSE),"")' | Out-Null
$lcE = Calculada $tP 'Estado' '=IF([@[Proyecto ES]]="","Falta el nombre",IF([@Familia]="","Sector no válido",IF(NOT(ISNUMBER([@[Monto (USD millones)]])),"Monto no válido",IF([@[Proyecto EN]]="","Falta el inglés","OK"))))'
$fr = $tP.lo.DataBodyRange.Row
Si-Distinto-Rojo $lcE.DataBodyRange "=`$S$fr<>""OK"""
Validar (Col $tP 'Lista').DataBodyRange '=lstListas' 1 'Elija una lista existente (ver hoja Catálogo).'
Validar (Col $tP 'Sector').DataBodyRange '=lstSectores' 1 'Elija un sector del catálogo.'
Validar (Col $tP 'Adjudicación directa').DataBodyRange '=lstTrimestres' 2 'Formato sugerido: IV-2026 (trimestre) o 2029 (año).'
Validar (Col $tP 'Adjudicación concurso / año').DataBodyRange '=lstTrimestres' 2 'Formato sugerido: IV-2026 (trimestre) o 2029 (año).'
Validar (Col $tP 'Mostrar').DataBodyRange '=lstSiNo' 1 'Use Sí o No.'
Congelar $wsP 1 2

# --- Sectores (resúmenes calculados desde Proyectos) ---
$tS = Escribir-Tabla $wsS @('Escena', 'Resumen', 'Tipo', 'Sector', 'Fuente 1', 'Fuente 2', 'Pestaña fuente', 'Texto fijo ES', 'Texto fijo EN', 'Mostrar') $M.sectores 'Sectores'
Anchos $wsS @(14, 30, 9, 24, 15, 15, 12, 26, 26, 9, 14, 10, 24, 24)
$sumF = { param($f, $col) "IF([@[$f]]=`"`",0,SUMIFS(Proyectos[$col],Proyectos[Lista],[@[$f]],Proyectos[Familia],[@Sector],Proyectos[Pestaña],[@[Pestaña fuente]],Proyectos[Mostrar],`"<>No`"))" }
$lcM = Calculada $tS 'Monto (USD millones)' ('=' + (& $sumF 'Fuente 1' 'Monto (USD millones)') + '+' + (& $sumF 'Fuente 2' 'Monto (USD millones)'))
$lcM.DataBodyRange.NumberFormat = '#,##0'
Calculada $tS 'Cantidad' ('=' + (& $sumF 'Fuente 1' 'Cantidad') + '+' + (& $sumF 'Fuente 2' 'Cantidad')) | Out-Null
Calculada $tS 'Etiqueta ES' '=IF([@[Texto fijo ES]]<>"",[@[Texto fijo ES]],[@Cantidad]&IF([@Cantidad]=1," proyecto"," proyectos"))' | Out-Null
Calculada $tS 'Etiqueta EN' '=IF([@[Texto fijo EN]]<>"",[@[Texto fijo EN]],[@Cantidad]&IF([@Cantidad]=1," project"," projects"))' | Out-Null
Validar (Col $tS 'Tipo').DataBodyRange '=lstTipoResumen' 1 'Use Barra o Adenda.'
Validar (Col $tS 'Sector').DataBodyRange '=lstFamilias' 1 'Use una familia de sectores (hoja Catálogo).'
Validar (Col $tS 'Fuente 1').DataBodyRange '=lstListas' 1 'Elija una lista existente.'
Validar (Col $tS 'Fuente 2').DataBodyRange '=lstListas' 1 'Elija una lista existente.'
Validar (Col $tS 'Mostrar').DataBodyRange '=lstSiNo' 1 'Use Sí o No.'
Congelar $wsS 1 2

# --- Series ---
$tSS = Escribir-Tabla $wsSS @('Escena', 'Año', 'Sector', 'Monto (USD millones)') $M.seriesSector 'SeriesSector'
Anchos $wsSS @(16, 8, 26, 16); (Col $tSS 'Monto (USD millones)').DataBodyRange.NumberFormat = '#,##0'
Validar (Col $tSS 'Sector').DataBodyRange '=lstSectores' 1 'Elija un sector del catálogo.'
$tSA = Escribir-Tabla $wsSA @('Escena', 'Año', 'Monto', 'Cantidad') $M.seriesAnual 'SeriesAnuales'
Anchos $wsSA @(16, 8, 16, 12); (Col $tSA 'Monto').DataBodyRange.NumberFormat = '#,##0'
$wsSA.Range('F1').Value2 = 'Monto: S/ millones (Obras por Impuestos). Cantidad: n.º de intervenciones. El año en curso puede ser parcial.'
$tD = Escribir-Tabla $wsD @('Escena', 'Categoría ES', 'Categoría EN', 'Monto', 'Color') $M.distrib 'Distribucion'
Anchos $wsD @(16, 30, 30, 14, 10); (Col $tD 'Monto').DataBodyRange.NumberFormat = '#,##0'
$wsD.Range('G1').Value2 = 'Monto en S/ millones. Color en formato #RRGGBB (opcional).'

# --- Notas ---
$tN = Escribir-Tabla $wsN @('Escena', 'Título de la escena', 'Mensaje ES', 'Mensaje EN', 'Guion ES', 'Guion EN', 'Cifras ES', 'Cifras EN', 'Preguntas ES', 'Preguntas EN', 'Puente ES', 'Puente EN') $M.notas 'Notas'
Anchos $wsN @(14, 28, 40, 40, 55, 55, 34, 34, 55, 55, 34, 34)
$tN.lo.Range.WrapText = $true; $tN.lo.Range.VerticalAlignment = -4160
(Col $tN 'Escena').DataBodyRange.Interior.Color = $GRIS; (Col $tN 'Título de la escena').DataBodyRange.Interior.Color = $GRIS
Congelar $wsN 1 2

# --- Fórmulas que dependen de varias tablas ---
Poner-Formulas $wsC $tC

# --- Control ---
$wsK.Range('A1').Value2 = 'CONTROL DE CONSISTENCIA'; $wsK.Range('A1').Font.Size = 16; $wsK.Range('A1').Font.Bold = $true; $wsK.Range('A1').Font.Color = $ROJO
$wsK.Range('A2').Value2 = 'Se recalcula solo. Revise las filas en rojo antes de publicar: indican cifras declaradas que no cuadran con el detalle.'
$tK = Escribir-Tabla $wsK @('Control', 'Calculado', 'Declarado', 'Tolerancia', 'Regla') $M.controles 'Controles' 4
Poner-Formulas $wsK $tK
Calculada $tK 'Diferencia' '=[@Calculado]-[@Declarado]' | Out-Null
$lcK = Calculada $tK 'Estado' '=IF([@Regla]="minimo",IF([@Calculado]>=[@Declarado],"OK","REVISAR"),IF(ABS([@Diferencia])<=[@Tolerancia]*MAX(1,ABS([@Declarado]))+0.5,"OK","REVISAR"))'
foreach ($cn in 'Calculado', 'Declarado', 'Diferencia') { (Col $tK $cn).DataBodyRange.NumberFormat = '#,##0.##' }
(Col $tK 'Tolerancia').DataBodyRange.NumberFormat = '0%'
$kr = $tK.lo.DataBodyRange.Row
$f1 = $lcK.DataBodyRange.FormatConditions.Add(2, $M_, "=`$G$kr=""REVISAR"""); $f1.Interior.Color = $ROJO_SUAVE; $f1.Font.Color = 0x00009C; $f1.Font.Bold = $true
$f2 = $lcK.DataBodyRange.FormatConditions.Add(2, $M_, "=`$G$kr=""OK"""); $f2.Interior.Color = $VERDE; $f2.Font.Color = 0x006100
$fin = $kr + $tK.lo.ListRows.Count + 1
$wsK.Cells.Item($fin, 1).Value2 = 'Filas de Proyectos con observaciones'
$wsK.Cells.Item($fin, 2).Formula = '=COUNTIF(Proyectos[Estado],"<>OK")'
$wsK.Cells.Item($fin + 1, 1).Value2 = 'Controles por revisar'
$wsK.Cells.Item($fin + 1, 2).Formula = '=COUNTIF(Controles[Estado],"REVISAR")'
$wsK.Range($wsK.Cells.Item($fin, 1), $wsK.Cells.Item($fin + 1, 2)).Font.Bold = $true
Anchos $wsK @(62, 14, 14, 11, 10, 14, 12)

# --- Instrucciones ---
$lin = @(
  @('ACTUALIZACIÓN DE DATOS DE LA PRESENTACIÓN', 't'),
  @($M.titulo, 's'),
  @('', ''),
  @('¿Para qué sirve este archivo?', 'h'),
  @('Es la fuente de datos de la presentación interactiva. Lo que se cambie aquí aparece en la presentación (vista de audiencia y del presentador) en ambos idiomas, sin tocar el diseño ni enviar archivos nuevos.', ''),
  @('', ''),
  @('Cómo actualizar (4 pasos)', 'h'),
  @('1. Edite SOLO las celdas blancas. Las grises son referencias o se calculan solas.', ''),
  @('2. Guarde el archivo con el mismo nombre (datos.xlsx) en la misma carpeta de la presentación.', ''),
  @('3. Revise la hoja «Control»: todo debe estar en verde (OK). Si algo está en rojo, corrija o consulte con DSI.', ''),
  @('4. Recargue la presentación en el navegador (F5). En la vista del presentador, arriba, verá «Datos: datos.xlsx» con la fecha del archivo.', ''),
  @('', ''),
  @('Qué se edita en cada hoja', 'h'),
  @('Cifras — números y textos sueltos de cada escena (montos, n.º de proyectos, beneficiarios, fechas, textos con cifras). Edite «Valor» si el tipo es Número; «Texto ES» y «Texto EN» si es Texto. Las metas marcadas como CALCULADA salen solas de la hoja Proyectos.', ''),
  @('Proyectos — todas las listas de proyectos y adendas (una fila por proyecto). Puede corregir montos y trimestres, agregar filas al final de la tabla (se extiende sola) u ocultar un proyecto con Mostrar = No. «Cantidad» = n.º de proyectos que agrupa la fila (p. ej. 5 si el N° es 3–7).', ''),
  @('Sectores — barras de resumen por sector de cada periodo. Monto, cantidad y etiquetas se calculan desde Proyectos; solo se edita el «Texto fijo» si se quiere otra etiqueta (p. ej. «1 declaratoria de interés»).', ''),
  @('Series por sector / Series anuales / Distribución — datos de los gráficos históricos (una fila por año y sector, por año, o por categoría).', ''),
  @('Notas — notas del presentador por escena, en español e inglés. Dentro de una celda use Alt+Enter para separar puntos. En Preguntas, escriba «¿Pregunta? || Respuesta» en cada línea. Use **texto** para resaltar cifras.', ''),
  @('Control — verificación automática de totales. No se edita.', ''),
  @('Catálogo — sectores, listas y trimestres válidos. No se edita (si necesita un sector nuevo, solicítelo a DSI).', ''),
  @('', ''),
  @('Reglas para no romper la presentación', 'h'),
  @('• No cambie nombres de hojas, encabezados de columnas ni la columna «Ruta».', ''),
  @('• Montos siempre en MILLONES y como número (escriba 1453, no «USD 1,453 millones»). El formato en cada idioma lo pone la presentación.', ''),
  @('• Trimestres como IV-2026 y años como 2029 (hay lista desplegable).', ''),
  @('• Si un texto queda vacío en inglés, se mostrará el texto en español.', ''),
  @('• Si el archivo tiene un error, la presentación no se cae: sigue mostrando los datos anteriores y el presentador ve un aviso (⚠) con el detalle.', ''),
  @('', ''),
  @('Presentación abierta desde OneDrive, una USB o una carpeta (sin servidor)', 'h'),
  @('En la vista del presentador, pulse «Cargar Excel» y elija este archivo (desde OneDrive, la USB o cualquier carpeta). Las cifras se actualizan al instante en ambas vistas y quedan recordadas en ese navegador. Alternativa: DSI ejecuta «excel_a_datos.ps1», que genera datos.js con estos mismos datos.', ''),
  @('', ''),
  @('Colores', 'h'),
  @('Blanco = editable · Gris = referencia o cálculo automático · Rojo = revisar · Verde = correcto', '')
)
$r = 1
foreach ($l in $lin) {
  $c = $wsI.Cells.Item($r, 2); $c.Value2 = $l[0]; $c.WrapText = $true
  switch ($l[1]) { 't' { $c.Font.Size = 18; $c.Font.Bold = $true; $c.Font.Color = $ROJO } 's' { $c.Font.Size = 12; $c.Font.Italic = $true } 'h' { $c.Font.Size = 12; $c.Font.Bold = $true; $c.Interior.Color = $GRIS } }
  $r++
}
$wsI.Columns.Item(1).ColumnWidth = 3; $wsI.Columns.Item(2).ColumnWidth = 120
$wsI.Range("B1:B$r").Rows.AutoFit() | Out-Null
$wsI.Cells.Item($r + 1, 2).Value2 = 'Generado el ' + (Get-Date -Format 'dd/MM/yyyy HH:mm') + ' a partir de contenido.js · id: ' + $M.id
$wsI.Cells.Item($r + 1, 2).Font.Color = $GRIS_TXT

# --- Protección ligera (sin contraseña) en hojas de referencia y en las columnas fijas de Cifras ---
$wsC.Cells.Locked = $true
$wsC.Range("E:J").Locked = $false
foreach ($ws in $wsC, $wsK, $wsCat, $wsI) { $ws.Protect('', $true, $true, $true, $false, $true, $true, $true) | Out-Null }

$wsI.Activate()
$xl.ScreenUpdating = $true
$xl.AutoCorrect.AutoFillFormulasInLists = $autoFill
$wb.SaveAs($destino, 51)
$wb.Close($false); $xl.Quit()
[void][Runtime.InteropServices.Marshal]::ReleaseComObject($xl); [GC]::Collect(); [GC]::WaitForPendingFinalizers()   # cierra Excel por completo
"Excel creado: $destino"
