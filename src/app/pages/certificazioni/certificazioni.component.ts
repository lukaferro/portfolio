import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';

interface CertificationLink {
  label: string;
  url: string;
}

interface Certification {
  titleKey: string;
  issuerKey: string;
  dateKey: string;
  descKey: string;
  links?: CertificationLink[];
}

@Component({
  selector: 'app-certificazioni',
  imports: [ScrollFadeDirective],
  templateUrl: './certificazioni.component.html',
  styleUrl: './certificazioni.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class CertificazioniComponent implements OnInit {
  private meta = inject(MetaService);
  private ts = inject(TranslationService);
  tr(key: string): string { return this.ts.t(key); }

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Certificazioni',
      description: 'Le mie certificazioni: ITS Web Developer, Servizio Civile, corsi Anthropic Claude AI e attestati professionali.'
    });
  }

  certifications: Certification[] = [
    {
      titleKey: 'certificazioni.item1.title',
      issuerKey: 'certificazioni.item1.issuer',
      dateKey: 'certificazioni.item1.date',
      descKey: 'certificazioni.item1.desc',
      links: [
        { label: 'Visualizza certificato →', url: '/certificazioni/its-web-developer.pdf' }
      ]
    },
    {
      titleKey: 'certificazioni.item2.title',
      issuerKey: 'certificazioni.item2.issuer',
      dateKey: 'certificazioni.item2.date',
      descKey: 'certificazioni.item2.desc',
      links: [
        { label: 'Visualizza attestato →', url: '/certificazioni/servizio-civile.pdf' }
      ]
    },
    {
      titleKey: 'certificazioni.item3.title',
      issuerKey: 'certificazioni.item3.issuer',
      dateKey: 'certificazioni.item3.date',
      descKey: 'certificazioni.item3.desc',
      links: [
        { label: 'Visualizza attestato →', url: '/certificazioni/corso-mosaico.pdf' }
      ]
    },
    {
      titleKey: 'certificazioni.item4.title',
      issuerKey: 'certificazioni.item4.issuer',
      dateKey: 'certificazioni.item4.date',
      descKey: 'certificazioni.item4.desc',
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
