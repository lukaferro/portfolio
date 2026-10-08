import { Component, ElementRef, NgZone, OnDestroy, afterNextRender, inject, viewChild } from '@angular/core';

interface Particle {
  /** Current position and velocity */
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Home position: slowly drifts across the screen and pulls the particle back (no permanent holes) */
  hx: number;
  hy: number;
  hvx: number;
  hvy: number;
  size: number;
  opacity: number;
  /** 0..1, how lit-up the particle is by the cursor (smoothed) */
  glow: number;
}

interface Pointer {
  x: number;
  y: number;
  active: boolean;
}

const COLOR = '255, 153, 0';

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
export class ParticlesComponent implements OnDestroy {
  readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private zone = inject(NgZone);

  private ctx: CanvasRenderingContext2D | null = null;
  private width = 0;
  private height = 0;
  private particles: Particle[] = [];
  /** Particles currently lit by the cursor, reused every frame to draw the links */
  private lit: Particle[] = [];
  private pointer: Pointer = { x: 0, y: 0, active: false };
  private animationId = 0;
  private running = false;

  // Viewport-dependent settings, resolved in the browser only (there is no window while pre-rendering)
  private reducedMotion = false;
  private isMobile = false;
  private count = 650;
  /** Radius in which particles light up and link together */
  private hoverRadius = 180;
  /** Smaller radius in which particles are gently pushed away */
  private repelRadius = 85;
  private repelForce = 0.7;
  private linkDistance = 85;
  private readonly spring = 0.012;
  private readonly damping = 0.88;
  private driftSpeed = 0.12;

  constructor() {
    afterNextRender(() => this.init());
  }

