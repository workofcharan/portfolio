import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  id: string;
  command: string;
  result: React.ReactNode;
}

const COMMAND_LIST = [
  { cmd: 'help', desc: 'Display all available terminal commands' },
  { cmd: 'about', desc: 'Bio, education at Loyola Academy, and engineering focus' },
  { cmd: 'projects', desc: 'List all verified live projects and repositories' },
  { cmd: 'skills', desc: 'Inspect full-stack, AI/ML, and system tech stack' },
  { cmd: 'sih', desc: 'Smart India Hackathon 2026 details & Dual-Score architecture' },
  { cmd: 'certs', desc: 'Cisco Networking Academy & TASK Python certifications' },
  { cmd: 'contact', desc: 'Direct email, GitHub, and LinkedIn links' },
  { cmd: 'clear', desc: 'Clear the terminal output screen' },
  { cmd: 'matrix', desc: 'Toggle cyber monochrome/matrix highlight mode' },
  { cmd: 'exit', desc: 'Close this interactive terminal modal' },
];

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMatrix, setIsMatrix] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      id: 'welcome',
      command: 'welcome',
      result: (
        <div className="space-y-2 text-xs sm:text-sm font-mono">
          <div className="text-zinc-400">
            Welcome to the interactive engineering terminal for{' '}
            <span className="text-white font-bold">{PERSONAL_INFO.name}</span>.
          </div>
          <div className="text-zinc-400">
            [Loyola Academy '26 • SIH 2026 Finalist • Cisco & TASK Python Certified]
          </div>
          <div className="text-zinc-500 pt-1">
            Type <span className="text-white font-bold underline">help</span> to list available commands. Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">ESC</kbd> or type <span className="text-white font-bold">exit</span> to close.
          </div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputs]);

  // Global ESC key listener to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let resultNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        resultNode = (
          <div className="space-y-1.5 font-mono text-xs sm:text-sm">
            <div className="text-zinc-400 mb-2 font-bold">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-1 sm:gap-x-4">
              {COMMAND_LIST.map((item) => (
                <React.Fragment key={item.cmd}>
                  <div className="sm:col-span-3 text-white font-bold">
                    $ {item.cmd}
                  </div>
                  <div className="sm:col-span-9 text-zinc-400">
                    {item.desc}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        );
        break;

      case 'about':
        resultNode = (
          <div className="space-y-2 font-mono text-xs sm:text-sm text-zinc-300">
            <p className="text-white font-bold">{PERSONAL_INFO.name}</p>
            <p className="text-zinc-400">{PERSONAL_INFO.tagline}</p>
            <div className="p-3 rounded-lg bg-zinc-900 border border-white/10 space-y-1">
              <div><span className="text-zinc-500">College:</span> {PERSONAL_INFO.education}</div>
              <div><span className="text-zinc-500">Degree:</span> {PERSONAL_INFO.degree}</div>
              <div><span className="text-zinc-500">Location:</span> {PERSONAL_INFO.location}</div>
              <div><span className="text-zinc-500">Hackathon:</span> Smart India Hackathon 2026 Finalist (Team Batman)</div>
            </div>
            <p className="text-zinc-400 leading-relaxed">{PERSONAL_INFO.bio}</p>
          </div>
        );
        break;

      case 'projects':
        resultNode = (
          <div className="space-y-3 font-mono text-xs sm:text-sm">
            <div className="text-white font-bold mb-1">VERIFIED PRODUCTION PROJECTS & DEPLOYMENTS:</div>
            {PROJECTS.map((p, idx) => (
              <div key={p.id} className="p-2.5 rounded-lg bg-zinc-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-white font-bold flex items-center gap-2">
                    <span>{idx + 1}. {p.title}</span>
                    {p.stats && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-normal">
                        {p.stats.value}
                      </span>
                    )}
                  </div>
                  <div className="text-zinc-400 text-xs mt-0.5">{p.subtitle}</div>
                  <div className="text-[11px] text-zinc-500 mt-1">Tech: {p.techStack.join(', ')}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded bg-zinc-800 text-white text-xs hover:bg-zinc-700 transition-colors"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        resultNode = (
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            <div className="text-white font-bold mb-1">CORE TECHNICAL MATRIX:</div>
            <div className="space-y-1.5">
              <div><span className="text-zinc-500">Frontend:</span> <span className="text-zinc-200">React (18/19), Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, HTML5/CSS3</span></div>
              <div><span className="text-zinc-500">Backend & APIs:</span> <span className="text-zinc-200">Python (FastAPI, Flask), Node.js, Express, RESTful APIs, Web Speech API</span></div>
              <div><span className="text-zinc-500">Data & Storage:</span> <span className="text-zinc-200">PostgreSQL, Prisma ORM, LocalStorage graph caches, Supabase</span></div>
              <div><span className="text-zinc-500">AI & Explainability:</span> <span className="text-zinc-200">Dual-Score Scoring Models, Scikit-Learn, Feature Attribution, Living Memory Graphs</span></div>
              <div><span className="text-zinc-500">DevOps & Tooling:</span> <span className="text-zinc-200">Git/GitHub, Vercel, Vite, Linux Shell, Postman, Vitest</span></div>
            </div>
          </div>
        );
        break;

      case 'sih':
        resultNode = (
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            <div className="text-white font-bold flex items-center gap-2">
              <Sparkles size={14} className="text-white" />
              SMART INDIA HACKATHON 2026 — TEAM BATMAN (FINALIST)
            </div>
            <div className="p-3 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 space-y-2 leading-relaxed">
              <p>
                <strong className="text-white">Project:</strong> Explainable Credit Ledger (AI-Powered Fraud Detection & Explainable Dual-Score Engine).
              </p>
              <p>
                <strong className="text-white">The Problem:</strong> Automated loan scoring models act as black boxes, rejecting unbanked applicants without giving transparent reasons or recourse.
              </p>
              <p>
                <strong className="text-white">Our Solution:</strong> We architected a Dual-Score model that cleanly isolates statistical creditworthiness from fraud probability. Verified clean applications are auto-approved; flagged or thin-file cases surface factor-by-factor weightings to human credit officers.
              </p>
              <div className="pt-1">
                <a
                  href="https://credit-ledger-henna.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 rounded bg-white text-black font-bold text-xs"
                >
                  Inspect Live SIH Deployment ↗
                </a>
              </div>
            </div>
          </div>
        );
        break;

      case 'certs':
        resultNode = (
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            <div className="text-white font-bold">VERIFIED CERTIFICATIONS:</div>
            <div className="p-3 rounded-lg bg-zinc-900 border border-white/10 space-y-1.5 text-zinc-300">
              <div className="text-white font-bold">Python Essentials 1</div>
              <div className="text-zinc-400 text-xs">Cisco Networking Academy & TASK (Telangana Academy for Skill and Knowledge)</div>
              <div className="text-[11px] text-zinc-500">Credential ID: 6d2d7764-f14b-4576-b113-9e24f54d545a</div>
              <div className="text-xs text-zinc-400">Covers algorithmic problem solving, data structures, OOP principles, and clean Pythonic architecture.</div>
            </div>
          </div>
        );
        break;

      case 'contact':
        resultNode = (
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            <div className="text-white font-bold">GET IN TOUCH:</div>
            <div className="space-y-1 text-zinc-300">
              <div>Email: <a href="mailto:workofcharan@gmail.com" className="text-white underline">workofcharan@gmail.com</a></div>
              <div>GitHub: <a href="https://github.com/workofcharan" target="_blank" rel="noopener noreferrer" className="text-white underline">github.com/workofcharan</a></div>
              <div>LinkedIn: <a href="https://linkedin.com/in/workofcharan" target="_blank" rel="noopener noreferrer" className="text-white underline">linkedin.com/in/workofcharan</a></div>
              <div>Location: Secunderabad / Hyderabad, India</div>
            </div>
          </div>
        );
        break;

      case 'clear':
        setOutputs([]);
        setInput('');
        return;

      case 'matrix':
        setIsMatrix((prev) => !prev);
        resultNode = (
          <div className="font-mono text-xs sm:text-sm text-green-400">
            Matrix mode {isMatrix ? 'disabled (returned to luxury monochrome)' : 'enabled (wake up, Neo...)'}.
          </div>
        );
        break;

      case 'exit':
        onClose();
        return;

      case 'sudo':
        resultNode = (
          <div className="font-mono text-xs sm:text-sm text-zinc-400">
            Permission granted: Sri Charan is registered as root administrator.
          </div>
        );
        break;

      case 'echo':
        resultNode = (
          <div className="font-mono text-xs sm:text-sm text-zinc-300">
            {args}
          </div>
        );
        break;

      default:
        resultNode = (
          <div className="font-mono text-xs sm:text-sm text-zinc-400">
            Command not found: <span className="text-white font-bold">{rawCmd}</span>. Type <span className="text-white font-bold underline">help</span> to view available commands.
          </div>
        );
        break;
    }

    setOutputs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        command: rawCmd,
        result: resultNode,
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length > 0 && historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(nextIdx);
          setInput(history[nextIdx]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (current) {
        const match = COMMAND_LIST.find((c) => c.cmd.startsWith(current));
        if (match) {
          setInput(match.cmd);
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
          
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${
              isMaximized ? 'h-[92vh] max-w-6xl' : 'max-h-[82vh] h-[650px] max-w-3xl'
            } rounded-2xl overflow-hidden border ${
              isMatrix ? 'border-green-500/40 shadow-[0_0_50px_rgba(34,197,94,0.15)] bg-black' : 'border-white/20 shadow-[0_20px_70px_rgba(0,0,0,0.95)] bg-zinc-950'
            } flex flex-col z-10 transition-all duration-300`}
          >
            
            {/* macOS Chrome Header Bar */}
            <div className="h-11 px-4 bg-zinc-900 border-b border-white/10 flex items-center justify-between select-none shrink-0">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500/90 hover:bg-red-600 transition-colors"
                  title="Close Terminal (ESC)"
                />
                <button
                  type="button"
                  onClick={() => setIsMaximized((prev) => !prev)}
                  className="w-3 h-3 rounded-full bg-yellow-500/90 hover:bg-yellow-600 transition-colors"
                  title="Toggle Size"
                />
                <button
                  type="button"
                  onClick={() => setIsMatrix((prev) => !prev)}
                  className="w-3 h-3 rounded-full bg-green-500/90 hover:bg-green-600 transition-colors"
                  title="Toggle Matrix Theme"
                />
              </div>

              {/* Title */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <TerminalIcon size={13} className="text-zinc-400" />
                <span>sricharan@portfolio:~ (zsh)</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 text-zinc-400">
                <button
                  type="button"
                  onClick={() => setIsMaximized((prev) => !prev)}
                  className="p-1 hover:text-white transition-colors"
                  title="Maximize / Minimize"
                >
                  {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 hover:text-white transition-colors"
                  title="Close"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Terminal Body with Scroll */}
            <div
              onClick={() => inputRef.current?.focus()}
              className={`flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm space-y-4 cursor-text ${
                isMatrix ? 'text-green-400 selection:bg-green-500 selection:text-black' : 'text-zinc-200 selection:bg-white selection:text-black'
              }`}
            >
              {/* Output log */}
              {outputs.map((out) => (
                <div key={out.id} className="space-y-1.5">
                  {out.command !== 'welcome' && (
                    <div className="flex items-center gap-2 text-zinc-500">
                      <span className="text-zinc-400">sricharan@portfolio:~$</span>
                      <span className="text-white font-bold">{out.command}</span>
                    </div>
                  )}
                  <div className="pl-0 sm:pl-2">{out.result}</div>
                </div>
              ))}

              {/* Live Input Line */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-zinc-400 font-bold shrink-0">sricharan@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 bg-transparent outline-none border-none p-0 font-mono text-xs sm:text-sm ${
                    isMatrix ? 'text-green-400 caret-green-400' : 'text-white caret-white'
                  }`}
                  placeholder="Type 'help'..."
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => handleCommand(input)}
                  className="p-1 text-zinc-500 hover:text-white transition-colors sm:hidden"
                >
                  <CornerDownLeft size={14} />
                </button>
              </div>

              <div ref={bottomRef} />
            </div>

            {/* Bottom Terminal Status Bar */}
            <div className="h-8 px-4 bg-zinc-900/90 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500 select-none shrink-0">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
                <span className="hidden sm:inline">UTF-8</span>
                <span className="hidden sm:inline">zsh 5.9</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">Tab to complete</span>
                <span>Type 'exit' to close</span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
