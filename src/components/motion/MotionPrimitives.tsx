import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  EASE_EDITORIAL,
  fadeInVariants,
  fadeUpVariants,
  slideInVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from './variants';

interface AnimatedTextProps {
  id?: string;
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  immediate?: boolean;
}

export function AnimatedText({
  id,
  text,
  as = 'h1',
  className = '',
  delay = 0,
  immediate = false,
}: AnimatedTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');
  const Tag = as;

  if (prefersReducedMotion) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom mr-[0.26em] last:mr-0 pb-[0.06em]"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '105%', opacity: 0 }}
            {...(immediate
              ? { animate: { y: '0%', opacity: 1 } }
              : {
                  whileInView: { y: '0%', opacity: 1 },
                  viewport: { once: true, amount: 0.25 },
                })}
            transition={{
              duration: 0.65,
              delay: delay + index * 0.045,
              ease: EASE_EDITORIAL,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fade' | 'fadeUp' | 'slideIn';
  delay?: number;
  className?: string;
  immediate?: boolean;
}

export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  className = '',
  immediate = false,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const chosenVariant =
    variant === 'fade' ? fadeInVariants : variant === 'slideIn' ? slideInVariants : fadeUpVariants;

  return (
    <motion.div
      className={className}
      variants={chosenVariant}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : {
            whileInView: 'visible',
            viewport: { once: true, amount: 0.12 },
          })}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  immediate?: boolean;
  delay?: number;
}

export function StaggerGroup({
  children,
  className = '',
  immediate = false,
  delay = 0.04,
}: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: staggerContainerVariants.hidden,
        visible: {
          transition: {
            staggerChildren: 0.075,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : {
            whileInView: 'visible',
            viewport: { once: true, amount: 0.1 },
          })}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
    >
      {!prefersReducedMotion && (
        <motion.div
          className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)] will-change-transform"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{
            duration: 1.25,
            times: [0, 0.72, 1],
            ease: EASE_EDITORIAL,
          }}
        />
      )}
      <motion.div
        className="absolute -top-40 -left-32 h-[540px] w-[540px] rounded-full opacity-[0.09] dark:opacity-[0.065] blur-[120px] will-change-transform"
        style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 36, -12, 0],
                y: [0, 22, -16, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 24,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      />
      <motion.div
        className="absolute top-[42%] -right-40 h-[480px] w-[480px] rounded-full opacity-[0.06] dark:opacity-[0.05] blur-[130px] will-change-transform"
        style={{ background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)' }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -28, 16, 0],
                y: [0, -24, 18, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 28,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      />
      <div className="bg-grain absolute inset-0" />
    </motion.div>
  );
}
