"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * DataNodeTrail - A premium, high-performance mouse trail that follows the cursor
 * with "node" particles and spring physics. Matches the Electric Teal + Deep Navy theme.
 */
export default function DataNodeTrail() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const nodes = [
    { size: 9, stiffness: 350, damping: 30 }, // Core
    { size: 7, stiffness: 280, damping: 25 },
    { size: 5, stiffness: 220, damping: 22 },
    { size: 4, stiffness: 180, damping: 20 },
    { size: 3, stiffness: 140, damping: 18 },
    { size: 3, stiffness: 100, damping: 16 },
    { size: 2, stiffness: 70, damping: 14 },
    { size: 2, stiffness: 45, damping: 12 },
  ];

  // Mouse coordinates (raw)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Detect touch device
    const touchCheck = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchCheck);
    
    if (touchCheck) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10000, // Highest possible
      }}
    >
      {nodes.map((node, i) => (
        <Node key={i} node={node} mouseX={mouseX} mouseY={mouseY} index={i} />
      ))}
    </div>
  );
}

interface NodeProps {
  node: { size: number; stiffness: number; damping: number };
  mouseX: any;
  mouseY: any;
  index: number;
}

function Node({ node, mouseX, mouseY, index }: NodeProps) {
  // Each node has its own spring for staggered, "organic" delay
  const springX = useSpring(mouseX, {
    stiffness: node.stiffness,
    damping: node.damping,
  });
  const springY = useSpring(mouseY, {
    stiffness: node.stiffness,
    damping: node.damping,
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: node.size,
        height: node.size,
        borderRadius: "50%",
        background: "var(--color-accent, #00C2CB)",
        boxShadow: index === 0 ? "0 0 25px var(--color-accent)" : "none",
        opacity: 1.0 - index * 0.1,
      }}
    >
      {/* Decorative ring for the lead node */}
      {index === 0 && (
        <motion.div
          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            inset: -6,
            border: "1px solid var(--color-accent)",
            borderRadius: "50%",
          }}
        />
      )}
    </motion.div>
  );
}

