# 2D Image Rasterizer

A web-based image processing tool built with React that allows users to convert and process images with customizable settings and real-time preview.

## Features

- Image upload with drag-and-drop support
- Support for multiple image formats (PNG, JPG, JPEG, GIF, SVG, PDF)
- Real-time image processing and preview
- Customizable settings:
  - Resolution (DPI) control (72-1200 DPI)
  - Output format selection (PNG, JPG, WebP)
  - Quality adjustment (1-100%)
  - Pixel visualization toggle
- Interactive canvas with zoom controls
- One-click image download
- Responsive design with modern UI

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/2D-Image-Rasterizer.git
cd 2D-Image-Rasterizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at [http://localhost:3000](http://localhost:3000).

## Usage

1. Upload an image by dragging and dropping or clicking the upload area
2. Adjust the processing settings:
   - Set the desired resolution (DPI)
   - Choose the output format
   - Adjust the quality level
   - Toggle pixel visualization if needed
3. Use the zoom controls to inspect the image
4. Download the processed image

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Project Structure

```
2D-Image-Rasterizer/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── ImageUploader.js
│   │   ├── SettingsPanel.js
│   │   └── ImageProcessor.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Technical Details

The application uses:
- React for the UI framework
- Fabric.js for canvas manipulation
- React Dropzone for file uploads
- Styled Components for styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- [Fabric.js](http://fabricjs.com/) for canvas manipulation
- [React Dropzone](https://react-dropzone.js.org/) for file uploads
