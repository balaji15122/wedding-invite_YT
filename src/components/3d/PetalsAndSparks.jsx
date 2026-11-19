import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Instanced Rose Petals & Golden Stardust
 * High performance 60FPS using InstancedMesh
 */
export function RosePetals({ count = 35 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate randomized positions, rotations and speeds for petals
  const petals = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 22,
      y: Math.random() * 20 - 5,
      z: (Math.random() - 0.5) * 12,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      speedY: 0.008 + Math.random() * 0.015,
      speedRotX: (Math.random() - 0.5) * 0.02,
      speedRotZ: (Math.random() - 0.5) * 0.02,
      swayOffset: Math.random() * Math.PI * 2,
      scale: 0.25 + Math.random() * 0.2,
    }));
  }, [count]);

  // Petal curved geometry
  const petalGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.8, 1.2, 4, 4);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      // Curve like a real curved rose petal
      pos.setZ(i, Math.sin((v + 0.6) * 1.5) * 0.2 - (u * u) * 0.25);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    petals.forEach((petal, i) => {
      // Drift down
      petal.y -= petal.speedY;
      // Gentle horizontal wind sway
      const sway = Math.sin(time * 1.2 + petal.swayOffset) * 0.012;
      petal.x += sway;
      petal.rotX += petal.speedRotX;
      petal.rotZ += petal.speedRotZ;

      // Wrap around bounds
      if (petal.y < -10) {
        petal.y = 12;
        petal.x = (Math.random() - 0.5) * 22;
      }

      dummy.position.set(petal.x, petal.y, petal.z);
      dummy.rotation.set(petal.rotX, petal.rotY + time * 0.2, petal.rotZ);
      dummy.scale.set(petal.scale, petal.scale, petal.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, null, count]}
    >
      <meshStandardMaterial
        color="#8B1E2E"
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

/**
 * Golden Sparkles / Stardust Particles
 */
export function GoldenParticles({ count = 120 }) {
  const pointsRef = useRef();

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      sc[i] = Math.random();
    }
    return [pos, sc];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      // Slow upward float
      pos[i * 3 + 1] += 0.005;
      if (pos[i * 3 + 1] > 11) {
        pos[i * 3 + 1] = -11;
      }
      // Micro horizontal pulse
      pos[i * 3] += Math.sin(time + i) * 0.003;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        color="#FBE18D"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * 3D Floating Diya with Warm Golden Flame
 */
export function FloatingDiya({ position = [0, 0, 0], scale = 1, delay = 0 }) {
  const diyaRef = useRef();
  const flameLightRef = useRef();

  useFrame((state) => {
    if (!diyaRef.current) return;
    const t = state.clock.getElapsedTime() + delay;
    // Gentle bobbing and tilt
    diyaRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.15;
    diyaRef.current.rotation.y = t * 0.3;
    diyaRef.current.rotation.z = Math.cos(t * 1.2) * 0.05;

    // Flame flicker
    if (flameLightRef.current) {
      flameLightRef.current.intensity = 1.8 + Math.sin(t * 12) * 0.4;
    }
  });

  return (
    <group ref={diyaRef} position={position} scale={[scale, scale, scale]}>
      {/* Terracotta/Brass Clay Bowl */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.25, 0.35, 24]} />
        <meshStandardMaterial
          color="#B8860B"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Golden Oil Rim */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.05, 24]} />
        <meshStandardMaterial color="#ECCB5C" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Flame Cone */}
      <mesh position={[0, 0.38, 0]}>
        <coneGeometry args={[0.15, 0.45, 16]} />
        <meshBasicMaterial color="#FFF0AA" />
      </mesh>

      {/* Flame Point Light */}
      <pointLight
        ref={flameLightRef}
        color="#FFA500"
        intensity={2.2}
        distance={4.5}
        decay={2}
        position={[0, 0.4, 0]}
      />
    </group>
  );
}
