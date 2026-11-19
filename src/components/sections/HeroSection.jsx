import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, MapPin, Download, Share2, Sparkles, ChevronDown } from 'lucide-react';
import { createGoogleCalendarUrl, downloadICSFile } from '../../utils/calendar';

export default function HeroSection({ couple, dates, venues, guestName }) {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isWeddingDay: false,
    isReceptionCountdown: false,
    isPassed: false,
  });

  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  useEffect(() => {
    function calculateCountdown() {
      const now = new Date().getTime();
      const weddingTime = new Date(dates.weddingDateISO).getTime();
      const weddingEndTime = new Date(dates.weddingEndDateISO).getTime();
      const receptionTime = new Date(dates.receptionDateISO).getTime();
      const receptionEndTime = new Date(dates.receptionEndDateISO).getTime();

      // Check if it's currently Wedding Day (between start and end of wedding day)
      if (now >= weddingTime && now <= weddingEndTime) {
        setTimeLeft((prev) => ({
          ...prev,
          isWeddingDay: true,
          isReceptionCountdown: false,
          isPassed: false,
        }));
        return;
      }

      // Check if wedding has completed but reception is upcoming
      let targetTime = weddingTime;
      let isReceptionCountdown = false;

      if (now > weddingEndTime && now < receptionTime) {
        targetTime = receptionTime;
        isReceptionCountdown = true;
      } else if (now > receptionEndTime) {
        setTimeLeft((prev) => ({
          ...prev,
          isWeddingDay: false,
          isReceptionCountdown: false,
          isPassed: true,
        }));
        return;
      }

      const diff = Math.max(0, targetTime - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isWeddingDay: false,
        isReceptionCountdown,
        isPassed: false,
      });
    }

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [dates]);

  // Calendar event payloads
  const weddingCalendarData = {
    title: `Wedding of ${couple.groom.firstName} & ${couple.bride.firstName}`,
    description: `We warmly invite you to the Royal Wedding of ${couple.groom.fullName} & ${couple.bride.fullName}.\nVenue: ${venues.wedding.name}, ${venues.wedding.address}.\nHashtag: ${couple.hashtag}`,
    location: `${venues.wedding.name}, ${venues.wedding.address}`,
    startISO: dates.weddingDateISO,
    endISO: dates.weddingEndDateISO,
    filename: `Krishan-Pooja-Wedding.ics`,
  };

  const receptionCalendarData = {
    title: `Reception of ${couple.groom.firstName} & ${couple.bride.firstName}`,
    description: `Join us for the Grand Wedding Reception of ${couple.groom.fullName} & ${couple.bride.fullName}.\nVenue: ${venues.reception.name}, ${venues.reception.address}.`,
    location: `${venues.reception.name}, ${venues.reception.address}`,
    startISO: dates.receptionDateISO,
    endISO: dates.receptionEndDateISO,
    filename: `Krishan-Pooja-Reception.ics`,
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Decorative Royal Arch Frame Outline */}
      <div className="absolute inset-x-4 top-16 bottom-10 max-w-5xl mx-auto border border-gold-400/25 rounded-[3rem] pointer-events-none -z-10 shadow-royal-card" />
      <div className="absolute inset-x-6 top-18 bottom-12 max-w-5xl mx-auto border border-gold-300/10 rounded-[2.7rem] pointer-events-none -z-10" />

      {/* Main Content Card */}
      <div className="relative z-10 max-w-3xl mx-auto text-center py-8 sm:py-12 px-4 sm:px-8">
        {/* Personalized Guest Welcome Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-maroon-900/90 border border-gold-400/40 shadow-gold-glow backdrop-blur-md mb-6"
        >
          <Sparkles className="w-4 h-4 text-gold-400 animate-spin-slow" />
          <span className="text-gold-200 text-xs sm:text-sm font-cinzel">
            {guestName ? (
              <>
                Dear <strong className="text-gold-300 font-bold">{guestName}</strong>, you are cordially invited
              </>
            ) : (
              'Dear Guest, you are cordially invited'
            )}
          </span>
          <Sparkles className="w-4 h-4 text-gold-400 animate-spin-slow" />
        </motion.div>

        {/* Eyebrow Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold-300/80 font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase mb-3"
        >
          Save Our Date • We Are Getting Married
        </motion.div>

        {/* Couple Names (Large Calligraphy & Royal Typography) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="py-2"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-cinzel font-bold tracking-wide text-transparent bg-clip-text bg-gold-gradient drop-shadow-md">
            {couple.groom.firstName}
          </h1>
          <div className="my-1 sm:my-2 flex items-center justify-center gap-4">
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold-400/80" />
            <span className="font-script text-4xl sm:text-5xl text-rosewood-light drop-shadow">
              &
            </span>
            <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold-400/80" />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-cinzel font-bold tracking-wide text-transparent bg-clip-text bg-gold-gradient drop-shadow-md">
            {couple.bride.firstName}
          </h1>
        </motion.div>

        {/* Date and Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-gold-100 text-sm sm:text-base font-cinzel"
        >
          <div className="flex items-center gap-2 bg-maroon-900/60 px-4 py-1.5 rounded-full border border-gold-500/20">
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>{dates.weddingFormatted}</span>
          </div>
          <div className="flex items-center gap-2 bg-maroon-900/60 px-4 py-1.5 rounded-full border border-gold-500/20">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span>{venues.wedding.city}</span>
          </div>
        </motion.div>

        {/* Live Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10"
        >
          {timeLeft.isWeddingDay ? (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-rosewood/90 via-maroon-800 to-rosewood/90 border-2 border-gold-400 shadow-gold-glow animate-pulse">
              <h3 className="text-2xl sm:text-3xl font-cinzel text-gold-200 font-bold">
                🎉 Today Is The Auspicious Day! 🎉
              </h3>
              <p className="mt-2 text-ivory-100 font-cormorant italic text-lg">
                The Royal Wedding celebration of {couple.groom.firstName} & {couple.bride.firstName} is happening today!
              </p>
            </div>
          ) : timeLeft.isPassed ? (
            <div className="p-6 rounded-2xl bg-maroon-900/80 border border-gold-400/40">
              <h3 className="text-2xl font-cinzel text-gold-200 font-bold">
                Happily Married! 💍
              </h3>
              <p className="mt-1 text-ivory-200 font-cormorant italic">
                Thank you for your heartfelt love and sacred blessings.
              </p>
            </div>
          ) : (
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-400/80 font-cinzel mb-3">
                {timeLeft.isReceptionCountdown ? 'Countdown to Grand Reception' : 'Countdown to Sacred Pheras'}
              </div>

              {/* 4 Digit Boxes: Days, Hours, Minutes, Seconds */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="relative group p-2.5 sm:p-4 rounded-xl bg-gradient-to-b from-maroon-800/80 to-maroon-950/90 border border-gold-500/35 shadow-royal-card hover:border-gold-400 transition-colors"
                  >
                    <div className="text-2xl sm:text-4xl font-bold font-mono text-transparent bg-clip-text bg-gold-shimmer">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-gold-300/80 font-cinzel mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA Actions: Add to Calendar & RSVP Shortcut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Calendar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-maroon-900/90 border border-gold-400/50 hover:bg-gold-500/10 text-gold-200 text-xs sm:text-sm font-cinzel tracking-wider shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4 text-gold-400" />
              <span>Add to Calendar</span>
              <ChevronDown className="w-3.5 h-3.5 text-gold-400" />
            </button>

            {calendarMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 p-2 rounded-xl bg-maroon-950 border border-gold-400/50 shadow-gold-glow-lg z-50 text-left">
                <div className="px-3 py-1.5 text-[11px] font-cinzel text-gold-400 uppercase tracking-wider border-b border-gold-500/20">
                  Select Event
                </div>
                {/* Wedding Calendar */}
                <div className="py-1">
                  <div className="px-3 py-1 text-xs text-gold-100 font-semibold">
                    Wedding Day (3 Dec 2026)
                  </div>
                  <div className="flex gap-1 px-2">
                    <a
                      href={createGoogleCalendarUrl(weddingCalendarData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-[11px] text-center py-1 rounded bg-maroon-800 hover:bg-gold-500/20 text-gold-200 border border-gold-500/20"
                    >
                      Google Cal
                    </a>
                    <button
                      onClick={() => downloadICSFile(weddingCalendarData)}
                      className="flex-1 text-[11px] text-center py-1 rounded bg-maroon-800 hover:bg-gold-500/20 text-gold-200 border border-gold-500/20"
                    >
                      iCal (.ics)
                    </button>
                  </div>
                </div>

                {/* Reception Calendar */}
                <div className="py-1 mt-1 border-t border-gold-500/10">
                  <div className="px-3 py-1 text-xs text-gold-100 font-semibold">
                    Reception (6 Dec 2026)
                  </div>
                  <div className="flex gap-1 px-2">
                    <a
                      href={createGoogleCalendarUrl(receptionCalendarData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-[11px] text-center py-1 rounded bg-maroon-800 hover:bg-gold-500/20 text-gold-200 border border-gold-500/20"
                    >
                      Google Cal
                    </a>
                    <button
                      onClick={() => downloadICSFile(receptionCalendarData)}
                      className="flex-1 text-[11px] text-center py-1 rounded bg-maroon-800 hover:bg-gold-500/20 text-gold-200 border border-gold-500/20"
                    >
                      iCal (.ics)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Direct RSVP Button */}
          <a
            href="#rsvp"
            className="flex items-center gap-2 px-7 py-3 rounded-full bg-gold-gradient text-maroon-950 text-xs sm:text-sm font-cinzel font-bold tracking-wider shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
          >
            <Heart className="w-4 h-4 fill-maroon-950 text-maroon-950" />
            <span>RSVP With Blessings</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
