import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Mail, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/personal';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);
  const [submittedMailto, setSubmittedMailto] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmittedMailto(null);

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedSubject = form.subject.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      setError('Please complete all fields before opening your email draft.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    const bodyLines = [
      `Name: ${trimmedName}`,
      `Reply-To: ${trimmedEmail}`,
      '',
      trimmedMessage,
    ].join('\n');

    const mailtoHref = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      trimmedSubject
    )}&body=${encodeURIComponent(bodyLines)}`;

    setSubmittedMailto(mailtoHref);
    window.location.href = mailtoHref;
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 shadow-sm dark:shadow-none sm:p-8"
    >
      <div className="mb-4 border-b border-[var(--border-subtle)] pb-3">
        <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
          Send a Message
        </h3>
        <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-secondary)]">
          Submitting opens a pre-filled draft in your email client addressed to{' '}
          <span className="font-medium text-[var(--text-primary)]">{PERSONAL_INFO.email}</span>.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-medium text-[var(--text-primary)]"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Your name"
            className="mt-2 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-input)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 transition-colors focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-medium text-[var(--text-primary)]"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-input)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 transition-colors focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-subject"
          className="block text-xs font-medium text-[var(--text-primary)]"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
          placeholder="Project collaboration, opportunity, or question"
          className="mt-2 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-input)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 transition-colors focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="block text-xs font-medium text-[var(--text-primary)]"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          placeholder="Write your message here..."
          className="mt-2 w-full resize-y rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-input)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 transition-colors focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2.5 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-700 dark:text-rose-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-300" />
          <span>{error}</span>
        </div>
      )}

      {submittedMailto && (
        <div
          role="status"
          className="mt-4 flex items-start gap-2.5 rounded-lg border border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/10 p-3 text-xs text-[var(--text-primary)]"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
          <div>
            <p className="font-medium">Email draft prepared in your mail client.</p>
            <p className="mt-1 text-[var(--text-secondary)]">
              If your email client did not open automatically,{' '}
              <a
                href={submittedMailto}
                className="font-medium text-[var(--accent-primary)] underline"
              >
                click here to launch the draft
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="submit"
          className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-lg bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-on-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
        >
          <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          <span className="whitespace-nowrap shrink-0">Compose Email</span>
        </button>

        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
          <Mail className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
          <span>Mailto-based form (no backend required)</span>
        </span>
      </div>
    </form>
  );
}
