class GradientApp {
    constructor() {
        this.canvas = null;
        this.renderer = null;
        this.engine = null;
        this.presetManager = null;
        this.controlsManager = null;
        this.exportManager = null;
        this.animationFrame = null;
        
        this.init();
    }
    
    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            this.setupCanvas();
            await this.initializeComponents();
            this.startRenderLoop();
            
            console.log('Gradient app initialized successfully');
        } catch (error) {
            console.error('Failed to initialize gradient app:', error);
            this.showError('Failed to initialize the application. Please refresh the page.');
        }
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('gradient-canvas');
        if (!this.canvas) {
            throw new Error('Canvas element not found');
        }
        
        // Set initial canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }
    
    async initializeComponents() {
        // Initialize core engine
        this.engine = new GradientEngine();
        
        // Initialize WebGL renderer
        this.renderer = new WebGLRenderer(this.canvas);
        await this.renderer.init();
        
        // Initialize preset manager
        this.presetManager = new PresetManager(this.engine);
        
        // Initialize controls
        this.controlsManager = new ControlsManager(this.engine, this.presetManager);
        
        // Initialize export manager
        this.exportManager = new ExportManager(this.engine, this.canvas);
        
        // Apply initial preset
        this.presetManager.applyPreset('default');
    }
    
    startRenderLoop() {
        const render = () => {
            try {
                const settings = this.engine.getSettings();
                this.renderer.render(settings);
                this.animationFrame = requestAnimationFrame(render);
            } catch (error) {
                console.error('Render error:', error);
                this.stopRenderLoop();
                this.showError('Rendering error occurred. Please refresh the page.');
            }
        };
        
        render();
    }
    
    stopRenderLoop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
    
    showError(message) {
        // Create error overlay
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            text-align: center;
            padding: 20px;
        `;
        
        errorDiv.innerHTML = `
            <div>
                <h2>Oops! Something went wrong</h2>
                <p>${message}</p>
                <button onclick="window.location.reload()" style="
                    margin-top: 20px;
                    padding: 12px 24px;
                    background: #007bff;
                    border: none;
                    border-radius: 6px;
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                ">Refresh Page</button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
    }
    
    // Public API methods
    exportCurrentGradient() {
        return this.exportManager.exportPNG();
    }
    
    setPreset(presetName) {
        return this.presetManager.applyPreset(presetName);
    }
    
    randomize() {
        this.engine.randomize();
    }
    
    getSettings() {
        return this.engine.getSettings();
    }
    
    updateColors(colors) {
        this.engine.updateColors(colors);
    }
    
    updateAnimation(animation) {
        this.engine.updateAnimation(animation);
    }
}

// Initialize the application when the script loads
window.GradientApp = GradientApp;

// Auto-initialize if not in a module context
if (typeof module === 'undefined') {
    window.gradientApp = new GradientApp();
}

// Add some global keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Only process if no input is focused
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
    }
    
    switch (e.key.toLowerCase()) {
        case 'r':
            if (window.gradientApp) {
                window.gradientApp.randomize();
            }
            break;
        case 'e':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                if (window.gradientApp) {
                    window.gradientApp.exportCurrentGradient();
                }
            }
            break;
        case ' ':
            e.preventDefault();
            document.getElementById('randomize-btn').click();
            break;
    }
});

// Prevent context menu on canvas
document.addEventListener('contextmenu', (e) => {
    if (e.target.id === 'gradient-canvas') {
        e.preventDefault();
    }
});

// Add loading indicator
document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 18px;
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    loadingIndicator.textContent = 'Loading WebGL Gradients...';
    document.body.appendChild(loadingIndicator);
    
    // Remove loading indicator after a short delay
    setTimeout(() => {
        if (document.getElementById('loading-indicator')) {
            document.body.removeChild(loadingIndicator);
        }
    }, 2000);
});