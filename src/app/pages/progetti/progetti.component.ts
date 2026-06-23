import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';

interface Project {
  titleKey: string;
  descKey: string;
  techs: string[];
  links: { labelKey: string; url: string }[];
}

@Component({
  selector: 'app-progetti',
  imports: [ScrollFadeDirective],
  templateUrl: './progetti.component.html',
  styleUrl: './progetti.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ProgettiComponent implements OnInit {
  private meta = inject(MetaService);
  private ts = inject(TranslationService);
  tr(key: string): string { return this.ts.t(key); }

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Progetti',
      description: 'I miei progetti: sito vetrina Angular, piattaforma B2B Blazor, UI Component Library e portfolio personale.'
    });
  }

  projects: Project[] = [
    {
      titleKey: 'progetti.item1.title',
      descKey: 'progetti.item1.desc',
      techs: ['Angular', 'PHP', 'Figma', 'Responsive'],
      links: []
    },
    {
      titleKey: 'progetti.item2.title',
      descKey: 'progetti.item2.desc',
      techs: ['Blazor', 'C#', '.NET', 'Figma', 'SQL'],
      links: []
    },
    {
      titleKey: 'progetti.item3.title',
      descKey: 'progetti.item3.desc',
      techs: ['HTML5', 'CSS3', 'Accessibilità', 'UI Library'],
      links: []
    },
    {
      titleKey: 'progetti.item4.title',
      descKey: 'progetti.item4.desc',
      techs: ['Angular', 'TypeScript', 'CSS3', 'Vercel'],
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/portfolio' }
      ]
    }
  ];
}
