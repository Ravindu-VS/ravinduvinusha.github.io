import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Shield, Brain, Wifi, Wrench, Globe, Smartphone, Folder } from 'lucide-react';
import { usePortfolioData, Project } from '../contexts/DataContext';
import ProjectCard from './ui/ProjectCard';

// Icon mapping based on category
const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'AI/IoT': <Brain className="w-6 h-6" />,
    'Robotics/AI': <Bot className="w-6 h-6" />,
    'Robotics': <Bot className="w-6 h-6" />,
    'IoT': <Wifi className="w-6 h-6" />,
    'AI/ML': <Brain className="w-6 h-6" />,
    'Web': <Globe className="w-6 h-6" />,
    'Mobile': <Smartphone className="w-6 h-6" />,
    'Hardware': <Wrench className="w-6 h-6" />,
    'Security': <Shield className="w-6 h-6" />,
  };
  return iconMap[category] || <Folder className="w-6 h-6" />;
};

// Convert status to display label
const getStatusLabel = (project: Project) => {
  if (project.displayStatus) return project.displayStatus;
  const statusMap: Record<string, string> = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'live': 'Live',
    'planned': 'Planned'
  };
  return statusMap[project.status] || project.status;
};

// Enhanced filter pills matching domain labels
const FILTER_PILLS = ['All', 'Robotics', 'AI/ML', 'IoT', 'Embedded', 'Vision', 'Security'];

// Domain → category mapping for quick-jump
const DOMAIN_CATEGORY_MAP: Record<string, string> = {
  robotics: 'Robotics',
  ai: 'AI/ML',
  iot: 'IoT',
  embedded: 'Embedded',
  vision: 'Vision',
  hacking: 'Security',
};

export default function Projects() {
  const { data } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Listen for domain quick-jump events from Navigation
  useEffect(() => {
    const handler = (e: Event) => {
      const domainId = (e as CustomEvent).detail as string;
      const cat = DOMAIN_CATEGORY_MAP[domainId];
      if (cat) setActiveCategory(cat);
    };
    window.addEventListener('filter-domain', handler);
    return () => window.removeEventListener('filter-domain', handler);
  }, []);

  // Debug logging
  console.log('📊 Projects component mounted. Data projects count:', data.projects.length);
  if (data.projects.length === 0) {
    console.warn('⚠️  WARNING: Projects array is empty!');
  }

  // Use projects from context
  const contextProjects = data.projects.map(project => ({
    id: project.id,
    title: project.title,
    desc: project.description,
    image: project.image || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=80',
    tags: project.technologies,
    category: project.category,
    features: project.features || [],
    results: project.results || '',
    icon: getCategoryIcon(project.category),
    github: project.github,
    demo: project.demo,
    linkedin: data.settings.socials.linkedin,
    status: getStatusLabel(project)
  }));

  // Get unique categories from projects
  const projectCategories = ['All', ...new Set(contextProjects.map(p => p.category))];

  const filteredProjects = contextProjects.filter(project => 
    activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <div className="py-20 relative overflow-hidden matrix-bg section-matrix" id="projects">
      <div className="absolute inset-0 bg-cyber-dark/50" />
      <div className="matrix-code" />
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 scroll-scale"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-cyber">
            <span className="neon-text">Project Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono matrix-text">
            Innovative solutions across robotics, AI, IoT, web, mobile, and intelligent systems
          </p>
        </motion.div>

        {/* Category Filter — neon-bordered domain pills */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {FILTER_PILLS.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 font-mono text-sm border ${
                activeCategory === category
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'border-primary/20 text-gray-400 hover:text-accent hover:border-primary/50'
              }`}
              style={activeCategory === category ? { boxShadow: '0 0 10px rgba(0,255,136,0.3)' } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={activeCategory === category}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isHovered={hoveredProject === project.title}
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}