import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Save,
  AlertTriangle,
  Award,
  Zap
} from 'lucide-react';
import { usePortfolioData, Skill, Certification } from '../../contexts/DataContext';

type TabType = 'skills' | 'certifications';

export default function SkillsManager() {
  const { data, addSkill, updateSkill, deleteSkill, addCertification, updateCertification, deleteCertification } = usePortfolioData();
  const [activeTab, setActiveTab] = useState<TabType>('skills');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Skills state
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deleteSkillConfirm, setDeleteSkillConfirm] = useState<string | null>(null);
  
  // Certifications state
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [deleteCertConfirm, setDeleteCertConfirm] = useState<string | null>(null);

  const skillCategories = ['all', ...new Set(data.skills.map(s => s.category))];

  const filteredSkills = data.skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || skill.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredCerts = data.certifications.filter(cert =>
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Skill handlers
  const handleEditSkill = (skill: Skill) => {
    setEditingSkill({ ...skill });
    setIsEditingSkill(true);
  };

  const handleNewSkill = () => {
    setEditingSkill({
      id: '',
      name: '',
      level: 50,
      category: 'Web Development'
    });
    setIsEditingSkill(true);
  };

  const handleSaveSkill = () => {
    if (!editingSkill) return;
    if (editingSkill.id) {
      updateSkill(editingSkill.id, editingSkill);
    } else {
      addSkill(editingSkill);
    }
    setIsEditingSkill(false);
    setEditingSkill(null);
  };

  const handleDeleteSkill = (id: string) => {
    deleteSkill(id);
    setDeleteSkillConfirm(null);
  };

  // Certification handlers
  const handleEditCert = (cert: Certification) => {
    setEditingCert({ ...cert });
    setIsEditingCert(true);
  };

  const handleNewCert = () => {
    setEditingCert({
      id: '',
      title: '',
      provider: '',
      status: 'In Progress',
      progress: 0
    });
    setIsEditingCert(true);
  };

  const handleSaveCert = () => {
    if (!editingCert) return;
    if (editingCert.id) {
      updateCertification(editingCert.id, editingCert);
    } else {
      addCertification(editingCert);
    }
    setIsEditingCert(false);
    setEditingCert(null);
  };

  const handleDeleteCert = (id: string) => {
    deleteCertification(id);
    setDeleteCertConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-cyber font-bold text-accent">Skills & Certifications</h2>
          <p className="text-sm text-gray-400 font-mono">Manage your skills and certifications</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            onClick={activeTab === 'skills' ? handleNewSkill : handleNewCert}
            className="cyber-button flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            Add {activeTab === 'skills' ? 'Skill' : 'Certification'}
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-cyber-light/20">
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-3 font-mono text-sm transition-all ${
            activeTab === 'skills'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-400 hover:text-accent'
          }`}
        >
          <Zap className="w-4 h-4 inline mr-2" />
          Skills ({data.skills.length})
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`px-4 py-3 font-mono text-sm transition-all ${
            activeTab === 'certifications'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-400 hover:text-accent'
          }`}
        >
          <Award className="w-4 h-4 inline mr-2" />
          Certifications ({data.certifications.length})
        </button>
      </div>

      {/* Search & Filter */}
      <div className="cyber-card p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="terminal-input w-full pl-10"
          />
        </div>
        {activeTab === 'skills' && (
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="terminal-input w-full md:w-48"
          >
            {skillCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Skills List */}
      {activeTab === 'skills' && (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="cyber-card p-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-cyber font-bold text-accent">{skill.name}</h3>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 border border-primary/30 text-primary font-mono">
                        {skill.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-cyber-light/20 rounded-full overflow-hidden max-w-xs">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>
                      <span className="text-sm font-mono text-gray-400">{skill.level}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditSkill(skill)}
                      className="p-2 rounded-lg hover:bg-primary/20 text-gray-400 hover:text-primary transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteSkillConfirm(skill.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                <AnimatePresence>
                  {deleteSkillConfirm === skill.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-cyber-dark/95 flex items-center justify-center p-4"
                    >
                      <div className="text-center">
                        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                        <p className="text-accent font-mono mb-4">Delete this skill?</p>
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => setDeleteSkillConfirm(null)}
                            className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredSkills.length === 0 && (
            <div className="cyber-card p-12 text-center">
              <Zap className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 font-mono">No skills found</p>
              <button onClick={handleNewSkill} className="mt-4 text-primary hover:underline font-mono text-sm">
                Add your first skill
              </button>
            </div>
          )}
        </div>
      )}

      {/* Certifications List */}
      {activeTab === 'certifications' && (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="cyber-card p-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-cyber font-bold text-accent">{cert.title}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full font-mono ${
                        cert.status === 'Completed'
                          ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                          : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 font-mono mb-2">{cert.provider}</p>
                    {cert.status === 'In Progress' && (
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-cyber-light/20 rounded-full overflow-hidden max-w-xs">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cert.progress}%` }}
                            className="h-full bg-gradient-to-r from-yellow-500 to-primary"
                          />
                        </div>
                        <span className="text-sm font-mono text-gray-400">{cert.progress}%</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditCert(cert)}
                      className="p-2 rounded-lg hover:bg-primary/20 text-gray-400 hover:text-primary transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteCertConfirm(cert.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                <AnimatePresence>
                  {deleteCertConfirm === cert.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-cyber-dark/95 flex items-center justify-center p-4"
                    >
                      <div className="text-center">
                        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                        <p className="text-accent font-mono mb-4">Delete this certification?</p>
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => setDeleteCertConfirm(null)}
                            className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDeleteCert(cert.id)}
                            className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCerts.length === 0 && (
            <div className="cyber-card p-12 text-center">
              <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 font-mono">No certifications found</p>
              <button onClick={handleNewCert} className="mt-4 text-primary hover:underline font-mono text-sm">
                Add your first certification
              </button>
            </div>
          )}
        </div>
      )}

      {/* Edit Skill Modal */}
      <AnimatePresence>
        {isEditingSkill && editingSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setIsEditingSkill(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="cyber-card p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-cyber font-bold text-accent">
                  {editingSkill.id ? 'Edit Skill' : 'Add Skill'}
                </h3>
                <button onClick={() => setIsEditingSkill(false)} className="text-gray-400 hover:text-accent">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Skill Name</label>
                  <input
                    type="text"
                    value={editingSkill.name}
                    onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="e.g., React, Python, TensorFlow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Category</label>
                  <input
                    type="text"
                    value={editingSkill.category}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="e.g., Web Development, AI/ML"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">
                    Proficiency Level: {editingSkill.level}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingSkill.level}
                    onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-cyber-light/20">
                <button
                  onClick={() => setIsEditingSkill(false)}
                  className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSaveSkill}
                  className="cyber-button flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="w-4 h-4" />
                  Save Skill
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Certification Modal */}
      <AnimatePresence>
        {isEditingCert && editingCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setIsEditingCert(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="cyber-card p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-cyber font-bold text-accent">
                  {editingCert.id ? 'Edit Certification' : 'Add Certification'}
                </h3>
                <button onClick={() => setIsEditingCert(false)} className="text-gray-400 hover:text-accent">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Certification Title</label>
                  <input
                    type="text"
                    value={editingCert.title}
                    onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="e.g., AWS Solutions Architect"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Provider</label>
                  <input
                    type="text"
                    value={editingCert.provider}
                    onChange={(e) => setEditingCert({ ...editingCert, provider: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="e.g., Amazon Web Services, Coursera"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Status</label>
                  <select
                    value={editingCert.status}
                    onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value as Certification['status'] })}
                    className="terminal-input w-full"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>

                {editingCert.status === 'In Progress' && (
                  <div>
                    <label className="block text-sm font-mono text-accent mb-2">
                      Progress: {editingCert.progress}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editingCert.progress}
                      onChange={(e) => setEditingCert({ ...editingCert, progress: parseInt(e.target.value) })}
                      className="w-full accent-primary"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Certificate Link (optional)</label>
                  <input
                    type="url"
                    value={editingCert.link || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, link: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-cyber-light/20">
                <button
                  onClick={() => setIsEditingCert(false)}
                  className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSaveCert}
                  className="cyber-button flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="w-4 h-4" />
                  Save Certification
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
