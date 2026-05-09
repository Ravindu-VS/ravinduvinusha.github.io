import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ExternalLink, Github, Linkedin } from 'lucide-react';

// Tech → hue mapping for DNA bar
const TECH_HUES: Record<string, number> = {
  Python: 200, JavaScript: 50, TypeScript: 220, C: 160, 'C++': 170,
  React: 195, 'Node.js': 120, TensorFlow: 25, PyTorch: 20, Arduino: 190,
  ESP32: 210, ROS: 100, OpenCV: 155, MQTT: 270, LoRa: 290,
};

function techHue(tech: string): number {
  return TECH_HUES[tech] ?? (tech.charCodeAt(0) * 37 + tech.charCodeAt(tech.length - 1) * 13) % 360;
}

// Status badge
type StatusKind = 'live' | 'ongoing' | 'completed' | string;

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  let label = status;
  let color = '#0099ff';
  let glow = '0 0 6px #0099ff55';

  if (s.includes('live')) {
    label = 'LIVE'; color = '#00ff88'; glow = '0 0 8px #00ff8866';
  } else if (s.includes('progress') || s.includes('ongoing')) {
    label = 'ONGOING'; color = '#ffaa00'; glow = '0 0 6px #ffaa0055';
  } else if (s.includes('complete') || s.includes('done')) {
    label = 'COMPLETED'; color = '#0099ff'; glow = '0 0 6px #0099ff55';
  }

  return (
    <span
      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border tracking-widest"
      style={{ color, borderColor: `${color}66`, background: `${color}11`, boxShadow: glow }}
    >
      [{label}]
    </span>
  );
}

// DNA tech bar
function TechDNABar({ techs }: { techs: string[] }) {
  if (!techs.length) return null;
  const w = 100 / techs.length;
  return (
    <div className="flex w-full h-1.5 rounded-full overflow-hidden mt-3">
      {techs.map((tech) => (
        <div
          key={tech}
          title={tech}
          style={{
            width: `${w}%`,
            background: `hsl(${techHue(tech)}, 80%, 55%)`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

// Domain circuit trace SVG (subtle background)
const DOMAIN_PATHS: Record<string, string> = {
  Robotics: 'M20 60 H60 V20 H100 V60 H140',
  'Robotics/AI': 'M20 60 H60 V20 H100 V60 H140',
  IoT: 'M10 80 H40 V40 H80 M80 40 H120 V80 H150',
  'AI/ML': 'M30 30 L80 80 L130 30 M80 80 L80 130',
  'AI/IoT': 'M30 30 L80 80 L130 30 M80 80 L80 130',
  Security: 'M80 10 L140 40 V100 L80 130 L20 100 V40 Z',
  Web: 'M10 80 Q80 10 150 80 Q80 150 10 80',
  Mobile: 'M60 20 H120 V140 H60 Z M70 130 H110',
};

function DomainTrace({ category }: { category: string }) {
  const d = DOMAIN_PATHS[category];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 160 160"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.06 }}
      fill="none"
      aria-hidden="true"
    >
      <path d={d} stroke="#00ff88" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export interface ProjectCardData {
  title: string;
  desc: string;
  image: string;
  tags: string[];
  category: string;
  features: string[];
  icon: React.ReactNode;
  github?: string;
  demo?: string;
  linkedin?: string;
  status?: string;
}

interface Props {
  project: ProjectCardData;
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function ProjectCard({ project, index, isHovered, onMouseEnter, onMouseLeave }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="group relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.12}
        glareColor="#00ff88"
        tiltMaxAngleX={7}
        tiltMaxAngleY={7}
        perspective={1200}
        tiltReverse={false}
        className="h-full"
      >
        <div className="project-card-3d border-gradient-animated overflow-hidden h-full data-stream gpu-accelerated relative">
          {/* Domain circuit trace (6% opacity BG) */}
          <DomainTrace category={project.category} />

          {/* Holographic shimmer overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 shimmer-card" aria-hidden="true" />

          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 via-cyber-dark/50 to-transparent" />

            {/* Status badge */}
            {project.status && (
              <div className="absolute top-3 right-3 z-20">
                <StatusBadge status={project.status} />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-cyber-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
              <div className="text-center p-6">
                <div className="flex gap-3 justify-center">
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`${project.title} demo`}
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </span>
                    </motion.a>
                  )}
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`${project.title} GitHub`}
                    >
                      <span className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        Code
                      </span>
                    </motion.a>
                  )}
                  {project.linkedin && (
                    <motion.a
                      href={project.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`${project.title} LinkedIn`}
                    >
                      <span className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </span>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card body */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                <span className="text-primary glow-effect">{project.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-accent font-cyber">{project.title}</h3>
            </div>

            <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-primary/20 border border-primary/30 text-primary font-mono matrix-text"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-2 mb-3">
              {project.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2 text-sm text-gray-300 font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0" />
                  {feature}
                </motion.div>
              ))}
            </div>

            {/* Tech DNA bar */}
            <TechDNABar techs={project.tags} />
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}
