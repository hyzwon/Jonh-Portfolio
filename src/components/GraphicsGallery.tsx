import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Maximize2, X, Palette, Image as ImageIcon } from 'lucide-react';
import { PortfolioItem } from '../utils/mediaUtils';
import { usePortfolio } from '../context/PortfolioContext';

export const GraphicsGallery: React.FC = () => {
  const { graphics, isCreatorMode, openCreatorStudio, deleteItem } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedGraphic, setSelectedGraphic] = useState<PortfolioItem | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(graphics.map((g) => g.category)));
    return ['all', ...cats];
  }, [graphics]);

  const filteredGraphics = useMemo(() => {
    if (activeCategory === 'all') return graphics;
    return graphics.filter(
      (g) => g.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [graphics, activeCategory]);

  return (
    <section id="graphics" className="py-20 border-b border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-400 mb-2">
              <span>Visual Arts</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Brand Identity</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Amazon & Social Media</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              Graphic Design & Visuals
            </h2>
          </div>

          {/* If Creator Mode is active: Add Graphic button */}
          {isCreatorMode && (
            <button
              type="button"
              onClick={() => openCreatorStudio('graphics')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-amber-400 text-neutral-950 rounded-lg hover:bg-amber-300 transition-colors shrink-0 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Upload & Add Graphic</span>
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-neutral-800 text-amber-400 font-semibold border border-neutral-700'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent'
                }`}
              >
                {cat === 'all' ? 'All Visual Works' : cat}
              </button>
            );
          })}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGraphics.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 shadow-lg"
            >
              {/* Image Container with Lightbox Trigger */}
              <div
                className="relative aspect-4/3 w-full overflow-hidden bg-neutral-950 cursor-pointer"
                onClick={() => setSelectedGraphic(item)}
              >
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-neutral-950/80 text-white flex items-center justify-center border border-white/20 shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 px-2 py-0.5 bg-neutral-950/80 text-[10px] uppercase font-semibold tracking-wider text-amber-400 rounded border border-neutral-800 backdrop-blur-sm">
                  {item.category}
                </div>
              </div>

              {/* Graphic Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5">
                    <span>{item.client || 'Creative Project'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.year}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedGraphic(item)}
                    className="text-base font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer font-display line-clamp-1 mb-2"
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-neutral-800/80">
                    {item.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 text-[11px] font-medium bg-neutral-950 text-neutral-400 rounded border border-neutral-800"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Creator Mode Card Actions */}
                  {isCreatorMode && (
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-amber-500/20 text-xs">
                      <span className="text-amber-400 font-mono text-[10px]">
                        Creator Controls
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors"
                        title="Delete Graphic"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedGraphic && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="absolute inset-0" onClick={() => setSelectedGraphic(null)} />

          <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
              <div className="min-w-0 pr-4">
                <h3 className="text-base sm:text-lg font-bold text-white truncate font-display">
                  {selectedGraphic.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="text-amber-400">{selectedGraphic.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedGraphic.client || 'Creative Project'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedGraphic.year}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedGraphic(null)}
                aria-label="Close image lightbox"
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 bg-black flex items-center justify-center p-2 overflow-auto max-h-[65vh]">
              <img
                src={selectedGraphic.mediaUrl}
                alt={selectedGraphic.title}
                className="max-h-[60vh] max-w-full object-contain rounded"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-neutral-300 max-w-xl leading-relaxed">
                {selectedGraphic.description}
              </p>
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {selectedGraphic.tools.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs bg-neutral-950 text-neutral-300 rounded border border-neutral-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
