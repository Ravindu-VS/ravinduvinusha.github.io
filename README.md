# Ravindu Vinusha - Professional Portfolio

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-00ff88?style=for-the-badge&logo=react)](https://ravinduvinusha.com)
[![Build Status](https://img.shields.io/badge/Build-Passing-00ff88?style=for-the-badge)](https://github.com/ravinduvinusha/portfolio)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-0099ff?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-00ff88?style=for-the-badge)](https://www.w3.org/WAI/WCAG21/quickref/)

> **Innovative Computer Engineer** specializing in Brain-Computer Interfaces, IoT Systems, Cybersecurity, and AI/ML Development. Bridging minds and machines through cutting-edge technology.

## 🚀 Live Portfolio

**Visit:** [https://ravinduvinusha.com](https://ravinduvinusha.com)

## 🎯 Features

### 🎨 **Cyber-Punk Design**
- Unique matrix-inspired aesthetic with neon color scheme
- Smooth animations powered by Framer Motion
- Interactive background effects and particle systems
- Responsive design optimized for all devices

### 🔧 **Technical Excellence**
- **Modern Stack:** React 18 + TypeScript + Vite
- **Performance:** Optimized bundles, lazy loading, and efficient rendering
- **Accessibility:** WCAG 2.1 AA compliance with screen reader support
- **SEO:** Comprehensive meta tags and structured data

### 📱 **User Experience**
- Smooth scrolling navigation with progress indicators
- Interactive project showcases with live demos
- Professional contact forms with validation
- Error boundaries for graceful error handling

### 📊 **Analytics & Monitoring**
- User interaction tracking
- Performance monitoring
- Error logging and reporting
- Conversion funnel analysis

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for lightning-fast development
- **Animations:** Framer Motion for smooth interactions
- **Styling:** Tailwind CSS with custom cyber-punk theme
- **Icons:** Lucide React for consistent iconography

### **Performance & SEO**
- **Bundle Analysis:** Built-in bundle analyzer
- **Image Optimization:** WebP format with fallbacks
- **Code Splitting:** Automatic route-based splitting
- **PWA Ready:** Service worker and manifest included

### **Development Tools**
- **Linting:** ESLint with React and TypeScript rules
- **Type Checking:** Strict TypeScript configuration
- **Error Boundaries:** Comprehensive error handling
- **Hot Reload:** Instant development feedback

## 📈 Portfolio Highlights

### **🧠 Neural Interface Control System**
- **Achievement:** 89% accuracy in motor imagery classification
- **Impact:** Successfully controlled robotic arm with <100ms latency
- **Tech:** OpenBCI, Python, Machine Learning, Real-time Signal Processing

### **🔒 IoT Security Assessment Platform**
- **Achievement:** Identified vulnerabilities in 78% of tested devices
- **Impact:** Featured in security conference, prevented multiple breaches
- **Tech:** Kali Linux, Python, Network Security, Penetration Testing

### **🤖 Autonomous Drone Navigation**
- **Achievement:** 95% successful navigation rate, 0 collisions in 50+ flights
- **Impact:** Competition winner, research publication pending
- **Tech:** ROS, Computer Vision, SLAM, Autonomous Systems

### **📱 Mobile Applications**
- **Achievement:** 5000+ active users, 4.6 App Store rating
- **Impact:** Featured by Apple, positive health outcomes for users
- **Tech:** React Native, AI/ML, Firebase, Health APIs

## 🏗️ Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── assets/            # CV, images, and documents
│   └── favicon.ico        # Site favicon
├── src/
│   ├── components/        # React components
│   │   ├── About.tsx      # About section
│   │   ├── Blog.tsx       # Technical blog
│   │   ├── Contact.tsx    # Contact form
│   │   ├── ErrorBoundary.tsx # Error handling
│   │   ├── Hero.tsx       # Landing section
│   │   ├── Navigation.tsx # Site navigation
│   │   ├── Projects.tsx   # Project showcase
│   │   └── Skills.tsx     # Skills visualization
│   ├── styles/           # CSS and styling
│   │   └── accessibility.css # A11y enhancements
│   ├── utils/            # Utility functions
│   │   └── analytics.ts  # Analytics tracking
│   ├── App.tsx           # Main application
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite build configuration
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/ravinduvinusha/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Available Scripts**

```bash
# Development
npm run dev              # Start development server
npm run type-check       # Run TypeScript type checking

# Production
npm run build           # Build for production
npm run preview         # Preview production build
npm run build:analyze   # Build with bundle analysis

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues automatically
```

## 🎨 Customization

### **Color Scheme**
The portfolio uses a custom cyber-punk color palette:

```css
/* Primary Colors */
--primary: #00ff88      /* Neon Green */
--secondary: #0099ff    /* Electric Blue */
--accent: #ffffff       /* Pure White */

/* Background Colors */
--cyber-dark: #121212   /* Deep Black */
--cyber-darker: #0a0a0a /* Darker Black */
--cyber-gray: #1a1a1a   /* Dark Gray */
--cyber-light: #2a2a2a  /* Light Gray */
```

### **Typography**
- **Headings:** Orbitron (Cyber-futuristic)
- **Body Text:** Inter (Modern sans-serif)
- **Code/Terminal:** JetBrains Mono (Monospace)

### **Animations**
All animations respect `prefers-reduced-motion` for accessibility:

```css
@media (prefers-reduced-motion: reduce) {
  /* Reduced motion styles */
}
```

## 📊 Performance Metrics

### **Lighthouse Scores**
- **Performance:** 98/100
- **Accessibility:** 100/100
- **Best Practices:** 100/100
- **SEO:** 100/100

### **Core Web Vitals**
- **FCP:** < 1.5s (First Contentful Paint)
- **LCP:** < 2.5s (Largest Contentful Paint)
- **CLS:** < 0.1 (Cumulative Layout Shift)
- **FID:** < 100ms (First Input Delay)

## ♿ Accessibility Features

### **WCAG 2.1 AA Compliance**
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ High contrast mode support
- ✅ Focus management
- ✅ Alternative text for images
- ✅ Semantic HTML structure

### **Inclusive Design**
- Color-blind friendly palette
- Scalable font sizes
- Touch-friendly interactive elements
- Reduced motion options

## 🔧 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set custom domain
vercel domains add ravinduvinusha.com
```

### **Netlify**

```bash
# Build the project
npm run build

# Deploy dist/ folder to Netlify
# Configure redirects for SPA routing
```

### **GitHub Pages**

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json
"deploy": "gh-pages -d dist"

# Deploy
npm run build && npm run deploy
```

## 📈 Analytics Setup

### **Google Analytics 4**

1. Create a GA4 property
2. Add tracking ID to environment variables
3. Update analytics utility functions

```javascript
// In analytics.ts
const GA_TRACKING_ID = 'G-XXXXXXXXXX';
```

### **Performance Monitoring**

The portfolio includes built-in performance tracking:

- Page load times
- User interactions
- Error logging
- Conversion funnel analysis

## 🤝 Contributing

### **Development Guidelines**

1. **Code Style:** Follow existing patterns and ESLint rules
2. **Components:** Use TypeScript interfaces for props
3. **Styling:** Prefer Tailwind utilities over custom CSS
4. **Accessibility:** Test with screen readers and keyboard navigation
5. **Performance:** Optimize images and lazy load components

### **Pull Request Process**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Ravindu Vinusha**
- **Website:** [ravinduvinusha.com](https://ravinduvinusha.com)
- **Email:** ravindu.vinusha.dev@gmail.com
- **LinkedIn:** [linkedin.com/in/ravinduvinusha](https://linkedin.com/in/ravinduvinusha)
- **GitHub:** [github.com/ravinduvinusha](https://github.com/ravinduvinusha)

---

<div align="center">

**Built with ❤️ in Sri Lanka**

*Crafting intelligent systems • Securing digital frontiers • Bridging minds and machines*

[![Portfolio](https://img.shields.io/badge/Portfolio-ravinduvinusha.com-00ff88?style=for-the-badge&logo=react)](https://ravinduvinusha.com)

</div>
