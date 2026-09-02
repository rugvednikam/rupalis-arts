// Rupali's Arts - Optimized Festive Golden Sparkle & Petal Particles
// Battery-friendly with IntersectionObserver & High-DPI support

class FestiveParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.sparkles = [];
    this.animationFrameId = null;
    this.isVisible = true;

    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
    
    // Visibility optimization
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else if (this.isVisible) {
        this.start();
      }
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible) {
            this.start();
          } else {
            this.pause();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(this.canvas);
    }

    this.init();
    this.start();
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for mobile efficiency
    
    this.width = parent.offsetWidth;
    this.height = parent.offsetHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.init();
  }

  init() {
    this.particles = [];
    this.sparkles = [];

    const isMobile = this.width < 768;
    const sparkleCount = isMobile ? Math.floor(this.width / 55) : Math.floor(this.width / 35);
    const petalCount = isMobile ? 6 : 14;

    // Sparkles
    for (let i = 0; i < sparkleCount; i++) {
      this.sparkles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 1,
        color: ['#fbbf24', '#f59e0b', '#fde68a', '#ffffff'][Math.floor(Math.random() * 4)],
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }

    // Floating Petals
    for (let i = 0; i < petalCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radiusX: Math.random() * 5 + 3,
        radiusY: Math.random() * 4 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.35 + 0.15,
        color: ['rgba(245, 158, 11, 0.4)', 'rgba(251, 191, 36, 0.3)', 'rgba(239, 68, 68, 0.25)'][Math.floor(Math.random() * 3)]
      });
    }
  }

  start() {
    if (!this.animationFrameId) {
      this.animate();
    }
  }

  pause() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  animate() {
    if (!this.ctx || !this.isVisible) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Sparkles
    for (let s of this.sparkles) {
      s.opacity = (Math.sin(Date.now() * s.twinkleSpeed + s.twinkleOffset) + 1) / 2;
      s.y -= s.speed * 18;
      if (s.y < 0) s.y = this.height;

      this.ctx.save();
      this.ctx.fillStyle = s.color;
      this.ctx.globalAlpha = s.opacity * 0.75;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Floating Petals
    for (let p of this.particles) {
      p.x += p.vx + Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.25;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      if (p.y > this.height + 15) {
        p.y = -15;
        p.x = Math.random() * this.width;
      }
      if (p.x < -15) p.x = this.width + 15;
      if (p.x > this.width + 15) p.x = -15;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, p.radiusX, p.radiusY, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FestiveParticleSystem('heroCanvas');
});
