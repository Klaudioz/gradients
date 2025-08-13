class ExportManager {
    constructor(gradientEngine, canvas) {
        this.engine = gradientEngine;
        this.canvas = canvas;
        
        this.bindEvents();
    }
    
    bindEvents() {
        document.getElementById('export-png').addEventListener('click', () => this.exportPNG());
        document.getElementById('export-svg').addEventListener('click', () => this.exportSVG());
        document.getElementById('export-css').addEventListener('click', () => this.exportCSS());
    }
    
    exportPNG() {
        try {
            // For WebGL canvas, use toDataURL directly
            const dataURL = this.canvas.toDataURL('image/png');
            
            // Create download link
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = `gradient-export-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Show success notification
            this.showExportNotification('PNG exported successfully!');
            
        } catch (error) {
            console.error('PNG export failed:', error);
            // Try fallback method with smaller size
            try {
                this.exportPNGFallback();
            } catch (fallbackError) {
                console.error('PNG export fallback failed:', fallbackError);
                alert('PNG export failed. Your browser may not support WebGL canvas export.');
            }
        }
    }
    
    exportPNGFallback() {
        // Fallback method: create a new canvas and use WebGL readPixels
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Create temporary canvas for export
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Get WebGL context and read pixels
        const gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        const pixels = new Uint8Array(width * height * 4);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        
        // Create ImageData and flip vertically (WebGL has flipped Y)
        const imageData = tempCtx.createImageData(width, height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const srcIndex = ((height - y - 1) * width + x) * 4;
                const dstIndex = (y * width + x) * 4;
                imageData.data[dstIndex] = pixels[srcIndex];
                imageData.data[dstIndex + 1] = pixels[srcIndex + 1];
                imageData.data[dstIndex + 2] = pixels[srcIndex + 2];
                imageData.data[dstIndex + 3] = pixels[srcIndex + 3];
            }
        }
        
        tempCtx.putImageData(imageData, 0, 0);
        
        // Export the corrected image
        const dataURL = tempCanvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = `gradient-export-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        this.showExportNotification('PNG exported successfully!');
    }
    
    exportSVG() {
        try {
            const svgContent = this.engine.generateSVG(1920, 1080);
            const blob = new Blob([svgContent], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'gradient-export.svg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error('SVG export failed:', error);
            alert('SVG export failed. Please try again.');
        }
    }
    
    exportCSS() {
        try {
            const cssContent = this.generateFullCSS();
            const blob = new Blob([cssContent], { type: 'text/css' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'gradient-styles.css';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error('CSS export failed:', error);
            alert('CSS export failed. Please try again.');
        }
    }
    
    generateFullCSS() {
        const settings = this.engine.getSettings();
        const { color1, color2, color3, color4 } = settings.colors;
        const { speed } = settings.animation;
        
        const animationDuration = Math.max(4, 12 / speed);
        
        return `/* Gradient Background Styles */
.gradient-background {
    background: linear-gradient(-45deg, ${color1}, ${color2}, ${color3}, ${color4});
    background-size: 400% 400%;
    animation: gradientShift ${animationDuration}s ease infinite;
}

.gradient-background-static {
    background: linear-gradient(-45deg, ${color1}, ${color2}, ${color3}, ${color4});
}

.gradient-radial {
    background: radial-gradient(circle at 30% 20%, ${color1}, ${color2}, ${color3}, ${color4});
}

.gradient-conic {
    background: conic-gradient(from 0deg at 50% 50%, ${color1}, ${color2}, ${color3}, ${color4}, ${color1});
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

/* Usage Examples */
/*
    Apply to body for full background:
    body {
        min-height: 100vh;
    }
    
    Apply to container:
    .container {
        padding: 2rem;
    }
    
    Use as overlay:
    .gradient-overlay::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.8;
        z-index: -1;
    }
*/`;
    }
    
    exportSettings() {
        const settings = this.engine.getSettings();
        const exportData = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            settings: settings
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gradient-settings.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    importSettings(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.settings) {
                        this.engine.updateColors(data.settings.colors);
                        this.engine.updateAnimation(data.settings.animation);
                        resolve(data.settings);
                    } else {
                        reject(new Error('Invalid settings file'));
                    }
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(new Error('File read error'));
            reader.readAsText(file);
        });
    }
    
    copyCSS() {
        const cssContent = this.engine.generateCSS();
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(cssContent).then(() => {
                this.showCopyNotification('CSS copied to clipboard!');
            }).catch(err => {
                console.error('Copy failed:', err);
                this.fallbackCopy(cssContent);
            });
        } else {
            this.fallbackCopy(cssContent);
        }
    }
    
    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopyNotification('CSS copied to clipboard!');
        } catch (err) {
            console.error('Fallback copy failed:', err);
            alert('Copy failed. Please copy manually.');
        }
        
        document.body.removeChild(textArea);
    }
    
    showCopyNotification(message) {
        this.showExportNotification(message);
    }
    
    showExportNotification(message) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 14px;
            pointer-events: none;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 2000);
    }
}

window.ExportManager = ExportManager;