import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';

type Visibility = 'public' | 'private' | 'nda';

interface ProjectLink {
  labelKey: string;
  url: string;
}

interface Project {
  titleKey: string;
  descKey: string;
  techs: string[];
  links: ProjectLink[];
  visibility: Visibility;
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
      links: [],
      visibility: 'nda'
    },
    {
      titleKey: 'progetti.item2.title',
      descKey: 'progetti.item2.desc',
      techs: ['Blazor', 'C#', '.NET', 'Figma', 'SQL'],
      links: [],
      visibility: 'nda'
    },
    {
      titleKey: 'progetti.item3.title',
      descKey: 'progetti.item3.desc',
      techs: ['HTML5', 'CSS3', 'Accessibilità', 'UI Library'],
      links: [],
      visibility: 'nda'
    },
    {
      titleKey: 'progetti.item4.title',
      descKey: 'progetti.item4.desc',
      techs: ['Angular', 'TypeScript', 'CSS3', 'Vercel'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/portfolio' },
        { labelKey: 'progetti.link.stackblitz', url: 'https://stackblitz.com/github/lukaferro/portfolio' }
      ]
    }
  ];
}
