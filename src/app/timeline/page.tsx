'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Page: full timeline of awards/achievements
// EDIT TEXT HERE: Timeline cards are hardcoded below.
// BLOCK GROUP: Each object in timelineData is one card; add another by copying an object.
interface TimelineItem {
  id: string;
  image?: string;
  images?: string[];
  video?: string;
  title: string;
  date: string;
  description: string;
  isCarousel?: boolean;
}

const timelineData: TimelineItem[] = [
  {
    id: '1',
    image: '/images/timeline/Internship.jpeg',
    title: 'Mechanical/ Systems Engineering Internship',
    date: 'Summer 2025',
    description: 'Gained valuable industry experience working at the Grand Prairie plant in the Smart Infrastructure industry. I applied theoretical knowledge to real-world challenges and contributed to making the back-end system more efficient.'
  },
  {
    id: '2',
    image: '/images/timeline/Research presentation.jpeg',
    title: 'Research Presentation',
    date: 'April 2025',
    description: 'Presented my research findings on potential hazards and method to approach those hazards to permanent lunar habitats to faculty and peers, showcasing months of dedicated work systems engineering analysis.'
  },
  {
    id: '3',
    images: ['/images/timeline/AAE-Banquet.jpg', '/images/timeline/AAE-Banquet2.jpg'],
    title: 'AAE OAE Banquet',
    date: 'April 2025',
    description: 'Honored to attend the annual AAE banquet at Purdue University, celebrating their life achievements and learning from their life experiences.',
    isCarousel: true
  },
  {
    id: '4',
    images: ['/images/timeline/PSD-1.jpg', '/images/timeline/PSD-2.jpg'],
    title: 'Purdue Space Day',
    date: 'October 2024',
    description: 'Sparked the love for Aerospace Engineering in the upcoming generation as a Group Commander; keeping them engaged through various techniques such as fun facts and other engaging activities. Had the chance to meet NASA astronaut Jerry Ross.',
    isCarousel: true
  },
  {
    id: '5',
    image: '/images/timeline/Aug2024-AAE_Amb.jpg',
    title: 'AAE Ambassador Program',
    date: 'August 2024',
    description: 'Serving as an Aeronautics and Astronautics Engineering ambassador, representing the department and helping prospective students understand the opportunities in aerospace engineering along with representing the university in various events.'
  },
  {
    id: '6',
    image: '/images/timeline/Poster-presentation.jpeg',
    title: 'Academic Poster Presentation',
    date: 'Summer 2024',
    description: 'Presented research findings through an academic poster on lunar habitats vibration isolation, demonstrating analytical skills and the ability to communicate complex engineering concepts effectively.'
  },
  {
    id: '7',
    images: ['/images/timeline/Certificate-May2024.jpeg', '/images/timeline/Certificate2-May2024.jpeg'],
    title: 'Skill Developments',
    date: 'Spring 2024',
    description: 'Received academic certificates in engineering studies, highlighting my commitment towards being well-rounded and excellence.',
    isCarousel: true
  },
  {
    id: '8',
    image: '/images/timeline/Case_Comp-winnings.jpeg',
    title: 'Case Competition Victory',
    date: 'April 2024',
    description: 'Achieved third place in my very first case competition, demonstrating strategic thinking, analytical prowess, and effective presentation skills in a competitive academic environment.'
  },
  {
    id: '9',
    video: '/images/timeline/Biking.mp4',
    title: 'Calculated Risk-Taking',
    date: 'December 2023',
    description: 'Taking risks on the Slayter Hill, improving my coordination and expanding my envelope of things that can be done.'
  },
  {
    id: '10',
    image: '/images/timeline/PSD-Oct2023.jpeg',
    title: 'Purdue Space Day 2023',
    date: 'October 2023',
    description: 'Sparking the love for Aerospace Engineering in the upcoming generation as a Group Commander. Made an interactive '
  },
  {
    id: '11',
    image: '/images/timeline/AY2022-2023.png',
    title: 'AIAA DBF Aircraft testing',
    date: 'Academic Year 2022-2023',
    description: 'Successfully completed the 2022-2023 academic year with distinction in classes, demonstrating consistent academic performance all while building an aircraft for the Design Build Fly competition where the team secured a 47th place finish.'
  },
  {
    id: '12',
    image: '/images/timeline/Grad-May2022.png',
    title: 'High School Graduation',
    date: 'May 2022',
    description: 'Graduated from high school with distinction in the IBDP program, writing a rocket propulsion Extended Essay, and marking the successful completion of secondary education and the beginning of the journey into aerospace engineering.'
  },
  {
    id: '13',
    image: '/images/timeline/MUN-June_2020.JPG',
    title: 'Model United Nations',
    date: 'June 2020',
    description: 'Participated in Model United Nations conference, securing high commendation at my very 2nd MUN in the UNEP committee as the United States delegate.'
  },
  {
    id: '14',
    image: '/images/timeline/WRO-international.jpg',
    title: 'World Robot Olympiad International',
    date: 'November 2019',
    description: 'Competed at the international level and securing rank 15 out of 106 in the World Robot Olympiad, along with securing a perfect score in the surprise rule, demonstrating excellence in competitive problem-solving.'
  },
  {
    id: '15',
    images: ['/images/timeline/WRO-nationals_stage.jpg', '/images/timeline/WRO-nationals.jpg'],
    title: 'World Robot Olympiad National Runner-up',
    date: 'June 2019',
    description: 'Achieved runner-up at the World Robot Olympiad national championships as the group lead',
    isCarousel: true
  }
];

