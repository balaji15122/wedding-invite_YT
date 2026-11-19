import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { weddingData } from './data/weddingData';
import LoadingScreen from './components/intro/LoadingScreen';
import EnvelopeIntro from './components/intro/EnvelopeIntro';
import Background3D from './components/3d/Background3D';
import Navbar from './components/navigation/Navbar';
import HeroSection from './components/sections/HeroSection';
import BlessingsSection from './components/sections/BlessingsSection';
import LoveStorySection from './components/sections/LoveStorySection';
import EventsSection from './components/sections/EventsSection';
import VenueSection from './components/sections/VenueSection';
import GallerySection from './components/sections/GallerySection';
import RSVPSection from './components/sections/RSVPSection';
import FooterSection from './components/sections/FooterSection';
import MusicPlayer from './components/audio/MusicPlayer';
import CustomCursor from './components/ui/CustomCursor';

export default function App() {
  // App stages: 'loading' -> 'envelope' -> 'opened'
  const [stage, setStage] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const stageParam = params.get('stage');
        if (stageParam === 'envelope' || stageParam === 'opened') {
          return stageParam;
        }
      } catch (e) {
        // fallback
      }
    }
    return 'loading';
  });
  const [guestName, setGuestName] = useState('');

  // Read URL query parameter: ?guest=Rahul%20Gupta
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const guestParam = urlParams.get('guest');
      if (guestParam) {
        setGuestName(guestParam.trim());
      }
    } catch (e) {
      console.warn('URL parsing notice:', e);
    }
  }, []);

  // Update dynamic document title and meta description from weddingData
  useEffect(() => {
    const titleText = `${weddingData.couple.groom.firstName} weds ${weddingData.couple.bride.firstName} — ${weddingData.dates.weddingDateShort} | Royal Wedding Invitation`;
    document.title = titleText;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `We cordially invite you to celebrate the royal wedding of ${weddingData.couple.groom.fullName} & ${weddingData.couple.bride.fullName} on ${weddingData.dates.weddingFormatted} in Jaipur, Rajasthan.`
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        'content',
        `${weddingData.couple.groom.firstName} & ${weddingData.couple.bride.firstName} — Royal Wedding Invitation`
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-maroon-950 text-ivory-100 selection:bg-gold-500/30 selection:text-gold-200">
      {/* Custom Desktop Gold Sparkle Cursor */}
      <CustomCursor />

      {/* Floating Ambient Music Controller (Persists throughout the opened site) */}
      {stage === 'opened' && <MusicPlayer musicInfo={weddingData.music} />}

      <AnimatePresence mode="wait">
        {/* Stage 1: Loading Mandala & Progress */}
        {stage === 'loading' && (
          <LoadingScreen
            key="loading-screen"
            couple={weddingData.couple}
            blessings={weddingData.blessings}
            onComplete={() => setStage('envelope')}
          />
        )}

        {/* Stage 2: 3D Envelope Intro & Wax Seal Break */}
        {stage === 'envelope' && (
          <EnvelopeIntro
            key="envelope-intro"
            couple={weddingData.couple}
            dates={weddingData.dates}
            guestName={guestName}
            onEnvelopeOpened={() => setStage('opened')}
          />
        )}
      </AnimatePresence>

      {/* Stage 3: Full Unfolded 3D Wedding Experience */}
      {stage === 'opened' && (
        <motion.div
          key="main-experience"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-10"
        >
          {/* Persistent 3D Background Canvas (Petals, Stardust, Floating Diyas) */}
          <Background3D />

          {/* Navigation Bar */}
          <Navbar couple={weddingData.couple} guestName={guestName} />

          {/* Main Content Sections */}
          <main>
            {/* 1. Hero Section with Live Countdown & Guest Welcome */}
            <HeroSection
              couple={weddingData.couple}
              dates={weddingData.dates}
              venues={weddingData.venues}
              guestName={guestName}
            />

            {/* 2. Sacred Blessings & Families */}
            <BlessingsSection
              couple={weddingData.couple}
              blessings={weddingData.blessings}
            />

            {/* 3. Our Love Story Milestones */}
            <LoveStorySection
              loveStory={weddingData.loveStory}
              couple={weddingData.couple}
            />

            {/* 4. Wedding Events & Reception Gala */}
            <EventsSection
              weddingEvents={weddingData.weddingEvents}
              receptionEvent={weddingData.receptionEvent}
              dates={weddingData.dates}
              venues={weddingData.venues}
              couple={weddingData.couple}
            />

            {/* 5. Venues, 3D Palace Dome & Directions */}
            <VenueSection
              venues={weddingData.venues}
              couple={weddingData.couple}
            />

            {/* 6. 3D Photo Gallery */}
            <GallerySection
              gallery={weddingData.gallery}
              couple={weddingData.couple}
            />

            {/* 7. RSVP Form */}
            <RSVPSection
              rsvp={weddingData.rsvp}
              couple={weddingData.couple}
              dates={weddingData.dates}
              defaultGuestName={guestName}
            />
          </main>

          {/* 8. Footer & Fireworks */}
          <FooterSection
            couple={weddingData.couple}
            dates={weddingData.dates}
            guestName={guestName}
          />
        </motion.div>
      )}
    </div>
  );
}
