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
  label?: string;
  labelKey?: string;
  url: string;
}

interface Certification {
  titleKey: string;
  issuerKey: string;
  dateKey: string;
  descKey: string;
  skills?: string[];
  links?: CertificationLink[];
  extraLinks?: CertificationLink[];
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

  showAllCerts = false;

  toggleAllCerts(): void {
    this.showAllCerts = !this.showAllCerts;
  }

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Formazione e Competenze',
      description: 'Competenze tecniche, certificazioni e percorso di studi: Angular, TypeScript, Blazor, C#, .NET, Java, PHP e Anthropic Claude AI.'
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
        { name: 'Blazor', level: 75 },
        { name: 'React', level: 55 },
        { name: 'Next.js', level: 50 }
      ]
    },
    {
      labelKey: 'competenze.cat.backend',
      color: '#4fc3f7',
      skills: [
        { name: 'Java', level: 75 },
        { name: 'C#', level: 70 },
        { name: '.NET', level: 70 },
        { name: 'PHP', level: 65 }
      ]
    },
    {
      labelKey: 'competenze.cat.database',
      color: '#81c784',
      skills: [
        { name: 'SQL', level: 75 },
        { name: 'MySQL', level: 75 },
        { name: 'MongoDB', level: 60 },
        { name: 'Redis', level: 40 }
      ]
    },
    {
      labelKey: 'competenze.cat.tools',
      color: '#ce93d8',
      skills: [
        { name: 'Visual Studio Code', level: 90 },
        { name: 'Git', level: 80 },
        { name: 'Figma', level: 75 },
        { name: 'Adobe Illustrator', level: 65 }
      ]
    }
  ];

  concepts: string[] = [
    'competenze.concept.responsive',
    'competenze.concept.design_system',
    'competenze.concept.a11y',
    'competenze.concept.state',
    'competenze.concept.rest',
    'competenze.concept.validation',
    'competenze.concept.refactoring'
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
      skills: ['Claude API', 'MCP', 'Claude Code', 'AWS Bedrock', 'Google Cloud (GCP)', 'Subagents'],
      links: [
        { label: 'Building with the Claude API', url: '/certificazioni/claude/claude-anthropic-api.pdf' },
        { label: 'MCP Advanced Topics', url: '/certificazioni/claude/mcp-advanced-topics.pdf' },
        { label: 'Claude Code in Action', url: '/certificazioni/claude/claude-code-in-action.pdf' },
        { label: 'Claude in Amazon Bedrock (AWS)', url: '/certificazioni/claude/claude-bedrock.pdf' },
        { label: 'Claude on Google Cloud (GCP)', url: '/certificazioni/claude/claude-google-cloud.pdf' },
        { label: 'Introduction to Subagents', url: '/certificazioni/claude/introduction-to-subagents.pdf' }
      ],
      extraLinks: [
        { label: 'Claude 101', url: '/certificazioni/claude/claude-101.pdf' },
        { label: 'Claude Platform 101', url: '/certificazioni/claude/claude-platform-101.pdf' },
        { label: 'Claude Code 101', url: '/certificazioni/claude/claude-code-101.pdf' },
        { label: 'Intro Claude Cowork', url: '/certificazioni/claude/intro-claude-cowork.pdf' },
        { label: 'Intro Model Context Protocol', url: '/certificazioni/claude/intro-mcp.pdf' },
        { label: 'Introduction to Agent Skills', url: '/certificazioni/claude/introduction-to-agent-skills.pdf' },
        { label: 'AI Capabilities and Limitations', url: '/certificazioni/claude/ai-capabilities-and-limitations.pdf' },
        { label: 'AI Fluency: Foundations', url: '/certificazioni/claude/ai-fluency-foundations.pdf' },
        { label: 'AI Fluency for Builders', url: '/certificazioni/claude/ai-fluency-for-builders.pdf' },
        { label: 'AI Fluency for Small Businesses', url: '/certificazioni/claude/ai-fluency-for-small-businesses.pdf' },
        { label: 'AI Fluency for Nonprofits', url: '/certificazioni/claude/ai-fluency-for-nonprofits.pdf' },
        { label: 'AI Fluency for Educators', url: '/certificazioni/claude/ai-fluency-educators.pdf' },
        { label: 'AI Fluency for Students', url: '/certificazioni/claude/ai-fluency-students.pdf' },
        { label: 'AI Fluency for K-12 Educators', url: '/certificazioni/claude/ai-fluency-for-k-12-educators.pdf' },
        { label: 'Teaching AI Fluency', url: '/certificazioni/claude/teaching-ai-fluency.pdf' }
      ]
    },
    {
      titleKey: 'certificazioni.item1.title',
      issuerKey: 'certificazioni.item1.issuer',
      dateKey: 'certificazioni.item1.date',
      descKey: 'certificazioni.item1.desc',
      skills: ['Angular', 'TypeScript', 'Java', 'MySQL', 'UX / UI', 'DevOps'],
      links: [
        { labelKey: 'certificazioni.view_cert', url: '/certificazioni/its-web-developer.pdf' }
      ]
    },
    {
      titleKey: 'certificazioni.item3.title',
      issuerKey: 'certificazioni.item3.issuer',
      dateKey: 'certificazioni.item3.date',
      descKey: 'certificazioni.item3.desc',
      skills: ['Comunicazione Pubblica', 'Privacy', 'Accessibilità Web', 'Usabilità Web'],
      links: [
        { labelKey: 'certificazioni.view_cert', url: '/certificazioni/corso-mosaico.pdf' }
      ]
    },
    {
      titleKey: 'certificazioni.item2.title',
      issuerKey: 'certificazioni.item2.issuer',
      dateKey: 'certificazioni.item2.date',
      descKey: 'certificazioni.item2.desc',
      skills: ['Project Management', 'Turismo Sostenibile', 'Comunicazione Pubblica'],
      links: [
        { labelKey: 'certificazioni.view_cert', url: '/certificazioni/servizio-civile.pdf' }
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
