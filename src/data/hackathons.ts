export interface Hackathon {
  id: string;
  name: string;
  date: string;
  location?: string;
  project: string;
  role: string;
  description: string;
  achievement?: string;
  technologies: string[];
  href?: string; // Clicking the card opens this URL in a new tab.
  image?: string;
}

// EDIT TEXT HERE: add a hackathon by appending an object to this array.
// Images go in /public/images/hackathons/.
export const hackathons: Hackathon[] = [
  {
    id: 'starkhacks-cadence-labs',
    name: 'StarkHacks — World\'s Largest Hardware Hackathon',
    date: 'April 2026',
    project: 'Cadence Labs',
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
  },
];
