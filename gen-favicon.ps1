Add-Type -AssemblyName System.Drawing

$logo = [System.Drawing.Image]::FromFile("$PSScriptRoot\images\logo.png")
Write-Host "Logo size: $($logo.Width)x$($logo.Height)"

$sizes = @(48, 96, 144, 180, 192, 512)
foreach ($s in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($s, $s, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($logo, 0, 0, $s, $s)
    $g.Dispose()
    
    if ($s -eq 180) {
        $bmp.Save("$PSScriptRoot\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "Saved apple-touch-icon.png ${s}x${s}"
    } else {
        $name = "favicon-${s}x${s}.png"
        $bmp.Save("$PSScriptRoot\$name", [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "Saved $name ${s}x${s}"
    }
    if ($s -eq 96) {
        $bmp.Save("$PSScriptRoot\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "Saved favicon.png (copy of 96x96)"
    }
    $bmp.Dispose()
}

# Generate .ico with 16, 32, 48
$icoSizes = @(16, 32, 48)
$ms = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter($ms)

# ICO header
$bw.Write([UInt16]0)
$bw.Write([UInt16]1)
$bw.Write([UInt16]$icoSizes.Count)

$imageDataList = @()
foreach ($s in $icoSizes) {
    $bmp = New-Object System.Drawing.Bitmap($s, $s, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($logo, 0, 0, $s, $s)
    $g.Dispose()
    
    $pngMs = New-Object System.IO.MemoryStream
    $bmp.Save($pngMs, [System.Drawing.Imaging.ImageFormat]::Png)
    $imageDataList += ,$pngMs.ToArray()
    $pngMs.Dispose()
    $bmp.Dispose()
}

# Write ICO directory entries
$offset = 6 + ($icoSizes.Count * 16)
for ($i = 0; $i -lt $icoSizes.Count; $i++) {
    $s = $icoSizes[$i]
    $data = $imageDataList[$i]
    $w = if ($s -ge 256) { [byte]0 } else { [byte]$s }
    $h = if ($s -ge 256) { [byte]0 } else { [byte]$s }
    $bw.Write($w)
    $bw.Write($h)
    $bw.Write([byte]0)
    $bw.Write([byte]0)
    $bw.Write([UInt16]1)
    $bw.Write([UInt16]32)
    $bw.Write([UInt32]$data.Length)
    $bw.Write([UInt32]$offset)
    $offset += $data.Length
}

# Write image data
foreach ($data in $imageDataList) {
    $bw.Write($data)
}

$bw.Flush()
[System.IO.File]::WriteAllBytes("$PSScriptRoot\favicon.ico", $ms.ToArray())
$bw.Dispose()
$ms.Dispose()
$logo.Dispose()

Write-Host "Saved favicon.ico (16+32+48, transparent outside the circular mark)"
Write-Host "ALL DONE"
