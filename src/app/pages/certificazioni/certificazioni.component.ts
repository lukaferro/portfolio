import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';

interface Certification {
  titleKey: string;
  issuerKey: string;
  dateKey: string;
  descKey: string;
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
      description: 'Le mie certificazioni: ITS Web Developer e altri corsi di formazione.'
    });
  }

  certifications: Certification[] = [
    {
      titleKey: 'certificazioni.item1.title',
      issuerKey: 'certificazioni.item1.issuer',
      dateKey: 'certificazioni.item1.date',
      descKey: 'certificazioni.item1.desc'
    }
  ];
}
