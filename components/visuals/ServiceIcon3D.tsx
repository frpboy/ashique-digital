"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox, View, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function IconMesh({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use a stable reference to avoid frame-skipping if needed
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        hovered ? Math.PI : 0,
        0.1
      );
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={hovered ? 4 : 1} rotationIntensity={0.5} floatIntensity={0.5}>
      <RoundedBox ref={meshRef} args={[1, 1, 1]} radius={0.1} smoothness={4} scale={1.2}>
        <MeshDistortMaterial
          color={hovered ? "#00C2CB" : "#0D1B2A"}
          distort={hovered ? 0.3 : 0}
          speed={hovered ? 4 : 0}
          roughness={0.2}
          metalness={0.8}
        />
      </RoundedBox>
    </Float>
  );
}

export default function ServiceIcon3D() {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: "60px", height: "60px", cursor: "pointer", position: "relative" }}
    >
      <View track={containerRef as any}>
        <PerspectiveCamera makeDefault position={[0, 0, 3]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <IconMesh hovered={hovered} />
      </View>
    </div>
  );
}
