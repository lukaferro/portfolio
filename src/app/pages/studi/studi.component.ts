import { Component, OnInit, inject } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-studi',
  imports: [ScrollFadeDirective],
  templateUrl: './studi.component.html',
  styleUrl: './studi.component.css'
})
export class StudiComponent implements OnInit {
  private meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Studi',
      description: 'Il mio percorso di studi: ITS Incom Web Developer e diploma in Manutenzione e Assistenza Tecnica.'
    });
  }
}
