import { Directive, ElementRef, OnDestroy, afterNextRender, inject } from '@angular/core';

@Directive({
  selector: '[appScrollFade]'
})
export class ScrollFadeDirective implements OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      // If already in viewport on load, reveal immediately without scrolling delay
      const rect = this.el.nativeElement.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        this.el.nativeElement.classList.add('visible');
        return;
      }

      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('visible');
            this.observer?.unobserve(this.el.nativeElement);
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
