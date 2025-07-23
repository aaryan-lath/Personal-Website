'use client';

import { useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import ParallaxSection from '../components/ParallaxSection';
import ResearchBox from '../components/ResearchBox';

export default function Home() {
  useEffect(() => {
    // Ensure page starts at top and prevent scroll restoration
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    }
  }, []);
  return (
    <main>
      <ParallaxSection 
        backgroundImage="/images/wallpaper.jpg" 
        height="min-h-screen"
        speed={0.3}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.5}
      >
        <section id="home" className="min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="mb-8">
                  <img 
                    src="/images/profile.jpeg" 
                    alt="Aaryan Lath" 
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white/20 shadow-lg object-cover"
                  />
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                  Aaryan Lath
                </h1>
                <p className="text-xl sm:text-2xl text-white/90 mb-8 drop-shadow-md">
                  Aspiring Aerospace Engineer
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mb-12 drop-shadow-md">
                  Aeronautical and Astronautical Engineering student at Purdue University, 
                  passionate about pushing the boundaries of flight and space exploration through 
                  innovative design and cutting-edge technology.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection 
        backgroundImage="/images/projects-bg.jpg" 
        height="auto"
        speed={0.2}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.3}
      >
        <section id="projects" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Engineering Projects
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full shadow-lg"></div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div style={{ animationDelay: '0.1s' }}>
              <ProjectCard
              title="Bypass Engine Assembly"
              description="Complete turbofan engine design with bypass ratio optimization and performance analysis using advanced CAD modeling."
              modelUrl="/models/bypass-engine_asm.gltf"
              coverImage="/images/projects/bypass-engine/I_1-1.png"
              technologies={['Creo Parametric', 'CFD Analysis', 'Assembly Design']}
              details={[
                'Full 3D parametric engine assembly',
                'Bypass ratio optimization studies',
                'Component integration and interference checking',
                'Performance parameter calculations',
                'View complete project files and documentation'
              ]}
              images={[
                '/images/projects/bypass-engine/I_1-1.png',
                '/images/projects/bypass-engine/I_2-1.png',
                '/images/projects/bypass-engine/I_3-1.png',
                '/images/projects/bypass-engine/I_4-1.png',
                '/images/projects/bypass-engine/I_5-1.png',
                '/images/projects/bypass-engine/I_6-1.png',
                '/images/projects/bypass-engine/I_7-1.png',
                '/images/projects/bypass-engine/I_8-1.png',
                '/images/projects/bypass-engine/I_9-1.png',
                '/images/projects/bypass-engine/I_10-14-1.png',
                '/images/projects/bypass-engine/I_15-19-1.png',
                '/images/projects/bypass-engine/I_20-1.png',
                '/images/projects/bypass-engine/I_21-1.png',
                '/images/projects/bypass-engine/I_22-1.png',
                '/images/projects/bypass-engine/I_23-1.png',
                '/images/projects/bypass-engine/I_24-1.png',
                '/images/projects/bypass-engine/I_25-1.png',
                '/images/projects/bypass-engine/I_26-1.png',
                '/images/projects/bypass-engine/I_27-1.png',
                '/images/projects/bypass-engine/I_28-1.png',
                '/images/projects/bypass-engine/I_29-1.png'
              ]}
              driveLink="https://drive.google.com/drive/folders/1YvP0y6VeKu272bYDfjWAH_8lNDM67dvP?usp=sharing"
              driveLinkText="View Bypass Engine Project Files"
              />
            </div>
            <div style={{ animationDelay: '0.3s' }}>
              <ProjectCard
              title="BoilerBus Transportation System"
              description="Comprehensive transit vehicle design with passenger optimization and route efficiency analysis for campus transportation."
              modelUrl="/models/BoilerBus.gltf"
              technologies={['Fusion 360', 'Simulation', 'Design Optimization']}
              details={[
                'Complete vehicle chassis design',
                'Passenger capacity optimization',
                'Structural analysis and safety factors',
                'Route efficiency considerations',
                'Manufacturing feasibility studies'
              ]}
              />
            </div>
            <div style={{ animationDelay: '0.5s' }}>
              <ProjectCard
              title="Advanced Mechanical Systems"
              description="Collection of complex mechanical engineering projects showcasing design versatility and technical proficiency."
              technologies={['Siemens NX', 'Creo', 'Fusion 360']}
              details={[
                'Multi-platform CAD proficiency demonstration',
                'Complex assembly design and analysis',
                'Design for manufacturing principles',
                'Advanced surfacing and modeling techniques',
                'Cross-platform file compatibility studies'
              ]}
              driveLink="https://drive.google.com/drive/folders/1YvP0y6VeKu272bYDfjWAH_8lNDM67dvP?usp=sharing"
              driveLinkText="View Other CAD Projects"
              />
            </div>
          </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection 
        backgroundImage="/images/falcon-fog.png" 
        height="auto"
        speed={0.15}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.4}
      >
        <section id="research" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Research Work
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full shadow-lg"></div>
            </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ResearchBox
              title="Systems Engineering Research"
              description="Investigating complex aerospace systems integration and optimization for next-generation aircraft and spacecraft applications."
              points={[
                'Multi-disciplinary system optimization',
                'Requirements analysis and verification',
                'System lifecycle management',
                'Risk assessment and mitigation strategies',
                'Performance trade-off analysis'
              ]}
              side="left"
              bgColor="bg-white"
            />
            <ResearchBox
              title="Turbomachinery Research"
              description="Exploring advanced turbomachinery designs for improved efficiency and performance in aerospace propulsion systems."
              points={[
                'Compressor and turbine blade design',
                'Flow analysis and optimization',
                'Heat transfer and cooling strategies',
                'Performance modeling and testing',
                'Advanced materials applications'
              ]}
              side="right"
              bgColor="bg-white"
            />
          </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection 
        backgroundImage="/images/activities-bg.jpeg" 
        height="min-h-screen"
        speed={0.1}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.2}
      >
        <section id="activities" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Extracurricular Activities
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full shadow-lg"></div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Purdue Aircraft Teams</h3>
              <p className="text-gray-700 mb-4">
                Active member of Purdue&apos;s premier aircraft design and competition teams, 
                participating in national competitions including SAE Aero Design and AIAA Design competitions.
              </p>
              <div className="text-sm text-blue-600 font-medium">
                Aircraft Design • Competition • Testing • Leadership
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Purdue Space Program</h3>
              <p className="text-gray-700 mb-4">
                Contributing to cutting-edge space exploration projects including rocket design, 
                satellite development, and mission planning for intercollegiate competitions and research initiatives.
              </p>
              <div className="text-sm text-purple-600 font-medium">
                Space Systems • Rocket Engineering • Mission Design • Collaboration
              </div>
            </div>
          </div>
          </div>
        </section>
      </ParallaxSection>

      <section id="resume" className="py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            Resume
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a 
                href="/Aaryan-Lath_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
              <a 
                href="/Aaryan-Lath_Resume.pdf" 
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
            <div className="w-full h-[800px] border border-gray-300 rounded-lg overflow-hidden">
              <iframe
                src="/Aaryan-Lath_Resume.pdf"
                className="w-full h-full"
                title="Aaryan Lath Resume"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-300 mb-12">
            Interested in aerospace engineering collaboration or have questions about my work?
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="mailto:aaryanlath05@gmail.com" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Send Email
            </a>
            <a 
              href="https://www.linkedin.com/in/aaryan-lath/" 
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
