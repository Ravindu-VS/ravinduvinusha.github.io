import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Linkedin, Bot, Shield, Brain, Wifi, Wrench, Globe, Smartphone, Folder } from 'lucide-react';
import { usePortfolioData, Project } from '../contexts/DataContext';

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
    'planned': 'Planned'
  };
  return statusMap[project.status] || project.status;
};

// Projects data comes from DataContext

const categories = ['All', 'AI/IoT', 'Robotics/AI', 'AI/ML', 'Robotics', 'IoT', 'Web', 'Mobile'];

export default function Projects() {
  const { data } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

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

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {(projectCategories.length > 1 ? projectCategories : categories).map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 font-mono hologram-effect ${
                activeCategory === category
                  ? 'cyber-glow bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary text-primary'
                  : 'cyber-card border-cyber-light/30 text-gray-400 hover:text-accent hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative"
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="project-card-3d border-gradient-animated overflow-hidden h-full data-stream gpu-accelerated">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 via-cyber-dark/50 to-transparent" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-cyber-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                            <span className="text-primary glow-effect">
                              {project.icon}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-3 justify-center">
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cyber-button text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Demo
                            </span>
                          </motion.a>
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cyber-button text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="flex items-center gap-2">
                              <Github className="w-4 h-4" />
                              Code
                            </span>
                          </motion.a>
                          <motion.a
                            href={project.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cyber-button text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="flex items-center gap-2">
                              <Linkedin className="w-4 h-4" />
                              LinkedIn
                            </span>
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                        <span className="text-primary glow-effect">
                          {project.icon}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-accent font-cyber">{project.title}</h3>
                    </div>
                    
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-primary/20 border border-primary/30 text-primary font-mono matrix-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      {project.features.map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={hoveredProject === project.title ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-sm text-gray-300 font-mono"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}