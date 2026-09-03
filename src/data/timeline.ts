// Single source of truth for the timeline / "Awards and Achievements".
// The full list renders on /timeline; the homepage preview shows the FIRST 4
// items of this array (see TimelineCards in src/app/page.tsx). Newest first.
// BLOCK GROUP: each object is one card; add another by copying an object.

export interface TimelineItem {
  id: string;
  image?: string;
  images?: string[];
  video?: string;
  title: string;
  date: string;
  description: string;
  isCarousel?: boolean;
}

export const timelineData: TimelineItem[] = [
  {
    id: 'cryptiq-founders',
    image: '/images/timeline/off-season.jpeg',
    title: 'Co-Founder of CryptiQ',
    date: 'Summer 2026',
    description: 'Cofounder of CryptiQ, building it through Founders, Inc.\'s Off Season II program in San Francisco. CryptiQ helps companies migrate their cryptography to NIST post-quantum standards.'
  },
  {
    id: 'graduated-2026',
    images: ['/images/timeline/Graduation.jpg', '/images/timeline/Grad_image.jpeg'],
    title: 'Graduated!',
    date: 'May 2026',
    description: 'Graduated from Purdue University with a B.S. in Aeronautical and Astronautical Engineering.',
    isCarousel: true
  },
  {
    id: 'cadence-hackathon',
    image: '/images/timeline/Hackathon_Achievement.jpg',
    title: 'Cadence Labs at StarkHacks',
    date: 'April 2026',
    description: 'Built Cadence Labs at StarkHacks: a bimanual VR teleoperation rig that turns a Meta Quest 3S into control for two robot arms. Placed 3rd in the Microsoft AI & Automation category.'
  },
  {
    id: 'sae-aero-east',
    images: ['/images/Aircraft_Solo.jpeg', '/images/Aircraft_Team.jpeg'],
    title: 'SAE Aero Design East Competition',
    date: 'March 2026',
    description: 'The best competition yet for the team: a successful aircraft landing and loads of learning experiences at the SAE Aero Design East competition, marking a major milestone for the PSAEA team.',
    isCarousel: true
  },
  {
    id: 'mk2',
    image: '/images/Mk2.jpg',
    title: 'Mk2',
    date: 'January 2026',
    description: 'Mk2 iteration showing design and performance improvements.'
  },
  {
    id: 'wind-tunnel-test',
    image: '/images/Wind_Tunnel-test.jpeg',
    title: 'Wind_Tunnel-test',
    date: 'January 2026',
    description: 'Wind tunnel testing campaign for aerodynamic validation.'
  },
  {
    id: 'mk1',
    image: '/images/Mk1.png',
    title: 'Mk1',
    date: 'December 2025',
    description: 'Initial Mk1 build and validation milestone.'
  },
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
