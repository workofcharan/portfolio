# Rekapalli Sri Charan — Developer Portfolio

A modern developer portfolio website designed with editorial craftsmanship, interactive 3D architectural portals, a desk-calendar flip notebook, stacked project dossier cards, and verified production deployments.

Inspired by creative agency web experiences and tailored specifically for **Rekapalli Sri Charan** (Loyola Academy CSE, Smart India Hackathon 2026 Finalist).

---

## 🌟 Highlights & Signature Interactions

- **The Interactive 3D Doors ("Magic happens behind the doors")**:
  - 4 Archway Doors in 3D CSS perspective: **Full-Stack Web**, **Explainable AI & ML**, **Cognitive Tech**, and **IoT & Fleet Tech**.
  - On hover, doors swing open inward revealing warm ambient lighting, code glyphs, and sound feedback.
  - On click, focuses the stacked project deck directly on that architectural domain.
- **Spiral-Ring Flip Calendar**:
  - Realistic chrome spiral rings and embossed tear-off card cycling through real roles:
    1. *Full-Stack Developer*
    2. *AI & ML Systems Builder*
    3. *FinTech & Explainable AI Engineer*
    4. *Modern Web Architect*
- **Stacked Project Dossier Deck**:
  - Layered 3D cards with tab offsets, reflection typography, engineering highlights, and verified live Vercel deployments.
- **Physical Pull-Cord Lamp Switch**:
  - Hanging brass ball-chain pull switch on the top right with spring recoil physics and sound effects to toggle light and dark modes.
- **"Let's Go Back in Time" (My Story Timeline)**:
  - Interactive chronological journey with rotating celestial compass dial and dynamic giant year typography (2026, 2025, 2024).
- **Verified Credentials & Projects**:
  - **Explainable Credit Ledger**: Smart India Hackathon 2026 Team Batman flagship project (`credit-ledger-henna.vercel.app`).
  - **Sampradaya Events**: Hyderabad premier luxury wedding customer platform with 31K+ reach (`sampradayaevents.vercel.app`).
  - **YAADRI**: Cognitive assistive companion with Living Memory Graph (`yaadri.vercel.app`).
  - **Crave+**: Trilingual food discovery engine with Web Speech API and 1-click Swiggy/Zomato ordering (`crave-plus.vercel.app`).
  - **FINCORE Consultancy**: Corporate financial advisory portal (`fincoreconsultancy.vercel.app`).
  - **RevPulse**: Dynamic QR customer feedback & sentiment engine (`revpulse1.vercel.app`).
  - **CropMind**: Precision agriculture crop recommendation system (`cropmindcrs.vercel.app`).
  - **Kitchen Bots**: IoT kitchen robotics fleet telemetry & command dashboard.

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start local development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React + Custom SVG Icons
- **Audio Feedback**: Web Audio API Sound Synthesizer
- **Confetti**: Canvas Confetti

# portfolio

### Reusable UI components

This portfolio uses Vite, React, TypeScript, and Tailwind CSS. Its `@/` alias points to `src/`.

- Reusable UI components: `src/components/ui` (`@/components/ui`)
- Page sections: `src/components`
- Global styles: `src/index.css`
- Class-name utility: `src/lib/utils.ts`
- shadcn configuration: `components.json`

The `ui` folder separates reusable controls from portfolio sections and gives shadcn a consistent installation location. Tailwind, TypeScript, Lucide, and Framer Motion are already installed; no framework migration or additional packages are needed for this navbar.

`Navbar.tsx` supplies the portfolio section names, hash links, and Lucide icons to `AnimeNavBar`. Native links support section navigation and browser history. The component follows the visible section while scrolling, uses labeled icons on mobile and text on desktop, and respects reduced-motion preferences. The supplied Next.js links were adapted to native anchors because this is a Vite app. No image assets are required.

### GitHub project synchronization

All public repositories for `workofcharan` are included, including forks, archived repositories, and the profile repository. Existing case studies retain their descriptions; additional repositories use factual GitHub metadata and repository previews. The same merged list supplies the project showcase, hero count, and terminal.

- `npm run sync:github` refreshes `src/data/githubRepositories.json`.
- `npm run dev` and `npm run build` refresh it automatically before starting.
- `npm run test:github` checks complete coverage, unique entries, case-study preservation, and safe demo URLs.

The sync follows GitHub pagination. If GitHub is unavailable or rate-limited, builds use the last saved snapshot and report its date. The project section displays the snapshot date. New repositories appear after the next build and deployment; an already deployed site does not fetch GitHub on every visit. Private repositories require authenticated access and are not exposed.

### Public project links

The project showcase includes a directory with direct GitHub and live-site buttons. `npm run check:links` checks deployment URLs and saves the results in `src/data/projectLinkStatus.json`. Confirmed HTTP failures and Vercel login redirects are excluded from live-site buttons; the GitHub source link stays available. A failed network check does not remove a demo, and checks for an old URL do not block a changed homepage. Run `npm run sync:github`, `npm run check:links`, then `npm run build` to refresh and publish the link list. HTTP success confirms that the entry page responds; it does not verify every feature inside an application.
