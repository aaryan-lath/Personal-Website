'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface ResearchBoxProps {
  title: string;
  description: string;
  points: string[];
  side: 'left' | 'right';
  bgColor?: string;
  href?: string;
}

export default function ResearchBox({
  title,
  description,
  points,
  side,
  bgColor = 'bg-white',
  href
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

  const boxContent = (
    <>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
        {href && (
          <svg className="w-6 h-6 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-2 text-gray-600">
        {points.map((point, index) => (
          <li key={index}>• {point}</li>
        ))}
      </ul>
      {href && (
        <div className="mt-4 text-sm text-blue-600 font-medium">
          Click to learn more →
        </div>
      )}
    </>
  );

  const baseClasses = `${bgColor} rounded-lg p-8 shadow-sm research-box-scale ${
    side === 'left' 
      ? isVisible ? 'animate-tilt-in-left' : 'research-box-left'
      : isVisible ? 'animate-tilt-in-right' : 'research-box-right'
  } ${href ? 'hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group' : ''}`;

  if (href) {
    return (
      <Link href={href}>
        <div 
          ref={boxRef}
          className={baseClasses}
          style={{ animationDelay: side === 'left' ? '0.2s' : '0.4s' }}
        >
          {boxContent}
        </div>
      </Link>
    );
  }

  return (
    <div 
      ref={boxRef}
      className={baseClasses}
      style={{ animationDelay: side === 'left' ? '0.2s' : '0.4s' }}
    >
      {boxContent}
    </div>
  );
}