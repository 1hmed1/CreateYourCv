export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  summary: string;
  photoUrl?: string;
  showPhoto?: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface CvData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    tags: string[];
}

export interface PortfolioData {
    personalInfo: PersonalInfo;
    projects: Project[];
}

export type Template = 'modern' | 'classic' | 'professional' | 'creative';
