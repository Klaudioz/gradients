# Gradients

A WebGL-powered gradient generator inspired by [craft-gradients.artcreativecode.com](https://craft-gradients.artcreativecode.com/), deployed on Cloudflare Workers.

## 🎨 Features

### Real-time WebGL Gradients
- **Custom Fragment Shaders** - Noise-based algorithms for organic, flowing patterns
- **4-Color Blending** - Mix up to 4 colors with smooth transitions
- **Dynamic Animation** - Adjustable speed, complexity, and scale parameters
- **Cyberpunk Default** - Eye-catching cyberpunk theme as the default preset

### Interactive Controls
- **Top Left Panel**
  - 🔗 **Embed** - Generate HTML embed codes
  - 🎬 **Record** - Canvas recording to WebM video (10-second limit)
  - 📤 **Share** - Native sharing with Twitter/X integration and clipboard fallback
  - 🎲 **Randomize** - Generate random gradient combinations

- **Top Right Panel** 
  - 🌈 **Color Pickers** - Real-time 4-color modification
  - ⚡ **Animation Controls** - Speed, complexity, and scale sliders
  - 📥 **Export Options** - PNG (1920x1080), SVG, and CSS formats

- **Bottom Right Panel**
  - 🎨 **24 Presets** - Complete gradient library including:
    - **Basic**: Default, Warm, Cool, High Contrast
    - **Themed**: Cinematic, Vintage, Cyberpunk, Ocean, Forest, Fire
    - **Seasonal**: Spring, Autumn, Winter (Ice), Desert
    - **Artistic**: Neon, Electric, Cosmic, Blood, Lava
    - **Sophisticated**: Purple, Gold, Night, Mint, Sunset

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
# Configure Cloudflare Web Analytics (secure environment variable setup)
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
- **WebGL** - Custom vertex and fragment shaders with noise-based algorithms
- **Vanilla JavaScript** - Modular ES6+ architecture with observer pattern
- **CSS Grid/Flexbox** - Responsive UI design with unified dark theme
- **Cloudflare Workers** - Global edge deployment with HTMLRewriter for security
- **Environment Variables** - Secure analytics token management

## 📁 Project Structure

```
/
├── public/                 # Static assets
│   ├── css/               # Stylesheets (unified dark theme)
│   ├── js/                # JavaScript modules
│   ├── shaders/           # WebGL shaders (GLSL)
│   └── index.html         # Main HTML file
├── src/                   # Worker source
│   └── index.js           # Cloudflare Worker with HTMLRewriter
├── scripts/               # Build and setup scripts
│   └── setup-analytics.js # Secure analytics configuration
├── wrangler.jsonc         # Cloudflare Workers config with environment variables
├── package.json           # Dependencies and scripts
├── ANALYTICS_SETUP.md     # Security-focused analytics guide
├── CLAUDE.md              # Development guidance
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
- **Mobile Responsive** - Touch-friendly controls with collapsible panels
- **Progressive Enhancement** - Graceful fallbacks for unsupported features

## 🔒 Security Features

- **Secure Analytics** - Environment variable token management with HTMLRewriter
- **No Hardcoded Secrets** - All sensitive data handled via environment variables
- **Runtime Injection** - Analytics tokens injected securely at edge
- **Version Control Safe** - No sensitive information in source code

## 🙏 Acknowledgments

- Original inspiration: [craft-gradients.artcreativecode.com](https://craft-gradients.artcreativecode.com/) by Art Korenevych
- Deployed with [Cloudflare Workers](https://workers.cloudflare.com/)
- WebGL gradient techniques inspired by various shader art communities