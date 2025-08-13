# Gradients

A WebGL-powered gradient generator inspired by [craft-gradients.artcreativecode.com](https://craft-gradients.artcreativecode.com/), deployed on Cloudflare Workers.

## 🎨 Features

### Real-time WebGL Gradients
- **Custom Fragment Shaders** - Noise-based algorithms for organic, flowing patterns
- **4-Color Blending** - Mix up to 4 colors with smooth transitions
- **Dynamic Animation** - Adjustable speed, complexity, and scale parameters

### Interactive Controls
- **Top Left Panel**
  - 🔗 **Embed** - Generate HTML embed codes
  - 🎬 **Record** - Canvas recording to WebM video
  - 📤 **Share** - Native sharing with clipboard fallback
  - 🎲 **Randomize** - Generate random gradient combinations

- **Top Right Panel**
  - 🎨 **8 Presets** - Warm, Cool, High Contrast, Cinematic, Vintage, Neon, Sunset, Ocean
  - 🌈 **Color Pickers** - Real-time color modification
  - ⚡ **Animation Controls** - Speed, complexity, and scale sliders

- **Bottom Right Panel**
  - 📥 **Export Options** - PNG (1920x1080), SVG, and CSS formats

### Export Formats
- **PNG** - High-resolution image export
- **SVG** - Scalable vector gradients with radial patterns
- **CSS** - Complete stylesheets with multiple gradient variants and animations

## 🚀 Live Demo

**[https://gradients.klaudioz.workers.dev](https://gradients.klaudioz.workers.dev)**

## 🛠 Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd gradient

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:8787`

### Analytics Setup (Optional)
```bash
# Configure Cloudflare Web Analytics
npm run setup-analytics
```

### Deployment
```bash
# Deploy to Cloudflare Workers
npm run deploy
```

## 🏗 Architecture

### Core Components
- **WebGL Renderer** - Custom shader system for real-time gradient rendering
- **Gradient Engine** - State management and gradient generation algorithms
- **Preset Manager** - Predefined gradient configurations
- **Controls Manager** - UI interaction and event handling
- **Export Manager** - Multiple format export functionality

### Technology Stack
- **WebGL** - Custom vertex and fragment shaders
- **Vanilla JavaScript** - Modular ES6+ architecture
- **CSS Grid/Flexbox** - Responsive UI design
- **Cloudflare Workers** - Global edge deployment with static assets

## 📁 Project Structure

```
/
├── public/                 # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript modules
│   ├── shaders/           # WebGL shaders (GLSL)
│   └── index.html         # Main HTML file
├── wrangler.jsonc         # Cloudflare Workers config
├── package.json           # Dependencies and scripts
└── README.md
```

## ⌨️ Keyboard Shortcuts

- **R** - Randomize gradient
- **Space** - Randomize gradient (alternative)
- **Ctrl/Cmd + E** - Export as PNG

## 🎯 Browser Support

- **WebGL Required** - Modern browsers with WebGL support
- **MediaRecorder API** - For video recording (Chrome, Firefox, Safari)
- **Canvas API** - For image export (all modern browsers)
- **Mobile Responsive** - Touch-friendly controls

## 🙏 Acknowledgments

- Original inspiration: [craft-gradients.artcreativecode.com](https://craft-gradients.artcreativecode.com/) by Art Korenevych
- Deployed with [Cloudflare Workers](https://workers.cloudflare.com/)
- WebGL gradient techniques inspired by various shader art communities