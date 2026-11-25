import { useState } from 'react';
import { EDUCATION_DATA, INTERESTS_DATA, PERSONAL_INFO } from '../../data/personal';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal, StaggerGroup, StaggerItem } from '../motion/MotionPrimitives';
import { EducationTimeline } from './EducationTimeline';

export function AboutSection() {
  const [selectedInterestId, setSelectedInterestId] = useState<string>(INTERESTS_DATA[0].id);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 scroll-mt-20 border-t border-[var(--border-subtle)] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          headingId="about-heading"
          index="01"
          label="About Me"
          title="Curiosity-driven engineering rooted in strong fundamentals."
          subtitle={PERSONAL_INFO.careerFocus}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left column: Narrative & Approach */}
          <div className="space-y-4 lg:col-span-6">
            {PERSONAL_INFO.aboutParagraphs.map((paragraph, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <p className="text-base leading-[1.7] text-[var(--text-secondary)] sm:text-[1.0625rem]">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.18}>
              <div className="mt-5 border-t border-[var(--border-subtle)] pt-5">
                <h3 className="font-display text-base font-bold text-[var(--text-primary)] sm:text-lg">
                  Approach to Learning &amp; Development
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Consistent iteration, foundational computer science rigor, and hands-on building
                  — treating every technical challenge as a chance to refine clarity and craft.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column: Education timeline */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <h3 className="mb-3 font-display text-base font-bold text-[var(--text-primary)] sm:text-lg">
                Education
              </h3>
            </ScrollReveal>
            <EducationTimeline entries={EDUCATION_DATA} />
          </div>
        </div>

        {/* Areas of Interest */}
        <div className="mt-9 border-t border-[var(--border-subtle)] pt-7">
          <ScrollReveal>
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
                  Areas of Interest
                </h3>
                <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
                  Select a discipline to explore my current technical focus.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INTERESTS_DATA.map((interest, idx) => {
              const isSelected = selectedInterestId === interest.id;
              return (
                <StaggerItem key={interest.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedInterestId(interest.id)}
                    aria-pressed={isSelected}
                    className={`group flex h-full w-full flex-col justify-between rounded-xl border p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] ${
                      isSelected
                        ? 'border-[var(--accent-primary)]/60 bg-[var(--bg-card)] shadow-xs dark:shadow-none'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-card)]'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="font-mono text-xs tabular-nums text-[var(--accent-primary)]">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-xs transition-colors ${
                          isSelected
                            ? 'font-medium text-[var(--accent-secondary)]'
                            : 'text-[var(--text-secondary)]/70 group-hover:text-[var(--text-secondary)]'
                        }`}
                      >
                        {isSelected ? 'Focused' : 'Explore'}
                      </span>
                    </div>
                    <div className="mt-2.5">
                      <h4 className="font-display text-base font-semibold text-[var(--text-primary)]">
                        {interest.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {interest.focus}
                      </p>
                    </div>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
