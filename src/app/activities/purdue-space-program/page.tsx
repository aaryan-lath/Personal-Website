'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Page: Purdue Space Program activity details
// EDIT TEXT HERE: Page copy is hardcoded in this file.
export default function PurdueSpaceProgramPage() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // EDIT TEXT HERE: Image carousel content.
  // BLOCK GROUP: Each object is one image; add another by copying an object.
  const images = [
    {
      src: '/images/PSP-Build.jpg',
      title: 'PSP Build Session',
      description: 'Designing the Walls on Fusion 360 and laser-cutting them'
    },
    {
      src: '/images/PSP-Showcase.jpg',
      title: 'PSP Showcase',
      description: 'Showcasing our projects'
    },
    {
      src: '/images/PSP-group.jpg',
      title: 'PSP Team',
      description: 'Purdue Space Program Satellites member photograph'
    }
  ];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Activities
            </button>
            
            {/* EDIT TEXT HERE: Page title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Purdue Space Program</h1>
            {/* EDIT TEXT HERE: Intro paragraph */}
            <p className="text-lg text-gray-600 mb-6">
              Contributed to the PSP Satellites team as a Structures, Mechanisms and Thermals member, deputy systems director and to the entire organization of 10 teams as the secretary.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {/* EDIT TEXT HERE: Tag labels */}
              <span className="px-4 py-2 bg-purple-100 text-purple-800 font-medium rounded-lg">CubeSat Development</span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 font-medium rounded-lg">Systems Engineering</span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 font-medium rounded-lg">Collaboration</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About the Program</h2>
                <p className="text-gray-700 mb-4">
                  The Purdue Space Program is a collaborative initiative that brings together students from 
                  multiple disciplines to work on advanced aerospace projects. The program encompasses 
                  various teams working on rocket projects, satellite development and space technology development.
                </p>
              </div>

              {/* My Contributions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Contributions</h2>
                {/* Layout tip: This is a vertical list. If you add many items and want two columns, change this container to a grid and add something like md:grid-cols-2. */}
                <ul className="space-y-4">
                  {/* BLOCK GROUP: Each list item is one contribution; add another by copying a list item. */}
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Optimized the organizations backend operations as the secretary and performed some technical director tasks, improving overall club efficiency, contributing to its vision.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Formulated, reviewed, and refined over 200 project system-level and sub-system requirements for the BoilerBus as the Deputy Systems Director.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Utilized Fusion 360 CAD modeling to design a 3U CubeSat (~$100K) with ~40 engineers and using different manufacturing techniques such as metal laser cutting, VF3 milling for the end plates.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Developed trade and research studies for structural components, materials, designs, and fabrication methods.</span>
                  </li>
                </ul>
              </div>

              {/* Program Highlights & Technical Focus Areas */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Program Highlights & Technical Focus</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Systems Review - Spring 2024</h3>
                    <p className="text-gray-600 text-sm">Performed a Systems Review for the system and subsystem level requirements</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900">CubeSat Development</h3>
                    <p className="text-gray-600 text-sm">Developed and manufactured walls, end plates and bulkhead prototypes for BoilerBus</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Satellite Subsystems</h3>
                    <p className="text-gray-600 text-sm">Understanding the subsystems in the satellite such as Communication and Data Handling, Electrical and Power System, Payload integration, etc.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-6">
              {/* Image Carousel */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gallery</h2>
                
                {/* Image Display */}
                <div className="relative mb-4">
                  <img
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].title}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                  
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                {/* Image Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {images[currentImageIndex].title}
                  </h3>
                  <p className="text-gray-600">
                    {images[currentImageIndex].description}
                  </p>
                </div>
                
                {/* Image Indicators */}
                {images.length > 1 && (
                  <div className="flex justify-center space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? 'bg-purple-600'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Skills Developed */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills Developed</h2>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Systems Engineering</h3>
                    <p className="text-gray-600 text-sm">Complex system design and integration</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Backend Optimization</h3>
                    <p className="text-gray-600 text-sm">Improving the backend for a seamless and quick project progress</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
                    <p className="text-gray-600 text-sm">Technical documentation and requirements management</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Manufacturing</h3>
                    <p className="text-gray-600 text-sm">Metal laser cutting, VF3 milling, and fabrication techniques</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
