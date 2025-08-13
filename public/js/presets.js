const GRADIENT_PRESETS = {
    default: {
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
        }
    },
    
    warm: {
        colors: {
            color1: '#ff9a56',
            color2: '#ff6b6b',
            color3: '#feca57',
            color4: '#ff7675'
        },
        animation: {
            speed: 0.8,
            complexity: 2,
            scale: 1.2
        }
    },
    
    cool: {
        colors: {
            color1: '#74b9ff',
            color2: '#0984e3',
            color3: '#00cec9',
            color4: '#6c5ce7'
        },
        animation: {
            speed: 1.0,
            complexity: 3,
            scale: 1.0
        }
    },
    
    contrast: {
        colors: {
            color1: '#2d3436',
            color2: '#ffffff',
            color3: '#ddd',
            color4: '#000000'
        },
        animation: {
            speed: 1.5,
            complexity: 4,
            scale: 0.8
        }
    },
    
    cinematic: {
        colors: {
            color1: '#2c3e50',
            color2: '#3498db',
            color3: '#9b59b6',
            color4: '#1abc9c'
        },
        animation: {
            speed: 0.6,
            complexity: 4,
            scale: 1.5
        }
    },
    
    vintage: {
        colors: {
            color1: '#d63031',
            color2: '#fdcb6e',
            color3: '#6c5ce7',
            color4: '#fd79a8'
        },
        animation: {
            speed: 0.5,
            complexity: 2,
            scale: 2.0
        }
    },
    
    neon: {
        colors: {
            color1: '#fd79a8',
            color2: '#fdcb6e',
            color3: '#00cec9',
            color4: '#6c5ce7'
        },
        animation: {
            speed: 2.0,
            complexity: 5,
            scale: 0.7
        }
    },
    
    sunset: {
        colors: {
            color1: '#fd79a8',
            color2: '#fdcb6e',
            color3: '#e17055',
            color4: '#d63031'
        },
        animation: {
            speed: 0.7,
            complexity: 3,
            scale: 1.3
        }
    },
    
    cyberpunk: {
        colors: {
            color1: '#ff006e',
            color2: '#00f5ff',
            color3: '#8338ec',
            color4: '#3a86ff'
        },
        animation: {
            speed: 1.8,
            complexity: 5,
            scale: 0.8
        }
    },
    
    ocean: {
        colors: {
            color1: '#0984e3',
            color2: '#74b9ff',
            color3: '#00cec9',
            color4: '#55a3ff'
        },
        animation: {
            speed: 1.2,
            complexity: 4,
            scale: 1.1
        }
    },
    
    forest: {
        colors: {
            color1: '#00b894',
            color2: '#55a3ff',
            color3: '#6c5ce7',
            color4: '#a29bfe'
        },
        animation: {
            speed: 0.9,
            complexity: 3,
            scale: 1.4
        }
    },
    
    fire: {
        colors: {
            color1: '#d63031',
            color2: '#e17055',
            color3: '#fdcb6e',
            color4: '#fd79a8'
        },
        animation: {
            speed: 1.6,
            complexity: 4,
            scale: 0.9
        }
    },
    
    purple: {
        colors: {
            color1: '#6c5ce7',
            color2: '#a29bfe',
            color3: '#fd79a8',
            color4: '#fdcb6e'
        },
        animation: {
            speed: 1.1,
            complexity: 3,
            scale: 1.2
        }
    },
    
    gold: {
        colors: {
            color1: '#fdcb6e',
            color2: '#e17055',
            color3: '#fd79a8',
            color4: '#d63031'
        },
        animation: {
            speed: 0.8,
            complexity: 2,
            scale: 1.5
        }
    },
    
    ice: {
        colors: {
            color1: '#74b9ff',
            color2: '#0984e3',
            color3: '#00cec9',
            color4: '#ffffff'
        },
        animation: {
            speed: 0.6,
            complexity: 2,
            scale: 1.8
        }
    },
    
    desert: {
        colors: {
            color1: '#e17055',
            color2: '#fdcb6e',
            color3: '#d63031',
            color4: '#ff7675'
        },
        animation: {
            speed: 0.7,
            complexity: 3,
            scale: 1.6
        }
    },
    
    night: {
        colors: {
            color1: '#2d3436',
            color2: '#636e72',
            color3: '#6c5ce7',
            color4: '#a29bfe'
        },
        animation: {
            speed: 0.5,
            complexity: 4,
            scale: 2.0
        }
    },
    
    spring: {
        colors: {
            color1: '#00b894',
            color2: '#55a3ff',
            color3: '#fd79a8',
            color4: '#fdcb6e'
        },
        animation: {
            speed: 1.3,
            complexity: 3,
            scale: 1.1
        }
    },
    
    autumn: {
        colors: {
            color1: '#e17055',
            color2: '#d63031',
            color3: '#fdcb6e',
            color4: '#ff7675'
        },
        animation: {
            speed: 0.8,
            complexity: 3,
            scale: 1.4
        }
    },
    
    electric: {
        colors: {
            color1: '#00f5ff',
            color2: '#ff006e',
            color3: '#8338ec',
            color4: '#ffbe0b'
        },
        animation: {
            speed: 2.2,
            complexity: 5,
            scale: 0.6
        }
    },
    
    blood: {
        colors: {
            color1: '#d63031',
            color2: '#2d3436',
            color3: '#636e72',
            color4: '#e17055'
        },
        animation: {
            speed: 0.4,
            complexity: 4,
            scale: 1.8
        }
    },
    
    cosmic: {
        colors: {
            color1: '#2d3436',
            color2: '#6c5ce7',
            color3: '#a29bfe',
            color4: '#74b9ff'
        },
        animation: {
            speed: 0.9,
            complexity: 5,
            scale: 1.3
        }
    },
    
    lava: {
        colors: {
            color1: '#d63031',
            color2: '#e17055',
            color3: '#2d3436',
            color4: '#ff7675'
        },
        animation: {
            speed: 1.4,
            complexity: 4,
            scale: 0.9
        }
    },
    
    mint: {
        colors: {
            color1: '#00b894',
            color2: '#00cec9',
            color3: '#55a3ff',
            color4: '#74b9ff'
        },
        animation: {
            speed: 1.0,
            complexity: 2,
            scale: 1.2
        }
    }
};

class PresetManager {
    constructor(gradientEngine) {
        this.engine = gradientEngine;
        this.presets = GRADIENT_PRESETS;
    }
    
    getPreset(name) {
        return this.presets[name];
    }
    
    getAllPresets() {
        return this.presets;
    }
    
    applyPreset(name) {
        const preset = this.getPreset(name);
        if (preset) {
            this.engine.setPreset(name, preset);
            return true;
        }
        return false;
    }
    
    getCurrentPreset() {
        return this.engine.getSettings().currentPreset;
    }
    
    addCustomPreset(name, preset) {
        this.presets[name] = preset;
    }
    
    removeCustomPreset(name) {
        if (this.presets[name] && !GRADIENT_PRESETS[name]) {
            delete this.presets[name];
            return true;
        }
        return false;
    }
}

window.PresetManager = PresetManager;
window.GRADIENT_PRESETS = GRADIENT_PRESETS;