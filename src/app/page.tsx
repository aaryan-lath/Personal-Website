'use client';

// HOME PAGE — this file controls the ORDER and LOOK of the sections.
// Every word on the page lives in src/content/home.ts; edit that file to
// change text, cards, or links. See EDITING.md in the project root.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectCard from '../components/ProjectCard';
import ParallaxSection from '../components/ParallaxSection';
import PersonalProjectCard from '../components/PersonalProjectCard';
import { personalProjects } from '../data/personal-projects';
import JsonLd from '../components/JsonLd';
import { SITE_URL } from '../data/structured-data';
import { cadProjects } from '../data/cad-projects';
import { timelineData } from '../data/timeline';
import CardIcon from '../components/CardIcon';
import {
  hero,
  sections,
  experiences,
  courseHighlights,
  activityCards,
  resumeOptions,
  contact,
  type Accent,
} from '../content/home';

// Tailwind needs whole class names in the source, so each accent spells its
// classes out rather than building them from the colour name at runtime.
const ACCENTS: Record<Accent, { card: string; org: string; iconBg: string; icon: string; tags: string }> = {
  indigo: {
    card: 'border-indigo-200 hover:bg-indigo-50',
    org: 'text-indigo-600',
    iconBg: 'bg-indigo-200',
    icon: 'text-indigo-600',
    tags: 'text-indigo-600',
  },
  cyan: {
    card: 'border-cyan-200 hover:bg-cyan-50',
    org: 'text-cyan-600',
    iconBg: 'bg-cyan-200',
    icon: 'text-cyan-600',
    tags: 'text-cyan-600',
  },
  purple: {
    card: 'border-purple-200 hover:bg-purple-50',
    org: 'text-purple-600',
    iconBg: 'bg-purple-200',
    icon: 'text-purple-600',
    tags: 'text-purple-600',
  },
  teal: {
    card: 'border-teal-200 hover:bg-teal-50',
    org: 'text-teal-600',
    iconBg: 'bg-teal-200',
    icon: 'text-teal-600',
    tags: 'text-teal-600',
  },
};

// Content files mark emphasis with **double asterisks**; this renders it bold.
function withEmphasis(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-semibold text-gray-900">
        {part}
      </span>
    ) : (
      part
    )
  );
}

// Homepage timeline preview. RULE: always shows the FIRST 4 items of the shared
// timeline data (src/data/timeline.ts), so it mirrors the top of /timeline.
const homeTimeline = timelineData.slice(0, 4);
const homeTimelineFrames = homeTimeline.map((e) =>
  e.images && e.images.length ? e.images : e.image ? [e.image] : []
);

