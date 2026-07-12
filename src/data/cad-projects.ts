// CAD project records. Single source of truth for the home-page ProjectCards
// AND the /project/[slug] pages, so direct visits render without the context
// set by clicking a card. Slugs are locked to the historical URLs and must
// equal ProjectCard's derivation: title.toLowerCase()
//   .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export interface CadProject {
  slug: string;
  title: string;
  description: string;
  metaDescription: string; // <meta name="description"> for the project page
  modelUrl?: string;
  coverImage?: string;
  technologies?: string[];
  details?: string[];
  images?: string[];
  driveLink?: string;
  driveLinkText?: string;
}

export const cadProjects: CadProject[] = [
  {
    slug: 'turbofan-engine-assembly',
    title: 'TurboFan Engine Assembly',
    description:
      'Complete turbofan engine design with bypass ratio optimization and performance analysis using advanced CAD modeling.',
    metaDescription:
      'A complete turbofan engine assembly modeled in Creo Parametric: bypass ratio optimization, CFD analysis, GD&T, interference checks, and a browsable 3D model.',
    modelUrl: '/models/bypass-engine_asm.gltf',
    coverImage: '/images/Engine design.jpg',
    technologies: ['Creo Parametric', 'CFD Analysis', 'Assembly Design', 'GD&T'],
    details: [
      'Full 3D parametric engine assembly',
      'Bypass ratio optimization studies',
      'Component integration and interference checking',
      'Performance parameter calculations',
      'View complete project files and documentation',
    ],
    images: [
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
      '/images/projects/bypass-engine/I_29-1.png',
    ],
    driveLink:
      'https://1drv.ms/f/c/283cc4cea2648e6d/EqHs9hzOskJGoxkfBSoJxOkBe_gegsn2ArnBNl5CevIsHg?e=RtRE7P',
    driveLinkText: 'View Bypass Engine Project Files',
  },
  {
    slug: 'single-piston-sterling-engine',
    title: 'Single Piston Sterling Engine',
    description:
      'Collection of complex mechanical engineering projects showcasing design versatility and technical proficiency.',
    metaDescription:
      'A single piston Sterling engine designed in Siemens NX with Teamcenter and Aras Innovator PLM workflows, showcasing GD&T and mechanical design proficiency.',
    coverImage: '/images/Single Piston Sterling Engine.jpg',
    technologies: ['Siemens NX', 'Aras Innovater', 'Teamcenter', 'GD&T'],
    driveLink:
      'https://onedrive.live.com/?id=%2Fpersonal%2F283cc4cea2648e6d%2FDocuments%2FPersonal%2DWebsite&viewid=0cf2dcd4%2D7efb%2D43cf%2Dae14%2D6c822d324089&view=0',
    driveLinkText: 'View Other CAD Projects',
  },
];
