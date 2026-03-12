'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectCard from '../components/ProjectCard';
import ParallaxSection from '../components/ParallaxSection';
import ResearchBox from '../components/ResearchBox';

// EDIT TEXT HERE: Timeline preview cards on the homepage.
// BLOCK GROUP: Each object below is one timeline card; add another by copying an object.
const timelineEvents = [
  {
    id: 1,
    title: 'Wind_Tunnel-test',
    date: 'January 2026',
    description: 'Wind tunnel testing campaign for aerodynamic validation (completed after Mk2).',
    images: ['/images/Wind_Tunnel-test.jpeg']
  },
  {
    id: 2,
    title: 'Mk2',
    date: 'January 2026',
    description: 'Mk2 iteration showing design and performance improvements.',
    images: ['/images/Mk2.jpg']
  },
  {
    id: 3,
    title: 'Mk1',
    date: 'December 2025',
    description: 'Initial Mk1 build and validation milestone.',
    images: ['/images/Mk1.png']
  },
  {
    id: 4,
    title: 'SAE Aero Design East Competition',
    date: 'March 2026',
    description: 'The best competition yet for the team — a successful aircraft landing and loads of learning experiences at the SAE Aero Design East competition, marking a major milestone for the PSAEA team.',
    images: [
      '/images/timeline/Aircraft_Solo.jpeg',
      '/images/timeline/Aircraft_Team.jpeg'
    ]
  }
];

