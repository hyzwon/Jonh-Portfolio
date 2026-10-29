import React, { useState, useMemo } from 'react';
import { Play, Plus, Trash2, Edit2, Search, Film } from 'lucide-react';
import { PortfolioItem, filterPortfolioItems } from '../utils/mediaUtils';
import { usePortfolio } from '../context/PortfolioContext';

interface VideoShowcaseProps {
  onSelectVideo: (video: PortfolioItem) => void;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ onSelectVideo }) => {
  const { videos, isCreatorMode, openCreatorStudio, deleteItem } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(videos.map((v) => v.category)));
    return ['all', ...cats];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return filterPortfolioItems(videos, activeCategory, searchQuery);
  }, [videos, activeCategory, searchQuery]);

  return (
    <section id="videos" className="py-20 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-400 mb-2">
              <span>Post-Production</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Motion Design</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Commercial Editing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              Selected Video Editings
            </h2>
          </div>

          {/* If Creator Mode is active: Add Video button */}
          {isCreatorMode && (
            <button
              type="button"
              onClick={() => openCreatorStudio('videos')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-amber-400 text-neutral-950 rounded-lg hover:bg-amber-300 transition-colors shrink-0 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Upload & Add Video</span>
            </button>
          )}
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
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
                  {cat === 'all' ? 'All Video Works' : cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search tools, client, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
            />
          </div>
        </div>

        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-neutral-800/80 bg-neutral-900/40">
            <Film className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-neutral-300">
              No video projects matched your filter.
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              Try adjusting the category or search keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => {
              const isHovered = hoveredVideoId === video.id;
              const isDirectVideo =
                /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(video.mediaUrl) ||
                video.mediaUrl.startsWith('blob:') ||
                video.mediaUrl.startsWith('data:video');

              return (
                <div
                  key={video.id}
                  onMouseEnter={() => setHoveredVideoId(video.id)}
                  onMouseLeave={() => setHoveredVideoId(null)}
                  className="group relative flex flex-col rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 shadow-lg hover:shadow-black/60"
                >
                  {/* Media Preview Thumbnail / Video Stream */}
                  <div
                    className="relative aspect-video w-full overflow-hidden bg-neutral-950 cursor-pointer"
                    onClick={() => onSelectVideo(video)}
                  >
                    {/* Live Preview on Hover for direct videos */}
                    {isHovered && isDirectVideo ? (
                      <video
                        src={video.mediaUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600">
                        <Film className="w-12 h-12" />
                      </div>
                    )}

                    {/* Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />

                    {/* Play Trigger */}
                    <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-neutral-950/80 text-amber-400 border border-amber-400/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all shadow-md pointer-events-none">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>

                    {/* Live indicator on hover */}
                    {isHovered && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-red-600/90 text-white text-[10px] font-bold tracking-wider uppercase rounded shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>Preview</span>
                      </div>
                    )}

                    {/* Video Duration / Format Badge */}
                    {video.duration && !isHovered && (
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-neutral-950/90 text-[11px] font-mono text-neutral-300 rounded border border-neutral-800 tabular-nums">
                        {video.duration}
                      </div>
                    )}

                    {/* Aspect ratio indicator if 9:16 vertical reel */}
                    {video.aspectRatio === '9:16' && (
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-amber-400/90 text-neutral-950 text-[10px] font-bold tracking-wider uppercase rounded">
                        Vertical Reel
                      </div>
                    )}
                  </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                      <span className="text-amber-400/90 font-medium">{video.category}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span>{video.year}</span>
                      {video.client && (
                        <>
                          <span aria-hidden="true" className="text-neutral-600">·</span>
                          <span className="truncate max-w-[130px]">{video.client}</span>
                        </>
                      )}
                    </div>

                    <h3
                      onClick={() => onSelectVideo(video)}
                      className="text-base font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer font-display line-clamp-1 mb-2"
                    >
                      {video.title}
                    </h3>

                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2 mb-4">
                      {video.description}
                    </p>
                  </div>

                  <div>
                    {/* Software Tools Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-neutral-800/80">
                      {video.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 text-[11px] font-medium bg-neutral-950 text-neutral-400 rounded border border-neutral-800"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Creator Mode Card Actions (Hidden from public) */}
                    {isCreatorMode && (
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-amber-500/20 text-xs">
                        <span className="text-amber-400 font-mono text-[10px]">
                          Creator Controls
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => deleteItem(video.id)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors"
                            title="Delete Video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
};
