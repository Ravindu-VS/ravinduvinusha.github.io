import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkillRadarChart from './SkillRadarChart';
import { 
  Code, 
  Cpu, 
  Brain, 
  Shield, 
  Smartphone, 
  Globe, 
  Wrench,
  Database,
  Cloud,
  Server,
  Bot,
  Columns,
  Wifi,
  CircuitBoard,
  Sparkles
} from 'lucide-react';

const skillCategories = [
  {
    title: "Embedded & IoT Systems",
    icon: <CircuitBoard />,
    skills: [
      { name: "ESP32/ESP8266 Development", level: 90 },
      { name: "Arduino Programming", level: 95 },
      { name: "Sensor Integration", level: 85 },
      { name: "Wireless Protocols", level: 80 },
      { name: "Real-time Systems", level: 85 }
    ],
    color: "from-primary/20 to-secondary/20"
  },
  {
    title: "Ethical Hacking & Networking",
    icon: <Shield />,
    skills: [
      { name: "Ethical Hacking", level: 85 },
      { name: "Basic Networking (TCP/IP)", level: 80 },
      { name: "Network Configuration", level: 75 },
      { name: "Wireless Networking", level: 70 },
      { name: "Network Troubleshooting", level: 80 }
    ],
    color: "from-secondary/20 to-primary/20"
  },
  {
    title: "Device Repair & Hardware",
    icon: <Wrench />,
    skills: [
      { name: "Mobile Phone Repair", level: 90 },
      { name: "PC/Laptop Hardware Repair", level: 95 },
      { name: "Component Soldering", level: 85 },
      { name: "System Diagnostics", level: 90 },
      { name: "Data Recovery", level: 80 }
    ],
    color: "from-primary/20 to-secondary/20"
  },
  {
    title: "Robotics & Automation",
    icon: <Bot />,
    skills: [
      { name: "ROS Development", level: 80 },
      { name: "Autonomous Navigation", level: 75 },
      { name: "Computer Vision", level: 80 },
      { name: "Motion Control", level: 85 },
      { name: "Sensor Fusion", level: 80 }
    ],
    color: "from-primary/20 to-secondary/20"
  },
  {
    title: "Brain-Computer Interfaces",
    icon: <Brain />,
    skills: [
      { name: "EEG Signal Processing", level: 75 },
      { name: "Neural Data Analysis", level: 70 },
      { name: "OpenBCI Integration", level: 80 },
      { name: "Machine Learning for BCI", level: 75 },
      { name: "Real-time Processing", level: 80 }
    ],
    color: "from-secondary/20 to-primary/20"
  },
  {
    title: "Web Development",
    icon: <Globe />,
    skills: [
      { name: "React & TypeScript", level: 90 },
      { name: "Node.js & Express", level: 85 },
      { name: "Next.js & SSR", level: 80 },
      { name: "RESTful APIs", level: 85 },
      { name: "Database Design", level: 80 }
    ],
    color: "from-primary/20 to-secondary/20"
  },
  {
    title: "Mobile App Development",
    icon: <Smartphone />,
    skills: [
      { name: "React Native", level: 80 },
      { name: "Flutter & Dart", level: 75 },
      { name: "Native Android", level: 70 },
      { name: "Cross-platform Development", level: 80 },
      { name: "Mobile UI/UX", level: 75 }
    ],
    color: "from-secondary/20 to-primary/20"
  },
  {
    title: "Software Development",
    icon: <Code />,
    skills: [
      { name: "Python Programming", level: 95 },
      { name: "C/C++ Development", level: 85 },
      { name: "JavaScript/TypeScript", level: 90 },
      { name: "Java & OOP", level: 80 },
      { name: "Git & Version Control", level: 90 }
    ],
    color: "from-primary/20 to-secondary/20"
  },
  {
    title: "AI & Machine Learning",
    icon: <Sparkles />,
    skills: [
      { name: "TensorFlow & PyTorch", level: 80 },
      { name: "Computer Vision", level: 85 },
      { name: "Natural Language Processing", level: 75 },
      { name: "Deep Learning", level: 80 },
      { name: "Data Science & Analytics", level: 85 }
    ],
    color: "from-secondary/20 to-primary/20"
  },
  {
    title: "Hardware Engineering",
    icon: <Cpu />,
    skills: [
      { name: "Circuit Design", level: 85 },
      { name: "PCB Development", level: 80 },
      { name: "Hardware Debugging", level: 90 },
      { name: "Component Selection", level: 85 },
      { name: "System Integration", level: 85 }
    ],
    color: "from-primary/20 to-secondary/20"
  }
];

