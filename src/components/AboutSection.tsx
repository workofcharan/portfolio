import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GraduationCap, Award, Shield, Code2, Terminal, CheckCircle2, MapPin } from 'lucide-react';
import { BlurRevealText } from './BlurRevealText';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      icon: Award,
      title: 'Smart India Hackathon 2026 Finalist',
      subtitle: 'Team Batman • FinTech & Explainable AI',
      desc: 'Engineered Explainable Credit Ledger: a dual-score fraud and creditworthiness engine ensuring zero black-box automated rejections for underserved applicants.',
    },
    {
      icon: GraduationCap,
      title: 'Loyola Academy Degree & PG College',
      subtitle: 'B.Sc Computer Science & Engineering (Semester V)',
      desc: 'Rigorous coursework in Advanced Java, Computer Networks, Software Engineering, Mobile App Development, Big Data Analytics, and Operations Research.',
    },
    {
      icon: Terminal,
      title: 'Cisco & TASK Certified in Python',
      subtitle: 'Python Essentials 1 • TASK Cisco Academy',
      desc: 'Mastered foundational and intermediate Python data structures, object-oriented design, and algorithmic problem-solving.',
    },
    {
      icon: Shield,
      title: 'Cyber Security Internship',
      subtitle: 'Embrizon Technologies',
      desc: 'Practiced defensive web security principles, OWASP Top 10 vulnerability remediation, and application integrity workflows.',
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-black overflow-hidden border-t border-white/10">
      
      {/* Subtle monochrome glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Pill */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-white/15 text-xs font-mono text-white mb-4"
          >
            <Code2 size={13} />
            <span>Developer Profile & Philosophy</span>
          </motion.div>

          <div className="flex justify-center">
            <BlurRevealText
              text="Engineering software that solves real problems."
              className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight justify-center text-center"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-zinc-400 font-sans"
          >
            I combine clean frontend aesthetics, explainable algorithms, and robust architectures to turn complex requirements into elegant, accessible software.
          </motion.p>
        </div>

        {/* Narrative & Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Personal Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6 text-zinc-300 leading-relaxed font-sans text-base"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/15 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src="/charan-portrait.jpg"
                  alt="Sri Charan"
                  className="w-14 h-14 rounded-2xl object-cover border border-white/40 shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    B.Sc Computer Science & Engineering • Loyola Academy
                  </p>
                </div>
              </div>

              <p>
                I am <span className="text-white font-semibold">{PERSONAL_INFO.displayName}</span>, a third-year Computer Science and Engineering student at <span className="text-white underline decoration-white/30 underline-offset-4 font-semibold">{PERSONAL_INFO.education}</span>.
              </p>
              <p>
                My passion lies at the intersection of high-performance web interfaces and explainable decision systems. Rather than viewing technology as isolated code, I approach software as an instrument for human empowerment — whether that is building an AI memory companion for cognitive health (<span className="text-white font-semibold">YAADRI</span>), crafting a cultural luxury celebration platform (<span className="text-white font-semibold">Sampradaya Events</span>), or eliminating black-box bias in credit approvals (<span className="text-white font-semibold">Explainable Credit Ledger</span>).
              </p>
              <p>
                My codebase is driven by rigor: strong TypeScript typing, maintainable component trees, accessible interaction design, and reliable cloud deployments.
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-white">
                  <MapPin size={13} className="text-white" />
                  Secunderabad / Hyderabad, India
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300">English • Telugu • Hindi</span>
                <span className="text-zinc-600">•</span>
                <span className="text-white font-bold">Open for 2026/2027 Roles</span>
              </div>
            </div>

            {/* Core Values / Approach Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/15">
                <div className="text-2xl font-bold font-display text-white mb-1">Zero Bias</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Transparent, explainable AI systems with human-in-the-loop oversight.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/15">
                <div className="text-2xl font-bold font-display text-white mb-1">Sub-1.5s</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Fast load times, smooth 60fps transitions, and optimized web assets.
                </p>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Verified Milestones & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-4"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-2">
              Verified Achievements & Credentials:
            </span>

            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-white/15 hover:border-white transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-white group-hover:text-black transition-all shrink-0">
                      <Icon size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold font-display text-white group-hover:text-zinc-200 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs font-mono text-zinc-300 font-semibold">
                        {item.subtitle}
                      </p>
                      <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

          </motion.div>

        </div>

      </div>
    </section>
  );
};
