'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const CADViewer = dynamic(
  () => import('./CADViewer').catch(() => {
    // Return a fallback component if CADViewer fails to load
    return {
      default: ({ modelUrl, height }: { modelUrl?: string; height?: string }) => (
        <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${height ? '' : 'h-80 lg:h-96'}`} style={height ? { height } : {}}>
          <div className="text-center p-6">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-600 font-medium mb-1">3D Model Viewer</p>
            <p className="text-sm text-gray-500">Model: {modelUrl?.split('/').pop()}</p>
            <p className="text-xs text-gray-400 mt-1">Interactive 3D viewer temporarily unavailable</p>
          </div>
        </div>
      )
    };
  }),
  { 
    ssr: false,
    loading: () => (
      <div className="h-80 lg:h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading 3D Model...</p>
        </div>
      </div>
    )
  }
);

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  modelUrl?: string;
  technologies?: string[];
  details?: string[];
  images?: string[];
  driveLink?: string;
  driveLinkText?: string;
}

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  description,
  modelUrl,
  technologies = [],
  details = [],
  images = [],
  driveLink,
  driveLinkText
}: ProjectModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');
    } else {
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('data-modal-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('data-modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 backdrop-blur-md bg-white/20" 
        onClick={onClose}
        style={{ zIndex: 2147483646 }}
      ></div>
      
      <div className="modal-content bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
              <p className="text-lg text-gray-600">{description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-6">
              {modelUrl && (
                <div className="h-80 lg:h-96 mb-6">
                  <CADViewer modelUrl={modelUrl} height="100%" />
                </div>
              )}

              {technologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {driveLink && (
                <div className="mb-6">
                  <a
                    href={driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {driveLinkText || 'View Project Files'}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}

              {details.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Project Details</h3>
                  <ul className="space-y-3">
                    {details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {images.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Project Gallery ({images.length} images)</h3>
                  <div className="space-y-4">
                    <div className="h-64 lg:h-80 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={images[selectedImageIndex]}
                        alt={`${title} - Image ${selectedImageIndex + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="grid grid-cols-6 lg:grid-cols-8 gap-2 max-h-32 overflow-y-auto">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`h-12 lg:h-14 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImageIndex === index ? 'border-blue-600 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Image {selectedImageIndex + 1} of {images.length}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                          disabled={selectedImageIndex === 0}
                          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 cursor-pointer disabled:cursor-not-allowed transition-colors"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setSelectedImageIndex(Math.min(images.length - 1, selectedImageIndex + 1))}
                          disabled={selectedImageIndex === images.length - 1}
                          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 cursor-pointer disabled:cursor-not-allowed transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}