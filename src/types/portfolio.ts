/**
 * Core type definitions for the Academic Portfolio.
 * Designed to ensure strict academic honesty, verifiable details, and modular editing.
 */

export interface StudentProfile {
  name: string;
  monogram: string;
  applicantStatus: string; // e.g., "Prospective Undergraduate Scholar · Fall 2026"
  kicker: string; // "PERSONAL ACADEMIC PORTFOLIO"
  headline: string; // "Curiosity into Contribution."
  leadBio: string;
  secondaryBio?: string;
  portraitType: 'typographic' | 'image';
  portraitImageUrl?: string;
  email: string;
  location: string;
  githubUrl?: string;
  linkedinUrl?: string;
  scholarUrl?: string;
}

export interface IntellectualPillar {
  title: string;
  subtitle: string;
  description: string;
}

export interface AboutContent {
  biography: string[];
  intellectualApproach: string;
  universityAspirations: string;
  pillars: IntellectualPillar[];
}

export interface AcademicInterest {
  id: string;
  title: string;
  discipline: string;
  description: string;
  coreQuestions: string[];
  foundationalTexts: string[];
  relatedProjectIds?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Computational' | 'Quantitative' | 'Cognitive' | 'Interdisciplinary';
  year: string;
  status: 'Completed' | 'Ongoing Inquiry' | 'Open Source Archive';
  shortOverview: string;
  problemStatement: string;
  studentContribution: string;
  methodology: string[];
  outcomesAndLessons: string;
  diagramType: 'linguistics' | 'policy' | 'cognition' | 'algorithms';
  diagramCaption: string;
  liveUrl?: string;
  githubUrl?: string;
  documentUrl?: string;
  featured: boolean;
}

export interface ResearchInquiry {
  id: string;
  topic: string;
  researchQuestion: string;
  status: 'Independent Inquiry' | 'Literature Review' | 'Empirical Exploration' | 'Manuscript Draft';
  methodApproach: string;
  keyInsights: string[];
  references: string[];
  dateStarted: string;
}

export interface Achievement {
  id: string;
  title: string;
  awardingBody: string;
  year: string;
  category: 'Academic Competition' | 'Olympiad' | 'Standardized / AP' | 'Program Fellowship' | 'Institutional Honor';
  description: string;
  isVerified: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    focus: string;
  }[];
}

export interface TimelineMilestone {
  id: string;
  year: string;
  semester: string;
  title: string;
  category: 'Milestone' | 'Research' | 'Coursework' | 'Project' | 'Reading';
  description: string;
  impactOrOutput?: string;
}

export interface PortfolioData {
  profile: StudentProfile;
  about: AboutContent;
  academicInterests: AcademicInterest[];
  projects: Project[];
  researchInquiries: ResearchInquiry[];
  achievements: Achievement[];
  skills: SkillCategory[];
  timeline: TimelineMilestone[];
}
