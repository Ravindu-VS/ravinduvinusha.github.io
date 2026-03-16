import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Send,
  ExternalLink,
  Terminal,
  Globe,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';
import { usePortfolioData } from '../contexts/DataContext';

export default function Contact() {
  const { data } = usePortfolioData();
  const { settings } = data;
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [activeInput, setActiveInput] = useState<string | null>(null);

  // Build contact info from settings
  const contactInfo = [
    settings.email && {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: settings.email,
      link: `mailto:${settings.email}`
    },
    settings.phone && {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: settings.phone,
      link: `tel:${settings.phone.replace(/\s/g, '')}`
    },
    settings.location && {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: settings.location,
      link: `https://maps.google.com/?q=${encodeURIComponent(settings.location)}`
    }
  ].filter(Boolean);

  // Build social links from settings
  const socialLinks = [
    settings.socials?.github && { 
      icon: <Github className="w-6 h-6" />, 
      label: 'GitHub', 
      href: settings.socials.github, 
      color: 'hover:text-primary',
      description: 'Open source projects & code repositories'
    },
    settings.socials?.linkedin && { 
      icon: <Linkedin className="w-6 h-6" />, 
      label: 'LinkedIn', 
      href: settings.socials.linkedin, 
      color: 'hover:text-secondary',
      description: 'Professional network & career updates'
    },
    settings.socials?.twitter && { 
      icon: <Twitter className="w-6 h-6" />, 
      label: 'Twitter', 
      href: settings.socials.twitter, 
      color: 'hover:text-primary',
      description: 'Tech insights & research discussions'
    },
    settings.socials?.instagram && { 
      icon: <Instagram className="w-6 h-6" />, 
      label: 'Instagram', 
      href: settings.socials.instagram, 
      color: 'hover:text-pink-500',
      description: 'Visual updates & behind the scenes'
    },
    settings.socials?.youtube && { 
      icon: <Youtube className="w-6 h-6" />, 
      label: 'YouTube', 
      href: settings.socials.youtube, 
      color: 'hover:text-red-500',
      description: 'Video tutorials & demos'
    },
    settings.socials?.website && { 
      icon: <Globe className="w-6 h-6" />, 
      label: 'Website', 
      href: settings.socials.website, 
      color: 'hover:text-secondary',
      description: 'Personal website & blog'
    }
  ].filter(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    // Add form submission logic here
  };

  return (
    <div className="py-20 relative overflow-hidden matrix-bg section-matrix" id="contact">
      <div className="matrix-code" />
      <div className="matrix-floating" />
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 scroll-reveal"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-cyber">
            <span className="neon-text">Initialize Contact</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono matrix-text">
            Ready to collaborate on innovative projects • Available for device repair services (mobile phones, PCs, laptops) • Let's build the future together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hologram-effect cyber-card p-8 data-stream"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                <Terminal className="w-6 h-6 text-primary glow-effect" />
              </div>
              <h3 className="text-2xl font-bold text-accent font-cyber">Send Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your.email@domain.com' },
                { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Project collaboration' }
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2 font-mono matrix-text">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className={`terminal-input w-full ${
                      activeInput === field.name ? 'cyber-glow' : ''
                    }`}
                    placeholder={field.placeholder}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={(e) => setFormState(prev => ({ ...prev, [field.name]: e.target.value }))}
                    onFocus={() => setActiveInput(field.name)}
                    onBlur={() => setActiveInput(null)}
                  />
                </div>
              ))}
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-400 mb-2 font-mono matrix-text">
                  Message
                </label>
                <textarea
                  rows={4}
                  className={`terminal-input w-full resize-none ${
                    activeInput === 'message' ? 'cyber-glow' : ''
                  }`}
                  placeholder="Describe your project or collaboration idea..."
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  onFocus={() => setActiveInput('message')}
                  onBlur={() => setActiveInput(null)}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full cyber-button hologram-effect"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Transmit Message
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="hologram-effect cyber-card p-8 data-stream">
              <h3 className="text-2xl font-bold mb-6 text-accent font-cyber">Contact Protocols</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl hologram-effect cyber-card bg-cyber-darker/30 hover:bg-cyber-darker/50 transition-all duration-300 group"
                    whileHover={{ x: 10 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 group-hover:scale-110 transition-transform">
                      <span className="text-primary glow-effect">
                        {info.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 font-mono matrix-text">{info.title}</p>
                      <p className="font-medium text-accent font-mono">{info.value}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="hologram-effect cyber-card p-8 data-stream">
              <h3 className="text-2xl font-bold mb-6 text-accent font-cyber">Network Connections</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`contact-card-depth flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300 group gpu-accelerated ${link.color}`}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 group-hover:scale-110 transition-transform">
                      <span className="glow-effect transition-colors">
                        {link.icon}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-accent group-hover:text-primary transition-colors font-cyber">
                        {link.label}
                      </span>
                      <p className="text-xs text-gray-400 mt-1 font-mono matrix-text">{link.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="hologram-effect cyber-card p-8 data-stream">
              <h3 className="text-2xl font-bold mb-4 text-accent font-cyber">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-green-400 font-medium font-mono matrix-text">Available for Projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-blue-400 font-medium font-mono matrix-text">Open to Collaboration</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-green-400 font-medium font-mono matrix-text">Response Time: &lt; 24h</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}