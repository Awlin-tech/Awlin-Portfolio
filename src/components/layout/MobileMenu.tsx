import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import { NAV_ITEMS } from '../../data/personal';
import type { ThemeMode } from '../../hooks/useTheme';
import { EASE_EDITORIAL } from '../motion/variants';

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export function MobileMenu({
  isOpen,
  activeSection,
  theme,
  onToggleTheme,
  onClose,
  onNavigate,
}: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
          className="fixed inset-0 z-30 bg-[var(--bg-primary)]/95 backdrop-blur-lg md:hidden"
        >
          <div className="flex h-full flex-col justify-between px-6 pt-24 pb-10">
            <nav
              className="flex flex-col divide-y divide-[var(--border-subtle)]"
              aria-label="Mobile sections"
            >
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: prefersReducedMotion ? 0 : idx * 0.045,
                      ease: EASE_EDITORIAL,
                    }}
                    className={`group flex min-h-[54px] w-full items-center justify-between py-3.5 text-left font-display text-2xl font-semibold tracking-tight transition-colors ${
                      isActive
                        ? 'text-[var(--accent-primary)]'
                        : 'text-[var(--text-primary)] hover:text-[var(--accent-primary)]'
                    }`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs tabular-nums text-[var(--text-secondary)]">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-[var(--text-secondary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-primary)]" />
                  </motion.button>
                );
              })}
            </nav>

            <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-5">
              <p className="text-xs text-[var(--text-secondary)]">
                Select a section or switch appearance.
              </p>
              <button
                type="button"
                onClick={onToggleTheme}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)]"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
