import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
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

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Certificazioni',
      description: 'Le mie certificazioni: ITS Web Developer e altri corsi di formazione.'
    });
  }

  certifications: Certification[] = [
    {
      title: 'ITS Web Developer',
      issuer: 'ITS Incom',
      date: '2026',
      description: 'Diploma biennale di alta formazione in sviluppo software e web. Esami conclusi, in attesa di valutazione finale.'
    }
  ];
}
