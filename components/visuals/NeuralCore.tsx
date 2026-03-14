"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Icosahedron,
  Float,
  PerspectiveCamera,
  MeshDistortMaterial,
  Environment,
  ContactShadows
} from "@react-three/drei";
import * as THREE from "three";

function Core() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((state, delta) => {
    elapsed.current += delta;
    const t = elapsed.current;
    
    if (meshRef.current && outerRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.z = t * 0.1;
      
      outerRef.current.rotation.y = -t * 0.1;
      outerRef.current.rotation.x = t * 0.05;

      // Mouse following
      const targetRotateX = state.mouse.y * 0.2;
      const targetRotateY = state.mouse.x * 0.2;
      
      meshRef.current.rotation.x += (targetRotateX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetRotateY - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {/* The Central "Neural" Core */}
      <Icosahedron ref={meshRef} args={[1, 15]} scale={1.2}>
        <MeshDistortMaterial
          color="#00C2CB"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={1}
          reflectivity={1}
          clearcoat={1}
        />
      </Icosahedron>

      {/* The Outer Data Structure (Wireframe) */}
      <Icosahedron ref={outerRef} args={[1.6, 2]} scale={1.1}>
        <meshStandardMaterial 
          wireframe 
          color="#00C2CB" 
          transparent 
          opacity={0.2} 
          metalness={1}
          roughness={0.1}
        />
      </Icosahedron>

      {/* Subtle Glow Sphere */}
      <mesh scale={1.1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00C2CB" transparent opacity={0.05} />
      </mesh>
    </Float>
  );
}

export default function NeuralCore() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C2CB" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
        
        <Suspense fallback={null}>
          <Core />
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
            color="#00C2CB" 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
