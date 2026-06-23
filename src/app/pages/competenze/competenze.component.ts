import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';

@Component({
  selector: 'app-competenze',
  imports: [ScrollFadeDirective],
  templateUrl: './competenze.component.html',
  styleUrl: './competenze.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class CompetenzeComponent { }
