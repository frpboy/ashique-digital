"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";

function AnimatedSphere({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((state, delta) => {
    elapsed.current += delta;
    if (meshRef.current) {
      const t = elapsed.current;
      // Rotation
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
      
      // Gentle mouse follow (Tilt)
      const targetRotateX = state.mouse.y * 0.2;
      const targetRotateY = state.mouse.x * 0.2;
      meshRef.current.rotation.x += (targetRotateX - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (targetRotateY - meshRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere 
        ref={meshRef} 
        args={[1, 100, 200]} 
        scale={isMobile ? 1.4 : 1.8} 
        position={isMobile ? [0, 1.2, 0] : [1.4, 0, 0]}
      >
        <MeshDistortMaterial
          color="#00C2CB"
          transparent
          opacity={0.8}
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function GrowthSphere() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      ref={(node) => {
        (containerRef as any).current = node;
        inViewRef(node);
      }}
      style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        zIndex: -1,
        pointerEvents: "none",
        opacity: isMobile ? 0.6 : 0.8,
      }}
    >
      <View track={containerRef as any}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        {inView && <AnimatedSphere isMobile={isMobile} />}
      </View>
    </div>
  );
}
