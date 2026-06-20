import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleRings({ scrollFraction }) {
  const ref = useRef();
  
  // Generate random points in a sphere shell
  const positions = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 10 + Math.random() * 2;
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      // Pulse effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05 + (scrollFraction * 0.2);
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ff2a2a" size={0.05} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
    </group>
  );
}

function CoreSphere({ scrollFraction }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      const distort = 0.2 + (scrollFraction * 0.6); // Distorts more as you scroll
      materialRef.current.distort = Math.min(distort, 0.8);
      
      // Move closer/further based on scroll
      meshRef.current.position.z = scrollFraction * 5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[3, 64, 64]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#ff7a00"
        attach="material"
        distort={0.2}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive="#ff2a2a"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

export function Background3D({ scrollFraction }) {
  return (
    <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%, #1a0505 0%, #0a0202 100%)' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ff7a00" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff2a2a" />
        
        <CoreSphere scrollFraction={scrollFraction} />
        <ParticleRings scrollFraction={scrollFraction} />
      </Canvas>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(10,2,2,0.8))', pointerEvents: 'none' }} />
    </div>
  );
}
