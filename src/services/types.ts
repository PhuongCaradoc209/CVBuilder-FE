export interface BaseResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  _id?: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  jobTitle?: string;
  summary?: string;
  socialLinks?: SocialLink[];
}

export interface Education {
  _id?: string;
  schoolName: string;
  major: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Experience {
  _id?: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Skill {
  _id?: string;
  skillName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | string;
}

export interface Project {
  _id?: string;
  projectName: string;
  description?: string;
  url?: string;
  startDate: string;
  endDate?: string;
}

export interface Certification {
  _id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  url?: string;
}

export interface Language {
  _id?: string;
  languageName: string;
  level: string;
}

export interface CVSection {
  sectionKey: string;
  displayName: string;
  order: number;
  isVisible: boolean;
}

export interface CV {
  _id: string;
  userId: string;
  templateId: string;
  cvTitle: string;
  status: 'draft' | 'published' | 'private' | string;
  personalInfo: PersonalInfo;
  educations: Education[];
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  sections: CVSection[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CVCreateInput {
  cvTitle: string;
  templateId: string;
  status?: string;
  personalInfo?: Partial<PersonalInfo>;
}

export interface CVUpdateInput extends Partial<Omit<CV, '_id' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>> {}

export interface InfoResponse {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  url?: string;
  imgUrl?: string;
  summary: string;
  socialLinks?: SocialLink[];
  gender?: string;
  experiences: Experience[];
  educations: Education[];
  website?: string;
  birthday?: string;
  avatarUrl?: string;
  avatarPublicId?: string;
}
