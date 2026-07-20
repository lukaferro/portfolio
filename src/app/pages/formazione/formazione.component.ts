import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';

interface TimelineItem {
  dateKey: string;
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  pdfUrl?: string;
}

interface SkillCategory {
  labelKey: string;
  color: string;
  skills: string[];
}

interface CertificationLink {
  label: string;
  url: string;
}

interface Certification {
  titleKey: string;
  issuerKey: string;
  dateKey: string;
  descKey: string;
  skills?: string[];
  links?: CertificationLink[];
}

@Component({
  selector: 'app-formazione',
  imports: [ScrollFadeDirective],
  templateUrl: './formazione.component.html',
  styleUrl: './formazione.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class FormazioneComponent implements OnInit {
  private meta = inject(MetaService);
  private ts = inject(TranslationService);
  tr(key: string): string { return this.ts.t(key); }

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Formazione e Competenze',
      description: 'Percorso di studi, competenze tecniche e certificazioni: ITS Web Developer, servizio civile, corsi Anthropic Claude AI.'
    });
  }

  timeline: TimelineItem[] = [
    {
      dateKey: 'studi.item1.date',
      titleKey: 'studi.item1.title',
      subtitleKey: 'studi.item1.subtitle',
      descKey: 'studi.item1.desc',
      pdfUrl: '/certificazioni/its-web-developer.pdf'
    },
    {
      dateKey: 'studi.item2.date',
      titleKey: 'studi.item2.title',
      subtitleKey: 'studi.item2.subtitle',
      descKey: 'studi.item2.desc',
      pdfUrl: '/certificazioni/diploma-elettricista.pdf'
    }
  ];

  categories: SkillCategory[] = [
    {
      labelKey: 'competenze.cat.frontend',
      color: '#ff9900',
      skills: ['Angular', 'React', 'Next.js', 'Blazor', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript']
    },
    {
      labelKey: 'competenze.cat.backend',
      color: '#4fc3f7',
      skills: ['Java', 'C#', '.NET', 'PHP', 'Quarkus', 'Python']
    },
    {
      labelKey: 'competenze.cat.database',
      color: '#81c784',
      skills: ['SQL', 'MySQL', 'MongoDB', 'Redis']
    },
    {
      labelKey: 'competenze.cat.tools',
      color: '#ce93d8',
      skills: ['Git', 'Figma', 'VS Code']
    }
  ];

  softSkills = [
    { icon: '🤝', labelKey: 'competenze.teamwork' },
    { icon: '💬', labelKey: 'competenze.communication' },
    { icon: '📋', labelKey: 'competenze.organization' },
    { icon: '🧠', labelKey: 'competenze.problemsolving' }
  ];

  certifications: Certification[] = [
    {
      titleKey: 'certificazioni.item1.title',
      issuerKey: 'certificazioni.item1.issuer',
      dateKey: 'certificazioni.item1.date',
      descKey: 'certificazioni.item1.desc',
      skills: ['Angular', 'Blazor', 'C#', '.NET', 'SQL', 'Figma', 'HTML5', 'CSS3', 'JavaScript'],
      links: [
        { label: 'Visualizza certificato →', url: '/certificazioni/its-web-developer.pdf' }
      ]
    },
    {
      titleKey: 'certificazioni.item2.title',
      issuerKey: 'certificazioni.item2.issuer',
      dateKey: 'certificazioni.item2.date',
      descKey: 'certificazioni.item2.desc',
      skills: ['Project Management', 'Turismo Sostenibile', 'Comunicazione Pubblica'],
      links: [
        { label: 'Visualizza attestato →', url: '/certificazioni/servizio-civile.pdf' }
      ]
    },
    {
      titleKey: 'certificazioni.item3.title',
      issuerKey: 'certificazioni.item3.issuer',
      dateKey: 'certificazioni.item3.date',
      descKey: 'certificazioni.item3.desc',
      skills: ['Comunicazione Pubblica', 'Privacy', 'Accessibilità Web', 'Usabilità Web'],
      links: [
        { label: 'Visualizza attestato →', url: '/certificazioni/corso-mosaico.pdf' }
      ]
    },
    {
      titleKey: 'certificazioni.item4.title',
      issuerKey: 'certificazioni.item4.issuer',
      dateKey: 'certificazioni.item4.date',
      descKey: 'certificazioni.item4.desc',
      skills: ['AI Literacy', 'Claude', 'API Anthropic', 'MCP', 'Claude Code'],
      links: [
        { label: 'Claude 101', url: '/certificazioni/claude/claude-101.pdf' },
        { label: 'Claude Platform 101', url: '/certificazioni/claude/claude-platform-101.pdf' },
        { label: 'Claude Code 101', url: '/certificazioni/claude/claude-code-101.pdf' },
        { label: 'Claude Code in Action', url: '/certificazioni/claude/claude-code-in-action.pdf' },
        { label: 'Intro Claude Cowork', url: '/certificazioni/claude/intro-claude-cowork.pdf' },
        { label: 'Claude with Anthropic API', url: '/certificazioni/claude/claude-anthropic-api.pdf' },
        { label: 'AI Fluency: Foundations', url: '/certificazioni/claude/ai-fluency-foundations.pdf' },
        { label: 'Intro Model Context Protocol', url: '/certificazioni/claude/intro-mcp.pdf' },
        { label: 'AI Fluency for Educators', url: '/certificazioni/claude/ai-fluency-educators.pdf' }
      ]
    }
  ];
}