export default function TimelinePage() {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const updated = { ...prev };
        timelineData.forEach(item => {
          if (item.isCarousel && item.images && item.images.length > 1) {
            updated[item.id] = ((updated[item.id] || 0) + 1) % item.images.length;
          }
        });
        return updated;
      });
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
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* EDIT TEXT HERE: Page title */}
          <h1 className="text-7xl font-bold text-gray-900 mb-6">
            Timeline
          </h1>
          {/* EDIT TEXT HERE: Page intro line */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            A visual journey through key moments and achievements
          </p>
          <div className="inline-flex items-center bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-600">
            {/* Icon sizing/color/spacing are controlled by w-4 h-4, text-gray-500, and mr-2 */}
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {/* EDIT TEXT HERE: Helper text above the cards */}
            Hover over any card to reveal detailed descriptions
          </div>
        </div>

        {/* BLOCK GROUP: Cards are generated from timelineData above. */}
        {/* Layout tip: 1 card per row on small screens, 2 on md, 3 on lg, 4 on xl. If you add a 5th card and want 5 on one row (extra large screens), change xl:grid-cols-4 to xl:grid-cols-5. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {timelineData.map((item) => (
            <div
              key={item.id}
              className="flip-card h-80 perspective-1000 cursor-pointer group"
              onClick={() => handleCardFlip(item.id)}
              onMouseEnter={() => handleCardFlip(item.id)}
              onMouseLeave={() => handleCardFlip(item.id)}
            >
              <div className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                flippedCards.has(item.id) ? 'rotate-y-180' : ''
              }`}>
                {/* Front of card */}
                <div className="flip-card-front absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <div className="relative w-full h-full">
                    {item.video ? (
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        preload="metadata"
                        onLoadedData={(e) => {
                          const video = e.target as HTMLVideoElement;
                          video.play().catch(() => {
                            // Autoplay failed, which is normal in some browsers
                          });
                        }}
                      >
                        <source src={item.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : item.isCarousel && item.images ? (
                      <>
                        <Image
                          src={item.images[currentImageIndex[item.id] || 0]}
                          alt={item.title}
                          fill
                          className="object-cover transition-opacity duration-1000 ease-in-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Carousel Dots */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex space-x-1">
                          {item.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(prev => ({ ...prev, [item.id]: index }));
                              }}
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                                (currentImageIndex[item.id] || 0) === index
                                  ? 'bg-white'
                                  : 'bg-white/50 hover:bg-white/75'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <Image
                        src={item.image!}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="bg-black/40 backdrop-blur-sm rounded px-2 py-1">
                        <p className="text-white text-sm font-medium">{item.date}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-black/40 backdrop-blur-sm rounded px-3 py-2 text-right">
                        <h3 className="text-white text-lg font-bold leading-tight">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="flip-card-back absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg bg-white p-6 flex flex-col justify-center">
                  <div className="text-center">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-900 font-bold text-xl flex-1">{item.title}</h3>
                      <svg 
                        className="w-5 h-5 text-gray-400 flex-shrink-0 cursor-pointer" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm mb-4 font-medium">{item.date}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
