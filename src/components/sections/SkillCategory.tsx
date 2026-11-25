import { Code2, Cpu, Database, Wrench } from 'lucide-react';
import type { SkillCategoryData } from '../../data/skills';
import { StaggerItem } from '../motion/MotionPrimitives';

interface SkillCategoryProps {
  category: SkillCategoryData;
}

const CATEGORY_ICON_MAP: Record<string, typeof Code2> = {
  'programming-languages': Code2,
  database: Database,
  'tools-technologies': Wrench,
  'core-concepts': Cpu,
};

export function SkillCategory({ category }: SkillCategoryProps) {
  const Icon = CATEGORY_ICON_MAP[category.id] ?? Code2;

  return (
    <StaggerItem>
      <div className="group flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 shadow-xs dark:shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)] sm:p-7">
        <div>
          <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--accent-primary)] transition-colors group-hover:border-[var(--border-hover)]">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)]">
                {category.title}
              </h3>
            </div>
            <span className="font-mono text-xs tabular-nums text-[var(--text-secondary)]">
              {category.index}
            </span>
          </div>

          <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
            {category.summary}
          </p>
        </div>

        <ul className="mt-4 divide-y divide-[var(--border-subtle)] border-t border-[var(--border-subtle)]">
          {category.items.map((skill) => (
            <li
              key={skill}
              className="flex items-center justify-between py-2.5 text-sm font-medium text-[var(--text-primary)]"
            >
              <span>{skill}</span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]/50 transition-transform duration-200 group-hover:scale-125 group-hover:bg-[var(--accent-primary)]"
              />
            </li>
          ))}
        </ul>
      </div>
    </StaggerItem>
  );
}
