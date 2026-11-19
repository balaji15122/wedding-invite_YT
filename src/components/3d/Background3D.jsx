import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { RosePetals, GoldenParticles, FloatingDiya } from './PetalsAndSparks';

function ParallaxRig() {
  const cameraGroupRef = useRef();

  useFrame((state) => {
    if (!cameraGroupRef.current) return;
    // Mouse / touch coordinate parallax
    const targetX = (state.pointer.x * 0.8);
    const targetY = (state.pointer.y * 0.5);

    cameraGroupRef.current.position.x = THREE.MathUtils.lerp(
      cameraGroupRef.current.position.x,
      targetX,
      0.04
    );
    cameraGroupRef.current.position.y = THREE.MathUtils.lerp(
      cameraGroupRef.current.position.y,
      targetY,
      0.04
    );
  });

  return (
    <group ref={cameraGroupRef}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
    </group>
  );
}

export default function Background3D() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ParallaxRig />
        
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFE89E" />
        <pointLight position={[-6, 4, 2]} intensity={1.2} color="#D4AF37" />

        <Suspense fallback={null}>
          {/* Falling 3D Rose Petals */}
          <RosePetals count={40} />

          {/* Golden Stardust Particles */}
          <GoldenParticles count={130} />

          {/* Strategic floating glowing diyas in depth */}
          <FloatingDiya position={[-5.5, -2, -2]} scale={0.7} delay={0.2} />
          <FloatingDiya position={[5.8, -1.5, -3]} scale={0.65} delay={1.4} />
          <FloatingDiya position={[-4.2, 3.5, -4]} scale={0.5} delay={2.1} />
          <FloatingDiya position={[4.5, 3.8, -3.5]} scale={0.55} delay={0.8} />
        </Suspense>
      </Canvas>
    </div>
  );
}
