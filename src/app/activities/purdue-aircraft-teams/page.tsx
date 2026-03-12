'use client';

import { useRouter } from 'next/navigation';

// Page: Purdue Aircraft Teams activity details
// EDIT TEXT HERE: Page copy is hardcoded in this file.
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
            
            {/* EDIT TEXT HERE: Page title */}
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">Purdue Aircraft Teams</h1>
            {/* EDIT TEXT HERE: Intro paragraph */}
            <p className="text-lg text-gray-600 mb-6">
              Active member of Purdue&apos;s aircraft design and competition teams, 
              participated in national competitions including AUVSI SUAS and AIAA Design/ Build/ Fly competitions. Currently, serving as the Chief engineer of the SAE Aero Design team in SAE Purdue.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {/* EDIT TEXT HERE: Tag labels */}
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Aircraft Design</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Competition</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Testing</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Leadership</span>
            </div>
          </div>

          {/* Test flight videos (shown before guide section) */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Test Flight Videos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mk1 Test Flight</h3>
                <p className="text-gray-600 text-sm mb-3">Mk1 proof of concept flight. The aircraft CG was incorrect, hence it was pitching way too much leading to an aborted mission.</p>
                <div className="w-full rounded-lg overflow-hidden border border-gray-200">
                  <video
                    controls
                    muted
                    className="w-full h-52"
                    src="/images/Mk1_flight.mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mk2 Test Flight</h3>
                <p className="text-gray-600 text-sm mb-3">Mk2 flight test. The first PSAEA aircraft to land without a rapid unscheduled disassembly.</p>
                <div className="w-full rounded-lg overflow-hidden border border-gray-200">
                  <video
                    controls
                    muted
                    className="w-full h-52"
                    src="/images/Mk2_flight.mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Competition Flight</h3>
                <p className="text-gray-600 text-sm mb-3">SAE Aero Design East competition flight — a successful landing and a proud milestone for the team.</p>
                <div className="w-full rounded-lg overflow-hidden border border-gray-200">
                  <video
                    controls
                    muted
                    className="w-full h-52"
                    src="/images/Flight-attempt2.mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - About and Contributions */}
            <div className="space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About my current SAE team</h2>
                <p className="text-gray-700 mb-4">
                  The SAE Aero team has been active for the past 2 years with the following academic year being it's third year.
                  The team competes in the SAE Aero Design Regular Class Category.
                </p>
                <p className="text-gray-700">
                  These competitions challenge me to apply theoretical knowledge to real-world aircraft design 
                  problems, from conceptual design through manufacturing and flight testing, continuously adapting to challenges such as while manufacturing.
                </p>
              </div>

              {/* My Contributions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Contributions</h2>
                {/* Layout tip: This is a vertical list. If you add many items and want two columns, change this container to a grid and add something like md:grid-cols-2. */}
                <ul className="space-y-3">
                  {/* BLOCK GROUP: Each list item is one contribution; add another by copying a list item. */}
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Currently leading technical development for 3 sub teams by reviewing trade studies and ensuring milestones are being met in SAE Aero.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Participated in flight testing and data analysis for performance validation.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Mentoring newer team members in aircraft design principles and designed an onboarding project for new members. Currently working on designing an conceptual aircraft design certification course for non-aero majors along with freshman and sophomores</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Helping expand the club to the next level by creating a business team for sponsorships, publicity and budgeting for a secure club future.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">Applied engineering solutions to resolve manufacturing issues of molds, carbon fiber, and internal structures at the Purdue Aerial Robotics Team.</span>
                  </li>
                </ul>
              </div>

              {/* Competition Highlights */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Competition Highlights</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900">SAE Aero Design (Chief Engineer)</h3>
                    <p className="text-gray-600 text-sm">May 2025 - Present</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Purdue Aerial Robotics Team (Aerodynamics Engineer)</h3>
                    <p className="text-gray-600 text-sm">AY2023-2024</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Purdue Design/Build/Fly</h3>
                    <p className="text-gray-600 text-sm">AY2022-2023</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - PDF Document */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">RC Aircraft Conceptual Guide</h2>
              <p className="text-gray-600 mb-4">
                A comprehensive initial guide made by me for freshmen/ sophomores to aid in understanding concepts related to designing and manufacturing RC aircrafts.
              </p>
              
              {/* Download and Open Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a 
                  href="/Understanding-RC_Aircrafts.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Guide
                </a>
                <a 
                  href="/Understanding-RC_Aircrafts.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open in New Tab
                </a>
              </div>
              
              {/* PDF Embed */}
              <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden bg-white">
                <iframe
                  src="/Understanding-RC_Aircrafts.pdf#view=FitH&scrollbar=0&toolbar=0&navpanes=0"
                  className="w-full h-full border-0"
                  title="Understanding RC Aircrafts Guide"
                  style={{ display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills Developed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Manufacturing</h3>
                <p className="text-gray-600 text-sm">Troubleshooting manufacturing problems in real-time</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Team Leadership</h3>
                <p className="text-gray-600 text-sm">Leading technical teams and mentoring junior members</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Aerodynamic Analysis</h3>
                <p className="text-gray-600 text-sm">Using XFLR5 for airfoil and wing analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
