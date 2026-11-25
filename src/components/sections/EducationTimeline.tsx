import { GraduationCap } from 'lucide-react';
import type { EducationEntry } from '../../data/personal';
import { StaggerGroup, StaggerItem } from '../motion/MotionPrimitives';

interface EducationTimelineProps {
  entries: EducationEntry[];
}

export function EducationTimeline({ entries }: EducationTimelineProps) {
  return (
    <StaggerGroup className="space-y-5">
      {entries.map((entry, idx) => (
        <StaggerItem key={entry.id}>
          <article className="relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 shadow-xs dark:shadow-none transition-colors duration-200 hover:border-[var(--border-hover)] sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--accent-primary)]">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="font-mono tabular-nums text-[var(--accent-primary)]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.academicStatus}</span>
                    {entry.duration && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{entry.duration}</span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-bold tracking-tight text-[var(--text-primary)] sm:text-xl">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                    {entry.institution}
                  </p>
                </div>
              </div>
            </div>

            {entry.coursework && entry.coursework.length > 0 && (
              <div className="mt-5 border-t border-[var(--border-subtle)] pt-4">
                <p className="text-xs font-medium text-[var(--text-secondary)]">
                  Relevant Coursework
                </p>
                <p className="mt-1.5 text-sm text-[var(--text-primary)]">
                  {entry.coursework.join(' · ')}
                </p>
              </div>
            )}

            {entry.highlights && entry.highlights.length > 0 && (
              <div className="mt-4 border-t border-[var(--border-subtle)] pt-4">
                <p className="text-xs font-medium text-[var(--text-secondary)]">
                  Academic Highlights
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[var(--text-secondary)]">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-[var(--accent-primary)]">
                        —
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
