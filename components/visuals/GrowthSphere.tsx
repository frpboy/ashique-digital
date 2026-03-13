"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Gentle mouse follow (Tilt)
      const targetRotateX = state.mouse.y * 0.2;
      const targetRotateY = state.mouse.x * 0.2;
      meshRef.current.rotation.x += (targetRotateX - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (targetRotateY - meshRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.2}>
        <MeshDistortMaterial
          color="#00C2CB"
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function GrowthSphere() {
  return (
    <div 
      style={{ 
        position: "absolute", 
        top: 0, 
        right: "-10%", 
        width: "60vw", 
        height: "100%", 
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.6,
      }}
    >
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
