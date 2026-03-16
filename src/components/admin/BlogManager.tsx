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
  FileText,
  Eye,
  EyeOff,
  Calendar,
  Clock
} from 'lucide-react';
import { usePortfolioData, BlogPost } from '../../contexts/DataContext';

export default function BlogManager() {
  const { data, addBlogPost, updateBlogPost, deleteBlogPost } = usePortfolioData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredPosts = data.blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'published' && post.published) ||
                          (filterStatus === 'draft' && !post.published);
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingPost({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      category: 'Technology',
      tags: [],
      readTime: '5 min',
      date: new Date().toISOString().split('T')[0],
      published: false
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingPost) return;
    if (editingPost.id) {
      updateBlogPost(editingPost.id, editingPost);
    } else {
      addBlogPost(editingPost);
    }
    setIsEditing(false);
    setEditingPost(null);
  };

  const handleDelete = (id: string) => {
    deleteBlogPost(id);
    setDeleteConfirm(null);
  };

  const togglePublish = (post: BlogPost) => {
    updateBlogPost(post.id, { published: !post.published });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-cyber font-bold text-accent">Blog Posts</h2>
          <p className="text-sm text-gray-400 font-mono">Manage your blog articles</p>
        </div>
        <motion.button
          onClick={handleNew}
          className="cyber-button flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          New Post
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="cyber-card p-4 text-center">
          <p className="text-2xl font-cyber font-bold text-accent">{data.blogPosts.length}</p>
          <p className="text-xs font-mono text-gray-400">Total Posts</p>
        </div>
        <div className="cyber-card p-4 text-center">
          <p className="text-2xl font-cyber font-bold text-green-400">
            {data.blogPosts.filter(p => p.published).length}
          </p>
          <p className="text-xs font-mono text-gray-400">Published</p>
        </div>
        <div className="cyber-card p-4 text-center">
          <p className="text-2xl font-cyber font-bold text-yellow-400">
            {data.blogPosts.filter(p => !p.published).length}
          </p>
          <p className="text-xs font-mono text-gray-400">Drafts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="cyber-card p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="terminal-input w-full pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
          className="terminal-input w-full md:w-48"
        >
          <option value="all">All Posts</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="cyber-card p-6 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-cyber font-bold text-accent">{post.title}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-mono ${
                      post.published
                        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                        : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyber-light/20 font-mono">
                      {post.category}
                    </span>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs rounded-full bg-primary/10 border border-primary/20 text-primary font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish(post)}
                    className={`p-2 rounded-lg transition-all ${
                      post.published
                        ? 'hover:bg-yellow-500/20 text-green-400 hover:text-yellow-400'
                        : 'hover:bg-green-500/20 text-gray-400 hover:text-green-400'
                    }`}
                    title={post.published ? 'Unpublish' : 'Publish'}
                  >
                    {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 rounded-lg hover:bg-primary/20 text-gray-400 hover:text-primary transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(post.id)}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Delete Confirmation */}
              <AnimatePresence>
                {deleteConfirm === post.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-cyber-dark/95 flex flex-col items-center justify-center p-4"
                  >
                    <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
                    <p className="text-center text-accent font-mono mb-4">Delete this post?</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 rounded-lg bg-cyber-light/10 border border-cyber-light/30 text-accent font-mono text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
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
      {filteredPosts.length === 0 && (
        <div className="cyber-card p-12 text-center">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-cyber text-accent mb-2">No posts found</h3>
          <p className="text-gray-400 font-mono mb-6">Start writing your first blog post</p>
          <motion.button
            onClick={handleNew}
            className="cyber-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Create Post
          </motion.button>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && editingPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="cyber-card p-6 w-full max-w-2xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-cyber font-bold text-accent">
                  {editingPost.id ? 'Edit Post' : 'New Post'}
                </h3>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-accent">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Title</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="terminal-input w-full"
                    placeholder="Post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Excerpt</label>
                  <textarea
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    className="terminal-input w-full resize-none"
                    rows={2}
                    placeholder="Brief summary of the post"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Content (Markdown supported)</label>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="terminal-input w-full resize-none font-mono text-sm"
                    rows={10}
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono text-accent mb-2">Category</label>
                    <input
                      type="text"
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                      className="terminal-input w-full"
                      placeholder="e.g., Technology, Tutorial"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-accent mb-2">Read Time</label>
                    <input
                      type="text"
                      value={editingPost.readTime}
                      onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                      className="terminal-input w-full"
                      placeholder="e.g., 5 min"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={editingPost.tags.join(', ')}
                    onChange={(e) => setEditingPost({
                      ...editingPost,
                      tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    })}
                    className="terminal-input w-full"
                    placeholder="react, javascript, tutorial"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-accent mb-2">Date</label>
                  <input
                    type="date"
                    value={editingPost.date}
                    onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                    className="terminal-input w-full"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={editingPost.published}
                    onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                    className="w-5 h-5 rounded border-cyber-light/30 bg-cyber-light/10 text-primary focus:ring-primary"
                  />
                  <label htmlFor="published" className="text-sm font-mono text-accent">
                    Publish immediately
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
                  {editingPost.published ? 'Publish' : 'Save Draft'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
