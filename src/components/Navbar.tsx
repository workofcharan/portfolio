import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const { isDark, soundEnabled, toggleSound, playClickSound } = useTheme();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const dateStr = now.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'The Doors', href: '#doors' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'My Story', href: '#story' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    playClickSound(800);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Monogram */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black font-extrabold font-display text-lg tracking-wider shadow-md group-hover:scale-105 transition-transform duration-200">
            {PERSONAL_INFO.initials}
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight leading-none text-white group-hover:text-zinc-300 transition-colors">
              {PERSONAL_INFO.displayName}
            </span>
            <span className="text-[11px] font-mono text-zinc-400 leading-tight mt-1">
              Loyola Academy CSE
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-xs font-medium">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-150"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Terminal Launcher, Live Clock & Sound Toggle */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-zinc-400 pr-12">
          {/* Terminal Launcher Trigger */}
          {onOpenTerminal && (
            <button
              type="button"
              onClick={() => {
                playClickSound(850);
                onOpenTerminal();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-white/15 hover:border-white/40 text-zinc-300 hover:text-white transition-all group"
              title="Open Developer Terminal (~ / ESC)"
            >
              <Terminal size={13} className="text-white group-hover:rotate-12 transition-transform" />
              <span className="font-semibold">Terminal</span>
              <kbd className="text-[10px] bg-white/10 px-1 py-0.2 rounded text-zinc-300 border border-white/10 font-mono">
                ~
              </kbd>
            </button>
          )}

          {/* Live Clock matching Instagram reel header */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white font-semibold">{currentTime}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400">{currentDate}</span>
          </div>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={() => {
              toggleSound();
              playClickSound(600);
            }}
            className="p-2 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white transition-colors"
            title={soundEnabled ? "Mute interactive audio" : "Enable interactive audio"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>

        {/* Mobile Menu & Terminal Button */}
        <div className="flex md:hidden items-center gap-2 pr-12">
          {onOpenTerminal && (
            <button
              onClick={() => {
                playClickSound(850);
                onOpenTerminal();
              }}
              className="p-2 rounded-lg bg-zinc-950 border border-white/15 text-white"
              title="Open Terminal"
            >
              <Terminal size={16} />
            </button>
          )}
          <button
            onClick={() => {
              toggleSound();
              playClickSound(600);
            }}
            className="p-2 rounded-lg bg-zinc-950 border border-white/10 text-zinc-300"
            title="Toggle sound"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-950 border border-white/10 text-zinc-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 border-b border-white/10 bg-black/95 backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-200 hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={14} className="text-zinc-500" />
              </button>
            ))}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {currentTime}
              </span>
              <span>Secunderabad, IN</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
