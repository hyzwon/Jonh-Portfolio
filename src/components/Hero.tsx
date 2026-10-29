import React from 'react';
import { Play, FileText, ArrowDown, Award, Video, Palette, Sparkles } from 'lucide-react';
import { CV_DATA } from '../data/initialPortfolio';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onPlayFeaturedVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlayFeaturedVideo }) => {
  const { heroPhoto } = usePortfolio();
  return (
    <section id="home" className="relative pt-12 pb-20 border-b border-neutral-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed kicker text with typographic separators */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-400 mb-4">
              <span>Video Editor</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Motion & Graphics</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Creative Director</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400 font-mono">CEPL</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.08] font-display max-w-2xl text-balance">
              Crafting cinematic rhythm and bold visual narratives.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 mb-8 max-w-2xl leading-relaxed font-normal">
              I am Jonh Paul Villamora, a multimedia specialist and Magna Cum Laude graduate.
              I craft high-retention video edits across Premiere Pro, After Effects, and DaVinci Resolve,
              combined with commercial graphic design, creative event direction, and legal precision.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#videos"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/10 whitespace-nowrap"
              >
                <span>View Video Showcase</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={CV_DATA.cvPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors whitespace-nowrap"
                download="CV_JONH_PAUL_VILLAMORA.pdf"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Curriculum Vitae (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Cinematic Showcase Card */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl transition-all duration-300 group-hover:border-neutral-700">
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={heroPhoto}
                  alt="Jonh Paul Villamora video editing console and suite"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                {/* Play Featured Video Button */}
                <button
                  type="button"
                  onClick={onPlayFeaturedVideo}
                  aria-label="Play Featured Video Showreel"
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-400/90 text-neutral-950 flex items-center justify-center shadow-xl hover:bg-amber-300 hover:scale-110 transition-all cursor-pointer group-hover:shadow-amber-400/20"
                >
                  <Play className="w-7 h-7 fill-current translate-x-0.5" />
                </button>
              </div>

              {/* Showcase Sub-bar */}
              <div className="p-4 bg-neutral-900/95 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white tracking-wide font-display">
                    Featured Showreel & Teaser
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    MSU-IIT Drag Superstar · Season 4 Creative Teaser
                  </p>
                </div>
                <span className="text-[11px] font-mono font-medium text-amber-400 tabular-nums">
                  1:12 HD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Key Metrics Strip below Hero Split */}
        <div className="mt-16 pt-10 border-t border-neutral-900 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums">
              5+ Years
            </div>
            <p className="text-xs text-neutral-400 font-medium">
              Video Editing & Graphic Design experience
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums">
              3 Seasons
            </div>
            <p className="text-xs text-neutral-400 font-medium">
              Creative Director & Production Head for Drag Superstar
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-display">
              Magna Cum Laude
            </div>
            <p className="text-xs text-neutral-400 font-medium">
              Gawad Chancellor's Award for Academic Excellence
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-display">
              CEPL Licensed
            </div>
            <p className="text-xs text-neutral-400 font-medium">
              Certified Paralegal & Legal Researcher
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
