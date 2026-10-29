import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Film,
  Image as ImageIcon,
  BookOpen,
  Download,
  RotateCcw,
  Eye,
  CheckCircle,
  AlertCircle,
  FileVideo,
  Sparkles,
  Link as LinkIcon,
  HardDrive,
  Camera,
  User,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { validatePortfolioItem, PortfolioItem } from '../utils/mediaUtils';

export const CreatorStudioModal: React.FC = () => {
  const {
    creatorStudioOpen,
    closeCreatorStudio,
    studioActiveTab,
    openCreatorStudio,
    addItem,
    logoutCreatorMode,
    resetToDefaults,
    exportPortfolioJson,
    importPortfolioJson,
    profilePhoto,
    heroPhoto,
    updateProfilePhoto,
    updateHeroPhoto,
    resetPhotosToDefault,
    videos,
    graphics,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'videos' | 'graphics' | 'photos' | 'guide'>(studioActiveTab);

  // Sync tab with external trigger
  React.useEffect(() => {
    setActiveTab(studioActiveTab);
  }, [studioActiveTab]);

  // Video Form State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCategory, setVideoCategory] = useState('Commercial & Ads');
  const [videoClient, setVideoClient] = useState('');
  const [videoYear, setVideoYear] = useState('2026');
  const [videoTools, setVideoTools] = useState('Premiere Pro, After Effects');
  const [videoDuration, setVideoDuration] = useState('1:00');
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadedVideoFile, setUploadedVideoFile] = useState<File | null>(null);
  const [videoUploadPreview, setVideoUploadPreview] = useState<string>('');

  // Graphic Form State
  const [graphicTitle, setGraphicTitle] = useState('');
  const [graphicCategory, setGraphicCategory] = useState('Posters & Events');
  const [graphicClient, setGraphicClient] = useState('');
  const [graphicYear, setGraphicYear] = useState('2026');
  const [graphicTools, setGraphicTools] = useState('Photoshop, Canva');
  const [graphicDescription, setGraphicDescription] = useState('');
  const [graphicUrl, setGraphicUrl] = useState('');
  const [graphicUploadPreview, setGraphicUploadPreview] = useState<string>('');

  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Profile & Hero Photo State
  const [newProfileUrl, setNewProfileUrl] = useState('');
  const [profilePreview, setProfilePreview] = useState(profilePhoto);
  const [newHeroUrl, setNewHeroUrl] = useState('');
  const [heroPreview, setHeroPreview] = useState(heroPhoto);

  const fileInputRefVideo = useRef<HTMLInputElement>(null);
  const fileInputRefGraphic = useRef<HTMLInputElement>(null);
  const fileInputRefProfile = useRef<HTMLInputElement>(null);
  const fileInputRefHero = useRef<HTMLInputElement>(null);
  const jsonImportRef = useRef<HTMLInputElement>(null);

  // Sync previews when context photos update
  React.useEffect(() => {
    setProfilePreview(profilePhoto);
  }, [profilePhoto]);

  React.useEffect(() => {
    setHeroPreview(heroPhoto);
  }, [heroPhoto]);

  if (!creatorStudioOpen) return null;

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfilePreview(result);
        setNewProfileUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setHeroPreview(result);
        setNewHeroUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfilePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    const photoToSave = newProfileUrl || profilePreview;
    if (!photoToSave) {
      setFeedbackMsg({ type: 'error', text: 'Please select a photo or enter an image URL.' });
      return;
    }
    updateProfilePhoto(photoToSave);
    setFeedbackMsg({ type: 'success', text: 'Profile portrait photo updated successfully!' });
    setNewProfileUrl('');
  };

  const handleSaveHeroPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    const photoToSave = newHeroUrl || heroPreview;
    if (!photoToSave) {
      setFeedbackMsg({ type: 'error', text: 'Please select an image or enter a URL.' });
      return;
    }
    updateHeroPhoto(photoToSave);
    setFeedbackMsg({ type: 'success', text: 'Hero suite banner updated successfully!' });
    setNewHeroUrl('');
  };

  // Handle local video file selection
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedVideoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setVideoUploadPreview(objectUrl);
      setVideoUrl(objectUrl);
      if (!videoTitle) {
        setVideoTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    }
  };

  // Handle local graphic image file selection
  const handleGraphicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setGraphicUploadPreview(result);
        setGraphicUrl(result);
        if (!graphicTitle) {
          setGraphicTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const toolsArray = videoTools
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newItemData: Omit<PortfolioItem, 'id'> = {
      type: 'video',
      title: videoTitle,
      category: videoCategory,
      client: videoClient || undefined,
      year: videoYear || '2026',
      tools: toolsArray.length > 0 ? toolsArray : ['Premiere Pro'],
      description: videoDescription || 'Sample video editing project showcase.',
      mediaUrl: videoUrl,
      aspectRatio: videoAspectRatio,
      duration: videoDuration || '1:00',
      featured: false,
    };

    const validation = validatePortfolioItem(newItemData);
    if (!validation.isValid) {
      setFeedbackMsg({ type: 'error', text: validation.errors[0] });
      return;
    }

    addItem(newItemData);
    setFeedbackMsg({ type: 'success', text: `Video "${videoTitle}" added successfully to your portfolio!` });

    // Reset Form
    setVideoTitle('');
    setVideoClient('');
    setVideoDescription('');
    setVideoUrl('');
    setVideoUploadPreview('');
    setUploadedVideoFile(null);
  };

  const handleSaveGraphic = (e: React.FormEvent) => {
    e.preventDefault();
    const toolsArray = graphicTools
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newItemData: Omit<PortfolioItem, 'id'> = {
      type: 'graphic',
      title: graphicTitle,
      category: graphicCategory,
      client: graphicClient || undefined,
      year: graphicYear || '2026',
      tools: toolsArray.length > 0 ? toolsArray : ['Photoshop', 'Canva'],
      description: graphicDescription || 'Sample graphic design showcase.',
      mediaUrl: graphicUrl,
      aspectRatio: '4:3',
      featured: false,
    };

    const validation = validatePortfolioItem(newItemData);
    if (!validation.isValid) {
      setFeedbackMsg({ type: 'error', text: validation.errors[0] });
      return;
    }

    addItem(newItemData);
    setFeedbackMsg({ type: 'success', text: `Graphic "${graphicTitle}" added successfully to your portfolio!` });

    // Reset Form
    setGraphicTitle('');
    setGraphicClient('');
    setGraphicDescription('');
    setGraphicUrl('');
    setGraphicUploadPreview('');
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const success = importPortfolioJson(content);
        if (success) {
          setFeedbackMsg({ type: 'success', text: 'Portfolio configuration imported successfully!' });
        } else {
          setFeedbackMsg({ type: 'error', text: 'Invalid JSON backup file.' });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={closeCreatorStudio} />

      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/90">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                Creator Management Studio
              </h2>
            </div>
            <p className="text-[11px] text-amber-400/90 font-mono mt-0.5">
              Hidden from public visitors · Active only during your authenticated session
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={logoutCreatorMode}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
              title="Lock studio and preview the site as a public visitor"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View as Public</span>
            </button>
            <button
              type="button"
              onClick={closeCreatorStudio}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-neutral-800 bg-neutral-950/40">
          <button
            type="button"
            onClick={() => {
              setActiveTab('videos');
              setFeedbackMsg(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'videos'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Upload Videos ({videos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('graphics');
              setFeedbackMsg(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'graphics'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Upload Graphics ({graphics.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('photos');
              setFeedbackMsg(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'photos'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Update Photos (Profile & Hero)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('guide');
              setFeedbackMsg(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'guide'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>How to Upload & Deploy Files</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div
            className={`mx-6 mt-4 p-3 rounded-lg flex items-center gap-2 text-xs font-medium ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-950/80 border border-emerald-800/80 text-emerald-300'
                : 'bg-red-950/80 border border-red-800/80 text-red-300'
            }`}
          >
            {feedbackMsg.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: UPLOAD VIDEO */}
          {activeTab === 'videos' && (
            <form onSubmit={handleSaveVideo} className="space-y-6">
              {/* Media File or Link Selection */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Step 1: Choose Video File or Link
                </label>

                {/* Option A: Direct Local File Picker */}
                <div className="border border-dashed border-neutral-700 hover:border-amber-400/80 rounded-xl p-5 text-center transition-colors bg-neutral-900/40">
                  <input
                    type="file"
                    ref={fileInputRefVideo}
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    onChange={handleVideoFileChange}
                    className="hidden"
                  />
                  <FileVideo className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <button
                    type="button"
                    onClick={() => fileInputRefVideo.current?.click()}
                    className="px-4 py-2 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Select Video File (.mp4, .mov, .webm)</span>
                  </button>
                  <p className="text-[11px] text-neutral-400 mt-2">
                    {uploadedVideoFile
                      ? `Selected: ${uploadedVideoFile.name} (${(uploadedVideoFile.size / 1024 / 1024).toFixed(1)} MB)`
                      : 'Upload directly from your computer for instant in-browser preview'}
                  </p>
                </div>

                {/* Option B: Video Link / URL */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Or Paste Video URL (YouTube, Vimeo, Google Drive, or Direct MP4 link)
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => {
                        setVideoUrl(e.target.value);
                        setVideoUploadPreview(e.target.value);
                      }}
                      placeholder="https://www.youtube.com/watch?v=... or https://example.com/video.mp4"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Video Preview if Available */}
                {videoUploadPreview && (
                  <div className="mt-2 p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                    <span className="text-[11px] font-semibold text-neutral-400 block mb-2">
                      Live Video Preview:
                    </span>
                    <video
                      src={videoUploadPreview}
                      controls
                      className="max-h-48 rounded w-auto mx-auto object-contain bg-black"
                    />
                  </div>
                )}
              </div>

              {/* Step 2: Video Metadata */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Step 2: Video Details & Tools
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Video Title *</label>
                    <input
                      type="text"
                      required
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="e.g. Commercial Brand Teaser"
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Category *</label>
                    <select
                      value={videoCategory}
                      onChange={(e) => setVideoCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Commercial & Ads">Commercial & Ads</option>
                      <option value="Event & Teasers">Event & Teasers</option>
                      <option value="Motion Graphics">Motion Graphics</option>
                      <option value="Short-Form Reels">Short-Form Reels</option>
                      <option value="Documentary & Recaps">Documentary & Recaps</option>
                      <option value="Broadcast & Media">Broadcast & Media</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Client or Event Name</label>
                    <input
                      type="text"
                      value={videoClient}
                      onChange={(e) => setVideoClient(e.target.value)}
                      placeholder="e.g. KASAMA MSU-IIT, Amazon USA, etc."
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Software Tools (comma-separated)</label>
                    <input
                      type="text"
                      value={videoTools}
                      onChange={(e) => setVideoTools(e.target.value)}
                      placeholder="Premiere Pro, After Effects, DaVinci Resolve"
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Duration</label>
                    <input
                      type="text"
                      value={videoDuration}
                      onChange={(e) => setVideoDuration(e.target.value)}
                      placeholder="e.g. 1:15"
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Aspect Ratio</label>
                    <select
                      value={videoAspectRatio}
                      onChange={(e) => setVideoAspectRatio(e.target.value as '16:9' | '9:16')}
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="16:9">16:9 (Standard Widescreen)</option>
                      <option value="9:16">9:16 (Vertical Reel / TikTok)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Description & Editing Notes</label>
                  <textarea
                    rows={3}
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    placeholder="Explain the narrative flow, speed ramping, color grading, or key highlights..."
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold bg-amber-400 text-neutral-950 rounded-lg hover:bg-amber-300 transition-colors shadow-sm"
                >
                  Publish Video to Portfolio
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: UPLOAD GRAPHIC */}
          {activeTab === 'graphics' && (
            <form onSubmit={handleSaveGraphic} className="space-y-6">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Step 1: Choose Graphic Image or URL
                </label>

                <div className="border border-dashed border-neutral-700 hover:border-amber-400/80 rounded-xl p-5 text-center transition-colors bg-neutral-900/40">
                  <input
                    type="file"
                    ref={fileInputRefGraphic}
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleGraphicFileChange}
                    className="hidden"
                  />
                  <ImageIcon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <button
                    type="button"
                    onClick={() => fileInputRefGraphic.current?.click()}
                    className="px-4 py-2 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Select Image File (.png, .jpg, .webp)</span>
                  </button>
                  <p className="text-[11px] text-neutral-400 mt-2">
                    {graphicUploadPreview ? 'Image loaded' : 'Upload an image from your computer'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Or Enter Image URL
                  </label>
                  <input
                    type="url"
                    value={graphicUrl}
                    onChange={(e) => {
                      setGraphicUrl(e.target.value);
                      setGraphicUploadPreview(e.target.value);
                    }}
                    placeholder="https://example.com/poster.jpg"
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {graphicUploadPreview && (
                  <div className="mt-2 p-3 bg-neutral-900 rounded-lg border border-neutral-800 text-center">
                    <span className="text-[11px] font-semibold text-neutral-400 block mb-2 text-left">
                      Image Preview:
                    </span>
                    <img
                      src={graphicUploadPreview}
                      alt="Preview"
                      className="max-h-48 rounded mx-auto object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Step 2: Graphic Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={graphicTitle}
                      onChange={(e) => setGraphicTitle(e.target.value)}
                      placeholder="e.g. Festival Poster Design"
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Category *</label>
                    <select
                      value={graphicCategory}
                      onChange={(e) => setGraphicCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Posters & Events">Posters & Events</option>
                      <option value="Social Media & E-Commerce">Social Media & E-Commerce</option>
                      <option value="Motion Design">Motion Design</option>
                      <option value="Brand Identity">Brand Identity</option>
                      <option value="Print & Advocacy">Print & Advocacy</option>
                      <option value="Editorial & Print">Editorial & Print</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Client or Brand</label>
                    <input
                      type="text"
                      value={graphicClient}
                      onChange={(e) => setGraphicClient(e.target.value)}
                      placeholder="e.g. Amazon / UPSERA"
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Tools Used</label>
                    <input
                      type="text"
                      value={graphicTools}
                      onChange={(e) => setGraphicTools(e.target.value)}
                      placeholder="Photoshop, Canva, Illustrator"
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={graphicDescription}
                    onChange={(e) => setGraphicDescription(e.target.value)}
                    placeholder="Brief description of visual aesthetics, typography, or concept..."
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold bg-amber-400 text-neutral-950 rounded-lg hover:bg-amber-300 transition-colors shadow-sm"
                >
                  Publish Graphic to Portfolio
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: UPDATE PHOTOS (PROFILE & HERO) */}
          {activeTab === 'photos' && (
            <div className="space-y-8">
              {/* Profile Portrait Update Box */}
              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      1. Profile Portrait Photo (CV & About Section)
                    </h3>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">1:1 Square Recommended</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-3 flex flex-col items-center">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden bg-neutral-900 border-2 border-amber-400/40 shadow-lg relative group">
                      <img
                        src={profilePreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-neutral-400 mt-2">Current Photo</span>
                  </div>

                  <div className="md:col-span-9 space-y-3">
                    <div className="border border-dashed border-neutral-700 hover:border-amber-400/80 rounded-xl p-4 text-center bg-neutral-900/30">
                      <input
                        type="file"
                        ref={fileInputRefProfile}
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleProfileFileChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRefProfile.current?.click()}
                        className="px-4 py-2 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        <span>Choose Photo from Device (.png, .jpg, .webp)</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        Or Paste Web Image URL:
                      </label>
                      <input
                        type="url"
                        value={newProfileUrl}
                        onChange={(e) => {
                          setNewProfileUrl(e.target.value);
                          setProfilePreview(e.target.value);
                        }}
                        placeholder="https://example.com/my-photo.jpg"
                        className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveProfilePhoto}
                      className="px-5 py-2 text-xs font-semibold bg-amber-400 text-neutral-950 rounded-lg hover:bg-amber-300 transition-colors shadow-sm"
                    >
                      Save Profile Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* Hero Studio Banner Update Box */}
              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      2. Hero Studio Visual (Top Header Suite)
                    </h3>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">16:9 Widescreen</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 flex flex-col items-center">
                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-700 shadow-lg">
                      <img
                        src={heroPreview}
                        alt="Hero Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-neutral-400 mt-2">Current Hero Banner</span>
                  </div>

                  <div className="md:col-span-8 space-y-3">
                    <div className="border border-dashed border-neutral-700 hover:border-amber-400/80 rounded-xl p-4 text-center bg-neutral-900/30">
                      <input
                        type="file"
                        ref={fileInputRefHero}
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleHeroFileChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRefHero.current?.click()}
                        className="px-4 py-2 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        <span>Choose Hero Image from Device</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        Or Paste Image URL:
                      </label>
                      <input
                        type="url"
                        value={newHeroUrl}
                        onChange={(e) => {
                          setNewHeroUrl(e.target.value);
                          setHeroPreview(e.target.value);
                        }}
                        placeholder="https://example.com/studio-workspace.jpg"
                        className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveHeroPhoto}
                      className="px-5 py-2 text-xs font-semibold bg-amber-400 text-neutral-950 rounded-lg hover:bg-amber-300 transition-colors shadow-sm"
                    >
                      Save Hero Banner
                    </button>
                  </div>
                </div>
              </div>

              {/* Reset to Original Photos */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetPhotosToDefault();
                    setFeedbackMsg({ type: 'success', text: 'Photos reset to default visuals.' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Photos to Original Defaults</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: STEP-BY-STEP GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-6 text-neutral-300 text-xs leading-relaxed">
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30">
                <h3 className="text-sm font-bold text-amber-300 mb-1">
                  How This Hidden Studio Works
                </h3>
                <p className="text-xs text-neutral-200">
                  When you publish the website, public visitors <strong>will not see</strong> any upload buttons, manage icons, or creator banners. You can access this Studio anytime by pressing <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-amber-400 font-mono">Ctrl+Shift+U</kbd> or clicking the small padlock in the footer and entering your PIN (default: <strong className="text-white">1234</strong>).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold mb-3">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1.5">
                    Browser File Upload
                  </h4>
                  <p className="text-neutral-400 text-[11px] leading-normal">
                    Use the "Upload Videos" or "Upload Graphics" tab above to choose files directly from your computer. Stored in your browser's persistent storage.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold mb-3">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1.5">
                    Cloud Video Links
                  </h4>
                  <p className="text-neutral-400 text-[11px] leading-normal">
                    Upload your high-definition video showreels to YouTube (set to "Unlisted" or "Public") or Vimeo, then paste the link here for fast 4K streaming.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold mb-3">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1.5">
                    Update Photos Easily
                  </h4>
                  <p className="text-neutral-400 text-[11px] leading-normal">
                    Switch to the "Update Photos" tab to replace your Profile Portrait Photo (CV/About section) or your Hero Workspace Banner with any picture from your device.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold mb-3">
                    4
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1.5">
                    Export / Backup JSON
                  </h4>
                  <p className="text-neutral-400 text-[11px] leading-normal">
                    Click "Export Portfolio Backup" below at any time to save your updated videos, graphics, and photos into a backup JSON file you can restore anywhere.
                  </p>
                </div>
              </div>

              {/* Data Tools */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <h4 className="text-xs font-bold text-white mb-3">
                  Data Backup & Restore Tools
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={exportPortfolioJson}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Export Portfolio Backup (.json)</span>
                  </button>

                  <input
                    type="file"
                    ref={jsonImportRef}
                    accept=".json"
                    onChange={handleImportJsonFile}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => jsonImportRef.current?.click()}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Import Backup (.json)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Reset portfolio to initial CV default items?')) {
                        resetToDefaults();
                        setFeedbackMsg({ type: 'success', text: 'Portfolio reset to default works.' });
                      }
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-neutral-400 hover:text-red-400 rounded-lg transition-colors text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
