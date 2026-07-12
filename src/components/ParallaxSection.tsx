'use client';

import { useEffect, useRef, useState } from 'react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      // Drive the parallax from THIS section's position in the viewport, not the
      // absolute page scroll. window.pageYOffset made sections far down the page
      // translate hundreds of px, pushing the background past its -60% buffer and
      // exposing the dark fill ("black space" at the top of the frame). getBoundingClientRect().top
      // stays within roughly one viewport while the section is visible, so the
      // translate stays inside the buffer.
      if (el) setOffsetY(el.getBoundingClientRect().top);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // DO NOT TOUCH unless you know why: negative margin keeps parallax sections tightly stitched
    <section ref={sectionRef} className={`relative ${height} overflow-hidden`} style={{ marginBottom: '-1px' }}>
      <div
        className="absolute bg-cover bg-center bg-no-repeat"
        style={{
          // Background positioning + transform controls the parallax effect
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
            // DO NOT TOUCH unless you know why: overlay controls section transparency/legibility
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
