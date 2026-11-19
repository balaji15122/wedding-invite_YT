import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Sparkles, Shirt, Music, Sun, Flame, Utensils, GlassWater, Calendar } from 'lucide-react';
import { createGoogleCalendarUrl, downloadICSFile } from '../../utils/calendar';

const iconMap = {
  Sun: Sun,
  Music: Music,
  Flame: Flame,
  Utensils: Utensils,
};

export default function EventsSection({ weddingEvents, receptionEvent, dates, venues, couple }) {
  return (
    <section id="events" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs sm:text-sm uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Celebration Itinerary
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-transparent bg-clip-text bg-gold-gradient font-bold">
            The Wedding Ceremonies
          </h2>
          <p className="mt-3 text-gold-200/80 font-cormorant italic text-lg sm:text-xl max-w-2xl mx-auto">
            Sacred rituals, joyous music, and timeless traditions celebrating the union of Krishan & Pooja.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="text-gold-400 text-sm">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>
        </div>

        {/* ── PART 1: Wedding Day Events (3 Dec 2026) ── */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-gold-400/50" />
            <div className="px-5 py-2 rounded-full bg-maroon-900 border border-gold-400 text-gold-300 font-cinzel text-sm sm:text-base font-bold shadow-gold-glow">
              Wedding Day • {dates.weddingFormatted}
            </div>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-gold-400/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {weddingEvents.map((evt, idx) => {
              const IconComp = iconMap[evt.icon] || Sparkles;

              return (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative rounded-3xl p-7 bg-gradient-to-b from-maroon-800/85 to-maroon-950/95 border border-gold-500/35 shadow-royal-card hover:border-gold-400 hover:shadow-gold-glow transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Icon & Time Badge */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gold-500/20 border border-gold-400/50 flex items-center justify-center text-gold-300 group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-maroon-900/90 border border-gold-400/30 text-gold-200 text-xs font-mono font-semibold">
                        <Clock className="w-3.5 h-3.5 text-gold-400" />
                        <span>{evt.time}</span>
                      </div>
                    </div>

                    {/* Ceremony Title */}
                    <h3 className="text-xl sm:text-2xl font-cinzel text-gold-100 font-bold mb-2">
                      {evt.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm font-cormorant italic text-gold-200/90 mb-4 leading-relaxed">
                      "{evt.description}"
                    </p>

                    {/* Details: Venue & Dress Code */}
                    <div className="space-y-2 text-xs sm:text-sm text-gold-300/80 pt-4 border-t border-gold-500/15">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>{evt.venue}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shirt className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-gold-200">Attire:</strong> {evt.dressCode}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── PART 2: Reception Gala (6 Dec 2026) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-maroon-900/95 via-maroon-850 to-maroon-900/95 border-2 border-gold-400/50 shadow-gold-glow-lg overflow-hidden"
        >
          {/* Subtle Golden Shimmer Background Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-cinzel uppercase tracking-widest mb-3">
                <GlassWater className="w-3.5 h-3.5 text-gold-400" />
                Grand Evening Gala
              </div>
              <h3 className="text-3xl sm:text-4xl font-cinzel font-bold text-transparent bg-clip-text bg-gold-gradient">
                {receptionEvent.title}
              </h3>
              <p className="mt-2 text-gold-200/90 font-cormorant italic text-base sm:text-lg">
                "{receptionEvent.description}"
              </p>

              {/* Highlights List */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gold-200">
                {receptionEvent.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reception Fast Facts Card */}
            <div className="w-full lg:w-auto p-6 rounded-2xl bg-maroon-950/90 border border-gold-400/40 text-center min-w-[280px]">
              <div className="text-xs font-cinzel uppercase tracking-wider text-gold-400 mb-1">
                Date & Time
              </div>
              <div className="text-lg font-cinzel font-bold text-gold-100">
                {receptionEvent.dateFormatted}
              </div>
              <div className="text-sm font-mono text-gold-300 mt-1">
                {receptionEvent.time}
              </div>

              <div className="my-4 border-t border-gold-500/20" />

              <div className="text-xs font-cinzel uppercase tracking-wider text-gold-400 mb-1">
                Venue
              </div>
              <div className="text-sm font-cinzel text-gold-200">
                {venues.reception.name}
              </div>
              <div className="text-xs text-gold-300/70 mt-0.5">
                {venues.reception.city}
              </div>

              <div className="mt-4 pt-3 border-t border-gold-500/20">
                <span className="text-[11px] text-gold-400 font-cinzel uppercase tracking-wider block mb-1">
                  Dress Code
                </span>
                <span className="text-xs font-cormorant italic text-gold-100">
                  {receptionEvent.dressCode}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
