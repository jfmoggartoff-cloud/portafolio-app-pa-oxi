# Utilidades de imagen sin dependencias externas (System.Drawing, incluido en Windows).
# Uso: . .\imagenes.ps1   (dot-source) y luego llamar a las funciones.
Add-Type -AssemblyName System.Drawing

function Get-JpegCodec { [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' } }

function Save-Resized {
  <#
    Redimensiona (sin agrandar) y guarda como JPG (fotos) o PNG (logos/transparencias).
    -MaxW / -MaxH: lado máximo. -Quality: 1-100 (solo JPG). -Crop: @(x,y,w,h) en píxeles de la imagen original.
  #>
  param(
    [Parameter(Mandatory)] [string]$Src,
    [Parameter(Mandatory)] [string]$Dst,
    [int]$MaxW = 1920, [int]$MaxH = 1920, [int]$Quality = 74,
    [int[]]$Crop = $null
  )
  $img = [System.Drawing.Image]::FromFile($Src)
  try {
    $sx = 0; $sy = 0; $sw = $img.Width; $sh = $img.Height
    if ($Crop) { $sx, $sy, $sw, $sh = $Crop }
    $r = [math]::Min(1.0, [math]::Min($MaxW / $sw, $MaxH / $sh))
    $w = [int][math]::Round($sw * $r); $h = [int][math]::Round($sh * $r)
    $isPng = $Dst.ToLower().EndsWith('.png')
    $fmt = if ($isPng) { [System.Drawing.Imaging.PixelFormat]::Format32bppArgb } else { [System.Drawing.Imaging.PixelFormat]::Format24bppRgb }
    $bmp = New-Object System.Drawing.Bitmap $w, $h, $fmt
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    if (-not $isPng) { $g.Clear([System.Drawing.Color]::White) }
    $dest = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $g.DrawImage($img, $dest, $sx, $sy, $sw, $sh, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    New-Item -ItemType Directory -Force (Split-Path $Dst) | Out-Null
    if ($isPng) { $bmp.Save($Dst, [System.Drawing.Imaging.ImageFormat]::Png) }
    else {
      $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
      $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$Quality)
      $bmp.Save($Dst, (Get-JpegCodec), $ep)
    }
    $bmp.Dispose()
  } finally { $img.Dispose() }
  "{0,-34} {1,5} KB  {2}x{3}" -f (Split-Path $Dst -Leaf), [math]::Round((Get-Item $Dst).Length / 1KB), $w, $h
}

function Save-Recolored {
  <# Crea una variante de un logo PNG cambiando todos sus píxeles visibles a un color (p. ej. logo blanco -> gris para fondos claros), respetando la transparencia. Conserva el rojo de marca si -KeepRed. #>
  param([string]$Src, [string]$Dst, [string]$Hex = '#5F6062', [switch]$KeepRed)
  $c = [System.Drawing.ColorTranslator]::FromHtml($Hex)
  $b = New-Object System.Drawing.Bitmap $Src
  $rect = New-Object System.Drawing.Rectangle 0, 0, $b.Width, $b.Height
  $data = $b.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $n = $data.Stride * $b.Height
  $buf = New-Object byte[] $n
  [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $buf, 0, $n)
  for ($i = 0; $i -lt $n; $i += 4) {
    if ($buf[$i + 3] -eq 0) { continue }
    $bl = $buf[$i]; $gr = $buf[$i + 1]; $rd = $buf[$i + 2]
    if ($KeepRed -and $rd -gt 150 -and $gr -lt 110 -and $bl -lt 110) { continue }
    $buf[$i] = $c.B; $buf[$i + 1] = $c.G; $buf[$i + 2] = $c.R
  }
  [System.Runtime.InteropServices.Marshal]::Copy($buf, 0, $data.Scan0, $n)
  $b.UnlockBits($data)
  $b.Save($Dst, [System.Drawing.Imaging.ImageFormat]::Png); $b.Dispose()
  "{0,-34} {1,5} KB  (recoloreado {2})" -f (Split-Path $Dst -Leaf), [math]::Round((Get-Item $Dst).Length / 1KB), $Hex
}
