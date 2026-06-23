import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-competenze',
  imports: [ScrollFadeDirective, RouterModule],
  templateUrl: './competenze.component.html',
  styleUrl: './competenze.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class CompetenzeComponent implements OnInit {
  private meta = inject(MetaService);
  private ts = inject(TranslationService);
  tr(key: string): string { return this.ts.t(key); }

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Competenze',
      description: 'Competenze tecniche e soft skills: Angular, React, Java, JavaScript, CSS, HTML e molto altro.'
    });
  }
}
