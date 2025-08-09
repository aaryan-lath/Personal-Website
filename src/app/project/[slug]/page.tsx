'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CADViewer from '../../../components/CADViewer';

interface ProjectPageProps {
  searchParams: Promise<{
    title?: string;
    description?: string;
    modelUrl?: string;
    technologies?: string;
    details?: string;
    images?: string;
    driveLink?: string;
    driveLinkText?: string;
  }>;
}

export default function ProjectPage({ searchParams }: ProjectPageProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pageData, setPageData] = useState({
    title: 'Project Details',
    description: '',
    modelUrl: undefined as string | undefined,
    technologies: [] as string[],
    details: [] as string[],
    images: [] as string[],
    driveLink: undefined as string | undefined,
    driveLinkText: undefined as string | undefined,
  });

  useEffect(() => {
    async function loadData() {
      const resolvedSearchParams = await searchParams;
      
      const title = resolvedSearchParams.title || 'Project Details';
      const description = resolvedSearchParams.description || '';
      const modelUrl = resolvedSearchParams.modelUrl;
      const technologies = resolvedSearchParams.technologies ? JSON.parse(decodeURIComponent(resolvedSearchParams.technologies)) : [];
      const details = resolvedSearchParams.details ? JSON.parse(decodeURIComponent(resolvedSearchParams.details)) : [];
      const images = resolvedSearchParams.images ? JSON.parse(decodeURIComponent(resolvedSearchParams.images)) : [];
      const driveLink = resolvedSearchParams.driveLink;
      const driveLinkText = resolvedSearchParams.driveLinkText;

      setPageData({
        title,
        description,
        modelUrl,
        technologies,
        details,
        images,
        driveLink,
        driveLinkText,
      });
    }

    loadData();
  }, [searchParams]);

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
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </button>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{pageData.title}</h1>
            <p className="text-lg text-gray-600">{pageData.description}</p>
          </div>

          {/* Technologies */}
          {pageData.technologies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {pageData.technologies.map((tech: string, index: number) => (
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
          {pageData.modelUrl && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3D Model</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <CADViewer
                  modelUrl={pageData.modelUrl}
                  height="500px"
                  showControls={true}
                />
              </div>
            </div>
          )}

          {/* Project Details */}
          {pageData.details.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Details</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <ul className="space-y-3">
                  {pageData.details.map((detail: string, index: number) => (
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
          {pageData.images.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pageData.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image}
                      alt={`${pageData.title} - Image ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drive Link */}
          {pageData.driveLink && (
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <a
                  href={pageData.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {pageData.driveLinkText || 'View Files'}
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