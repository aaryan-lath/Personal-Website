'use client';

import { useRouter } from 'next/navigation';

export default function RETHiResearchPage() {
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
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resilient Extraterrestrial Habitat Institute (RETHi)</h1>
            <p className="text-lg text-gray-600 mb-6">
              Worked on 2 projects from the Summer of 2024 to Spring 2025: Systems Engineering which entails performing trade studies to evaluate safety controls by assessing the cost and habitat resilience on a disruption on the lunar habitat. Vibration Isolation which included conducting FEA simulations to test the loads on the device and conduction tensile tests on the Vectran straps with different stitching patterns.
            </p>
            <div className="mb-6">
              <a 
                href="https://www.purdue.edu/rethi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Learn more about the RETHi project
              </a>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Trade Studies</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Safety Control Evaluation</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Vibration Isolation</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">FEA Simulations</span>
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
                  The Resilient Extraterrestrial Habitat Institute (RETHi) focuses on developing sustainable 
                  and resilient habitats for long-duration space missions. My research contributed to two 
                  critical areas: systems engineering for safety evaluation and vibration isolation systems.
                </p>
                <p className="text-gray-700">
                  Through trade studies and experimental testing, this research advances our understanding 
                  of how to design robust habitat systems that can withstand and recover from various 
                  disruptions in the challenging extraterrestrial environment.
                </p>
              </div>

              {/* Research Areas */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Research Areas</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Trade Studies for Safety Controls:</span>
                      <span className="text-gray-700 ml-2">Evaluating safety control systems by assessing cost vs. habitat resilience</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Lunar Habitat Disruption Analysis:</span>
                      <span className="text-gray-700 ml-2">Analyzing various disruption scenarios and their impact on habitat systems</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">FEA Simulations:</span>
                      <span className="text-gray-700 ml-2">Conducting finite element analysis to test structural loads on vibration isolation devices</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Vectran Strap Testing:</span>
                      <span className="text-gray-700 ml-2">Tensile testing of Vectran straps with different stitching patterns for optimization</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Applications */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Lunar Habitats</h3>
                    <p className="text-gray-700 text-sm">Long-duration habitat systems for lunar missions</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Mars Missions</h3>
                    <p className="text-gray-700 text-sm">Resilient habitat design for Mars exploration</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Vibration Control</h3>
                    <p className="text-gray-700 text-sm">Isolation systems for sensitive equipment protection</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Safety Systems</h3>
                    <p className="text-gray-700 text-sm">Risk mitigation and safety control optimization</p>
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
                  RETHi Research Poster - Presented at academic conferences showcasing 
                  methodologies and findings in extraterrestrial habitat resilience.
                </p>
                
                {/* PDF Embed */}
                <div className="flex-1 min-h-0 mb-4">
                  <iframe
                    src="/Lath_Aaryan_Poster-Presentation.pdf"
                    title="RETHi Research Poster"
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
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mr-4"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Poster
                  </a>
                  <a
                    href="https://1drv.ms/p/c/283cc4cea2648e6d/EZNhc5MUGb5JigK2ys5z7HIBYxA-ccMt8rphOF5wZlL4DA?e=N3jpG8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View on OneDrive
                  </a>
                </div>
              </div>

              {/* Additional Presentations */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Presentations</h2>
                <div className="space-y-4">
                  {/* Spring Presentation */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Spring Research Presentation</h3>
                        <p className="text-gray-600 text-sm">Comprehensive overview of RETHi research methodologies and findings</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href="/Spring_Presentation-Talk.pptx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </a>
                      <a
                        href="https://1drv.ms/p/c/283cc4cea2648e6d/EZNhc5MUGb5JigK2ys5z7HIBYxA-ccMt8rphOF5wZlL4DA?e=N3jpG8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View on OneDrive
                      </a>
                    </div>
                  </div>

                  {/* Disruption Scenarios */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Disruption Scenarios Analysis</h3>
                        <p className="text-gray-600 text-sm">Case studies and analysis of lunar habitat disruption scenarios and resilience strategies</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href="/Disruption-Scenarios.pptx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </a>
                      <a
                        href="https://1drv.ms/p/c/283cc4cea2648e6d/EfyF0n8JTetMtJynkM1EOlkBQstha6Wsc4CKnTYOEtl5FQ?e=GiOFrA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View on OneDrive
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
                  <h4 className="font-semibold text-gray-900 mb-1">FEA Software</h4>
                  <p className="text-xs text-gray-600">Structural analysis</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">Testing Equipment</h4>
                  <p className="text-xs text-gray-600">Tensile testing apparatus</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">Trade Study Tools</h4>
                  <p className="text-xs text-gray-600">Cost-benefit analysis</p>
                </div>
              </div>
            </div>

            {/* Future Work */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-semibold mb-4">Future Research Directions</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3 mt-1">🚀</span>
                  <span>AI-driven habitat optimization techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">📊</span>
                  <span>Advanced uncertainty quantification methods</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">🌐</span>
                  <span>Multi-habitat system architecture optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">🔧</span>
                  <span>Advanced vibration isolation technologies</span>
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
                <h3 className="font-semibold text-gray-900 mb-2">Trade Studies</h3>
                <p className="text-gray-600 text-sm">Cost-benefit analysis and system optimization</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">FEA Analysis</h3>
                <p className="text-gray-600 text-sm">Finite element analysis and structural testing</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Testing</h3>
                <p className="text-gray-600 text-sm">Experimental design and materials testing</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Systems Design</h3>
                <p className="text-gray-600 text-sm">Habitat system architecture and integration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}