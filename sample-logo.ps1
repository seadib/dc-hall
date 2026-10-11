Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("C:\Users\USER\Downloads\##aicode\DC-hall (sanity)\dc-hall\images\logo.png")

function Px($x, $y) {
    $c = $img.GetPixel($x, $y)
    Write-Host "($x,$y): R=$($c.R), G=$($c.G), B=$($c.B), A=$($c.A)"
}

Write-Host "Corner:"
Px 0 0
Px 5 5
Write-Host "Center:"
Px 304 304
Write-Host "Top Edge Mid:"
Px 304 0
Px 304 5
Write-Host "Left Edge Mid:"
Px 0 304
Px 5 304

$img.Dispose()
