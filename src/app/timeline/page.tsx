'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TimelineItem {
  id: string;
  image: string;
  title: string;
  date: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    id: '1',
    image: '/images/timeline/656A9644.jpg',
    title: 'Conference Presentation',
    date: 'November 2024',
    description: 'Presenting aerospace engineering research findings at a major technical conference. This moment captured the culmination of months of hard work and dedication to precision engineering.'
  },
  {
    id: '2',
    image: '/images/timeline/656A9829.jpg',
    title: 'Conference Collaboration',
    date: 'November 2024',
    description: 'Networking and collaborating with fellow researchers at the conference. This collaboration showcased the power of teamwork in solving complex engineering challenges.'
  },
  {
    id: '3',
    image: '/images/timeline/IMG-20240916-WA0008.jpg',
    title: 'Technical Innovation',
    date: 'September 2024',
    description: 'Breakthrough moment in technical development. This image represents a key innovation that pushed our project to new heights.'
  },
  {
    id: '4',
    image: '/images/timeline/IMG-20241026-WA0007.jpg',
    title: 'Research Progress',
    date: 'October 2024',
    description: 'Documenting progress in our ongoing research efforts. Each step forward brings us closer to our engineering goals.'
  },
  {
    id: '5',
    image: '/images/timeline/IMG-20250808-WA0007.jpg',
    title: 'Summer Research',
    date: 'August 2025',
    description: 'Summer research program achievements. This represents significant progress in our ongoing aerospace engineering research initiatives.'
  },
  {
    id: '6',
    image: '/images/timeline/IMG-20250808-WA0018.jpg',
    title: 'Advanced Testing',
    date: 'August 2025',
    description: 'Conducting advanced testing procedures during summer research program to validate our engineering solutions and ensure optimal performance.'
  },
  {
    id: '7',
    image: '/images/timeline/IMG-20250808-WA0027.jpg',
    title: 'Project Implementation',
    date: 'August 2025',
    description: 'Key project implementation milestone during summer research. This showcases the successful application of theoretical concepts to practical solutions.'
  },
  {
    id: '8',
    image: '/images/timeline/IMG_20241026_184309.jpg',
    title: 'Research Session',
    date: 'October 2024',
    description: 'Dedicated research work session. These focused efforts often yield the most creative solutions to engineering challenges and drive innovation forward.'
  }
];

export default function TimelinePage() {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

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

  const cardColors = [
    'bg-blue-50 hover:bg-blue-100',
    'bg-purple-50 hover:bg-purple-100',
    'bg-green-50 hover:bg-green-100',
    'bg-yellow-50 hover:bg-yellow-100',
    'bg-orange-50 hover:bg-orange-100',
    'bg-red-50 hover:bg-red-100',
    'bg-indigo-50 hover:bg-indigo-100',
    'bg-pink-50 hover:bg-pink-100'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold text-gray-900 mb-6">
            Timeline
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A visual journey through key moments and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className="flip-card h-80 perspective-1000 cursor-pointer"
              onClick={() => handleCardFlip(item.id)}
            >
              <div className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                flippedCards.has(item.id) ? 'rotate-y-180' : ''
              }`}>
                {/* Front of card */}
                <div className={`flip-card-front absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  cardColors[index % cardColors.length]
                }`}>
                  <div className="relative w-full h-48">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-white backdrop-blur-sm text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-lg border border-gray-200">
                      {item.date}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900 font-bold text-lg">{item.title}</h3>
                      <svg 
                        className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Click to learn more about this milestone...
                    </p>
                  </div>
                </div>

                {/* Back of card */}
                <div className={`flip-card-back absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg p-6 flex flex-col justify-center ${
                  cardColors[index % cardColors.length]
                }`}>
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