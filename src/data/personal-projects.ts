export interface PersonalProject {
  id: string;
  title: string; // Big card heading: the company or project name.
  org: string; // Rose subtitle line: the event, program, or company tagline.
  date: string;
  location?: string;
  role: string;
  description: string;
  achievement?: string; // Optional badge pill shown at the top-right of the card.
  technologies: string[];
  href?: string; // Clicking the card opens this URL in a new tab.
  linkLabel?: string; // Footer link text, e.g. "Visit cryp-iq.com". Defaults to "Learn more".
  image?: string;
}

// EDIT TEXT HERE: add a project by appending an object to this array.
// Cards render in array order. Images go in /public/images/.
export const personalProjects: PersonalProject[] = [
  {
    id: 'cryptiq',
    title: 'CryptiQ',
    org: 'Post-Quantum Security Made Easy',
    date: 'Summer 2026',
    location: 'San Francisco, CA',
    role: 'Cofounder',
    description:
      'CryptiQ builds a complete inventory of the cryptography a company actually runs, pinpoints where it depends on quantum-vulnerable encryption, prioritizes what to fix first, and migrates it to NIST post-quantum standards — no consultants, no agents on production systems. Building it with a founding team of four at Founders, Inc.\'s Off Season II program in San Francisco.',
    technologies: [
      'Post-Quantum Cryptography',
      'ML-KEM / ML-DSA',
      'CBOM',
      'Finance & Strategy',
    ],
    href: 'https://www.cryp-iq.com',
    linkLabel: 'Visit cryp-iq.com',
  },
  {
    id: 'luftcar-skybase',
    title: 'LuftCar',
    org: 'Next-Gen Advanced Air Mobility',
    date: 'July 2026',
    role: 'SkyBase Manager',
    description:
      'LuftCar is building a complete Advanced Air Mobility platform — the Meethu™ hydrogen-hybrid eVTOL, SkyBase™ rapid-deploy vertiport infrastructure, and the SkyPAATH™ AI planning system. Designed and built the company\'s website end to end, and now drive growth for the SkyBase™ vertiport platform.',
    technologies: [
      'Next.js',
      'Web Design & Build',
      'SkyBase™ Vertiports',
      'Advanced Air Mobility',
    ],
    href: 'https://www.luftcar.com',
    linkLabel: 'Visit luftcar.com',
  },
  {
    id: 'starkhacks-cadence-labs',
    title: 'Cadence Labs',
    org: 'StarkHacks — World\'s Largest Hardware Hackathon',
    date: 'April 2026',
    role: 'Team member — software & integration',
    description:
      'Turned a Meta Quest 3S into a bimanual VR teleoperation rig for two SO-101 robot arms. Hand tracking streams over UDP into a Python pipeline that solves inverse kinematics with ikpy, controls the grippers via pinch detection, and records each session as a LeRobot training episode for downstream imitation learning.',
    achievement: 'Microsoft AI & Automation — 3rd Place',
    technologies: [
      'Meta Quest 3S',
      'Python',
      'ikpy',
      'LeRobot',
      'OpenCV',
      'Flask',
      'UDP streaming',
    ],
    href: 'https://devpost.com/software/cadence-labs',
    linkLabel: 'View on Devpost',
  },
];
