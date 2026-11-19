import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function PalaceDomeModel() {
  const meshGroup = useRef();

  useFrame((state) => {
    if (!meshGroup.current) return;
    const t = state.clock.getElapsedTime();
    // Continuous majestic slow rotation
    meshGroup.current.rotation.y = t * 0.45;
    meshGroup.current.position.y = Math.sin(t * 1.5) * 0.12;
  });

  return (
    <group ref={meshGroup} position={[0, -0.2, 0]}>
      {/* ── Outer Location Pin / Chhatri Base Ring ── */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[1.5, 1.7, 0.25, 32]} />
        <meshStandardMaterial
          color="#38060F"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Gold Ring Trim on Base */}
      <mesh position={[0, -1.05, 0]}>
        <ringGeometry args={[1.3, 1.55, 32]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* 4 Rajasthani Palace Pillars */}
      {[-0.8, 0.8].map((x) =>
        [-0.8, 0.8].map((z) => (
          <group key={`${x}-${z}`} position={[x, -0.4, z]}>
            {/* Pillar column */}
            <mesh>
              <cylinderGeometry args={[0.08, 0.1, 1.3, 16]} />
              <meshStandardMaterial
                color="#ECCB5C"
                metalness={0.85}
                roughness={0.2}
              />
            </mesh>
            {/* Pillar Capital */}
            <mesh position={[0, 0.65, 0]}>
              <boxGeometry args={[0.22, 0.08, 0.22]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        ))
      )}

      {/* ── Rajasthani Jharokha Arch / Center Lotus ── */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.15, 32]} />
        <meshStandardMaterial
          color="#4A0A16"
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* ── Palace Dome (Chhatri / Gumbad) ── */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[1.1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.25}
          metalness={0.88}
        />
      </mesh>

      {/* Gold Kalash / Finial on top of Dome */}
      <group position={[0, 1.95, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.12, 0.3, 16]} />
          <meshStandardMaterial color="#FFF0AA" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FFDF73" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <coneGeometry args={[0.04, 0.25, 16]} />
          <meshStandardMaterial color="#FFF0AA" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Floating Gold Halo Ring */}
      <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.03, 16, 64]} />
        <meshStandardMaterial color="#FFF8E7" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function Venue3D() {
  return (
    <div className="w-full h-64 sm:h-80 md:h-96 relative flex items-center justify-center">
      <Canvas
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.5, 4.5]} fov={45} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={2.0} color="#FFF8E7" />
        <pointLight position={[-4, 2, 2]} intensity={1.5} color="#D4AF37" />
        <pointLight position={[0, -2, 2]} intensity={0.8} color="#9E2A2B" />

        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <PalaceDomeModel />
        </Float>
      </Canvas>
    </div>
  );
}
