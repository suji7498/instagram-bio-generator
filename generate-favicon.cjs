const fs = require('fs');
const path = require('path');
const toIco = require('to-ico');

async function generateFavicon() {
  try {
    // Read the PNG files
    const png16 = fs.readFileSync(path.join(__dirname, 'public', 'ig-fonts-logo-16x16.png'));
    const png32 = fs.readFileSync(path.join(__dirname, 'public', 'ig-fonts-logo-32x32.png'));
    const png48 = fs.readFileSync(path.join(__dirname, 'public', 'ig-fonts-logo-48x48.png'));
    
    // Convert to ICO
    const icoBuffer = await toIco([png16, png32, png48]);
    
    // Write to file
    fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), icoBuffer);
    
    console.log('favicon.ico generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error.message);
  }
}

generateFavicon();