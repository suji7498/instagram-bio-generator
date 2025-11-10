# Instagram Bio Generator

A comprehensive tool for generating Instagram bios and fancy fonts.

## Features

### Instagram Bio Search
Search through hundreds of pre-made Instagram bios for different categories:
- Love
- Attitude
- Funny
- Travel
- Fitness
- Motivational
- Friendship
- Business
- Aesthetic
- Quotes

### IG Fonts Generator
Transform your text into 100+ different font styles:
- Bold and Italic variations
- Script and Fraktur styles
- Double Struck and Monospace fonts
- Circled and Squared text
- Regional indicators and more

## Usage

### Instagram Bio Search
1. Use the search bar to find bios by keyword
2. Browse popular search categories
3. Copy any bio to your clipboard with one click

### IG Fonts Generator
1. Navigate to the "IG Fonts" tab
2. Enter your text (up to 500 characters)
3. Click "Generate Fonts"
4. Browse through 100+ font styles
5. Copy your favorite styles to the clipboard

## Technical Details

### Fancy Font Generation
The IG Fonts generator uses Unicode character mapping to transform regular ASCII text into various decorative styles. Each character is mapped to its Unicode equivalent that appears as a stylized version.

### Pagination
Results are paginated with 32 items per page for optimal performance:
- Mobile: Single column of cards
- Desktop: 4x8 grid layout

### Responsive Design
The application is fully responsive and works on all device sizes.

## Development

### Prerequisites
- Node.js
- npm or yarn

### Installation
```bash
npm install
```

### Running the Application
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Multi-Page Application (MPA) Structure
This project has been converted to a Multi-Page Application (MPA) structure to improve SEO and Google indexing while maintaining the existing React functionality.

See [MPA_README.md](MPA_README.md) for detailed information about the MPA structure and benefits.

### SEO Improvements
The application includes comprehensive SEO enhancements:
- Strategic internal linking between related pages
- Optimized meta tags and structured data
- Improved content organization and keyword targeting
- Enhanced crawlability through proper sitemap and robots.txt configuration

## Contributing
Feel free to submit issues and pull requests to improve the application.

## License
This project is open source and available under the MIT License.