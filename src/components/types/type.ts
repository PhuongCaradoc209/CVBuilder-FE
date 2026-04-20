export interface Info {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  url?: string;
  imgUrl?: string;
  summary: string;
}

export interface Experience {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  schoolName: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  skillName: string;
  level?: string;
}

export interface Project {
  projectName: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
}

export interface Certificate {
  // = Reward
  name: string;
  issuer: string; // nơi cấp
  issueDate: string;
  expiryDate?: string;
  url?: string;
}

export interface Language {
  languageName: string;
  level?: string;
}

export interface CVData {
  info: Info;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects?: Project[];
  certificates: Certificate[];
  languages: Language[];
}
