'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { timelineData } from '../../data/timeline';

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
      <div className="pt-20 pb-12 sm:pb-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          {/* EDIT TEXT HERE: Page title */}
          <h1 className="text-4xl sm:text-7xl font-bold text-gray-900 mb-4 sm:mb-6">
            Timeline
          </h1>
          {/* EDIT TEXT HERE: Page intro line */}
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
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
