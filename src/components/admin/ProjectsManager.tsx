import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Star,
  X,
  Save,
  AlertTriangle
} from 'lucide-react';
import { usePortfolioData, Project } from '../../contexts/DataContext';

export default function ProjectsManager() {
  const { data, addProject, updateProject, deleteProject } = usePortfolioData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const categories = ['all', ...new Set(data.projects.map(p => p.category))];

  const filteredProjects = data.projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (project: Project) => {
    setEditingProject({ ...project });
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingProject({
      id: '',
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=80',
      category: 'Web',
      technologies: [],
      features: [],
      results: '',
      displayStatus: '',
      featured: false,
      status: 'in-progress',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingProject) return;
    
    if (editingProject.id) {
      updateProject(editingProject.id, editingProject);
    } else {
      addProject(editingProject);
    }
    setIsEditing(false);
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-cyber font-bold text-accent">Projects</h2>
          <p className="text-sm text-gray-400 font-mono">
            Manage your portfolio projects
          </p>
        </div>
        <motion.button
          onClick={handleNew}
          className="cyber-button flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          Add Project
        </motion.button>
      </div>

      {/* Filters */}
      <div className="cyber-card p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="terminal-input w-full pl-10"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="terminal-input min-w-[150px]"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="cyber-card overflow-hidden group"
            >
              {/* Image */}
              <div className="h-40 bg-cyber-light/10 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent" />
                {project.featured && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-primary/20 border border-primary/30 rounded text-xs font-mono text-primary flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="px-2 py-1 bg-cyber-dark/80 border border-cyber-light/30 rounded text-xs font-mono text-accent">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-cyber font-bold text-accent mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 font-mono line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-cyber-light/10 border border-cyber-light/20 rounded text-xs font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 text-xs font-mono text-gray-500">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-cyber-light/20">
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-cyber-light/10 text-gray-400 hover:text-accent transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-cyber-light/10 text-gray-400 hover:text-accent transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 rounded-lg hover:bg-primary/20 text-gray-400 hover:text-primary transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(project.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Delete Confirmation */}
              <AnimatePresence>
                {deleteConfirm === project.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-cyber-dark/95 flex flex-col items-center justify-center p-4"
                  >
                    <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
                    <p className="text-center text-accent font-mono mb-4">
                      Delete this project?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm hover:bg-cyber-light/20 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-sm hover:bg-red-500/30 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="cyber-card p-12 text-center">
          <p className="text-gray-400 font-mono">No projects found</p>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && editingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto cyber-card p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-cyber font-bold text-accent">
                  {editingProject.id ? 'Edit Project' : 'New Project'}
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 rounded-lg hover:bg-cyber-light/10 text-gray-400 hover:text-accent transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-accent mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="terminal-input w-full resize-none"
                    rows={3}
                    placeholder="Short description of the project"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono text-accent mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editingProject.category}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      className="terminal-input w-full"
                      placeholder="e.g., BCI, Security, Web"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-accent mb-2">
                      Status
                    </label>
                    <select
                      value={editingProject.status}
                      onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as Project['status'] })}
                      className="terminal-input w-full"
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={editingProject.technologies.join(', ')}
                    onChange={(e) => setEditingProject({ 
                      ...editingProject, 
                      technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    })}
                    className="terminal-input w-full"
                    placeholder="React, Python, TensorFlow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">
                    Key Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={(editingProject.features || []).join(', ')}
                    onChange={(e) => setEditingProject({ 
                      ...editingProject, 
                      features: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    })}
                    className="terminal-input w-full"
                    placeholder="Real-time Processing, ML Classification, API Integration"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">
                    Results / Achievements
                  </label>
                  <input
                    type="text"
                    value={editingProject.results || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="e.g., 95% accuracy, 10k+ users, Featured in conference"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">
                    Display Status Label
                  </label>
                  <input
                    type="text"
                    value={editingProject.displayStatus || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, displayStatus: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="e.g., Open Source, Commercial, Research Project"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono text-accent mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.github || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                      className="terminal-input w-full"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-accent mb-2">
                      Demo URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.demo || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, demo: e.target.value })}
                      className="terminal-input w-full"
                      placeholder="https://demo.example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="/projects/image.jpg"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-cyber-light/30 bg-cyber-light/10 text-primary focus:ring-primary"
                  />
                  <label htmlFor="featured" className="text-sm font-mono text-accent">
                    Featured Project
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-cyber-light/20">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm hover:bg-cyber-light/20 transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSave}
                  className="cyber-button flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="w-4 h-4" />
                  Save Project
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
