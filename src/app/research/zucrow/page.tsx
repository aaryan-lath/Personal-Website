'use client';

import { useRouter } from 'next/navigation';

// Page: Other research highlights (MDO + Zucrow)
// EDIT TEXT HERE: Page copy is hardcoded in this file.
export default function OtherResearchPage() {
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

            {/* EDIT TEXT HERE: Page title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Indulgements</h1>
            {/* EDIT TEXT HERE: Intro paragraph */}
            <p className="text-lg text-gray-600 mb-6">
              A snapshot of my ongoing work across multidisciplinary aircraft design optimization and propulsion lab experimentation.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">MDO Framework Development</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Conceptual Aircraft Design</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg">Compressor Lab Experimentation</span>
            </div>
          </div>

          {/* MDO section (primary) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - MDO details */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Multidisciplinary Design Optimization (MDO) Research</h2>
                <p className="text-gray-700 mb-4">
                  My current work centers on developing an MDO algorithm for rapid electric aircraft conceptual design.
                  This framework was also used by the Purdue SAE Aero Design Team during the competition aircraft
                  conceptual design stage to compare configurations and make faster design decisions.
                </p>
                <p className="text-gray-700">
                  The objective is to connect sizing, performance, and mission-level constraints in one modular workflow so
                  early design iterations remain rigorous while still moving quickly.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Focus &amp; Tools</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Algorithm Development:</span>
                      <span className="text-gray-700 ml-2">Building a modular MDO architecture for electric aircraft design trades</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Competition Aircraft Integration:</span>
                      <span className="text-gray-700 ml-2">Applied the framework to the Purdue SAE Aero Design Team&apos;s conceptual design workflow</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Core Toolchain:</span>
                      <span className="text-gray-700 ml-2">Python/MATLAB for optimization loops, sensitivity checks, and design-space exploration</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold text-gray-900">Outcome:</span>
                      <span className="text-gray-700 ml-2">Abstract accepted to AIAA Aviation Forum 2026 on a modular MDO framework</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Extended abstract PDF */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Extended Abstract</h2>
                <p className="text-gray-700 mb-4">
                  Submitted abstract documenting the MDO framework and conceptual design application.
                </p>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    src="/ExtendedAbstract.pdf"
                    title="MDO Extended Abstract"
                    className="w-full h-[520px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Zucrow section (secondary) */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Zucrow Compressor Lab Research</h2>
            <p className="text-gray-700 mb-6">
              At Prof. Nicole Key&apos;s High Speed Compressor Lab (Fall 2025 onward), I contributed to inlet vortex
              distortion studies and experimental hardware readiness, including fan-rig assembly and calibration support.
            </p>
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Research Focus &amp; Tools</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                <li className="border border-gray-200 bg-white rounded-lg p-3">Inlet vortex distortion characterization</li>
                <li className="border border-gray-200 bg-white rounded-lg p-3">Fan-rig test cell assembly and calibration</li>
                <li className="border border-gray-200 bg-white rounded-lg p-3">Manufacturing techniques for research hardware</li>
                <li className="border border-gray-200 bg-white rounded-lg p-3">Siemens NX and MATLAB for design support and analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
