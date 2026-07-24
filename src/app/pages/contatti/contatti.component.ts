import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

declare const grecaptcha: any;

const RECAPTCHA_SITE_KEY = '6LeW-F8tAAAAAEh9kWALjsR5Qe7t0BKm7JDf-sWz';

@Component({
  selector: 'app-contatti',
  imports: [FormsModule, ScrollFadeDirective, TranslatePipe],
  templateUrl: './contatti.component.html',
  styleUrl: './contatti.component.css'
})
export class ContattiComponent implements OnInit {
  private meta = inject(MetaService);
  private ts = inject(TranslationService);
  private cdr = inject(ChangeDetectorRef);

  private recaptchaLoaded = false;

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Contatti',
      description: 'Contatta Luca Ferro per collaborazioni, progetti o opportunità lavorative.'
    });
    this.loadRecaptcha();
  }

  private loadRecaptcha(): void {
    if (this.recaptchaLoaded || typeof grecaptcha !== 'undefined') return;
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.recaptchaLoaded = true;
    document.head.appendChild(script);
  }
  formData = {
    nome: '',
    email: '',
    oggetto: '',
    messaggio: ''
  };

  inviato = false;
  errore = '';
  caricamento = false;

  async inviaForm() {
    this.errore = '';
    this.inviato = false;
    this.cdr.detectChanges();

    if (!this.formData.nome || !this.formData.email || !this.formData.oggetto || !this.formData.messaggio) {
      this.errore = this.ts.t('contatti.form.error.required');
      this.cdr.detectChanges();
      return;
    }

    this.caricamento = true;
    this.cdr.detectChanges();

    try {
      const siteKey = RECAPTCHA_SITE_KEY;
      let token = '';

      if (siteKey && typeof grecaptcha !== 'undefined') {
        try {
          const captchaPromise = grecaptcha.execute(siteKey, { action: 'submit' });
          const timeoutPromise = new Promise<string>((_, reject) =>
            setTimeout(() => reject(new Error('captcha timeout')), 5000)
          );
          token = await Promise.race([captchaPromise, timeoutPromise]);
        } catch {
          token = '';
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...this.formData, recaptchaToken: token }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || this.ts.t('contatti.form.error.generic'));
      }

      this.inviato = true;
      this.formData = { nome: '', email: '', oggetto: '', messaggio: '' };
      this.cdr.detectChanges();
      setTimeout(() => {
        this.inviato = false;
        this.cdr.detectChanges();
      }, 5000);
    } catch (err: any) {
      this.errore = err.name === 'AbortError'
        ? this.ts.t('contatti.form.error.connection')
        : (err.message || this.ts.t('contatti.form.error.connection'));
      this.cdr.detectChanges();
    } finally {
      this.caricamento = false;
      this.cdr.detectChanges();
    }
  }
}
