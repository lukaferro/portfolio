import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaService } from '../../services/meta.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-not-found',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class NotFoundComponent implements OnInit {
  private meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Pagina non trovata',
      description: 'La pagina che stai cercando non esiste o è stata spostata.'
    });
  }
}
