import { useEffect } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ProjectItem } from '../../data/projects';
import { ResilientImage } from '../common/ResilientImage';
import { modalBackdropVariants, modalPanelVariants } from '../motion/variants';

interface ProjectDetailsProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
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
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          variants={prefersReducedMotion ? undefined : modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          style={{ backgroundColor: 'var(--modal-backdrop)' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            variants={prefersReducedMotion ? undefined : modalPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-black/75 text-white transition-colors hover:border-[#8EAFFF]/60 hover:text-[#8EAFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="w-full overflow-hidden border-b border-[var(--border-subtle)] bg-[#11120F]">
              <ResilientImage
                src={project.image}
                alt={project.imageAlt}
                fallbackTitle={project.name}
                className="mx-auto block max-h-[65vh] w-full object-contain"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span className="font-mono tabular-nums text-[var(--accent-primary)]">
                  {project.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
                {project.isTemplateEntry && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[var(--accent-secondary)]">Editable Showcase Entry</span>
                  </>
                )}
              </div>

              <h3
                id="project-modal-title"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl"
              >
                {project.name}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {project.shortDescription}
              </p>

              <div className="mt-6 grid gap-6 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-primary)]">
                    Problem Statement
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.problemSolved}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-primary)]">
                    Technologies
                  </h4>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {project.technologies.join(' · ')}
                  </p>
                </div>
              </div>

              {project.architectureNotes.length > 0 && (
                <div className="mt-6 border-t border-[var(--border-subtle)] pt-6">
                  <h4 className="text-xs font-semibold text-[var(--text-primary)]">
                    {project.isTemplateEntry ? 'Customization Notes' : 'Architecture Highlights'}
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                    {project.architectureNotes.map((note) => (
                      <li key={note} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="text-[var(--accent-primary)]">
                          —
                        </span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-6">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)]"
                  >
                    <Github className="h-4 w-4 text-[var(--accent-primary)]" />
                    <span>View Repository</span>
                  </a>
                ) : (
                  <span className="inline-flex min-h-[42px] items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-xs text-[var(--text-secondary)]">
                    Add `githubUrl` in src/data/projects.ts to enable link
                  </span>
                )}

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-xs font-semibold text-[var(--accent-on-primary)] transition-colors hover:bg-[var(--accent-primary-hover)]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open Live Demo</span>
                  </a>
                ) : (
                  project.isTemplateEntry && (
                    <span className="inline-flex min-h-[42px] items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-xs text-[var(--text-secondary)]">
                      Add `liveUrl` when deployed
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
