import { Component, ChangeDetectionStrategy, ElementRef, inject, viewChild, signal } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  private readonly router = inject(Router);

  readonly isCardPage = signal<boolean>(this.getInitialIsCard());

  constructor() {
    // Router anchor scrolling must land below the fixed navbar
    inject(ViewportScroller).setOffset([0, 104]);

    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.isCardPage.set(this.checkIsCardUrl(e.urlAfterRedirects || e.url));
    });
  }

  private getInitialIsCard(): boolean {
    if (typeof window !== 'undefined' && window.location) {
      return this.checkIsCardUrl(window.location.pathname);
    }
    return this.checkIsCardUrl(this.router.url);
  }

  private checkIsCardUrl(url: string): boolean {
    const cleanUrl = url.split(/[?#]/)[0];
    return cleanUrl === '/card' || cleanUrl === '/connect';
  }

  /** With <base href="/"> a plain "#main-content" link would navigate to the home page. */
  skipToMain(event: Event): void {
    event.preventDefault();
    this.main().nativeElement.focus();
  }
}
