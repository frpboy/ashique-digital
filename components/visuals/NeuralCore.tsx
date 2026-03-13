"use client";

import { useRef, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { 
  Sphere, 
  MeshDistortMaterial, 
  Float, 
  MeshTransmissionMaterial,
  Points,
  PointMaterial,
  Torus,
  View,
  PerspectiveCamera
} from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";

function Particles({ count = 100 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 0.8;
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      p[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      p[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      p[i * 3 + 2] = r * Math.cos(theta);
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  const timer = useMemo(() => {
    const T = (THREE as any).Timer;
    return T ? new T() : null;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const elapsed = state.clock.getElapsedTime();
      ref.current.rotation.y = elapsed * 0.5;
      ref.current.rotation.z = elapsed * 0.3;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#00C2CB"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function OrbitRings() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const elapsed = state.clock.getElapsedTime();
      ref.current.rotation.x = elapsed * 0.2;
      ref.current.rotation.y = elapsed * 0.4;
    }
  });

  return (
    <group ref={ref}>
      <Torus args={[1.5, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00C2CB" transparent opacity={0.2} />
      </Torus>
      <Torus args={[1.8, 0.005, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#00C2CB" transparent opacity={0.1} />
      </Torus>
    </group>
  );
}

function CoreOrb() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Internal Glow */}
      <Sphere args={[0.7, 32, 32]}>
        <meshBasicMaterial color="#00C2CB" transparent opacity={0.1} />
      </Sphere>
      
      {/* Outer Glass Shell */}
      <Sphere args={[1, 64, 64]}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.5}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#e0fbfc"
        />
      </Sphere>

      <Particles count={200} />
      <OrbitRings />
    </Float>
  );
}

export default function NeuralCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Combine refs
  const setRefs = (node: HTMLDivElement | null) => {
    (containerRef as any).current = node;
    inViewRef(node);
  };

  return (
    <div ref={setRefs} style={{ width: "100%", height: "240px", cursor: "pointer", position: "relative" }}>
      <View track={containerRef as any}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00C2CB" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Suspense fallback={null}>
          {inView && <CoreOrb />}
        </Suspense>
      </View>
    </div>
  );
}
