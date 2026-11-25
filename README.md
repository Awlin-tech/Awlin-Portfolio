# Awlin Sajan — Portfolio

Personal portfolio website for **Awlin Sajan**, a B.Tech Computer Science and Engineering student at Rajagiri School of Engineering and Technology (RSET), Kochi, showcasing education, technical skills, featured engineering work, internships, certificates, and an interactive AI Q&A assistant.

## Features

- **Editorial Portfolio Layout**: Six structured sections (`Home`, `About`, `Skills`, `Projects`, `Certificates`, `Contact`) with a sticky navigation bar, active section indicator, and responsive mobile drawer.
- **Light & Dark Theme Switcher**: Persistent Light and Dark mode toggle powered by semantic CSS tokens and Tailwind CSS v4.
- **First-Load & Scroll Choreography**: Sequenced initial page-load entrance animations across the header, hero typography, portrait reveal, and action controls using `motion/react`, honoring `prefers-reduced-motion`.
- **Featured Project Showcase**: Highlights **YieldSense AI — Crop Yield Prediction & Agricultural Forecasting** with full-view preview, architecture notes, technology stack, and source repository link.
- **Categorized Credentials & Internships**: Filterable **Certificates & Achievements** section covering `Internships` (including the *Java Full Stack Developer Program*), `Certifications`, `Courses`, `Hackathons`, `Competitions`, and `Workshops`, with an interactive image/PDF preview modal.
- **Multi-Turn Portfolio Assistant**: Built-in **Ask Assistant** chat widget backed by a server-side Express API (`/api/chat`) and Google Gemini (`@google/genai`), grounded in portfolio details while supporting general computer science and technical Q&A with **Fast** (`gemini-3.1-flash-lite`) and **Balanced** (`gemini-4-hydrogen`) modes.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Motion (`motion/react`), Lucide React
- **Backend**: Node.js, Express 4, `@google/genai` SDK, `tsx`, `dotenv`

## Project Structure

```text
├── public/assets/aistudio/     # Portrait, project screenshot, and certificate images/PDFs
├── src/
│   ├── components/
│   │   ├── chat/               # PortfolioChatbot multi-turn assistant UI
│   │   ├── common/             # ResilientImage, SectionHeading, SocialLinks
│   │   ├── layout/             # Navbar, MobileMenu, Footer
│   │   ├── motion/             # Variants & scroll/mount animation primitives
│   │   └── sections/           # Hero, About, Skills, Projects, Certificates, Contact
│   ├── data/
│   │   ├── personal.ts         # Profile bio, navigation, social links, education, interests
│   │   ├── skills.ts           # Categorized technical skills
│   │   ├── projects.ts         # Featured projects catalog
│   │   └── certificates.ts     # Internships, certificates, courses, hackathons, workshops
│   ├── hooks/
│   │   └── useTheme.ts         # Persistent Light/Dark theme hook
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── server.ts                   # Express server + Vite dev middleware + /api/chat endpoint
├── index.html
├── package.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 22+
- A Gemini API key (`GEMINI_API_KEY`) for the `/api/chat` assistant endpoint

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
```

> Never expose `GEMINI_API_KEY` to client-side code. All Gemini requests are handled exclusively on the server in `server.ts`.

### Development

Start the full-stack Express + Vite development server on port `3000`:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Build & Start

Build the client bundle and run the production server:

```bash
npm run build
NODE_ENV=production npm start
```

### Type Checking

```bash
npm run lint
```

## Updating Portfolio Content

All portfolio data is centralized under `src/data/` so content updates require no component edits:

- `src/data/personal.ts` — Name, headline, bio, portrait, education timeline, interests, and contact links.
- `src/data/skills.ts` — Skill categories and items.
- `src/data/projects.ts` — Project entries, architecture notes, and repository links.
- `src/data/certificates.ts` — Internships, certifications, courses, hackathons, competitions, and workshops.

Updates to `src/data/*` automatically reflect in both the UI and the assistant's portfolio context.

## Contact

- **Email**: `awlinsajanofficial@gmail.com`
- **GitHub**: [github.com/Awlin-tech](https://github.com/Awlin-tech)
- **LinkedIn**: [linkedin.com/in/awlin-sajan](https://www.linkedin.com/in/awlin-sajan)
