// Shared Three.js / R3F helpers

import * as THREE from 'three';

/** Generate a simple "circuit board" canvas texture */
export function makeCircuitTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#050e0a';
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = 'rgba(0,255,136,0.35)';
  ctx.lineWidth = 1;

  // draw a grid of 90° line segments
  const step = size / 12;
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 12; col++) {
      const x = col * step + step / 2;
      const y = row * step + step / 2;
      ctx.beginPath();
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];
      const chosen = dirs[Math.floor(Math.random() * dirs.length)];
      ctx.moveTo(x, y);
      ctx.lineTo(x + chosen[0] * step * 0.8, y + chosen[1] * step * 0.8);
      ctx.stroke();

      // junction dot
      if (Math.random() > 0.6) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,255,136,0.5)';
        ctx.fill();
      }
    }
  }

  return new THREE.CanvasTexture(canvas);
}

/** Orbital position for the i-th of n nodes */
export function orbitalPosition(
  i: number,
  n: number,
  radius: number,
  tilt = 0.4
): [number, number, number] {
  const angle = (i / n) * Math.PI * 2;
  return [
    Math.cos(angle) * radius,
    Math.sin(angle * tilt) * radius * 0.4,
    Math.sin(angle) * radius,
  ];
}
