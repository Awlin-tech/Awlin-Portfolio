import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../../data/personal';
import { StaggerGroup, StaggerItem } from '../motion/MotionPrimitives';

interface SocialLinksProps {
  variant?: 'compact' | 'detailed';
  immediate?: boolean;
  delay?: number;
  className?: string;
}

const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

export function SocialLinks({
  variant = 'compact',
  immediate = false,
  delay = 0.04,
  className = '',
}: SocialLinksProps) {
  return (
    <StaggerGroup
      immediate={immediate}
      delay={delay}
      className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}
    >
      {SOCIAL_LINKS.map((link) => {
        const Icon = ICON_MAP[link.id];
        return (
          <StaggerItem key={link.id}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              aria-label={`${link.label}: ${link.handle}`}
              className="group inline-flex min-h-[40px] items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)] shadow-xs dark:shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            >
              <Icon className="h-4 w-4 text-[var(--accent-primary)] transition-transform duration-200 group-hover:scale-105" />
              <span className="whitespace-nowrap shrink-0">
                {variant === 'detailed' ? `${link.label} · ${link.handle}` : link.label}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-55 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </a>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
