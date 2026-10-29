/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoShowcase } from './components/VideoShowcase';
import { GraphicsGallery } from './components/GraphicsGallery';
import { ToolkitAndSkills } from './components/ToolkitAndSkills';
import { ExperienceAndCV } from './components/ExperienceAndCV';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { CreatorStudioModal } from './components/CreatorStudioModal';
import { AdminUnlockModal } from './components/AdminUnlockModal';
import { PortfolioItem } from './utils/mediaUtils';

function PortfolioMain() {
  const { videos } = usePortfolio();
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);

  const handlePlayFeatured = () => {
    // Play the first featured video or the first video
    const featured = videos.find((v) => v.featured) || videos[0];
    if (featured) {
      setSelectedVideo(featured);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      {/* Top Bar following 3-zone contract */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onPlayFeaturedVideo={handlePlayFeatured} />
        <VideoShowcase onSelectVideo={(video) => setSelectedVideo(video)} />
        <GraphicsGallery />
        <ToolkitAndSkills />
        <ExperienceAndCV />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Lightboxes and Modals */}
      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
      <CreatorStudioModal />
      <AdminUnlockModal />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}
