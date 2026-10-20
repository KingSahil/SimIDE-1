import { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for subtle technical network
    const particleCount = Math.min(Math.floor((width * height) / 38000), 45);
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = [];
    const colors = ['#168BFF', '#007ACC', '#8057E8', '#168BFF'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.25),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.25),
        radius: Math.random() * 1.5 + 1,
        alpha: Math.random() * 0.4 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Gentle mouse reaction
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(22, 139, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction: subtle brightening if close
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        let currentAlpha = p.alpha;
        if (distToMouse < 180) {
          currentAlpha = Math.min(0.8, p.alpha + (1 - distToMouse / 180) * 0.5);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render();
    } else {
      render();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: 'var(--bg-main)',
      }}
      aria-hidden="true"
    >
      {/* ── Continuous Galactic Ambient Lighting Across Full Page ── */}

      {/* Left Flank Upper — Electric Blue Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-12%',
          width: '850px',
          height: '850px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(7, 155, 255, 0.20) 0%, rgba(0, 122, 204, 0.08) 45%, transparent 75%)',
          filter: 'blur(95px)',
          animation: 'driftBlue 22s ease-in-out infinite alternate',
        }}
      />

      {/* Left Flank Lower — Deep Cyan/Electric Blue Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-8%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 139, 255, 0.16) 0%, rgba(0, 122, 204, 0.06) 45%, transparent 75%)',
          filter: 'blur(110px)',
          animation: 'driftBlue 28s ease-in-out infinite alternate reverse',
        }}
      />

      {/* Right Flank Upper — Violet & Purple Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '-12%',
          width: '850px',
          height: '850px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(128, 87, 232, 0.18) 0%, rgba(185, 154, 255, 0.06) 45%, transparent 75%)',
          filter: 'blur(100px)',
          animation: 'driftPurple 26s ease-in-out infinite alternate',
        }}
      />

      {/* Right Flank Lower — Subtle Lavender/Purple Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '780px',
          height: '780px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(128, 87, 232, 0.14) 0%, rgba(22, 139, 255, 0.05) 50%, transparent 75%)',
          filter: 'blur(115px)',
          animation: 'driftPurple 30s ease-in-out infinite alternate reverse',
        }}
      />

      {/* Subtle Technical Grid */}
      <div
        className="tech-grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 85%)',
        }}
      />

      {/* Network Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />

      <style>{`
        @keyframes driftBlue {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(45px, 30px) scale(1.06); }
          100% { transform: translate(-30px, 60px) scale(0.97); }
        }
        @keyframes driftPurple {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.05); }
          100% { transform: translate(30px, 45px) scale(0.98); }
        }
      `}</style>
    </div>
  );
};
