import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, afterNextRender, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { SkillBarDirective } from '../../directives/skill-bar.directive';
import { MetaService } from '../../services/meta.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { skillLevelKey } from '../../utils/skill-level';

interface TopSkill {
  name: string;
  level: number;
  color: string;
}

interface HomeTimelineItem {
  dateKey: string;
  titleKey: string;
  subtitleKey: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterModule, ScrollFadeDirective, SkillBarDirective, TranslatePipe],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private meta = inject(MetaService);

  readonly skillLevelKey = skillLevelKey;

  topSkills: TopSkill[] = [
    { name: 'Angular', level: 90, color: '#ff9900' },
    { name: 'TypeScript', level: 85, color: '#ff9900' },
    { name: 'Blazor', level: 80, color: '#ff9900' },
    { name: 'HTML5 / CSS3', level: 90, color: '#ff9900' },
    { name: 'C# / .NET', level: 70, color: '#4fc3f7' },
    { name: 'Web API RESTful', level: 70, color: '#4fc3f7' },
    { name: 'MySQL / SQL Server', level: 70, color: '#81c784' },
    { name: 'Git / GitHub', level: 75, color: '#ce93d8' }
  ];

  homeTimeline: HomeTimelineItem[] = [
    { dateKey: 'esperienze.item1.date', titleKey: 'esperienze.item1.title', subtitleKey: 'esperienze.item1.subtitle' },
    { dateKey: 'studi.item1.date', titleKey: 'studi.item1.title', subtitleKey: 'studi.item1.subtitle' },
    { dateKey: 'esperienze.item2.date', titleKey: 'esperienze.item2.title', subtitleKey: 'esperienze.item2.subtitle' },
    { dateKey: 'esperienze.item3.date', titleKey: 'esperienze.item3.title', subtitleKey: 'esperienze.item3.subtitle' },
    { dateKey: 'esperienze.item4.date', titleKey: 'esperienze.item4.title', subtitleKey: 'esperienze.item4.subtitle' }
  ];

  private readonly phrases: { text: string; highlight: [number, number] }[] = [
    { text: 'FULL-STACK DEVELOPER', highlight: [0, 10] },
    { text: 'WEB DEVELOPER', highlight: [4, 13] }
  ];

  /** Typed text split around the highlighted range, rendered without innerHTML. */
  // Signals, not plain fields: the typing timers start in afterNextRender, which runs outside
  // the Angular zone, so plain field updates would never be rendered.
  readonly typedBefore = signal('');
  readonly typedHighlight = signal('');
  readonly typedAfter = signal('');
  readonly heroLoaded = signal(false);
  private phraseIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Home',
      description: 'Portfolio di Luca Ferro, Full-Stack Web Developer. Scopri i miei progetti, competenze ed esperienze nello sviluppo web completo.',
      titleKey: 'meta.home.title',
      descKey: 'meta.home.desc'
    });
  }

  constructor() {
    // Pre-rendered HTML shows the full first phrase; the typing loop runs in the browser only
    // (an endless timer chain would also keep pre-rendering from ever finishing).
    const { text, highlight } = this.phrases[0];
    this.setTyped(text, highlight);

    afterNextRender(() => {
      setTimeout(() => this.heroLoaded.set(true));
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.charIndex = 0;
      this.setTyped('', highlight);
      this.tick();
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  private tick(): void {
    const { text, highlight } = this.phrases[this.phraseIndex];

    if (this.deleting) {
      this.charIndex--;
      if (this.charIndex < 0) {
        this.deleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        this.timeoutId = setTimeout(() => this.tick(), 500);
        return;
      }
    } else {
      this.charIndex++;
      if (this.charIndex > text.length) {
        this.deleting = true;
        this.timeoutId = setTimeout(() => this.tick(), 2000);
        return;
      }
    }

    this.setTyped(text.substring(0, this.charIndex), highlight);
    const speed = this.deleting ? 50 : 100;
    this.timeoutId = setTimeout(() => this.tick(), speed);
  }

  private setTyped(visible: string, [start, end]: [number, number]): void {
    this.typedBefore.set(visible.substring(0, start));
    this.typedHighlight.set(visible.substring(start, end));
    this.typedAfter.set(visible.substring(end));
  }
}
