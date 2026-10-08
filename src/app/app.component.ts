import { Component, ChangeDetectionStrategy, ElementRef, inject, viewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParticlesComponent } from './components/particles/particles.component';
import { TranslatePipe } from './pipes/translate.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ParticlesComponent, TranslatePipe],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  constructor() {
    // Router anchor scrolling must land below the fixed navbar
    inject(ViewportScroller).setOffset([0, 104]);
  }

  /** With <base href="/"> a plain "#main-content" link would navigate to the home page. */
  skipToMain(event: Event): void {
    event.preventDefault();
    this.main().nativeElement.focus();
  }
}
