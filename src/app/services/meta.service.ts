import { Injectable, inject, effect, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslationService } from './translation.service';

export interface PageMeta {
  title: string;
  description: string;
  titleKey?: string;
  descKey?: string;
  /** Keep the page out of search results (e.g. 404) */
  noindex?: boolean;
}

@Injectable({ providedIn: 'root' })
export class MetaService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  private ts = inject(TranslationService);
  private document = inject(DOCUMENT);

  private baseUrl = 'https://portfolio-five-sand-51.vercel.app';
  private currentPage: PageMeta | null = null;

  constructor() {
    effect(() => {
      this.ts.currentLang();
      if (this.currentPage) {
        this.applyMeta(this.currentPage);
      }
    });
  }

  setPageMeta(page: PageMeta): void {
    this.currentPage = page;
    this.applyMeta(page);
  }

  private applyMeta(page: PageMeta): void {
    const title = page.titleKey ? this.ts.t(page.titleKey) : page.title;
    const description = page.descKey ? this.ts.t(page.descKey) : page.description;
    const currentUrl = this.baseUrl + (window.location.pathname === '/' ? '' : window.location.pathname);
    const isEnglish = this.ts.currentLang() === 'en';

    this.titleService.setTitle(`${title} | Luca Ferro`);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: `${title} | Luca Ferro` });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: currentUrl });
    this.meta.updateTag({ property: 'og:locale', content: isEnglish ? 'en_US' : 'it_IT' });
    this.meta.updateTag({ property: 'og:locale:alternate', content: isEnglish ? 'it_IT' : 'en_US' });
    this.setCanonical(currentUrl);
    if (page.noindex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex' });
    } else {
      this.meta.removeTag("name='robots'");
    }
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: `${title} | Luca Ferro` });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: `${this.baseUrl}/me.webp` });
    this.meta.updateTag({ property: 'og:image', content: `${this.baseUrl}/me.webp` });
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }
}
