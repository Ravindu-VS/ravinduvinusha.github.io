import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { trackError } from '../utils/analytics';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
    
    // Track error in analytics
    trackError(error.message, error.stack?.split('\n')[0] || 'Unknown location');
    
    this.setState({
      error,
      errorInfo
    });
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cyber-dark text-accent flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center"
          >
            <div className="cyber-card p-8">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="flex justify-center mb-6"
              >
                <div className="p-4 rounded-full bg-red-500/20 border border-red-500/30">
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
              </motion.div>

              <h1 className="text-2xl font-bold font-cyber mb-4 neon-text">
                System Error Detected
              </h1>
              
              <p className="text-gray-300 mb-6 font-mono">
                An unexpected error occurred while rendering the portfolio. 
                Our monitoring systems have been notified.
              </p>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleRefresh}
                  className="cyber-button w-full"
                >
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Restart System
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleGoHome}
                  className="cyber-button w-full"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Home className="w-4 h-4" />
                    Return to Base
                  </span>
                </motion.button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-400 hover:text-primary font-mono">
                    Developer Information
                  </summary>
                  <pre className="mt-2 text-xs text-red-400 bg-cyber-darker p-3 rounded border border-red-500/30 overflow-auto max-h-32">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>

            <div className="matrix-rain opacity-30" />
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
