'use client';

import { useRouter } from 'next/navigation';

export default function TurbomachineryResearchPage() {
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
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Turbomachinery Research</h1>
            <p className="text-lg text-gray-600 mb-6">
              Exploring advanced turbomachinery designs for improved efficiency and performance 
              in aerospace propulsion systems.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-red-100 text-red-800 font-medium rounded-lg">Blade Design</span>
              <span className="px-4 py-2 bg-red-100 text-red-800 font-medium rounded-lg">Flow Analysis</span>
              <span className="px-4 py-2 bg-red-100 text-red-800 font-medium rounded-lg">Heat Transfer</span>
              <span className="px-4 py-2 bg-red-100 text-red-800 font-medium rounded-lg">Performance</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Research Content */}
            <div className="space-y-6">
              {/* Research Overview */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Overview</h2>
                <p className="text-gray-700 mb-4">
                  Turbomachinery research focuses on the design, analysis, and optimization of rotating 
                  machinery components in aerospace propulsion systems. This includes compressors, turbines, 
                  and their associated flow paths, with emphasis on improving efficiency, performance, and durability.
                </p>
                <p className="text-gray-700">
                  My research investigates innovative approaches to turbomachinery design, advanced cooling 
                  strategies, and computational methods for predicting and optimizing turbomachine performance 
                  across various operating conditions.
                </p>
              </div>

              {/* Research Areas */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Research Areas</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Compressor and Turbine Blade Design:</span>
                      <span className="text-gray-700 ml-2">Advanced blade geometries and aerodynamic optimization for enhanced performance</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Flow Analysis and Optimization:</span>
                      <span className="text-gray-700 ml-2">Computational fluid dynamics analysis of complex turbomachinery flows</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Heat Transfer and Cooling Strategies:</span>
                      <span className="text-gray-700 ml-2">Innovative cooling methods for high-temperature turbine applications</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Performance Optimization:</span>
                      <span className="text-gray-700 ml-2">Multi-objective optimization of turbomachinery components and systems</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Technical Challenges */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technical Challenges</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-semibold text-gray-900">High-Temperature Operations</h3>
                    <p className="text-gray-600 text-sm">Managing extreme thermal conditions in modern gas turbines</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Complex Flow Phenomena</h3>
                    <p className="text-gray-600 text-sm">Understanding secondary flows, tip leakage, and unsteady effects</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Multi-disciplinary Optimization</h3>
                    <p className="text-gray-600 text-sm">Balancing aerodynamic, thermal, and structural requirements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Applications and Tools */}
            <div className="space-y-6">
              {/* Applications */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Applications</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Commercial Aviation</h3>
                    <p className="text-gray-700 text-sm">High-bypass turbofan engines for improved fuel efficiency</p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Military Propulsion</h3>
                    <p className="text-gray-700 text-sm">High-performance engines for fighter aircraft and UAVs</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Space Propulsion</h3>
                    <p className="text-gray-700 text-sm">Turbopumps for liquid rocket engines</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Power Generation</h3>
                    <p className="text-gray-700 text-sm">Industrial gas turbines for electricity generation</p>
                  </div>
                </div>
              </div>

              {/* Research Methods */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Methods</h2>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Computational Fluid Dynamics</h4>
                      <p className="text-xs text-gray-600">ANSYS CFX, FLUENT, OpenFOAM</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Experimental Testing</h4>
                      <p className="text-xs text-gray-600">Wind tunnel and rig testing</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Optimization Algorithms</h4>
                      <p className="text-xs text-gray-600">Genetic algorithms, gradient-based methods</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Heat Transfer Analysis</h4>
                      <p className="text-xs text-gray-600">Conjugate heat transfer modeling</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-semibold mb-4">Key Performance Metrics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">η</div>
                    <div className="text-sm">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">Δp</div>
                    <div className="text-sm">Pressure Rise</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">TET</div>
                    <div className="text-sm">Turbine Entry Temp</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">SFC</div>
                    <div className="text-sm">Specific Fuel Consumption</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Research Tools & Future Directions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Software & Tools */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Software & Tools</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-900 mb-1">ANSYS CFX</h4>
                  <p className="text-xs text-gray-600">Turbomachinery CFD</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-gray-900 mb-1">NUMECA</h4>
                  <p className="text-xs text-gray-600">Specialized turbo tools</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-gray-900 mb-1">MATLAB</h4>
                  <p className="text-xs text-gray-600">Performance analysis</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-1">Python</h4>
                  <p className="text-xs text-gray-600">Data analysis & ML</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-1">CATIA/SolidWorks</h4>
                  <p className="text-xs text-gray-600">3D modeling</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-1">LabVIEW</h4>
                  <p className="text-xs text-gray-600">Experimental control</p>
                </div>
              </div>
            </div>

            {/* Future Directions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Future Research Directions</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">🔥</span>
                  <div>
                    <span className="font-semibold text-gray-900">Advanced Materials Integration</span>
                    <p className="text-gray-600 text-sm">Ceramic matrix composites and superalloys</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">🤖</span>
                  <div>
                    <span className="font-semibold text-gray-900">Machine Learning Applications</span>
                    <p className="text-gray-600 text-sm">AI-driven design optimization</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-3 mt-1">⚡</span>
                  <div>
                    <span className="font-semibold text-gray-900">Additive Manufacturing</span>
                    <p className="text-gray-600 text-sm">3D printed turbomachinery components</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">🌱</span>
                  <div>
                    <span className="font-semibold text-gray-900">Sustainable Propulsion</span>
                    <p className="text-gray-600 text-sm">Hydrogen and electric turbomachinery</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Skills Developed */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills & Competencies Developed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">CFD Analysis</h3>
                <p className="text-gray-600 text-sm">Advanced computational fluid dynamics modeling</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Thermal Design</h3>
                <p className="text-gray-600 text-sm">Heat transfer and cooling system design</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Performance Analysis</h3>
                <p className="text-gray-600 text-sm">Engine cycle analysis and optimization</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Experimental Methods</h3>
                <p className="text-gray-600 text-sm">Test rig design and data acquisition</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}