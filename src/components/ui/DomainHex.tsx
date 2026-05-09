import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Domain {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  techs: string[];
  projects: string[];
  bgPattern: React.ReactNode;
}

interface DomainHexProps {
  domain: Domain;
  isSelected: boolean;
  onClick: () => void;
}

export default function DomainHex({ domain, isSelected, onClick }: DomainHexProps) {
  return (
    <motion.button
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      aria-label={`${domain.label} domain — click to expand`}
      aria-expanded={isSelected}
      className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      whileHover={{ scale: 1.06, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Hexagon clip */}
      <div
        className="relative w-40 h-44 sm:w-44 sm:h-48 overflow-hidden flex items-center justify-center"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: `linear-gradient(135deg, rgba(10,14,17,0.95) 0%, rgba(10,14,17,0.8) 100%)`,
          border: `1px solid ${domain.color}44`,
        }}
      >
        {/* animated SVG background pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {domain.bgPattern}
        </div>

        {/* hover reveal */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            background: `radial-gradient(ellipse at center, ${domain.color}22 0%, transparent 70%)`,
          }}
        />

        {/* Active glow */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              key="glow"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(ellipse at center, ${domain.color}33 0%, transparent 70%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
          <span
            className="text-3xl"
            style={{ filter: `drop-shadow(0 0 6px ${domain.color})` }}
          >
            {domain.icon}
          </span>
          <span
            className="text-xs font-cyber font-bold tracking-wider leading-tight"
            style={{ color: domain.color }}
          >
            {domain.label}
          </span>
        </div>
      </div>

      {/* Hex border ring (SVG overlay) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 176 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="88,4 172,46 172,146 88,188 4,146 4,46"
          stroke={isSelected ? domain.color : `${domain.color}55`}
          strokeWidth={isSelected ? 2 : 1}
          fill="none"
        />
      </svg>
    </motion.button>
  );
}
