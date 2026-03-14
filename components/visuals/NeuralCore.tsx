"use client";

import { useRef, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { 
  Icosahedron,
  Sphere,
  Float,
  PerspectiveCamera,
  View,
  Points,
  PointMaterial,
  MeshDistortMaterial,
  Html
} from "@react-three/drei";
import * as THREE from "three";

function SystemLabel({ position, text }: { position: [number, number, number], text: string }) {
  return (
    <Html position={position} center distanceFactor={10}>
      <div style={{
        whiteSpace: "nowrap",
        color: "var(--color-accent)",
        fontFamily: "var(--font-heading)",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "0.1em",
        opacity: 0.8,
        background: "rgba(13, 27, 42, 0.4)",
        padding: "2px 8px",
        borderRadius: "4px",
        border: "1px solid rgba(0, 194, 203, 0.3)",
        backdropFilter: "blur(4px)",
        pointerEvents: "none",
        textTransform: "uppercase"
      }}>
        {text}
      </div>
    </Html>
  );
}

function Lattice({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.6, 2), []);
  const positions = useMemo(() => geometry.attributes.position.array as Float32Array, [geometry]);

  const elapsed = useRef(0);

  useFrame((state, delta) => {
    elapsed.current += delta;
    const t = elapsed.current;
    
    if (meshRef.current && pointsRef.current && coreRef.current && ringRef.current) {
      // Rotation
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.z = t * 0.05;
      pointsRef.current.rotation.y = t * 0.1;
      pointsRef.current.rotation.z = t * 0.05;
      
      // Core pulse
      coreRef.current.rotation.x = -t * 0.2;
      coreRef.current.rotation.y = t * 0.15;
      
      // Ring rotation
      ringRef.current.rotation.x = t * 0.5;
      ringRef.current.rotation.y = t * 0.3;

      // Mouse Lean
      const targetRotateX = state.mouse.y * 0.15;
      const targetRotateY = state.mouse.x * 0.15;
      
      meshRef.current.rotation.x += (targetRotateX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetRotateY - meshRef.current.rotation.y) * 0.05;
      pointsRef.current.rotation.x += (targetRotateX - pointsRef.current.rotation.x) * 0.05;
      pointsRef.current.rotation.y += (targetRotateY - pointsRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      {/* Outer Wireframe */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial 
          wireframe 
          color="#00C2CB" 
          transparent 
          opacity={0.3} 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>

      {/* Thinking Core */}
      <Icosahedron ref={coreRef} args={[0.8, 15]}>
        <MeshDistortMaterial
          color="#00C2CB"
          transparent
          opacity={0.15}
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={1}
        />
      </Icosahedron>

      {/* Scanning Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00C2CB" transparent opacity={0.2} />
      </mesh>

      {/* System Nodes Labels */}
      {!isMobile && (
        <>
          <SystemLabel position={[2, 1, 0]} text="Lead Gen" />
          <SystemLabel position={[-2, -1, 1]} text="Systems" />
          <SystemLabel position={[1.5, -1.8, -1]} text="Revenue" />
          <SystemLabel position={[-1.8, 1.5, -1]} text="Strategy" />
        </>
      )}

      {/* Data Nodes */}
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#00C2CB"
          size={isMobile ? 0.04 : 0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Ambient Inner Glow */}
      <Sphere args={[0.78, 32, 32]}>
        <meshBasicMaterial 
          color="#00C2CB" 
          transparent 
          opacity={0.05} 
          depthWrite={false}
        />
      </Sphere>
    </Float>
  );
}

export default function NeuralCore() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="neural-core-container"
      style={{ 
        width: "100%", 
        height: "100%", 
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0
      }}
      ref={containerRef}
    >
      <View track={containerRef as any}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00C2CB" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Lattice isMobile={typeof window !== 'undefined' && window.innerWidth < 768} />
        </Suspense>
      </View>
    </div>
  );
}
