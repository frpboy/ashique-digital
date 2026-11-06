"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox, View, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";

function IconMesh({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use a stable reference to avoid frame-skipping if needed
  const elapsed = useRef(0);
  useFrame((state, delta) => {
    elapsed.current += delta;
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
  // Performance optimization (Bolt): Gate IconMesh rendering on viewport visibility.
  // ServicesGrid renders 6 instances; gating on inView pauses 6 continuous 60fps useFrame
  // loops and matrix computations whenever cards are out of the viewport.
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

  return (
    <div 
      ref={(node) => {
        containerRef.current = node;
        inViewRef(node);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Interactive 3D service diagnostic node"
      style={{ width: "60px", height: "60px", cursor: "pointer", position: "relative" }}
    >
      <View track={containerRef as unknown as React.RefObject<HTMLElement>}>
        <PerspectiveCamera makeDefault position={[0, 0, 3]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        {inView && <IconMesh hovered={hovered} />}
      </View>
    </div>
  );
}
