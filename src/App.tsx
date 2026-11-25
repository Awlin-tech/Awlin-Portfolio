import { MotionConfig } from 'motion/react';
import { PortfolioChatbot } from './components/chat/PortfolioChatbot';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { AmbientBackground } from './components/motion/MotionPrimitives';
import { AboutSection } from './components/sections/AboutSection';
import { CertificatesSection } from './components/sections/CertificatesSection';
import { ContactSection } from './components/sections/ContactSection';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[var(--accent-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--accent-on-primary)]"
        >
          Skip to main content
        </a>

        <AmbientBackground />
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificatesSection />
          <ContactSection />
        </main>

        <Footer />
        <PortfolioChatbot />
      </div>
    </MotionConfig>
  );
}
