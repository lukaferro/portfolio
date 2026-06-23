import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';

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
export class CertificazioniComponent {
  certifications: Certification[] = [
    {
      title: 'ITS Web Developer',
      issuer: 'ITS Incom',
      date: '2026',
      description: 'Diploma biennale di alta formazione in sviluppo software e web. Esami conclusi, in attesa di valutazione finale.'
    }
  ];
}
