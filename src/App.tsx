import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import FloatingActionButton from './components/FloatingActionButton';
import MatrixRain from './components/MatrixRain';
import AdminPage from './components/admin/AdminPage';
import { AdminProvider } from './contexts/AdminContext';
import { DataProvider } from './contexts/DataContext';
import { useNetworkStatus, usePerformance } from './utils/hooks';
import { addScrollRevealToElements } from './utils/scrollAnimations';

// Simple hash-based routing
function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || '#');
  
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  return route;
}

function App() {
  const route = useHashRoute();
  
  // Check if we're on the admin route
  if (route === '#admin' || route === '#/admin') {
    return (
      <AdminProvider>
        <DataProvider>
          <AdminPage />
        </DataProvider>
      </AdminProvider>
    );
  }
  
  return (
    <DataProvider>
      <PortfolioApp />
    </DataProvider>
  );
}

function PortfolioApp() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const { isOnline } = useNetworkStatus();
  const performance = usePerformance();
  
  // Initialize scroll reveal animations
  addScrollRevealToElements();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Simulate loading time with performance consideration
    const minLoadTime = 3500;
    const performanceAdjustment = performance.loadTime > 2000 ? 1000 : 0;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadTime + performanceAdjustment);

    return () => clearTimeout(timer);
  }, [performance.loadTime]);

  // Show offline indicator
  useEffect(() => {
    if (!isOnline) {
      console.log('Application running in offline mode');
    }
  }, [isOnline]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <div className="bg-cyber-dark text-accent relative overflow-hidden gpu-accelerated">
        {/* Global Matrix Rain Background */}
        <MatrixRain />
        
        {/* Custom cursor */}
        <CustomCursor />
        
        {/* Offline indicator */}
        {!isOnline && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 px-4 py-2 rounded-lg z-50 font-mono text-sm"
          >
            Offline Mode - Some features may be limited
          </motion.div>
        )}
        
        <Navigation />
        
        {/* Enhanced Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary z-50 origin-left"
          style={{ scaleX }}
        />


        
        <div className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>

        {/* Enhanced Footer */}
        <footer className="relative bg-cyber-darker border-t border-primary/20 py-8">
          <div className="container mx-auto px-4 text-center relative z-10">
            <p className="text-gray-400 font-mono matrix-text">
              &copy; 2026 Vinusha Rathnayaka • Built with React + TypeScript + Tailwind CSS
            </p>
            <p className="text-sm text-gray-500 mt-2 font-mono matrix-text">
              Crafting intelligent systems • Building IoT solutions • Bridging hardware and software
            </p>
            <p className="text-xs text-gray-600 mt-2 font-mono">
              {isOnline ? 'System Status: Online' : 'System Status: Offline'} | 
              Performance: {performance.loadTime > 0 ? `${Math.round(performance.loadTime)}ms` : 'Optimal'}
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="w-2 h-2 rounded-full bg-gray-600" />
              <span className="w-2 h-2 rounded-full bg-gray-600" />
              <span className="w-2 h-2 rounded-full bg-gray-600" />
            </div>
            <div className="mt-4 text-xs text-gray-600 font-mono">
              Last updated: July 2025 • Version 2.1.0 • Built with ❤️ in Sri Lanka
            </div>
          </div>
        </footer>

        {/* Floating Action Button */}
        <FloatingActionButton />
      </div>
    </ErrorBoundary>
  );
}

export default App;