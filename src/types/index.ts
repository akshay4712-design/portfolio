// ─── Portfolio Types ──────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Tool {
  name: string;
  category: "design" | "research" | "productivity" | "development";
}

export interface CaseStudy {
  title: string;
  slug: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  isPasswordProtected?: boolean;
  featured: boolean;
  // Detail page fields
  role?: string;
  company?: string;
  timeline?: string;
  team?: string;
  tools?: string[];
  liveUrl?: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  heroGradient?: string;  // CSS gradient for hero
  image?: string;         // project preview image path (from /public)
}

export interface BlogPost {
  title: string;
  excerpt: string;
  content?: string;       // markdown/HTML content for detail page
  publishedAt: string;
  tags: string[];
  slug: string;
  url?: string;           // external link if any
  readTime?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  avatarUrl?: string;
  resumeUrl?: string;
  social: SocialLink[];
  tools: Tool[];
  caseStudies: CaseStudy[];
  blog: BlogPost[];
  certifications: Certification[];
}
