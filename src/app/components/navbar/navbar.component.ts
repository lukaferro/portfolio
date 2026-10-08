import { Component, ChangeDetectionStrategy, ElementRef, HostListener, inject, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private ts = inject(TranslationService);
  private readonly hamburger = viewChild<ElementRef<HTMLButtonElement>>('hamburger');

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.menuOpen) return;
    this.closeMenu();
    this.hamburger()?.nativeElement.focus();
  }

  toggleLang(): void {
    this.ts.setLang(this.ts.currentLang() === 'it' ? 'en' : 'it');
  }

  get currentLang(): string {
    return this.ts.currentLang();
  }
}
