"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function OrbMesh({ isThinking }: { isThinking?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const elapsed = useRef(0);
  useFrame((state, delta) => {
    elapsed.current += delta;
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed.current * (isThinking ? 1.5 : 0.4);
      meshRef.current.rotation.z = elapsed.current * (isThinking ? 1 : 0.2);
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1, 15]} scale={1.2}>
      <MeshDistortMaterial
        color={isThinking ? "#00e5ff" : "#00C2CB"}
        distort={isThinking ? 0.6 : 0.3}
        speed={isThinking ? 5 : 2}
        roughness={0}
        metalness={1}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </Icosahedron>
  );
}

export default function FloatingOrb3D({ isThinking }: { isThinking?: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", cursor: "pointer" }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <OrbMesh isThinking={isThinking} />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
