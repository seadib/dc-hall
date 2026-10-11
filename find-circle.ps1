Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("C:\Users\USER\.gemini\antigravity\brain\d14dad5c-cce8-4e20-9891-92f0d682cdd1\.user_uploaded\media_1791760373729_d1e1d005.png")

# Find white circle
$minX = $img.Width; $minY = $img.Height; $maxX = 0; $maxY = 0
for ($y = 0; $y -lt $img.Height; $y++) {
    for ($x = 0; $x -lt $img.Width; $x++) {
        $c = $img.GetPixel($x, $y)
        if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host "White area bounds: X: $minX..$maxX, Y: $minY..$maxY"
Write-Host "Width: $($maxX - $minX + 1), Height: $($maxY - $minY + 1)"

$crop = New-Object System.Drawing.Bitmap(120, 120)
$g = [System.Drawing.Graphics]::FromImage($crop)
$g.DrawImage($img, [System.Drawing.Rectangle]::new(0, 0, 120, 120), [System.Drawing.Rectangle]::new($minX - 10, $minY - 10, 120, 120), [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$crop.Save("C:\Users\USER\Downloads\##aicode\DC-hall (sanity)\dc-hall\icon-crop2.png", [System.Drawing.Imaging.ImageFormat]::Png)
$crop.Dispose()
$img.Dispose()
Write-Host "Saved icon-crop2.png"
