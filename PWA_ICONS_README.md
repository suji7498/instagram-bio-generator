# PWA Icons Setup

To properly set up the PWA icons for this application, you need to create various sizes of the IG Fonts logo.

## Required Icon Sizes

1. **Favicon sizes:**
   - 16x16 pixels (favicon-16x16.png)
   - 32x32 pixels (favicon-32x32.png)
   - 48x48 pixels (favicon.ico) - ICO format

2. **PWA/Manifest icons:**
   - 192x192 pixels (ig-fonts-logo-192x192.png)
   - 512x512 pixels (ig-fonts-logo-512x512.png)

3. **Apple Touch Icon:**
   - 180x180 pixels (ig-fonts-logo-180x180.png)

## Instructions

1. Use the `ig-fonts-logo.png` file as the source image
2. Resize it to each of the required dimensions
3. Save each resized image with the appropriate filename in the `public` folder
4. For the favicon.ico file, you can combine the 16x16, 32x32, and 48x48 versions into a single ICO file

## Tools You Can Use

- Online image resizers
- Image editing software like Photoshop, GIMP, or Paint.NET
- Command-line tools like ImageMagick
- Online favicon generators

## File Placement

All icon files should be placed in the `public` folder so they can be served directly by the web server.