import { ArrowUpRight, Award, Eye, FileText } from 'lucide-react';
import type { CertificateItem } from '../../data/certificates';
import { ResilientImage } from '../common/ResilientImage';
import { StaggerItem } from '../motion/MotionPrimitives';

interface CertificateCardProps {
  certificate: CertificateItem;
  index: number;
  onPreview: (certificate: CertificateItem) => void;
}

export function CertificateCard({ certificate, index, onPreview }: CertificateCardProps) {
  const isPdf = Boolean(certificate.image?.toLowerCase().endsWith('.pdf'));

  return (
    <StaggerItem>
      <article className="group flex flex-col justify-between gap-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 shadow-xs dark:shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)] sm:flex-row sm:items-center sm:p-6">
        <div className="flex min-w-0 flex-1 items-start gap-4 sm:items-center">
          {certificate.image && !isPdf && (
            <button
              type="button"
              onClick={() => onPreview(certificate)}
              aria-label={`Preview ${certificate.title} certificate`}
              className="hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] sm:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            >
              <ResilientImage
                src={certificate.image}
                alt={`${certificate.title} thumbnail`}
                fallbackTitle={certificate.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          )}

          {certificate.image && isPdf && (
            <button
              type="button"
              onClick={() => onPreview(certificate)}
              aria-label={`Preview ${certificate.title} PDF certificate`}
              className="hidden h-16 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--accent-primary)] transition-colors hover:border-[var(--border-hover)] sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            >
              <FileText className="h-5 w-5" />
              <span className="font-mono text-[10px] tracking-wide text-[var(--text-secondary)]">
                PDF
              </span>
            </button>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span className="font-mono tabular-nums text-[var(--accent-primary)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span>{certificate.category}</span>
              <span aria-hidden="true">·</span>
              <span>{certificate.organization}</span>
              {certificate.date && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{certificate.date}</span>
                </>
              )}
            </div>

            <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)] sm:text-xl">
              {certificate.title}
            </h3>

            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
              {certificate.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onPreview(certificate)}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--border-hover)] hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
          >
            {certificate.image ? (
              isPdf ? (
                <FileText className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              ) : (
                <Eye className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              )
            ) : (
              <Award className="h-3.5 w-3.5 text-[var(--accent-secondary)]" />
            )}
            <span className="whitespace-nowrap shrink-0">
              {certificate.image ? (isPdf ? 'View PDF' : 'View Certificate') : 'Preview Details'}
            </span>
          </button>

          {certificate.verificationUrl && (
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] px-3.5 py-2 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            >
              <span className="whitespace-nowrap shrink-0">Verify</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          )}
        </div>
      </article>
    </StaggerItem>
  );
}
