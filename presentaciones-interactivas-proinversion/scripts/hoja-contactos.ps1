# Une capturas PNG en hojas de contacto (6 por hoja) para revisión rápida.
param([string]$Dir, [string]$Patron = '*.png', [string]$Prefijo = 'hoja', [int]$Por = 6)
Add-Type -AssemblyName System.Drawing
$files = Get-ChildItem (Join-Path $Dir $Patron) | Where-Object { $_.Name -notlike "$Prefijo*" } | Sort-Object Name
$w = 960; $h = 540
for ($g = 0; $g -lt [math]::Ceiling($files.Count / $Por); $g++) {
  $bmp = New-Object System.Drawing.Bitmap (2 * $w), ([math]::Ceiling($Por / 2) * $h)
  $gr = [System.Drawing.Graphics]::FromImage($bmp); $gr.Clear([System.Drawing.Color]::Magenta)
  $font = New-Object System.Drawing.Font 'Arial', 18, ([System.Drawing.FontStyle]::Bold)
  for ($k = 0; $k -lt $Por; $k++) {
    $idx = $g * $Por + $k; if ($idx -ge $files.Count) { break }
    $img = [System.Drawing.Image]::FromFile($files[$idx].FullName)
    $x = ($k % 2) * $w; $y = [math]::Floor($k / 2) * $h
    $gr.DrawImage($img, $x, $y, $w - 3, $h - 3)
    $gr.FillRectangle([System.Drawing.Brushes]::Yellow, $x, $y, 120, 30); $gr.DrawString($files[$idx].BaseName, $font, [System.Drawing.Brushes]::Black, $x + 4, $y + 2)
    $img.Dispose()
  }
  $out = Join-Path $Dir ("$Prefijo-$g.jpg"); $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Jpeg); $gr.Dispose(); $bmp.Dispose(); $out
}
