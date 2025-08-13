class GradientEngine {
    constructor() {
        this.settings = {
            colors: {
                color1: '#ff6b6b',
                color2: '#4ecdc4',
                color3: '#45b7d1',
                color4: '#f7dc6f'
            },
            animation: {
                speed: 1.0,
                complexity: 3,
                scale: 1.0
            },
            currentPreset: null
        };
        
        this.callbacks = [];
    }
    
    updateColors(colors) {
        this.settings.colors = { ...this.settings.colors, ...colors };
        this.notifyChange();
    }
    
    updateAnimation(animation) {
        this.settings.animation = { ...this.settings.animation, ...animation };
        this.notifyChange();
    }
    
    setPreset(presetName, preset) {
        this.settings.colors = { ...preset.colors };
        this.settings.animation = { ...this.settings.animation, ...preset.animation };
        this.settings.currentPreset = presetName;
        this.notifyChange();
    }
    
    randomize() {
        const randomColor = () => {
            const hue = Math.random() * 360;
            const saturation = 60 + Math.random() * 40;
            const lightness = 40 + Math.random() * 40;
            return this.hslToHex(hue, saturation, lightness);
        };
        
        this.settings.colors = {
            color1: randomColor(),
            color2: randomColor(),
            color3: randomColor(),
            color4: randomColor()
        };
        
        this.settings.animation = {
            speed: 0.5 + Math.random() * 1.5,
            complexity: 1 + Math.floor(Math.random() * 5),
            scale: 0.5 + Math.random() * 2.5
        };
        
        this.settings.currentPreset = null;
        this.notifyChange();
    }
    
    hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        
        let r = 0, g = 0, b = 0;
        
        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }
        
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    
    onChange(callback) {
        this.callbacks.push(callback);
    }
    
    notifyChange() {
        this.callbacks.forEach(callback => callback(this.settings));
    }
    
    getSettings() {
        return this.settings;
    }
    
    generateCSS() {
        const { color1, color2, color3, color4 } = this.settings.colors;
        
        return `background: linear-gradient(45deg, ${color1}, ${color2}, ${color3}, ${color4});
background-size: 400% 400%;
animation: gradientShift 8s ease infinite;

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}`;
    }
    
    generateSVG(width = 800, height = 600) {
        const { color1, color2, color3, color4 } = this.settings.colors;
        
        return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="grad1" cx="20%" cy="20%" r="80%">
            <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
            <stop offset="33%" style="stop-color:${color2};stop-opacity:1" />
            <stop offset="66%" style="stop-color:${color3};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color4};stop-opacity:1" />
        </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad1)" />
</svg>`;
    }
    
    generateEmbedCode() {
        const css = this.generateCSS();
        
        return `<!-- Gradient Background -->
<div style="${css.replace(/\n/g, ' ').replace(/\s+/g, ' ')}">
    <!-- Your content here -->
</div>`;
    }
}

window.GradientEngine = GradientEngine;