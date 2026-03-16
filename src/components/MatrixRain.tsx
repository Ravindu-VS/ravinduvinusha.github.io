import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to full window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const matrix = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const matrixArray = matrix.split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    // Randomize initial drop positions
    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.floor(Math.random() * (canvas.height / fontSize));
    }

    const draw = () => {
      // Background with trail effect
      ctx.fillStyle = 'rgba(10, 14, 17, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Lead character (brighter)
        ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 3;
        ctx.fillText(text, x, y);

        // Trail characters (fade out)
        ctx.shadowBlur = 0;
        for (let j = 1; j < 5; j++) {
          const trailY = y - j * fontSize;
          if (trailY > 0) {
            const trailChar = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillStyle = `rgba(0, 255, 136, ${0.3 - j * 0.06})`;
            ctx.fillText(trailChar, x, trailY);
          }
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    window.addEventListener('resize', () => {
      setCanvasSize();
      // Recalculate columns on resize
      const newColumns = Math.floor(canvas.width / fontSize);
      while (drops.length < newColumns) {
        drops.push(Math.floor(Math.random() * (canvas.height / fontSize)));
      }
      drops.length = newColumns;
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        opacity: 0.08,
      }}
    />
  );
}
