import React from 'react';
import { Lock, Unlock, FileText, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CV_DATA } from '../data/initialPortfolio';

export const Footer: React.FC = () => {
  const { isCreatorMode, openUnlockModal, openCreatorStudio, logoutCreatorMode } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <span className="text-base font-bold text-white tracking-tight font-display">
              JONH PAUL U. VILLAMORA
            </span>
            <p className="text-xs text-neutral-400 mt-1">
              Multimedia Specialist · Video Editor · Certified Paralegal (CEPL)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#videos" className="hover:text-white transition-colors">
              Videos
            </a>
            <a href="#graphics" className="hover:text-white transition-colors">
              Graphics
            </a>
            <a href="#skills" className="hover:text-white transition-colors">
              Skills
            </a>
            <a href="#experience" className="hover:text-white transition-colors">
              Experience
            </a>
            <a href={CV_DATA.cvPdfPath} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
              Curriculum Vitae
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg transition-colors inline-flex items-center gap-1"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>
            © 2026 Jonh Paul U. Villamora. All rights reserved.
          </p>

          {/* Discreet Creator Access Trigger: Noticeably quiet for visitors, easily accessible for the owner */}
          <div className="flex items-center gap-3">
            {isCreatorMode ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openCreatorStudio('videos')}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Unlock className="w-3 h-3" />
                  <span>Studio Active</span>
                </button>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <button
                  type="button"
                  onClick={logoutCreatorMode}
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  Lock
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openUnlockModal}
                className="text-neutral-600 hover:text-neutral-400 transition-colors p-1 rounded inline-flex items-center gap-1"
                title="Creator Studio Login (Shortcut: Ctrl+Shift+U)"
                aria-label="Creator Studio Login"
              >
                <Lock className="w-3 h-3" />
                <span className="sr-only">Creator Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
