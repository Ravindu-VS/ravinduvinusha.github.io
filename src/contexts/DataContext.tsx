import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Type definitions
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: string;
  technologies: string[];
  features?: string[];
  results?: string;
  github?: string;
  demo?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  displayStatus?: string; // Human-readable status like "Open Source", "Commercial"
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  status: 'Completed' | 'In Progress';
  progress: number;
  date?: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  published: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  featured: boolean;
}

export interface ProfileInfo {
  fullName: string;
  displayName: string;
  profilePicture: string;
  coverImage?: string;
  bio: string;
  shortBio: string;
  title: string;
  specializations: string[];
  yearsOfExperience: number;
  availableForHire: boolean;
  currentCompany?: string;
  currentRole?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
  };
  resumeUrl?: string;
  profile: ProfileInfo;
}

interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  settings: SiteSettings;
}

interface DataContextType {
  data: PortfolioData;
  isLoading: boolean;
  isSyncing: boolean;
  syncError: string | null;
  // Projects
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  // Skills
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  // Certifications
  addCertification: (cert: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  // Blog Posts
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  // Testimonials
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  // Settings
  updateSettings: (settings: Partial<SiteSettings>) => void;
  // Data operations
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Default data
const defaultData: PortfolioData = {
  projects: [
    {
      id: '1',
      title: 'Edge Intelligence Energy Management System for Smart Buildings',
      description: 'Designed and implemented an intelligent smart building energy management platform using digital twin simulation, reinforcement learning, and IoT communication. The system simulates building environments including HVAC, lighting, solar energy generation, and battery storage while optimizing energy consumption and cost.',
      image: 'https://images.unsplash.com/photo-1558618666-f4cea6ce0e32?auto=format&fit=crop&w=1000&q=80',
      category: 'AI/IoT',
      technologies: ['Python', 'PyTorch', 'Stable-Baselines3', 'MQTT', 'FastAPI', 'Next.js', 'TypeScript', 'TailwindCSS'],
      features: ['Digital Twin Simulation', 'Reinforcement Learning (PPO)', 'Energy Demand Prediction', 'Fault Detection', 'Real-time Monitoring Dashboard', 'Peak Demand Reduction'],
      results: 'Achieved significant energy reduction in pilot buildings while maintaining occupant comfort',
      displayStatus: 'Research',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'in-progress',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'AI-Powered Robotic Chess Tutor',
      description: 'Developed an intelligent robotic chess system capable of playing chess autonomously on a physical chessboard while acting as an adaptive chess tutor. The robot uses computer vision to detect board positions, a chess engine to calculate optimal moves, and a robotic arm to physically move chess pieces.',
      image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80',
      category: 'Robotics/AI',
      technologies: ['Python', 'OpenCV', 'Stockfish Chess Engine', 'NVIDIA Jetson', 'Robotics', 'Servo Motors', 'Inverse Kinematics'],
      features: ['Autonomous Chess Playing', 'Computer Vision Board Detection', 'Adaptive Tutoring', 'Player Behavior Analysis', 'Personalized Learning Recommendations'],
      results: 'Successfully plays chess and provides real-time tutoring feedback',
      displayStatus: 'Ongoing',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'in-progress',
      createdAt: '2023-06-15',
      updatedAt: '2023-06-15'
    },
    {
      id: '3',
      title: 'AI Multimedia Noise Removal Studio',
      description: 'Developed a full-stack AI application capable of removing noise from images, audio, and video using deep learning models. The system uses convolutional autoencoders to learn noise patterns and generate clean media outputs.',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
      category: 'AI/ML',
      technologies: ['TensorFlow', 'Python', 'Flask', 'React', 'Material-UI', 'Deep Learning'],
      features: ['Image Noise Removal', 'Audio Noise Removal', 'Video Noise Removal', 'Real-time Comparison Tools', 'Audio Waveform Visualization', 'Convolutional Autoencoders'],
      results: 'Reduced noise levels by up to 90% while maintaining media quality',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-06-05',
      updatedAt: '2023-06-05'
    },
    {
      id: '4',
      title: 'Face Recognition Attendance System',
      description: 'Built an automated attendance system using computer vision and facial recognition technologies. The system captures multiple face angles during registration and performs real-time identity verification with liveness detection to prevent spoofing attacks.',
      image: 'https://images.unsplash.com/photo-1563059239-f7c5eb59dcc6?auto=format&fit=crop&w=1000&q=80',
      category: 'AI/ML',
      technologies: ['Python', 'OpenCV', 'dlib', 'Flask', 'MongoDB', 'React'],
      features: ['Multi-angle Face Registration', 'Real-time Identity Verification', 'Liveness Detection', 'Attendance Analytics Dashboard', 'Exportable Reports'],
      results: 'Achieved 98% accuracy in attendance tracking with anti-spoofing protection',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-09-10',
      updatedAt: '2023-09-10'
    },
    {
      id: '5',
      title: 'EasyGO Smart Public Transport Monitoring System',
      description: 'Developed an IoT-based smart transport monitoring platform capable of tracking buses and monitoring passenger occupancy levels in real time. IoT devices installed on buses collect location and sensor data transmitted to a web dashboard.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
      category: 'IoT',
      technologies: ['ESP32', 'IoT Sensors', 'Python', 'Web Dashboard', 'MQTT'],
      features: ['Real-time Bus Tracking', 'Passenger Occupancy Monitoring', 'ETA Prediction', 'Admin Dashboard', 'Sensor Data Transmission'],
      results: 'Successfully deployed for real-time monitoring of public transport routes',
      displayStatus: 'Deployed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-11-12',
      updatedAt: '2023-11-12'
    },
    {
      id: '6',
      title: 'Autonomous River Cleaning Robot',
      description: 'Designed and developed a robotic system capable of detecting and collecting floating waste in river environments. The robot navigates autonomously using onboard sensors and performs waste collection using a mechanical cleaning mechanism.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65b?auto=format&fit=crop&w=1000&q=80',
      category: 'Robotics',
      technologies: ['Arduino', 'Sensors', 'Embedded Systems', 'Robotics'],
      features: ['Autonomous Navigation', 'Waste Detection', 'Mechanical Collection', 'Environmental Monitoring'],
      results: 'Effective automated solution for river pollution control',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-11-01',
      updatedAt: '2023-11-01'
    },
    {
      id: '7',
      title: 'Autonomous Indoor Vacuum Cleaning Robot',
      description: 'Developed a low-cost robotic vacuum cleaner prototype capable of navigating indoor environments while collecting dust and debris. Uses ultrasonic and infrared sensors for obstacle detection with a differential drive mechanism.',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?auto=format&fit=crop&w=1000&q=80',
      category: 'Robotics',
      technologies: ['Arduino', 'Embedded C', 'Ultrasonic Sensors', 'IR Sensors', 'DC Motors', 'L298N Motor Driver'],
      features: ['Autonomous Navigation', 'Obstacle Detection & Avoidance', 'Systematic Coverage', 'Differential Drive Mechanism'],
      results: 'Achieved 90% cleaning coverage efficiency with autonomous operation',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '8',
      title: 'Smart Home Automation System',
      description: 'Built an IoT-based smart home system capable of automatically controlling lighting conditions using environmental sensors and machine learning models. Uses ESP32-S3 with an edge ML model trained using Random Forest.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80',
      category: 'IoT',
      technologies: ['ESP32-S3', 'Python', 'scikit-learn', 'Edge Machine Learning', 'Sensors'],
      features: ['Edge ML Prediction', 'Automatic Lighting Control', 'Sensor Data Collection', 'Random Forest Model', 'micromlgen Deployment'],
      results: 'Successfully deployed ML model on microcontroller for real-time predictions',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-09-15',
      updatedAt: '2023-09-15'
    },
    {
      id: '9',
      title: 'IoT Weather Monitoring System',
      description: 'Developed an IoT weather monitoring system capable of collecting environmental data such as temperature, humidity, and atmospheric conditions. Transmits sensor data to a cloud-based dashboard for monitoring and analysis.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1000&q=80',
      category: 'IoT',
      technologies: ['ESP32', 'IoT Sensors', 'Cloud Dashboard'],
      features: ['Temperature Monitoring', 'Humidity Tracking', 'Atmospheric Data', 'Cloud Dashboard', 'Real-time Analysis'],
      results: 'Continuous environmental monitoring with cloud-based analytics',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-07-10',
      updatedAt: '2023-07-10'
    },
    {
      id: '10',
      title: 'Accident Detection and Emergency Alert System',
      description: 'Developed a real-time accident detection system designed for vehicles. Detects abnormal motion or collision events using sensors and automatically sends emergency alerts with location data.',
      image: 'https://images.unsplash.com/photo-1558618666-fdb6fa6b0c9d?auto=format&fit=crop&w=1000&q=80',
      category: 'IoT',
      technologies: ['IoT Sensors', 'Embedded Systems', 'GPS'],
      features: ['Collision Detection', 'Emergency Alerts', 'GPS Location Tracking', 'Real-time Notification'],
      results: 'Improved emergency response time through immediate accident notifications',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-07-10',
      updatedAt: '2023-07-10'
    },
    {
      id: '11',
      title: 'Industrial Machine Maintenance System – Promco 2.0',
      description: 'Developed a web-based system for monitoring machine faults and maintenance activities in an industrial manufacturing environment. Provides detailed insights into machine performance and fault history.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1000&q=80',
      category: 'Web',
      technologies: ['Web Application Development', 'Databases'],
      features: ['Machine Fault Reporting', 'Maintenance Tracking', 'Performance Insights', 'Fault History Analytics'],
      results: 'Streamlined maintenance workflows in industrial manufacturing',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-07-15',
      updatedAt: '2023-07-15'
    },
    {
      id: '12',
      title: 'Employee Management System',
      description: 'Developed a digital platform for managing employee information, payroll details, attendance tracking, and reporting functions within an organization.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
      category: 'Web',
      technologies: ['Web Development', 'Databases'],
      features: ['Employee Information Management', 'Payroll Processing', 'Attendance Tracking', 'Report Generation'],
      results: 'Automated HR processes reducing administrative overhead',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-04-15',
      updatedAt: '2023-04-15'
    },
    {
      id: '13',
      title: 'Inventory Management System',
      description: 'Built a software system for managing inventory levels, product records, and stock transactions. Enables efficient tracking of inventory movements and supply chain operations.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
      category: 'Web',
      technologies: ['Software Development', 'Databases'],
      features: ['Inventory Tracking', 'Product Records', 'Stock Transactions', 'Supply Chain Management'],
      results: 'Improved inventory accuracy and reduced manual tracking work',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-05-10',
      updatedAt: '2023-05-10'
    },
    {
      id: '14',
      title: 'FinanceFlow – Personal Financial Tracking System',
      description: 'Developed a progressive web application designed to help users monitor their income, expenses, and financial habits. Provides charts and analytics for improved financial management.',
      image: 'https://images.unsplash.com/photo-1579621970563-430f63602022?auto=format&fit=crop&w=1000&q=80',
      category: 'Web',
      technologies: ['Web Development', 'Progressive Web Apps'],
      features: ['Income & Expense Tracking', 'Financial Charts', 'Habit Analytics', 'PWA Support'],
      results: 'Helps users improve financial management through data-driven insights',
      displayStatus: 'Live',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-05-20',
      updatedAt: '2023-05-20'
    },
    {
      id: '15',
      title: 'Android Task Management Application',
      description: 'Developed a feature-rich Android productivity application using Kotlin and Jetpack Compose with task management, priorities, productivity tracking, and local storage using Room database.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
      category: 'Mobile',
      technologies: ['Kotlin', 'Android Studio', 'Jetpack Compose', 'Firebase', 'Room Database'],
      features: ['Task Management', 'Priority Setting', 'Productivity Tracking', 'Cloud Backup', 'Achievement System'],
      results: 'Full-featured productivity app with gamification elements',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-08-20',
      updatedAt: '2023-08-20'
    },
    {
      id: '16',
      title: 'AI University Assistant Chatbot',
      description: 'Developed an AI-powered chatbot capable of answering university-related queries and assisting students with academic information using natural language processing.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?auto=format&fit=crop&w=1000&q=80',
      category: 'AI/ML',
      technologies: ['Python', 'RASA', 'NLP', 'MongoDB'],
      features: ['Natural Language Processing', 'Student Q&A', 'Academic Information Retrieval', '24/7 Availability'],
      results: 'Successfully handles student queries with high accuracy',
      displayStatus: 'Deployed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-08-20',
      updatedAt: '2023-08-20'
    },
    {
      id: '17',
      title: 'Multi-Agent Bookstore Simulation System',
      description: 'Developed a multi-agent system simulation representing interactions between buyers, sellers, and recommendation agents in an online bookstore environment demonstrating autonomous decision-making.',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=80',
      category: 'AI/ML',
      technologies: ['Python', 'Multi-Agent Systems'],
      features: ['Buyer Agents', 'Seller Agents', 'Recommendation Agents', 'Autonomous Decision-Making', 'Agent Collaboration'],
      results: 'Demonstrated effective multi-agent collaboration in bookstore simulation',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-10-05',
      updatedAt: '2023-10-05'
    },
    {
      id: '18',
      title: 'Smart Plate Washing Machine',
      description: 'Designed and developed a prototype automated plate washing machine capable of performing cleaning operations using controlled mechanical systems and sensors.',
      image: 'https://images.unsplash.com/photo-1584568694394-5f0f6e53b51e?auto=format&fit=crop&w=1000&q=80',
      category: 'Robotics',
      technologies: ['Embedded Systems', 'Sensors', 'Automation'],
      features: ['Automated Washing', 'Sensor Integration', 'Mechanical Control', 'Water Optimization'],
      results: 'Successfully automated plate washing operations',
      displayStatus: 'Completed',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2022-10-20',
      updatedAt: '2022-10-20'
    },
    {
      id: '19',
      title: 'NightPilot – Designated Driver Service Platform',
      description: 'Developed a responsive web platform for a designated driver service targeting nightlife customers who need safe transportation. Provides easy contact options, pricing information, and service coverage.',
      image: 'https://images.unsplash.com/photo-1514994667917-ca4ee5265a84?auto=format&fit=crop&w=1000&q=80',
      category: 'Web',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Web Design'],
      features: ['Mobile-first Design', 'Contact Options', 'Pricing Information', 'Service Coverage Map'],
      results: 'Modern responsive platform for designated driver service',
      displayStatus: 'Live',
      github: 'https://github.com/Ravindu-VS',
      featured: true,
      status: 'completed',
      createdAt: '2023-09-20',
      updatedAt: '2023-09-20'
    }
  ],
  skills: [],
  certifications: [],
  blogPosts: [],
  testimonials: [],
  settings: {
    siteName: 'Vinusha Rathnayaka',
    tagline: 'Full Stack Developer & Hardware Engineer',
    email: 'ravindu.vinusha@gmail.com',
    phone: '+94 77 123 4567',
    location: 'Colombo, Sri Lanka',
    socials: {
      github: 'https://github.com/Ravindu-VS',
      linkedin: 'https://www.linkedin.com/in/vinusha-rathnayaka-ab9699375',
      twitter: 'https://twitter.com/ravinduvinusha'
    },
    profile: {
      fullName: 'Vinusha Rathnayaka',
      displayName: 'Vinusha',
      profilePicture: '/images/profile.png',
      coverImage: '/images/cover.jpg',
      bio: 'A passionate Computer Engineering student and full-stack developer specializing in IoT Systems, AI/ML, Robotics, and Web Development. I love building innovative solutions that bridge the gap between hardware and software.',
      shortBio: 'Computer Engineer | IoT & Robotics Specialist | AI/ML Enthusiast',
      title: 'Computer Engineering Student & Developer',
      specializations: ['IoT Systems', 'AI/ML', 'Robotics', 'Full Stack Development', 'Embedded Systems'],
      yearsOfExperience: 4,
      availableForHire: true,
      currentCompany: 'Freelance',
      currentRole: 'Full Stack Developer'
    }
  }
};

const STORAGE_KEY = 'portfolio_data';
const FIRESTORE_DOC = 'portfolio/data';

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(() => {
    // Load from localStorage first for fast initial render
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Validate that we have projects, if not use default
        if (parsed.projects && parsed.projects.length > 0) {
          console.log('✓ Loaded from localStorage with', parsed.projects.length, 'projects');
          return parsed;
        } else {
          console.log('⚠️  Stale localStorage data (no projects), using default');
          return defaultData;
        }
      } catch (e) {
        console.log('⚠️  Failed to parse localStorage, using default');
        return defaultData;
      }
    }
    console.log('✓ No localStorage data, using default with', defaultData.projects.length, 'projects');
    return defaultData;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  
  // Track if we have pending local changes to prevent Firestore overwrites
  const pendingChangesRef = useRef(false);
  const lastUpdateTimeRef = useRef(0);

  // Subscribe to Firestore real-time updates
  useEffect(() => {
    const docRef = doc(db, 'portfolio', 'data');
    
    // Listen for real-time updates from Firestore
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      // Don't overwrite if we have pending local changes (within last 2 seconds)
      const timeSinceLastUpdate = Date.now() - lastUpdateTimeRef.current;
      if (pendingChangesRef.current || timeSinceLastUpdate < 2000) {
        console.debug('Skipping Firestore update - pending local changes');
        setIsLoading(false);
        return;
      }
      
      if (snapshot.exists()) {
        const firestoreData = snapshot.data() as PortfolioData;
        // Merge with default data to ensure required fields are present
        const mergedData: PortfolioData = {
          ...defaultData,
          ...firestoreData,
          // Preserve projects from Firestore if they exist, otherwise use default
          projects: (firestoreData.projects && firestoreData.projects.length > 0) 
            ? firestoreData.projects 
            : defaultData.projects,
          // Preserve other arrays if they exist in Firestore
          skills: firestoreData.skills || defaultData.skills,
          certifications: firestoreData.certifications || defaultData.certifications,
          blogPosts: firestoreData.blogPosts || defaultData.blogPosts,
          testimonials: firestoreData.testimonials || defaultData.testimonials,
          settings: { ...defaultData.settings, ...firestoreData.settings }
        };
        console.log('✓ Firestore data loaded. Projects count:', mergedData.projects.length);
        setData(mergedData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
        setSyncError(null);
      } else {
        // Document doesn't exist - initialize with default data
        console.log('✓ Initializing Firestore with default data. Projects:', defaultData.projects.length);
        setData(defaultData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
        // Schedule Firebase write to initialize the document
        setTimeout(async () => {
          try {
            await setDoc(docRef, defaultData);
            console.log('✓ Firestore initialized with default data');
          } catch (error) {
            console.error('Failed to initialize Firestore:', error);
          }
        }, 500);
      }
      setIsLoading(false);
    }, (error) => {
      console.error('Firestore sync error:', error);
      setSyncError('Failed to connect to cloud. Local changes will be saved.');
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync data to Firestore when it changes (debounced)
  useEffect(() => {
    if (isLoading) return; // Don't sync on initial load
    
    // Mark that we have pending changes
    pendingChangesRef.current = true;
    lastUpdateTimeRef.current = Date.now();
    
    // Always save to localStorage immediately
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    const syncToFirestore = async () => {
      setIsSyncing(true);
      try {
        const docRef = doc(db, 'portfolio', 'data');
        await setDoc(docRef, data);
        setSyncError(null);
      } catch (error) {
        console.error('Failed to sync to Firestore:', error);
        setSyncError('Cloud sync failed. Changes saved locally.');
      }
      setIsSyncing(false);
      // Clear pending flag after successful sync
      pendingChangesRef.current = false;
    };

    // Debounce sync to avoid too many writes
    const timeoutId = setTimeout(syncToFirestore, 500);
    return () => clearTimeout(timeoutId);
  }, [data, isLoading]);

  // Generate unique ID
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Project operations
  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...project,
      id: generateId(),
      createdAt: now,
      updatedAt: now
    };
    setData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      )
    }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Skill operations
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = { ...skill, id: generateId() };
    setData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => (s.id === id ? { ...s, ...updates } : s))
    }));
  };

  const deleteSkill = (id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Certification operations
  const addCertification = (cert: Omit<Certification, 'id'>) => {
    const newCert: Certification = { ...cert, id: generateId() };
    setData(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => (c.id === id ? { ...c, ...updates } : c))
    }));
  };

  const deleteCertification = (id: string) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  // Blog post operations
  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = { ...post, id: generateId() };
    setData(prev => ({ ...prev, blogPosts: [...prev.blogPosts, newPost] }));
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.map(p => (p.id === id ? { ...p, ...updates } : p))
    }));
  };

  const deleteBlogPost = (id: string) => {
    setData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.filter(p => p.id !== id)
    }));
  };

  // Testimonial operations
  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = { ...testimonial, id: generateId() };
    setData(prev => ({ ...prev, testimonials: [...prev.testimonials, newTestimonial] }));
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => (t.id === id ? { ...t, ...updates } : t))
    }));
  };

  const deleteTestimonial = (id: string) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  // Settings operations
  const updateSettings = (updates: Partial<SiteSettings>) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...updates }
    }));
  };

  // Data export/import
  const exportData = () => JSON.stringify(data, null, 2);

  const importData = (jsonData: string): boolean => {
    try {
      const imported = JSON.parse(jsonData);
      setData(imported);
      return true;
    } catch {
      return false;
    }
  };

  const resetData = () => setData(defaultData);

  return (
    <DataContext.Provider
      value={{
        data,
        isLoading,
        isSyncing,
        syncError,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addCertification,
        updateCertification,
        deleteCertification,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateSettings,
        exportData,
        importData,
        resetData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('usePortfolioData must be used within a DataProvider');
  }
  return context;
}
