import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { SkillBarDirective } from '../../directives/skill-bar.directive';
import { MetaService } from '../../services/meta.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { skillLevelKey } from '../../utils/skill-level';

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
}

interface LanguageSkill {
  nameKey: string;
  levelKey: string;
  descKey?: string;
  badge: string;
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

  readonly skillLevelKey = skillLevelKey;

  showAllCerts = false;

  toggleAllCerts(): void {
    this.showAllCerts = !this.showAllCerts;
  }

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Formazione e Competenze',
      description: 'Competenze tecniche, certificazioni e formazione: Angular, TypeScript, Blazor, C#, .NET, Java, PHP, API REST, database relazionali e conformità a11y (WCAG 2.1).',
      titleKey: 'meta.formazione.title',
      descKey: 'meta.formazione.desc'
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
        { name: 'JavaScript (ES6+)', level: 85 },
        { name: 'HTML5 / CSS3 (SASS)', level: 90 },
        { name: 'Blazor WebAssembly', level: 80 },
        { name: 'React', level: 60 },
        { name: 'UI/UX Design System', level: 85 },
        { name: 'Web Accessibility (WCAG 2.1 / a11y)', level: 90 }
      ]
    },
    {
      labelKey: 'competenze.cat.backend',
      color: '#4fc3f7',
      skills: [
        { name: 'C# / .NET / Blazor', level: 85 },
        { name: 'Web API RESTful', level: 85 },
        { name: 'Java', level: 75 },
        { name: 'PHP', level: 70 },
        { name: 'Python', level: 65 }
      ]
    },
    {
      labelKey: 'competenze.cat.database',
      color: '#81c784',
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'SQL Server', level: 75 },
        { name: 'MongoDB (NoSQL)', level: 65 },
        { name: 'Redis', level: 50 }
      ]
    },
    {
      labelKey: 'competenze.cat.tools',
      color: '#ce93d8',
      skills: [
        { name: 'Visual Studio / VS Code', level: 90 },
        { name: 'Git / GitHub', level: 85 },
        { name: 'Postman', level: 80 },
        { name: 'Vercel', level: 80 },
        { name: 'Docker', level: 70 },
        { name: 'Figma', level: 75 },
        { name: 'Adobe Illustrator', level: 65 },
        { name: 'npm', level: 85 }
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
    'competenze.concept.refactoring',
    'competenze.concept.cybersecurity',
    'competenze.concept.ai'
  ];

  languages: LanguageSkill[] = [
    { nameKey: 'lingue.it', levelKey: 'lingue.it.level', badge: 'IT' },
    { nameKey: 'lingue.en', levelKey: 'lingue.en.level', descKey: 'lingue.en.desc', badge: 'EN' }
  ];

  softSkills: SoftSkill[] = [
    { icon: '🤝', labelKey: 'competenze.teamwork', color: '#ff9900' },
    { icon: '💬', labelKey: 'competenze.communication', color: '#4fc3f7' },
    { icon: '📋', labelKey: 'competenze.organization', color: '#81c784' },
    { icon: '🧠', labelKey: 'competenze.problemsolving', color: '#ce93d8' },
    { icon: '🔄', labelKey: 'competenze.adaptability', color: '#ff8a65' },
    { icon: '📚', labelKey: 'competenze.selflearning', color: '#4dd0e1' },
    { icon: '⚡', labelKey: 'competenze.proactivity', color: '#ffd54f' },
    { icon: '❤️', labelKey: 'competenze.empathy', color: '#f48fb1' }
  ];

  certifications: Certification[] = [
    {
      titleKey: 'certificazioni.item4.title',
      issuerKey: 'certificazioni.item4.issuer',
      dateKey: 'certificazioni.item4.date',
      descKey: 'certificazioni.item4.desc',
      skills: ['Claude API', 'MCP', 'Subagents', 'Claude Code', 'AWS Bedrock', 'GCP Vertex AI'],
      links: [
        { label: 'Building with the Claude API', url: '/certificazioni/claude/claude-anthropic-api.pdf' },
        { label: 'MCP Advanced Topics', url: '/certificazioni/claude/mcp-advanced-topics.pdf' },
        { label: 'Introduction to Subagents', url: '/certificazioni/claude/introduction-to-subagents.pdf' },
        { label: 'Claude Code in Action', url: '/certificazioni/claude/claude-code-in-action.pdf' },
        { label: 'Claude in Amazon Bedrock (AWS)', url: '/certificazioni/claude/claude-bedrock.pdf' },
        { label: 'Claude on Google Cloud (GCP)', url: '/certificazioni/claude/claude-google-cloud.pdf' }
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
      skills: ['Full-Stack', 'Angular', 'TypeScript', 'Java', 'PHP', 'MySQL', 'Docker', 'WCAG 2.1'],
      links: [
        { labelKey: 'certificazioni.view_cert', url: '/certificazioni/its-web-developer.pdf' }
      ]
    },
    {
      titleKey: 'certificazioni.item3.title',
      issuerKey: 'certificazioni.item3.issuer',
      dateKey: 'certificazioni.item3.date',
      descKey: 'certificazioni.item3.desc',
      skills: ['tag.public_comm', 'Privacy', 'tag.web_a11y', 'tag.web_usability'],
      links: [
        { labelKey: 'certificazioni.view_cert', url: '/certificazioni/corso-mosaico.pdf' }
      ]
    },
    {
      titleKey: 'certificazioni.item2.title',
      issuerKey: 'certificazioni.item2.issuer',
      dateKey: 'certificazioni.item2.date',
      descKey: 'certificazioni.item2.desc',
      skills: ['tag.chamber_services', 'tag.digitalization', 'tag.business_relations'],
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
