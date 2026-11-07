import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUp, ArrowRight, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO, DOORS, PROJECTS } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export interface FooterLink {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  colorFactor: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  active: boolean;
}

export const HalftoneWordmarkFooter: React.FC = () => {
  const { playClickSound } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const wordmark = "SRI CHARAN";
  const [dotGap, setDotGap] = useState(6);

  // Responsive dot gap
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => setDotGap(mq.matches ? 4 : 6);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const scrollToTop = () => {
    playClickSound(880);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (id: string) => {
    playClickSound(750);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Re-generate particles
  const buildParticles = useCallback(
    (width: number, height: number) => {
      if (width <= 0 || height <= 0) return;

      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);

      const targetWidth = width * 0.96;
      const targetHeight = height * 0.95;

      let minFont = 30;
      let maxFont = Math.floor(Math.max(width * 0.45, height * 1.5));
      let bestFont = minFont;

      const fontFamily = '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
      const fontWeight = 900;

      for (let i = 0; i < 14; i++) {
        const midFont = Math.floor((minFont + maxFont) / 2);
        offCtx.font = `${fontWeight} ${midFont}px ${fontFamily}`;
        const metrics = offCtx.measureText(wordmark);
        const approxCapHeight = midFont * 0.78;

        if (metrics.width <= targetWidth && approxCapHeight <= targetHeight) {
          bestFont = midFont;
          minFont = midFont + 1;
        } else {
          maxFont = midFont - 1;
        }
      }

      const fontSize = bestFont;
      offCtx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      const baselineY = height * 0.52;

      offCtx.fillStyle = "#FFFFFF";
      offCtx.fillText(wordmark, width / 2, baselineY);

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      const particles: Particle[] = [];
      const step = Math.max(3, dotGap);

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 25) {
            const normalized = alpha / 255;
            const baseRadius = Math.max(0.9, normalized * (step * 0.44));

            particles.push({
              originX: x,
              originY: y,
              x: x + (Math.random() - 0.5) * 1.5,
              y: y + (Math.random() - 0.5) * 1.5,
              vx: 0,
              vy: 0,
              baseRadius,
              colorFactor: 0,
            });
          }
        }
      }

      particlesRef.current = particles;
    },
    [wordmark, dotGap]
  );

  // Resize listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(rect.width);
      const displayHeight = Math.floor(rect.height);

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
        buildParticles(displayWidth, displayHeight);
      }
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);

    return () => ro.disconnect();
  }, [buildParticles]);

  // Main interactive physics render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;
    const radius = 95;

    // Pure black & white palette: ink is white, excitation is silver
    const r1 = 255, g1 = 255, b1 = 255;
    const r2 = 161, g2 = 161, b2 = 170; // zinc-400 silver

    const render = () => {
      if (!isRunning) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const shockwaves = shockwavesRef.current;

      // Update shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += sw.speed;
        if (sw.radius > sw.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // Update and draw particles
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // 1. Mouse repulsion physics
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radSq = radius * radius;

          if (distSq < radSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / radius) * 14;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.45;
            p.vy += Math.sin(angle) * force * 0.45;
            p.colorFactor = Math.min(1, p.colorFactor + (1 - dist / radius) * 0.7);
          }
        }

        // 2. Shockwave shock ripples
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const sdx = p.x - sw.x;
          const sdy = p.y - sw.y;
          const sdist = Math.hypot(sdx, sdy);
          const diff = Math.abs(sdist - sw.radius);

          if (diff < 30) {
            const waveForce = (1 - diff / 30) * 12;
            const sAngle = Math.atan2(sdy, sdx);
            p.vx += Math.cos(sAngle) * waveForce * 0.4;
            p.vy += Math.sin(sAngle) * waveForce * 0.4;
            p.colorFactor = Math.min(1, p.colorFactor + (1 - diff / 30));
          }
        }

        // 3. Spring physics back to origin
        const springX = (p.originX - p.x) * 0.085;
        const springY = (p.originY - p.y) * 0.085;
        p.vx = (p.vx + springX) * 0.84;
        p.vy = (p.vy + springY) * 0.84;
        p.x += p.vx;
        p.y += p.vy;

        // 4. Color decay back to ink
        p.colorFactor *= 0.94;

        // 5. Draw dot
        const t = Math.max(0, Math.min(1, p.colorFactor));
        const cr = Math.round(r1 + (r2 - r1) * t);
        const cg = Math.round(g1 + (g2 - g1) * t);
        const cb = Math.round(b1 + (b2 - b1) * t);

        ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
        ctx.beginPath();
        const currentRadius = p.baseRadius * (1 + t * 0.35);
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Pointer event listeners
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current = { x: -9999, y: -9999, active: false };
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    playClickSound(620);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    shockwavesRef.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 0,
      maxRadius: Math.max(rect.width, rect.height) * 0.85,
      speed: 16,
      active: true,
    });
  };

  return (
    <footer
      ref={containerRef}
      className="relative w-full overflow-hidden select-none bg-black text-white border-t border-white/10 pt-16 pb-8"
    >
      {/* Film Grain Texture Overlay matching FINCORE */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay z-20 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Main Container Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        
        {/* Top Studio & Navigation Area matching FINCORE */}
        <div className="space-y-10 mb-8">
          
          {/* Studio Header Line */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-zinc-400">
                STUDIO LINE • 2026
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white mt-1">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                Loyola Academy Degree & PG College • Computer Science & Engineering
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold font-mono tracking-wider transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
                aria-label="Back to top"
              >
                <span>BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4 Tracked Link Columns matching FINCORE footer architecture */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            
            {/* Column 1: Domains */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] font-mono text-zinc-400">
                DOMAINS
              </h4>
              <ul className="space-y-2 text-xs font-mono">
                {DOORS.map((d) => (
                  <li key={d.id}>
                    <button
                      onClick={() => handleNavClick('doors')}
                      className="text-left text-zinc-300 hover:text-white transition-colors"
                    >
                      {d.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Flagship Projects */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] font-mono text-zinc-400">
                FLAGSHIPS
              </h4>
              <ul className="space-y-2 text-xs font-mono">
                <li>
                  <a
                    href="https://credit-ledger-henna.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Credit Ledger (SIH '26)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://sampradayaevents.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Sampradaya Events</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://yaadri.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>YAADRI AI Memory</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://crave-plus.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Crave+ Discovery</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] font-mono text-zinc-400">
                NAVIGATION
              </h4>
              <ul className="space-y-2 text-xs font-mono">
                {['home', 'doors', 'projects', 'about', 'skills', 'story', 'contact'].map((id) => (
                  <li key={id}>
                    <button
                      onClick={() => handleNavClick(id)}
                      className="text-left text-zinc-300 hover:text-white capitalize transition-colors"
                    >
                      {id === 'doors' ? 'The Doors' : id === 'story' ? 'My Story' : id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] font-mono text-zinc-400">
                CONNECT
              </h4>
              <ul className="space-y-2 text-xs font-mono">
                <li>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-zinc-300 hover:text-white transition-colors truncate block"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </li>
                <li>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    github.com/workofcharan
                  </a>
                </li>
                <li>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    linkedin.com/in/workofcharan
                  </a>
                </li>
                <li className="text-zinc-400 flex items-center gap-1 pt-1">
                  <MapPin size={12} className="text-white" />
                  Secunderabad, India
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Lower Halftone Wordmark Canvas & Meta Bar matching FINCORE */}
        <div className="relative mt-6 pt-0 border-t border-white/10">
          
          {/* Halftone Canvas with Interactive Mouse Dispersal and Shockwave */}
          <div className="relative w-full h-44 sm:h-56 md:h-64 lg:h-72 xl:h-80 cursor-crosshair">
            <canvas
              ref={canvasRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onClick={handleClick}
              className="absolute inset-0 w-full h-full block"
            />
          </div>

          {/* Bottom Meta & Copyright Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400 gap-2 border-t border-white/10">
            <p>© 2026 REKAPALLI SRI CHARAN • ALL RIGHTS RESERVED</p>
            <p className="text-zinc-400 text-[11px]">
              Interactive Dot Physics • Hover to Disperse • Click for Shockwave
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
