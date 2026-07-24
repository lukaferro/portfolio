import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { SkillBarDirective } from '../../directives/skill-bar.directive';
import { MetaService } from '../../services/meta.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface TopSkill {
  name: string;
  level: number;
  color: string;
}

interface HomeTimelineItem {
  date: string;
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
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private meta = inject(MetaService);

  topSkills: TopSkill[] = [
    { name: 'Angular', level: 90, color: '#ff9900' },
    { name: 'TypeScript', level: 85, color: '#ff9900' },
    { name: 'JavaScript', level: 85, color: '#ff9900' },
    { name: 'HTML5', level: 90, color: '#ff9900' },
    { name: 'Java', level: 75, color: '#4fc3f7' },
    { name: 'CSS3', level: 85, color: '#ff9900' }
  ];

  homeTimeline: HomeTimelineItem[] = [
    { date: '2024 — 2026', titleKey: 'studi.item1.title', subtitleKey: 'studi.item1.subtitle' },
    { date: 'Gen — Mag 2026', titleKey: 'esperienze.item1.title', subtitleKey: 'esperienze.item1.subtitle' },
    { date: 'Giu — Lug 2025', titleKey: 'esperienze.item2.title', subtitleKey: 'esperienze.item2.subtitle' },
    { date: 'Mag 2023 — Mag 2024', titleKey: 'esperienze.item3.title', subtitleKey: 'esperienze.item3.subtitle' }
  ];

  private readonly phrases: { text: string; highlight: [number, number] }[] = [
    { text: 'WEB DEVELOPER', highlight: [4, 11] },
    { text: 'FRONT-END', highlight: [0, 9] }
  ];

  displayedHtml = '';
  heroLoaded = false;
  private phraseIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private timeoutId: any;

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Home',
      description: 'Portfolio di Luca Ferro, Frontend Developer. Scopri i miei progetti, competenze e esperienze nel mondo dello sviluppo web.'
    });
    this.tick();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.heroLoaded = true);
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

    this.displayedHtml = this.buildHtml(text.substring(0, this.charIndex), highlight);
    const speed = this.deleting ? 50 : 100;
    this.timeoutId = setTimeout(() => this.tick(), speed);
  }

  private buildHtml(visible: string, highlight: [number, number]): string {
    const [start, end] = highlight;
    if (visible.length <= start) return visible;
    if (visible.length >= end) {
      return visible.substring(0, start) + `<span class="highlight">${visible.substring(start, end)}</span>` + visible.substring(end);
    }
    return visible.substring(0, start) + `<span class="highlight">${visible.substring(start)}</span>`;
  }
}
