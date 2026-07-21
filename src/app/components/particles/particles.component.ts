import { Component, ElementRef, HostListener, OnDestroy, OnInit, viewChild } from '@angular/core';

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
export class ParticlesComponent implements OnInit, OnDestroy {
  readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private particles: Particle[] = [];
  private mouse = { x: -1000, y: -1000 };
  private animationId = 0;
  private readonly isMobile = window.innerWidth < 768;
  private readonly count = this.isMobile ? 60 : 400;
  private readonly mouseRadius = this.isMobile ? 80 : 200;
  private readonly mouseForce = this.isMobile ? 0.004 : 0.04;
  private readonly damping = this.isMobile ? 0.94 : 0.965;
  private readonly driftSpeed = this.isMobile ? 0.002 : 0.008;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(e: TouchEvent) {
    if (e.touches.length > 0) {
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
    }
  }

  @HostListener('document:touchend')
  onTouchEnd() {
    this.mouse.x = -1000;
    this.mouse.y = -1000;
  }

  ngOnInit() {
    this.initParticles();
    this.animate();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }

  private respawnParticle(p: Particle, width: number, height: number) {
    p.x = Math.random() * width;
    p.y = Math.random() * height;
    const speed = this.isMobile ? 0.06 : 0.12;
    p.vx = (Math.random() - 0.5) * speed;
    p.vy = (Math.random() - 0.5) * speed;
    p.size = Math.random() * 2 + 0.8;
    p.opacity = Math.random() * 0.35 + 0.1;
    p.drift = (Math.random() - 0.5) * 0.002;
  }

  private initParticles() {
    const speed = this.isMobile ? 0.06 : 0.12;
    this.particles = Array.from({ length: this.count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.35 + 0.1,
      drift: (Math.random() - 0.5) * 0.002,
    }));
  }

  private animate() {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

      if (p.x < -30 || p.x > canvas.width + 30 || p.y < -30 || p.y > canvas.height + 30) {
        this.respawnParticle(p, canvas.width, canvas.height);
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 153, 0, ${p.opacity})`;
      ctx.fill();
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}
