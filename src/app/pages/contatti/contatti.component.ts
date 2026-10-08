import { Component, OnDestroy, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface ReCaptchaV3 {
  ready(cb: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare const grecaptcha: ReCaptchaV3 | undefined;

const RECAPTCHA_SITE_KEY = '6LeW-F8tAAAAAEh9kWALjsR5Qe7t0BKm7JDf-sWz';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Server error codes (see api/contact.ts) that have a dedicated message. */
const KNOWN_ERRORS = ['required', 'email', 'too_long', 'captcha'];

interface Feedback {
  type: 'success' | 'error';
  key: string;
}

@Component({
  selector: 'app-contatti',
  imports: [FormsModule, ScrollFadeDirective, TranslatePipe],
  templateUrl: './contatti.component.html',
  styleUrl: './contatti.component.css'
})
export class ContattiComponent implements OnInit, OnDestroy {
  private meta = inject(MetaService);
  private cdr = inject(ChangeDetectorRef);

  /** Keep in sync with MAX_LENGTH in api/contact.ts */
  readonly maxLength = { nome: 100, email: 254, oggetto: 150, messaggio: 5000 };

  formData = {
    nome: '',
    email: '',
    oggetto: '',
    messaggio: '',
    /** Honeypot, hidden from real users */
    website: ''
  };

  /** Floating toast: overlays the page so the form never shifts. Key-based so it follows language changes. */
  feedback: Feedback | null = null;
  caricamento = false;
  private feedbackTimeout: ReturnType<typeof setTimeout> | undefined;

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Contatti',
      description: 'Contatta Luca Ferro per collaborazioni, progetti o opportunità lavorative.',
      titleKey: 'meta.contatti.title',
      descKey: 'meta.contatti.desc'
    });
    this.loadRecaptcha();
  }

  ngOnDestroy(): void {
    clearTimeout(this.feedbackTimeout);
  }

  private loadRecaptcha(): void {
    if (typeof grecaptcha !== 'undefined' || document.querySelector('script[data-recaptcha]')) return;
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.dataset['recaptcha'] = '';
    document.head.appendChild(script);
  }

  /** Resolves to '' if reCAPTCHA is blocked, not loaded yet or too slow. */
  private getRecaptchaToken(): Promise<string> {
    if (typeof grecaptcha === 'undefined') return Promise.resolve('');
    const captcha = grecaptcha;
    const tokenPromise = new Promise<string>((resolve, reject) =>
      captcha.ready(() => captcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' }).then(resolve, reject))
    );
    const timeout = new Promise<string>(resolve => setTimeout(() => resolve(''), 5000));
    return Promise.race([tokenPromise, timeout]).catch(() => '');
  }

  private showFeedback(type: Feedback['type'], key: string): void {
    clearTimeout(this.feedbackTimeout);
    this.feedback = { type, key };
    this.cdr.detectChanges();
    this.feedbackTimeout = setTimeout(() => this.dismissFeedback(), type === 'success' ? 6000 : 9000);
  }

  dismissFeedback(): void {
    clearTimeout(this.feedbackTimeout);
    this.feedback = null;
    this.cdr.detectChanges();
  }

  async inviaForm() {
    const { nome, email, oggetto, messaggio } = this.formData;
    this.dismissFeedback();

    if (!nome.trim() || !email.trim() || !oggetto.trim() || !messaggio.trim()) {
      return this.showFeedback('error', 'contatti.form.error.required');
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return this.showFeedback('error', 'contatti.form.error.email');
    }

    this.caricamento = true;
    this.cdr.detectChanges();

    try {
      const token = await this.getRecaptchaToken();

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...this.formData, recaptchaToken: token }),
        signal: AbortSignal.timeout(15000)
      });

      if (!res.ok) {
        // The body may not be JSON (e.g. a platform error page): never surface parser errors.
        const data = await res.json().catch(() => null) as { error?: string } | null;
        const code = data?.error ?? '';
        this.showFeedback('error', KNOWN_ERRORS.includes(code) ? `contatti.form.error.${code}` : 'contatti.form.error.generic');
        return;
      }

      this.formData = { nome: '', email: '', oggetto: '', messaggio: '', website: '' };
      this.showFeedback('success', 'contatti.form.success');
    } catch {
      this.showFeedback('error', 'contatti.form.error.connection');
    } finally {
      this.caricamento = false;
      this.cdr.detectChanges();
    }
  }
}
