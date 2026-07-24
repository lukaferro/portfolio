import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface PageMeta {
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class MetaService {
  private meta = inject(Meta);
  private titleService = inject(Title);

  private baseUrl = 'https://lukaferro.github.io/portfolio';

  setPageMeta(page: PageMeta): void {
    const currentUrl = this.baseUrl + window.location.pathname;
    this.titleService.setTitle(`${page.title} | Luca Ferro`);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:title', content: `${page.title} | Luca Ferro` });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: currentUrl });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: `${page.title} | Luca Ferro` });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: `${this.baseUrl}/me.png` });
    this.meta.updateTag({ property: 'og:image', content: `${this.baseUrl}/me.png` });
  }
}
