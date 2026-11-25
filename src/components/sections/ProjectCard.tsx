import { ArrowUpRight, ExternalLink, Github, Maximize2 } from 'lucide-react';
import type { ProjectItem } from '../../data/projects';
import { ResilientImage } from '../common/ResilientImage';
import { StaggerItem } from '../motion/MotionPrimitives';

interface ProjectCardProps {
  project: ProjectItem;
  index?: number;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <StaggerItem>
      <article className="group overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] shadow-sm dark:shadow-none transition-all duration-300 hover:border-[var(--border-hover)]">
        {/* Full-bleed uncropped media showcase */}
        <div className="relative border-b border-[var(--border-subtle)] bg-[#11120F]">
          <button
            type="button"
            onClick={() => onSelect(project)}
            aria-label={`Inspect details for ${project.name}`}
            className="relative block w-full cursor-pointer overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent-primary)]"
          >
            <ResilientImage
              src={project.image}
              alt={project.imageAlt}
              fallbackTitle={project.name}
              className="block h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            />
            <span className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-transform duration-200 group-hover:-translate-y-0.5">
              <Maximize2 className="h-3.5 w-3.5 text-[#8EAFFF]" />
              <span>Inspect</span>
            </span>
          </button>
        </div>

        {/* Content container */}
        <div className="p-6 sm:p-8 lg:p-9">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left column: Title & Overview */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span className="font-mono tabular-nums text-[var(--accent-primary)]">
                  {project.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
                {project.isTemplateEntry && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[var(--accent-secondary)]">Editable Template</span>
                  </>
                )}
              </div>

              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-primary)]">
                <button
                  type="button"
                  onClick={() => onSelect(project)}
                  className="rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                >
                  {project.name}
                </button>
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {project.shortDescription}
              </p>
            </div>

            {/* Right column: Problem & Stack */}
            <div className="space-y-3 border-t border-[var(--border-subtle)] pt-4 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  Problem It Solves
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {project.problemSolved}
                </p>
              </div>

              <div className="border-t border-[var(--border-subtle)] pt-3">
                <p className="text-xs font-semibold text-[var(--text-primary)]">Technologies</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {project.technologies.join(' · ')}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
            <button
              type="button"
              onClick={() => onSelect(project)}
              className="group/btn inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            >
              <span className="whitespace-nowrap shrink-0">Project Details</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent-primary)] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[var(--border-subtle)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              >
                <Github className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap shrink-0">View on GitHub</span>
              </a>
            ) : (
              <span className="text-xs text-[var(--text-secondary)]/80">
                GitHub URL not linked yet
              </span>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-xs font-semibold text-[var(--accent-on-primary)] transition-colors hover:bg-[var(--accent-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap shrink-0">Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </StaggerItem>
  );
}
