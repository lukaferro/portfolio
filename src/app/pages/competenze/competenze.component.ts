import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-competenze',
  imports: [ScrollFadeDirective],
  templateUrl: './competenze.component.html',
  styleUrl: './competenze.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class CompetenzeComponent implements OnInit {
  private meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Competenze',
      description: 'Competenze tecniche e soft skills: Angular, React, Java, JavaScript, CSS, HTML e molto altro.'
    });
  }
}
