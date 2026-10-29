import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Lock, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isCreatorMode, openCreatorStudio, logoutCreatorMode } = usePortfolio();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/85 border-b border-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#home"
          className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors font-display"
        >
          JONH PAUL VILLAMORA
        </a>

        {/* Zone 2: 4-5 clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <a
            href="#videos"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Video Showcase
          </a>
          <a
            href="#graphics"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Graphic Design
          </a>
          <a
            href="#skills"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Toolkit & Skills
          </a>
          <a
            href="#experience"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Experience & CV
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
        </nav>

        {/* Zone 3: 1 primary action or creator mode controls if authenticated */}
        <div className="flex items-center gap-3 shrink-0">
          {isCreatorMode ? (
            <div className="flex items-center gap-2 bg-neutral-900/90 border border-amber-500/40 rounded-lg p-1">
              <button
                type="button"
                onClick={() => openCreatorStudio('videos')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors whitespace-nowrap shrink-0"
                title="Open Studio to upload videos and graphics"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Creator Studio</span>
              </button>
              <button
                type="button"
                onClick={logoutCreatorMode}
                className="px-2.5 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-md transition-colors whitespace-nowrap shrink-0"
                title="Lock and view exactly as public visitors do"
              >
                <Lock className="w-3 h-3 inline mr-1" />
                Lock View
              </button>
            </div>
          ) : (
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Get in Touch
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
