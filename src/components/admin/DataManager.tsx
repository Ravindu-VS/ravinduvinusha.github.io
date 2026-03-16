import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  FileJson,
  Copy,
  Database
} from 'lucide-react';
import { usePortfolioData } from '../../contexts/DataContext';

export default function DataManager() {
  const { exportData, importData, resetData } = usePortfolioData();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('success', 'Data exported successfully!');
  };

  const handleCopyToClipboard = async () => {
    const data = exportData();
    try {
      await navigator.clipboard.writeText(data);
      showNotification('success', 'Data copied to clipboard!');
    } catch {
      showNotification('error', 'Failed to copy data');
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importData(content);
      if (success) {
        showNotification('success', 'Data imported successfully!');
      } else {
        showNotification('error', 'Invalid data format. Import failed.');
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    resetData();
    setShowResetConfirm(false);
    showNotification('success', 'Data reset to defaults!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-cyber font-bold text-accent">Data Management</h2>
        <p className="text-sm text-gray-400 font-mono">
          Export, import, and manage your portfolio data
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`p-4 rounded-lg border flex items-center gap-3 font-mono text-sm ${
            notification.type === 'success'
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          {notification.message}
        </motion.div>
      )}

      {/* Export Section */}
      <div className="cyber-card p-6">
        <h3 className="text-lg font-cyber font-bold text-accent mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-primary" />
          Export Data
        </h3>
        <p className="text-sm text-gray-400 font-mono mb-6">
          Download all your portfolio data as a JSON file. Use this for backups or migrating to another instance.
        </p>
        <div className="flex flex-wrap gap-4">
          <motion.button
            onClick={handleExport}
            className="cyber-button flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileJson className="w-5 h-5" />
            Download JSON
          </motion.button>
          <motion.button
            onClick={handleCopyToClipboard}
            className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm hover:bg-cyber-light/20 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Copy className="w-4 h-4" />
            Copy to Clipboard
          </motion.button>
        </div>
      </div>

      {/* Import Section */}
      <div className="cyber-card p-6">
        <h3 className="text-lg font-cyber font-bold text-accent mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Import Data
        </h3>
        <p className="text-sm text-gray-400 font-mono mb-6">
          Restore your portfolio data from a JSON backup file. This will replace all current data.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
        <motion.button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm hover:bg-cyber-light/20 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload className="w-4 h-4" />
          Select JSON File
        </motion.button>
      </div>

      {/* Database Stats */}
      <div className="cyber-card p-6">
        <h3 className="text-lg font-cyber font-bold text-accent mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Storage Information
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-cyber-light/5 rounded-lg border border-cyber-light/10">
            <p className="text-xs text-gray-500 font-mono mb-1">Storage Type</p>
            <p className="text-lg font-cyber text-accent">localStorage</p>
          </div>
          <div className="p-4 bg-cyber-light/5 rounded-lg border border-cyber-light/10">
            <p className="text-xs text-gray-500 font-mono mb-1">Data Size</p>
            <p className="text-lg font-cyber text-accent">
              {(new Blob([exportData()]).size / 1024).toFixed(2)} KB
            </p>
          </div>
          <div className="p-4 bg-cyber-light/5 rounded-lg border border-cyber-light/10">
            <p className="text-xs text-gray-500 font-mono mb-1">Last Modified</p>
            <p className="text-lg font-cyber text-accent">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Reset Section */}
      <div className="cyber-card p-6 border-red-500/20">
        <h3 className="text-lg font-cyber font-bold text-red-400 mb-4 flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          Reset Data
        </h3>
        <p className="text-sm text-gray-400 font-mono mb-6">
          Reset all portfolio data to default values. This action cannot be undone.
        </p>
        
        {!showResetConfirm ? (
          <motion.button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-sm hover:bg-red-500/20 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AlertTriangle className="w-4 h-4" />
            Reset All Data
          </motion.button>
        ) : (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400 font-mono mb-4">
              Are you sure? This will delete all your projects, skills, blog posts, and settings.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm hover:bg-cyber-light/20 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-sm hover:bg-red-500/30 transition-all"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
