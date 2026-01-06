'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useProject } from '../../../contexts/ProjectContext';

// Page: project detail view (data is provided via ProjectContext from the home page)
const CADViewer = dynamic(
  () => import('../../../components/CADViewer').catch(() => {
    // Return a fallback component if CADViewer fails to load
    return {
      default: ({ modelUrl, height }: { modelUrl?: string; height?: string }) => (
        <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${height ? '' : 'h-[500px]'}`} style={height ? { height } : {}}>
          <div className="text-center p-8">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-600 font-medium mb-2">3D Model Viewer</p>
            <p className="text-sm text-gray-500">Model: {modelUrl?.split('/').pop()}</p>
            <p className="text-xs text-gray-400 mt-2">Interactive 3D viewer temporarily unavailable</p>
          </div>
        </div>
      )
    };
  }),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading 3D Model...</p>
        </div>
      </div>
    )
  }
);

export default function ProjectPage() {
  const router = useRouter();
  const { currentProject } = useProject();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Redirect if no project data
  useEffect(() => {
    if (!currentProject) {
      router.push('/');
    }
  }, [currentProject, router]);

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeImageModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            {/* EDIT TEXT HERE: Back button label */}
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </button>
            
            {/* EDIT TEXT HERE: These fields come from the selected project on the homepage */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentProject.title}</h1>
            <p className="text-lg text-gray-600">{currentProject.description}</p>
          </div>

          {/* Technologies */}
          {currentProject.technologies && currentProject.technologies.length > 0 && (
            <div className="mb-8">
              {/* EDIT TEXT HERE: Section label */}
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technologies</h2>
              {/* Layout tip: Tags wrap to the next line automatically. If you want a fixed number per row, change this container to a grid and set grid-cols-* (example: grid-cols-4). */}
              <div className="flex flex-wrap gap-3">
                {currentProject.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 3D Model */}
          {currentProject.modelUrl && (
            <div className="mb-8">
              {/* EDIT TEXT HERE: Section label */}
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3D Model</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <CADViewer
                  modelUrl={currentProject.modelUrl}
                  height="500px"
                  showControls={true}
                />
              </div>
            </div>
          )}

          {/* Project Details */}
          {currentProject.details && currentProject.details.length > 0 && (
            <div className="mb-8">
              {/* EDIT TEXT HERE: Section label */}
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Details</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                {/* Layout tip: This is a vertical list. If you add many items and want two columns, change this container to a grid and add something like md:grid-cols-2. */}
                <ul className="space-y-3">
                  {currentProject.details.map((detail: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Gallery */}
          {currentProject.images && currentProject.images.length > 0 && (
            <div className="mb-8">
              {/* EDIT TEXT HERE: Section label */}
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gallery</h2>
              {/* Layout tip: 1 image per row on small screens, 2 on md, 3 on lg. If you add more and want 4 on one row (large screens), change lg:grid-cols-3 to lg:grid-cols-4. */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProject.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image}
                      alt={`${currentProject.title} - Image ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drive Link */}
          {currentProject.driveLink && (
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <a
                  href={currentProject.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {currentProject.driveLinkText || 'View Files'}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
