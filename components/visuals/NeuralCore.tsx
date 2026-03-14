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
} from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";

function Lattice({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate vertices for point sprites at each vertex
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.6, 2), []);
  const positions = useMemo(() => geometry.attributes.position.array as Float32Array, [geometry]);

  const elapsed = useRef(0);

  useFrame((state, delta) => {
    elapsed.current += delta;
    if (meshRef.current && pointsRef.current && glowRef.current) {
      const t = elapsed.current;
      
      // Basic rotation
      const rotY = t * 0.1;
      const rotZ = t * 0.05;
      
      meshRef.current.rotation.y = rotY;
      meshRef.current.rotation.z = rotZ;
      pointsRef.current.rotation.y = rotY;
      pointsRef.current.rotation.z = rotZ;
      glowRef.current.rotation.y = rotY;
      glowRef.current.rotation.z = rotZ;

      // Mouse "Lean" / Magnetic Distortion
      const targetRotateX = state.mouse.y * 0.15;
      const targetRotateY = state.mouse.x * 0.15;
      
      meshRef.current.rotation.x += (targetRotateX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetRotateY - meshRef.current.rotation.y) * 0.05;
      pointsRef.current.rotation.x += (targetRotateX - pointsRef.current.rotation.x) * 0.05;
      pointsRef.current.rotation.y += (targetRotateY - pointsRef.current.rotation.y) * 0.05;
      glowRef.current.rotation.x += (targetRotateX - glowRef.current.rotation.x) * 0.05;
      glowRef.current.rotation.y += (targetRotateY - glowRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      {/* The Core Lattice (Wireframe) */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial 
          wireframe 
          color="#00C2CB" 
          transparent 
          opacity={0.8} 
          metalness={0.9} 
          roughness={0.1}
          depthTest={false}
        />
      </mesh>

      {/* Data Nodes (Vertices) */}
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

      {/* Subtle Inner Glow */}
      <Sphere ref={glowRef} args={[1.58, 32, 32]}>
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
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const setRefs = (node: HTMLDivElement | null) => {
    (containerRef as any).current = node;
    inViewRef(node);
  };

  return (
    <div 
      ref={setRefs} 
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
