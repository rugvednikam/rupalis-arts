// Rupali's Arts - Festive Golden Sparkle & Petal Particles

class FestiveParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.sparkles = [];
    this.animationFrameId = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.init();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.height = this.canvas.height = this.canvas.parentElement.offsetHeight;
  }

  init() {
    this.particles = [];
    this.sparkles = [];

    // Sparkles
    const sparkleCount = Math.floor(this.width / 40);
    for (let i = 0; i < sparkleCount; i++) {
      this.sparkles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2.5 + 1,
        color: ['#fbbf24', '#f59e0b', '#fde68a', '#ffffff'][Math.floor(Math.random() * 4)],
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }

    // Floating Petals
    const petalCount = 12;
    for (let i = 0; i < petalCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radiusX: Math.random() * 6 + 4,
        radiusY: Math.random() * 4 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        vx: (Math.random() - 0.5) * 0.6,
        vy: Math.random() * 0.4 + 0.2,
        color: ['rgba(245, 158, 11, 0.45)', 'rgba(251, 191, 36, 0.35)', 'rgba(239, 68, 68, 0.3)'][Math.floor(Math.random() * 3)]
      });
    }
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw & Update Sparkles
    for (let s of this.sparkles) {
      s.opacity = (Math.sin(Date.now() * s.twinkleSpeed + s.twinkleOffset) + 1) / 2;
      s.y -= s.speed * 20;
      if (s.y < 0) s.y = this.height;

      this.ctx.save();
      this.ctx.fillStyle = s.color;
      this.ctx.globalAlpha = s.opacity * 0.8;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Soft glow
      this.ctx.shadowColor = '#fbbf24';
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.restore();
    }

    // Draw & Update Petals
    for (let p of this.particles) {
      p.x += p.vx + Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.3;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      if (p.y > this.height + 20) {
        p.y = -20;
        p.x = Math.random() * this.width;
      }
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;

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

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FestiveParticleSystem('heroCanvas');
});
