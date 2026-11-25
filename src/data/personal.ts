export interface SocialLink {
  id: 'github' | 'linkedin' | 'email';
  label: string;
  handle: string;
  href: string;
  external: boolean;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  academicStatus: string;
  duration?: string;
  coursework?: string[];
  highlights?: string[];
}

export interface InterestItem {
  id: string;
  title: string;
  focus: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

export const PERSONAL_INFO = {
  name: 'Awlin Sajan',
  shortMark: 'Awlin Sajan',
  roleTitle: 'Computer Science Student | Aspiring Software Developer',
  heroHeadline: 'Turning ideas into meaningful digital experiences.',
  heroAlternativeHeadline: "Curious mind. Creative solutions. Building what's next.",
  heroDescription:
    "I'm a Computer Science student passionate about technology, software development, problem solving, and building meaningful digital products. I enjoy exploring new ideas, learning how things work, and transforming concepts into practical solutions.",
  heroImage: '/assets/aistudio/image_e9c630bd_74742fb9.png',
  heroImageAlt: 'Portrait of Awlin Sajan, Computer Science student and aspiring software developer',
  aboutParagraphs: [
    "I'm a Computer Science student with an interest in software development, technology, and innovation. I enjoy exploring ideas, solving problems, learning new technologies, and building projects that turn concepts into practical solutions.",
    'My journey in technology is driven by curiosity and a desire to continuously improve my skills. I believe every project is an opportunity to learn something new, experiment with ideas, and develop a better understanding of how technology can solve real-world problems.',
  ],
  careerFocus:
    'Focused on strengthening core computer science foundations while designing clean, dependable software systems.',
  contactHeading: "Let's connect.",
  contactDescription:
    "I'm always open to connecting, exploring ideas, learning from others, and discussing opportunities to build meaningful projects.",
  footerTagline: 'Designed with curiosity. Built with purpose.',
  email: 'awlinsajanofficial@gmail.com',
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'Awlin-tech',
    href: 'https://github.com/Awlin-tech',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/awlin-sajan',
    href: 'https://www.linkedin.com/in/awlin-sajan',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'awlinsajanofficial@gmail.com',
    href: 'mailto:awlinsajanofficial@gmail.com',
    external: false,
  },
];

/**
 * Editable education records.
 * Add academic duration, relevant coursework, or highlights when ready.
 */
export const EDUCATION_DATA: EducationEntry[] = [
  {
    id: 'rset-btech-cse',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    institution: 'Rajagiri School of Engineering and Technology',
    academicStatus: 'Undergraduate Program',
    duration: '', // Editable: e.g. '2024 – 2028'
    coursework: [],
    highlights: [],
  },
  {
    id: 'nava-nirman-school',
    degree: 'Completed Schooling',
    institution: 'Nava Nirman Public School',
    academicStatus: 'School Education',
    duration: '', // Editable: add graduation year if desired
    coursework: [],
    highlights: [],
  },
];

export const INTERESTS_DATA: InterestItem[] = [
  {
    id: 'software-development',
    title: 'Software Development',
    focus: 'Designing maintainable applications and user-centered software systems',
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    focus: 'Breaking complex challenges into structured, algorithmic steps',
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    focus: 'Understanding intelligent systems and practical ML applications',
  },
  {
    id: 'data-science',
    title: 'Data Science',
    focus: 'Extracting clarity and patterns from structured datasets',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    focus: 'Exploring secure system design and defensive fundamentals',
  },
  {
    id: 'tech-innovation',
    title: 'Technology and Innovation',
    focus: 'Experimenting with emerging tools and modern engineering workflows',
  },
];