  private configure() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.count = 70;
      this.hoverRadius = 120;
      this.repelRadius = 60;
      this.repelForce = 0.5;
      this.linkDistance = 70;
      this.driftSpeed = 0.08;
    }
  }

  private init() {
    this.configure();
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
      document.addEventListener('pointermove', this.onPointerMove, { passive: true });
      document.addEventListener('pointerdown', this.onPointerDown, { passive: true });
      document.addEventListener('pointerup', this.onPointerUp, { passive: true });
      document.documentElement.addEventListener('pointerleave', this.onPointerLeave);
      document.addEventListener('visibilitychange', this.onVisibilityChange);
      window.addEventListener('resize', this.onResize);
      this.start();
    });
  }

  ngOnDestroy() {
    if (typeof document === 'undefined') return;
    this.stop();
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerdown', this.onPointerDown);
    document.removeEventListener('pointerup', this.onPointerUp);
    document.documentElement.removeEventListener('pointerleave', this.onPointerLeave);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('resize', this.onResizeStatic);
  }

  private onPointerMove = (e: PointerEvent) => {
    this.pointer.x = e.clientX;
    this.pointer.y = e.clientY;
    this.pointer.active = true;
  };

  /** Click / tap: a shockwave that pushes particles outwards; the springs bring them back. */
  private onPointerDown = (e: PointerEvent) => {
    this.pointer.x = e.clientX;
    this.pointer.y = e.clientY;
    this.pointer.active = true;
    const radius = this.isMobile ? 160 : 240;
    for (const p of this.particles) {
      const dx = p.x - e.clientX;
      const dy = p.y - e.clientY;
      const dist = Math.hypot(dx, dy);
      if (dist < radius && dist > 0.5) {
        const impulse = (1 - dist / radius) * 9;
        p.vx += (dx / dist) * impulse;
        p.vy += (dy / dist) * impulse;
        p.glow = 1;
      }
    }
  };

  /** On touch screens the finger lifts off: stop reacting where it was. */
  private onPointerUp = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') this.pointer.active = false;
  };

  private onPointerLeave = () => {
    this.pointer.active = false;
  };

  private onVisibilityChange = () => {
    if (document.hidden) {
      this.stop();
    } else {
      this.start();
    }
  };

  private onResize = () => {
    const oldW = this.width;
    const oldH = this.height;
    this.resize();
    // Keep the distribution even: scale home positions to the new viewport
    const sx = this.width / oldW;
    const sy = this.height / oldH;
    for (const p of this.particles) {
      p.hx *= sx;
      p.hy *= sy;
    }
  };

  private onResizeStatic = () => {
    this.resize();
    this.initParticles();
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
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;
  }

  private createParticle(x: number, y: number): Particle {
    const angle = Math.random() * Math.PI * 2;
    const speed = this.driftSpeed * (0.3 + Math.random() * 0.7);
    return {
      x,
      y,
      vx: 0,
      vy: 0,
      hx: x,
      hy: y,
      hvx: Math.cos(angle) * speed,
      hvy: Math.sin(angle) * speed,
      size: Math.random() * 1.8 + 0.8,
      opacity: Math.random() * 0.35 + 0.12,
      glow: 0,
    };
  }

  private initParticles() {
    const w = this.width;
    const h = this.height;
    // Jittered grid: an even starting distribution with no clumps or gaps
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
    const { width, height, pointer } = this;
    const margin = 20;
    this.lit.length = 0;

    for (const p of this.particles) {
      // Home drifts; wrapping teleports particle and home together, off-screen
      p.hx += p.hvx;
      p.hy += p.hvy;
      if (p.hx < -margin) { p.hx += width + margin * 2; p.x += width + margin * 2; }
      else if (p.hx > width + margin) { p.hx -= width + margin * 2; p.x -= width + margin * 2; }
      if (p.hy < -margin) { p.hy += height + margin * 2; p.y += height + margin * 2; }
      else if (p.hy > height + margin) { p.hy -= height + margin * 2; p.y -= height + margin * 2; }

      // Spring towards home
      let ax = (p.hx - p.x) * this.spring;
      let ay = (p.hy - p.y) * this.spring;

      let targetGlow = 0;
      if (pointer.active) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < this.hoverRadius) {
          targetGlow = 1 - dist / this.hoverRadius;
          if (dist < this.repelRadius && dist > 0.5) {
            const t = 1 - dist / this.repelRadius;
            const f = t * t * this.repelForce;
            ax += (dx / dist) * f;
            ay += (dy / dist) * f;
          }
        }
      }

      p.vx = (p.vx + ax) * this.damping;
      p.vy = (p.vy + ay) * this.damping;
      p.x += p.vx;
      p.y += p.vy;

      p.glow += (targetGlow - p.glow) * (targetGlow > p.glow ? 0.25 : 0.04);
      if (p.glow > 0.04) this.lit.push(p);
    }
  }

  private draw() {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    // Soft halo under the cursor
    if (this.pointer.active && !this.reducedMotion) {
      const { x, y } = this.pointer;
      const halo = ctx.createRadialGradient(x, y, 0, x, y, this.hoverRadius);
      halo.addColorStop(0, `rgba(${COLOR}, 0.07)`);
      halo.addColorStop(1, `rgba(${COLOR}, 0)`);
      ctx.fillStyle = halo;
      ctx.fillRect(x - this.hoverRadius, y - this.hoverRadius, this.hoverRadius * 2, this.hoverRadius * 2);
    }

    // Constellation: thin links between nearby lit particles
    const lit = this.lit;
    const maxDist = this.linkDistance;
    ctx.lineWidth = 0.7;
    for (let i = 0; i < lit.length; i++) {
      const a = lit[i];
      for (let j = i + 1; j < lit.length; j++) {
        const b = lit[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > maxDist * maxDist) continue;
        const alpha = (1 - Math.sqrt(d2) / maxDist) * Math.min(a.glow, b.glow) * 0.45;
        ctx.strokeStyle = `rgba(${COLOR}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // Particles: lit ones get brighter and slightly bigger
    ctx.fillStyle = `rgb(${COLOR})`;
    for (const p of this.particles) {
      ctx.globalAlpha = Math.min(1, p.opacity + p.glow * 0.6);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 + p.glow * 0.5), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}
