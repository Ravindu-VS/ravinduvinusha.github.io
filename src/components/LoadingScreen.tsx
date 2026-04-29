import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Shield, Brain, Eye } from 'lucide-react';

const BIOS_STEPS = [
  { icon: <Brain className="w-7 h-7" />,    text: 'Initializing neural pathways...' },
  { icon: <Cpu className="w-7 h-7" />,      text: 'Loading robotics module...' },
  { icon: <Eye className="w-7 h-7" />,      text: 'Calibrating computer vision...' },
  { icon: <Shield className="w-7 h-7" />,   text: 'Securing network channels...' },
  { icon: <Terminal className="w-7 h-7" />, text: 'READY' },
];

// Session key: loading screen is shown only once per browser session.
// Clearing sessionStorage will cause it to show again on the next visit.
const SESSION_KEY = 'rv_portfolio_loaded';

const LoadingScreen = () => {
  // Only show once per browser session
  const [shouldShow] = useState(() => !sessionStorage.getItem(SESSION_KEY));
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!shouldShow) return;

    const stepDuration = 700;

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < BIOS_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem(SESSION_KEY, '1');
          }, 600);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(stepInterval);
  }, [shouldShow]);

  // Skip on subsequent visits
  if (!shouldShow) return null;

  const progress = Math.round(((currentStep + 1) / BIOS_STEPS.length) * 100);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-cyber-dark z-[10000] flex items-center justify-center"
        >
          {/* Matrix background */}
          <div className="absolute inset-0 matrix-bg">
            <div className="matrix-code opacity-20" />
          </div>

          <div className="relative z-10 text-center max-w-md mx-auto px-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mb-8"
            >
              <div className="w-20 h-20 mx-auto border-2 border-primary rounded-lg flex items-center justify-center cyber-glow">
                <span className="text-2xl font-cyber font-bold neon-text">&lt;RV/&gt;</span>
              </div>
            </motion.div>

            {/* BIOS-style steps */}
            <div className="space-y-4 text-left">
              {BIOS_STEPS.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: index <= currentStep ? 1 : 0.25,
                    x: 0,
                  }}
                  transition={{ delay: index * 0.15 }}
                  className={`flex items-center gap-3 ${
                    index === currentStep
                      ? 'text-primary'
                      : index < currentStep
                      ? 'text-accent'
                      : 'text-gray-600'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded border flex-shrink-0 ${
                      index === currentStep
                        ? 'border-primary bg-primary/10 cyber-glow'
                        : index < currentStep
                        ? 'border-accent/20 bg-accent/5'
                        : 'border-gray-700/30'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="font-mono text-sm flex-1">{step.text}</span>
                  {index < currentStep && (
                    <span className="text-primary text-xs font-mono">✓</span>
                  )}
                  {index === currentStep && (
                    <span className="inline-block w-2 h-4 bg-primary animate-blink" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Shimmer progress bar */}
            <div className="mt-8">
              <div className="w-full bg-cyber-gray h-1.5 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(90deg, #00ff88, #0099ff, #ff00ff)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s ease-in-out infinite',
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 font-mono text-right">
                {progress}%
              </p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-xs text-gray-600 font-mono"
            >
              Portfolio v2.1.0 • System Initializing
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
