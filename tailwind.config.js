/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00ff88',
        secondary: '#0099ff', 
        accent: '#ffffff',
        domain: {
          robotics: '#00ff88',
          embedded: '#0099ff',
          ai: '#ff6600',
          vision: '#ff00ff',
          hacking: '#ff0044',
          iot: '#00ccff',
        },
        cyber: {
          dark: '#121212',
          darker: '#0a0a0a',
          gray: '#1a1a1a',
          light: '#2a2a2a'
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'cyber': ['Orbitron', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'scanner': 'scanner 3s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(20) infinite',
        'float': 'float 6s ease-in-out infinite',
        'cyber-glow': 'cyber-glow 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'circuit-drift': 'circuit-drift 20s linear infinite',
        'hex-pulse': 'hex-pulse 2s ease-in-out infinite alternate',
        'glitch-flash': 'glitch-flash 0.3s ease-in-out',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'radar-spin': 'radar-spin 3s linear infinite',
        'blink-cursor': 'blink 1s step-end infinite',
      },
      keyframes: {
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' }
        },
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(200, 200, 200, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(200, 200, 200, 0.8)' }
        },
        'network-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' }
        },
        'scanner': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'typewriter': {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'cyber-glow': {
          '0%': { boxShadow: '0 0 10px rgba(200, 200, 200, 0.5), inset 0 0 10px rgba(200, 200, 200, 0.1)' },
          '100%': { boxShadow: '0 0 30px rgba(200, 200, 200, 0.8), inset 0 0 20px rgba(200, 200, 200, 0.2)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'circuit-drift': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-400' }
        },
        'hex-pulse': {
          '0%': { filter: 'brightness(1)' },
          '100%': { filter: 'brightness(1.3)' }
        },
        'glitch-flash': {
          '0%': { transform: 'translate(0)', opacity: '1' },
          '20%': { transform: 'translate(-2px, 1px)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(2px, -1px)', filter: 'hue-rotate(-90deg)' },
          '60%': { transform: 'translate(-1px, 2px)', opacity: '0.8' },
          '80%': { transform: 'translate(1px, -2px)', filter: 'hue-rotate(45deg)' },
          '100%': { transform: 'translate(0)', opacity: '1', filter: 'none' }
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        },
        'radar-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      backgroundImage: {
        'network-pattern': 'radial-gradient(circle at 25% 25%, rgba(200, 200, 200, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 153, 255, 0.1) 0%, transparent 50%)'
      },
      backgroundSize: {
        'network': '100px 100px'
      }
    },
  },
  plugins: [],
};