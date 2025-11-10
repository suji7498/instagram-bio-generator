const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

// Define the sizes we need for our PWA
const iconSizes = [16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 384, 512];

// Source image path
const sourceImagePath = path.join(__dirname, 'public', 'ig-fonts-logo.png');
const outputDir = path.join(__dirname, 'public');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  try {
    // Read the source image
    const image = await Jimp.read(sourceImagePath);
    
    console.log('Source image loaded successfully');
    
    // Generate icons for each size
    for (const size of iconSizes) {
      const outputPath = path.join(outputDir, `ig-fonts-logo-${size}x${size}.png`);
      
      // Resize and save the image
      await image
        .clone()
        .resize({ w: size, h: size })
        .write(outputPath);
      
      console.log(`Generated icon: ${size}x${size}`);
    }
    
    // Also generate the instagram-bio-logo in different sizes
    const instagramBioLogoPath = path.join(__dirname, 'public', 'instagram-bio-logo.png');
    if (fs.existsSync(instagramBioLogoPath)) {
      const instagramBioImage = await Jimp.read(instagramBioLogoPath);
      
      for (const size of iconSizes) {
        const outputPath = path.join(outputDir, `instagram-bio-logo-${size}x${size}.png`);
        
        // Resize and save the image
        await instagramBioImage
          .clone()
          .resize({ w: size, h: size })
          .write(outputPath);
        
        console.log(`Generated instagram-bio icon: ${size}x${size}`);
      }
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error.message);
  }
}

generateIcons();