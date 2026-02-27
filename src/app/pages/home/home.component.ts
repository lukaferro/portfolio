import { Component, OnInit, OnDestroy } from '@angular/core';

interface TextSegment {
  text: string;
  class: string;
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
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

    // Determine current text length based on displayedHtml is hard because of tags.
    // Easier approach: track character count.
    // Let's rely on a separate specific method for constructing HTML.

    this.handleTyping(currentPhrase, fullText);
  }

  // Helper to track how many plain chars are currently shown
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
        this.timeoutId = setTimeout(() => this.loop(), 500); // Short pause before typing next
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
        // Full segment
        html += segment.class
          ? `<span class="${segment.class}">${segment.text}</span>`
          : segment.text;
        charsRemaining -= segment.text.length;
      } else {
        // Partial segment
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
