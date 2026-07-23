import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { SkillBarDirective } from '../../directives/skill-bar.directive';
import { MetaService } from '../../services/meta.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface TimelineItem {
  dateKey: string;
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  pdfUrl?: string;
}

interface SkillItem {
  name: string;
  level: number;
}

interface SkillCategory {
  labelKey: string;
  color: string;
  skills: SkillItem[];
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

interface SoftSkill {
  icon: string;
  labelKey: string;
  color: string;
  rotation: number;
}

@Component({
  selector: 'app-formazione',
  imports: [ScrollFadeDirective, SkillBarDirective, TranslatePipe],
  templateUrl: './formazione.component.html',
  styleUrl: './formazione.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class FormazioneComponent implements OnInit {
  private meta = inject(MetaService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Formazione e Competenze',
      description: 'Competenze tecniche, certificazioni e percorso di studi: Angular, Java, Quarkus, Anthropic Claude AI.'
    });

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  }

  categories: SkillCategory[] = [
    {
      labelKey: 'competenze.cat.frontend',
      color: '#ff9900',
      skills: [
        { name: 'Angular', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML5', level: 90 },
        { name: 'CSS3', level: 85 },
        { name: 'Blazor', level: 70 },
        { name: 'React', level: 60 },
        { name: 'Next.js', level: 50 }
      ]
    },
    {
      labelKey: 'competenze.cat.backend',
      color: '#4fc3f7',
      skills: [
        { name: 'Java', level: 75 },
        { name: 'Quarkus', level: 70 },
        { name: 'C#', level: 65 },
        { name: '.NET', level: 60 },
        { name: 'PHP', level: 50 },
        { name: 'Python', level: 40 }
      ]
    },
    {
      labelKey: 'competenze.cat.database',
      color: '#81c784',
      skills: [
        { name: 'SQL', level: 75 },
        { name: 'MySQL', level: 70 },
        { name: 'MongoDB', level: 60 },
        { name: 'Redis', level: 30 }
      ]
    },
    {
      labelKey: 'competenze.cat.tools',
      color: '#ce93d8',
      skills: [
        { name: 'VS Code', level: 90 },
        { name: 'Git', level: 80 },
        { name: 'Figma', level: 70 }
      ]
    }
  ];

  softSkills: SoftSkill[] = [
    { icon: '🤝', labelKey: 'competenze.teamwork', color: '#ff9900', rotation: -3 },
    { icon: '💬', labelKey: 'competenze.communication', color: '#4fc3f7', rotation: 2 },
    { icon: '📋', labelKey: 'competenze.organization', color: '#81c784', rotation: -1.5 },
    { icon: '🧠', labelKey: 'competenze.problemsolving', color: '#ce93d8', rotation: 3.5 },
    { icon: '🔄', labelKey: 'competenze.adaptability', color: '#ff8a65', rotation: -2 },
    { icon: '📚', labelKey: 'competenze.selflearning', color: '#4dd0e1', rotation: 1.5 },
    { icon: '⚡', labelKey: 'competenze.proactivity', color: '#ffd54f', rotation: -4 },
    { icon: '❤️', labelKey: 'competenze.empathy', color: '#f48fb1', rotation: 2.5 }
  ];

  certifications: Certification[] = [
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
        { label: 'AI Fluency for Educators', url: '/certificazioni/claude/ai-fluency-educators.pdf' },
        { label: 'AI Fluency for Students', url: '/certificazioni/claude/ai-fluency-students.pdf' }
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
      titleKey: 'certificazioni.item2.title',
      issuerKey: 'certificazioni.item2.issuer',
      dateKey: 'certificazioni.item2.date',
      descKey: 'certificazioni.item2.desc',
      skills: ['Project Management', 'Turismo Sostenibile', 'Comunicazione Pubblica'],
      links: [
        { label: 'Visualizza attestato →', url: '/certificazioni/servizio-civile.pdf' }
      ]
    }
  ];

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
}
