'use client';

import { useState, useEffect, useRef } from 'react';

interface ResearchBoxProps {
  title: string;
  description: string;
  points: string[];
  side: 'left' | 'right';
  bgColor?: string;
}

export default function ResearchBox({
  title,
  description,
  points,
  side,
  bgColor = 'bg-white'
}: ResearchBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={boxRef}
      className={`${bgColor} rounded-lg p-8 shadow-sm research-box-scale ${
        side === 'left' 
          ? isVisible ? 'animate-tilt-in-left' : 'research-box-left'
          : isVisible ? 'animate-tilt-in-right' : 'research-box-right'
      }`}
      style={{ animationDelay: side === 'left' ? '0.2s' : '0.4s' }}
    >
      <h3 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-2 text-gray-600">
        {points.map((point, index) => (
          <li key={index}>• {point}</li>
        ))}
      </ul>
    </div>
  );
}