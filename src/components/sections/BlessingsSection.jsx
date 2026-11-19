import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function BlessingsSection({ couple, blessings }) {
  return (
    <section id="families" className="py-20 px-4 sm:px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Shloka Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-maroon-900/90 to-maroon-950/95 border-2 border-gold-400/40 shadow-gold-glow text-center mb-20 overflow-hidden"
        >
          {/* Subtle Mandala SVG watermark in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-[380px] h-[380px] text-gold-300">
              <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
              <polygon points="100,10 190,100 100,190 10,100" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Ganesh Invocation */}
          <div className="text-gold-400 font-cinzel text-base sm:text-lg tracking-widest mb-4">
            {blessings.invocation}
          </div>

          {/* Sanskrit Shloka */}
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-cormorant font-semibold text-transparent bg-clip-text bg-gold-shimmer leading-relaxed whitespace-pre-line tracking-wide">
            {blessings.shlokaSanskrit}
          </blockquote>

          {/* Gold Decorative Divider */}
          <div className="my-5 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="text-gold-400 text-sm">❦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>

          {/* Shloka English Meaning */}
          <p className="text-gold-200/90 font-cormorant italic text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            "{blessings.shlokaTranslation}"
          </p>

          <p className="mt-5 text-gold-300/70 font-cinzel text-xs tracking-wider">
            {blessings.familyBlessingNote}
          </p>
        </motion.div>

        {/* Section Title */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs sm:text-sm uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            With Joyous Blessings
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-transparent bg-clip-text bg-gold-gradient font-bold">
            Our Beloved Families
          </h2>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="text-gold-400 text-sm">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>
        </div>

        {/* Two Family Cards: Groom Family & Bride Family */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Groom's Family Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl p-8 bg-gradient-to-b from-maroon-800/80 to-maroon-950/95 border border-gold-400/35 shadow-royal-card hover:border-gold-400 transition-all text-center group"
          >
            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-gold-400/50" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-gold-400/50" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-gold-400/50" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-gold-400/50" />

            <div className="inline-block px-4 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-cinzel uppercase tracking-widest mb-4">
              Groom's Side
            </div>

            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-transparent bg-clip-text bg-gold-gradient">
              {couple.groom.familyTitle}
            </h3>

            <div className="my-4">
              <span className="text-xs uppercase tracking-widest text-gold-400/70 block mb-1">
                Proud Parents
              </span>
              <p className="text-lg sm:text-xl font-cormorant font-semibold text-ivory-100">
                {couple.groom.parents}
              </p>
            </div>

            <div className="pt-4 border-t border-gold-500/20">
              <span className="text-xs uppercase tracking-widest text-gold-400/70 block mb-1">
                Groom
              </span>
              <h4 className="text-xl sm:text-2xl font-cinzel text-gold-200 font-bold">
                {couple.groom.fullName}
              </h4>
              <p className="text-sm font-cormorant italic text-gold-300/80 mt-1">
                {couple.groom.bio}
              </p>
            </div>
          </motion.div>

          {/* Bride's Family Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl p-8 bg-gradient-to-b from-maroon-800/80 to-maroon-950/95 border border-gold-400/35 shadow-royal-card hover:border-gold-400 transition-all text-center group"
          >
            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-gold-400/50" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-gold-400/50" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-gold-400/50" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-gold-400/50" />

            <div className="inline-block px-4 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-cinzel uppercase tracking-widest mb-4">
              Bride's Side
            </div>

            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-transparent bg-clip-text bg-gold-gradient">
              {couple.bride.familyTitle}
            </h3>

            <div className="my-4">
              <span className="text-xs uppercase tracking-widest text-gold-400/70 block mb-1">
                Proud Parents
              </span>
              <p className="text-lg sm:text-xl font-cormorant font-semibold text-ivory-100">
                {couple.bride.parents}
              </p>
            </div>

            <div className="pt-4 border-t border-gold-500/20">
              <span className="text-xs uppercase tracking-widest text-gold-400/70 block mb-1">
                Bride
              </span>
              <h4 className="text-xl sm:text-2xl font-cinzel text-gold-200 font-bold">
                {couple.bride.fullName}
              </h4>
              <p className="text-sm font-cormorant italic text-gold-300/80 mt-1">
                {couple.bride.bio}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
