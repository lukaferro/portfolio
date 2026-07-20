import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

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
  imports: [ScrollFadeDirective, TranslatePipe],
  templateUrl: './progetti.component.html',
  styleUrl: './progetti.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ProgettiComponent implements OnInit {
  private meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Progetti',
      description: 'I miei progetti: sviluppo web full-stack con Angular, Quarkus, Java, Vue, componenti UI, app mobile e molto altro.'
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
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/Byloth/clay-vue' },
        { labelKey: 'progetti.link.demo', url: 'https://byloth.github.io/clay-vue/' }
      ],
      visibility: 'public'
    },
    {
      titleKey: 'progetti.item4.title',
      descKey: 'progetti.item4.desc',
      techs: ['Angular', 'TypeScript', 'CSS3', 'Vercel'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/portfolio' }
      ]
    },
    {
      titleKey: 'progetti.item5.title',
      descKey: 'progetti.item5.desc',
      techs: ['HTML', 'CSS', 'JavaScript'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/ristorante' },
        { labelKey: 'progetti.link.demo', url: 'https://ristorante-taupe.vercel.app' }
      ]
    },
    {
      titleKey: 'progetti.item6.title',
      descKey: 'progetti.item6.desc',
      techs: ['JavaScript', 'CSS', 'HTML'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/stand-up' },
        { labelKey: 'progetti.link.demo', url: 'https://stand-up-eta.vercel.app' }
      ]
    },
    {
      titleKey: 'progetti.item7.title',
      descKey: 'progetti.item7.desc',
      techs: ['CSS', 'HTML', 'JavaScript'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/simulazioneProjetWork' },
        { labelKey: 'progetti.link.demo', url: 'https://simulazione-projet-work.vercel.app' }
      ]
    },

    {
      titleKey: 'progetti.item9.title',
      descKey: 'progetti.item9.desc',
      techs: ['Angular', 'TypeScript', 'CSS3'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/F1' },
        { labelKey: 'progetti.link.demo', url: 'https://f1-dashboard-zeta-brown.vercel.app' }
      ]
    },
    {
      titleKey: 'progetti.item10.title',
      descKey: 'progetti.item10.desc',
      techs: ['Angular', 'TypeScript', 'CSS3'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/gym' },
        { labelKey: 'progetti.link.demo', url: 'https://gym-app-jade-iota.vercel.app' }
      ]
    },
    {
      titleKey: 'progetti.item11.title',
      descKey: 'progetti.item11.desc',
      techs: ['Angular', 'ApexCharts', 'PokéAPI', 'TypeScript'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/LucaMimmo05/pokezone' },
        { labelKey: 'progetti.link.demo', url: 'https://pokezone-phi.vercel.app' }
      ]
    },
    {
      titleKey: 'progetti.item12.title',
      descKey: 'progetti.item12.desc',
      techs: ['Angular', 'Quarkus', 'Java', 'MongoDB', 'SCSS'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github_fe', url: 'https://github.com/LucaMimmo05/taskflow-fe' },
        { labelKey: 'progetti.link.github_be', url: 'https://github.com/LucaMimmo05/taskflow-be' }
      ]
    },
    {
      titleKey: 'progetti.item13.title',
      descKey: 'progetti.item13.desc',
      techs: ['Quarkus', 'Next.js', 'Java', 'TypeScript', 'CSS'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/MarcoCorradini0/Gruppo_2_PW_3' }
      ]
    }
  ];
}
