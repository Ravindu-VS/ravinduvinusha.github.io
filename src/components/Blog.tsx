import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Tag, 
  Eye,
  Heart,
  Share2,
  ExternalLink
} from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Building a Brain-Computer Interface: From Raw EEG to Motor Control",
    excerpt: "Deep dive into the technical challenges of processing neural signals for real-time device control, including signal preprocessing, feature extraction, and machine learning classification.",
    content: "In this comprehensive case study, I'll walk through the development of our neural interface system that achieved 89% accuracy in motor imagery classification...",
    category: "Neurotechnology",
    tags: ["BCI", "EEG", "Machine Learning", "Signal Processing"],
    readTime: "12 min read",
    publishDate: "2025-06-15",
    views: 2847,
    likes: 156,
    featured: true,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
    slug: "building-brain-computer-interface"
  },
  {
    id: 2,
    title: "IoT Security: Uncovering Vulnerabilities in Smart Home Devices",
    excerpt: "Analyzing security flaws in popular IoT devices and demonstrating practical penetration testing techniques for smart home ecosystems.",
    content: "During our research into IoT security, we discovered critical vulnerabilities in 78% of tested smart home devices...",
    category: "Cybersecurity",
    tags: ["IoT Security", "Penetration Testing", "Network Security", "OWASP"],
    readTime: "8 min read",
    publishDate: "2025-05-22",
    views: 1923,
    likes: 89,
    featured: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    slug: "iot-security-vulnerabilities"
  },
  {
    id: 3,
    title: "Autonomous Drone Navigation: SLAM Implementation with ROS",
    excerpt: "Technical breakdown of implementing simultaneous localization and mapping (SLAM) for autonomous drone navigation using ROS and computer vision.",
    content: "Developing autonomous navigation for drones presents unique challenges in real-time processing and decision making...",
    category: "Robotics",
    tags: ["ROS", "SLAM", "Computer Vision", "Autonomous Systems"],
    readTime: "15 min read",
    publishDate: "2025-04-10",
    views: 3156,
    likes: 201,
    featured: false,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    slug: "autonomous-drone-slam"
  },
  {
    id: 4,
    title: "Building Scalable React Applications: Architecture Patterns",
    excerpt: "Best practices for structuring large-scale React applications with TypeScript, including state management, component architecture, and performance optimization.",
    content: "As applications grow in complexity, maintaining clean and scalable architecture becomes crucial...",
    category: "Web Development",
    tags: ["React", "TypeScript", "Architecture", "Performance"],
    readTime: "10 min read",
    publishDate: "2025-03-18",
    views: 1654,
    likes: 92,
    featured: false,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    slug: "scalable-react-architecture"
  }
];

const categories = ["All", "Neurotechnology", "Cybersecurity", "Robotics", "Web Development"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="py-20 relative overflow-hidden matrix-bg" id="blog">
      <div className="absolute inset-0 bg-cyber-dark" />
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-cyber">
            <span className="neon-text">Tech Insights</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono matrix-text">
            Deep technical articles and case studies from my research and development work
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-mono transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary/20 border border-primary text-primary cyber-glow'
                  : 'bg-cyber-gray/30 border border-cyber-light/30 text-gray-300 hover:border-primary/50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="cyber-card overflow-hidden group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {post.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary/20 border border-primary text-primary text-xs font-mono rounded">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-xs text-gray-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-3 text-accent group-hover:text-primary transition-colors font-cyber">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-cyber-gray text-xs font-mono text-gray-300 rounded border border-cyber-light/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Featured Articles CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="cyber-card p-8 max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 font-cyber neon-text">
              Want More Technical Content?
            </h3>
            <p className="text-gray-300 mb-6 font-mono">
              Subscribe to my newsletter for in-depth technical articles, project updates, and industry insights.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyber-button"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Visit My Blog
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Blog Post Modal - Simplified for now */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="cyber-card max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 font-cyber neon-text">
                  {selectedPost.title}
                </h2>
                <p className="text-gray-300 mb-6">
                  {selectedPost.content}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPost(null)}
                  className="cyber-button"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
