import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ArrowUpRight,
  GraduationCap,
  Award,
  Trophy,
  Terminal,
  Search,
  CheckCircle2,
  Compass,
  Rocket,
  Shield,
  Mail,
  MapPin,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { GithubIcon, LinkedinIcon } from './Icons';

export const EngineeringProcess: React.FC = () => {
  const { playClickSound } = useTheme();

  const handleScrollTo = (id: string) => {
    playClickSound(850);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const capabilities = [
    {
      icon: Code2,
      num: '01',
      title: 'FULL-STACK WEB',
      desc: 'High-performance React 19 and Next.js App Router architectures, TypeScript type safety, and responsive design systems.',
    },
    {
      icon: Cpu,
      num: '02',
      title: 'EXPLAINABLE AI',
      desc: 'Dual-Score credit models, transparent scoring weights, and ethical decisioning that eliminates black-box rejections.',
    },
    {
      icon: Sparkles,
      num: '03',
      title: 'COGNITIVE SYSTEMS',
      desc: 'Living Memory Graphs (YAADRI), local client state graphs, and private assistive systems running with zero paid cloud dependency.',
    },
    {
      icon: Layers,
      num: '04',
      title: 'BACKEND & DATA',
      desc: 'Python (FastAPI, Flask), Node.js, PostgreSQL, RESTful data contracts, and Web Speech API integrations.',
    },
  ];

  const tools = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Python', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'Framer Motion', category: 'Animation' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'Vercel', category: 'Cloud' },
    { name: 'Git & GitHub', category: 'DevOps' },
    { name: 'Vite', category: 'Tooling' },
  ];

  const processSteps = [
    {
      num: '01',
      title: 'DISCOVER',
      desc: 'Understanding problem constraints, user needs, and systems architecture.',
      icon: Search,
    },
    {
      num: '02',
      title: 'ARCHITECT',
      desc: 'Designing data schemas, dual-score logic, and interface contracts.',
      icon: Compass,
    },
    {
      num: '03',
      title: 'DEVELOP',
      desc: 'Writing clean, typed, modular code with accessible component hierarchies.',
      icon: Code2,
    },
    {
      num: '04',
      title: 'VERIFY',
      desc: 'Adversarial testing, edge case inspection, and performance profiling.',
      icon: CheckCircle2,
    },
    {
      num: '05',
      title: 'DELIVER',
      desc: 'Edge deployment on Vercel, monitoring telemetry, and ongoing refinement.',
      icon: Rocket,
    },
  ];

  return (
    <section className="relative py-24 bg-black text-white border-t border-white/10 select-none overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Row 1: Core Capabilities (Left) & Tools / Certifications (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Core Capabilities */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="font-condensed text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                CORE CAPABILITIES
              </h2>
              <span className="text-xs font-mono text-zinc-500">04 DOMAINS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.num}
                    className="p-5 rounded-2xl bg-zinc-950 border border-white/10 hover:border-white/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                        <Icon size={16} />
                      </div>
                      <span className="text-xs font-mono text-zinc-500 font-bold">{cap.num}</span>
                    </div>
                    <h3 className="font-condensed text-xl font-bold text-white tracking-wide uppercase mb-1.5">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Tools & Technologies + Certifications */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="font-condensed text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                TOOLS & TECHNOLOGIES
              </h2>
              <span className="text-xs font-mono text-zinc-500">VERIFIED STACK</span>
            </div>

            {/* Tools Grid matching reference */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tools.map((t) => (
                  <div
                    key={t.name}
                    className="p-3 rounded-xl bg-black border border-white/10 hover:border-white/30 transition-colors flex items-center justify-between"
                  >
                    <span className="text-xs sm:text-sm font-display font-bold text-white">
                      {t.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {t.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Box matching reference */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                CERTIFICATIONS & ACADEMIC RECOGNITION
              </span>
              
              <div className="space-y-3">
                {/* Certification 1 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-black border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Trophy size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white font-display">
                      Smart India Hackathon 2026 — Team Batman (Finalist)
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      National Hackathon • Explainable Credit Ledger FinTech AI
                    </div>
                  </div>
                </div>

                {/* Certification 2 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-black border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Shield size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white font-display">
                      Python Essentials 1 — Cisco Networking Academy & TASK
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      Credential ID: 6d2d7764-f14b-4576-b113-9e24f54d545a
                    </div>
                  </div>
                </div>

                {/* Certification 3 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-black border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <GraduationCap size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white font-display">
                      Loyola Academy Degree & PG College, Secunderabad
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      B.Sc Computer Science & Engineering (Semester V / 3rd Year)
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Row 2: My Engineering Process matching reference image MY DESIGN PROCESS */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between pb-2">
            <h2 className="font-condensed text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              MY ENGINEERING PROCESS
            </h2>
            <span className="text-xs font-mono text-zinc-500">05 SYSTEMIC PHASES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-5 rounded-2xl bg-zinc-950 border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-white transition-colors">
                        {step.num}
                      </span>
                      <Icon size={15} className="text-zinc-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-condensed text-xl font-bold text-white tracking-wide uppercase mb-2">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-2">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 3: Call to Action Banner matching reference: LET'S CREATE SOMETHING EXTRAORDINARY */}
        <div className="rounded-3xl bg-zinc-950 border border-white/15 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle specular sheen */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[130px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Headline in Monumental Condensed Font */}
            <div className="lg:col-span-7 space-y-1">
              <h2 className="font-condensed text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.92]">
                LET'S CREATE
              </h2>
              <h2 className="font-condensed text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.92]">
                SOMETHING
              </h2>
              <h2 className="font-condensed text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.92] flex items-center gap-3">
                <span>EXTRAORDINARY</span>
                <span className="text-3xl sm:text-5xl font-serif">✦</span>
              </h2>

              <p className="pt-4 text-xs sm:text-sm font-sans text-zinc-400 max-w-md">
                I am currently open to software engineering roles, high-impact internships, and selective client projects.
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleScrollTo('contact')}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-xl hover:scale-105 duration-200"
                >
                  <span>LET'S WORK TOGETHER</span>
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Contact Info matching reference */}
            <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-white/10 lg:pl-10">
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group p-2 rounded-lg hover:bg-white/5"
                >
                  <Mail size={15} className="text-zinc-500 group-hover:text-white" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>

                <div className="flex items-center gap-3 text-zinc-400 p-2">
                  <MapPin size={15} className="text-zinc-500" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group p-2 rounded-lg hover:bg-white/5"
                >
                  <GithubIcon size={15} className="text-zinc-500 group-hover:text-white" />
                  <span>github.com/workofcharan</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group p-2 rounded-lg hover:bg-white/5"
                >
                  <LinkedinIcon size={15} className="text-zinc-500 group-hover:text-white" />
                  <span>linkedin.com/in/workofcharan</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
