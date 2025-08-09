'use client';

import { useRouter } from 'next/navigation';

export default function SystemsEngineeringResearchPage() {
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
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Systems Engineering Research</h1>
            <p className="text-lg text-gray-600 mb-6">
              Investigating complex aerospace systems integration and optimization for next-generation 
              aircraft and spacecraft applications.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Multi-disciplinary Optimization</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Requirements Analysis</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">System Lifecycle</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Integration</span>
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
                  Systems engineering research focuses on the methodical design and management of complex 
                  systems throughout their lifecycles. In aerospace applications, this involves integrating 
                  multiple subsystems, disciplines, and stakeholders to achieve optimal system performance.
                </p>
                <p className="text-gray-700">
                  My research explores innovative approaches to systems integration, optimization techniques, 
                  and methodologies for managing complexity in next-generation aerospace vehicles.
                </p>
              </div>

              {/* Research Areas */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Research Areas</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Multi-disciplinary System Optimization:</span>
                      <span className="text-gray-700 ml-2">Developing frameworks for optimizing complex aerospace systems across multiple engineering disciplines</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Requirements Analysis and Verification:</span>
                      <span className="text-gray-700 ml-2">Creating robust methodologies for capturing, analyzing, and validating system requirements</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">System Lifecycle Management:</span>
                      <span className="text-gray-700 ml-2">Investigating approaches to manage systems from conception through retirement</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Complex System Integration:</span>
                      <span className="text-gray-700 ml-2">Developing strategies for integrating heterogeneous subsystems and technologies</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Applications */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Aircraft Systems</h3>
                    <p className="text-gray-700 text-sm">Integration of propulsion, avionics, and structural systems</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Spacecraft Design</h3>
                    <p className="text-gray-700 text-sm">Multi-mission platform optimization and subsystem integration</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">UAV Systems</h3>
                    <p className="text-gray-700 text-sm">Autonomous system integration and mission optimization</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Ground Systems</h3>
                    <p className="text-gray-700 text-sm">Mission control and support system integration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Research Presentations */}
            <div className="space-y-6">
              {/* Research Poster */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Poster</h2>
                <p className="text-gray-600 mb-4">
                  Systems Engineering Research Poster - Presented at academic conferences showcasing 
                  methodologies and findings in aerospace systems integration.
                </p>
                
                {/* PDF Embed */}
                <div className="flex-1 min-h-0 mb-4">
                  <iframe
                    src="/Lath_Aaryan_Poster-Presentation.pdf"
                    title="Systems Engineering Research Poster"
                    width="100%"
                    height="400"
                    className="border rounded-lg"
                  />
                </div>
                
                {/* PDF Download Link */}
                <div>
                  <a
                    href="/Lath_Aaryan_Poster-Presentation.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Poster
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Additional Presentations */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Presentations</h2>
                <div className="space-y-4">
                  {/* Spring Presentation */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Spring Research Presentation</h3>
                        <p className="text-gray-600 text-sm">Comprehensive overview of systems engineering methodologies and research findings</p>
                      </div>
                      <a
                        href="/Spring_Presentation-Talk.pptx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
                        </svg>
                        PowerPoint
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Disruption Scenarios */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Disruption Scenarios Analysis</h3>
                        <p className="text-gray-600 text-sm">Case studies and analysis of system disruption scenarios and resilience strategies</p>
                      </div>
                      <a
                        href="/Disruption-Scenarios.pptx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
                        </svg>
                        PowerPoint
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Research Tools & Methodologies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Tools & Software */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Tools & Software</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">MATLAB/Simulink</h4>
                  <p className="text-xs text-gray-600">System modeling & simulation</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">DOORS</h4>
                  <p className="text-xs text-gray-600">Requirements management</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">SysML</h4>
                  <p className="text-xs text-gray-600">Systems modeling language</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">CORE</h4>
                  <p className="text-xs text-gray-600">Systems engineering</p>
                </div>
              </div>
            </div>

            {/* Future Work */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-semibold mb-4">Future Research Directions</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3 mt-1">🚀</span>
                  <span>AI-driven systems optimization techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">🔗</span>
                  <span>Digital twin integration for complex systems</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">📊</span>
                  <span>Advanced uncertainty quantification methods</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">🌐</span>
                  <span>System-of-systems architecture optimization</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Research Impact & Skills */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills & Competencies Developed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">System Architecture</h3>
                <p className="text-gray-600 text-sm">Complex system design and architecture development</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Optimization</h3>
                <p className="text-gray-600 text-sm">Multi-objective optimization and trade-off analysis</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Verification</h3>
                <p className="text-gray-600 text-sm">System verification and validation methodologies</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Integration</h3>
                <p className="text-gray-600 text-sm">Cross-functional team leadership and integration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}