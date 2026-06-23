import { Component, ElementRef, HostListener, OnDestroy, OnInit, viewChild } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  stuck: number;
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
  private readonly count = 300;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
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
    p.vx = (Math.random() - 0.5) * 0.4;
    p.vy = (Math.random() - 0.5) * 0.4;
    p.size = Math.random() * 2.5 + 1;
    p.opacity = Math.random() * 0.5 + 0.2;
    p.stuck = 0;
  }

  private initParticles() {
    this.particles = Array.from({ length: this.count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      stuck: 0,
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

      if (dist < 300) {
        const force = (300 - dist) / 300 * 0.3;
        p.vx -= (dx / dist) * force;
        p.vy -= (dy / dist) * force;
      }

      p.vx += (Math.random() - 0.5) * 0.04;
      p.vy += (Math.random() - 0.5) * 0.04;

      p.vx *= 0.985;
      p.vy *= 0.985;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -50 || p.x > canvas.width + 50 || p.y < -50 || p.y > canvas.height + 50) {
        this.respawnParticle(p, canvas.width, canvas.height);
      } else {
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.05) {
          p.stuck++;
          if (p.stuck > 120) {
            this.respawnParticle(p, canvas.width, canvas.height);
          }
        } else {
          p.stuck = 0;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 153, 0, ${p.opacity})`;
      ctx.fill();
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}
