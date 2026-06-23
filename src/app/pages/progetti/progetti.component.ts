import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';

interface Project {
  title: string;
  description: string;
  techs: string[];
  links: { label: string; url: string }[];
}

@Component({
  selector: 'app-progetti',
  imports: [ScrollFadeDirective],
  templateUrl: './progetti.component.html',
  styleUrl: './progetti.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ProgettiComponent {
  projects: Project[] = [
    {
      title: 'Sito Vetrina Angular',
      description: 'Sito vetrina sviluppato autonomamente durante lo stage in Angular. Sito multilingua con form contatti PHP, componenti riutilizzabili e design responsive.',
      techs: ['Angular', 'PHP', 'Figma', 'Responsive'],
      links: []
    },
    {
      title: 'Piattaforma B2B Blazor',
      description: 'Piattaforma B2B sviluppata in team con Blazor. Analisi, progettazione UI/UX in Figma, sviluppo frontend e back-end, localizzazione e validazione form.',
      techs: ['Blazor', 'C#', '.NET', 'Figma', 'SQL'],
      links: []
    },
    {
      title: 'UI Component Library',
      description: 'Libreria di componenti UI in stile Claymorphism. Componenti accessibili e riutilizzabili: Alert, Toast, Accordion, Tabs con semantica HTML.',
      techs: ['HTML5', 'CSS3', 'Accessibilità', 'UI Library'],
      links: []
    },
    {
      title: 'Portfolio Personale',
      description: 'Portfolio personale sviluppato con Angular 22, design dark/orange, animazioni particellari, form contatti serverless e view transitions.',
      techs: ['Angular', 'TypeScript', 'CSS3', 'Vercel'],
      links: [
        { label: 'GitHub', url: 'https://github.com/lukaferro/portfolio' }
      ]
    }
  ];
}
