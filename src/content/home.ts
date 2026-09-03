// ===========================================================================
// HOME PAGE WORDS
//
// Everything the home page says lives in this file. Edit the text between the
// quotes, keep the quotes and commas, save, and the page updates.
//
// Adding a card? Copy one { ... } block inside a list, paste it below, and
// change the words. Deleting a card? Delete its whole { ... } block.
//
// See EDITING.md in the project root for the full guide.
// ===========================================================================

// Colour themes available to the cards below. Use one of these names in an
// `accent` field: indigo, cyan, purple, teal.
export type Accent = 'indigo' | 'cyan' | 'purple' | 'teal';

// Icons available to the cards below. Use one of these names in an `icon`
// field. To add a new one, add its SVG to ICONS in src/components/CardIcon.tsx.
export type IconName =
  | 'briefcase'
  | 'lightbulb'
  | 'beaker'
  | 'shield'
  | 'rocket'
  | 'engine'
  | 'car';

// --- Hero (the first screen) ----------------------------------------------
export const hero = {
  name: 'Aaryan Lath',
  // Rotating line under the name. Each word is shown after "Aspiring",
  // except "Leader", which is shown on its own.
  rotatingPrefix: 'Aspiring',
  rotatingWords: ['Systems Engineer', 'Product and Design Engineer', 'Changemaker'],
  intro:
    "As an AAE graduate from Purdue, I've consistently demonstrated academic excellence being in the Dean's List for every semester while gaining hands-on experience in complex engineering projects, positioning me to tackle multidisciplinary challenges in aerospace and beyond. My unique perspective, experience and first principles thinking combines technical expertise with business acumen, understanding how decisions impact organizational success. My research interests are in multidisciplinary design optimization and systems engineering.",
  profileImage: '/images/profile.jpeg',
};

// --- Section headings and intro lines --------------------------------------
export const sections = {
  projects: {
    title: 'Personal Projects',
    intro: 'Startups, ventures and build sprints — what I ship outside the classroom',
  },
  academia: {
    title: 'Academia',
    intro:
      'With a GPA of 3.73, I am constantly challenging myself with taking advanced graduate level courses such as Multidisciplinary Design Optimization and Intermediate Aerodynamics (AAE 550 and AAE 514) and developing skills through clubs, projects while balancing Research, Teaching Assistant position. To view more courses and course related projects, click on View more.',
    ctaLabel: 'View More',
  },
  internships: {
    title: 'Professional Experiences',
  },
  activities: {
    title: 'Applied Engineering Projects',
    ctaLabel: 'View Complete Design Portfolio',
  },
  timeline: {
    title: 'Awards and Achievements',
    intro: 'Milestones in academic excellence and professional growth',
    ctaLabel: 'View Full Timeline',
    helperText: 'Hover over any card to reveal detailed descriptions',
  },
  contact: {
    title: 'Resume & Contact',
    intro:
      'Download my resume and get in touch for aerospace engineering collaboration opportunities',
  },
};

// --- Professional Experiences ---------------------------------------------
// The first three render as normal cards across the top row. Any entry with
// `wide: true` drops below them and spans the full width.
export const experiences = [
  {
    role: 'Mechanical Engineer / Product Designer',
    org: 'Siemens Smart Infrastructure',
    dates: 'July 2026 - Present',
    accent: 'indigo' as Accent,
    icon: 'briefcase' as IconName,
    // Optional opening line above the bullets. Delete the line to drop it.
    // Text wrapped in **double asterisks** renders bold.
    intro:
      "Current full-time role at the Grand Prairie office, after joining Siemens' Smart Infrastructure mechanical department as a **Systems Engineering Intern** in Summer 2025:",
    bullets: [
      'Designed panelboard enclosures in CREO and executed ECNs in SAP.',
      'Streamlined switchboard configurations by engineering neutral assemblies to resolve design edge cases.',
      'Developed automation scripts to refine a back-end algorithm for BOM generation on orders.',
    ],
    tags: ['CREO CAD', 'Product Design', 'SAP', 'Automation'],
  },
  {
    role: 'Undergraduate Teaching Assistant',
    org: 'Purdue University',
    dates: 'Jan 2025 - May 2026',
    accent: 'cyan' as Accent,
    icon: 'lightbulb' as IconName,
    intro: 'TA for AAE 351 and the Aircraft and Spacecraft Design class (AAE 251):',
    bullets: [
      'AAE 351: Automated team selection via HTML and backend optimization, improving course logistics and data flow.',
      'Graded industry-mimicked SDRs/SRRs for 7 teams, with feedback on technical strategy.',
      'AAE 251: Led study sessions for 50+ students on course material and MATLAB debugging.',
      'Supported students on key design principles for their aircraft and spacecraft design projects.',
    ],
    tags: ['Teaching', 'MATLAB', 'Design Reviews', 'Aircraft Design', 'Student Mentoring'],
  },
  {
    role: 'Student Grader',
    org: 'Purdue University',
    dates: 'Fall 2024, Spring 2026',
    accent: 'cyan' as Accent,
    icon: 'lightbulb' as IconName,
    intro: 'Grader for the Aircraft and Spacecraft Design class (AAE 251):',
    bullets: [
      'Corrected 80+ Homework questions and Individual Self-Assessments.',
      'Provided relevant feedback to help the student improve the quality of their work for subsequent homeworks',
    ],
    tags: ['Grading', 'Aircraft Design', 'Spacecraft Design', 'Feedback'],
  },
  {
    role: 'Undergraduate Researcher',
    org: 'Resilient Extraterrestrial Habitat Institute (RETHi)',
    dates: 'Summer 2024 - Spring 2025',
    accent: 'purple' as Accent,
    icon: 'beaker' as IconName,
    // wide: true puts this card on its own full-width row under the others.
    wide: true,
    intro: 'Two research projects at Purdue RETHi: Systems Engineering and Vibration Isolation:',
    bullets: [
      'Trade studies for safety control evaluation and habitat resilience assessment.',
      'Lunar habitat disruption analysis.',
      'FEA simulations for vibration isolation.',
      'Tensile testing of Vectran straps with stitching patterns.',
    ],
    tags: ['Systems Engineering', 'Trade Studies', 'FEA', 'Tensile Testing'],
    // Optional link out of the card. Delete both lines to drop the link.
    linkHref: '/research/rethi',
    linkLabel: 'View research →',
  },
];

