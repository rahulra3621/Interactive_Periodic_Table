# Interactive Periodic Table

A modern, interactive web application that displays the complete periodic table of elements with detailed information and dynamic features.


## Features

- **Complete Periodic Table**: All 118 elements with detailed information
- **Interactive Elements**: 
  - Hover effects with quick information preview
  - Click elements for detailed modal view with images
  - Smooth animations and transitions
- **Search Functionality**: Search elements by name, symbol, or atomic number
- **Category Filters**: Filter elements by:
  - All elements
  - Metals
  - Alkali Metals
  - Alkaline Earth Metals
  - Transition Metals
  - Post-transition Metals
  - Metalloids
  - Nonmetals
  - Noble Gases
  - Lanthanides
  - Actinides
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: 
  - Dark theme with gradient background
  - Color-coded element categories
  - Beautiful hover and click animations
  - Modal view with element images

## Technical Details

The project is built using vanilla JavaScript (ES6+), HTML5, and CSS3, featuring:
- CSS Grid for periodic table layout
- ES6 Modules for code organization
- Responsive design using CSS media queries
- Modern animations and transitions
- Dynamic element positioning system

## Project Structure

```
periodic-table/
├── index.html
├── styles.css
├── script.js
├── elements.js
└── images/
    └── elements/
        ├── hydrogen.jpg
        ├── helium.jpg
        └── ...
```

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/periodic-table.git
```

2. Due to ES6 modules being used, you'll need to serve the files through a web server. You can use any of these methods:

Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Using Node.js (with `http-server`):
```bash
npm install -g http-server
http-server
```

3. Open your browser and navigate to:
- Python: `http://localhost:8000`
- Node: `http://localhost:8080`

## Usage

- **View Element Details**: Hover over any element to see quick information, click for detailed view
- **Search**: Type in the search box to find elements by name, symbol, or atomic number
- **Filter**: Click category buttons to filter elements by their properties
- **Mobile**: Touch elements to view detailed information

## Browser Support

The application works best in modern browsers that support:
- CSS Grid
- ES6 Modules
- CSS Custom Properties
- Modern CSS Animations

Recommended browsers:
- Chrome 60+
- Firefox 54+
- Safari 10.1+
- Edge 16+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Element data sourced from reliable chemistry databases
- Element images sourced from public domain resources