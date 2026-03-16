import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Cpu, 
  Shield, 
  Wifi, 
  CircuitBoard, 
  Terminal,
  Microscope,
  Radio,
  Lock,
  Zap,
  Database,
  Globe,
  Smartphone,
  Sparkles,
  Monitor,
  Wrench,
  Calendar,
  MapPin,
  Briefcase
} from 'lucide-react';
import { usePortfolioData } from '../contexts/DataContext';

const techInterests = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Neurotech & BCI",
    description: "Brain-computer interfaces, neural signal processing, cognitive enhancement systems",
    tools: ["OpenBCI", "EEG Analysis", "Signal Processing", "Neural Networks"],
    color: "from-primary/20 to-secondary/20"
  },
  {
    icon: <CircuitBoard className="w-8 h-8" />,
    title: "Robotics & Automation",
    description: "Autonomous systems, sensor fusion, real-time control, embedded intelligence",
    tools: ["ROS", "Arduino", "ESP32", "Sensor Networks"],
    color: "from-secondary/20 to-primary/20"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Ethical Hacking & Networking",
    description: "Ethical hacking fundamentals, network configuration, TCP/IP protocols, wireless networking",
    tools: ["Kali Linux", "Wireshark", "Nmap", "TCP/IP"],
    color: "from-primary/20 to-secondary/20"
  },
  {
    icon: <Wifi className="w-8 h-8" />,
    title: "IoT Ecosystems",
    description: "Connected devices, edge computing, wireless protocols, smart infrastructure",
    tools: ["MQTT", "LoRaWAN", "Zigbee", "Edge AI"],
    color: "from-secondary/20 to-primary/20"
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Device Repair & Hardware",
    description: "Professional repair services for mobile phones, PCs, and laptops. Hardware diagnostics and optimization.",
    tools: ["Hardware Diagnostics", "Component Replacement", "Soldering", "System Recovery", "Data Recovery", "Performance Tuning"],
    color: "from-primary/20 to-secondary/20"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Web Development",
    description: "Full-stack applications, modern frameworks, scalable architectures, cloud deployment",
    tools: ["React", "Node.js", "TypeScript", "AWS"],
    color: "from-secondary/20 to-primary/20"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile Development",
    description: "Cross-platform apps, native performance, user experience, mobile-first design",
    tools: ["React Native", "Flutter", "Android", "iOS"],
    color: "from-secondary/20 to-primary/20"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "AI & Machine Learning",
    description: "Deep learning, computer vision, natural language processing, predictive analytics",
    tools: ["TensorFlow", "PyTorch", "OpenCV", "Scikit-learn"],
    color: "from-primary/20 to-secondary/20"
  },
  {
    icon: <Terminal className="w-8 h-8" />,
    title: "Software Engineering",
    description: "Clean code, design patterns, system architecture, performance optimization",
    tools: ["Python", "C++", "JavaScript", "Git"],
    color: "from-secondary/20 to-primary/20"
  }
];

const academicInfo = [
  {
    icon: <Microscope className="w-6 h-6" />,
    title: "Physical Science",
    institution: "University of Sri Jayawardanapura",
    status: "2nd Year",
    focus: "Physics • Mathematics • Research Methods"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Computer Engineering", 
    institution: "General Sir John Kotelawala Defence University",
    status: "3rd Year",
    focus: "Hardware • Software • Systems Design"
  }
];

const toolCategories = [
  {
    category: "Hardware & Embedded",
    tools: ["ESP32/ESP8266", "Arduino", "Raspberry Pi", "STM32", "FPGA"],
    icon: <CircuitBoard className="w-5 h-5" />
  },
  {
    category: "Networking Tools",
    tools: ["Wireshark", "Nmap", "TCP/IP", "Ping/Traceroute", "Kali Linux"],
    icon: <Lock className="w-5 h-5" />
  },
  {
    category: "Programming & Dev",
    tools: ["Python", "C/C++", "JavaScript", "TypeScript", "Java"],
    icon: <Terminal className="w-5 h-5" />
  },
  {
    category: "Web & Mobile",
    tools: ["React", "Node.js", "React Native", "Flutter", "MongoDB"],
    icon: <Globe className="w-5 h-5" />
  },
  {
    category: "AI & ML Tools",
    tools: ["TensorFlow", "PyTorch", "OpenCV", "Pandas", "Jupyter"],
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    category: "Protocols & Networks",
    tools: ["TCP/IP", "MQTT", "I2C/SPI", "CAN Bus", "Bluetooth"],
    icon: <Radio className="w-5 h-5" />
  }
];

