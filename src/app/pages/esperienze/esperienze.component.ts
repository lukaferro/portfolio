import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-esperienze',
  imports: [RouterModule, ScrollFadeDirective],
  templateUrl: './esperienze.component.html',
  styleUrl: './esperienze.component.css'
})
export class EsperienzeComponent implements OnInit {
  private meta = inject(MetaService);
  private ts = inject(TranslationService);
  tr(key: string): string { return this.ts.t(key); }

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Esperienze',
      description: 'Le mie esperienze lavorative come Web Developer: FM Group, Link IT Europe, Servizio Civile e altro.'
    });
  }
}
