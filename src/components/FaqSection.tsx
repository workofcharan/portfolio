import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, HelpCircle, Terminal, Mail, Sparkles } from 'lucide-react';
import { BlurRevealText } from './BlurRevealText';
import { useTheme } from '../context/ThemeContext';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  highlight?: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'roles',
    question: 'What kind of engineering roles and opportunities are you looking for?',
    answer:
      "I am seeking Full-Stack Developer, Frontend Engineer, and Software Engineering roles or high-impact internships. I specialize in building production React and Next.js applications, high-performance TypeScript codebases, and explainable AI/ML integration pipelines. I enjoy solving complex systems challenges from interactive UI layer down to data APIs.",
    highlight: 'Full-Stack Developer • Frontend Engineer • Software Engineering Roles',
    category: 'OPPORTUNITIES',
  },
  {
    id: 'sih',
    question: 'What was your role in Smart India Hackathon 2026 with Team Batman?',
    answer:
      "As a Finalist in SIH 2026, I engineered the core architecture of 'Explainable Credit Ledger'. We solved algorithmic credit bias by designing a Dual-Score model that cleanly separates fraud risk from statistical creditworthiness. Instead of letting black-box algorithms automatically reject thin-file applicants, our system auto-approves verified clean applications and presents transparent factor breakdown dashboards to human credit officers.",
    highlight: 'Dual-Score Architecture • Zero Black-Box Rejections • SIH 2026 Finalist',
    category: 'HACKATHONS',
  },
  {
    id: 'stack',
    question: 'What is your day-to-day core technology stack?',
    answer:
      "My primary tools include React (18/19), Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion for modern frontend interfaces. On the backend and systems side, I work with Python (FastAPI, Flask, Scikit-Learn), Node.js, and PostgreSQL. I hold formal Python certification from Cisco Networking Academy & TASK.",
    highlight: 'TypeScript • React • Next.js • Python • PostgreSQL • Tailwind CSS',
    category: 'TECH STACK',
  },
  {
    id: 'production',
    question: 'Have you built and shipped software for real commercial clients?',
    answer:
      "Yes. I architected and launched the production digital flagship for Sampradaya Events (Hyderabad's premier luxury wedding firm with over 31K+ followers), featuring Lenis smooth scrolling, Vedic aesthetics, and dynamic booking pipelines. I also built FINCORE Financial Consultancy and Crave+ (trilingual audio-guided food discovery with 1-click Swiggy/Zomato dispatch).",
    highlight: 'Sampradaya Events (31K+ Audience) • Crave+ • FINCORE Consultancy',
    category: 'PRODUCTION WORK',
  },
  {
    id: 'remote',
    question: 'Where are you based, and are you open to remote or hybrid collaboration?',
    answer:
      "I am based in Hyderabad / Secunderabad, India (studying B.Sc Computer Science & Engineering at Loyola Academy). I am fully equipped for remote, hybrid, or on-site engineering roles, and I thrive in asynchronous, git-disciplined, PR-driven engineering cultures across time zones.",
    highlight: 'Hyderabad / Secunderabad • Remote & Hybrid Friendly',
    category: 'COLLABORATION',
  },
  {
    id: 'reach',
    question: 'How quickly can we get in touch or schedule a technical chat?',
    answer:
      "You can reach out directly via workofcharan@gmail.com, connect with me on LinkedIn (linkedin.com/in/workofcharan), or check out my repositories on GitHub (github.com/workofcharan). I usually reply within a few hours on business days.",
    highlight: 'workofcharan@gmail.com • Same-Day Response',
    category: 'CONTACT',
  },
];

export const FaqSection: React.FC = () => {
  const { playClickSound } = useTheme();
  const [openId, setOpenId] = useState<string | null>('roles');

  const toggleItem = (id: string) => {
    playClickSound(openId === id ? 500 : 750);
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-28 bg-black text-white overflow-hidden border-t border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Revanth-inspired Blur Reveal Typography */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/15 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
            <HelpCircle size={13} className="text-white" />
            <span>Curated Knowledge</span>
          </div>

          <div className="flex justify-center">
            <BlurRevealText
              text="Things people often ask"
              className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white"
            />
          </div>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans max-w-xl mx-auto">
            Everything you need to know about my engineering capabilities, SIH 2026 hackathon architecture, production work, and hiring availability.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-zinc-950 border-white/30 shadow-[0_10px_30px_rgba(255,255,255,0.05)]'
                    : 'bg-black/60 border-white/10 hover:border-white/20 hover:bg-zinc-950/60'
                }`}
              >
                {/* Question Trigger Bar */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between gap-4 text-left select-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-white transition-colors shrink-0">
                      0{index + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-display text-zinc-100 group-hover:text-white transition-colors leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  {/* Plus Icon that rotates into × */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-white text-black border-white rotate-45'
                        : 'bg-zinc-900 text-zinc-400 border-white/10 group-hover:border-white/40 group-hover:text-white'
                    }`}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </div>
                </button>

                {/* Animated Disclosure Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed border-t border-white/5 space-y-3">
                        <p>{item.answer}</p>
                        
                        {item.highlight && (
                          <div className="pt-2 flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                              <Sparkles size={11} className="text-white" />
                              Key takeaway:
                            </span>
                            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/20">
                              {item.highlight}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Quick action helper below FAQ */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-950 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <Terminal size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white font-display">Have a more specific technical question?</p>
              <p className="text-xs text-zinc-400">Launch the interactive developer terminal or ping me directly.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:workofcharan@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
            >
              <Mail size={13} />
              <span>Email Sri Charan</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

