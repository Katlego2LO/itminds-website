import { slugify } from "@/lib/utils";
import type { Faculty, Programme, TrainingCourse } from "./types";

/**
 * Seed content from the specification (sections 5.1 and 5.5).
 * This is the fallback source. When Supabase is configured, lib/data/queries.ts
 * reads the same shapes from the database so the admin area can edit them.
 * Fields set to null are awaiting client content (spec section 5.3).
 */

export const faculties: Faculty[] = [
  {
    slug: "software-development",
    name: "Software Development",
    accent: "software",
    summary:
      "Build reliable software, from web and mobile applications to complete full stack systems.",
  },
  {
    slug: "networking-cloud",
    name: "Networking & Cloud Computing",
    accent: "networking",
    summary:
      "Design, secure and administer the networks and cloud platforms that organisations run on.",
  },
  {
    slug: "data-ai",
    name: "Data & AI Technologies",
    accent: "data",
    summary: "Turn data into decisions with analytics, machine learning and business intelligence.",
  },
  {
    slug: "it-support-systems",
    name: "IT Support & Systems",
    accent: "support",
    summary:
      "Keep people and technology working: hardware, operating systems and service management.",
  },
  {
    slug: "digital-design-multimedia",
    name: "Digital Design & Multimedia",
    accent: "design",
    summary:
      "Create digital experiences, motion graphics and content with a professional workflow.",
  },
  {
    slug: "emerging-tech-innovation",
    name: "Emerging Tech & Innovation",
    accent: "emerging",
    summary:
      "Work with the technologies shaping industry next: IoT, automation, blockchain and AI.",
  },
];

type Row = [faculty: string, name: string, level: 4 | 5];

const rows: Row[] = [
  ["software-development", "Software Development", 4],
  ["software-development", "Web Development", 4],
  ["software-development", "Mobile App Development", 5],
  ["software-development", "Full Stack Development", 5],
  ["networking-cloud", "Network Support", 4],
  ["networking-cloud", "Cloud Computing", 5],
  ["networking-cloud", "Cybersecurity", 5],
  ["networking-cloud", "Systems Administration", 5],
  ["data-ai", "Data Analytics", 5],
  ["data-ai", "AI & Machine Learning Fundamentals", 5],
  ["data-ai", "Big Data Technologies", 5],
  ["data-ai", "Business Intelligence", 5],
  ["it-support-systems", "IT Support Technician", 4],
  ["it-support-systems", "Computer Hardware", 4],
  ["it-support-systems", "Operating Systems", 4],
  ["it-support-systems", "IT Service Management", 5],
  ["digital-design-multimedia", "UI/UX Design", 4],
  ["digital-design-multimedia", "Graphic & Motion Design", 5],
  ["digital-design-multimedia", "Digital Content Creation", 4],
  ["digital-design-multimedia", "Video Editing & Production", 5],
  ["emerging-tech-innovation", "Internet of Things (IoT)", 5],
  ["emerging-tech-innovation", "Robotic Process Automation (RPA)", 5],
  ["emerging-tech-innovation", "Blockchain Technology", 5],
  ["emerging-tech-innovation", "AI Prompt Engineering", 5],
];

export const programmes: Programme[] = rows.map(([facultySlug, name, nqfLevel]) => ({
  slug: slugify(name),
  name,
  facultySlug,
  nqfLevel,
  qualificationType: null,
  saqaId: null,
  duration: null,
  mode: null,
  entryRequirements: null,
  summary: null,
  aiIntegrated: true,
}));

const corporate = [
  "AI in the Modern Business Environment",
  "AI Productivity Masterclass",
  "AI for Human Resources",
  "AI for Finance & Accounting",
  "AI for Data Analysis",
  "AI for Small Businesses & SMMEs",
  "AI-Powered Entrepreneurship & Innovation",
  "AI Leadership for Managers and Executives",
  "AI for Public Sector & Government",
  "AI Literacy for Schools and Young People",
];

export const trainingCourses: TrainingCourse[] = corporate.map((name) => ({
  slug: slugify(name),
  name,
  track: "corporate",
  audience: null,
  duration: null,
  deliveryMode: null,
  summary: null,
  partner: true,
}));

export const values = [
  "Innovation",
  "Excellence",
  "Digital Leadership",
  "Integrity",
  "Lifelong Learning",
  "Collaboration",
  "Adaptability",
];

export const supportServices = [
  {
    name: "Academic Support",
    description: "Guidance from lecturers and tutors throughout your studies.",
  },
  {
    name: "Career Guidance & Placement",
    description: "Help preparing for work and finding the right opportunity.",
  },
  { name: "AI & Tech Labs", description: "Hands-on practice with current tools and equipment." },
  {
    name: "E-Learning Platform",
    description: "Study material and progress available wherever you are.",
  },
  {
    name: "Industry Projects & Internships",
    description: "Real project experience with industry partners.",
  },
  {
    name: "Entrepreneurship Support",
    description: "Mentoring for students who want to start something of their own.",
  },
  { name: "Counselling & Wellness", description: "Confidential support for your wellbeing." },
];

/**
 * Programmes that overlap with a short course (spec 3.3). Each side links to the
 * other and states which one is the accredited qualification.
 */
export const programmesWithShortCourse = new Set([
  "ai-and-machine-learning-fundamentals",
  "ai-prompt-engineering",
]);
