'use client';

import { useRouter } from 'next/navigation';

export default function PurdueSpaceProgramPage() {
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
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Purdue Space Program</h1>
            <p className="text-lg text-gray-600 mb-6">
              Contributing to cutting-edge space exploration projects including rocket design, 
              satellite development, and mission planning for intercollegiate competitions and research initiatives.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-purple-100 text-purple-800 font-medium rounded-lg">Space Systems</span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 font-medium rounded-lg">Rocket Engineering</span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 font-medium rounded-lg">Mission Design</span>
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
                  multiple disciplines to work on advanced space exploration projects. The program encompasses 
                  various teams working on rocket propulsion, satellite systems, mission planning, and 
                  space technology development.
                </p>
                <p className="text-gray-700">
                  Our teams compete in national competitions like NASA USLI (University Student Launch Initiative), 
                  NASA BIG Idea Challenge, and various CubeSat development programs, while also conducting 
                  cutting-edge research in partnership with industry and government organizations.
                </p>
              </div>

              {/* My Contributions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Contributions</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Participated in rocket design and trajectory analysis for competition missions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Contributed to satellite subsystem design and integration planning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Conducted mission requirement analysis and system trade studies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Collaborated on propulsion system performance calculations and optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Assisted in ground testing and data analysis for rocket and satellite components</span>
                  </li>
                </ul>
              </div>

              {/* Program Highlights */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Program Highlights</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-gray-900">NASA USLI Competition</h3>
                    <p className="text-gray-600 text-sm">Designed and launched high-powered rockets with scientific payloads</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900">CubeSat Development</h3>
                    <p className="text-gray-600 text-sm">Developed small satellites for Earth observation and technology demonstration</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Industry Partnerships</h3>
                    <p className="text-gray-600 text-sm">Collaborated with aerospace companies on real-world space missions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Technical Areas */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technical Focus Areas</h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Rocket Propulsion</h3>
                    <p className="text-gray-700 text-sm">Solid and liquid propulsion systems, nozzle design, performance optimization</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Satellite Systems</h3>
                    <p className="text-gray-700 text-sm">Attitude control, power systems, communication, payload integration</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Mission Design</h3>
                    <p className="text-gray-700 text-sm">Orbital mechanics, trajectory optimization, mission planning and analysis</p>
                  </div>
                </div>
              </div>

              {/* Competitions & Achievements */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Competitions & Achievements</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">NASA USLI</h4>
                      <p className="text-sm text-gray-600">University Student Launch Initiative</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Participated</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">NASA BIG Idea Challenge</h4>
                      <p className="text-sm text-gray-600">Breakthrough, Innovative and Game-changing</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">Team Member</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">CubeSat Development</h4>
                      <p className="text-sm text-gray-600">Small satellite technology demonstration</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">Contributor</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Future Goals */}
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-semibold mb-4">Future Mission Goals</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">🚀</span>
                    <span>Advanced propulsion system development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">🛰️</span>
                    <span>Next-generation CubeSat missions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">🌌</span>
                    <span>Deep space exploration technologies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Skills Developed */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills Developed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Propulsion Analysis</h3>
                <p className="text-gray-600 text-sm">Rocket engine performance and design</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Orbital Mechanics</h3>
                <p className="text-gray-600 text-sm">Mission design and trajectory analysis</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Project Management</h3>
                <p className="text-gray-600 text-sm">Leading multidisciplinary space missions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}