# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start local Wrangler development server at localhost:8787
- `npm run deploy` - Deploy to Cloudflare Workers production environment
- `npm run setup-analytics` - Configure Cloudflare Web Analytics beacon token
- `npx wrangler dev` - Alternative direct command for development server
- `npx wrangler deploy --name [name]` - Deploy with custom worker name

## Architecture Overview

This is a WebGL-powered gradient generator deployed on Cloudflare Workers as a static site. The application follows a modular JavaScript architecture with distinct responsibilities:

### Core Application Flow
1. **GradientApp** (`main.js`) - Main orchestrator that initializes all components and manages the render loop
2. **WebGLRenderer** (`webgl.js`) - Handles WebGL context, shader compilation, and canvas rendering  
3. **GradientEngine** (`gradients.js`) - Manages gradient state, color calculations, and CSS/SVG generation
4. **PresetManager** (`presets.js`) - Handles predefined gradient configurations and preset application
5. **ControlsManager** (`controls.js`) - Manages all UI interactions and event binding
6. **ExportManager** (`export.js`) - Handles PNG, SVG, CSS export functionality

### WebGL Rendering Pipeline
- Custom vertex and fragment shaders in `/public/shaders/`
- Fragment shader uses noise-based algorithms with multiple octaves for organic gradient patterns
- Real-time uniform updates for colors, animation speed, complexity, and scale
- Continuous render loop with requestAnimationFrame

### State Management
- Central state managed by GradientEngine with observer pattern
- Settings object contains colors (4 color slots) and animation parameters
- Preset system allows switching between predefined color schemes and animation settings
- All components listen to engine changes via onChange callbacks

### UI Architecture
- Three control panels positioned absolutely: top-left (actions), top-right (configuration), bottom-right (export)
- Modal system for embed code display
- Real-time color pickers and range sliders bound to engine state
- Responsive design with mobile breakpoints

### Export System
- PNG export creates high-resolution canvas render (1920x1080)
- SVG export generates scalable vector gradients using radial gradients
- CSS export creates multiple variants including animated, static, radial, and conic gradients
- Canvas recording for WebM video export using MediaRecorder API

### Deployment
- Cloudflare Workers with static assets configuration
- All assets served from `/public/` directory
- Single-page application routing with fallback handling
- Global CDN distribution for performance

### Analytics Implementation
- Dual analytics setup: HTMLRewriter + direct JavaScript injection
- HTMLRewriter automatically injects beacon script into HTML responses
- Environment variable `CF_BEACON_TOKEN` for secure token management
- Setup script (`npm run setup-analytics`) for easy configuration
- Fallback direct HTML injection if environment variable not set

## Key Implementation Details

### Shader System
The fragment shader implements multi-octave noise using:
- Fractal Brownian Motion (fbm) for organic patterns
- Multiple noise layers combined based on complexity setting
- Color zones created with smoothstep functions for smooth transitions

### Animation System
- Time-based animations using uniform `u_time`
- Speed multiplier affects animation flow rate
- Complexity parameter controls noise octave blending
- Scale parameter adjusts pattern size

### Browser Compatibility
- WebGL fallback error handling for unsupported browsers
- MediaRecorder API feature detection for recording functionality
- Canvas export compatibility across browsers
- Mobile-responsive touch controls