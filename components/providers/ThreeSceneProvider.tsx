"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

export function ThreeSceneProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleContextRestored = () => {
      console.log("WebGL Context Restored - Re-rendering 3D Scenes.");
      window.location.reload(); // Simplest way to recover all states
    };

    window.addEventListener("webglcontextrestored", handleContextRestored);
    return () => window.removeEventListener("webglcontextrestored", handleContextRestored);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {children}
      <Canvas
        className="fixed inset-0 pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1, // Behind everything
          pointerEvents: "none",
        }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
    </div>
  );
}
