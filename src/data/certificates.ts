export type CertificateCategory =
  | 'All'
  | 'Certifications'
  | 'Internships'
  | 'Courses'
  | 'Workshops'
  | 'Hackathons'
  | 'Competitions'
  | 'Achievements';

export interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  category: Exclude<CertificateCategory, 'All'>;
  date?: string;
  description: string;
  image?: string;
  verificationUrl?: string;
}

export const CERTIFICATE_CATEGORIES: CertificateCategory[] = [
  'All',
  'Certifications',
  'Internships',
  'Courses',
  'Hackathons',
  'Competitions',
  'Workshops',
  'Achievements',
];

/**
 * Centralized, editable certificates, internships, courses, workshops, hackathons, and competitions.
 */
export const CERTIFICATES_DATA: CertificateItem[] = [
  // Internships
  {
    id: 'java-full-stack-developer-program',
    title: 'Java Full Stack Developer Program',
    organization: 'Rajagiri School of Engineering & Technology (AI & DS · IT)',
    category: 'Internships',
    date: '4 – 15 May 2026',
    description:
      'Completed the internship program covering Core Java and full-stack project assignments organized by the Departments of AI & DS and IT at RSET.',
    image: '/assets/aistudio/1_71e24f0e.jpeg',
    verificationUrl: '',
  },

  // Certifications
  {
    id: 'digital-101-future-prime-skill',
    title: 'Digital 101 – 30 Hours (Gold Category)',
    organization: 'FutureSkills Prime · NASSCOM',
    category: 'Certifications',
    date: '30 April 2026',
    description:
      'Achieved Gold Category (70% and above) clearing the Digital 101 – 30 Hours assessment aligned to IT-ITeS Sector Skills Council NASSCOM competency standards.',
    image: '/assets/aistudio/4_a33aaa55.jpeg',
    verificationUrl: '',
  },

  // Courses
  {
    id: 'ai-course-infosys-springboard',
    title: 'Artificial Intelligence',
    organization: 'Infosys Springboard',
    category: 'Courses',
    date: '4 May 2026',
    description:
      'Course completion certificate awarded by Infosys Springboard for completing the Artificial Intelligence program.',
    image: '/assets/aistudio/2_e2a381a8.jpeg',
    verificationUrl: '',
  },
  {
    id: 'english-technical-professionals-ieee',
    title: 'IEEE English for Technical Professionals',
    organization: 'IEEE',
    category: 'Courses',
    date: '30 March 2026',
    description:
      'Certificate of Completion for Final IEEE English for Technical Professionals, focused on technical documentation, engineering communication, and professional clarity.',
    image: '/assets/aistudio/3_e77fe671.jpeg',
    verificationUrl: '',
  },

  // Hackathons
  {
    id: 'tathack-26-nit-calicut',
    title: "Tathack'26 — National Level Hackathon",
    organization: "NIT Calicut (Tathva '26)",
    category: 'Hackathons',
    date: '2026',
    description:
      "Participated in Tathack'26, a national-level hackathon organized as part of Tathva '26 by the National Institute of Technology Calicut.",
    image: '/assets/aistudio/13_abbb2d93.jpeg',
    verificationUrl: '',
  },
  {
    id: 'adobe-university-hackathon',
    title: 'Adobe University Hackathon',
    organization: 'Adobe · Unstop',
    category: 'Hackathons',
    date: '9 August 2026',
    description:
      'Participated in the Adobe University Hackathon organized by Adobe, representing Rajagiri School of Engineering and Technology (RSET).',
    image: '/assets/aistudio/Adobe_hackathon_ab578ec7.jpeg',
    verificationUrl: '',
  },
  {
    id: 'adaptathon-techkshetra-26',
    title: "Adaptathon — Techkshetra '26",
    organization: 'Rajagiri School of Engineering & Technology',
    category: 'Hackathons',
    date: '15 September 2026',
    description:
      'Participated in Adaptathon as part of Techkshetra 2026, an inter-college level tech fest held at RSET.',
    image: '/assets/aistudio/12_accaeaaf.jpeg',
    verificationUrl: '',
  },
  {
    id: 'spin-hack-2-saintgits',
    title: 'SPIN HACK 2.0 — Web Development Hackathon',
    organization: 'Saintgits IEEE Student Branch',
    category: 'Hackathons',
    date: '21 June 2026',
    description:
      'Participated in SPIN HACK 2.0, a web development hackathon organized by the Saintgits College of Engineering IEEE Student Branch.',
    image: '/assets/aistudio/spin_hack2.0_14c47625.jpeg',
    verificationUrl: '',
  },

  // Competitions
  {
    id: 'quizoff-2026-campuscrew',
    title: "QuizOff 2026: India's Biggest AI Quiz",
    organization: 'CampusCrew · Unstop',
    category: 'Competitions',
    date: '19 July 2026',
    description:
      "Competed among 525,000+ students across 48,500+ institutions in QuizOff 2026: India's Biggest AI Quiz hosted on Unstop.",
    image: '/assets/aistudio/quizoff_ae31804f.jpeg',
    verificationUrl: '',
  },
  {
    id: 'coder-of-the-month-csi',
    title: 'Coder of the Month — Coding Competition',
    organization: 'Computer Society of India (CSI) SB · RSET',
    category: 'Competitions',
    date: '11 October 2025',
    description:
      'Participated in the college-level online coding competition Coder of the Month organized by the CSI Student Branch at RSET.',
    image: '/assets/aistudio/9_786f0532.jpeg',
    verificationUrl: '',
  },
  {
    id: 'decode-and-conquer-ctf',
    title: 'Decode and Conquer — Mini Capture-the-Flag',
    organization: 'Computer Society of India (CSI) SB · RSET',
    category: 'Competitions',
    date: '2 October 2025',
    description:
      'Participated in the intra-college mini Capture-the-Flag event Decode and Conquer as part of Homecoming Week 3.0 at RSET.',
    image: '/assets/aistudio/5_893ea89f.jpeg',
    verificationUrl: '',
  },
  {
    id: 'treasure-hunt-ieee-rset',
    title: 'Treasure Hunt — IEEE SB RSET',
    organization: 'IEEE SB RSET · IEEE Computer Society',
    category: 'Competitions',
    date: '12 September 2025',
    description:
      'Participated in the Treasure Hunt technical event conducted by IEEE Student Branch RSET.',
    image: '/assets/aistudio/6_80d02e8d.jpeg',
    verificationUrl: '',
  },

  // Workshops & Bootcamps
  {
    id: 'google-product-understanding-study-notebooks',
    title: 'Product Understanding – Study Notebooks',
    organization: 'Google Student Ambassador Program',
    category: 'Workshops',
    date: '15 November 2026',
    description:
      'Participated in the Product Understanding – Study Notebooks session conducted under the Google Student Ambassador Program 2026.',
    image: '/assets/aistudio/16_7f7b9c26.jpeg',
    verificationUrl: '',
  },
  {
    id: 'gen-ai-tools-nasa-space-apps-bootcamp',
    title: 'Gen AI and Tools & NASA Space Apps Bootcamp',
    organization: 'IEEE RAS SBC · JCMCSIIT',
    category: 'Workshops',
    date: '19 September 2026',
    description:
      'Participated in the Gen AI and Tools and NASA Space Apps Bootcamp organized by the IEEE Robotics & Automation Society Student Branch Chapter.',
    image: '/assets/aistudio/14_c9bc3c4a.jpeg',
    verificationUrl: '',
  },
  {
    id: 'cybersecurity-in-action-confluence',
    title: 'Cybersecurity in Action: Understanding Threats, Attacks & Defense',
    organization: 'IBS Software · RSET (Confluence 3.0)',
    category: 'Workshops',
    date: '1 September 2026',
    description:
      'Participated in the Cybersecurity in Action workshop conducted as part of Confluence 3.0 Industry-Academia Summit at RSET.',
    image: '/assets/aistudio/cybersecurity_in_action_145bb48e.jpeg',
    verificationUrl: '',
  },
  {
    id: 'introduction-to-git-and-github-mbits',
    title: 'Introduction to Git & GitHub',
    organization: 'IEEE Student Branch MBITS',
    category: 'Workshops',
    date: '25 June 2026',
    description:
      'Participated in the interactive technical session on Introduction to Git & GitHub organized by the MBITS IEEE Student Branch.',
    image: '/assets/aistudio/introduction_to_git_and_git_hub_e6640fef.jpeg',
    verificationUrl: '',
  },
  {
    id: 'portfolio-website-building-workshop-mcet',
    title: 'Portfolio Website Building Workshop',
    organization: 'IEEE Computer Society SBC MCET',
    category: 'Workshops',
    date: '18 June 2026',
    description:
      'Participated in the national-level Portfolio Website Building Workshop webinar conducted by the IEEE Computer Society Student Branch Chapter of MCET.',
    image: '/assets/aistudio/portfolio_building_workshope_84bf0146.jpeg',
    verificationUrl: '',
  },
  {
    id: 'game-changers-in-ai-cvv',
    title: 'Game Changers in AI: The 2026 Roadmap for Future Engineers',
    organization: 'IEEE Student Branch · Chinmaya Vishwavidyapeeth',
    category: 'Workshops',
    date: '18 June 2026',
    description:
      'Participated in the webinar exploring AI engineering roadmaps organized by the IEEE Student Branch at Chinmaya Vishwavidyapeeth.',
    image: '/assets/aistudio/game_changers_in_Ai.jpg_418b9f85.jpeg',
    verificationUrl: '',
  },
  {
    id: 'data-and-storage-fundamentals-rset',
    title: 'Data and Storage Fundamentals',
    organization: 'IEEE RSET Industry Applications Society',
    category: 'Workshops',
    date: '17 March 2026',
    description:
      'Participated in the Data and Storage Fundamentals webinar conducted by the IEEE RSET Industry Applications Society.',
    image: '/assets/aistudio/data_and_storage_fundamentals_38f5bc0a.jpeg',
    verificationUrl: '',
  },
  {
    id: 'agents-101-abhiyanthriki-2025',
    title: 'Agents 101 — Abhiyanthriki 2025',
    organization: 'Rajagiri School of Engineering & Technology',
    category: 'Workshops',
    date: '15 October 2025',
    description:
      'Participated in the Agents 101 event as part of Abhiyanthriki 2025, a National Level Tech Fest at RSET.',
    image: '/assets/aistudio/11_8803060d.jpeg',
    verificationUrl: '',
  },
  {
    id: 'code-kickoff-ieeextreme-tkmce',
    title: 'Code Kickoff: Start Your Journey in Programming',
    organization: 'IEEE CS SBC TKMCE (IEEEXtreme 19.0)',
    category: 'Workshops',
    date: '3 October 2025',
    description:
      'Participated in the Code Kickoff programming session organized by IEEE Computer Society SBC TKMCE as part of IEEEXtreme 19.0.',
    image: '/assets/aistudio/15_8dbf6346.jpeg',
    verificationUrl: '',
  },
  {
    id: 'hacking-trust-supply-chain-confluence-2',
    title: 'Hacking Trust: The Rise of Supply Chain Attacks',
    organization: 'IBS Software · RSET (Confluence 2.0)',
    category: 'Workshops',
    date: '27 September 2025',
    description:
      'Participated in the cybersecurity workshop on supply chain attacks conducted during Confluence 2.0 Industry-Academia Summit at RSET.',
    image: '/assets/aistudio/7_ad77dd9a.jpeg',
    verificationUrl: '',
  },
  {
    id: 'confluence-2-summit-rset',
    title: 'Confluence 2.0 — Industry-Academia Summit',
    organization: 'IBS Software · RSET',
    category: 'Workshops',
    date: '27 September 2025',
    description:
      'Actively participated in Confluence 2.0, the Industry-Academia Summit hosted by Rajagiri School of Engineering & Technology.',
    image: '/assets/aistudio/8_ceb8b298.jpeg',
    verificationUrl: '',
  },
  {
    id: '2-day-dsa-bootcamp-tkmce',
    title: '2-Day DSA Boot Camp (IEEEXtreme 19.0)',
    organization: 'IEEE CS SBC TKMCE · IEEE SB CEP',
    category: 'Workshops',
    date: '24 – 25 September 2025',
    description:
      'Completed the 2-day Data Structures and Algorithms boot camp strengthening core DSA foundations as part of IEEEXtreme 19.0.',
    image: '/assets/aistudio/10_484a4929.jpeg',
    verificationUrl: '',
  },
];
