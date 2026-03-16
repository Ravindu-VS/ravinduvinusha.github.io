import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ArrowUp,
  MessageCircle,
  Phone
} from 'lucide-react';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { 
      icon: <ArrowUp className="w-5 h-5" />, 
      label: 'Scroll to Top',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      color: 'from-primary/20 to-secondary/20'
    },
    { 
      icon: <Download className="w-5 h-5" />, 
      label: 'Download CV',
      action: () => {
        const link = document.createElement('a');
        link.href = '/assets/Ravindu_Vinusha_CV_2025.pdf';
        link.download = 'Ravindu_Vinusha_CV_2025.pdf';
        link.click();
      },
      color: 'from-secondary/20 to-primary/20'
    },
    { 
      icon: <Github className="w-5 h-5" />, 
      label: 'GitHub',
      action: () => window.open('https://github.com/ravinduvinusha', '_blank'),
      color: 'from-primary/20 to-secondary/20'
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      label: 'LinkedIn',
      action: () => window.open('https://linkedin.com/in/ravinduvinusha', '_blank'),
      color: 'from-secondary/20 to-primary/20'
    },
    { 
      icon: <Mail className="w-5 h-5" />, 
      label: 'Email',
      action: () => window.location.href = 'mailto:ravindu.vinusha.dev@gmail.com',
      color: 'from-primary/20 to-secondary/20'
    },
    { 
      icon: <Phone className="w-5 h-5" />, 
      label: 'Call',
      action: () => window.location.href = 'tel:+94701234567',
      color: 'from-secondary/20 to-primary/20'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9000]">
      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-0 space-y-3">
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                className={`group relative flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r ${action.color} 
                           border border-primary/30 backdrop-blur-sm hover:border-primary/50 
                           transition-all duration-300 cyber-glow min-w-[120px]`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-primary">
                  {action.icon}
                </div>
                <span className="text-accent font-mono text-sm whitespace-nowrap">
                  {action.label}
                </span>
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 
                               bg-cyber-dark border border-primary/30 px-2 py-1 rounded text-xs 
                               font-mono text-primary opacity-0 group-hover:opacity-100 
                               transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {action.label}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 
                   border-2 border-primary backdrop-blur-sm flex items-center justify-center
                   transition-all duration-300 cyber-glow ${isOpen ? 'rotate-45' : 'hover:scale-110'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? -45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Plus className="w-6 h-6 text-primary" />
          )}
        </motion.div>
      </motion.button>

      {/* Pulse rings */}
      {!isOpen && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{
              scale: [1, 1.5, 2],
              opacity: [0.8, 0.4, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-secondary/30"
            animate={{
              scale: [1, 1.3, 1.8],
              opacity: [0.6, 0.3, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
              ease: "easeOut"
            }}
          />
        </>
      )}
    </div>
  );
};

export default FloatingActionButton;
