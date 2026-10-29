import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Film,
  ExternalLink,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { PortfolioItem, parseVideoSource } from '../utils/mediaUtils';

interface VideoPlayerModalProps {
  video: PortfolioItem | null;
  onClose: () => void;
}

const FALLBACK_STREAM = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.480p.vp9.webm';

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Keyboard shortcut listener (ESC to close, Space to play/pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        togglePlay();
      }
    };
    if (video) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [video, isPlaying, onClose]);

  // Reset state when video changes
  useEffect(() => {
    setHasError(false);
    setUsingFallback(false);
    setIsLoading(true);
    setCurrentTime(0);
    setDuration(0);
  }, [video]);

  // Attempt autoplay with fallback to muted autoplay if browser blocks audio
  useEffect(() => {
    const v = videoRef.current;
    if (v && video) {
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log('Autoplay unmuted blocked by browser, falling back to muted play:', err);
            v.muted = true;
            setIsMuted(true);
            v.play()
              .then(() => {
                setIsPlaying(true);
                setIsLoading(false);
              })
              .catch((e) => {
                console.warn('Playback paused waiting for user click:', e);
                setIsPlaying(false);
                setIsLoading(false);
              });
          });
      }
    }
  }, [video, usingFallback]);

  if (!video) return null;

  const sourceInfo = parseVideoSource(usingFallback ? FALLBACK_STREAM : video.mediaUrl);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn('Play error:', e));
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted && v.volume === 0) {
      v.volume = 0.8;
      setVolume(0.8);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    const v = videoRef.current;
    if (v) {
      v.volume = newVol;
      v.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v) {
      setCurrentTime(v.currentTime);
      if (v.duration && !isNaN(v.duration)) {
        setDuration(v.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    const v = videoRef.current;
    if (v) {
      v.currentTime = seekTime;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    const v = videoRef.current;
    if (v) {
      v.playbackRate = speed;
    }
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch((err) => console.warn(err));
    } else {
      document.exitFullscreen().catch((err) => console.warn(err));
    }
  };

  const handleVideoError = () => {
    console.warn('Video failed to load URL, switching to high-compatibility fallback stream');
    if (!usingFallback) {
      setUsingFallback(true);
      setHasError(false);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div
        ref={containerRef}
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[94vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/90">
          <div className="flex items-center gap-3 pr-4 min-w-0">
            <Film className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <h2
                id="video-modal-title"
                className="text-base sm:text-lg font-bold text-white truncate font-display"
              >
                {video.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="text-amber-400">{video.category}</span>
                <span aria-hidden="true">·</span>
                <span>{video.client || 'Jonh Paul Villamora Reel'}</span>
                <span aria-hidden="true">·</span>
                <span>{video.year}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close video player"
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Stage */}
        <div className="relative w-full bg-black flex items-center justify-center overflow-hidden aspect-video group">
          {sourceInfo.type === 'direct' ? (
            <>
              <video
                ref={videoRef}
                src={sourceInfo.embedUrl}
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
                onCanPlay={() => setIsLoading(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={handleVideoError}
                onClick={togglePlay}
                className="w-full h-full max-h-[64vh] object-contain cursor-pointer"
              />

              {/* Big Center Play / Pause Overlay on Hover or Paused */}
              {!isPlaying && !isLoading && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play Video"
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-400/90 text-neutral-950 flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-amber-300 transition-all cursor-pointer"
                >
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </button>
              )}

              {/* Custom Video Control Bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent flex flex-col gap-2 transition-opacity duration-200">
                {/* Timeline Progress Slider */}
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Video scrubber"
                  className="w-full h-1 bg-neutral-700 accent-amber-400 rounded-lg cursor-pointer"
                />

                <div className="flex items-center justify-between gap-4 text-xs text-white">
                  {/* Left Controls: Play/Pause, Mute, Time */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                      className="p-1.5 text-neutral-200 hover:text-amber-400 rounded transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                        className="p-1.5 text-neutral-200 hover:text-amber-400 rounded transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        aria-label="Volume slider"
                        className="w-16 h-1 bg-neutral-700 accent-amber-400 rounded cursor-pointer"
                      />
                    </div>

                    <span className="font-mono text-[11px] text-neutral-300 tabular-nums">
                      {formatTime(currentTime)} / {formatTime(duration || 0)}
                    </span>
                  </div>

                  {/* Right Controls: Speed, Restart, Fullscreen */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-neutral-800/80 rounded px-1.5 py-0.5 border border-neutral-700/60 text-[10px] font-mono">
                      {[0.75, 1, 1.25, 1.5].map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => handleSpeedChange(spd)}
                          className={`px-1.5 py-0.5 rounded transition-colors ${
                            playbackSpeed === spd
                              ? 'bg-amber-400 text-neutral-950 font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = 0;
                          videoRef.current.play();
                        }
                      }}
                      title="Replay from start"
                      className="p-1.5 text-neutral-300 hover:text-white rounded"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      title="Fullscreen"
                      className="p-1.5 text-neutral-300 hover:text-white rounded"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : sourceInfo.type === 'youtube' || sourceInfo.type === 'vimeo' ? (
            <iframe
              src={sourceInfo.embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="p-8 text-center max-w-md">
              <Film className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <p className="text-sm text-neutral-300 mb-4">
                This video is hosted on an external stream:
              </p>
              <a
                href={video.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-neutral-950 font-semibold text-xs rounded-lg hover:bg-amber-300 transition-colors"
              >
                <span>Open Video Stream</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Fallback Notice */}
          {usingFallback && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-amber-400/90 text-neutral-950 rounded text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Playing High-Res Showcase Stream</span>
            </div>
          )}
        </div>

        {/* Video Metadata & Software Tools */}
        <div className="p-6 overflow-y-auto bg-neutral-900 border-t border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                Editorial & Narrative Overview
              </h3>
              <p className="text-sm text-neutral-200 leading-relaxed font-normal">
                {video.description}
              </p>
            </div>

            <div className="space-y-4 bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1.5 font-medium">
                  Software Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {video.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 text-xs bg-neutral-800 text-neutral-200 rounded border border-neutral-700/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1 font-medium">
                  Project Duration
                </span>
                <span className="text-xs text-amber-400 font-mono font-medium tabular-nums">
                  {video.duration || 'Full HD Master'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
