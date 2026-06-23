import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';

interface TextSegment {
  text: string;
  class: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterModule, ScrollFadeDirective],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private meta = inject(MetaService);
  private ts = inject(TranslationService);
  tr(key: string): string { return this.ts.t(key); }

  techs = ['Angular', 'React', 'TypeScript', 'Java', 'JavaScript', 'CSS3', 'PHP', 'SQL'];

  phrases: TextSegment[][] = [
    [
      { text: 'WEB ', class: '' },
      { text: 'DEVELOPER', class: 'highlight' }
    ],
    [
      { text: 'FRONT-END', class: 'highlight' }
    ]
  ];

  displayedHtml: string = '';
  currentPhraseIndex: number = 0;
  isDeleting: boolean = false;
  typingSpeed: number = 100;
  deletingSpeed: number = 50;
  pauseBetweenPhrases: number = 2000;
  private timeoutId: any;

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Home',
      description: 'Portfolio di Luca Ferro, Frontend Developer. Scopri i miei progetti, competenze e esperienze nel mondo dello sviluppo web.'
    });
    this.loop();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  loop(): void {
    const currentPhrase = this.phrases[this.currentPhraseIndex];
    const fullText = currentPhrase.map(s => s.text).join('');
    this.handleTyping(currentPhrase, fullText);
  }

  private currentCharCount: number = 0;

  handleTyping(phrase: TextSegment[], fullText: string) {
    if (this.isDeleting) {
      if (this.currentCharCount > 0) {
        this.currentCharCount--;
        this.updateDisplayedHtml(phrase);
        this.timeoutId = setTimeout(() => this.loop(), this.deletingSpeed);
      } else {
        this.isDeleting = false;
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
        this.timeoutId = setTimeout(() => this.loop(), 500);
      }
    } else {
      if (this.currentCharCount < fullText.length) {
        this.currentCharCount++;
        this.updateDisplayedHtml(phrase);
        this.timeoutId = setTimeout(() => this.loop(), this.typingSpeed);
      } else {
        this.isDeleting = true;
        this.timeoutId = setTimeout(() => this.loop(), this.pauseBetweenPhrases);
      }
    }
  }

  updateDisplayedHtml(phrase: TextSegment[]) {
    let html = '';
    let charsRemaining = this.currentCharCount;

    for (const segment of phrase) {
      if (charsRemaining <= 0) break;

      if (charsRemaining >= segment.text.length) {
        html += segment.class
          ? `<span class="${segment.class}">${segment.text}</span>`
          : segment.text;
        charsRemaining -= segment.text.length;
      } else {
        const partialText = segment.text.substring(0, charsRemaining);
        html += segment.class
          ? `<span class="${segment.class}">${partialText}</span>`
          : partialText;
        charsRemaining = 0;
      }
    }
    this.displayedHtml = html;
  }
}