function TimelineCards() {
  const [currentImages, setCurrentImages] = useState(homeTimeline.map(() => 0));
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages(prev =>
        prev.map((current, index) => {
          const frames = homeTimelineFrames[index];
          return frames.length > 1 ? (current + 1) % frames.length : current;
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleCardFlip = (id: string) => {
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
          {sections.timeline.helperText}
        </div>
      </div>
      {/* BLOCK GROUP: Cards are the first 4 of the shared timeline data. */}
      {/* Layout tip: 1 card per row on small screens, 2 on md, 4 on lg. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {homeTimeline.map((event, index) => {
          const frames = homeTimelineFrames[index];
          return (
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
                  {event.video ? (
                    <video
                      src={event.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={frames[currentImages[index]]}
                      alt={event.title}
                      className="w-full h-full object-cover transition-opacity duration-1000"
                    />
                  )}
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
                  {frames.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                      {currentImages[index] + 1}/{frames.length}
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
          );
        })}
      </div>
    </>
  );
}

// Page: main landing page with all sections (hero, academia, internships, research, projects, timeline, contact)
export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isScrollingOut, setIsScrollingOut] = useState(false);

  // Rotating interests come from src/content/home.ts (hero.rotatingWords).
  const interests = hero.rotatingWords;

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
      {/* The home page is the profile page for the #person node the root layout emits */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          '@id': `${SITE_URL}/#profilepage`,
          url: SITE_URL,
          mainEntity: { '@id': `${SITE_URL}/#person` },
        }}
      />
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
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-8 max-w-4xl mx-auto">
                <div className="mb-4 sm:mb-8">
                  <img 
                    src={hero.profileImage}
                    alt={hero.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 border-4 border-white/20 shadow-lg object-cover"
                  />
                </div>
                <h1 className="text-3xl sm:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
                  {hero.name}
                </h1>
                <div className="text-lg sm:text-2xl text-white/90 mb-6 sm:mb-8 drop-shadow-md">
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
                      : `${hero.rotatingPrefix} ${interests[currentWordIndex]}`}
                  </span>
                </div>
                <p className="text-sm sm:text-lg text-white/80 max-w-3xl mx-auto mb-8 sm:mb-12 drop-shadow-md">
                  {hero.intro}
                </p>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Personal Projects section — plain section with fixed background to avoid parallax scroll gaps */}
      <section
        id="projects"
        className="relative py-12 sm:py-20 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/images/Hackathon-bg.jpg')", backgroundColor: '#1f2937' }}
      >
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {sections.projects.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-600 mx-auto rounded-full shadow-lg"></div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 max-w-3xl mx-auto mt-4 sm:mt-6">
              <p className="text-base sm:text-xl text-white/90 drop-shadow-md">
                {sections.projects.intro}
              </p>
            </div>
          </div>

          {/* BLOCK GROUP: cards are driven by src/data/personal-projects.ts. Edit that file to add or update entries. */}
          {personalProjects.length === 1 ? (
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <PersonalProjectCard key={personalProjects[0].id} {...personalProjects[0]} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalProjects.map((p) => (
                <PersonalProjectCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ParallaxSection
        backgroundImage="/images/Urban-Mobility.jpg"
        height="auto"
        speed={0.2}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.4}
      >
        {/* Academia overview section */}
        {/* Words + course cards: src/content/home.ts (sections.academia, courseHighlights) */}
        <section id="academia" className="py-12 sm:py-20 relative">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                {sections.academia.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full shadow-lg"></div>
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-4xl mx-auto mt-6 sm:mt-8">
                <p className="text-base sm:text-xl text-white/90 drop-shadow-md">
                  {sections.academia.intro}
                </p>
              </div>
            </div>
            {/* Layout tip: 1 card per row on small screens, 2 on md, 4 on lg. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {courseHighlights.map((course) => (
                <div
                  key={course.title}
                  className="bg-white/95 backdrop-blur-sm border border-teal-200 rounded-lg p-6 lg:p-5 hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-lg font-semibold text-gray-900 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-teal-600 font-medium text-base lg:text-sm mb-1">{course.subtitle}</p>
                    </div>
                    <div className="bg-teal-200 p-3 rounded-full">
                      <CardIcon name={course.icon} className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                  {course.linkHref && (
                    <a
                      href={course.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {course.linkLabel}
                    </a>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                href="/academia"
                className="inline-flex items-center bg-white text-teal-600 border-2 border-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {sections.academia.ctaLabel}
              </Link>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection 
        backgroundImage="/images/rethi-exterior.jpg" 
        height="auto"
        speed={0.25}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.2}
      >
        {/* Professional experience section */}
        {/* Words + cards: src/content/home.ts (sections.internships, experiences) */}
        <section id="internships" className="py-12 sm:py-20 relative">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                {sections.internships.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-indigo-600 mx-auto rounded-full shadow-lg"></div>
            </div>
            {/* Layout tip: 3 job panels per row on lg; any entry marked wide spans the full row. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {experiences.map((job) => {
                const accent = ACCENTS[job.accent];
                const body = (
                  <>
                    {job.intro && <p className="text-gray-700 mb-3">{withEmphasis(job.intro)}</p>}
                    <ul className={`text-gray-700 space-y-1 ${job.wide ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 space-y-0' : ''}`}>
                      {job.bullets.map((point) => (
                        <li key={point}>• {point}</li>
                      ))}
                    </ul>
                    <div className={`text-sm font-medium mt-4 ${accent.tags}`}>
                      {job.tags.join(' • ')}
                    </div>
                  </>
                );

                const heading = (
                  <>
                    <h3 className="text-xl lg:text-lg font-semibold text-gray-900 mb-2">
                      {job.role}
                    </h3>
                    <p className={`font-medium text-base lg:text-sm mb-1 ${accent.org}`}>{job.org}</p>
                    <p className="text-gray-500 text-sm">{job.dates}</p>
                    {job.linkHref && (
                      <Link
                        href={job.linkHref}
                        className={`inline-block text-sm font-medium mt-4 ${accent.org} hover:underline`}
                      >
                        {job.linkLabel}
                      </Link>
                    )}
                  </>
                );

                const icon = (
                  <div className={`${accent.iconBg} p-3 rounded-full shrink-0`}>
                    <CardIcon name={job.icon} className={`w-6 h-6 ${accent.icon}`} />
                  </div>
                );

                // Wide entries sit on their own full-width row with the icon at
                // the right edge; the rest are normal cards in the top row.
                return job.wide ? (
                  <div
                    key={job.role}
                    className={`md:col-span-2 lg:col-span-3 bg-white/95 backdrop-blur-sm border rounded-lg p-6 lg:p-5 transition-all duration-300 hover:shadow-xl ${accent.card}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                        <div className="lg:w-1/3">{heading}</div>
                        <div className="lg:flex-1">{body}</div>
                      </div>
                      {icon}
                    </div>
                  </div>
                ) : (
                  <div
                    key={job.role}
                    className={`bg-white/95 backdrop-blur-sm border rounded-lg p-6 lg:p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${accent.card}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">{heading}</div>
                      {icon}
                    </div>
                    {body}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ParallaxSection>

      <ParallaxSection 
        backgroundImage="/images/Wind_Tunnel-activities.jpeg"
        height="min-h-screen"
        speed={0.1}
        overlay={true}
        overlayColor="black"
        overlayOpacity={0.2}
      >
        {/* Applied engineering projects section */}
        <section id="activities" className="py-12 sm:py-20 relative">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                {sections.activities.title}
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full shadow-lg"></div>
            </div>
          {/* Cards: src/content/home.ts (activityCards) */}
          {/* Layout tip: 1 card per row on small screens, 2 on md. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {activityCards.map((card) => (
              <Link key={card.href} href={card.href} className="group">
                <div
                  className={`rounded-lg p-5 sm:p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer ${
                    card.color === 'blue' ? 'bg-blue-50 hover:bg-blue-100' : 'bg-purple-50 hover:bg-purple-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      className={`text-2xl font-semibold text-gray-900 transition-colors ${
                        card.color === 'blue' ? 'group-hover:text-blue-700' : 'group-hover:text-purple-700'
                      }`}
                    >
                      {card.title}
                    </h3>
                    <svg
                      className={`w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity ${
                        card.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-4">{card.description}</p>
                  <div
                    className={`text-sm font-medium transition-colors ${
                      card.color === 'blue'
                        ? 'text-blue-600 group-hover:text-blue-800'
                        : 'text-purple-600 group-hover:text-purple-800'
                    }`}
                  >
                    {card.tags.join(' • ')}
                  </div>
                  <div
                    className={`mt-4 text-sm font-medium ${
                      card.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                    }`}
                  >
                    {card.ctaLabel}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* BLOCK GROUP: cards are driven by src/data/cad-projects.ts. Edit that file to add or update entries. */}
          {/* Layout tip: 1 card per row on small screens, 2 on md. If you add a 3rd card and want 3 on one row (medium/large screens), change md:grid-cols-2 to md:grid-cols-3. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cadProjects.map((p, index) => (
              <div key={p.slug} style={{ animationDelay: `${0.1 + index * 0.2}s` }}>
                <ProjectCard
                  title={p.title}
                  description={p.description}
                  modelUrl={p.modelUrl}
                  coverImage={p.coverImage}
                  technologies={p.technologies}
                  details={p.details}
                  images={p.images}
                  driveLink={p.driveLink}
                  driveLinkText={p.driveLinkText}
                />
              </div>
            ))}
          </div>

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
              {sections.activities.ctaLabel}
            </button>
          </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Awards and achievements section — plain section with fixed background to avoid parallax scroll gaps */}
      <section
        id="timeline"
        className="relative py-12 sm:py-20 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/images/Timeline.jpg')", backgroundColor: '#1f2937' }}
      >
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {sections.timeline.title}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full shadow-lg"></div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 max-w-3xl mx-auto mt-4 sm:mt-6">
              <p className="text-base sm:text-xl text-white/90 drop-shadow-md">
                {sections.timeline.intro}
              </p>
            </div>
          </div>

          {/* BLOCK GROUP: TimelineCards shows the first 4 of the shared timeline data (src/data/timeline.ts). */}
          <TimelineCards />

          <div className="text-center">
            <Link
              href="/timeline"
              className="inline-flex items-center bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              {sections.timeline.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Resume + contact section */}
      {/* py-20 sets vertical spacing; bg-gray-50 separates this section visually */}
      <section id="contact" className="py-12 sm:py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{sections.contact.title}</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {sections.contact.intro}
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Resume Column */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{contact.resumeColumnTitle}</h3>
              <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Resume Viewer */}
                <div className="w-full h-[350px] sm:h-[600px] border border-gray-300 rounded-lg overflow-hidden bg-white mb-6">
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{contact.columnTitle}</h3>
              <div className="bg-white rounded-lg shadow-lg p-5 sm:p-8">
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  {contact.intro}
                </p>
                
                <div className="space-y-4">
                  <a 
                    href={`mailto:${contact.email}`}
                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {contact.emailButtonLabel}
                  </a>
                  
                  <a 
                    href={contact.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    {contact.linkedinButtonLabel}
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="text-sm text-gray-500 text-center">
                    <p className="mb-2">
                      <span className="font-medium">{contact.emailLabel}</span> {contact.email}
                    </p>
                    <p>
                      <span className="font-medium">{contact.locationLabel}</span> {contact.location}
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
