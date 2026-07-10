'use client';
import { useEffect, useRef } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { Container, Button } from '@/components/ui';

function PathCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width: number;
    let height: number;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      label: string;
      opacity: number;
      pulsePhase: number;
    }

    const labels = ['Science', 'Arts', 'Commercial', 'JAMB', 'UTME', 'Medicine', 'Engineering', 'Law', 'Pharmacy', 'WAEC', 'NYSC', "O'Level", 'B.Sc', 'JSS3', 'SSS1', 'Botany', 'Physics', 'Chemistry', 'Biology', 'Maths', 'English', 'NECO', 'Accounting'];

    let nodes: Node[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      resize();
      const count = Math.floor((width * height) / 25000);
      nodes = Array.from({ length: Math.min(count, 20) }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        radius: 3 + Math.random() * 3,
        label: labels[i % labels.length],
        opacity: 0.15 + Math.random() * 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    };

    const connectionDistance = 180;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce softly at edges
        if (node.x < -40) node.vx = Math.abs(node.vx);
        if (node.x > width + 40) node.vx = -Math.abs(node.vx);
        if (node.y < -40) node.vy = Math.abs(node.vy);
        if (node.y > height + 40) node.vy = -Math.abs(node.vy);
      }

      // Draw connections (paths between nodes)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.08;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(43, 110, 54, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * 0.001 + node.pulsePhase) * 0.5 + 0.5;
        const currentOpacity = node.opacity * (0.7 + pulse * 0.3);

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(43, 110, 54, ${currentOpacity * 0.08})`;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(43, 110, 54, ${currentOpacity * 0.5})`;
        ctx.fill();

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(43, 110, 54, ${currentOpacity})`;
        ctx.fill();

        // Label
        ctx.font = '500 10px var(--font-sans, system-ui)';
        ctx.fillStyle = `rgba(43, 110, 54, ${currentOpacity * 0.7})`;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - node.radius - 6);
      }

      animationId = requestAnimationFrame(draw);
    };

    init();
    animationId = requestAnimationFrame(draw);

    const onResize = () => {
      init();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ opacity: 0.6 }} />;
}

function FloatingStep({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div className={`shadow-brand-950/4 ring-brand-950/5 absolute rounded-xl bg-white/90 px-3 py-2 shadow-lg ring-1 backdrop-blur-sm ${className}`}>
      <p className="text-brand-600 text-[10px] font-semibold tracking-wider uppercase">{label}</p>
      <p className="text-text-primary text-xs font-bold">{value}</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-[max(600px,30vh)] items-center overflow-hidden">
      {/* Animated canvas background */}
      <div className="absolute inset-0">
        <PathCanvas />
        {/* Fade edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-surface)_75%)]" />
        <div className="from-(--color-surface)] absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t to-transparent" />
        <div className="from-(--color-surface)] absolute top-0 right-0 left-0 h-20 bg-linear-to-b to-transparent" />
      </div>

      {/* Floating cards — positioned like moving bus stops on a map */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <FloatingStep label="Stream" value="Science ✓" className="top-[18%] left-[8%] animate-[float-1_6s_ease-in-out_infinite]" />
        <FloatingStep label="UTME" value="PHY, CHM, BIO, ENG" className="top-[12%] right-[12%] animate-[float-2_7s_ease-in-out_infinite]" />
        <FloatingStep label="Course" value="Pharmacy" className="bottom-[28%] left-[6%] animate-[float-3_8s_ease-in-out_infinite]" />
        <FloatingStep label="Career" value="Pharmacist 🎯" className="right-[8%] bottom-[22%] animate-[float-2_6.5s_ease-in-out_infinite]" />
        <FloatingStep label="O'Level" value="5 credits (1 sitting)" className="top-[45%] right-[4%] animate-[float-1_7.5s_ease-in-out_infinite]" />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          {/* Status pill */}
          <div className="animate-fade-in shadow-brand-950/4 ring-brand-950/5 mb-8 inline-flex items-center gap-2.5 rounded-full bg-white/80 px-4 py-2 shadow-sm ring-1 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="bg-brand-500 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-brand-600 relative inline-flex h-2 w-2 rounded-full" />
            </span>
            <span className="text-text-secondary text-[13px] font-medium">Live paths for Nigerian students — JSS3 to post-NYSC</span>
          </div>

          <h1 className="animate-fade-in-up text-text-primary text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            Your career is a{' '}
            <span className="relative inline-block">
              <span className="text-brand-600 relative z-10">map</span>
              <svg className="absolute -bottom-1 left-0 z-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none">
                <path d="M2 8 Q25 2 50 7 Q75 12 98 4" stroke="var(--color-brand-300)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              </svg>
            </span>
            , not a guess.
          </h1>

          <p className="animate-fade-in-up text-text-secondary mx-auto mt-6 max-w-lg text-base leading-relaxed [animation-delay:100ms] sm:text-lg">
            Tell us where you want to end up. We&apos;ll trace every JAMB subject, O&apos;Level requirement, and stream choice back to the decision you need to make <strong className="text-text-primary font-semibold">right now</strong>.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up mt-10 flex flex-col items-center gap-3 [animation-delay:200ms] sm:flex-row sm:justify-center">
            <Button href="/quiz" size="lg" icon={<Compass className="h-5 w-5" />} className="w-full sm:w-auto">
              Find my stream
            </Button>
            <Button href="/careers" variant="secondary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />} className="w-full sm:w-auto">
              Explore all careers
            </Button>
          </div>

          {/* Trust line */}
          <div className="animate-fade-in text-text-tertiary mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] [animation-delay:400ms]">
            <span className="flex items-center gap-1">
              <span className="text-brand-500">✓</span> No sign-up
            </span>
            <span className="flex items-center gap-1">
              <span className="text-brand-500">✓</span> 100% free
            </span>
            <span className="flex items-center gap-1">
              <span className="text-brand-500">✓</span> 3 minutes
            </span>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(6px, -10px) rotate(0.5deg); }
          50% { transform: translate(-4px, -18px) rotate(-0.5deg); }
          75% { transform: translate(8px, -8px) rotate(0.3deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-8px, -12px) rotate(-0.5deg); }
          50% { transform: translate(6px, -20px) rotate(0.5deg); }
          75% { transform: translate(-4px, -6px) rotate(-0.3deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -14px) rotate(0.4deg); }
          66% { transform: translate(-6px, -8px) rotate(-0.4deg); }
        }
      `}</style>
    </section>
  );
}
