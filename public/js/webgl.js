class WebGLRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = null;
        this.program = null;
        this.uniforms = {};
        this.attributes = {};
        this.vertexBuffer = null;
        this.startTime = Date.now();
        this.initialized = false;
    }
    
    async init() {
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        
        if (!this.gl) {
            console.error('WebGL not supported');
            return;
        }
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        await this.loadShaders();
        this.createGeometry();
        this.setupUniforms();
        this.initialized = true;
    }
    
    resize() {
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = this.canvas.clientWidth * dpr;
        const displayHeight = this.canvas.clientHeight * dpr;
        
        if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
            this.canvas.width = displayWidth;
            this.canvas.height = displayHeight;
            
            if (this.gl) {
                this.gl.viewport(0, 0, displayWidth, displayHeight);
            }
        }
    }
    
    async loadShaders() {
        try {
            const [vertexSource, fragmentSource] = await Promise.all([
                fetch('shaders/vertex.glsl').then(r => r.text()),
                fetch('shaders/fragment.glsl').then(r => r.text())
            ]);
            
            const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
            const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);
            
            this.program = this.createProgram(vertexShader, fragmentShader);
            this.gl.useProgram(this.program);
            
        } catch (error) {
            console.error('Failed to load shaders:', error);
        }
    }
    
    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }
    
    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Program linking error:', this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
            return null;
        }
        
        return program;
    }
    
    createGeometry() {
        const vertices = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1
        ]);
        
        this.vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
        
        this.attributes.position = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(this.attributes.position);
        this.gl.vertexAttribPointer(this.attributes.position, 2, this.gl.FLOAT, false, 0, 0);
    }
    
    setupUniforms() {
        this.uniforms = {
            time: this.gl.getUniformLocation(this.program, 'u_time'),
            resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
            color1: this.gl.getUniformLocation(this.program, 'u_color1'),
            color2: this.gl.getUniformLocation(this.program, 'u_color2'),
            color3: this.gl.getUniformLocation(this.program, 'u_color3'),
            color4: this.gl.getUniformLocation(this.program, 'u_color4'),
            speed: this.gl.getUniformLocation(this.program, 'u_speed'),
            complexity: this.gl.getUniformLocation(this.program, 'u_complexity'),
            scale: this.gl.getUniformLocation(this.program, 'u_scale')
        };
    }
    
    hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return [r, g, b, 1.0];
    }
    
    updateUniforms(settings) {
        const time = (Date.now() - this.startTime) / 1000;
        
        this.gl.uniform1f(this.uniforms.time, time);
        this.gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
        
        if (settings.colors) {
            this.gl.uniform4fv(this.uniforms.color1, this.hexToRgb(settings.colors.color1));
            this.gl.uniform4fv(this.uniforms.color2, this.hexToRgb(settings.colors.color2));
            this.gl.uniform4fv(this.uniforms.color3, this.hexToRgb(settings.colors.color3));
            this.gl.uniform4fv(this.uniforms.color4, this.hexToRgb(settings.colors.color4));
        }
        
        if (settings.animation) {
            this.gl.uniform1f(this.uniforms.speed, settings.animation.speed);
            this.gl.uniform1f(this.uniforms.complexity, settings.animation.complexity);
            this.gl.uniform1f(this.uniforms.scale, settings.animation.scale);
        }
    }
    
    render(settings) {
        if (!this.initialized || !this.program) return;
        
        this.resize();
        this.updateUniforms(settings);
        
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}

window.WebGLRenderer = WebGLRenderer;