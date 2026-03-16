import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    // Enable source maps for production debugging
    sourcemap: true,
    
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    
    // Optimize bundle size
    chunkSizeWarningLimit: 1000,
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  },
  
  // Development server configuration
  server: {
    port: 5173,
    host: true,
    open: true,
  },
  
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
  
  // Define global constants
  define: {
    __PORTFOLIO_VERSION__: JSON.stringify('2.1.0'),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
