import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Sparkles, Heart } from 'lucide-react';
import Envelope3D from '../3d/Envelope3D';
import Background3D from '../3d/Background3D';
import { fireRoyalConfetti, fireWeddingFireworks } from '../../utils/confetti';
import { soundEngine } from '../../utils/audioPlayer';

export default function EnvelopeIntro({ couple, dates, guestName, onEnvelopeOpened }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStartedOpening, setHasStartedOpening] = useState(false);

  const handleOpenClick = () => {
    if (hasStartedOpening) return;
    setHasStartedOpening(true);
    setIsOpen(true);

    // Initial royal confetti burst on wax seal crack
    fireRoyalConfetti();

    // Start background wedding music immediately on this user click
    soundEngine.play();

    // Secondary fireworks when the card fully reveals
    setTimeout(() => {
      fireWeddingFireworks();
    }, 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 1.0, ease: 'easeInOut' } }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-between bg-royal-gradient py-6 sm:py-8 px-4 overflow-hidden"
    >
      {/* ── 3D Ambient Particles & Floating Rose Petals in Background ── */}
      <Background3D />

      {/* Volumetric Radial Light Shafts */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.22)_0%,_rgba(74,10,22,0.4)_50%,_transparent_80%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* ── TOP HEADER: Royal Monogram & Personalized Welcome ── */}
      <div className="relative z-20 text-center max-w-xl mt-1 sm:mt-2">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon-900/90 border border-gold-400/50 shadow-gold-glow text-gold-300 text-xs sm:text-sm tracking-widest uppercase mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
          The Royal Wedding Invitation
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
        </motion.div>

        {/* Personalized Guest Greeting */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-2xl sm:text-3xl font-cinzel text-gold-100 font-bold tracking-wide"
        >
          {guestName ? (
            <>
              Welcome, <span className="text-transparent bg-clip-text bg-gold-shimmer">{guestName}</span>
            </>
          ) : (
            'Welcome, Beloved Guest'
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs sm:text-sm text-gold-200/80 font-cormorant italic mt-1"
        >
          An auspicious royal invitation awaits you from Jaipur
        </motion.p>
      </div>

      {/* ── CENTER: 3D Interactive Royal Envelope ── */}
      <div
        onClick={handleOpenClick}
        className="relative z-30 w-full max-w-xl flex-1 flex flex-col items-center justify-center cursor-pointer my-2 sm:my-4"
      >
        <Envelope3D
          isOpen={isOpen}
          onOpened={onEnvelopeOpened}
          couple={couple}
          dates={dates}
          guestName={guestName}
        />

        {/* Interactive Bounce Hint Pill */}
        {!hasStartedOpening && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 pointer-events-none"
          >
            <div className="px-5 py-2 rounded-full bg-maroon-900/90 backdrop-blur-md border border-gold-400/60 text-gold-200 text-xs sm:text-sm font-cinzel shadow-gold-glow flex items-center gap-2 animate-bounce">
              <span>✨ Tap Envelope to Break Royal Wax Seal ✨</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── BOTTOM: Primary CTA & Music Indicator ── */}
      <div className="relative z-20 text-center max-w-md mb-2 sm:mb-4">
        {!hasStartedOpening ? (
          <button
            onClick={handleOpenClick}
            className="relative group overflow-hidden px-8 py-3.5 sm:px-11 sm:py-4 rounded-full bg-gold-gradient text-maroon-950 font-cinzel font-bold text-sm sm:text-base tracking-wider shadow-gold-glow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {/* Shimmer Light Sweep */}
            <span className="absolute inset-0 w-full h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-maroon-950" />
              <span>Open Royal Invitation</span>
              <Sparkles className="w-4 h-4 text-maroon-950" />
            </span>
          </button>
        ) : (
          <div className="py-2 px-6 rounded-full bg-maroon-900/80 border border-gold-400/40 text-gold-300 font-cinzel text-xs sm:text-sm shadow-gold-glow flex items-center justify-center gap-2 animate-pulse">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Unfolding Royal Card...</span>
            <Sparkles className="w-4 h-4 text-gold-400" />
          </div>
        )}

        {/* Music Notice */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-gold-300/70 font-sans">
          <Volume2 className="w-3.5 h-3.5 text-gold-400" />
          <span>Includes background music (shehnai & sitar symphony)</span>
        </div>
      </div>
    </motion.div>
  );
}
