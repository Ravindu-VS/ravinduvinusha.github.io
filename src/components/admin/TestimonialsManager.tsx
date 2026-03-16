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
  MessageSquare,
  Star,
  User
} from 'lucide-react';
import { usePortfolioData, Testimonial } from '../../contexts/DataContext';

export default function TestimonialsManager() {
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = usePortfolioData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'regular'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredTestimonials = data.testimonials.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = filterFeatured === 'all' || 
                            (filterFeatured === 'featured' && t.featured) ||
                            (filterFeatured === 'regular' && !t.featured);
    return matchesSearch && matchesFeatured;
  });

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial });
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingTestimonial({
      id: '',
      name: '',
      role: '',
      company: '',
      content: '',
      avatar: '',
      rating: 5,
      featured: false
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingTestimonial) return;
    if (editingTestimonial.id) {
      updateTestimonial(editingTestimonial.id, editingTestimonial);
    } else {
      addTestimonial(editingTestimonial);
    }
    setIsEditing(false);
    setEditingTestimonial(null);
  };

  const handleDelete = (id: string) => {
    deleteTestimonial(id);
    setDeleteConfirm(null);
  };

  const toggleFeatured = (testimonial: Testimonial) => {
    updateTestimonial(testimonial.id, { featured: !testimonial.featured });
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onChange?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-cyber font-bold text-accent">Testimonials</h2>
          <p className="text-sm text-gray-400 font-mono">Manage client testimonials and reviews</p>
        </div>
        <motion.button
          onClick={handleNew}
          className="cyber-button flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="cyber-card p-4 text-center">
          <p className="text-2xl font-cyber font-bold text-accent">{data.testimonials.length}</p>
          <p className="text-xs font-mono text-gray-400">Total</p>
        </div>
        <div className="cyber-card p-4 text-center">
          <p className="text-2xl font-cyber font-bold text-primary">
            {data.testimonials.filter(t => t.featured).length}
          </p>
          <p className="text-xs font-mono text-gray-400">Featured</p>
        </div>
        <div className="cyber-card p-4 text-center">
          <p className="text-2xl font-cyber font-bold text-yellow-400">
            {data.testimonials.length > 0 
              ? (data.testimonials.reduce((acc, t) => acc + t.rating, 0) / data.testimonials.length).toFixed(1)
              : '0'}
          </p>
          <p className="text-xs font-mono text-gray-400">Avg Rating</p>
        </div>
      </div>

      {/* Filters */}
      <div className="cyber-card p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="terminal-input w-full pl-10"
          />
        </div>
        <select
          value={filterFeatured}
          onChange={(e) => setFilterFeatured(e.target.value as 'all' | 'featured' | 'regular')}
          className="terminal-input w-full md:w-48"
        >
          <option value="all">All Testimonials</option>
          <option value="featured">Featured</option>
          <option value="regular">Regular</option>
        </select>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="cyber-card p-6 relative overflow-hidden"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-cyber-light/20 flex-shrink-0 border-2 border-primary/30">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-cyber font-bold text-accent">{testimonial.name}</h3>
                    {testimonial.featured && (
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="text-xs text-primary font-mono">{testimonial.company}</p>
                </div>
              </div>

              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>

              <blockquote className="text-gray-300 text-sm italic mb-4 line-clamp-4">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-cyber-light/20">
                <button
                  onClick={() => toggleFeatured(testimonial)}
                  className={`p-2 rounded-lg transition-all ${
                    testimonial.featured
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'hover:bg-yellow-500/20 text-gray-400 hover:text-yellow-400'
                  }`}
                  title={testimonial.featured ? 'Remove from featured' : 'Add to featured'}
                >
                  <Star className={`w-4 h-4 ${testimonial.featured ? 'fill-yellow-400' : ''}`} />
                </button>
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="p-2 rounded-lg hover:bg-primary/20 text-gray-400 hover:text-primary transition-all"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(testimonial.id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Delete Confirmation */}
              <AnimatePresence>
                {deleteConfirm === testimonial.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-cyber-dark/95 flex flex-col items-center justify-center p-4"
                  >
                    <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
                    <p className="text-center text-accent font-mono mb-4">Delete this testimonial?</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-sm"
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
      {filteredTestimonials.length === 0 && (
        <div className="cyber-card p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-cyber text-accent mb-2">No testimonials found</h3>
          <p className="text-gray-400 font-mono mb-6">Add client reviews and testimonials</p>
          <motion.button
            onClick={handleNew}
            className="cyber-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Add Testimonial
          </motion.button>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && editingTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="cyber-card p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-cyber font-bold text-accent">
                  {editingTestimonial.id ? 'Edit Testimonial' : 'Add Testimonial'}
                </h3>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-accent">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono text-accent mb-2">Name</label>
                    <input
                      type="text"
                      value={editingTestimonial.name}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                      className="terminal-input w-full"
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-accent mb-2">Role</label>
                    <input
                      type="text"
                      value={editingTestimonial.role}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                      className="terminal-input w-full"
                      placeholder="e.g., CEO, CTO"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Company</label>
                  <input
                    type="text"
                    value={editingTestimonial.company}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Avatar URL (optional)</label>
                  <input
                    type="url"
                    value={editingTestimonial.avatar || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Testimonial</label>
                  <textarea
                    value={editingTestimonial.content}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                    className="terminal-input w-full resize-none"
                    rows={4}
                    placeholder="What did they say about your work?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Rating</label>
                  {renderStars(editingTestimonial.rating, true, (rating) => 
                    setEditingTestimonial({ ...editingTestimonial, rating })
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingTestimonial.featured}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-cyber-light/30 bg-cyber-light/10 text-primary focus:ring-primary"
                  />
                  <label htmlFor="featured" className="text-sm font-mono text-accent">
                    Featured testimonial
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-cyber-light/20">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm"
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
                  Save Testimonial
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
