'use client';

import { useState } from 'react';
import Link from 'next/link';

const courses = [
  'AAE 203: Aeromechanics',
  'AAE 204: Aeromechanics II',
  'AAE 251: Introduction to Aircraft and Spacecraft Design',
  'AAE 301: Signal Analysis',
  'AAE 333: Fluid Mechanics',
  'AAE 334: Aerodynamics',
  'AAE 339: Aerospace Propulsion',
  'AAE 352: Structures',
  'AAE 364: Control System Analysis',
  'AAE 412: Computational Fluid Dynamics',
  'AAE 514: Intermediate Aerodynamics',
  'AAE 550: Multidisciplinary Design Optimization',
  'Data Structures and Algorithms',
  'Material Sciences',
  'Python Programming',
  'Introduction to Computer Science',
  'Microeconomics',
  'Macroeconomics'
];

const highlights = [
  {
    course: 'MFET 163',
    description: 'Designed a single piston sterling engine and guided fellow students in creating the part hierarchy and using the CAD and PLM software effectively.'
  },
  {
    course: 'ENGR 130',
    description: 'Designed a cost effective and advanced farming system for planting, watering and providing nutrients in an indoor vertical farming setting and for families in a garden setting.'
  },
  {
    course: 'AAE 412',
    description: 'Simulating the performance of a 2019 Mercedes F1 car with various front wing designs on drag, downforce and overall car behavior.'
  }
];

export default function Academia() {
  const [activeView, setActiveView] = useState<'list' | 'highlights'>('list');

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Link 
              href="/"
              className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Academic Coursework</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive overview of my academic journey at Purdue University
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course List/Highlights */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Course Overview</h2>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveView('list')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        activeView === 'list'
                          ? 'bg-teal-600 text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Course List
                    </button>
                    <button
                      onClick={() => setActiveView('highlights')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        activeView === 'highlights'
                          ? 'bg-teal-600 text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Highlights
                    </button>
                  </div>
                </div>

                {activeView === 'list' ? (
                  <div className="space-y-3">
                    {courses.map((course, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-2 h-2 bg-teal-500 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-gray-800 font-medium">{course}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200"
                      >
                        <h3 className="text-lg font-semibold text-teal-800 mb-3">
                          {highlight.course}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Transcript */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Official Transcript</h2>
                <div className="flex flex-col gap-4 mb-6">
                  <a 
                    href="/Aaryan_Lath-Transcript.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors inline-flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Transcript
                  </a>
                  <a 
                    href="/Aaryan_Lath-Transcript.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors inline-flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in New Tab
                  </a>
                </div>
                <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    src="/Aaryan_Lath-Transcript.pdf"
                    className="w-full h-full"
                    title="Aaryan Lath Transcript"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}