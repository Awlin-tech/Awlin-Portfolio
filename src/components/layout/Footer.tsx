import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/personal';
import { SocialLinks } from '../common/SocialLinks';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-base font-bold text-[var(--text-primary)]">
            {PERSONAL_INFO.name}
          </p>
          <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
            {PERSONAL_INFO.footerTagline}
          </p>
          <p className="mt-3 text-xs text-[var(--text-secondary)]/80 tabular-nums">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-start gap-5 md:items-end">
          <SocialLinks variant="compact" />
          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex min-h-[40px] items-center gap-2 rounded-md px-2 py-1 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 text-[var(--accent-primary)] transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
