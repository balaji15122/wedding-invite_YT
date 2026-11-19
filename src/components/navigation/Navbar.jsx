import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function Navbar({ couple, guestName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Families', href: '#families' },
    { label: 'Love Story', href: '#story' },
    { label: 'Ceremonies', href: '#events' },
    { label: 'Venues', href: '#venue' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp', isPrimary: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-maroon-950/90 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-royal-card'
          : 'bg-gradient-to-b from-maroon-950/80 to-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-maroon-900 border border-gold-400 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
            <span className="font-cinzel font-bold text-gold-300 text-sm">
              {couple.monogram}
            </span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="font-cinzel text-gold-200 text-sm font-semibold tracking-wider">
              {couple.groom.firstName} & {couple.bride.firstName}
            </div>
            <div className="text-[10px] font-cinzel text-gold-400/80 tracking-widest uppercase">
              Jaipur, 2026
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs font-cinzel tracking-wider transition-colors uppercase ${
                link.isPrimary
                  ? 'px-5 py-2 rounded-full bg-gold-gradient text-maroon-950 font-bold shadow-gold-glow hover:scale-105 transition-all'
                  : 'text-gold-200 hover:text-gold-100'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="#rsvp"
            className="px-3.5 py-1.5 rounded-full bg-gold-gradient text-maroon-950 text-xs font-cinzel font-bold shadow-sm"
          >
            RSVP
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-maroon-900 border border-gold-400/40 text-gold-300 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-maroon-950/98 backdrop-blur-xl border-b border-gold-400/30 px-6 py-6 space-y-4 animate-fade-in shadow-2xl">
          {guestName && (
            <div className="text-xs text-gold-300 font-cinzel pb-2 border-b border-gold-500/20">
              Honoured Guest: <strong>{guestName}</strong>
            </div>
          )}
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-cinzel tracking-wider text-gold-200 hover:text-gold-100 py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
