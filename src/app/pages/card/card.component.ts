import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-card',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class CardComponent implements OnInit {
  private readonly meta = inject(MetaService);
  readonly ts = inject(TranslationService);

  readonly isDownloaded = signal<boolean>(false);
  readonly copyFeedback = signal<boolean>(false);

  // Luca Ferro Contact Information (Aligned with CV and Portfolio)
  readonly contactInfo = {
    firstName: 'Luca',
    lastName: 'Ferro',
    fullName: 'Luca Ferro',
    title: 'Web Developer — Frontend & UI',
    phone: '+393775454100',
    displayPhone: '+39 377 545 4100',
    email: 'luca.ferro2003@gmail.com',
    portfolioUrl: 'https://portfolio-five-sand-51.vercel.app',
    linkedInUrl: 'https://www.linkedin.com/in/luca-ferro-849a212b8/',
    githubUrl: 'https://github.com/lukaferro',
    location: 'Varese, IT',
    notes: 'Web Developer — Frontend & UI | Angular, TypeScript, UI/UX, REST API'
  };

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Digital Business Card',
      description: 'Biglietto da visita digitale di Luca Ferro — Web Developer Frontend & UI.',
      titleKey: 'meta.card.title',
      descKey: 'meta.card.desc',
      noindex: true,
      robots: 'noindex, nofollow'
    });
  }

  downloadVCard(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    const origin = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : this.contactInfo.portfolioUrl;

    const vcardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${this.contactInfo.lastName};${this.contactInfo.firstName};;;`,
      `FN:${this.contactInfo.fullName}`,
      `TITLE:${this.contactInfo.title}`,
      `TEL;TYPE=CELL,VOICE:${this.contactInfo.phone}`,
      `EMAIL;TYPE=INTERNET,HOME:${this.contactInfo.email}`,
      `URL;TYPE=Portfolio:${origin}`,
      `URL;TYPE=LinkedIn:${this.contactInfo.linkedInUrl}`,
      `URL;TYPE=GitHub:${this.contactInfo.githubUrl}`,
      `NOTE:${this.contactInfo.notes}`,
      'END:VCARD'
    ];

    const vcardContent = vcardLines.join('\r\n');
    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });

    if (typeof window !== 'undefined') {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'contatto.vcf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);
    }

    this.isDownloaded.set(true);
    setTimeout(() => {
      this.isDownloaded.set(false);
    }, 3500);
  }

  async shareCard(): Promise<void> {
    const url = typeof window !== 'undefined' ? window.location.href : this.contactInfo.portfolioUrl + '/card';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Luca Ferro - Digital Business Card',
          text: 'Biglietto da visita digitale di Luca Ferro — Web Developer Frontend & UI',
          url
        });
        return;
      } catch {
        // User dismissed share dialog
      }
    }

    // Fallback: Copy URL to clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      this.copyFeedback.set(true);
      setTimeout(() => this.copyFeedback.set(false), 2500);
    }
  }

  toggleLang(): void {
    const nextLang = this.ts.currentLang() === 'it' ? 'en' : 'it';
    this.ts.setLang(nextLang);
  }
}
