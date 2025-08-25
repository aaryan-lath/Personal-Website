'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ProjectData {
  title: string;
  description: string;
  modelUrl?: string;
  coverImage?: string;
  technologies?: string[];
  details?: string[];
  images?: string[];
  driveLink?: string;
  driveLinkText?: string;
}

interface ProjectContextType {
  currentProject: ProjectData | null;
  setCurrentProject: (project: ProjectData) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);

  return (
    <ProjectContext.Provider value={{ currentProject, setCurrentProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}