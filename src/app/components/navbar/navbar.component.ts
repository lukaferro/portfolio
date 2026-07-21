import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
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
  private router = inject(Router);

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleLang(): void {
    this.ts.setLang(this.ts.currentLang() === 'it' ? 'en' : 'it');
  }

  get currentLang(): string {
    return this.ts.currentLang();
  }
}
