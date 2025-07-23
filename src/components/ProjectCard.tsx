'use client';

import { useState, useEffect, useRef } from 'react';
import ProjectModal from './ProjectModal';

interface ProjectCardProps {
  title: string;
  description: string;
  modelUrl?: string;
  coverImage?: string;
  technologies?: string[];
  details?: string[];
  images?: string[];
  driveLink?: string;
  driveLinkText?: string;
}

export default function ProjectCard({
  title,
  description,
  modelUrl,
  coverImage,
  technologies = [],
  details = [],
  images = [],
  driveLink,
  driveLinkText
}: ProjectCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div 
        ref={cardRef}
        className={`bg-white rounded-lg shadow-md overflow-hidden group project-card-hover ${
          isVisible ? 'animate-slide-in-up' : 'project-card-animate'
        }`}
      >
        <div className="h-64 relative cursor-pointer" onClick={() => setIsModalOpen(true)}>
          {coverImage ? (
            <img 
              src={coverImage} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-sm font-medium">Project Preview</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-95 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to explore
          </div>
        </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {details.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              {showDetails ? 'Hide Details' : 'View Details'}
              <svg
                className={`ml-1 w-4 h-4 transform transition-transform ${showDetails ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showDetails && (
              <div className="mt-3 space-y-2">
                {details.map((detail, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    • {detail}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {driveLink && (
          <div className={`${details.length > 0 ? 'mt-4' : 'border-t border-gray-200 pt-4'}`}>
            <a
              href={driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {driveLinkText || 'View Files'}
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
        
        <div className="mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            View Details & Gallery
          </button>
        </div>
      </div>
    </div>

    <ProjectModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={title}
      description={description}
      modelUrl={modelUrl}
      technologies={technologies}
      details={details}
      images={images}
      driveLink={driveLink}
      driveLinkText={driveLinkText}
    />
    </>
  );
}