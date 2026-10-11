Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("C:\Users\USER\Downloads\##aicode\DC-hall (sanity)\dc-hall\images\logo.png")
Write-Host "Width: $($img.Width), Height: $($img.Height)"

$minX = $img.Width; $minY = $img.Height; $maxX = 0; $maxY = 0

for ($y = 0; $y -lt $img.Height; $y++) {
    for ($x = 0; $x -lt $img.Width; $x++) {
        $c = $img.GetPixel($x, $y)
        if ($c.A -gt 15) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host "Bounds: X: $minX..$maxX, Y: $minY..$maxY"
Write-Host "Actual Content Width: $($maxX - $minX + 1), Height: $($maxY - $minY + 1)"
$img.Dispose()
