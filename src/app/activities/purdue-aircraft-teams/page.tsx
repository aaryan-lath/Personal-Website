'use client';

import { useRouter } from 'next/navigation';

export default function PurdueAircraftTeamsPage() {
  const router = useRouter();

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
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Purdue Aircraft Teams</h1>
            <p className="text-lg text-gray-600 mb-6">
              Active member of Purdue&apos;s premier aircraft design and competition teams, 
              participating in national competitions including SAE Aero Design and AIAA Design competitions.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Aircraft Design</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Competition</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Testing</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Leadership</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - About and Contributions */}
            <div className="space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About the Teams</h2>
                <p className="text-gray-700 mb-4">
                  Purdue Aircraft Teams brings together passionate aerospace engineering students to design, 
                  build, and test aircraft for various national competitions. Our teams compete in prestigious 
                  events like the SAE Aero Design Competition and AIAA Design/Build/Fly Competition.
                </p>
                <p className="text-gray-700">
                  These competitions challenge us to apply theoretical knowledge to real-world aircraft design 
                  problems, from conceptual design through manufacturing and flight testing.
                </p>
              </div>

              {/* My Contributions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Contributions</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Led drag analysis studies for competition aircraft design optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Conducted computational fluid dynamics (CFD) analysis for wing and fuselage design</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Collaborated on aircraft weight optimization and performance calculations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Participated in flight testing and data analysis for performance validation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Mentored newer team members in aircraft design principles and analysis techniques</span>
                  </li>
                </ul>
              </div>

              {/* Competition Highlights */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Competition Highlights</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900">SAE Aero Design Competition</h3>
                    <p className="text-gray-600 text-sm">Designed and built radio-controlled aircraft for maximum payload capacity</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-900">AIAA Design/Build/Fly</h3>
                    <p className="text-gray-600 text-sm">Developed aircraft meeting specific mission requirements and scoring criteria</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - PDF Document */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technical Reference</h2>
              <p className="text-gray-600 mb-4">
                Aircraft Drag Analysis - A comprehensive study on drag components and optimization techniques 
                used in our aircraft design process.
              </p>
              
              {/* PDF Embed */}
              <div className="flex-1 min-h-0 mb-4">
                <iframe
                  src="/Chapter-16---Aircraft-Drag-Analysis_2022_General-Aviation-Aircraft-Design.pdf"
                  title="Aircraft Drag Analysis Document"
                  width="100%"
                  height="600"
                  className="border rounded-lg"
                />
              </div>
              
              {/* PDF Download Link */}
              <div>
                <a
                  href="/Chapter-16---Aircraft-Drag-Analysis_2022_General-Aviation-Aircraft-Design.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Skills Developed */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills Developed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Design Optimization</h3>
                <p className="text-gray-600 text-sm">Aircraft configuration and performance optimization techniques</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Analysis</h3>
                <p className="text-gray-600 text-sm">Flight test data interpretation and performance analysis</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Team Leadership</h3>
                <p className="text-gray-600 text-sm">Leading technical teams and mentoring junior members</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}