import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-esperienze',
  imports: [RouterModule, ScrollFadeDirective, TranslatePipe],
  templateUrl: './esperienze.component.html',
  styleUrl: './esperienze.component.css'
})
export class EsperienzeComponent implements OnInit {
  private meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Esperienze',
      description: 'Le mie esperienze lavorative come Web Developer: FM Group, Link IT Europe, Servizio Civile e altro.'
    });
  }
}
