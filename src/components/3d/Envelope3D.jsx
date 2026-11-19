import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

/**
 * Ultra-Luxurious Royal 3D Interactive Wedding Envelope
 * Features:
 * - Dynamic 3D tilt parallax with smooth mouse/touch physics
 * - Realtime specular gold foil shimmer that tracks cursor position
 * - Intricate Rajasthani gold filigree & mandala embossing
 * - Sculpted crimson & gold wax seal with "K & P" monogram that cracks
 * - 3D hinged flap with opulent gold foil damask inner lining
 * - Inner gold-trimmed silk card that emerges, rises in 3D, and reveals the invitation
 */
export default function Envelope3D({ isOpen, onOpened, couple, dates, guestName }) {
  const containerRef = useRef(null);

  // Parallax tilt angles
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [animStage, setAnimStage] = useState('closed'); // 'closed' -> 'cracking' -> 'flap-open' -> 'card-rising' -> 'card-unfolded'

  // Mouse & Touch 3D Tilt Parallax Tracking
  const handleMouseMove = (e) => {
    if (isOpen || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 16;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    if (isOpen) return;
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  // Touch move for mobile devices
  const handleTouchMove = (e) => {
    if (isOpen || !containerRef.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = Math.max(-12, Math.min(12, ((y - centerY) / centerY) * -12));
    const rotateY = Math.max(-14, Math.min(14, ((x - centerX) / centerX) * 14));

    setTilt({ rotateX, rotateY, glareX: 50, glareY: 50 });
  };

  // Orchestrate the cinematic opening sequence when isOpen changes
  useEffect(() => {
    if (!isOpen) {
      setAnimStage('closed');
      return;
    }

    // Step 1: Wax seal cracks (0ms)
    setAnimStage('cracking');

    // Step 2: Flap pivots open (400ms)
    const timer1 = setTimeout(() => {
      setAnimStage('flap-open');
    }, 450);

    // Step 3: Inner card slides out of envelope (950ms)
    const timer2 = setTimeout(() => {
      setAnimStage('card-rising');
    }, 950);

    // Step 4: Card expands & presents invitation (1700ms)
    const timer3 = setTimeout(() => {
      setAnimStage('card-unfolded');
    }, 1700);

    // Step 5: Notify parent to transition to main site (2600ms)
    const timer4 = setTimeout(() => {
      if (onOpened) onOpened();
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isOpen, onOpened]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      className="relative w-full max-w-[460px] sm:max-w-[520px] aspect-[1.42/1] select-none [perspective:1400px] flex items-center justify-center p-2"
    >
      {/* 3D Tilting Wrapper */}
      <div
        className="relative w-full h-full transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        style={{
          transform: isOpen
            ? 'rotateX(0deg) rotateY(0deg) translateY(20px)'
            : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
      >
        {/* Soft Ambient Shadow Under Envelope */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-black/60 rounded-[100%] blur-xl pointer-events-none transition-all duration-500"
          style={{
            transform: `translateX(-50%) scale(${isOpen ? 1.15 : 1})`,
            opacity: isOpen ? 0.8 : 0.6,
          }}
        />

        {/* ══════════════════════════════════════════════════════════
            1. INNER INVITATION CARD (Slides out in 3D)
           ══════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-x-5 top-5 bottom-4 rounded-2xl bg-gradient-to-b from-[#FFFDF7] via-[#FFF9EC] to-[#F7EED8] p-5 sm:p-7 shadow-2xl transition-all duration-700 ease-out [transform-style:preserve-3d] border-2 border-gold-400/80"
          style={{
            zIndex: animStage === 'card-rising' || animStage === 'card-unfolded' ? 35 : 10,
            transform:
              animStage === 'card-unfolded'
                ? 'translateY(-140px) translateZ(80px) scale(1.08)'
                : animStage === 'card-rising'
                ? 'translateY(-110px) translateZ(50px) scale(1.03)'
                : 'translateY(15px) translateZ(5px) scale(0.95)',
            opacity: animStage === 'closed' ? 0.35 : 1,
            boxShadow:
              animStage === 'card-unfolded'
                ? '0 30px 60px -12px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.4)'
                : '0 10px 25px rgba(0,0,0,0.3)',
          }}
        >
          {/* Card Gold Double Border & Corner Flourishes */}
          <div className="absolute inset-2 sm:inset-3 border border-gold-500/60 rounded-xl pointer-events-none" />
          <div className="absolute inset-3 sm:inset-4 border border-gold-400/30 rounded-lg pointer-events-none" />
          
          {/* 4 Corner Ornaments */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-500 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-500 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-500 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-500 pointer-events-none" />

          {/* Card Content */}
          <div className="relative h-full flex flex-col items-center justify-between text-center py-1">
            {/* Ganesh Motif & Invocation */}
            <div>
              <div className="w-7 h-7 mx-auto text-gold-600 mb-0.5">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-gold-600 drop-shadow-sm">
                  <path d="M50 15 C42 15 35 22 35 30 C35 35 38 40 42 43 C38 46 32 52 32 60 C32 72 40 82 50 82 C60 82 68 72 68 60 C68 52 62 46 58 43 C62 40 65 35 65 30 C65 22 58 15 50 15 Z M50 25 C54 25 57 28 57 32 C57 36 54 39 50 39 C46 39 43 36 43 32 C43 28 46 25 50 25 Z" />
                  <circle cx="50" cy="20" r="3" fill="#D4AF37" />
                </svg>
              </div>
              <div className="text-[10px] sm:text-xs font-cinzel text-gold-700 tracking-widest uppercase">
                ॥ श्री गणेशाय नमः ॥
              </div>
            </div>

            {/* Couple Names in Golden Calligraphy */}
            <div className="my-auto py-1">
              <div className="text-[10px] sm:text-[11px] font-cinzel text-maroon-900/70 uppercase tracking-widest mb-1">
                Together With Their Families
              </div>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-700 via-amber-600 to-gold-700 leading-tight">
                {couple.groom.firstName}
              </h2>
              <div className="my-0.5 flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-gold-400/60" />
                <span className="font-script text-xl sm:text-2xl text-rosewood">weds</span>
                <span className="h-px w-8 bg-gold-400/60" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-700 via-amber-600 to-gold-700 leading-tight">
                {couple.bride.firstName}
              </h2>
            </div>

            {/* Date & Destination */}
            <div className="border-t border-gold-400/40 pt-1.5 w-full max-w-[280px]">
              <div className="text-[11px] sm:text-xs font-cinzel font-bold text-maroon-950">
                {dates.weddingFormatted}
              </div>
              <div className="text-[10px] sm:text-[11px] font-cormorant italic text-gold-800">
                The Royal Palace Banquet • Jaipur, Rajasthan
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            2. ENVELOPE BACK WALL (POCKET INTERIOR)
           ══════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#3E060F] to-[#1C0206] border-2 border-gold-500/50 shadow-2xl overflow-hidden [transform:translateZ(0px)]"
        >
          {/* Top Left & Top Right Gold Corner Ornaments */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-gold-400/80 pointer-events-none" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-gold-400/80 pointer-events-none" />

          {/* Velvet Texture Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        </div>

        {/* ══════════════════════════════════════════════════════════
            3. ENVELOPE FRONT POUCH (Bottom Pocket)
           ══════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-x-0 bottom-0 h-[74%] rounded-b-2xl bg-gradient-to-b from-[#4A0A16] via-[#38060F] to-[#24040A] border-b-2 border-x-2 border-gold-500/60 shadow-[0_-8px_20px_rgba(0,0,0,0.5)] overflow-hidden [transform:translateZ(20px)]"
        >
          {/* Dynamic Gold Specular Glare following mouse position */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60"
            style={{
              background: `radial-gradient(circle 260px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,223,115,0.25) 0%, transparent 70%)`,
            }}
          />

          {/* Intricate Gold Foil Filigree Artwork on Front Pocket */}
          <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none">
            {/* Top Gold Border Piping with Scallop Trim */}
            <div className="w-full flex items-center justify-center">
              <svg viewBox="0 0 500 24" className="w-full h-5 text-gold-400 drop-shadow">
                <path
                  d="M0 4 Q125 18 250 18 Q375 18 500 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M0 10 Q125 24 250 24 Q375 24 500 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            {/* Centered Royal Gold Mandala Crest */}
            <div className="relative my-auto flex items-center justify-center opacity-85">
              <svg viewBox="0 0 200 200" className="w-28 h-28 sm:w-32 sm:h-32 text-gold-400/70">
                <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="76" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1.5" />
                {/* 8 Lotus Petals */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const deg = i * 45;
                  return (
                    <g key={i} transform={`rotate(${deg} 100 100)`}>
                      <path
                        d="M100 24 Q108 55 100 65 Q92 55 100 24 Z"
                        fill="rgba(212,175,55,0.15)"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}
                <circle cx="100" cy="100" r="22" fill="rgba(74,10,22,0.8)" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="8" fill="#ECCB5C" />
              </svg>
            </div>

            {/* Bottom Filigree Flourish & Monogram Inscription */}
            <div className="text-center pb-1">
              <div className="text-[9px] sm:text-[10px] font-cinzel text-gold-300 tracking-[0.25em] uppercase">
                {couple.hashtag}
              </div>
            </div>
          </div>

          {/* Left & Right Corner Kundan Gold Accents */}
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gold-400/80 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gold-400/80 pointer-events-none" />
        </div>

        {/* ══════════════════════════════════════════════════════════
            4. 3D TRIANGULAR FLAP (Pivots Open on Crease)
           ══════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-x-0 top-0 h-[62%] origin-top transition-transform duration-700 ease-in-out [transform-style:preserve-3d]"
          style={{
            zIndex: animStage === 'card-rising' || animStage === 'card-unfolded' ? 15 : 30,
            transform:
              animStage === 'closed' || animStage === 'cracking'
                ? 'rotateX(0deg) translateZ(22px)'
                : 'rotateX(185deg) translateZ(22px)',
          }}
        >
          {/* Flap Outer Surface (Maroon with Gold Scalloped Trim) */}
          <div className="relative w-full h-full [backface-visibility:hidden]">
            <svg
              viewBox="0 0 520 230"
              preserveAspectRatio="none"
              className="w-full h-full filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)]"
            >
              <defs>
                <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5B0F1A" />
                  <stop offset="60%" stopColor="#4A0A16" />
                  <stop offset="100%" stopColor="#30040B" />
                </linearGradient>
                <linearGradient id="goldBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#AA771C" />
                  <stop offset="50%" stopColor="#FFE89E" />
                  <stop offset="100%" stopColor="#AA771C" />
                </linearGradient>
              </defs>

              {/* Triangle Flap Body */}
              <polygon
                points="0,0 520,0 260,225"
                fill="url(#flapGrad)"
                stroke="rgba(212,175,55,0.4)"
                strokeWidth="1"
              />

              {/* Gold Foil Border Inset */}
              <polyline
                points="16,0 260,210 504,0"
                fill="none"
                stroke="url(#goldBorderGrad)"
                strokeWidth="3"
              />
              <polyline
                points="24,0 260,200 496,0"
                fill="none"
                stroke="url(#goldBorderGrad)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Flap V-Tip Lotus Ornament */}
              <circle cx="260" cy="180" r="14" fill="#D4AF37" opacity="0.3" />
              <circle cx="260" cy="180" r="5" fill="#FFE89E" />
            </svg>

            {/* Specular sheen over flap */}
            <div
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                background: `radial-gradient(circle 240px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,223,115,0.3) 0%, transparent 60%)`,
              }}
            />
          </div>

          {/* Flap Inner Lining (Shown when flipped open: Royal Gold Damask Pattern) */}
          <div
            className="absolute inset-0 w-full h-full [transform:rotateX(180deg)] [backface-visibility:hidden] overflow-hidden rounded-t-2xl"
          >
            <svg
              viewBox="0 0 520 230"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <polygon
                points="0,0 520,0 260,225"
                fill="#24040A"
              />
              {/* Inner Gold Foil Chevron Lines */}
              <polyline
                points="16,0 260,210 504,0"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
              />
              <polyline
                points="36,0 260,190 484,0"
                fill="none"
                stroke="#FFE89E"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
            {/* Gold foil brocade texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
          </div>

          {/* ══════════════════════════════════════════════════════════
              5. SCULPTED ROYAL WAX SEAL (Embossed "K & P")
             ══════════════════════════════════════════════════════════ */}
          <div
            className="absolute left-1/2 bottom-[-18px] sm:bottom-[-22px] -translate-x-1/2 cursor-pointer transition-all duration-300"
            style={{
              transform: `translateX(-50%) ${
                animStage === 'cracking'
                  ? 'scale(1.2)'
                  : animStage !== 'closed'
                  ? 'scale(0) rotate(25deg)'
                  : 'scale(1)'
              }`,
              opacity: animStage !== 'closed' && animStage !== 'cracking' ? 0 : 1,
            }}
          >
            {/* Wax Seal Outer Glow */}
            <div className="absolute inset-0 rounded-full bg-gold-400/40 blur-md animate-pulse" />

            {/* Wax Scalloped Medallion */}
            <div className="relative w-15 h-15 sm:w-17 sm:h-17 rounded-full bg-gradient-to-br from-[#9E1428] via-[#7D0C1B] to-[#45050D] p-1 shadow-[0_6px_16px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.3)] border border-[#C53046]">
              {/* Melted Wax Rim Texture */}
              <div className="w-full h-full rounded-full border-2 border-dashed border-gold-400/70 p-1 flex items-center justify-center bg-gradient-to-tr from-[#650814] to-[#8E1325]">
                {/* Center Monogram Emblem */}
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#8E1325] to-[#4A050E] flex flex-col items-center justify-center shadow-inner border border-gold-400/50">
                  <span className="text-[8px] sm:text-[9px] text-gold-300 leading-none">👑</span>
                  <span className="font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2B2] via-[#ECCB5C] to-[#B88B22] text-xs sm:text-sm tracking-wider">
                    {couple.monogram}
                  </span>
                </div>
              </div>

              {/* Dynamic Seal Cracking Overlay */}
              {animStage === 'cracking' && (
                <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-gold-300 animate-ping">
                    <line x1="20" y1="20" x2="80" y2="80" stroke="#FFF" strokeWidth="4" />
                    <line x1="80" y1="20" x2="20" y2="80" stroke="#FFF" strokeWidth="4" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
