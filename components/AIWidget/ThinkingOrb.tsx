"use client";

import { motion } from "framer-motion";

export default function ThinkingOrb({ 
  size = 64, 
  thinking = false 
}: { 
  size?: number;
  thinking?: boolean;
}) {
  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer Pulse Glow */}
      <motion.div
        animate={{
          scale: thinking ? [1, 1.6, 1] : [1, 1.3, 1],
          opacity: thinking ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: thinking ? 1.5 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background: "var(--color-accent, #00C2CB)",
          filter: thinking ? "blur(20px)" : "blur(16px)",
        }}
      />

      {/* Reflection Layer */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0,194,203,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Main 3D Sphere */}
      <motion.div
        animate={{
          y: [0, -3, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative rounded-full shadow-2xl overflow-hidden"
        style={{
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 35% 35%, #00C2CB 0%, #162C40 45%, #0D1B2A 100%)",
          boxShadow: `
            inset -8px -8px 20px rgba(0,0,0,0.6),
            inset 8px 8px 15px rgba(255,255,255,0.15),
            0 12px 24px rgba(0,26,42,0.4)
          `,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Top Highlight (Glint) */}
        <div 
          className="absolute top-[10%] left-[20%] w-[25%] h-[20%] rounded-full blur-[1px]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
            transform: "rotate(-15deg)",
          }}
        />

        {/* Ambient Center Glow */}
        <div 
          className="w-[40%] h-[40%] rounded-full opacity-40 blur-md"
          style={{
            background: "#00C2CB",
          }}
        />
        
        {/* Strategic "Data" Micro-lines (Subtle visual texture) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute w-full h-[1px] bg-white top-1/2 -translate-y-1/2 rotate-45" />
           <div className="absolute w-full h-[1px] bg-white top-1/2 -translate-y-1/2 -rotate-45" />
        </div>
      </motion.div>
    </div>
  );
}
