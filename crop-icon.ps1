Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("C:\Users\USER\.gemini\antigravity\brain\d14dad5c-cce8-4e20-9891-92f0d682cdd1\.user_uploaded\media_1791760373729_d1e1d005.png")

# Find the circle around (176, 360) area
Write-Host "Image size: $($img.Width)x$($img.Height)"

# Crop around the icon
$crop = New-Object System.Drawing.Bitmap(160, 160)
$g = [System.Drawing.Graphics]::FromImage($crop)
# The circle is around x=110..240, y=250..380
$g.DrawImage($img, [System.Drawing.Rectangle]::new(0, 0, 160, 160), [System.Drawing.Rectangle]::new(110, 250, 160, 160), [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$crop.Save("C:\Users\USER\Downloads\##aicode\DC-hall (sanity)\dc-hall\icon-crop.png", [System.Drawing.Imaging.ImageFormat]::Png)
$crop.Dispose()
$img.Dispose()
Write-Host "Saved icon-crop.png"
