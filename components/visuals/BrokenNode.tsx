"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function BrokenSphere({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // slow drifting + slow glitchy rotation
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.15;
      
      // Floating motion (drifting)
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;
      meshRef.current.position.x = Math.cos(t * 0.3) * 0.15;
      
      // Mouse tilt (reaction to cursor)
      const targetX = state.mouse.y * 0.25;
      const targetY = state.mouse.x * 0.25;
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
      {/* Fewer wires for cleaner look (reduce segments) */}
      <Sphere ref={meshRef} args={[1, 32, 32]} scale={isMobile ? 1.2 : 1.6}>
        <MeshDistortMaterial
          color="#80E1E5"
          emissive="#80E1E5"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
          wireframe
          distort={0.6}
          speed={0.6}
          roughness={1}
          metalness={0.5}
        />
      </Sphere>
      
      {/* Internal core */}
      <Sphere args={[0.3, 32, 32]} scale={1}>
        <meshStandardMaterial
          color="#00C2CB"
          emissive="#00C2CB"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function BrokenNode() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return <div style={{ height: isMobile ? "300px" : "500px" }} />;

  return (
    <div 
      style={{ 
        width: "100%", 
        height: isMobile ? "300px" : "500px", 
        paddingTop: isMobile ? "2rem" : "5rem",
        opacity: 0.9,
        position: "relative",
        zIndex: 1
      }}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: isMobile ? 40 : 35 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <BrokenSphere isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
