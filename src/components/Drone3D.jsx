import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function GLTFModel({ url }) {
  const { scene } = useGLTF(url);
  const droneRef = useRef();
  
  // Physics state for hyper-realistic movement
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentVel = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (!droneRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // 1. Target Position Calculation (Grid Mapping Pattern)
    const speed = 0.6;
    const cycle = t * speed;
    
    // X moves side-to-side, restricted to stay over the crop land block
    let targetX = Math.sin(cycle) * 2.5;
    targetX = Math.max(-2, Math.min(2, targetX));
    
    // Z slowly steps forward, kept closer to camera to avoid flying into the sky background
    const targetZ = Math.sin(cycle * 0.2) * 1.5 + 1.0;
    
    const targetPos = new THREE.Vector3(targetX, 0, targetZ);
    
    // Add micro-turbulence (wind buffering)
    targetPos.y += Math.sin(t * 6.2) * 0.04 + Math.sin(t * 15) * 0.015;
    targetPos.x += Math.sin(t * 8.4) * 0.02;
    targetPos.z += Math.cos(t * 7.1) * 0.02;

    // 2. Spring Physics Simulation
    // This perfectly simulates drone aerodynamics: it must accelerate to move, and decelerate to stop.
    const stiffness = 8.0; // How hard it tries to reach the target
    const damping = 3.5;   // Air resistance / braking capability
    
    // Calculate acceleration (Force = k*dx - c*v)
    const force = new THREE.Vector3().subVectors(targetPos, currentPos.current).multiplyScalar(stiffness);
    force.sub(currentVel.current.clone().multiplyScalar(damping));
    
    // Apply acceleration to velocity, and velocity to position
    currentVel.current.add(force.multiplyScalar(delta));
    currentPos.current.add(currentVel.current.clone().multiplyScalar(delta));
    
    droneRef.current.position.copy(currentPos.current);
    
    // 3. Aerodynamic Tilting
    // A drone physically tilts based on its ACCELERATION, not its velocity.
    // To fly right, it rolls right. To stop flying right, it must roll LEFT to brake.
    // Since `force` represents acceleration, we map force directly to tilt!
    const pitch = force.z * 0.08; // Pitch forward/back
    const roll = -force.x * 0.08; // Roll left/right
    
    // Add slight yaw (rotation) into the direction of movement
    const yaw = -currentVel.current.x * 0.05; 
    
    const targetRotation = new THREE.Euler(pitch, yaw, roll);
    droneRef.current.quaternion.slerp(new THREE.Quaternion().setFromEuler(targetRotation), 0.15);
  });

  return (
    <group ref={droneRef}>
      <primitive object={scene} scale={2} />
      
      {/* Hyper-subtle LiDAR Scanner Beam */}
      <mesh position={[0, -10, 0]}>
        {/* Very faint, barely dense cone representing LiDAR bounds */}
        <coneGeometry args={[2.5, 20, 32]} />
        <meshBasicMaterial 
          color="#00ffcc" 
          transparent 
          opacity={0.03} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      {/* Subtle laser sweep line on the ground */}
      <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 0.05]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// Preload to ensure smooth rendering
useGLTF.preload('/3d-drone.glb');

export default function Drone3D() {
  return (
    <div 
      className="w-full h-full relative bg-cover bg-center"
      style={{ backgroundImage: 'url("/crop-background.png")' }}
    >
      {/* Dark overlay without blur to see the high-res crops clearly */}
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
      
      <Canvas camera={{ position: [5, 2.5, 10], fov: 35 }} className="relative z-10 pointer-events-none">
        <Environment preset="city" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        
        <GLTFModel url="/3d-drone.glb" />
        
        {/* Dynamic Shadow */}
        <ContactShadows position={[0, -2, 0]} opacity={0.8} scale={20} blur={1.5} far={10} color="#000000" />
      </Canvas>
      
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span className="bg-black/60 text-white border border-[#00ffcc]/30 font-label-sm text-label-sm px-4 py-2 rounded-full flex items-center gap-3 shadow-[0_0_15px_rgba(0,255,204,0.1)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_8px_#00ffcc]"></span>
          <span className="tracking-widest uppercase text-[10px] font-bold text-[#00ffcc]">LiDAR Mapping Active</span>
        </span>
      </div>
    </div>
  );
}
