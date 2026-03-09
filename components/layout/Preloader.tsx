"use client";

import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after page load (or simulated delay for smooth transition)
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 2000); // 2s minimum for impact
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--color-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <div style={{ width: '300px', height: '300px' }}>
        <DotLottieReact
          src="https://lottie.host/693b0e9c-c30d-443b-a15b-14305d09c2d7/FMnspf65O0.lottie"
          loop
          autoplay
        />
      </div>
      <div 
        style={{ 
          color: 'var(--color-accent)', 
          fontFamily: 'var(--font-heading)', 
          fontWeight: 700,
          letterSpacing: '0.1em',
          fontSize: '0.875rem'
        }}
      >
        INITIALIZING GROWTH ENGINE...
      </div>
    </div>
  );
}
