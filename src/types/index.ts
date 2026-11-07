export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'fullstack' | 'ai-ml' | 'systems' | 'iot';
  categoryBadge: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  accentColor: string;
  iconName: string;
  stats?: { label: string; value: string };
  previewType: 'desktop' | 'mobile' | 'dashboard' | 'cli';
}

export interface Door {
  id: 'fullstack' | 'ai-ml' | 'systems' | 'iot';
  nameplate: string;
  title: string;
  subtitle: string;
  doorColor: string;
  doorBorderColor: string;
  glowColor: string;
  tag: string;
  icon: string;
  summary: string;
  bullets: string[];
}

export interface TimelineMilestone {
  id: string;
  year: string;
  period: string;
  title: string;
  role: string;
  organization: string;
  location: string;
  badge: string;
  summary: string;
  bullets: string[];
  type: 'hackathon' | 'education' | 'certification' | 'internship';
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: Array<{
    name: string;
    level: 'Core' | 'Advanced' | 'Proficient';
    category: string;
  }>;
}

