import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

type Visibility = 'public' | 'private' | 'nda';
type FilterId = 'all' | 'angular' | 'blazor' | 'fullstack' | 'vanilla';

interface ProjectLink {
  labelKey: string;
  url: string;
}

interface Project {
  /** Shown in the card's window bar; defaults to the GitHub "owner/repo" */
  repo?: string;
  titleKey: string;
  descKey: string;
  techs: string[];
  categories: FilterId[];
  links: ProjectLink[];
  visibility: Visibility;
}

interface FilterOption {
  id: FilterId;
  labelKey: string;
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

  activeFilter: FilterId = 'all';

  filters: FilterOption[] = [
    { id: 'all', labelKey: 'progetti.filter.all' },
    { id: 'angular', labelKey: 'progetti.filter.angular' },
    { id: 'blazor', labelKey: 'progetti.filter.blazor' },
    { id: 'fullstack', labelKey: 'progetti.filter.fullstack' },
    { id: 'vanilla', labelKey: 'progetti.filter.vanilla' }
  ];

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Progetti',
      description: 'I miei progetti di sviluppo web: siti aziendali in Angular, piattaforme B2B in Blazor/.NET, UI Component Library accessibili in Vue.js e applicazioni web.',
      titleKey: 'meta.progetti.title',
      descKey: 'meta.progetti.desc'
    });
  }

  private readonly accents: Record<FilterId, string> = {
    all: '#ff9900',
    angular: '#ff9900',
    blazor: '#ce93d8',
    fullstack: '#4fc3f7',
    vanilla: '#81c784'
  };

  accentOf(project: Project): string {
    return this.accents[project.categories[0]];
  }

  repoLabel(project: Project): string {
    if (project.repo) return project.repo;
    const github = project.links.find(l => l.url.startsWith('https://github.com/'));
    return github ? github.url.replace('https://github.com/', '').toLowerCase() : '';
  }

  setFilter(filter: FilterId): void {
    this.activeFilter = filter;
  }

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter(p => p.categories.includes(this.activeFilter));
  }

  getFilterCount(filterId: FilterId): number {
    if (filterId === 'all') return this.projects.length;
    return this.projects.filter(p => p.categories.includes(filterId)).length;
  }

  projects: Project[] = [
    {
      repo: 'fm-group/aftersaleshub',
      titleKey: 'progetti.item1.title',
      descKey: 'progetti.item1.desc',
      techs: ['Angular', 'TypeScript', 'Figma', 'i18n', 'PHP'],
      categories: ['angular'],
      links: [],
      visibility: 'nda'
    },
    {
      repo: 'fm-group/easywebparts',
      titleKey: 'progetti.item2.title',
      descKey: 'progetti.item2.desc',
      techs: ['Blazor', 'C#', '.NET', 'API REST', 'WCAG 2.1'],
      categories: ['blazor'],
      links: [],
      visibility: 'nda'
    },
    {
      titleKey: 'progetti.item3.title',
      descKey: 'progetti.item3.desc',
      techs: ['Vue.js', 'HTML5', 'CSS3 / SASS', 'WCAG 2.1 / a11y', 'Claymorphism'],
      categories: ['vanilla'],
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
      categories: ['angular'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/portfolio' }
      ]
    },
    {
      titleKey: 'progetti.item14.title',
      descKey: 'progetti.item14.desc',
      techs: ['Next.js', 'React', 'TypeScript', 'GraphQL', 'AniList API', 'Vercel'],
      categories: ['fullstack'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/manga' },
        { labelKey: 'progetti.link.demo', url: 'https://manga-sage-phi.vercel.app' }
      ]
    },
    {
      titleKey: 'progetti.item8.title',
      descKey: 'progetti.item8.desc',
      techs: ['Angular', 'TypeScript', 'CSS3', 'TMDB API', 'Vercel'],
      categories: ['angular'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/cinema' },
        { labelKey: 'progetti.link.demo', url: 'https://cinema-app-theta.vercel.app' }
      ]
    },
    {
      titleKey: 'progetti.item12.title',
      descKey: 'progetti.item12.desc',
      techs: ['Angular', 'Quarkus', 'Java', 'SCSS'],
      categories: ['angular', 'fullstack'],
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
      categories: ['fullstack'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/MarcoCorradini0/Gruppo_2_PW_3' }
      ]
    },
    {
      titleKey: 'progetti.item11.title',
      descKey: 'progetti.item11.desc',
      techs: ['Angular', 'ApexCharts', 'PokéAPI', 'TypeScript'],
      categories: ['angular'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/LucaMimmo05/pokezone' },
        { labelKey: 'progetti.link.demo', url: 'https://pokezone-phi.vercel.app' }
      ]
    },
    {
      titleKey: 'progetti.item9.title',
      descKey: 'progetti.item9.desc',
      techs: ['Angular', 'TypeScript', 'CSS3'],
      categories: ['angular'],
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
      categories: ['angular'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/gym' },
        { labelKey: 'progetti.link.demo', url: 'https://gym-app-jade-iota.vercel.app' }
      ]
    },
    {
      titleKey: 'progetti.item5.title',
      descKey: 'progetti.item5.desc',
      techs: ['HTML', 'CSS', 'JavaScript'],
      categories: ['vanilla'],
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
      categories: ['vanilla'],
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
      categories: ['vanilla'],
      visibility: 'public',
      links: [
        { labelKey: 'progetti.link.github', url: 'https://github.com/lukaferro/simulazioneProjetWork' },
        { labelKey: 'progetti.link.demo', url: 'https://simulazione-projet-work.vercel.app' }
      ]
    }
  ];
}
