import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-contatti',
  imports: [FormsModule, ScrollFadeDirective, TranslatePipe],
  templateUrl: './contatti.component.html',
  styleUrl: './contatti.component.css'
})
export class ContattiComponent implements OnInit {
  private meta = inject(MetaService);
  private ts = inject(TranslationService);

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Contatti',
      description: 'Contatta Luca Ferro per collaborazioni, progetti o opportunità lavorative.'
    });
  }
  formData = {
    nome: '',
    email: '',
    oggetto: '',
    messaggio: ''
  };

  inviato = false;
  errore = '';
  caricamento = false;

  async inviaForm() {
    this.errore = '';
    this.inviato = false;

    if (!this.formData.nome || !this.formData.email || !this.formData.oggetto || !this.formData.messaggio) {
      this.errore = this.ts.t('contatti.form.error.required');
      return;
    }

    this.caricamento = true;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || this.ts.t('contatti.form.error.generic'));
      }

      this.inviato = true;
      this.formData = { nome: '', email: '', oggetto: '', messaggio: '' };
    } catch (err: any) {
      this.errore = err.message || this.ts.t('contatti.form.error.connection');
    } finally {
      this.caricamento = false;
    }
  }
}
