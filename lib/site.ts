export const site = {
  name: "IT Minds Institute",
  domain: "www.itminds.ac.za",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Learn | Innovate | Empower",
  description:
    "Quality, future-focused IT education and training with Artificial Intelligence at the core of innovation. QCTO accredited and aligned to the NQF.",
  accreditation: { qcto: "SDP122596" },
  // Replace once confirmed by the client (spec section 9, items 6 and 11)
  elearningUrl: process.env.NEXT_PUBLIC_ELEARNING_URL ?? "/e-learning",
  contact: { email: "info@itminds.ac.za", phone: "" },
  social: { facebook: "", linkedin: "", instagram: "" },
} as const;

export const primaryNav = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Mission and Vision", href: "/about/mission-vision" },
      { label: "Our Cycle", href: "/about/our-cycle" },
      { label: "Governance", href: "/about/governance" },
      { label: "Accreditation", href: "/about/accreditation" },
      { label: "Student Support", href: "/about/student-support" },
      { label: "Contact", href: "/contact" },
    ],
  },
  { label: "Faculties", href: "/faculties" },
  { label: "Skills & Training", href: "/skills-training" },
  { label: "Business School", href: "/business-school" },
  {
    label: "Admissions",
    href: "/admissions",
  },
  { label: "News & Events", href: "/news" },
] as const;