const certifications = [
  {
    title: "Certified Ethical Hacker (CEH)",
    status: "In Progress",
    provider: "EC-Council",
    icon: <Shield className="w-6 h-6" />,
    progress: 75
  },
  {
    title: "AWS Cloud Practitioner",
    status: "In Progress",
    provider: "Amazon Web Services",
    icon: <Database className="w-6 h-6" />,
    progress: 60
  },
  {
    title: "Google AI/ML Certification",
    status: "In Progress",
    provider: "Google Cloud",
    icon: <Sparkles className="w-6 h-6" />,
    progress: 50
  },
  {
    title: "Cisco IoT Fundamentals",
    status: "Completed",
    provider: "Cisco Networking Academy",
    icon: <Wifi className="w-6 h-6" />,
    progress: 100
  },
  {
    title: "ROS for Beginners",
    status: "Completed", 
    provider: "Robot Operating System",
    icon: <Bot className="w-6 h-6" />,
    progress: 100
  },
  {
    title: "React Developer Certification",
    status: "Completed",
    provider: "Meta (Facebook)",
    icon: <Globe className="w-6 h-6" />,
    progress: 100
  },
  {
    title: "Mobile App Development",
    status: "Completed",
    provider: "Google Developer",
    icon: <Smartphone className="w-6 h-6" />,
    progress: 100
  },
  {
    title: "Embedded Systems Design",
    status: "Completed",
    provider: "University Coursework",
    icon: <CircuitBoard className="w-6 h-6" />,
    progress: 100
  }
];

export default function Skills() {
  const [activeSkillCategory, setActiveSkillCategory] = useState<string | undefined>(undefined);
  return (
    <div className="py-20 relative overflow-hidden matrix-bg section-matrix" id="skills">
      <div className="absolute inset-0 bg-cyber-dark/50" />
      <div className="matrix-code" />
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 scroll-reveal"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-cyber">
            <span className="neon-text">Core Competencies</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono matrix-text">
            Specialized expertise across hardware, software, AI, and security domains
          </p>
        </motion.div>

        {/* Skill Proficiency Visualization - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <h3 className="text-2xl font-semibold font-cyber text-accent mb-6">
            Skill Proficiency Visualization
          </h3>
          
          {/* Radar Chart - Inline */}
          <div className="w-full max-w-sm mx-auto mb-4">
            <SkillRadarChart 
              title="Technical Proficiency"
              categories={[
                { name: "Embedded & IoT", value: 90 },
                { name: "Ethical Hacking", value: 78 },
                { name: "Device Repair", value: 92 },
                { name: "Robotics", value: 80 },
                { name: "BCI", value: 75 },
                { name: "Web Dev", value: 88 },
                { name: "Mobile Dev", value: 78 },
                { name: "Software Dev", value: 92 },
                { name: "AI & ML", value: 80 },
                { name: "Hardware", value: 85 }
              ]}
              primaryColor="#7bc5ff"
              secondaryColor="#4eacff"
              activeCategory={activeSkillCategory}
              onSelectCategory={setActiveSkillCategory}
            />
          </div>
          
          <p className="text-sm font-mono text-gray-400">
            Select a category on the chart to view detailed skills
          </p>
        </motion.div>
        
        {/* Skills Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {skillCategories
              .filter(category => !activeSkillCategory || category.title.includes(activeSkillCategory))
              .map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="hologram-effect cyber-card p-6 scroll-reveal"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold font-cyber text-accent">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium font-mono text-accent">{skill.name}</span>
                          <span className="text-xs font-mono text-secondary">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-cyber-dark/50 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                            style={{ 
                              boxShadow: '0 0 10px rgba(123, 197, 255, 0.5)'
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
            ))}
          </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hologram-effect cyber-card p-8"
        >
          <h3 className="text-2xl font-bold mb-8 text-center font-cyber">
            <span className="neon-text">Certifications & Training</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="hologram-effect cyber-card p-6 bg-cyber-darker/30 hover:bg-cyber-darker/50 transition-all duration-300 group data-stream"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 group-hover:scale-110 transition-transform">
                    <span className="text-primary glow-effect">
                      {cert.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold mb-1 text-accent font-cyber">{cert.title}</h4>
                    <p className="text-xs text-gray-400 mb-2 font-mono">{cert.provider}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full font-mono ${
                        cert.status === 'Completed' 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'bg-secondary/20 text-secondary border border-secondary/30'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                {cert.status === 'In Progress' && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400 font-mono">Progress</span>
                      <span className="text-xs text-secondary font-mono matrix-text">{cert.progress}%</span>
                    </div>
                    <div className="skill-bar-enhanced">
                      <motion.div
                        className="skill-progress-enhanced"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cert.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}