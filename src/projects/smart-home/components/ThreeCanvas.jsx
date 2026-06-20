import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Line, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCubes({ scrollFraction }) {
  const groupRef = useRef();

  // Create positions for 5 cubes representing "rooms"
  const cubes = useMemo(() => {
    return [
      { pos: [-4, 2, 0], scale: 1.2 },
      { pos: [4, 3, -2], scale: 0.8 },
      { pos: [-3, -3, -4], scale: 1.5 },
      { pos: [3, -2, 2], scale: 1 },
      { pos: [0, 0, -6], scale: 2 },
    ];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 + (scrollFraction * Math.PI);
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <Box key={i} position={cube.pos} scale={[cube.scale, cube.scale, cube.scale]}>
          <MeshWobbleMaterial 
            color="#00d4ff" 
            emissive="#0044ff" 
            emissiveIntensity={0.5} 
            wireframe={true} 
            factor={0.5} 
            speed={2} 
          />
        </Box>
      ))}
      
      {/* Draw connecting lines between the cubes to simulate a network */}
      <Line 
        points={cubes.map(c => new THREE.Vector3(...c.pos))} 
        color="#00ffff" 
        lineWidth={1} 
        dashed={true} 
        dashScale={20} 
        dashSize={2} 
        dashOffset={0} 
        opacity={0.3} 
        transparent 
      />
    </group>
  );
}

export function Background3D({ scrollFraction }) {
  return (
    <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 0%, #001122 0%, #000408 100%)' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0044ff" />
        
        <FloatingCubes scrollFraction={scrollFraction} />
      </Canvas>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,4,8,0.9))', pointerEvents: 'none' }} />
    </div>
  );
}
