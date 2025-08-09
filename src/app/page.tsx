'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectCard from '../components/ProjectCard';
import ParallaxSection from '../components/ParallaxSection';
import ResearchBox from '../components/ResearchBox';

// Timeline data with grouped images
const timelineEvents = [
  {
    id: 1,
    title: 'Conference Presentations',
    date: 'Fall 2024',
    description: 'Presenting research findings and project developments at multiple aerospace conferences',
    bgColor: 'bg-orange-50 hover:bg-orange-100',
    images: [
      '/images/timeline/656A9644.jpg',
      '/images/timeline/656A9829.jpg'
    ]
  },
  {
    id: 2,
    title: 'Team Collaboration',
    date: 'October 2024',
    description: 'Working alongside brilliant minds in engineering challenges',
    bgColor: 'bg-yellow-50 hover:bg-yellow-100',
    images: [
      '/images/timeline/IMG-20241026-WA0007.jpg',
      '/images/timeline/IMG_20241026_184309.jpg'
    ]
  },
  {
    id: 3,
    title: 'Recent Developments',
    date: 'Summer 2025',
    description: 'Latest achievements in aerospace engineering projects',
    bgColor: 'bg-red-50 hover:bg-red-100',
    images: [
      '/images/timeline/IMG-20250808-WA0007.jpg',
      '/images/timeline/IMG-20250808-WA0018.jpg',
      '/images/timeline/IMG-20250808-WA0027.jpg'
    ]
  }
];

