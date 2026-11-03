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
  cvMenuOpen = false;

  readonly cvItUrl = '/cv_It.pdf';
  readonly cvEnUrl = '/cv_En.pdf';

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) this.cvMenuOpen = false;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleCvMenu(event?: MouseEvent): void {
    event?.stopPropagation();
    this.cvMenuOpen = !this.cvMenuOpen;
  }

  closeCvMenu(): void {
    this.cvMenuOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.cvMenuOpen) {
      this.closeCvMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.cvMenuOpen) {
      this.closeCvMenu();
      return;
    }
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
