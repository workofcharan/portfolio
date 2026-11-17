import React from 'react';
import { AnimeNavBar } from '@/components/ui/anime-navbar';
import { PORTFOLIO_NAV_ITEMS } from '@/components/Navbar';
import TumbleDeckShowcase, { type TumbleCard } from '@/components/ui/tumble-deck-showcase';

// Stock photography keeps the showcase independent of third-party screenshot services.
const cards: TumbleCard[] = [
  { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1440&q=85', alt: 'A creative development workspace' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1440&q=85', alt: 'Analytics and data on a laptop' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1440&q=85', alt: 'Electronic circuits and connected hardware' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1440&q=85', alt: 'A team collaborating on digital products' },
  { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1440&q=85', alt: 'Earth at night and global connectivity' },
];

export function TumbleDeckShowcaseDemo() {
  return <TumbleDeckShowcase cards={cards} height="clamp(340px, 55vw, 640px)" ariaLabel="Interactive technology image showcase" />;
}

export function AnimeNavBarDemo() {
  return <AnimeNavBar items={PORTFOLIO_NAV_ITEMS} defaultActive="Home" />;
}
