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

  inviato = false;
  /** Translation key of the current error, so the message follows language changes */
  erroreKey = '';
  caricamento = false;
  private successTimeout: ReturnType<typeof setTimeout> | undefined;

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
    clearTimeout(this.successTimeout);
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

  private setError(key: string): void {
    this.erroreKey = key;
    this.cdr.detectChanges();
  }

  async inviaForm() {
    const { nome, email, oggetto, messaggio } = this.formData;
    this.erroreKey = '';
    this.inviato = false;
    clearTimeout(this.successTimeout);

    if (!nome.trim() || !email.trim() || !oggetto.trim() || !messaggio.trim()) {
      return this.setError('contatti.form.error.required');
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return this.setError('contatti.form.error.email');
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
        this.erroreKey = KNOWN_ERRORS.includes(code) ? `contatti.form.error.${code}` : 'contatti.form.error.generic';
        return;
      }

      this.inviato = true;
      this.formData = { nome: '', email: '', oggetto: '', messaggio: '', website: '' };
      this.successTimeout = setTimeout(() => {
        this.inviato = false;
        this.cdr.detectChanges();
      }, 6000);
    } catch {
      this.erroreKey = 'contatti.form.error.connection';
    } finally {
      this.caricamento = false;
      this.cdr.detectChanges();
    }
  }
}
