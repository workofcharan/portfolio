import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { PullCordSwitch } from './components/PullCordSwitch';
import { Hero } from './components/Hero';
import { InfiniteMarquee } from './components/InfiniteMarquee';
import { DoorsSection } from './components/DoorsSection';
import { StackedProjectsDeck } from './components/StackedProjectsDeck';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { EngineeringProcess } from './components/EngineeringProcess';
import { MyStoryTimeline } from './components/MyStoryTimeline';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { TerminalModal } from './components/TerminalModal';
import { Terminal as TerminalIcon, ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedDoorId, setSelectedDoorId] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Global keyboard shortcut to open interactive terminal (~ or Ctrl/Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === '`' || e.key === '~' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectDoor = (doorId: string) => {
    setSelectedDoorId(doorId);
  };

  const handleResetDoor = () => {
    setSelectedDoorId(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black text-white relative transition-colors duration-500 overflow-x-hidden selection:bg-white selection:text-black">
        
        {/* Creative Custom Magnetic Cursor */}
        <CustomCursor />

        {/* The Hanging Pull-Cord Lamp Switcher */}
        <PullCordSwitch />

        {/* Global Navigation Bar */}
        <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* Interactive Developer Terminal Modal */}
        <TerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />

        {/* Main Content Flow */}
        <main className="relative z-10">
          
          {/* Section A: Hero Section */}
          <Hero />

          {/* Section A.1: Revanth-inspired Infinite Seamless Marquee Ticker */}
          <InfiniteMarquee />

          {/* Section B: The 3D Interactive Doors ("Magic happens behind the doors") */}
          <DoorsSection onSelectDoor={handleSelectDoor} />

          {/* Section C: Stacked 3D Project Dossier Showcase */}
          <StackedProjectsDeck
            selectedDoorId={selectedDoorId}
            onResetDoor={handleResetDoor}
          />

          {/* Section D: About & Engineering Mindset */}
          <AboutSection />

          {/* Section E: Technical Arsenal & Skills Matrix */}
          <SkillsSection />

          {/* Section E.1: Capabilities, Verified Tools & 5-Step Process (Editorial Reference) */}
          <EngineeringProcess />

          {/* Section F: My Story ("Let's go back in time" Timeline) */}
          <MyStoryTimeline />

          {/* Section G: Things People Often Ask (FAQ Accordion with Spring Physics) */}
          <FaqSection />

          {/* Section H: Contact & Collaboration Section */}
          <ContactSection />

        </main>

        {/* Section I: FINCORE Interactive Halftone Wordmark Canvas Footer */}
        <Footer />

        {/* Floating Quick Action Corner Dock (Revanth style) */}
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsTerminalOpen(true)}
            className="p-3 rounded-full bg-zinc-950/90 hover:bg-white text-zinc-300 hover:text-black border border-white/20 shadow-2xl backdrop-blur-md transition-all group flex items-center gap-2 text-xs font-mono font-bold"
            title="Open Developer Terminal (~ / ESC)"
          >
            <TerminalIcon size={14} className="text-white group-hover:text-black transition-colors" />
            <span className="hidden sm:inline">Terminal</span>
            <kbd className="text-[10px] bg-white/10 group-hover:bg-black/10 px-1 py-0.5 rounded font-mono">
              ~
            </kbd>
          </button>
          
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded-full bg-zinc-950/90 hover:bg-white text-zinc-300 hover:text-black border border-white/20 shadow-2xl backdrop-blur-md transition-all group"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp size={14} className="text-white group-hover:text-black transition-colors" />
          </button>
        </div>

      </div>
    </ThemeProvider>
  );
};

export default App;
