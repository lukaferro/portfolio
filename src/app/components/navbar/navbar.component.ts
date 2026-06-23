import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private ts = inject(TranslationService);

  tr(key: string): string {
    return this.ts.t(key);
  }

  toggleLang(): void {
    this.ts.setLang(this.ts.currentLang() === 'it' ? 'en' : 'it');
  }

  get currentLang(): string {
    return this.ts.currentLang();
  }
}
