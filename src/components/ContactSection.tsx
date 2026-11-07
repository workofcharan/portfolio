import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Copy, Check, Send, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { BlurRevealText } from './BlurRevealText';

export const ContactSection: React.FC = () => {
  const { playClickSound } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    playClickSound(880);
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ffffff', '#e4e4e7', '#a1a1aa'],
    });

    setTimeout(() => {
      setCopiedEmail(false);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playClickSound(950);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#d4d4d8', '#71717a'],
      });

      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section id="contact" className="relative py-28 bg-black border-t border-white/10 overflow-hidden">
      
      {/* Glow effects - Pure subtle white */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-white/15 text-xs font-mono text-white mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="w-2 h-2 rounded-full bg-white -ml-3.5" />
            <span>AVAILABLE FOR NEW WORK & ROLES</span>
          </motion.div>

          <div className="flex justify-center">
            <BlurRevealText
              text="Got a project? Let's build it together."
              className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight leading-tight justify-center text-center"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-zinc-400 font-sans max-w-2xl mx-auto"
          >
            I'm taking on new software engineering roles, internships, and high-impact applications. Tell me what you're building and I'll get back to you within a day.
          </motion.p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct channels & Quick Copy */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Verified Email Card with 1-click copy */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-white/15 shadow-xl space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                Direct Email:
              </span>
              
              <div className="flex items-center justify-between p-3 rounded-2xl bg-black border border-white/10">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail size={16} className="text-white shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-zinc-200 truncate">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white transition-colors shrink-0 ml-2"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check size={16} className="text-white" /> : <Copy size={16} />}
                </button>
              </div>

              {copiedEmail && (
                <p className="text-[11px] font-mono text-white flex items-center gap-1.5 pt-1">
                  <Check size={12} />
                  Copied to clipboard! Ready to paste.
                </p>
              )}
            </div>

            {/* Social Links Cards */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-white/15 shadow-xl space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                Verified Social Profiles:
              </span>

              <div className="space-y-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-black border border-white/10 hover:border-white text-zinc-200 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon size={18} className="text-zinc-400 group-hover:text-white" />
                    <span className="text-xs sm:text-sm font-mono font-medium">github.com/workofcharan</span>
                  </div>
                  <ArrowRight size={14} className="text-zinc-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-black border border-white/10 hover:border-white text-zinc-200 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon size={18} className="text-zinc-400 group-hover:text-white" />
                    <span className="text-xs sm:text-sm font-mono font-medium">linkedin.com/in/workofcharan</span>
                  </div>
                  <ArrowRight size={14} className="text-zinc-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </a>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <MapPin size={14} className="text-white" />
                <span>Loyola Academy • Secunderabad, Telangana</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-zinc-950 border border-white/15 shadow-2xl backdrop-blur-xl">
              
              <h3 className="text-xl font-bold font-display text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-zinc-400 mb-6 font-sans">
                Fill out the details below and I'll respond directly to your email address.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-zinc-900 border border-white/20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white font-display">
                    Thank You, {formData.name}!
                  </h4>
                  <p className="text-xs text-zinc-300">
                    Your email client will open to send this message to <span className="text-white font-mono">{PERSONAL_INFO.email}</span>. I look forward to connecting!
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-2 text-xs font-mono text-white hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white placeholder-zinc-600 focus:outline-none focus:border-white text-sm font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white placeholder-zinc-600 focus:outline-none focus:border-white text-sm font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-1.5">
                      Project or Role Details
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Hi Charan, I saw your Explainable Credit Ledger and Sampradaya Events projects. We'd love to chat about..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white placeholder-zinc-600 focus:outline-none focus:border-white text-sm font-sans transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Preparing message...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
