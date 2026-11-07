import React from 'react';
import { Project } from '../types';
import { ExternalLink, ShieldCheck, Sparkles, Utensils, HeartHandshake, Laptop, Smartphone, TrendingUp, QrCode, Sprout, Cpu } from 'lucide-react';

interface DeviceMockupProps {
  project: Project;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  if (project.previewType === 'mobile') {
    // iPhone / Mobile Frame in Black & White
    return (
      <div className="relative w-full max-w-[280px] sm:max-w-[310px] mx-auto aspect-[9/18] rounded-[42px] bg-black p-3 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border-[4px] border-zinc-700 overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-30 flex items-center justify-between px-3 border border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        </div>

        {/* Inner Screen */}
        <div className="w-full h-full rounded-[34px] overflow-hidden bg-zinc-950 flex flex-col justify-between p-4 pt-10 text-white select-none border border-white/10">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-[11px] font-bold font-display tracking-tight text-white flex items-center gap-1.5">
              {project.id === 'crave-plus' ? (
                <Utensils size={13} className="text-white" />
              ) : (
                <QrCode size={13} className="text-white" />
              )}
              {project.title}
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white text-black font-bold">
              PROD
            </span>
          </div>

          {/* Screen Content Preview */}
          {project.id === 'crave-plus' ? (
            <div className="space-y-3 my-auto">
              {/* Voice banner */}
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-center">
                <span className="text-[10px] font-mono text-white font-bold">
                  🎙️ Voice: English | తెలుగు | हिंदी
                </span>
              </div>

              {/* Sample Dish Card */}
              <div className="p-3 rounded-xl bg-zinc-900 border border-white/15 shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white">Hyderabadi Dum Biryani</h4>
                    <p className="text-[10px] text-zinc-400">Charminar Special • 4.9 ★</p>
                  </div>
                  <span className="text-[10px] font-mono text-white font-bold">₹280</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-white text-black text-[9px] font-bold">
                    Swiggy 1-Click
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 border border-white/20 text-white text-[9px] font-semibold">
                    Zomato 1-Click
                  </span>
                </div>
              </div>

              {/* Flavor Roulette pill */}
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-center text-[10px] font-mono text-zinc-300">
                🎡 Physics-Based Flavor Roulette
              </div>
            </div>
          ) : project.id === 'revpulse' ? (
            <div className="space-y-3 my-auto text-center">
              {/* Dynamic QR preview */}
              <div className="w-20 h-20 mx-auto p-2 rounded-xl bg-white flex items-center justify-center">
                <QrCode size={60} className="text-black" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400">TABLE #14 • INSTANT SCAN</span>
                <h4 className="text-xs font-bold text-white mt-0.5">How was your dining experience?</h4>
              </div>
              <div className="flex justify-center gap-2 pt-1">
                {['😍', '😊', '😐', '😞'].map((emoji, i) => (
                  <span key={i} className="text-sm p-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-white cursor-pointer">
                    {emoji}
                  </span>
                ))}
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-300">
                Live NPS Rating Engine • Zero App Install
              </div>
            </div>
          ) : (
            <div className="space-y-3 my-auto text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 flex items-center justify-center text-white">
                <Smartphone size={24} />
              </div>
              <h4 className="text-xs font-bold text-white">{project.title}</h4>
              <p className="text-[10px] text-zinc-400 px-2">{project.subtitle}</p>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="pt-2 border-t border-white/10 flex justify-center">
            <div className="w-24 h-1 rounded-full bg-zinc-700" />
          </div>
        </div>
      </div>
    );
  }

  // Desktop / Dashboard Browser Mockup in Black & White
  return (
    <div className="w-full rounded-2xl bg-black p-2 sm:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/15 overflow-hidden">
      
      {/* Browser chrome header with macOS-style window dots */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-zinc-950 rounded-t-xl text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <div className="px-3 py-0.5 rounded-md bg-black border border-white/10 text-[10px] text-zinc-300 truncate max-w-[200px] sm:max-w-xs font-mono">
          {project.liveUrl || `github.com/workofcharan/${project.id}`}
        </div>
        <div className="w-8" />
      </div>

      {/* Screen Body Preview */}
      <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden rounded-b-xl flex flex-col justify-between p-4 sm:p-6 text-zinc-200 select-none border border-white/5">
        
        {project.id === 'credit-ledger' ? (
          // Explainable Credit Ledger SIH 2026 UI preview
          <div className="space-y-4 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  Smart India Hackathon 2026 • Team Batman
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white font-display">
                  Explainable Credit Officer Dashboard
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white text-black text-[10px] font-mono font-bold">
                Auto-Approval Engine
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-zinc-900 border border-white/15">
                <span className="text-[10px] font-mono text-zinc-400">Statistical Credit Score</span>
                <div className="text-xl sm:text-2xl font-black text-white font-display">782 / 900</div>
                <span className="text-[9px] text-zinc-400">Confidence: 94.6%</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-white/15">
                <span className="text-[10px] font-mono text-zinc-400">Fraud Anomaly Probability</span>
                <div className="text-xl sm:text-2xl font-black text-white font-display">2.1% (Low)</div>
                <span className="text-[9px] text-zinc-400">Identity Signals Verified</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 text-[10px] font-mono space-y-1.5">
              <div className="flex justify-between text-zinc-400 font-bold">
                <span>Weighted Factor</span>
                <span>Signal Impact</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Alternative Cashflow Consistency</span>
                <span className="text-white font-bold">+42 pts</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Zero Black-Box Automated Rejection</span>
                <span className="text-zinc-400">Human-In-The-Loop</span>
              </div>
            </div>
          </div>
        ) : project.id === 'sampradaya-events' ? (
          // Sampradaya Events Luxury Preview
          <div className="h-full flex flex-col justify-between bg-black rounded-xl p-4 sm:p-5 border border-white/15">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-serif font-bold text-white tracking-widest uppercase">
                SAMPRADAYA EVENTS
              </span>
              <span className="text-[9px] font-mono text-white px-2 py-0.5 rounded bg-zinc-900 border border-white/20">
                Luxury Wedding Planners
              </span>
            </div>

            <div className="my-auto text-center space-y-2 py-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                "IDEATE • IMPROVISE • IMPRESS"
              </p>
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-white">
                Creating Everlasting Impact on Your Big Day.
              </h3>
              <p className="text-[10px] text-zinc-400 max-w-sm mx-auto">
                Hyderabad's Premier Luxury Wedding and Event Planning House • 31K+ Followers
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-zinc-400">
              <span>Sacred Ivory & Royal Monochrome</span>
              <span>Smooth Lenis Scroll Engine</span>
            </div>
          </div>
        ) : project.id === 'yaadri' ? (
          // YAADRI Memory Graph Preview
          <div className="h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <HeartHandshake size={16} className="text-white" />
                <span className="text-xs font-bold text-white font-display">YAADRI — AI Memory Companion</span>
              </div>
              <span className="text-[9px] font-mono text-black bg-white px-2 py-0.5 rounded font-bold">
                100% Client-Side
              </span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-white/15 text-center space-y-2 my-auto">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-semibold border border-white/20">
                Living Memory Graph Visualization
              </div>
              <p className="text-xs text-zinc-300">
                Memory Capsules • 5-Level Memory Rescue • Caregiver Copilot
              </p>
              <div className="flex justify-center gap-2 pt-1">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Familial Nodes</span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Recall Support</span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Zero Cloud Leak</span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-zinc-400 flex justify-between">
              <span>Client-side Cognitive System</span>
              <span>Loyola Academy CSE Prototype</span>
            </div>
          </div>
        ) : project.id === 'fincore' ? (
          // FINCORE Consultancy Preview
          <div className="h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-white" />
                <span className="text-xs font-bold text-white font-display">FINCORE Wealth Advisory</span>
              </div>
              <span className="text-[9px] font-mono text-white bg-zinc-800 px-2 py-0.5 rounded border border-white/20">
                Corporate Portal
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-auto">
              <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-center">
                <span className="text-[9px] font-mono text-zinc-400">Asset Valuation</span>
                <div className="text-lg font-bold text-white font-display mt-0.5">₹42.8 Cr</div>
                <span className="text-[8px] text-zinc-400">Advisory Pipeline</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-center">
                <span className="text-[9px] font-mono text-zinc-400">Advisory Scope</span>
                <div className="text-lg font-bold text-white font-display mt-0.5">Corporate M&A</div>
                <span className="text-[8px] text-zinc-400">Structuring & Tax</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/10 text-[10px] font-mono text-zinc-400 flex justify-between">
              <span>Client Intake Funnel</span>
              <span>Automated Schedule Dispatch</span>
            </div>
          </div>
        ) : project.id === 'crop-recommendation' ? (
          // CropMind ML Preview
          <div className="h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sprout size={16} className="text-white" />
                <span className="text-xs font-bold text-white font-display">CropMind ML Agriculture Advisory</span>
              </div>
              <span className="text-[9px] font-mono text-black bg-white px-2 py-0.5 rounded font-bold">
                98.4% Confidence
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/15 my-auto space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white">Recommended: Rice (Oryza Sativa)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white">Kharif Season</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-[9px] font-mono text-zinc-400 pt-1">
                <div className="p-1 rounded bg-black border border-white/10 text-center">N: 90</div>
                <div className="p-1 rounded bg-black border border-white/10 text-center">P: 42</div>
                <div className="p-1 rounded bg-black border border-white/10 text-center">K: 43</div>
                <div className="p-1 rounded bg-black border border-white/10 text-center">pH: 6.5</div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-zinc-400 flex justify-between">
              <span>Multi-variable Soil Analysis</span>
              <span>Python / Scikit-Learn Engine</span>
            </div>
          </div>
        ) : (
          // Default Dashboard / Kitchen Bots Preview
          <div className="h-full flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-white" />
                <span className="text-xs font-bold text-white font-display">{project.title}</span>
              </div>
              <span className="text-[10px] font-mono text-white bg-zinc-800 px-2 py-0.5 rounded border border-white/20">
                {project.categoryBadge}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-center space-y-2 my-auto">
              <Laptop size={28} className="mx-auto text-zinc-400" />
              <p className="text-xs text-zinc-300">{project.subtitle}</p>
            </div>
            <div className="text-[10px] font-mono text-zinc-400">
              Stack: {project.techStack.slice(0, 4).join(' • ')}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
