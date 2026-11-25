import { useMemo, useState } from 'react';
import {
  CERTIFICATE_CATEGORIES,
  CERTIFICATES_DATA,
  type CertificateCategory,
  type CertificateItem,
} from '../../data/certificates';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal, StaggerGroup } from '../motion/MotionPrimitives';
import { CertificateCard } from './CertificateCard';
import { CertificatePreview } from './CertificatePreview';

export function CertificatesSection() {
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>('All');
  const [previewCertificate, setPreviewCertificate] = useState<CertificateItem | null>(null);

  const filteredCertificates = useMemo(() => {
    if (selectedCategory === 'All') return CERTIFICATES_DATA;
    return CERTIFICATES_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="relative z-10 scroll-mt-20 border-t border-[var(--border-subtle)] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          headingId="certificates-heading"
          index="04"
          label="Certificates & Achievements"
          title="Continuous learning across courses and technical programs."
          subtitle="Verified credentials, technical courses, hackathons, and workshops organized by category."
        />

        {/* Category filter tabs */}
        <ScrollReveal>
          <div
            role="tablist"
            aria-label="Filter certificates by category"
            className="mb-6 flex flex-wrap items-center gap-2 border-b border-[var(--border-subtle)] pb-4"
          >
            {CERTIFICATE_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === 'All'
                  ? CERTIFICATES_DATA.length
                  : CERTIFICATES_DATA.filter((c) => c.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] ${
                    isActive
                      ? 'bg-[var(--accent-primary)] font-semibold text-[var(--accent-on-primary)]'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      isActive ? 'opacity-80' : 'opacity-65'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {filteredCertificates.length > 0 ? (
          <StaggerGroup key={selectedCategory} className="space-y-3">
            {filteredCertificates.map((certificate, idx) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={idx}
                onPreview={setPreviewCertificate}
              />
            ))}
          </StaggerGroup>
        ) : (
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-8 text-center">
            <p className="font-display text-base font-semibold text-[var(--text-primary)]">
              No entries in {selectedCategory} yet
            </p>
            <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
              Add new {selectedCategory.toLowerCase()} records inside{' '}
              <code className="font-mono text-xs text-[var(--accent-primary)]">
                src/data/certificates.ts
              </code>
              .
            </p>
          </div>
        )}
      </div>

      <CertificatePreview
        certificate={previewCertificate}
        onClose={() => setPreviewCertificate(null)}
      />
    </section>
  );
}
