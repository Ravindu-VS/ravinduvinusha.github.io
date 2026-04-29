import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface LabEntry {
  date: string;
  title: string;
  hash: string;
  status: 'ACTIVE' | 'ONGOING' | 'ARCHIVED' | 'DONE';
  desc: string;
  github?: string;
  link?: string;
}

const LAB_ENTRIES: LabEntry[] = [
  {
    date: '2025-11',
    title: 'ESP32-S3 Edge ML Experiments',
    hash: 'a3f7c21',
    status: 'ONGOING',
    desc: 'Running TensorFlow Lite micro-models directly on ESP32-S3 for gesture detection without cloud inference.',
    github: 'https://github.com/Ravindu-VS',
  },
  {
    date: '2025-09',
    title: 'Network Scanner Script',
    hash: 'b8d1e04',
    status: 'DONE',
    desc: 'Python-based LAN scanner using raw sockets + ARP. Identifies devices, open ports, and service banners.',
    github: 'https://github.com/Ravindu-VS',
  },
  {
    date: '2025-08',
    title: 'PCB Footprint Library',
    hash: 'c2a9f55',
    status: 'ACTIVE',
    desc: 'KiCad footprint & symbol library for commonly used ESP, STM32, and RP2040 modules.',
    github: 'https://github.com/Ravindu-VS',
  },
  {
    date: '2025-07',
    title: 'BCI Signal Classifier',
    hash: 'd4e3b77',
    status: 'ONGOING',
    desc: 'EEG band-power feature extraction + random-forest classifier trained on OpenBCI Cython datasets.',
    github: 'https://github.com/Ravindu-VS',
  },
  {
    date: '2025-06',
    title: 'LoRa Mesh Relay Node',
    hash: 'e1c8d20',
    status: 'DONE',
    desc: 'Multi-hop LoRa mesh using SX1276 modules. Automatic route discovery with TTL flood-fill algorithm.',
    github: 'https://github.com/Ravindu-VS',
  },
  {
    date: '2025-04',
    title: 'SLAM Mapping on Raspberry Pi',
    hash: 'f5a2b13',
    status: 'ARCHIVED',
    desc: 'GMapping-based 2D SLAM using an RPLidar A1 on a differential-drive robot. ROS Noetic, 640×480 maps.',
  },
];

const STATUS_STYLES: Record<LabEntry['status'], { color: string; glow: string }> = {
  ACTIVE:   { color: '#00ff88', glow: '0 0 8px #00ff8855' },
  ONGOING:  { color: '#ffaa00', glow: '0 0 6px #ffaa0055' },
  DONE:     { color: '#0099ff', glow: '0 0 6px #0099ff55' },
  ARCHIVED: { color: '#555', glow: 'none' },
};

export default function Lab() {
  return (
    <section id="lab" className="py-20 relative overflow-hidden" aria-label="Lab experiments">
      <div className="absolute inset-0 bg-cyber-darker/40 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black font-mono">
            <span className="text-primary">// </span>
            <span className="text-accent">LAB</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm mt-2">
            experiments · scripts · hardware hacks · works-in-progress
          </p>
        </motion.div>

        {/* Commit-log grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LAB_ENTRIES.map((entry, i) => {
            const style = STATUS_STYLES[entry.status];
            return (
              <motion.article
                key={entry.hash}
                role="article"
                aria-label={entry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative group rounded-lg border border-primary/10 bg-cyber-darker p-4 font-mono text-sm hover:border-primary/40 transition-colors duration-300 focus-within:ring-2 focus-within:ring-primary"
                style={{ boxShadow: 'inset 0 0 20px rgba(0,255,136,0.02)' }}
              >
                {/* commit log header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-xs">{entry.date}</span>
                  <div className="flex items-center gap-2">
                    <code
                      className="text-[10px] text-gray-500 bg-cyber-light px-1.5 py-0.5 rounded"
                    >
                      {entry.hash}
                    </code>
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded border tracking-widest"
                      style={{
                        color: style.color,
                        borderColor: `${style.color}44`,
                        background: `${style.color}11`,
                        boxShadow: style.glow,
                      }}
                    >
                      {entry.status}
                    </span>
                  </div>
                </div>

                {/* title */}
                <h3 className="text-accent text-sm font-bold mb-1 group-hover:text-primary transition-colors duration-200">
                  {entry.title}
                </h3>

                {/* description */}
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{entry.desc}</p>

                {/* links */}
                <div className="flex gap-3">
                  {entry.github && (
                    <a
                      href={entry.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${entry.title} GitHub`}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors duration-200"
                      onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLAnchorElement).click(); }}
                    >
                      <Github className="w-3 h-3" />
                      GitHub
                    </a>
                  )}
                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${entry.title} link`}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors duration-200"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
