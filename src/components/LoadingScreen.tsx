import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Shield, Brain } from 'lucide-react';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { icon: <Terminal className="w-8 h-8" />, text: "Initializing Neural Networks..." },
    { icon: <Cpu className="w-8 h-8" />, text: "Connecting Hardware Interfaces..." },
    { icon: <Shield className="w-8 h-8" />, text: "Securing Digital Channels..." },
    { icon: <Brain className="w-8 h-8" />, text: "Bridging Minds and Machines..." }
  ];

  useEffect(() => {
    const stepDuration = 800;
    const totalSteps = loadingSteps.length;

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < totalSteps - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => setLoading(false), 500);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(stepInterval);
  }, []);

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
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-8"
            >
              <div className="w-20 h-20 mx-auto border-2 border-primary rounded-lg flex items-center justify-center cyber-glow">
                <span className="text-2xl font-cyber font-bold neon-text">&lt;RV/&gt;</span>
              </div>
            </motion.div>

            {/* Loading steps */}
            <div className="space-y-6">
              {loadingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: index <= currentStep ? 1 : 0.3,
                    x: 0 
                  }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center gap-4 ${
                    index === currentStep ? 'text-primary' : 
                    index < currentStep ? 'text-accent' : 'text-gray-500'
                  }`}
                >
                  <div className={`p-2 rounded border ${
                    index === currentStep ? 'border-primary bg-primary/10 cyber-glow' :
                    index < currentStep ? 'border-accent/30 bg-accent/5' : 'border-gray-500/30'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="font-mono text-sm">{step.text}</span>
                  {index <= currentStep && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5 }}
                      className="flex-1 h-0.5 bg-gradient-to-r from-primary to-secondary ml-auto"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-8">
              <div className="w-full bg-cyber-gray h-1 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 font-mono">
                {Math.round(((currentStep + 1) / loadingSteps.length) * 100)}% Complete
              </p>
            </div>

            {/* Version info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-xs text-gray-500 font-mono"
            >
              Portfolio v2.1.0 • Neural Interface Ready
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