function TimelineCards() {
  const [currentImages, setCurrentImages] = useState(
    timelineEvents.map(() => 0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages(prev => 
        prev.map((current, index) => {
          const event = timelineEvents[index];
          return event.images.length > 1 
            ? (current + 1) % event.images.length 
            : current;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {timelineEvents.map((event, index) => (
        <div 
          key={event.id}
          className={`${event.bgColor} rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer`}
        >
          <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
            <img 
              src={event.images[currentImages[index]]} 
              alt={event.title}
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium px-2 py-1 rounded">
              {event.date}
            </div>
            {event.images.length > 1 && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-600 text-xs px-2 py-1 rounded">
                {currentImages[index] + 1}/{event.images.length}
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
          <p className="text-gray-700 text-sm">
            {event.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isScrollingOut, setIsScrollingOut] = useState(false);
  
  const interests = ['Engineer', 'Innovator', 'Explorer', 'Creator'];

  useEffect(() => {
    // Ensure page starts at top and prevent scroll restoration
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsScrollingOut(true);
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % interests.length);
        setIsScrollingOut(false);
      }, 500); // Match the transition duration
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [interests.length]);
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
                <div className="text-xl sm:text-2xl text-white/90 mb-8 drop-shadow-md">
                  <style jsx>{`
                    .scroll-in {
                      opacity: 1;
                      transition: opacity 0.5s ease-in-out;
                    }
                    
                    .scroll-out {
                      opacity: 0;
                      transition: opacity 0.5s ease-out;
                    }
                  `}</style>
                  <span className={isScrollingOut ? 'scroll-out' : 'scroll-in'}>
                    Aspiring {interests[currentWordIndex]}
                  </span>
                </div>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mb-12 drop-shadow-md">
                  A rising senior in Aeronautical and Astronautical Engineering at Purdue University, 
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
              coverImage="/images/projects-placeholder.jpg"
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
              coverImage="/images/projects-placeholder.jpg"
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
        backgroundImage="/images/projects-bg.jpg" 
        height="auto"
        speed={0.25}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.2}
      >
        <section id="internships" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Professional Experiences
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-indigo-600 mx-auto rounded-full shadow-lg"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/95 backdrop-blur-sm border border-indigo-200 rounded-lg p-8 hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Aerospace Engineering Intern
                    </h3>
                    <p className="text-indigo-600 font-medium text-lg mb-1">Company Name</p>
                    <p className="text-gray-500 text-sm">Summer 2024</p>
                  </div>
                  <div className="bg-indigo-200 p-3 rounded-full">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Gained hands-on experience in aerospace engineering design and analysis. 
                  Contributed to innovative projects involving aircraft systems and propulsion technologies.
                </p>
                <div className="text-sm text-indigo-600 font-medium">
                  CAD Design • System Analysis • Project Management • Technical Documentation
                </div>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm border border-cyan-200 rounded-lg p-8 hover:bg-cyan-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Research Assistant
                    </h3>
                    <p className="text-cyan-600 font-medium text-lg mb-1">Purdue University</p>
                    <p className="text-gray-500 text-sm">Academic Year 2024-2025</p>
                  </div>
                  <div className="bg-cyan-200 p-3 rounded-full">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Supporting cutting-edge research in aerospace systems and propulsion. 
                  Conducting experiments, analyzing data, and contributing to academic publications.
                </p>
                <div className="text-sm text-cyan-600 font-medium">
                  Research Methods • Data Analysis • Laboratory Work • Academic Writing
                </div>
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
              href="/research/systems-engineering"
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
              href="/research/turbomachinery"
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
            <Link href="/activities/purdue-aircraft-teams" className="group">
              <div className="bg-blue-50 rounded-lg p-8 hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                    Purdue Aircraft Teams
                  </h3>
                  <svg className="w-6 h-6 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4">
                  Active member of Purdue&apos;s premier aircraft design and competition teams, 
                  participating in national competitions including SAE Aero Design and AIAA Design competitions.
                </p>
                <div className="text-sm text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                  Aircraft Design • Competition • Testing • Leadership
                </div>
                <div className="mt-4 text-sm text-blue-600 font-medium">
                  Click to learn more →
                </div>
              </div>
            </Link>
            
            <Link href="/activities/purdue-space-program" className="group">
              <div className="bg-purple-50 rounded-lg p-8 hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                    Purdue Space Program
                  </h3>
                  <svg className="w-6 h-6 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4">
                  Contributing to cutting-edge space exploration projects including rocket design, 
                  satellite development, and mission planning for intercollegiate competitions and research initiatives.
                </p>
                <div className="text-sm text-purple-600 font-medium group-hover:text-purple-800 transition-colors">
                  Space Systems • Rocket Engineering • Mission Design • Collaboration
                </div>
                <div className="mt-4 text-sm text-purple-600 font-medium">
                  Click to learn more →
                </div>
              </div>
            </Link>
          </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection 
        backgroundImage="/images/timeline/656A9644.jpg" 
        height="auto"
        speed={0.1}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.6}
      >
        <section id="timeline" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Timeline
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full shadow-lg"></div>
              <p className="text-xl text-white/90 mt-6 max-w-3xl mx-auto drop-shadow-md">
                A visual journey through key moments and achievements
              </p>
            </div>
            
            <TimelineCards />
            
            <div className="text-center">
              <Link 
                href="/timeline"
                className="inline-flex items-center bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                View Full Timeline
              </Link>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <section id="contact" className="py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Resume & Contact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download my resume and get in touch for aerospace engineering collaboration opportunities
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Resume Column */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Resume</h3>
              <div className="bg-white rounded-lg shadow-lg p-6">
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
                <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    src="/Aaryan-Lath_Resume.pdf"
                    className="w-full h-full"
                    title="Aaryan Lath Resume"
                  />
                </div>
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get In Touch</h3>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Interested in aerospace engineering collaboration or have questions about my work? 
                  I'd love to connect and discuss opportunities in aerospace innovation.
                </p>
                
                <div className="space-y-4">
                  <a 
                    href="mailto:aaryanlath05@gmail.com" 
                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/aaryan-lath/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn Profile
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="text-sm text-gray-500 text-center">
                    <p className="mb-2">
                      <span className="font-medium">Email:</span> aaryanlath05@gmail.com
                    </p>
                    <p>
                      <span className="font-medium">Location:</span> West Lafayette, IN
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
