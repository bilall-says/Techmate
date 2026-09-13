export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  features: string[];
  techStack: string[];
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  color: string;
  features: string[];
  client: string;
  timeline: string;
  type: 'fintech' | 'healthtech' | 'ecommerce';
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Cloud & AI';
  icon: string;
  level: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  position: string;
  company: string;
  avatarInitials: string;
  avatarBg: string;
  rating: number;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  projectType: string;
  projectBudget: string;
  message: string;
  requestNda?: boolean;
}