// --- Academia: highlighted course cards ------------------------------------
export const courseHighlights = [
  {
    title: 'AAE 571: Complex System Safety',
    subtitle: 'Graduate Level Course',
    icon: 'shield' as IconName,
    description:
      'Performed accident-style analysis and wrote a conference-style research paper investigating the safety challenges and risk mitigation strategies for propulsion systems for urban air mobility vehicles (UAMs).',
    // Optional report link. Delete both lines to drop the link.
    linkHref:
      'https://1drv.ms/b/c/283cc4cea2648e6d/IQDoS6CLJZmyTJFwCmTZQf8gAZhJQr0ZtMoLTUnXOJUff_o?e=jtXzlR',
    linkLabel: 'View Report on OneDrive',
  },
  {
    title: 'AAE 418: Zero-Gravity Flight Experiment',
    subtitle: 'Advanced Experimental Design',
    icon: 'rocket' as IconName,
    description:
      'Undergraduate team lead for the Small Suborbital orbital refuelling experiment, working under the course TA as project manager. Created the requirements and budgets and led 7 engineers through the design of the experiment to be launched on the New Shepard flight.',
  },
  {
    title: 'AAE 339: Aerospace Propulsion',
    subtitle: 'Advanced Propulsion Systems',
    icon: 'engine' as IconName,
    description:
      'Conducted an extensive literature survey on novel techniques within the Urban Air Mobility sector, focusing on Distributed Electric Propulsion (DEP) systems to reduce acoustic noise and optimize battery thermal management.',
    linkHref:
      'https://1drv.ms/b/c/283cc4cea2648e6d/IQA6yHs1H-h6S7gXfrI9-l6AAdf22eKL4iGEPXAwWg3WuQU?e=wKxTTw',
    linkLabel: 'View Report on OneDrive',
  },
  {
    title: 'AAE 412: Computational Fluid Dynamics',
    subtitle: 'Advanced CFD Course',
    icon: 'car' as IconName,
    description:
      'Simulated the performance of a car using an Ahmed Body approximation. Looked at the effect of different slant angles on drag, downforce and overall car behavior.',
    linkHref:
      'https://1drv.ms/b/c/283cc4cea2648e6d/IQCuAfC-0OVNToe4aU7R4HdiAYk1XaGxYH36NZPu4yecjRw?e=dzhqSN',
    linkLabel: 'View Report on OneDrive',
  },
];

// --- Applied Engineering Projects: the two team cards ----------------------
export const activityCards = [
  {
    title: 'Purdue Aircraft Teams',
    href: '/activities/purdue-aircraft-teams',
    color: 'blue' as const,
    description:
      "Active member of Purdue's aircraft design and competition teams, participated in national competitions including AUVSI SUAS and AIAA Design/ Build/ Fly competitions. Retired as Chief Engineer of the SAE Aero Design team in SAE Purdue after leading it through the SAE Aero Design East 2026 competition.",
    tags: ['Aircraft Design', 'Manufacturing', 'Testing', 'Leadership'],
    ctaLabel: 'Click to learn more →',
  },
  {
    title: 'Purdue Space Program',
    href: '/activities/purdue-space-program',
    color: 'purple' as const,
    description:
      'Contributed to the PSP Satellites team as a Structures, Mechanisms and Thermals member, deputy systems director and to the entire organization of 10 teams as the secretary.',
    tags: ['Space Systems', 'Systems Engineering', 'Mission Design', 'Collaboration'],
    ctaLabel: 'Click to learn more →',
  },
];

// --- Resume & Contact section --------------------------------------------
export const contact = {
  resumeColumnTitle: 'Resume',
  columnTitle: 'Get In Touch',
  intro:
    "Interested in hiring a dedicated, well-rounded professional whose ambitions never sleep? Have questions about my work or want to discuss opportunities? I'd love to connect.",
  email: 'aaryanlath05@gmail.com',
  emailButtonLabel: 'Send Email',
  linkedinUrl: 'https://www.linkedin.com/in/aaryan-lath/',
  linkedinButtonLabel: 'LinkedIn Profile',
  emailLabel: 'Email:',
  locationLabel: 'Current Location:',
  location: 'West Lafayette, IN',
};

// --- Resume viewer options (the picker in the Resume & Contact section) ----
export const resumeOptions = {
  aerodynamics: {
    name: 'Aerodynamics Based',
    file: '/Aaryan_Lath-Resume.pdf',
    description: 'Focused on aerospace engineering and aircraft design',
    type: 'pdf',
  },
  mechanical: {
    name: 'Mechanical Based',
    file: '/Aaryan_Lath-Resume.pdf',
    description: 'Emphasis on mechanical engineering and systems',
    type: 'pdf',
  },
  portfolio: {
    name: 'Portfolio',
    file: 'https://onedrive.live.com/embed?resid=283CC4CEA2648E6D%21109&authkey=%21AIJ9R9xRLBk3P14&em=2',
    description: 'Complete portfolio of projects and work',
    type: 'iframe',
  },
} as const;
