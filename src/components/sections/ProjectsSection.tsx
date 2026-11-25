import { useMemo, useState } from 'react';
import {
  PROJECT_CATEGORIES,
  PROJECTS_DATA,
  type ProjectCategory,
  type ProjectItem,
} from '../../data/projects';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal, StaggerGroup } from '../motion/MotionPrimitives';
import { ProjectCard } from './ProjectCard';
import { ProjectDetails } from './ProjectDetails';

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const showFilters = PROJECT_CATEGORIES.length > 2;

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative z-10 scroll-mt-20 border-t border-[var(--border-subtle)] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          headingId="projects-heading"
          index="03"
          label="Projects"
          title="Featured engineering work."
          subtitle="End-to-end machine learning, backend APIs, and interactive analytics built to solve practical real-world problems."
        />

        {showFilters && (
          <ScrollReveal>
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="mb-8 flex flex-wrap items-center gap-2 border-b border-[var(--border-subtle)] pb-4"
            >
              {PROJECT_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`min-h-[40px] whitespace-nowrap shrink-0 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] ${
                      isActive
                        ? 'bg-[var(--accent-primary)] font-semibold text-[var(--accent-on-primary)]'
                        : 'border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        )}

        <StaggerGroup key={selectedCategory} className="space-y-6">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={setActiveProject}
            />
          ))}
        </StaggerGroup>
      </div>

      <ProjectDetails project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
