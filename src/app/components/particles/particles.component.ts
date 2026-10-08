import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject, viewChild } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  drift: number;
}

@Component({
  selector: 'app-particles',
  template: '<canvas #canvas></canvas>',
  styles: [`
    canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
    }
  `]
})
export class ParticlesComponent implements AfterViewInit, OnDestroy {
  readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private zone = inject(NgZone);

  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private mouse = { x: -1000, y: -1000 };
  private animationId = 0;
  private running = false;
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private readonly isMobile = window.innerWidth < 768;
  private readonly count = this.isMobile ? 60 : 700;
  private readonly mouseRadius = this.isMobile ? 80 : 280;
  private readonly mouseForce = this.isMobile ? 0.004 : 0.07;
  private readonly damping = this.isMobile ? 0.94 : 0.955;
  private readonly speed = this.isMobile ? 0.06 : 0.12;

  ngAfterViewInit() {
    this.ctx = this.canvasRef().nativeElement.getContext('2d');
    if (!this.ctx) return;

    this.resize();
    this.initParticles();

    if (this.reducedMotion) {
      this.draw();
      window.addEventListener('resize', this.onResizeStatic);
      return;
    }

    // Animation and pointer tracking run outside Angular: they never touch bindings,
    // so there is no reason to trigger change detection on every frame / mouse move.
    this.zone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.onMouseMove, { passive: true });
      document.addEventListener('touchmove', this.onTouchMove, { passive: true });
      document.addEventListener('touchend', this.onTouchEnd, { passive: true });
      document.addEventListener('visibilitychange', this.onVisibilityChange);
      window.addEventListener('resize', this.onResize);
      this.start();
    });
  }

  ngOnDestroy() {
    this.stop();
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('resize', this.onResizeStatic);
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };

  private onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
    }
  };

  private onTouchEnd = () => {
    this.mouse.x = -1000;
    this.mouse.y = -1000;
  };

  private onVisibilityChange = () => {
    if (document.hidden) {
      this.stop();
    } else {
      this.start();
    }
  };

  private onResize = () => this.resize();

  private onResizeStatic = () => {
    this.resize();
    this.draw();
  };

  private start() {
    if (this.running) return;
    this.running = true;
    this.animationId = requestAnimationFrame(this.frame);
  }

  private stop() {
    this.running = false;
    cancelAnimationFrame(this.animationId);
  }

  private resize() {
    const canvas = this.canvasRef().nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private createParticle(x: number, y: number): Particle {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * this.speed,
      vy: (Math.random() - 0.5) * this.speed,
      size: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.35 + 0.1,
      drift: (Math.random() - 0.5) * 0.002,
    };
  }

  private initParticles() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (this.isMobile) {
      this.particles = Array.from({ length: this.count }, () =>
        this.createParticle(Math.random() * w, Math.random() * h)
      );
      return;
    }

    // Distribute particles on a jittered grid so the desktop background looks even.
    const cols = Math.ceil(Math.sqrt(this.count * (w / h)));
    const rows = Math.ceil(this.count / cols);
    const cellW = w / cols;
    const cellH = h / rows;
    this.particles = [];
    for (let r = 0; r < rows && this.particles.length < this.count; r++) {
      for (let c = 0; c < cols && this.particles.length < this.count; c++) {
        this.particles.push(this.createParticle(c * cellW + Math.random() * cellW, r * cellH + Math.random() * cellH));
      }
    }
  }

  private frame = () => {
    if (!this.running) return;
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(this.frame);
  };

  private update() {
    const { width, height } = this.canvasRef().nativeElement;

    for (const p of this.particles) {
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouseRadius && dist > 1) {
        const force = ((this.mouseRadius - dist) / this.mouseRadius) * this.mouseForce;
        p.vx -= (dx / dist) * force;
        p.vy -= (dy / dist) * force;
      }

      p.vx += p.drift;
      p.vy += p.drift * 0.5;
      p.vx *= this.damping;
      p.vy *= this.damping;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -30 || p.x > width + 30 || p.y < -30 || p.y > height + 30) {
        Object.assign(p, this.createParticle(Math.random() * width, Math.random() * height));
      }
    }
  }

  private draw() {
    const ctx = this.ctx;
    if (!ctx) return;
    const { width, height } = this.canvasRef().nativeElement;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgb(255, 153, 0)';
    for (const p of this.particles) {
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}
