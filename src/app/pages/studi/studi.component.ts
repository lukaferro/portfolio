import { Component, OnInit, inject } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-studi',
  imports: [ScrollFadeDirective],
  templateUrl: './studi.component.html',
  styleUrl: './studi.component.css'
})
export class StudiComponent implements OnInit {
  private meta = inject(MetaService);
  private ts = inject(TranslationService);
  tr(key: string): string { return this.ts.t(key); }

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Studi',
      description: 'Il mio percorso di studi: ITS Incom Web Developer e diploma in Manutenzione e Assistenza Tecnica.'
    });
  }
}
