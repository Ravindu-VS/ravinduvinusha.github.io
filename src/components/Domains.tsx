import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DomainHex, { Domain } from './ui/DomainHex';

// ── Animated SVG backgrounds per domain ─────────────────────────────────────
const CircuitBg = () => (
  <svg viewBox="0 0 160 176" fill="none" className="w-full h-full">
    <path d="M20 88 H60 V40 H100" stroke="#0099ff" strokeWidth="1.5" strokeDasharray="8 4" className="animate-[circuit-drift_20s_linear_infinite]" />
    <path d="M80 130 V100 H130 V60" stroke="#0099ff" strokeWidth="1" strokeDasharray="6 3" className="animate-[circuit-drift_25s_linear_infinite_reverse]" />
    <circle cx="60" cy="88" r="3" fill="#0099ff" />
    <circle cx="100" cy="40" r="3" fill="#0099ff" />
    <circle cx="130" cy="60" r="3" fill="#0099ff" />
  </svg>
);

const NodeGraphBg = () => (
  <svg viewBox="0 0 160 176" fill="none" className="w-full h-full">
    <circle cx="80" cy="88" r="8" stroke="#ff6600" strokeWidth="1.5" />
    <circle cx="40" cy="50" r="5" stroke="#ff6600" strokeWidth="1" />
    <circle cx="120" cy="50" r="5" stroke="#ff6600" strokeWidth="1" />
    <circle cx="40" cy="126" r="5" stroke="#ff6600" strokeWidth="1" />
    <circle cx="120" cy="126" r="5" stroke="#ff6600" strokeWidth="1" />
    <line x1="80" y1="88" x2="40" y2="50" stroke="#ff6600" strokeWidth="0.8" />
    <line x1="80" y1="88" x2="120" y2="50" stroke="#ff6600" strokeWidth="0.8" />
    <line x1="80" y1="88" x2="40" y2="126" stroke="#ff6600" strokeWidth="0.8" />
    <line x1="80" y1="88" x2="120" y2="126" stroke="#ff6600" strokeWidth="0.8" />
  </svg>
);

const RadarBg = () => (
  <svg viewBox="0 0 160 176" fill="none" className="w-full h-full">
    <circle cx="80" cy="88" r="30" stroke="#ff0044" strokeWidth="0.8" />
    <circle cx="80" cy="88" r="50" stroke="#ff0044" strokeWidth="0.6" />
    <circle cx="80" cy="88" r="70" stroke="#ff0044" strokeWidth="0.4" />
    <line x1="80" y1="18" x2="80" y2="158" stroke="#ff0044" strokeWidth="0.5" />
    <line x1="10" y1="88" x2="150" y2="88" stroke="#ff0044" strokeWidth="0.5" />
    <line x1="80" y1="88" x2="130" y2="38"
      stroke="#ff0044" strokeWidth="1.5" strokeLinecap="round"
      style={{ transformOrigin: '80px 88px', animation: 'radar-spin 3s linear infinite' }}
    />
  </svg>
);

const SatelliteBg = () => (
  <svg viewBox="0 0 160 176" fill="none" className="w-full h-full">
    <circle cx="80" cy="88" r="20" stroke="#00ccff" strokeWidth="1" />
    <circle cx="80" cy="88" r="40" stroke="#00ccff" strokeWidth="0.6" strokeDasharray="4 4" />
    <circle cx="80" cy="88" r="60" stroke="#00ccff" strokeWidth="0.4" strokeDasharray="2 6" />
    <circle cx="120" cy="48" r="4" fill="#00ccff" />
    <line x1="80" y1="88" x2="120" y2="48" stroke="#00ccff" strokeWidth="0.8" strokeDasharray="3 3" />
  </svg>
);

const GearBg = () => (
  <svg viewBox="0 0 160 176" fill="none" className="w-full h-full">
    <g style={{ transformOrigin: '80px 88px', animation: 'radar-spin 8s linear infinite' }}>
      <circle cx="80" cy="88" r="28" stroke="#00ff88" strokeWidth="1.5" strokeDasharray="6 4" />
      <circle cx="80" cy="88" r="15" stroke="#00ff88" strokeWidth="1" />
    </g>
    <circle cx="80" cy="88" r="6" fill="#00ff88" opacity="0.5" />
  </svg>
);

const ShutterBg = () => (
  <svg viewBox="0 0 160 176" fill="none" className="w-full h-full">
    {[0, 30, 60, 90, 120, 150].map((angle, i) => (
      <line
        key={i}
        x1="80" y1="88"
        x2={80 + 70 * Math.cos((angle * Math.PI) / 180)}
        y2={88 + 70 * Math.sin((angle * Math.PI) / 180)}
        stroke="#ff00ff"
        strokeWidth="1"
        opacity="0.6"
      />
    ))}
    <circle cx="80" cy="88" r="18" stroke="#ff00ff" strokeWidth="1.2" />
  </svg>
);

