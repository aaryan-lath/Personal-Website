'use client';

import { useRouter } from 'next/navigation';

export default function ZucrowResearchPage() {
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
              Back to Research
            </button>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Zucrow Research</h1>
            <p className="text-lg text-gray-600 mb-6">
              Working at Prof. Nicole Key's High Speed Compressor lab from August 2025 - Present conducting research on inlet vortex distortion.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Inlet Vortex Distortion</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Test Cell Assembly</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Manufacturing Techniques</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Research Content */}
            <div className="space-y-6">
              {/* Research Overview */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Overview</h2>
                <p className="text-gray-700 mb-4">
                  Research at the Zucrow Laboratories focuses on advanced propulsion and turbomachinery systems. 
                  Working under Prof. Nicole Key, my research investigates inlet vortex distortion phenomena 
                  and their effects on turbomachinery performance.
                </p>
                <p className="text-gray-700">
                  The work involves both experimental setup and testing, which includes designing and figuring manufacturing techniques for the parts.
                </p>
              </div>

              {/* Research Areas */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Research Areas</h2>
                <ul className="space-y-3">
                    <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Experimental Design:</span>
                      <span className="text-gray-700 ml-2">Developing test methodologies</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Manufacturing Techniques:</span>
                      <span className="text-gray-700 ml-2">Working on manufacturing techniques to build parts effectively for research apparatus</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Inlet Vortex Distortion:</span>
                      <span className="text-gray-700 ml-2">Investigating the effects of inlet distortion on turbomachinery performance</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Applications */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Jet Engines</h3>
                    <p className="text-gray-700 text-sm">Gives insight on inlet design for commercial and military aircraft engines</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Aerospace Propulsion</h3>
                    <p className="text-gray-700 text-sm">Next-generation propulsion capabilities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Research Tools */}
            <div className="space-y-6">
              {/* Research Tools */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Tools & Equipment</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Fan-Rig Test Cell</h3>
                    <p className="text-gray-600 text-sm">Advanced turbomachinery testing facility for inlet distortion research</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Manufacturing Equipment</h3>
                    <p className="text-gray-600 text-sm">Precision manufacturing tools for research component fabrication</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Calibration Systems</h3>
                    <p className="text-gray-600 text-sm">High-precision measurement and calibration equipment</p>
                  </div>
                </div>
              </div>

              {/* Current Work */}
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-semibold mb-4">Current Research Focus</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">⚙️</span>
                    <span>Looking into cost-effective manufacturing techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">🌪️</span>
                    <span>Inlet vortex distortion characterization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">📊</span>
                    <span>Performance data collection and analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Research Tools & Software */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Software & Tools</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">MATLAB/Simulink</h4>
                <p className="text-xs text-gray-600">Data analysis & system modeling</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Manufacturing Equipment</h4>
                <p className="text-xs text-gray-600">Precision fabrication tools</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Siemens NX</h4>
                <p className="text-xs text-gray-600">Designing assemblies/ parts for the test cell</p>
              </div>
            </div>
          </div>

          {/* Research Impact & Skills */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills & Competencies Developed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Equipment Assembly</h3>
                <p className="text-gray-600 text-sm">Test cell assembly and calibration expertise</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Manufacturing</h3>
                <p className="text-gray-600 text-sm">Advanced manufacturing techniques and processes</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Flow Analysis</h3>
                <p className="text-gray-600 text-sm">Inlet distortion and turbomachinery flow research</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Testing</h3>
                <p className="text-gray-600 text-sm">Experimental design and data collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}