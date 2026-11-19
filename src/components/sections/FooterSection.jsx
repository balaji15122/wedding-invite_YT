import React, { useState, useEffect } from 'react';
import { Heart, Share2, Copy, Check, MessageCircle, Sparkles } from 'lucide-react';
import { getWhatsAppShareUrl } from '../../utils/calendar';
import { fireWeddingFireworks } from '../../utils/confetti';

export default function FooterSection({ couple, dates, guestName }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHashtag, setCopiedHashtag] = useState(false);

  // Trigger celebratory fireworks when footer is reached
  useEffect(() => {
    let triggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered) {
          triggered = true;
          fireWeddingFireworks();
        }
      },
      { threshold: 0.2 }
    );

    const footerElem = document.getElementById('wedding-footer');
    if (footerElem) observer.observe(footerElem);

    return () => observer.disconnect();
  }, []);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleCopyHashtag = () => {
    navigator.clipboard.writeText(couple.hashtag).then(() => {
      setCopiedHashtag(true);
      setTimeout(() => setCopiedHashtag(false), 2500);
    });
  };

  return (
    <footer
      id="wedding-footer"
      className="relative z-10 pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-t from-black via-maroon-950 to-maroon-950/90 border-t border-gold-500/25 text-center overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Monogram Seal */}
        <div className="w-16 h-16 rounded-full mx-auto mb-6 bg-maroon-900 border-2 border-gold-400 shadow-gold-glow flex items-center justify-center">
          <span className="font-cinzel font-bold text-gold-300 text-base">
            {couple.monogram}
          </span>
        </div>

        {/* Closing Thank You Title */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-transparent bg-clip-text bg-gold-gradient">
          Thank You For Being Part Of Our Journey
        </h3>

        <p className="mt-3 text-gold-200/90 font-cormorant italic text-lg sm:text-xl max-w-xl mx-auto">
          "Your love, presence, and divine blessings make our celebration truly complete."
        </p>

        <p className="mt-2 text-xs sm:text-sm font-cinzel text-gold-400 tracking-wider">
          With Warmest Regards,
          <br />
          <span className="text-gold-200 font-semibold">
            {couple.groom.familyTitle} & {couple.bride.familyTitle}
          </span>
        </p>

        {/* Hashtag Badge */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCopyHashtag}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-500/15 hover:bg-gold-500/25 border border-gold-400/40 text-gold-300 font-cinzel font-bold text-sm tracking-widest transition-all group"
          >
            <span>{couple.hashtag}</span>
            {copiedHashtag ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-gold-400 group-hover:scale-110" />
            )}
          </button>
        </div>

        {/* Share Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* WhatsApp Share Button */}
          <a
            href={getWhatsAppShareUrl(couple, dates, guestName)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-cinzel text-xs sm:text-sm font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Share via WhatsApp</span>
          </a>

          {/* Copy Invitation Link */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-maroon-900 border border-gold-400/50 hover:bg-gold-500/10 text-gold-200 font-cinzel text-xs sm:text-sm tracking-wider shadow-sm transition-all"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Invitation Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-gold-400" />
                <span>Copy Invitation Link</span>
              </>
            )}
          </button>
        </div>

        {/* Copyright & Date */}
        <div className="mt-14 pt-6 border-t border-gold-500/15 text-[11px] sm:text-xs text-gold-400/60 font-sans flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} {couple.groom.firstName} & {couple.bride.firstName} Royal Wedding
          </div>
          <div className="flex items-center gap-1.5 text-gold-300/80">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rosewood-light fill-rosewood-light" />
            <span>in Jaipur, Rajasthan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
