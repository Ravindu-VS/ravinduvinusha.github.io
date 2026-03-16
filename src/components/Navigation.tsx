import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, Mail, Terminal, Cpu, Download, Award } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'About', icon: User, href: '#about' },
    { name: 'Skills', icon: Briefcase, href: '#skills' },
    { name: 'Projects', icon: Code, href: '#projects' },
    { name: 'Contact', icon: Mail, href: '#contact' }
  ];

  const handleDownloadCV = () => {
    // Real CV download functionality
    const link = document.createElement('a');
    link.href = '/assets/Ravindu_Vinusha_CV_2025.pdf'; // Place actual CV in public/assets/
    link.download = 'Ravindu_Vinusha_CV_2025.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Track download analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cv_download', {
        event_category: 'engagement',
        event_label: 'CV Download',
        value: 1
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-cyber-dark/95 backdrop-blur-xl border-b border-primary/20 cyber-glow' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo with Status Indicator */}
          <motion.a
            href="#"
            className="text-2xl font-bold font-cyber flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <span className="neon-text">&lt;RV/&gt;</span>
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-primary status-online"></div>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-primary font-mono whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                Available
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 group text-gray-300 hover:text-accent transition-colors font-mono"
                whileHover={{ scale: 1.05 }}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30 hologram-effect"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.a>
            ))}
            <motion.button
              onClick={handleDownloadCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 cyber-button hologram-effect"
            >
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                CV
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 text-accent p-2 cyber-card hologram-effect"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-cyber-dark/98 backdrop-blur-xl md:hidden pt-20 matrix-bg"
            >
              <div className="matrix-rain" />
              <div className="container mx-auto px-4 py-8 relative z-10">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-4 py-4 text-lg text-gray-300 hover:text-accent transition-colors font-mono hologram-effect cyber-card p-4 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  onClick={handleDownloadCV}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 w-full cyber-button hologram-effect"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Download CV
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;