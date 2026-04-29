import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { 
  Terminal,
  Github,
  Linkedin,
  Mail,
  Download,
  Eye,
  Cpu
} from 'lucide-react';
import { usePortfolioData } from '../contexts/DataContext';
import HeroSceneFallback from './three/HeroSceneFallback';

const LazyHeroScene = lazy(() => import('./three/HeroScene'));

// Default roles as fallback
const defaultRoles = [
  "Computer Engineer",
  "Hardware Specialist", 
  "IoT Developer",
  "Robotics Engineer",
  "Web Developer",
  "Mobile App Developer",
  "AI/ML Engineer",
  "Software Developer",
  "Embedded Systems Developer"
];

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(18, 18, 18, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        
        // Add glowing effect
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 8;
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.970) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 25);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-60"
    />
  );
};

export default function Hero() {
  const { data, isLoading } = usePortfolioData();
  const { settings } = data;
  const profile = settings?.profile;
  const reducedMotion = useReducedMotion();
  
  // Use specializations from profile or fallback to defaults
  const roles = profile?.specializations?.length > 0 ? profile.specializations : defaultRoles;
  
  const [currentRole, setCurrentRole] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(200);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, delta, currentRole, isDeleting, isPaused, roles]);

  const tick = () => {
    let fullText = roles[currentRole];
    let updatedText = isDeleting 
      ? text.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      // Pause for 1 second after fully typing
      setIsPaused(true);
      setDelta(1000);
      setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
        setDelta(100);
      }, 1000);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
      setDelta(200);
    }
  };

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectsClick = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    if (settings?.resumeUrl) {
      window.open(settings.resumeUrl, '_blank');
    } else if (profile?.fullName) {
      // Fallback to default CV path
      const link = document.createElement('a');
      link.href = `/cv/${profile.fullName.replace(/\s+/g, '_')}_CV.pdf`;
      link.download = `${profile.fullName.replace(/\s+/g, '_')}_CV.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  // Split name for display
  const nameParts = profile?.fullName?.split(' ') || [];
  const firstName = nameParts[0] || 'Your';
  const lastName = nameParts.slice(1).join(' ') || 'Name';

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden matrix-bg"
      style={{ y, opacity }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cyber-dark" />
      <div className="matrix-code opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
            >
              <span className="block neon-text mb-2 font-cyber">{firstName}</span>
              <span className="block gradient-text">{lastName}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              <div className="h-16 font-mono text-xl md:text-2xl lg:text-3xl mb-4">
                <span className="text-primary font-bold matrix-text">&gt; </span>
                <span className="text-primary matrix-text">{text}</span>
                <span className="animate-blink text-primary font-bold">_</span>
              </div>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-mono matrix-text">
                {profile?.shortBio || 'Building intelligent systems • Securing digital frontiers • Bridging minds and machines'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-12 justify-center lg:justify-start"
            >
              <motion.button
                onClick={handleContactClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-button group hologram-effect"
              >
                <span className="flex items-center gap-2 text-lg">
                  Initialize Contact
                  <Terminal className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                onClick={handleProjectsClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-button group hologram-effect"
              >
                <span className="flex items-center gap-2 text-lg">
                  View Systems
                  <Cpu className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                onClick={handleDownloadCV}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-button group hologram-effect"
              >
                <span className="flex items-center gap-2 text-lg">
                  Download CV
                  <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {settings?.socials?.github && (
                <motion.a
                  href={settings.socials?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="hologram-effect cyber-card p-3 hover:bg-primary/10 transition-all duration-300 group cursor-pointer"
                  title="GitHub"
                >
                  <span className="social-icon-enhanced group-hover:text-primary transition-colors glow-effect">
                    <Github className="w-6 h-6" />
                  </span>
                </motion.a>
              )}
              {settings?.socials?.linkedin && (
                <motion.a
                  href={settings.socials?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="hologram-effect cyber-card p-3 hover:bg-primary/10 transition-all duration-300 group cursor-pointer"
                  title="LinkedIn"
                >
                  <span className="social-icon-enhanced group-hover:text-primary transition-colors glow-effect">
                    <Linkedin className="w-6 h-6" />
                  </span>
                </motion.a>
              )}
              <motion.a
                onClick={handleContactClick}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="hologram-effect cyber-card p-3 hover:bg-primary/10 transition-all duration-300 group cursor-pointer"
                title="Contact"
              >
                <span className="social-icon-enhanced group-hover:text-primary transition-colors glow-effect">
                  <Mail className="w-6 h-6" />
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Content — 3D Hero Scene + Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
              {/* 3D scene as background layer */}
              <div className="absolute inset-0 z-0" aria-hidden="true">
                {reducedMotion ? (
                  <HeroSceneFallback />
                ) : (
                  <Suspense fallback={<HeroSceneFallback />}>
                    <LazyHeroScene />
                  </Suspense>
                )}
              </div>

              {/* Profile image in foreground */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-primary/50 cyber-glow hologram-effect z-10">
                <img
                  src={profile?.profilePicture || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                  alt={`${profile?.fullName || 'Profile'} - Professional Profile`}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-100 contrast-105 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <Terminal className="w-6 h-6 mb-2 glow-effect matrix-text" />
          <span className="text-sm font-mono matrix-text">scroll_down</span>
        </div>
      </motion.div>
    </motion.div>
  );
}