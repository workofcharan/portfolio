import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS, PROJECT_LINKS_CHECKED_AT } from '../data/portfolioData';
import TumbleDeckShowcase from './ui/tumble-deck-showcase';

const projectCards = PROJECTS.map(project => ({
  alt: project.title,
  content: (
          <article key={project.id} className="relative isolate flex flex-col gap-2 overflow-hidden p-4 sm:p-7">
            <img
              src={`/project-previews/${project.githubUrl.split('/').filter(Boolean).pop()!.toLowerCase()}.png`}
              alt=""
              className="absolute inset-0 -z-20"
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={event => { event.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(to bottom, color-mix(in srgb, var(--bg-card) 94%, transparent) 0%, color-mix(in srgb, var(--bg-card) 65%, transparent) 27%, transparent 49%, color-mix(in srgb, var(--bg-card) 92%, transparent) 79%, var(--bg-card) 100%)' }} />
            <h4 className="text-base sm:text-xl font-semibold font-display text-white break-words">{project.title}</h4>
            {project.liveUrl && <p className="text-xs text-white/80 break-all">{new URL(project.liveUrl).hostname}</p>}
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
              {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} live site (opens in a new tab)`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200">Visit site <ArrowUpRight size={14} /></a> : <span className="text-xs text-zinc-500">{project.liveUnavailable ? 'Live site currently unavailable' : 'Source code only'}</span>}
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub (opens in a new tab)`} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-xs text-zinc-300 hover:text-white"><GithubIcon size={14} />GitHub <ExternalLink size={12} /></a>
            </div>
          </article>
  ),
}));

export function ProjectLinksDirectory() {
  return (
    <div id="project-links" className="mt-16 scroll-mt-36 border-t border-white/15 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div><p className="text-xs text-zinc-400 mb-2">{PROJECTS.filter(project => project.liveUrl).length} live sites · {PROJECTS.length} GitHub repositories</p><h3 className="text-2xl font-display font-semibold text-white">Live demos &amp; source code</h3></div>
        <p className="text-xs text-zinc-400">Links checked {new Date(PROJECT_LINKS_CHECKED_AT).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-zinc-950">
        <TumbleDeckShowcase
          cards={projectCards}
          height="clamp(520px, 60vw, 720px)"
          aspect={1.6}
          depth={4}
          ariaLabel="Live demos and source code projects"
        />
        <p className="border-t border-white/10 px-5 py-4 text-center text-xs text-zinc-400">
          Scroll, drag or use the arrows to explore every project. Open a project using its links.
        </p>
      </div>
    </div>
  );
}
