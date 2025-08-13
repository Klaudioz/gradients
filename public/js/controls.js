class ControlsManager {
    constructor(gradientEngine, presetManager) {
        this.engine = gradientEngine;
        this.presetManager = presetManager;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        
        this.initializeControls();
        this.bindEvents();
        this.initializeMobileLayout();
    }
    
    initializeControls() {
        this.updateColorInputs();
        this.updateAnimationSliders();
        this.updatePresetButtons();
    }
    
    bindEvents() {
        // Mobile advanced controls toggle
        document.getElementById('advanced-controls-toggle').addEventListener('click', () => this.toggleAdvancedControls());
        
        // Collapsible sections
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', (e) => this.toggleSection(e.target.closest('.section-header')));
        });
        
        // Top-left controls
        document.getElementById('embed-btn').addEventListener('click', () => this.showEmbedModal());
        document.getElementById('record-btn').addEventListener('click', () => this.toggleRecording());
        document.getElementById('share-btn').addEventListener('click', () => this.shareGradient());
        document.getElementById('randomize-btn').addEventListener('click', () => this.randomizeGradient());
        
        // Color controls
        document.getElementById('color1').addEventListener('input', (e) => this.updateColor('color1', e.target.value));
        document.getElementById('color2').addEventListener('input', (e) => this.updateColor('color2', e.target.value));
        document.getElementById('color3').addEventListener('input', (e) => this.updateColor('color3', e.target.value));
        document.getElementById('color4').addEventListener('input', (e) => this.updateColor('color4', e.target.value));
        
        // Animation controls
        document.getElementById('speed-slider').addEventListener('input', (e) => this.updateSpeed(parseFloat(e.target.value)));
        document.getElementById('complexity-slider').addEventListener('input', (e) => this.updateComplexity(parseInt(e.target.value)));
        document.getElementById('scale-slider').addEventListener('input', (e) => this.updateScale(parseFloat(e.target.value)));
        
        // Preset controls
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                this.applyPreset(preset);
            });
        });
        
        // Modal controls
        document.querySelector('.close-btn').addEventListener('click', () => this.hideEmbedModal());
        document.getElementById('copy-embed').addEventListener('click', () => this.copyEmbedCode());
        
        // Close modal on background click
        document.getElementById('embed-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('embed-modal')) {
                this.hideEmbedModal();
            }
        });
        
        // Listen to engine changes
        this.engine.onChange((settings) => this.onSettingsChange(settings));
    }
    
    updateColor(colorKey, value) {
        this.engine.updateColors({ [colorKey]: value });
    }
    
    updateSpeed(value) {
        this.engine.updateAnimation({ speed: value });
        document.getElementById('speed-value').textContent = value.toFixed(1);
    }
    
    updateComplexity(value) {
        this.engine.updateAnimation({ complexity: value });
        document.getElementById('complexity-value').textContent = value.toString();
    }
    
    updateScale(value) {
        this.engine.updateAnimation({ scale: value });
        document.getElementById('scale-value').textContent = value.toFixed(1);
    }
    
    applyPreset(presetName) {
        this.presetManager.applyPreset(presetName);
        this.updatePresetButtons();
    }
    
    randomizeGradient() {
        this.engine.randomize();
        this.updatePresetButtons();
    }
    
    updateColorInputs() {
        const colors = this.engine.getSettings().colors;
        document.getElementById('color1').value = colors.color1;
        document.getElementById('color2').value = colors.color2;
        document.getElementById('color3').value = colors.color3;
        document.getElementById('color4').value = colors.color4;
    }
    
    updateAnimationSliders() {
        const animation = this.engine.getSettings().animation;
        
        const speedSlider = document.getElementById('speed-slider');
        speedSlider.value = animation.speed;
        document.getElementById('speed-value').textContent = animation.speed.toFixed(1);
        
        const complexitySlider = document.getElementById('complexity-slider');
        complexitySlider.value = animation.complexity;
        document.getElementById('complexity-value').textContent = animation.complexity.toString();
        
        const scaleSlider = document.getElementById('scale-slider');
        scaleSlider.value = animation.scale;
        document.getElementById('scale-value').textContent = animation.scale.toFixed(1);
    }
    
    updatePresetButtons() {
        const currentPreset = this.presetManager.getCurrentPreset();
        document.querySelectorAll('.preset-btn').forEach(btn => {
            if (btn.dataset.preset === currentPreset) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    onSettingsChange(settings) {
        this.updateColorInputs();
        this.updateAnimationSliders();
    }
    
    showEmbedModal() {
        const embedCode = this.engine.generateEmbedCode();
        document.getElementById('embed-code').value = embedCode;
        document.getElementById('embed-modal').classList.remove('hidden');
    }
    
    hideEmbedModal() {
        document.getElementById('embed-modal').classList.add('hidden');
    }
    
    copyEmbedCode() {
        const embedCode = document.getElementById('embed-code');
        embedCode.select();
        document.execCommand('copy');
        
        const copyBtn = document.getElementById('copy-embed');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }
    
    async toggleRecording() {
        if (!this.isRecording) {
            await this.startRecording();
        } else {
            this.stopRecording();
        }
    }
    
    async startRecording() {
        try {
            const canvas = document.getElementById('gradient-canvas');
            const stream = canvas.captureStream(30);
            
            // Try different codec options for better browser compatibility
            let mimeType = 'video/webm; codecs=vp9';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/webm; codecs=vp8';
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    mimeType = 'video/webm';
                }
            }
            
            this.mediaRecorder = new MediaRecorder(stream, { mimeType });
            this.recordedChunks = [];
            this.recordingStartTime = Date.now();
            this.recordingDuration = 10000; // 10 seconds limit
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };
            
            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.recordedChunks, { type: mimeType });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `gradient-animation-${Date.now()}.webm`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                this.showRecordingNotification('Recording saved successfully!');
            };
            
            this.mediaRecorder.start();
            this.isRecording = true;
            
            // Update button UI
            const recordBtn = document.getElementById('record-btn');
            recordBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="4" y="4" width="16" height="16" rx="2"/>
                </svg>
                <span id="record-timer">10s</span>
            `;
            recordBtn.style.background = '#e74c3c';
            
            // Start countdown timer
            this.startRecordingTimer();
            
            // Auto-stop after time limit
            this.recordingTimeout = setTimeout(() => {
                if (this.isRecording) {
                    this.stopRecording();
                }
            }, this.recordingDuration);
            
        } catch (error) {
            console.error('Recording failed:', error);
            alert('Recording failed. Your browser may not support canvas recording.');
        }
    }
    
    startRecordingTimer() {
        const updateTimer = () => {
            if (!this.isRecording) return;
            
            const elapsed = Date.now() - this.recordingStartTime;
            const remaining = Math.max(0, Math.ceil((this.recordingDuration - elapsed) / 1000));
            
            const timerSpan = document.getElementById('record-timer');
            if (timerSpan) {
                timerSpan.textContent = `${remaining}s`;
            }
            
            if (remaining > 0 && this.isRecording) {
                setTimeout(updateTimer, 100);
            }
        };
        updateTimer();
    }
    
    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            
            // Clear timeout if manually stopped
            if (this.recordingTimeout) {
                clearTimeout(this.recordingTimeout);
                this.recordingTimeout = null;
            }
            
            const recordBtn = document.getElementById('record-btn');
            recordBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                </svg>
                Record
            `;
            recordBtn.style.background = '';
        }
    }
    
    showRecordingNotification(message) {
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
    
    async shareGradient() {
        // Generate URL with current gradient state
        const encodedGradient = this.engine.encodeToURL();
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?g=${encodedGradient}`;
        
        // Create more specific tweet text based on current preset or custom gradient
        const currentPreset = this.presetManager.getCurrentPreset();
        let tweetText;
        
        if (currentPreset) {
            tweetText = `Check out my ${currentPreset} animated gradient! 🎨✨`;
        } else {
            tweetText = 'Check out my custom animated gradient! 🎨✨';
        }
        
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
        
        // Try native sharing first (mobile browsers)
        if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
            try {
                await navigator.share({
                    title: 'Beautiful WebGL Gradient',
                    text: tweetText,
                    url: shareUrl
                });
                return;
            } catch (error) {
                console.log('Native share cancelled or failed:', error);
            }
        }
        
        // Desktop behavior: open Twitter in new tab
        try {
            const newWindow = window.open(twitterUrl, '_blank', 'width=550,height=420,scrollbars=yes,resizable=yes');
            if (newWindow) {
                newWindow.focus();
                this.showShareNotification('Twitter/X share opened in new tab!');
            } else {
                // Popup blocked, fallback to clipboard
                await this.fallbackShare(shareUrl, tweetText);
            }
        } catch (error) {
            console.error('Twitter share failed:', error);
            await this.fallbackShare(shareUrl, tweetText);
        }
    }
    
    async fallbackShare(url, text) {
        try {
            // Try copying to clipboard with full tweet text
            const fullText = `${text} ${url}`;
            await navigator.clipboard.writeText(fullText);
            this.showShareNotification('Tweet text copied to clipboard! Paste it on Twitter/X');
        } catch (error) {
            console.error('Clipboard failed:', error);
            this.showShareNotification('Share URL: ' + url);
        }
    }
    
    showShareNotification(message) {
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
            max-width: 300px;
            text-align: center;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
    
    toggleAdvancedControls() {
        const toggle = document.getElementById('advanced-controls-toggle');
        const panel = document.getElementById('advanced-controls');
        
        toggle.classList.toggle('active');
        panel.classList.toggle('mobile-open');
    }
    
    toggleSection(header) {
        // Only work on mobile
        if (window.innerWidth > 768) return;
        
        const section = header.dataset.section;
        const content = document.getElementById(`${section}-content`);
        const icon = header.querySelector('.section-icon');
        
        // Close other sections
        document.querySelectorAll('.section-content').forEach(otherContent => {
            if (otherContent !== content && otherContent.classList.contains('open')) {
                otherContent.classList.remove('open');
                const otherHeader = document.querySelector(`[data-section="${otherContent.id.replace('-content', '')}"]`);
                if (otherHeader) {
                    otherHeader.classList.remove('active');
                }
            }
        });
        
        // Toggle current section
        content.classList.toggle('open');
        header.classList.toggle('active');
    }
    
    initializeMobileLayout() {
        // Initialize with Colors section open on mobile
        if (window.innerWidth <= 768) {
            const colorsContent = document.getElementById('colors-content');
            const colorsHeader = document.querySelector('[data-section="colors"]');
            
            colorsContent.classList.add('open');
            colorsHeader.classList.add('active');
        }
    }
}

window.ControlsManager = ControlsManager;