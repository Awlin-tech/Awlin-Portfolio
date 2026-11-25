import { useEffect } from 'react';
import { Award, Download, ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { CertificateItem } from '../../data/certificates';
import { ResilientImage } from '../common/ResilientImage';
import { modalBackdropVariants, modalPanelVariants } from '../motion/variants';

interface CertificatePreviewProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export function CertificatePreview({ certificate, onClose }: CertificatePreviewProps) {
  const prefersReducedMotion = useReducedMotion();
  const isPdf = Boolean(certificate?.image?.toLowerCase().endsWith('.pdf'));

  useEffect(() => {
    if (!certificate) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          variants={prefersReducedMotion ? undefined : modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          style={{ backgroundColor: 'var(--modal-backdrop)' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            variants={prefersReducedMotion ? undefined : modalPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close certificate preview"
              className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pr-12">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span className="text-[var(--accent-primary)]">{certificate.category}</span>
                <span aria-hidden="true">·</span>
                <span>{certificate.organization}</span>
                {certificate.date && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{certificate.date}</span>
                  </>
                )}
              </div>

              <h3
                id="certificate-modal-title"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]"
              >
                {certificate.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {certificate.description}
              </p>
            </div>

            {certificate.image ? (
              isPdf ? (
                <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                  <iframe
                    src={`${certificate.image}#view=FitH`}
                    title={`${certificate.title} PDF certificate`}
                    className="h-[460px] w-full bg-white sm:h-[540px]"
                  />
                </div>
              ) : (
                <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                  <ResilientImage
                    src={certificate.image}
                    alt={`${certificate.title} certificate from ${certificate.organization}`}
                    fallbackTitle={certificate.title}
                    className="max-h-[65vh] w-full object-contain"
                  />
                </div>
              )
            ) : (
              <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-6 py-10 text-center">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--accent-secondary)]">
                  <Award className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Certificate image not attached yet
                </p>
                <p className="mt-1.5 max-w-md text-xs leading-relaxed text-[var(--text-secondary)]">
                  Add an image file path to the{' '}
                  <code className="font-mono text-[var(--accent-primary)]">image</code> field for
                  this entry in{' '}
                  <code className="font-mono text-[var(--accent-primary)]">
                    src/data/certificates.ts
                  </code>{' '}
                  to display the full scan here.
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-5">
              <div className="flex flex-wrap items-center gap-3">
                {certificate.image && (
                  <a
                    href={certificate.image}
                    download
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--accent-primary)]"
                  >
                    <Download className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                    <span>{isPdf ? 'Download PDF' : 'Download Image'}</span>
                  </a>
                )}

                {certificate.verificationUrl && (
                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-xs font-semibold text-[var(--accent-on-primary)] transition-colors hover:bg-[var(--accent-primary-hover)]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open Official Verification</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[40px] items-center rounded-lg border border-[var(--border-subtle)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
