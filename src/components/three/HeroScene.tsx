import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { makeCircuitTexture, orbitalPosition } from './SceneUtils';

const DOMAIN_NODES = [  { label: 'Robotics', color: '#00ff88' },
  { label: 'Embedded', color: '#0099ff' },
  { label: 'AI / ML', color: '#ff6600' },
  { label: 'Security', color: '#ff0044' },
  { label: 'IoT', color: '#00ccff' },
  { label: 'Vision', color: '#ff00ff' },
];

// ── Planet mesh ───────────────────────────────────────────────────────────────
function Planet() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useMemo(() => makeCircuitTexture(512), []);

  useFrame((_state, delta) => {
    meshRef.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={meshRef} castShadow>
      <sphereGeometry args={[1.8, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        emissiveMap={texture}
        emissive={new THREE.Color('#00ff88')}
        emissiveIntensity={0.15}
        roughness={0.85}
        metalness={0.3}
      />
    </mesh>
  );
}

// ── Orbiting node ─────────────────────────────────────────────────────────────
function OrbitalNode({
  index,
  total,
  label,
  color,
}: {
  index: number;
  total: number;
  label: string;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const baseAngle = (index / total) * Math.PI * 2;
  const RADIUS = 3.2;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.3 + baseAngle;
    groupRef.current.position.set(
      Math.cos(t) * RADIUS,
      Math.sin(t * 0.4) * 0.8,
      Math.sin(t) * RADIUS
    );
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          roughness={0}
          metalness={0.6}
        />
      </mesh>
      <Html center distanceFactor={8}>
        <div
          style={{
            color,
            fontSize: '9px',
            fontFamily: 'JetBrains Mono, monospace',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            textShadow: `0 0 6px ${color}`,
            marginTop: '14px',
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

// ── Orbit ring ────────────────────────────────────────────────────────────────
function OrbitRing() {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push([Math.cos(a) * 3.2, 0, Math.sin(a) * 3.2]);
    }
    return pts;
  }, []);

  return (
    <Line
      points={points}
      color="#00ff8844"
      lineWidth={0.5}
    />
  );
}

// ── Scene content ─────────────────────────────────────────────────────────────
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00ff88" />
      <pointLight position={[-5, -3, -5]} intensity={0.6} color="#0099ff" />

      <Stars radius={60} depth={30} count={1200} factor={3} fade speed={0.6} />

      <Planet />
      <OrbitRing />

      {DOMAIN_NODES.map((node, i) => (
        <OrbitalNode
          key={node.label}
          index={i}
          total={DOMAIN_NODES.length}
          label={node.label}
          color={node.color}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        enablePan={false}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
      />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={1.2}
        />
      </EffectComposer>
    </>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 2, 8], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <SceneContent />
    </Canvas>
  );
}
