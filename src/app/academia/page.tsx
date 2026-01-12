'use client';

import { useState } from 'react';
import Link from 'next/link';

// Page: academic coursework and highlights
// Content sources below are hardcoded arrays in this file.
// EDIT TEXT HERE: Course list shown in the "Course List" view.
// BLOCK GROUP: Each string below is one course line; add another by adding a new string.
const courses = [
  'AAE 203: Aeromechanics',
  'AAE 204: Aeromechanics II',
  'AAE 251: Introduction to Aircraft and Spacecraft Design',
  'AAE 301: Signal Analysis',
  'AAE 333: Fluid Mechanics',
  'AAE 33301: Fluid Mechanics Lab',
  'AAE 334: Aerodynamics',
  'AAE 33401: Aerodynamics Lab',
  'AAE 339: Aerospace Propulsion',
  'AAE 352: Structures',
  'AAE 364: Control System Analysis',
  'AAE 421: Flight Dynamics',
  'AAE 514: Intermediate Aerodynamics',
  'AAE 550: Multidisciplinary Design Optimization',
  'Data Structures and Algorithms',
  'Material Sciences',
  'Python Programming',
  'Introduction to Computer Science',
  'Microeconomics',
  'Macroeconomics'
];

// EDIT TEXT HERE: Highlight cards shown in the "Highlights" view.
// BLOCK GROUP: Each object below is one highlight card; add another by copying an object.
const highlights = [
  {
    course: 'MFET 163: Graphical Communication And Spatial Analysis',
    description: 'Designed a single piston sterling engine and guided fellow students in creating the part hierarchy and using the CAD and PLM software effectively.',
    reportLink: 'https://1drv.ms/b/c/283cc4cea2648e6d/ETVOCy8aWolPmrJ0B57ikxoB4e725xDsJ0VqnWJDkVty1A?e=yKYg4z'
  },
  {
    course: 'AAE 412: Computational Fluid Dynamics',
    description: 'Simulated the performance of a car using an Ahmed Body approximation. Looked at the effect of different slant angles on drag, downforce and overall car behavior.',
    reportLink: 'https://1drv.ms/b/c/283cc4cea2648e6d/IQCuAfC-0OVNToe4aU7R4HdiAYk1XaGxYH36NZPu4yecjRw?e=dzhqSN'
  },
  {
    course: 'AAE 339: Aerospace Propulsion',
    description: 'Conducted an extensive literature survey on novel techniques within the Urban Air Mobility sector, focusing on Distributed Electric Propulsion (DEP) systems to reduce acoustic noise and optimize battery thermal management.',
    reportLink: 'https://1drv.ms/b/c/283cc4cea2648e6d/IQA6yHs1H-h6S7gXfrI9-l6AAdf22eKL4iGEPXAwWg3WuQU?e=wKxTTw'
  },
  {
    course: 'AAE 571: Complex System Safety',
    description: 'Performed accident-style analysis and wrote a conference-style research paper investigating the safety challenges and risk mitigation strategies for propulsion systems for urban air mobility vehicles (UAMs).',
    reportLink: 'https://1drv.ms/b/c/283cc4cea2648e6d/IQDoS6CLJZmyTJFwCmTZQf8gAZhJQr0ZtMoLTUnXOJUff_o?e=jtXzlR'
  },
  {
    course: 'AAE 251: Introduction to Aircraft and Spacecraft Design',
    description: 'Designed a non-human moon landing mission focusing on mission planning and spacecraft design.',
    reportLink: 'https://1drv.ms/b/c/283cc4cea2648e6d/EaaU4n7dqn5Gq8DKWYQnYa0Bfat58pDDkiVSCMbY4HNGxA?e=XGRMHE'
  },
  {
    course: 'AAE 33401: Aerodynamics Lab',
    description: 'Tested the shock characteristics of different supersonic airfoils (diamond airfoil, stepped wedge and delta wings).',
    reportLink: 'https://1drv.ms/b/c/283cc4cea2648e6d/EfYx6PGy7X1NhMFA_bwD54IB-X92LHwOIQAR5qcDGxLQug?e=EeUxUZ'
  },
  {
    course: 'AAE 33301: Fluid Mechanics Lab',
    description: 'Designed comprehensive aerodynamic experiments comparing drag characteristics of a Lamborghini Aventador, Cybertruck, and Ford F-350 through wind tunnel testing and computational fluid dynamics analysis.'
  },
  {
    course: 'AAE 421: Flight Dynamics',
    description: 'Developed a Simulink model over the semester for trim conditions and dynamics for the Cessna 182.'
  },
  {
    course: 'ENGR 130: From Ideas to Innovation',
    description: 'Designed a cost effective and advanced farming system for planting, watering and providing nutrients in an indoor vertical farming setting and for families in a garden setting.'
  }

];

export default function Academia() {
  const [activeView, setActiveView] = useState<'list' | 'highlights'>('highlights');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-teal-50 relative"
      style={{
        backgroundImage: `url('/images/Urban-Mobility.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="pt-20 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
              {/* EDIT TEXT HERE: Back button label */}
              <Link 
                href="/"
                className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors mb-6"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
              {/* EDIT TEXT HERE: Page title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Academic Coursework</h1>
              {/* EDIT TEXT HERE: Page intro paragraph */}
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive overview of my academic journey at Purdue University
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course List/Highlights */}
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  {/* EDIT TEXT HERE: Section title */}
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
                      {/* EDIT TEXT HERE: Tab label */}
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
                      {/* EDIT TEXT HERE: Tab label */}
                      Highlights
                    </button>
                  </div>
                </div>

                {activeView === 'list' ? (
                  {/* Layout tip: This is a vertical list. If you add many courses and want two columns, change this container to a grid and add something like md:grid-cols-2. */}
                  <div className="space-y-3">
                    {/* BLOCK GROUP: Each item comes from the courses array above. */}
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
                  {/* Layout tip: This is a vertical stack of highlight cards. If you add more and want two columns, change this container to a grid and add something like md:grid-cols-2. */}
                  <div className="space-y-6">
                    {/* BLOCK GROUP: Each item comes from the highlights array above. */}
                    {highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200"
                      >
                        <h3 className="text-lg font-semibold text-teal-800 mb-3">
                          {highlight.course}
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {highlight.description}
                        </p>
                        {(highlight as any).reportLink && (
                          <a
                            href={(highlight as any).reportLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Report on OneDrive
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Transcript */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
                {/* EDIT TEXT HERE: Section title */}
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
                    {/* EDIT TEXT HERE: Button label */}
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
                    {/* EDIT TEXT HERE: Button label */}
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
