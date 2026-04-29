import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Lerp-lagged outer ring
  const springX = useSpring(0, { stiffness: 150, damping: 20 });
  const springY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const addHoverListeners = () => {
      const els = document.querySelectorAll('a, button, [role="button"], input, textarea, .cyber-card, .cyber-button');
      els.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    setTimeout(addHoverListeners, 300);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, [springX, springY]);

  const ringSize = isHovering ? 36 : isClicking ? 20 : 24;
  const ringColor = isHovering ? '#ff0044' : '#0099ff';

  return (
    <>
      {/* Inner dot — 6px neon green, no lag */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: pos.x - 3,
          top: pos.y - 3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#00ff88',
          boxShadow: '0 0 8px #00ff88',
          transition: 'width 0.1s, height 0.1s',
        }}
      />

      {/* Outer ring — lagged spring */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: springX,
          y: springY,
          marginLeft: -(ringSize / 2),
          marginTop: -(ringSize / 2),
          width: ringSize,
          height: ringSize,
          border: `1.5px solid ${ringColor}`,
          borderRadius: '50%',
          boxShadow: `0 0 8px ${ringColor}66`,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s',
        }}
      />
    </>
  );
};

export default CustomCursor;
