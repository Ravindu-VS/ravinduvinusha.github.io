import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  GraduationCap,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  FileText,
  BarChart3,
  Home,
  Cloud,
  CloudOff,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { usePortfolioData } from '../../contexts/DataContext';
import ProjectsManager from './ProjectsManager';
import SettingsManager from './SettingsManager';
import DataManager from './DataManager';
import SkillsManager from './SkillsManager';
import BlogManager from './BlogManager';
import TestimonialsManager from './TestimonialsManager';

type TabType = 'dashboard' | 'projects' | 'skills' | 'blog' | 'testimonials' | 'settings' | 'data';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAdmin();
  const { isSyncing, isLoading, syncError } = usePortfolioData();

  const menuItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-5 h-5" /> },
    { id: 'skills', label: 'Skills & Certs', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'blog', label: 'Blog Posts', icon: <FileText className="w-5 h-5" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'settings', label: 'Site Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'data', label: 'Data Management', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview setActiveTab={setActiveTab} />;
      case 'projects':
        return <ProjectsManager />;
      case 'skills':
        return <SkillsManager />;
      case 'blog':
        return <BlogManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'settings':
        return <SettingsManager />;
      case 'data':
        return <DataManager />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-cyber-darker flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed lg:relative z-40 w-[280px] h-screen bg-cyber-dark border-r border-cyber-light/20 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-cyber-light/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-primary font-cyber font-bold text-lg">&lt;/&gt;</span>
            </div>
            <div>
              <h2 className="font-cyber font-bold text-accent">Admin Panel</h2>
              <p className="text-xs text-gray-500 font-mono">Portfolio Manager</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                activeTab === item.id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-gray-400 hover:bg-cyber-light/10 hover:text-accent'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.icon}
              <span>{item.label}</span>
              {activeTab === item.id && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-cyber-light/20 space-y-2">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm text-gray-400 hover:bg-cyber-light/10 hover:text-accent transition-all"
          >
            <Home className="w-5 h-5" />
            <span>View Portfolio</span>
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-cyber-dark border-b border-cyber-light/20 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-cyber-light/10 text-gray-400 hover:text-accent transition-all lg:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-xl font-cyber font-bold text-accent capitalize">
              {activeTab === 'data' ? 'Data Management' : activeTab}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Cloud Sync Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-light/10 border border-cyber-light/20">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
                  <span className="text-xs font-mono text-yellow-400">Loading...</span>
                </>
              ) : isSyncing ? (
                <>
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span className="text-xs font-mono text-primary">Syncing...</span>
                </>
              ) : syncError ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-mono text-orange-400" title={syncError}>Local Only</span>
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-mono text-green-400">Synced</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Dashboard Overview Component
function DashboardOverview({ setActiveTab }: { setActiveTab: (tab: TabType) => void }) {
  const { data } = usePortfolioData();
  
  const stats = [
    { label: 'Total Projects', value: data.projects.length.toString(), change: `${data.projects.filter(p => p.featured).length} featured` },
    { label: 'Blog Posts', value: data.blogPosts.length.toString(), change: `${data.blogPosts.filter(p => p.published).length} published` },
    { label: 'Testimonials', value: data.testimonials.length.toString(), change: `${data.testimonials.filter(t => t.featured).length} featured` },
    { label: 'Skills Listed', value: data.skills.length.toString(), change: `${data.certifications.length} certifications` },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="cyber-card p-6 hologram-effect"
          >
            <p className="text-sm font-mono text-gray-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-cyber font-bold text-accent mb-2">{stat.value}</p>
            <p className="text-xs font-mono text-primary">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="cyber-card p-6">
        <h3 className="text-lg font-cyber font-bold text-accent mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('projects')}
            className="p-4 rounded-lg bg-cyber-light/10 hover:bg-primary/20 border border-cyber-light/20 hover:border-primary/30 transition-all text-center"
          >
            <FolderKanban className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-mono text-accent">Manage Projects</span>
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className="p-4 rounded-lg bg-cyber-light/10 hover:bg-primary/20 border border-cyber-light/20 hover:border-primary/30 transition-all text-center"
          >
            <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-mono text-accent">Blog Posts</span>
          </button>
          <button 
            onClick={() => setActiveTab('testimonials')}
            className="p-4 rounded-lg bg-cyber-light/10 hover:bg-primary/20 border border-cyber-light/20 hover:border-primary/30 transition-all text-center"
          >
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-mono text-accent">Testimonials</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className="p-4 rounded-lg bg-cyber-light/10 hover:bg-primary/20 border border-cyber-light/20 hover:border-primary/30 transition-all text-center"
          >
            <Settings className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-mono text-accent">Site Settings</span>
          </button>
        </div>
      </div>

      {/* Recent Items */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="cyber-card p-6">
          <h3 className="text-lg font-cyber font-bold text-accent mb-4">Recent Projects</h3>
          <div className="space-y-3">
            {data.projects.slice(0, 4).map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between py-2 border-b border-cyber-light/10 last:border-0"
              >
                <div>
                  <p className="text-sm text-accent font-mono">{project.title}</p>
                  <p className="text-xs text-gray-500">{project.category}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                  project.status === 'completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : project.status === 'in-progress'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {project.status}
                </span>
              </div>
            ))}
            {data.projects.length === 0 && (
              <p className="text-sm text-gray-500 font-mono">No projects yet</p>
            )}
          </div>
        </div>

        {/* Site Info */}
        <div className="cyber-card p-6">
          <h3 className="text-lg font-cyber font-bold text-accent mb-4">Site Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-cyber-light/10">
              <span className="text-sm text-gray-400">Site Name</span>
              <span className="text-sm text-accent font-mono">{data.settings.siteName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-cyber-light/10">
              <span className="text-sm text-gray-400">Email</span>
              <span className="text-sm text-accent font-mono">{data.settings.email || 'Not set'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-cyber-light/10">
              <span className="text-sm text-gray-400">Location</span>
              <span className="text-sm text-accent font-mono">{data.settings.location || 'Not set'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-400">Available for Hire</span>
              <span className={`text-sm font-mono ${data.settings.profile?.availableForHire ? 'text-green-400' : 'text-gray-400'}`}>
                {data.settings.profile?.availableForHire ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder for unimplemented sections
function ComingSoon({ section }: { section: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-24 h-24 rounded-full bg-cyber-light/10 flex items-center justify-center mb-6">
        <Settings className="w-12 h-12 text-primary animate-spin-slow" />
      </div>
      <h2 className="text-2xl font-cyber font-bold text-accent mb-2 capitalize">
        {section} Manager
      </h2>
      <p className="text-gray-400 font-mono">
        This section is being built. Check back soon!
      </p>
    </div>
  );
}
