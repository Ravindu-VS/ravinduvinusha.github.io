import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

interface SkillNode {
  name: string;
  level: number;
  category: string;
  color: string;
  position: [number, number, number];
}

const CATEGORY_COLORS: Record<string, string> = {
  'Embedded & IoT Systems': '#0099ff',
  'Ethical Hacking & Networking': '#ff0044',
  'Device Repair & Hardware': '#ff6600',
  'Robotics & Automation': '#00ff88',
  'Brain-Computer Interfaces': '#ff00ff',
  'AI/ML & Data Science': '#00ccff',
  'Web & Mobile Dev': '#ffcc00',
  'Programming Languages': '#aaaaff',
};

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function computePositions(skills: { name: string; level: number; category: string }[]): SkillNode[] {
  const byCategory: Record<string, typeof skills> = {};
  skills.forEach((s) => {
    if (!byCategory[s.category]) byCategory[s.category] = [];
    byCategory[s.category].push(s);
  });

  const cats = Object.keys(byCategory);
  const nodes: SkillNode[] = [];
  let seedBase = 1;

  cats.forEach((cat, ci) => {
    const color = CATEGORY_COLORS[cat] ?? '#ffffff';
    const catAngle = (ci / cats.length) * Math.PI * 2;
    const catRadius = 4;
    const cx = Math.cos(catAngle) * catRadius;
    const cy = (seededRandom(seedBase++) - 0.5) * 3;
    const cz = Math.sin(catAngle) * catRadius;

    byCategory[cat].forEach((skill, si) => {
      const spread = 1.5;
      const px = cx + (seededRandom(seedBase++) - 0.5) * spread;
      const py = cy + (seededRandom(seedBase++) - 0.5) * spread;
      const pz = cz + (seededRandom(seedBase++) - 0.5) * spread;
      nodes.push({ ...skill, color, position: [px, py, pz] });
    });
  });

  return nodes;
}

// ── Single skill sphere ──────────────────────────────────────────────────────
function SkillSphere({ node }: { node: SkillNode }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const size = 0.08 + (node.level / 100) * 0.12;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = node.position[1] + Math.sin(clock.getElapsedTime() * 0.5 + node.position[0]) * 0.05;
    }
  });

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 12, 12]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 2 : 0.6}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {hovered && (
        <Html distanceFactor={10} center>
          <div
            style={{
              background: 'rgba(10,14,17,0.95)',
              border: `1px solid ${node.color}`,
              borderRadius: '6px',
              padding: '6px 10px',
              minWidth: '110px',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{ color: node.color, fontSize: '10px', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
              {node.name}
            </div>
            <div style={{ color: '#ccc', fontSize: '9px', fontFamily: 'JetBrains Mono', marginTop: '2px' }}>
              {node.level}%
            </div>
          </div>
        </Html>
      )}

      {/* always-visible tiny label */}
      <Html distanceFactor={14} center style={{ pointerEvents: 'none' }}>
        <div
          style={{
            color: node.color,
            fontSize: '7px',
            fontFamily: 'JetBrains Mono',
            whiteSpace: 'nowrap',
            marginTop: `${(size * 100 + 10)}px`,
            opacity: 0.7,
          }}
        >
          {node.name.length > 16 ? node.name.slice(0, 14) + '…' : node.name}
        </div>
      </Html>
    </group>
  );
}

// ── Constellation lines (within same category) ───────────────────────────────
function ConstellationLines({ nodes }: { nodes: SkillNode[] }) {
  const lineSegments = useMemo(() => {
    const segs: [THREE.Vector3, THREE.Vector3][] = [];
    const byCategory: Record<string, SkillNode[]> = {};
    nodes.forEach((n) => {
      if (!byCategory[n.category]) byCategory[n.category] = [];
      byCategory[n.category].push(n);
    });

    Object.values(byCategory).forEach((group) => {
      for (let i = 0; i < group.length - 1; i++) {
        segs.push([
          new THREE.Vector3(...group[i].position),
          new THREE.Vector3(...group[i + 1].position),
        ]);
      }
    });
    return segs;
  }, [nodes]);

  return (
    <>
      {lineSegments.map((seg, i) => {
        const points = [seg[0], seg[1]];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <lineSegments key={i} geometry={geo}>
            <lineBasicMaterial color="#ffffff" opacity={0.06} transparent />
          </lineSegments>
        );
      })}
    </>
  );
}

// ── Scene setup ───────────────────────────────────────────────────────────────
function ConstellationScene({ skills }: { skills: { name: string; level: number; category: string }[] }) {
  const nodes = useMemo(() => computePositions(skills), [skills]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00ff88" />

      <ConstellationLines nodes={nodes} />
      {nodes.map((node) => (
        <SkillSphere key={`${node.category}-${node.name}`} node={node} />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={18}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
interface SkillConstellationProps {
  skills: { name: string; level: number; category: string }[];
}

export default function SkillConstellation({ skills }: SkillConstellationProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 2, 12], fov: 60 }}
      style={{ background: 'transparent' }}
    >
      <ConstellationScene skills={skills} />
    </Canvas>
  );
}
