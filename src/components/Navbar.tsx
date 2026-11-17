import React from 'react';
import { Home, BriefcaseBusiness, UserRound, Code2, Mail, Terminal, Volume2, VolumeX } from 'lucide-react';
import { AnimeNavBar, type NavItem } from '@/components/ui/anime-navbar';
import { useTheme } from '../context/ThemeContext';

export const PORTFOLIO_NAV_ITEMS: NavItem[] = [
  { name: 'Home', url: '#home', icon: Home },
  { name: 'Work', url: '#projects', icon: BriefcaseBusiness },
  { name: 'About', url: '#about', icon: UserRound },
  { name: 'Skills', url: '#skills', icon: Code2 },
  { name: 'Contact', url: '#contact', icon: Mail },
];
interface NavbarProps { onOpenTerminal?: () => void; }
export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const { soundEnabled, toggleSound } = useTheme();
  return (
    <header>
      <a href="#home" aria-label="Sri Charan home" className="fixed left-6 top-7 z-40 hidden lg:block font-display text-xl font-semibold text-white">charan<span className="text-lime-300">.</span></a>
      <AnimeNavBar items={PORTFOLIO_NAV_ITEMS} defaultActive="Home" />
      <div className="fixed right-20 top-7 z-40 hidden lg:flex items-center gap-2">
        <button type="button" onClick={toggleSound} aria-label={soundEnabled ? 'Mute interactive audio' : 'Enable interactive audio'} className="p-2 text-zinc-400 hover:text-white">{soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
        {onOpenTerminal && <button type="button" onClick={onOpenTerminal} aria-label="Open developer terminal" className="p-2 text-zinc-400 hover:text-white"><Terminal size={16} /></button>}
      </div>
    </header>
  );
};
