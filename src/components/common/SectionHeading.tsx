import { AnimatedText, ScrollReveal } from '../motion/MotionPrimitives';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  headingId?: string;
}

export function SectionHeading({ index, label, title, subtitle, headingId }: SectionHeadingProps) {
  return (
    <div className="mb-5 md:mb-6">
      <ScrollReveal variant="fade">
        <div className="mb-2 flex items-center gap-3 text-base sm:text-lg text-[var(--text-secondary)]">
          <span className="font-mono tabular-nums font-medium text-[var(--accent-primary)]">
            {index}.
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-[var(--border-strong)]" />
          <span className="font-display font-semibold tracking-tight text-[var(--text-primary)]/90">
            {label}
          </span>
        </div>
      </ScrollReveal>
      <AnimatedText
        id={headingId}
        as="h2"
        text={title}
        className="font-display max-w-2xl text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] [text-wrap:balance]"
      />
      {subtitle && (
        <ScrollReveal delay={0.12}>
          <p className="mt-1.5 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
