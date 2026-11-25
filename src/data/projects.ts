export type ProjectCategory =
  | 'All'
  | 'AI & Full-Stack Systems'
  | 'Software Engineering'
  | 'Algorithms & Logic'
  | 'Database & Systems';

export interface ProjectItem {
  id: string;
  index: string;
  name: string;
  category: Exclude<ProjectCategory, 'All'>;
  shortDescription: string;
  problemSolved: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  githubUrl: string | null;
  liveUrl: string | null;
  isTemplateEntry: boolean;
  architectureNotes: string[];
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'AI & Full-Stack Systems',
];

/**
 * Centralized projects catalog.
 */
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'yieldsense-ai',
    index: '01',
    name: 'YieldSense AI — Crop Yield Prediction & Agricultural Forecasting',
    category: 'AI & Full-Stack Systems',
    shortDescription:
      'An AI-powered agricultural intelligence platform that forecasts crop yields from weather inputs and soil chemistry indices, translating Random Forest predictions into actionable soil remediation advice and environmental risk warnings.',
    problemSolved:
      'Predicting crop yields has historically been uncertain due to volatile climate variables. YieldSense AI feeds regional temperature, rainfall, and soil parameters (Nitrogen, Phosphorus, Potassium, and pH) into a trained Random Forest regression pipeline (R² = 0.9140 across 25,932 records) and translates analytical forecasts into plain-language fertilizer, irrigation, and hazard recommendations.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'PostgreSQL',
      'Scikit-Learn',
      'Recharts',
      'Docker',
    ],
    image: '/assets/aistudio/Screenshot_2026-11-25_182427_019cbe6b.png',
    imageAlt:
      'YieldSense AI landing interface showing agricultural yield forecasting analytics and soil nutrient overlays',
    githubUrl:
      'https://github.com/Awlin-tech/Crop-Yield-Prediction-Agricultural-Productivity-Forecasting-System/tree/Awlin',
    liveUrl: null,
    isTemplateEntry: false,
    architectureNotes: [
      'ML Pipeline: Scikit-Learn OneHotEncoder + RandomForestRegressor (200 estimators) achieving 0.9140 R² and 1,256.58 kg/ha MAE across 10 crops (Cassava, Maize, Plantains, Potatoes, Paddy Rice, Sorghum, Soybeans, Sweet Potatoes, Wheat, Yams).',
      'Full-Stack Platform: Next.js + TypeScript + Recharts dashboard paired with a FastAPI + PostgreSQL backend, JWT role-based auth (Farmer & Admin), standalone NPK Soil Wizard, CSV log exporter, and print-ready PDF summaries.',
      'Reproducible Deployment: Containerized with Docker & Docker Compose alongside an automated Python unittest suite validating NPK scoring and warning thresholds.',
    ],
  },
];
