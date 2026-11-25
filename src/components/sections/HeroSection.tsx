import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../../data/personal';
import { ResilientImage } from '../common/ResilientImage';
import { SocialLinks } from '../common/SocialLinks';
import { AnimatedText, ScrollReveal } from '../motion/MotionPrimitives';
import { EASE_EDITORIAL, imageRevealVariants } from '../motion/variants';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative z-10 pt-22 pb-8 sm:pt-24 sm:pb-10 lg:pt-24 lg:pb-12"
    >
      <div className="mx-auto grid w-full max-w-6xl items-stretch gap-8 px-6 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Left column: Awlin Sajan as focal typographic highlight */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <ScrollReveal immediate variant="fade" delay={0.08}>
            <p className="mb-2.5 text-base font-medium tracking-wide text-[var(--accent-primary)] sm:text-lg">
              {PERSONAL_INFO.roleTitle}
            </p>
          </ScrollReveal>

          <div className="relative">
            <AnimatedText
              as="h1"
              immediate
              delay={0.16}
              text={PERSONAL_INFO.name}
              className="font-display text-5xl font-extrabold tracking-[-0.04em] text-[var(--text-primary)] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.03]"
            />
            <motion.div
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.34, ease: EASE_EDITORIAL }}
              className="mt-2.5 h-[3px] w-20 origin-left rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] will-change-transform"
            />
          </div>

          <ScrollReveal immediate delay={0.4}>
            <p className="mt-4 font-display max-w-xl text-2xl font-semibold tracking-tight text-[var(--text-primary)]/90 sm:text-[1.65rem] lg:leading-snug [text-wrap:balance]">
              {PERSONAL_INFO.heroHeadline}
            </p>
          </ScrollReveal>

          <ScrollReveal immediate delay={0.5}>
            <p className="mt-2 max-w-xl text-base leading-[1.65] text-[var(--text-secondary)] sm:text-[1.0625rem]">
              {PERSONAL_INFO.heroDescription}
            </p>
          </ScrollReveal>

          {/* Primary & Secondary CTAs */}
          <ScrollReveal immediate delay={0.58}>
            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
                className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--accent-on-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
              >
                <span className="whitespace-nowrap shrink-0">Explore My Work</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-xs dark:shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              >
                <Mail className="h-4 w-4 text-[var(--accent-secondary)]" />
                <span className="whitespace-nowrap shrink-0">Get In Touch</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Social links */}
          <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
            <SocialLinks immediate delay={0.66} />
          </div>
        </div>

        {/* Right column: Editorial portrait showcase */}
        <div className="flex items-stretch lg:col-span-5">
          <motion.div
            variants={prefersReducedMotion ? undefined : imageRevealVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            className="relative flex w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] shadow-md dark:shadow-none min-h-[340px] sm:min-h-[420px] lg:min-h-[480px]"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.05, delay: 0.18, ease: EASE_EDITORIAL }}
              className="h-full w-full will-change-transform"
            >
              <ResilientImage
                src={PERSONAL_INFO.heroImage}
                alt={PERSONAL_INFO.heroImageAlt}
                loading="eager"
                fallbackTitle={PERSONAL_INFO.name}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.02]"
              />
            </motion.div>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              aria-hidden="true"
            />
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52, ease: EASE_EDITORIAL }}
              className="pointer-events-none absolute inset-x-0 bottom-0 p-6"
            >
              <p className="text-xs font-medium tracking-wide text-slate-200">
                B.Tech Computer Science &amp; Engineering · RSET
              </p>
              <p className="mt-1 font-display text-sm font-semibold text-white">
                {PERSONAL_INFO.heroAlternativeHeadline}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.74, ease: EASE_EDITORIAL }}
        className="mx-auto mt-6 flex w-full max-w-6xl items-center justify-between px-6 sm:px-8"
      >
        <button
          type="button"
          onClick={() => scrollToSection('about')}
          className="group inline-flex min-h-[40px] items-center gap-3 rounded-md px-1 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
        >
          <motion.span
            animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 2.2, repeat: Infinity, ease: EASE_EDITORIAL }
            }
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--accent-primary)] transition-colors group-hover:border-[var(--border-hover)]"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
          <span>Scroll to explore</span>
        </button>

        <span className="hidden font-mono text-xs tabular-nums text-[var(--text-secondary)]/75 sm:inline">
          01 / 06
        </span>
      </motion.div>
    </section>
  );
}
