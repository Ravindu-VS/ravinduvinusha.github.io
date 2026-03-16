import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Shield, Bot, Wifi, Wrench, 
  ChevronRight, ChevronLeft, Target, Code, 
  PieChart, Settings, CheckCircle2, Zap, Award
} from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  icon: JSX.Element;
  coverImage: string;
  problem: string;
  approach: string;
  solution: string;
  technologies: string[];
  results: {
    title: string;
    value: string;
    icon: JSX.Element;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

const caseStudies: CaseStudy[] = [
  {
    id: "neural-interface",
    title: "Neural Interface Control System",
    subtitle: "BCI Technology for Assistive Devices",
    icon: <Brain className="w-6 h-6" />,
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600&q=80",
    problem: "Traditional control interfaces for assistive devices are often limited in functionality and difficult to use for individuals with mobility impairments. Existing brain-computer interfaces (BCIs) suffer from accuracy issues, high latency, and poor signal-to-noise ratios, making them impractical for daily use.",
    approach: "We developed a novel approach that combines advanced signal processing techniques with deep learning algorithms to improve the accuracy and responsiveness of EEG-based neural interfaces. Our methodology focused on robust artifact removal, feature extraction optimized for motor imagery, and transfer learning to reduce calibration time.",
    solution: "The Neural Interface Control System uses a custom headset with 16 dry electrodes, a compact signal processing unit, and wireless connectivity. The system processes EEG signals in real-time through a three-stage pipeline: (1) Artifact removal using ICA and wavelet denoising, (2) Feature extraction with Common Spatial Patterns, and (3) Classification using an ensemble of CNNs and LSTMs. The system interprets these signals to control assistive devices with high precision.",
    technologies: [
      "OpenBCI Hardware", 
      "Python with NumPy/SciPy", 
      "TensorFlow/Keras", 
      "Signal Processing (ICA, CSP, Wavelets)",
      "Real-time Data Pipeline",
      "Embedded C++ for Hardware Control"
    ],
    results: [
      {
        title: "Classification Accuracy",
        value: "89%",
        icon: <PieChart className="w-5 h-5" />
      },
      {
        title: "Response Latency",
        value: "<100ms",
        icon: <Zap className="w-5 h-5" />
      },
      {
        title: "Calibration Time",
        value: "5 min",
        icon: <Target className="w-5 h-5" />
      },
      {
        title: "Successful Transfers",
        value: "95%",
        icon: <CheckCircle2 className="w-5 h-5" />
      }
    ],
    testimonial: {
      quote: "This system has completely transformed how I interact with technology. For the first time, I can control my wheelchair and computer independently.",
      author: "Dr. Sarah Chen",
      role: "Neuroscientist & Test User"
    }
  },
  {
    id: "iot-security",
    title: "IoT Security Assessment Platform",
    subtitle: "Automated Vulnerability Detection",
    icon: <Shield className="w-6 h-6" />,
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    problem: "The proliferation of IoT devices has created massive security risks in homes and businesses. Most IoT devices ship with inadequate security controls, and users lack the technical expertise to assess their vulnerability. Manual security testing is time-consuming and requires specialized knowledge.",
    approach: "We developed an automated security assessment platform specifically tailored for IoT devices. Our approach combined passive network monitoring, active vulnerability scanning, and firmware analysis into a unified system that could detect common security issues without requiring expert knowledge.",
    solution: "The IoT Security Assessment Platform consists of a network appliance that monitors traffic, identifies connected IoT devices, and runs comprehensive security checks. The system uses a database of 150+ known vulnerabilities and employs both signature-based and behavioral analysis to detect security issues. It provides detailed reports with remediation steps and can automatically quarantine compromised devices.",
    technologies: [
      "Kali Linux",
      "Python for Automation",
      "Nmap & Custom Scanning Tools",
      "Wireshark & Traffic Analysis",
      "Machine Learning for Anomaly Detection",
      "Docker for Isolation"
    ],
    results: [
      {
        title: "Devices Tested",
        value: "500+",
        icon: <Wifi className="w-5 h-5" />
      },
      {
        title: "CVEs Detected",
        value: "150+",
        icon: <Shield className="w-5 h-5" />
      },
      {
        title: "False Positive Rate",
        value: "<3%",
        icon: <Target className="w-5 h-5" />
      },
      {
        title: "Vulnerability Mitigation",
        value: "78%",
        icon: <CheckCircle2 className="w-5 h-5" />
      }
    ],
    testimonial: {
      quote: "I deployed this platform across our entire smart building infrastructure and it identified critical vulnerabilities that would have otherwise gone unnoticed.",
      author: "Michael Rodriguez",
      role: "CTO, SmartSpace Buildings"
    }
  },
  {
    id: "autonomous-drone",
    title: "Autonomous Drone Navigation",
    subtitle: "ROS-based Vision System",
    icon: <Bot className="w-6 h-6" />,
    coverImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1600&q=80",
    problem: "Autonomous drones struggle to navigate reliably in complex, dynamic environments without expensive LiDAR sensors or external positioning systems. Visual navigation systems often fail in challenging lighting conditions and have difficulty recognizing obstacles of varying sizes and shapes.",
    approach: "We developed a multi-sensor approach that combines stereo vision with infrared sensors and sonar for comprehensive environmental awareness. Our system uses a custom path planning algorithm based on RRT* with dynamic obstacle prediction to navigate safely in changing environments.",
    solution: "The Autonomous Drone Navigation system uses a custom hardware setup with dual cameras for stereo vision, infrared sensors for depth perception in poor lighting, and ultrasonic sensors for close proximity detection. The software stack is built on ROS with custom nodes for SLAM, obstacle detection using YOLOv8, and path planning. The system maintains a probabilistic map of the environment that's continuously updated as the drone moves.",
    technologies: [
      "Robot Operating System (ROS)",
      "Python & C++",
      "OpenCV for Computer Vision",
      "YOLOv8 for Object Detection",
      "SLAM for Mapping",
      "RRT* for Path Planning"
    ],
    results: [
      {
        title: "Navigation Success Rate",
        value: "95%",
        icon: <Target className="w-5 h-5" />
      },
      {
        title: "Obstacle Avoidance",
        value: "100%",
        icon: <CheckCircle2 className="w-5 h-5" />
      },
      {
        title: "Operating Speed",
        value: "5m/s",
        icon: <Zap className="w-5 h-5" />
      },
      {
        title: "Battery Efficiency",
        value: "+20%",
        icon: <Settings className="w-5 h-5" />
      }
    ],
    testimonial: {
      quote: "This navigation system allowed our inspection drones to work autonomously in complex industrial environments where GPS isn't reliable.",
      author: "Jennifer Parker",
      role: "Director of Operations, IndustrialAir"
    }
  }
];

const CaseStudies = () => {
  const [currentStudy, setCurrentStudy] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  
  const handleNext = () => {
    setDirection(1);
    setCurrentStudy((prev) => (prev + 1) % caseStudies.length);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setCurrentStudy((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };
  
  const study = caseStudies[currentStudy];

  return (
    <div className="py-20 relative overflow-hidden" id="case-studies">
      <div className="absolute inset-0 matrix-bg">
        <div className="absolute inset-0 bg-cyber-dark/80" />
        <div className="matrix-code opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-cyber">
            <span className="neon-text">Case Studies</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
            In-depth analysis of selected projects showing problem-solving approach and technical implementation
          </p>
        </motion.div>
        
        {/* Case Study Navigation */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {caseStudies.map((study, index) => (
            <motion.button
              key={study.id}
              onClick={() => {
                setDirection(index > currentStudy ? 1 : -1);
                setCurrentStudy(index);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 font-mono hologram-effect flex items-center gap-2 ${
                currentStudy === index
                  ? 'cyber-glow bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary text-primary'
                  : 'cyber-card border-cyber-light/30 text-gray-400 hover:text-accent hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {study.icon}
              {study.title}
            </motion.button>
          ))}
        </div>
        
        {/* Case Study Content */}
        <div className="relative overflow-hidden min-h-[800px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={study.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid md:grid-cols-12 gap-8"
            >
              {/* Hero Section */}
              <div className="md:col-span-12 relative overflow-hidden rounded-xl cyber-card-enhanced h-64 md:h-96">
                <img 
                  src={study.coverImage} 
                  alt={study.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-darker/80" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                      <span className="text-primary glow-effect">
                        {study.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold font-cyber text-accent">{study.title}</h3>
                      <p className="text-gray-300 font-mono">{study.subtitle}</p>
                    </div>
                  </div>
                </div>
                
                {/* Navigation Controls */}
                <div className="absolute bottom-6 right-6 flex gap-4">
                  <motion.button
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-cyber-dark/50 border border-cyber-light/30 hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-6 h-6 text-accent" />
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-cyber-dark/50 border border-cyber-light/30 hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-6 h-6 text-accent" />
                  </motion.button>
                </div>
              </div>
              
              {/* Problem & Approach */}
              <div className="md:col-span-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="cyber-card-enhanced h-full"
                >
                  <div className="p-6 border-b border-cyber-light/20">
                    <h4 className="text-xl font-cyber text-primary mb-1">Problem</h4>
                    <p className="text-gray-300 leading-relaxed">{study.problem}</p>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-cyber text-primary mb-1">Approach</h4>
                    <p className="text-gray-300 leading-relaxed">{study.approach}</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Solution */}
              <div className="md:col-span-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="cyber-card-enhanced h-full"
                >
                  <div className="p-6">
                    <h4 className="text-xl font-cyber text-primary mb-1">Solution</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">{study.solution}</p>
                    
                    <h5 className="text-lg font-cyber text-accent mb-3">Technologies Used</h5>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-primary/20 border border-primary/30 text-primary font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Results */}
              <div className="md:col-span-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="cyber-card-enhanced"
                >
                  <div className="p-6">
                    <h4 className="text-xl font-cyber text-primary mb-6">Key Results</h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {study.results.map((result) => (
                        <div key={result.title} className="text-center">
                          <div className="flex justify-center mb-3">
                            <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                              <span className="text-primary glow-effect">
                                {result.icon}
                              </span>
                            </div>
                          </div>
                          <div className="text-2xl md:text-3xl font-bold font-cyber text-primary mb-1">
                            {result.value}
                          </div>
                          <div className="text-sm text-gray-300 font-mono">
                            {result.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Testimonial */}
              {study.testimonial && (
                <div className="md:col-span-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="cyber-card-enhanced h-full"
                  >
                    <div className="p-6 flex flex-col h-full justify-center">
                      <div className="mb-6 text-center">
                        <Award className="w-10 h-10 text-primary mx-auto" />
                      </div>
                      <blockquote className="text-gray-300 text-lg italic mb-6 text-center">
                        "{study.testimonial.quote}"
                      </blockquote>
                      <div className="text-center">
                        <div className="font-cyber text-accent">
                          {study.testimonial.author}
                        </div>
                        <div className="text-sm text-gray-400 font-mono">
                          {study.testimonial.role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
              
              {/* Call to Action */}
              <div className="md:col-span-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="cyber-card-enhanced p-6 text-center"
                >
                  <h4 className="text-xl font-cyber text-accent mb-4">Interested in this project?</h4>
                  <div className="flex flex-wrap justify-center gap-4">
                    <motion.a
                      href="#contact"
                      className="cyber-button text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Request More Information
                      </span>
                    </motion.a>
                    <motion.a
                      href={`https://github.com/ravinduvinusha/${study.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Code className="w-4 h-4" />
                        View Source Code
                      </span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;