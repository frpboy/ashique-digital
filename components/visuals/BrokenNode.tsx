"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, PerspectiveCamera, MeshDistortMaterial, Sphere } from "@react-three/drei";

export default function BrokenNode() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ width: "100%", height: "300px", marginBottom: "2rem" }} />
    );
  }

  return (
    <div 
      style={{ 
        width: "100%", 
        height: "300px", 
        marginBottom: "2rem",
        opacity: 0.8
      }}
    >
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
          {/* Fragmented/Broken looking sphere */}
          <Sphere args={[1, 16, 16]} scale={1.8}>
            <MeshDistortMaterial
              color="#0d1b2a"
              wireframe
              distort={0.8}
              speed={1}
              roughness={1}
            />
          </Sphere>
          
          {/* Central glow core */}
          <Sphere args={[0.4, 32, 32]} scale={1}>
            <meshStandardMaterial
              color="#00C2CB"
              emissive="#00C2CB"
              emissiveIntensity={2}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}
