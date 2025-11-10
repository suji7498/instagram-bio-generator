const { imageSize } = require('image-size');
const path = require('path');

// Check dimensions of our logo files
const igFontsLogoPath = path.join(__dirname, 'public', 'ig-fonts-logo.png');
const instagramBioLogoPath = path.join(__dirname, 'public', 'instagram-bio-logo.png');

try {
  const igFontsDimensions = imageSize(igFontsLogoPath);
  console.log('IG Fonts Logo dimensions:', igFontsDimensions.width, 'x', igFontsDimensions.height);
  
  const instagramBioDimensions = imageSize(instagramBioLogoPath);
  console.log('Instagram Bio Logo dimensions:', instagramBioDimensions.width, 'x', instagramBioDimensions.height);
} catch (error) {
  console.error('Error checking image dimensions:', error.message);
}