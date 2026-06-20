import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNetwork({ scrollFraction }) {
  const pointsRef = useRef();
  
  // Generate a network of nodes
  const { positions, lines } = useMemo(() => {
    const nodeCount = 150;
    const pos = new Float32Array(nodeCount * 3);
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 15;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Connect close nodes
    const linePoints = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3.5) {
          linePoints.push(nodes[i], nodes[j]);
        }
      }
    }
    
    return { positions: pos, lines: linePoints };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05 + (scrollFraction * Math.PI * 0.5);
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={pointsRef}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#00f0ff" size={0.15} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
      {lines.length > 0 && (
        <Line 
          points={lines} 
          color="#ff00aa" 
          lineWidth={0.5} 
          transparent 
          opacity={0.15 + (scrollFraction * 0.2)} 
          blending={THREE.AdditiveBlending}
        />
      )}
    </group>
  );
}

export function Background3D({ scrollFraction }) {
  return (
    <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 80% 20%, #2a0044 0%, #0a001a 100%)' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <fog attach="fog" args={['#0a001a', 10, 25]} />
        <NeuralNetwork scrollFraction={scrollFraction} />
      </Canvas>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(10,0,26,0.9))', pointerEvents: 'none' }} />
    </div>
  );
}
