import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, Mail, Download } from 'lucide-react';

const NAV_SECTIONS = ['hero', 'terminal', 'domains', 'about', 'skills', 'projects', 'lab', 'contact'];

const navItems = [
  { name: 'Home',     icon: Home,     href: '#',         sectionId: 'hero' },
  { name: 'About',    icon: User,     href: '#about',    sectionId: 'about' },
  { name: 'Domains',  icon: Briefcase,href: '#domains',  sectionId: 'domains' },
  { name: 'Skills',   icon: Briefcase,href: '#skills',   sectionId: 'skills' },
  { name: 'Projects', icon: Code,     href: '#projects', sectionId: 'projects' },
  { name: 'Lab',      icon: Code,     href: '#lab',      sectionId: 'lab' },
  { name: 'Contact',  icon: Mail,     href: '#contact',  sectionId: 'contact' },
];

const mobileBarItems = [
  { name: 'Home',     icon: Home,     href: '#',         sectionId: 'hero' },
  { name: 'About',    icon: User,     href: '#about',    sectionId: 'about' },
  { name: 'Skills',   icon: Briefcase,href: '#skills',   sectionId: 'skills' },
  { name: 'Projects', icon: Code,     href: '#projects', sectionId: 'projects' },
  { name: 'Contact',  icon: Mail,     href: '#contact',  sectionId: 'contact' },
];

const domainItems = [
  { id: 'robotics', icon: '🤖', label: 'Robotics', color: '#00ff88' },
  { id: 'embedded', icon: '💾', label: 'Embedded', color: '#0099ff' },
  { id: 'ai',       icon: '🧠', label: 'AI/ML',    color: '#ff6600' },
  { id: 'hacking',  icon: '🛡️', label: 'Security', color: '#ff0044' },
  { id: 'iot',      icon: '📡', label: 'IoT',       color: '#00ccff' },
  { id: 'vision',   icon: '👁️', label: 'Vision',   color: '#ff00ff' },
];

function useActiveSection(): string {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ratio: Record<string, number> = {};

    const pick = () => {
      let best = 'hero';
      let bestR = 0;
      for (const [id, r] of Object.entries(ratio)) {
        if (r > bestR) { bestR = r; best = id; }
      }
      setActive(best);
    };

    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          ratio[id] = entry.intersectionRatio;
          pick();
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/Ravindu_Vinusha_CV_2025.pdf';
    link.download = 'Ravindu_Vinusha_CV_2025.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cv_download', { event_category: 'engagement', event_label: 'CV Download', value: 1 });
    }
  };

  const scrollToDomainProjects = (domainId: string) => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    // dispatch a custom event so Projects can auto-filter
    window.dispatchEvent(new CustomEvent('filter-domain', { detail: domainId }));
  };

  return (
    <>
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
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <motion.a href="#" className="text-2xl font-bold font-cyber flex items-center gap-3" whileHover={{ scale: 1.05 }}>
              <span className="neon-text">&lt;RV/&gt;</span>
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-primary status-online" />
              </div>
            </motion.a>

            {/* Desktop nav links */}
            <div className="hidden md:flex flex-col items-end gap-1">
              {/* Primary nav */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.sectionId;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className={`relative px-4 py-2 group transition-colors font-mono text-sm ${isActive ? 'text-primary' : 'text-gray-300 hover:text-accent'}`}
                      whileHover={{ scale: 1.05 }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="flex items-center gap-1.5">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" style={{ boxShadow: '0 0 6px #00ff88' }} />
                        )}
                        {item.name}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30 hologram-effect"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                    </motion.a>
                  );
                })}
                <motion.button
                  onClick={handleDownloadCV}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-3 cyber-button hologram-effect text-sm"
                  aria-label="Download CV"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    CV
                  </span>
                </motion.button>
              </div>

              {/* Domain quick-jump icons */}
              <div className="flex items-center gap-1 pb-1">
                {domainItems.map((d) => (
                  <div key={d.id} className="relative group/domain">
                    <motion.button
                      onClick={() => scrollToDomainProjects(d.id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-7 h-7 flex items-center justify-center rounded text-base transition-all"
                      style={{ filter: `drop-shadow(0 0 4px ${d.color}44)` }}
                      aria-label={`Jump to ${d.label} projects`}
                    >
                      {d.icon}
                    </motion.button>
                    {/* tooltip */}
                    <div
                      className="absolute top-8 left-1/2 -translate-x-1/2 bg-cyber-darker border border-primary/20 text-xs font-mono px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/domain:opacity-100 pointer-events-none transition-opacity z-50"
                      style={{ color: d.color }}
                    >
                      {d.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-50 text-accent p-2 cyber-card hologram-effect"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile full-screen menu */}
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
                      className={`flex items-center gap-4 py-4 text-lg transition-colors font-mono hologram-effect cyber-card p-4 mb-4 ${activeSection === item.sectionId ? 'text-primary border-primary/40' : 'text-gray-300 hover:text-accent'}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                      {activeSection === item.sectionId && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" style={{ boxShadow: '0 0 6px #00ff88' }} />
                      )}
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

      {/* Mobile bottom nav bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-cyber-darker/95 backdrop-blur-xl border-t border-primary/20"
        aria-label="Mobile navigation"
        style={{ boxShadow: '0 -4px 20px rgba(0,255,136,0.08)' }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {mobileBarItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                whileTap={{ scale: 0.85 }}
                className="flex flex-col items-center gap-0.5 p-2 rounded-lg transition-colors"
                aria-label={item.name}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon
                  className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-gray-500'}`}
                  style={isActive ? { filter: 'drop-shadow(0 0 4px #00ff88)' } : {}}
                />
                <span className={`text-[9px] font-mono ${isActive ? 'text-primary' : 'text-gray-600'}`}>
                  {item.name}
                </span>
              </motion.a>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
