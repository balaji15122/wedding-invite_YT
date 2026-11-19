import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Sparkles } from 'lucide-react';

export default function LoveStorySection({ loveStory, couple }) {
  return (
    <section id="story" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs sm:text-sm uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Our Journey of Love
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-transparent bg-clip-text bg-gold-gradient font-bold">
            How Two Hearts Met
          </h2>
          <p className="mt-3 text-gold-200/80 font-cormorant italic text-lg sm:text-xl max-w-xl mx-auto">
            From an unexpected coffee conversation in Jaipur to a lifetime promise of love.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="text-gold-400 text-sm">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Golden Spine Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold-400/10 via-gold-400/60 to-gold-400/10 hidden sm:block" />
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-gold-400/10 via-gold-400/60 to-gold-400/10 sm:hidden" />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            {loveStory.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.step}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Heart Marker */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-maroon-900 border-2 border-gold-400 shadow-gold-glow flex items-center justify-center z-20">
                    <Heart className="w-4 h-4 fill-gold-400 text-gold-400" />
                  </div>

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className={`ml-14 sm:ml-0 w-full sm:w-[45%] ${
                      isEven ? 'sm:pr-10' : 'sm:pl-10'
                    }`}
                  >
                    <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-maroon-800/90 to-maroon-950/95 border border-gold-500/35 shadow-royal-card hover:border-gold-400 transition-all duration-300 group">
                      {/* Milestone Number & Date */}
                      <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-cinzel">
                        <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 font-bold">
                          Chapter {item.step}
                        </span>
                        <div className="flex items-center gap-1.5 text-gold-400/90 font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      {/* Photo Thumbnail */}
                      <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-gold-400/20">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-xs text-gold-200">
                          <MapPin className="w-3 h-3 text-gold-400" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl sm:text-2xl font-cinzel text-gold-100 font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base font-cormorant text-gold-200/90 leading-relaxed italic">
                        "{item.description}"
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
