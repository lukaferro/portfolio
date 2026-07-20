import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appSkillBar]'
})
export class SkillBarDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('animate');
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
