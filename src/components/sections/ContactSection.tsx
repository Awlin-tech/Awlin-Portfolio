import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../data/personal';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal, StaggerGroup, StaggerItem } from '../motion/MotionPrimitives';
import { ContactForm } from './ContactForm';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };

  const githubLink = SOCIAL_LINKS.find((l) => l.id === 'github');
  const linkedinLink = SOCIAL_LINKS.find((l) => l.id === 'linkedin');

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-10 scroll-mt-20 border-t border-[var(--border-subtle)] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          headingId="contact-heading"
          index="05"
          label="Contact"
          title={PERSONAL_INFO.contactHeading}
          subtitle={PERSONAL_INFO.contactDescription}
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Direct connection options */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <StaggerGroup className="space-y-4">
              {/* Email CTA */}
              <StaggerItem>
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 shadow-xs dark:shadow-none transition-colors hover:border-[var(--border-hover)]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--accent-primary)]">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[var(--text-secondary)]">Email</p>
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="block truncate text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)]"
                        >
                          {PERSONAL_INFO.email}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                          <span className="text-[var(--text-primary)]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </StaggerItem>

              {/* GitHub link */}
              {githubLink && (
                <StaggerItem>
                  <a
                    href={githubLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 shadow-xs dark:shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--accent-primary)]">
                        <Github className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-secondary)]">GitHub</p>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          github.com/{githubLink.handle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-secondary)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-primary)]" />
                  </a>
                </StaggerItem>
              )}

              {/* LinkedIn link */}
              {linkedinLink && (
                <StaggerItem>
                  <a
                    href={linkedinLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 shadow-xs dark:shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--accent-secondary)]">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-secondary)]">LinkedIn</p>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          linkedin.com/{linkedinLink.handle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-secondary)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-primary)]" />
                  </a>
                </StaggerItem>
              )}
            </StaggerGroup>

            <ScrollReveal delay={0.18}>
              <p className="mt-8 text-xs leading-relaxed text-[var(--text-secondary)]">
                Open to internships, collaborative student builds, technical discussions, and
                software engineering opportunities.
              </p>
            </ScrollReveal>
          </div>

          {/* Right column: Mailto contact form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