function TimelineCards() {
  const [currentImages, setCurrentImages] = useState(
    timelineEvents.map(() => 0)
  );
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

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
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleCardFlip = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-gray-600 shadow-lg">
          {/* Icon sizing/color/spacing are controlled by w-4 h-4, text-gray-500, and mr-2 */}
          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          {/* EDIT TEXT HERE: Helper text above the timeline preview cards */}
          Hover over any card to reveal detailed descriptions
        </div>
      </div>
      {/* BLOCK GROUP: Cards are generated from timelineEvents above. */}
      {/* Layout tip: 1 card per row on small screens, 2 on md, 4 on lg. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {timelineEvents.map((event, index) => (
          <div
            key={event.id}
            className="flip-card h-64 lg:h-56 perspective-1000 cursor-pointer group"
            onClick={() => handleCardFlip(event.id)}
            onMouseEnter={() => handleCardFlip(event.id)}
            onMouseLeave={() => handleCardFlip(event.id)}
          >
            <div className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              flippedCards.has(event.id) ? 'rotate-y-180' : ''
            }`}>
              {/* Front of card */}
              <div className="flip-card-front absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="relative w-full h-full">
                  <img 
                    src={event.images[currentImages[index]]} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-opacity duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/40 backdrop-blur-sm rounded px-2 py-1">
                      <p className="text-white text-xs lg:text-xs font-medium">{event.date}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-black/40 backdrop-blur-sm rounded px-2 py-1.5 text-right">
                      <h3 className="text-white text-sm lg:text-xs font-bold leading-tight">{event.title}</h3>
                    </div>
                  </div>
                  {event.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                      {currentImages[index] + 1}/{event.images.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Back of card */}
              <div className="flip-card-back absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg bg-white p-4 lg:p-3 flex flex-col justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-900 font-bold text-base lg:text-sm flex-1">{event.title}</h3>
                    <svg 
                      className="w-5 h-5 text-gray-400 flex-shrink-0 cursor-pointer" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-xs lg:text-xs mb-3 font-medium">{event.date}</p>
                  <p className="text-gray-600 text-xs lg:text-xs leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Page: main landing page with all sections (hero, academia, internships, research, projects, timeline, contact)
export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isScrollingOut, setIsScrollingOut] = useState(false);

  // EDIT TEXT HERE: Rotating interests shown in the hero section.
  const interests = ['Systems Engineer', 'Aerodynamicist', 'Product and Design Engineer', 'Changemaker'];

  // EDIT TEXT HERE: Resume/portfolio options shown in the Resume & Contact section.
  // BLOCK GROUP: Each object below is one selectable option; add another by duplicating a key.
  const resumeOptions = {
    aerodynamics: {
      name: 'Aerodynamics, Aircraft',
      file: '/Aaryan-Lath-Resume.pdf',
      description: 'Focused on aerospace engineering and aircraft design',
      type: 'pdf'
    },
    mechanical: {
      name: 'Mechanical Based',
      file: '/Aaryan_Lath-Resume.pdf',
      description: 'Emphasis on mechanical engineering and systems',
      type: 'pdf'
    },
    portfolio: {
      name: 'Portfolio',
      file: 'https://onedrive.live.com/embed?resid=283CC4CEA2648E6D%21109&authkey=%21AIJ9R9xRLBk3P14&em=2',
      description: 'Complete portfolio of projects and work',
      type: 'iframe'
    }
  };

  const [selectedResume, setSelectedResume] = useState<keyof typeof resumeOptions>('aerodynamics');

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
    }, 3500); // Change word every 3 seconds

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
        {/* Hero section */}
        <section id="home" className="min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center">
              {/* Transparency/blur and padding control the card feel over the background */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="mb-8">
                  <img 
                    src="/images/profile.jpeg" 
                    alt="Aaryan Lath" 
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white/20 shadow-lg object-cover"
                  />
                </div>
                {/* EDIT TEXT HERE: Your name in the hero headline */}
                <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                  Aaryan Lath
                </h1>
                {/* EDIT TEXT HERE: Rotating interests line under your name */}
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
                    {interests[currentWordIndex] === 'Leader'
                      ? 'Leader'
                      : `Aspiring ${interests[currentWordIndex]}`}
                  </span>
                </div>
                {/* EDIT TEXT HERE: Hero intro paragraph */}
                <p className="text-lg text-white/80 max-w-3xl mx-auto mb-12 drop-shadow-md">
                  As a senior in AAE at Purdue, I've consistently demonstrated academic excellence being in the Dean's List for every semester while gaining hands-on experience in complex engineering projects, positioning me to tackle multidisciplinary challenges in aerospace and beyond. My unique perspective, experience and first principles thinking combines technical expertise with business acumen, understanding how decisions impact organizational success.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>


      <ParallaxSection 
        backgroundImage="/images/Urban-Mobility.jpg" 
        height="auto"
        speed={0.2}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.4}
      >
        {/* Academia overview section */}
        <section id="academia" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center mb-16">
              {/* EDIT TEXT HERE: Section title */}
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Academia
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full shadow-lg"></div>
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto mt-8">
                {/* EDIT TEXT HERE: Section intro paragraph */}
                <p className="text-xl text-white/90 drop-shadow-md">
                  With a GPA of 3.73, I am constantly challenging myself with taking advanced graduate level courses such as Multidisciplinary Design Optimization and Intermediate Aerodynamics (AAE 550 and AAE 514) and developing skills through clubs, projects while balancing Research, Teaching Assistant position. To view more courses and course related projects, click on View more.
                </p>
              </div>
            </div>
            {/* BLOCK GROUP: Each card below is one highlighted course; duplicate a card to add another. */}
            {/* Layout tip: 1 card per row on small screens, 2 on md, 4 on lg. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {/* EDIT TEXT HERE: Card 1 content (title, subtitle, description) */}
              <div className="bg-white/95 backdrop-blur-sm border border-teal-200 rounded-lg p-6 lg:p-5 hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-lg font-semibold text-gray-900 mb-2">
                      AAE 571: Complex System Safety
                    </h3>
                    <p className="text-teal-600 font-medium text-base lg:text-sm mb-1">Graduate Level Course</p>
                  </div>
                  <div className="bg-teal-200 p-3 rounded-full">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Performed accident-style analysis and wrote a conference-style research paper investigating the safety challenges and risk mitigation strategies for propulsion systems for urban air mobility vehicles (UAMs).
                </p>
                <a
                  href="https://1drv.ms/b/c/283cc4cea2648e6d/IQDoS6CLJZmyTJFwCmTZQf8gAZhJQr0ZtMoLTUnXOJUff_o?e=jtXzlR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Report on OneDrive
                </a>
              </div>

              <div className="bg-white/95 backdrop-blur-sm border border-teal-200 rounded-lg p-6 lg:p-5 hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-lg font-semibold text-gray-900 mb-2">
                      AAE 418: Zero-Gravity Flight Experiment
                    </h3>
                    <p className="text-teal-600 font-medium text-base lg:text-sm mb-1">Advanced Experimental Design</p>
                  </div>
                  <div className="bg-teal-200 p-3 rounded-full">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L10 6h4L12 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 18l-2 2M16 18l2 2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18h4" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Project Manager for the Small Suborbital orbital refuelling experiment. Created the requirements, budgets and managing 7 engineers for the design of the experiment to be launched on the New Shepard flight.
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm border border-teal-200 rounded-lg p-6 lg:p-5 hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-lg font-semibold text-gray-900 mb-2">
                      AAE 339: Aerospace Propulsion
                    </h3>
                    <p className="text-teal-600 font-medium text-base lg:text-sm mb-1">Advanced Propulsion Systems</p>
                  </div>
                  <div className="bg-teal-200 p-3 rounded-full">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="2.5" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v3M12 17v3M4 12h3M17 12h3" />
                      <circle cx="7" cy="7" r="1.5" strokeWidth="2" />
                      <circle cx="17" cy="7" r="1.5" strokeWidth="2" />
                      <circle cx="7" cy="17" r="1.5" strokeWidth="2" />
                      <circle cx="17" cy="17" r="1.5" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Conducted an extensive literature survey on novel techniques within the Urban Air Mobility sector, focusing on Distributed Electric Propulsion (DEP) systems to reduce acoustic noise and optimize battery thermal management.
                </p>
                <a
                  href="https://1drv.ms/b/c/283cc4cea2648e6d/IQA6yHs1H-h6S7gXfrI9-l6AAdf22eKL4iGEPXAwWg3WuQU?e=wKxTTw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Report on OneDrive
                </a>
              </div>

              <div className="bg-white/95 backdrop-blur-sm border border-teal-200 rounded-lg p-6 lg:p-5 hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-lg font-semibold text-gray-900 mb-2">
                      AAE 412: Computational Fluid Dynamics
                    </h3>
                    <p className="text-teal-600 font-medium text-base lg:text-sm mb-1">Advanced CFD Course</p>
                  </div>
                  <div className="bg-teal-200 p-3 rounded-full">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10h14l-1-4H6l-1 4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10v6h14v-6" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16h10" />
                      <circle cx="8" cy="18" r="1.5" strokeWidth="2" />
                      <circle cx="16" cy="18" r="1.5" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Simulated the performance of a car using an Ahmed Body approximation. Looked at the effect of different slant angles on drag, downforce and overall car behavior.
                </p>
                <a
                  href="https://1drv.ms/b/c/283cc4cea2648e6d/IQCuAfC-0OVNToe4aU7R4HdiAYk1XaGxYH36NZPu4yecjRw?e=dzhqSN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Report on OneDrive
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                href="/academia"
                className="inline-flex items-center bg-white text-teal-600 border-2 border-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {/* EDIT TEXT HERE: Button label */}
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                View More
              </Link>
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
        {/* Professional experience section */}
        <section id="internships" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center mb-16">
              {/* EDIT TEXT HERE: Section title */}
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Professional Experiences
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-indigo-600 mx-auto rounded-full shadow-lg"></div>
            </div>
            {/* BLOCK GROUP: Each card below is one experience; duplicate a card to add another. */}
            {/* Layout tip: 1 card per row on small screens, 2 on md, 4 on lg. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* EDIT TEXT HERE: Card 1 content (role, company, dates, bullets) */}
              <div className="bg-white/95 backdrop-blur-sm border border-indigo-200 rounded-lg p-6 lg:p-5 hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-lg font-semibold text-gray-900 mb-2">
                      Systems Engineering Intern
                    </h3>
                    <p className="text-indigo-600 font-medium text-base lg:text-sm mb-1">Siemens Smart Infrastructure</p>
                    <p className="text-gray-500 text-sm">Summer 2025</p>
                  </div>
                  <div className="bg-indigo-200 p-3 rounded-full">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Worked at the Grand Prairie office in Siemens' Smart Infrastructure division in the mechanical department:
                  <br />• Designed custom enclosures for panelboards using CREO and executed ECNs in SAP.
                  <br />• Streamlined switchboard configurations by engineering neutral assemblies to resolve design edge cases.
                  <br />• Developed Python scripts to refine a back-end algorithm, automating the BOM generation process for orders.
                </p>
                <div className="text-sm text-indigo-600 font-medium">
                  CREO CAD • SAP • Python Scripting • Systems Engineering
                </div>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm border border-cyan-200 rounded-lg p-6 lg:p-5 hover:bg-cyan-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-lg font-semibold text-gray-900 mb-2">
                      Undergraduate Teaching Assistant
                    </h3>
                    <p className="text-cyan-600 font-medium text-base lg:text-sm mb-1">Purdue University</p>
                    <p className="text-gray-500 text-sm">Jan 2025 - Present</p>
                  </div>
                  <div className="bg-cyan-200 p-3 rounded-full">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  TA for the Aircraft and Spacecraft Design class (AAE 251):
                  <br />• Led study sessions to teach 50+ students, core AAE 251 (Aircraft and Spacecraft Design) course material and troubleshooting MATLAB bugs.
                  <br />• Provided personalized support to students with concepts and understanding key design principles for the aircraft and spacecraft design projects.
                </p>
                <div className="text-sm text-cyan-600 font-medium">
                  Teaching • MATLAB • Aircraft Design • Spacecraft Design • Student Mentoring
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm border border-cyan-200 rounded-lg p-6 lg:p-5 hover:bg-cyan-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-lg font-semibold text-gray-900 mb-2">
                      Student Grader
                    </h3>
                    <p className="text-cyan-600 font-medium text-base lg:text-sm mb-1">Purdue University</p>
                    <p className="text-gray-500 text-sm">Fall 2024, Spring 2026</p>
                  </div>
                  <div className="bg-cyan-200 p-3 rounded-full">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Grader for the Aircraft and Spacecraft Design class (AAE 251):
                  <br />• Corrected 80+ Homework questions and Individual Self-Assessments.
                  <br />• Provided relevant feedback to help the student improve the quality of their work for subsequent homeworks
                </p>
                <div className="text-sm text-cyan-600 font-medium">
                  Grading • Aircraft Design • Spacecraft Design • Feedback
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm border border-emerald-200 rounded-lg p-6 lg:p-5 hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-lg font-semibold text-gray-900 mb-2">
                      Financial Analyst
                    </h3>
                    <p className="text-emerald-600 font-medium text-base lg:text-sm mb-1">Ganshyam Balaji Financials</p>
                    <p className="text-gray-500 text-sm">Summer 2024</p>
                  </div>
                  <div className="bg-emerald-200 p-3 rounded-full">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Working on Mergers and Acquisitions at Ganshyam Balaji Financials in the pharmaceutical industry:
                  <br />• Performed financial analysis of companies within the pharmaceutical sector for mergers and acquisitions.
                  <br />• Prepared reports and presentations highlighting company strengths, and growth potential, for buyers.
                </p>
                <div className="text-sm text-emerald-600 font-medium">
                  Financial Analysis • Analytical • Presentation-making • Report Writing
                </div>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection 
        backgroundImage="/images/rethi-exterior.jpg" 
        height="auto"
        speed={0.15}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.4}
      >
        {/* Research section */}
        <section id="research" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative z-0">
            <div className="text-center mb-16">
              {/* EDIT TEXT HERE: Section title */}
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Research Work
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full shadow-lg"></div>
            </div>
          {/* BLOCK GROUP: Each ResearchBox below is one research item; add another ResearchBox to add more. */}
          {/* Layout tip: 1 box per row on small screens, 2 on lg. If you add a 3rd box and want 3 on one row (large screens), change lg:grid-cols-2 to lg:grid-cols-3. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* EDIT TEXT HERE: Research item content (title, description, points) */}
            <ResearchBox
              title="Resilient Extraterrestrial Habitat Institute (RETHi)"
              description="Worked on 2 projects from the Summer of 2024 to Spring 2025: Systems Engineering and Vibration Isolation"
              points={[
                'Trade studies for safety control evaluation',
                'Cost and habitat resilience assessment',
                'Lunar habitat disruption analysis',
                'FEA simulations for vibration isolation',
                'Tensile testing of Vectran straps with stitching patterns'
              ]}
              side="left"
              bgColor="bg-white"
              href="/research/rethi"
            />
            <ResearchBox
              title="Other Research Indulgements"
              description="Current research project is focusing on Multidisciplinary Design Optimization of electric aircraft. Worked at the high speed compressor lab in Fall 2025."
              points={[
                'Abstract accepted for the AIAA Aviation forum 2026 on "A Modular MDO Framework for Rapid Electric Aircraft Design"',
                'Helped assemble and calibrate the Test cell\'s fan-rig',
                'Working on manufacturing techniques to build parts effectively'
              ]}
              side="right"
              bgColor="bg-white"
              href="/research/zucrow"
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
        {/* Applied engineering projects section */}
        <section id="activities" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center mb-16">
              {/* EDIT TEXT HERE: Section title */}
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Applied Engineering Projects
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full shadow-lg"></div>
            </div>
          {/* BLOCK GROUP: Each Link card below is one activity; duplicate a block to add another. */}
          {/* Layout tip: 1 card per row on small screens, 2 on md. If you add a 3rd card and want 3 on one row (medium/large screens), change md:grid-cols-2 to md:grid-cols-3. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* EDIT TEXT HERE: Activity card 1 content (title, description, tags, CTA) */}
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
                  Active member of Purdue&apos;s aircraft design and competition teams, 
                  participated in national competitions including AUVSI SUAS and AIAA Design/ Build/ Fly competitions. Currently, serving as the Chief engineer of the SAE Aero Design team in SAE Purdue.
                </p>
                <div className="text-sm text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                  Aircraft Design • Manufacturing • Testing • Leadership
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
                  Contributed to the PSP Satellites team as a Structures, Mechanisms and Thermals member, deputy systems director and to the entire organization of 10 teams as the secretary.
                </p>
                <div className="text-sm text-purple-600 font-medium group-hover:text-purple-800 transition-colors">
                  Space Systems • Systems Engineering • Mission Design • Collaboration
                </div>
                <div className="mt-4 text-sm text-purple-600 font-medium">
                  Click to learn more →
                </div>
              </div>
            </Link>
          </div>
          
          {/* BLOCK GROUP: Each ProjectCard below is one project; duplicate a ProjectCard to add another. */}
          {/* Layout tip: 1 card per row on small screens, 2 on md. If you add a 3rd card and want 3 on one row (medium/large screens), change md:grid-cols-2 to md:grid-cols-3. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div style={{ animationDelay: '0.1s' }}>
              {/* EDIT TEXT HERE: Project card 1 content (title, description, links, images) */}
              <ProjectCard
                title="TurboFan Engine Assembly"
                description="Complete turbofan engine design with bypass ratio optimization and performance analysis using advanced CAD modeling."
                modelUrl="/models/bypass-engine_asm.gltf"
                coverImage="/images/Engine design.jpg"
                technologies={['Creo Parametric', 'CFD Analysis', 'Assembly Design', 'GD&T']}
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
                driveLink="https://1drv.ms/f/c/283cc4cea2648e6d/EqHs9hzOskJGoxkfBSoJxOkBe_gegsn2ArnBNl5CevIsHg?e=RtRE7P"
                driveLinkText="View Bypass Engine Project Files"
              />
            </div>
            <div style={{ animationDelay: '0.3s' }}>
              <ProjectCard
                title="Single Piston Sterling Engine"
                description="Collection of complex mechanical engineering projects showcasing design versatility and technical proficiency."
                coverImage="/images/Single Piston Sterling Engine.jpg"
                technologies={['Siemens NX', 'Aras Innovater', 'Teamcenter', 'GD&T']}
                driveLink="https://onedrive.live.com/?id=%2Fpersonal%2F283cc4cea2648e6d%2FDocuments%2FPersonal%2DWebsite&viewid=0cf2dcd4%2D7efb%2D43cf%2Dae14%2D6c822d324089&view=0"
                driveLinkText="View Other CAD Projects"
              />
            </div>
          </div>

          {/* EDIT TEXT HERE: Button label for the portfolio call-to-action */}
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setSelectedResume('portfolio');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="inline-flex items-center bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              View Complete Design Portfolio
            </button>
          </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection 
        backgroundImage="/images/Timeline.jpg" 
        height="auto"
        speed={0.1}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.6}
      >
        {/* Awards and achievements section */}
        <section id="timeline" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center mb-16">
              {/* EDIT TEXT HERE: Section title */}
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Awards and Achievements
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full shadow-lg"></div>
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 max-w-3xl mx-auto mt-6">
                {/* EDIT TEXT HERE: Section intro line */}
                <p className="text-xl text-white/90 drop-shadow-md">
                  Milestones in academic excellence and professional growth
                </p>
              </div>
            </div>
            
            {/* BLOCK GROUP: TimelineCards uses timelineEvents above; add events in that array. */}
            <TimelineCards />
            
            <div className="text-center">
              <Link 
                href="/timeline"
                className="inline-flex items-center bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {/* EDIT TEXT HERE: Button label */}
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                View Full Timeline
              </Link>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Resume + contact section */}
      {/* py-20 sets vertical spacing; bg-gray-50 separates this section visually */}
      <section id="contact" className="py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Header */}
          <div className="text-center mb-16">
            {/* EDIT TEXT HERE: Section title */}
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Resume & Contact</h2>
            {/* EDIT TEXT HERE: Section intro paragraph */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download my resume and get in touch for aerospace engineering collaboration opportunities
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Resume Column */}
            <div>
              {/* EDIT TEXT HERE: Column header */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Resume</h3>
              <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Resume Viewer */}
                <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden bg-white mb-6">
                  <iframe
                    src="/Aaryan_Lath-Resume.pdf#view=FitH&scrollbar=0&toolbar=0&navpanes=0"
                    className="w-full h-full border-0"
                    title="Aaryan Lath Resume"
                    style={{ display: 'block' }}
                  />
                </div>
                {/* Download and Open Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/Aaryan_Lath-Resume.pdf"
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
                    href="/Aaryan_Lath-Resume.pdf"
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
              </div>
            </div>

            {/*
            === COMMENTED OUT: Multi-option resume selector (aerodynamics, mechanical, portfolio) ===
            === To restore, remove this comment block and delete the single resume section above. ===

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Resume & Portfolio</h3>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                  {(Object.keys(resumeOptions) as Array<keyof typeof resumeOptions>).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedResume(key)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                        selectedResume === key
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {resumeOptions[key].name}
                    </button>
                  ))}
                </div>
                <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden bg-white mb-6">
                  <iframe
                    key={selectedResume}
                    src={resumeOptions[selectedResume].type === 'pdf'
                      ? `${resumeOptions[selectedResume].file}#view=FitH&scrollbar=0&toolbar=0&navpanes=0`
                      : resumeOptions[selectedResume].file
                    }
                    className="w-full h-full border-0"
                    title={`Aaryan Lath ${resumeOptions[selectedResume].name}`}
                    style={{ display: 'block' }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {resumeOptions[selectedResume].type === 'pdf' ? (
                    <>
                      <a href={resumeOptions[selectedResume].file} target="_blank" rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center">
                        Download Resume
                      </a>
                      <a href={resumeOptions[selectedResume].file} target="_blank" rel="noopener noreferrer"
                        className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center justify-center">
                        Open in New Tab
                      </a>
                    </>
                  ) : (
                    <a href="https://onedrive.live.com/?id=%2Fpersonal%2F283cc4cea2648e6d%2FDocuments%2FPersonal%2DWebsite&viewid=0cf2dcd4%2D7efb%2D43cf%2Dae14%2D6c822d324089&view=0"
                      target="_blank" rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center">
                      Open Portfolio in OneDrive
                    </a>
                  )}
                </div>
              </div>
            </div>
            */}

            {/* Contact Column */}
            <div>
              {/* EDIT TEXT HERE: Column header */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get In Touch</h3>
              <div className="bg-white rounded-lg shadow-lg p-8">
                {/* EDIT TEXT HERE: Contact intro paragraph */}
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Interested in hiring a dedicated, well-rounded professional whose ambitions never sleep? 
                  Have questions about my work or want to discuss opportunities? I'd love to connect.
                </p>
                
                <div className="space-y-4">
                  {/* EDIT TEXT HERE: Email button label */}
                  <a 
                    href="mailto:aaryanlath05@gmail.com" 
                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                  </a>
                  
                  {/* EDIT TEXT HERE: LinkedIn button label */}
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
                    {/* EDIT TEXT HERE: Contact details */}
                    <p className="mb-2">
                      <span className="font-medium">Email:</span> aaryanlath05@gmail.com
                    </p>
                    <p>
                      <span className="font-medium">Current Location:</span> West Lafayette, IN
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
