'use client';

import { useEffect, useState } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage: string;
  height?: string;
  speed?: number;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

export default function ParallaxSection({
  children,
  backgroundImage,
  height = 'min-h-screen',
  speed = 0.5,
  overlay = true,
  overlayColor = 'black',
  overlayOpacity = 0.4
}: ParallaxSectionProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`relative ${height} overflow-hidden`} style={{ marginBottom: '-1px' }}>
      <div 
        className="absolute bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${offsetY * speed}px)`,
          willChange: 'transform',
          top: '-60%',
          left: 0,
          right: 0,
          bottom: '-60%',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundColor: '#1f2937'
        }}
      />
      
      {overlay && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity
          }}
        />
      )}
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </section>
  );
}