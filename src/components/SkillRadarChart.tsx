import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RadarChartProps {
  title: string;
  categories: {
    name: string;
    value: number;
  }[];
  maxValue?: number;
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

const SkillRadarChart: React.FC<RadarChartProps> = ({
  title,
  categories,
  maxValue = 100,
  size = 300,
  primaryColor = '#7bc5ff',
  secondaryColor = '#4eacff',
  activeCategory,
  onSelectCategory
}) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.4;
  const levels = 5;
  
  // Calculate coordinates for each level and category
  const getCoordinates = (percent: number, angle: number) => {
    const r = percent * radius;
    const angleRad = (angle - 90) * (Math.PI / 180);
    const x = centerX + r * Math.cos(angleRad);
    const y = centerY + r * Math.sin(angleRad);
    return { x, y };
  };

  // Create grid levels
  const levelPoints = Array.from({ length: levels }, (_, i) => {
    const levelPercent = (i + 1) / levels;
    const points = categories.map((_, j) => {
      const angle = (360 / categories.length) * j;
      return getCoordinates(levelPercent, angle);
    });
    return points;
  });

  // Create data points
  const dataPoints = categories.map((category, i) => {
    const angle = (360 / categories.length) * i;
    const percent = category.value / maxValue;
    return getCoordinates(percent, angle);
  });

  // Create SVG path for data shape
  const dataPath = dataPoints
    .map((point, i) => `${i === 0 ? 'M' : 'L'}${point.x},${point.y}`)
    .join(' ') + ' Z';
  
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-cyber text-accent mb-4">{title}</h3>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Background circles */}
        {levelPoints.map((points, level) => (
          <polygon
            key={`level-${level}`}
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {categories.map((_, i) => {
          const angle = (360 / categories.length) * i;
          const outerPoint = getCoordinates(1, angle);
          return (
            <line
              key={`axis-${i}`}
              x1={centerX}
              y1={centerY}
              x2={outerPoint.x}
              y2={outerPoint.y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data area */}
        <motion.path
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.8, pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          d={dataPath}
          fill={`url(#radarGradient)`}
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <motion.circle
            key={`datapoint-${i}`}
            cx={point.x}
            cy={point.y}
            r={6}
            initial={{ r: 0 }}
            animate={{ r: activeCategory === categories[i].name ? 8 : 6 }}
            fill={primaryColor}
            stroke={activeCategory === categories[i].name ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer"
            onClick={() => onSelectCategory && onSelectCategory(categories[i].name)}
          />
        ))}

        {/* Category labels */}
        {categories.map((category, i) => {
          const angle = (360 / categories.length) * i;
          const labelPoint = getCoordinates(1.15, angle);
          const isActive = activeCategory === category.name;
          
          return (
            <g key={`label-${i}`} className="cursor-pointer" onClick={() => onSelectCategory && onSelectCategory(category.name)}>
              <motion.text
                x={labelPoint.x}
                y={labelPoint.y}
                fontSize="11"
                fontFamily="monospace"
                textAnchor="middle"
                alignmentBaseline="middle"
                fill={isActive ? primaryColor : "rgba(255,255,255,0.7)"}
                animate={{ fontSize: isActive ? "12" : "11", fontWeight: isActive ? "bold" : "normal" }}
              >
                {category.name}
              </motion.text>
            </g>
          );
        })}

        {/* Gradient definition */}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={`${primaryColor}60`} />
            <stop offset="80%" stopColor={`${secondaryColor}30`} />
            <stop offset="100%" stopColor={`${secondaryColor}10`} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SkillRadarChart;