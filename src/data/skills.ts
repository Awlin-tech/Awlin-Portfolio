export interface SkillCategoryData {
  id: string;
  index: string;
  title: string;
  summary: string;
  items: string[];
}

/**
 * Centralized, editable skills configuration.
 * Add, remove, or reorganize skills without touching UI components.
 */
export const SKILLS_DATA: SkillCategoryData[] = [
  {
    id: 'programming-languages',
    index: '01',
    title: 'Programming Languages',
    summary: 'Core languages used for academic coursework, algorithmic exercises, and software building.',
    items: ['C', 'Python', 'Java'],
  },
  {
    id: 'database',
    index: '02',
    title: 'Database',
    summary: 'Relational schema design, structured querying, and foundational data modeling.',
    items: ['MySQL', 'SQL'],
  },
  {
    id: 'tools-technologies',
    index: '03',
    title: 'Tools & Technologies',
    summary: 'Everyday developer environment for version control, collaboration, and code authoring.',
    items: ['Git', 'GitHub', 'VS Code'],
  },
  {
    id: 'core-concepts',
    index: '04',
    title: 'Core Concepts',
    summary: 'Fundamental computer science principles guiding clean architecture and problem decomposition.',
    items: [
      'Data Structures and Algorithms',
      'Object-Oriented Programming',
      'Problem Solving',
      'Database Management',
      'Web Development Fundamentals',
    ],
  },
];