// ── Domain definitions ────────────────────────────────────────────────────────
const domains: Domain[] = [
  {
    id: 'robotics',
    label: 'Robotics',
    icon: '🤖',
    color: '#00ff88',
    techs: ['ROS', 'Python', 'C++', 'OpenCV', 'SLAM', 'Arduino'],
    projects: ['Autonomous Rover', 'Line Follower', 'Robotic Arm'],
    bgPattern: <GearBg />,
  },
  {
    id: 'embedded',
    label: 'Embedded',
    icon: '💾',
    color: '#0099ff',
    techs: ['ESP32', 'Arduino', 'RTOS', 'C', 'I2C', 'SPI', 'UART'],
    projects: ['Smart Irrigation', 'ESP32 Dashboard', 'PCB Designs'],
    bgPattern: <CircuitBg />,
  },
  {
    id: 'ai',
    label: 'AI / ML',
    icon: '🧠',
    color: '#ff6600',
    techs: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Python', 'ONNX'],
    projects: ['BCI Classifier', 'Vision Pipeline', 'Edge ML'],
    bgPattern: <NodeGraphBg />,
  },
  {
    id: 'hacking',
    label: 'Security',
    icon: '🛡️',
    color: '#ff0044',
    techs: ['Kali Linux', 'Wireshark', 'Metasploit', 'Nmap', 'Python'],
    projects: ['Network Scanner', 'Packet Analyzer', 'WiFi Auditor'],
    bgPattern: <RadarBg />,
  },
  {
    id: 'iot',
    label: 'IoT',
    icon: '📡',
    color: '#00ccff',
    techs: ['MQTT', 'LoRa', 'Zigbee', 'Node-RED', 'Firebase', 'REST'],
    projects: ['Smart Irrigation', 'Home Automation', 'Weather Station'],
    bgPattern: <SatelliteBg />,
  },
  {
    id: 'vision',
    label: 'Vision',
    icon: '👁️',
    color: '#ff00ff',
    techs: ['OpenCV', 'YOLO', 'MediaPipe', 'Python', 'TensorFlow Lite'],
    projects: ['Object Detector', 'Face Tracker', 'Lane Detection'],
    bgPattern: <ShutterBg />,
  },
];

export default function Domains() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = domains.find((d) => d.id === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const closeModal = () => setSelectedId(null);

  return (
    <section id="domains" className="py-20 relative overflow-hidden" aria-label="Domain expertise">
      {/* subtle bg tint */}
      <div className="absolute inset-0 bg-cyber-darker/60 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black font-cyber mb-4">
            <span className="neon-text">&gt; INIT DOMAINS</span>
            <span className="inline-block w-1 h-10 ml-2 bg-primary animate-blink align-middle" />
          </h2>
          <p className="text-gray-400 font-mono text-sm md:text-base">
            Click a domain to inspect tech stack &amp; linked projects
          </p>
        </motion.div>

        {/* Honeycomb grid — 3 + 2 + 1 layout on desktop, 2-col on mobile */}
        <div className="flex flex-col items-center gap-2">
          {/* Row 1: 3 */}
          <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
            {domains.slice(0, 3).map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <DomainHex
                  domain={d}
                  isSelected={selectedId === d.id}
                  onClick={() => handleSelect(d.id)}
                />
              </motion.div>
            ))}
          </div>
          {/* Row 2: 2 (offset) */}
          <div className="flex gap-2 sm:gap-4 flex-wrap justify-center" style={{ marginTop: '-12px' }}>
            {domains.slice(3, 5).map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 3) * 0.1 }}
              >
                <DomainHex
                  domain={d}
                  isSelected={selectedId === d.id}
                  onClick={() => handleSelect(d.id)}
                />
              </motion.div>
            ))}
          </div>
          {/* Row 3: 1 (center) */}
          <div className="flex justify-center" style={{ marginTop: '-12px' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <DomainHex
                domain={domains[5]}
                isSelected={selectedId === domains[5].id}
                onClick={() => handleSelect(domains[5].id)}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal / bottom sheet */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-cyber-dark/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.label} domain details`}
              className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full md:rounded-2xl bg-cyber-darker border border-primary/30 z-50 p-6 md:p-8 rounded-t-2xl"
              style={{ boxShadow: `0 0 40px ${selected.color}22` }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-accent transition-colors"
                aria-label="Close domain details"
              >
                ✕
              </button>

              {/* Domain header */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-4xl"
                  style={{ filter: `drop-shadow(0 0 8px ${selected.color})` }}
                >
                  {selected.icon}
                </span>
                <div>
                  <h3
                    className="text-2xl font-cyber font-bold"
                    style={{ color: selected.color }}
                  >
                    {selected.label}
                  </h3>
                  <p className="text-gray-400 text-xs font-mono mt-1">
                    {selected.techs.length} technologies · {selected.projects.length} projects
                  </p>
                </div>
              </div>

              {/* Tech chips */}
              <div className="mb-5">
                <p className="text-xs text-gray-500 font-mono mb-2 uppercase tracking-widest">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {selected.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-full border"
                      style={{
                        borderColor: `${selected.color}55`,
                        color: selected.color,
                        background: `${selected.color}11`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Linked projects */}
              <div>
                <p className="text-xs text-gray-500 font-mono mb-2 uppercase tracking-widest">Projects</p>
                <div className="space-y-2">
                  {selected.projects.map((proj) => (
                    <div
                      key={proj}
                      className="flex items-center gap-2 text-sm text-gray-300 font-mono"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: selected.color }}
                      />
                      {proj}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