export default function About() {
  const { data } = usePortfolioData();
  const { settings } = data;
  const profile = settings?.profile;

  return (
    <div className="py-20 relative overflow-hidden matrix-bg section-matrix" id="about">
      <div className="absolute inset-0 bg-cyber-dark/50" />
      <div className="matrix-code" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto scroll-reveal"
        >
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 font-cyber">
            <span className="neon-text">System Overview</span>
          </h2>

          {/* Profile Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hologram-effect cyber-card p-8 mb-16"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 cyber-glow relative">
                  <img
                    src={profile?.profilePicture || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                    alt={profile?.fullName || 'Profile'}
                    className="w-full h-full object-cover filter brightness-90 contrast-110 saturate-75"
                  />
                  {/* Cyberpunk overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-secondary/25 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-cyber-dark/15 mix-blend-color" />
                </div>
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2 text-accent font-cyber">{profile?.fullName || 'Loading...'}</h3>
                <p className="text-primary font-mono mb-4">{profile?.title || ''}</p>
                <p className="text-gray-300 mb-6 leading-relaxed">{profile?.bio || ''}</p>
                
                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {profile?.yearsOfExperience && profile.yearsOfExperience > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{profile.yearsOfExperience}+ years experience</span>
                    </div>
                  )}
                  {settings?.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{settings.location}</span>
                    </div>
                  )}
                  {profile?.currentRole && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span>{profile.currentRole}{profile?.currentCompany ? ` at ${profile.currentCompany}` : ''}</span>
                    </div>
                  )}
                  {profile?.availableForHire && (
                    <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 border border-green-500/50 text-green-400 font-mono">
                      Available for hire
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tech Interests Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {techInterests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="hologram-effect cyber-card p-6 group hover:scale-105 transition-all duration-300 data-stream"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${interest.color} border border-primary/30 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-primary glow-effect">
                    {interest.icon}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-3 text-accent font-cyber">{interest.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{interest.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {interest.tools.map((tool, i) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (index * 0.1) + (i * 0.05) }}
                      className="px-2 py-1 text-xs rounded-full bg-primary/20 border border-primary/30 text-primary font-mono matrix-text"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Academic Background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hologram-effect cyber-card p-8 mb-16"
          >
            <h3 className="text-2xl font-bold mb-8 text-center font-cyber">
              <span className="neon-text">Academic Protocols</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {academicInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="hologram-effect cyber-card p-6 bg-cyber-darker/50 hover:bg-cyber-darker/70 transition-all duration-300 data-stream"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                      <span className="text-primary glow-effect">
                        {info.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-1 text-accent font-cyber">{info.title}</h4>
                      <p className="text-sm text-gray-400 mb-2 font-mono">{info.institution}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 text-xs rounded bg-primary/20 text-primary font-mono matrix-text">
                          {info.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 font-mono">{info.focus}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools & Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hologram-effect cyber-card p-8"
          >
            <h3 className="text-2xl font-bold mb-8 text-center font-cyber">
              <span className="neon-text">Technology Stack</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolCategories.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="hologram-effect cyber-card p-6 bg-cyber-darker/30 hover:bg-cyber-darker/50 transition-all duration-300 group data-stream"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 group-hover:scale-110 transition-transform">
                      <span className="text-primary glow-effect">
                        {category.icon}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-accent font-cyber">{category.category}</h4>
                  </div>
                  <div className="space-y-2">
                    {category.tools.map((tool, i) => (
                      <motion.div
                        key={tool}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (i * 0.05) }}
                        className="flex items-center text-sm text-gray-300 font-mono"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary mr-3" />
                        {tool}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}