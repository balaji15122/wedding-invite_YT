import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function GallerySection({ gallery, couple }) {
  const [activePhoto, setActivePhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openLightbox = (index) => {
    setSelectedIndex(index);
    setActivePhoto(gallery[index]);
  };

  const closeLightbox = () => {
    setActivePhoto(null);
  };

  const showNext = (e) => {
    e.stopPropagation();
    const nextIdx = (selectedIndex + 1) % gallery.length;
    setSelectedIndex(nextIdx);
    setActivePhoto(gallery[nextIdx]);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    const prevIdx = (selectedIndex - 1 + gallery.length) % gallery.length;
    setSelectedIndex(prevIdx);
    setActivePhoto(gallery[prevIdx]);
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs sm:text-sm uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
            Cherished Memories
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-transparent bg-clip-text bg-gold-gradient font-bold tracking-wide">
            Moments in Time
          </h2>
          <p className="mt-3 text-gold-200/80 font-cormorant italic text-lg sm:text-xl max-w-xl mx-auto">
            Glimpses of love, laughter, and timeless heritage as {couple.groom.firstName} and {couple.bride.firstName} begin their forever journey.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="text-gold-400 text-sm">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>
        </div>

        {/* 3D Tilted Photo Grid with Perspective */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1200px]">
          {gallery.map((photo, index) => {
            // Alternating 3D tilt angles for gallery frames
            const tiltAngles = [
              '-rotate-1 sm:-rotate-2 hover:rotate-0',
              'rotate-1 sm:rotate-2 hover:rotate-0',
              '-rotate-2 sm:-rotate-1 hover:rotate-0',
              'rotate-2 sm:rotate-1 hover:rotate-0',
              '-rotate-1 sm:-rotate-2 hover:rotate-0',
              'rotate-1 sm:rotate-2 hover:rotate-0',
            ];

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.04,
                  translateZ: 30,
                  transition: { duration: 0.3 },
                }}
                onClick={() => openLightbox(index)}
                className={`group relative cursor-pointer rounded-2xl p-3 bg-gradient-to-b from-maroon-800/90 to-maroon-950/95 border-2 border-gold-500/40 shadow-royal-card hover:shadow-gold-glow-lg transition-all duration-500 transform ${tiltAngles[index % tiltAngles.length]}`}
              >
                {/* Ornate Gold Corner Accents */}
                <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-gold-300 pointer-events-none z-10" />
                <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-gold-300 pointer-events-none z-10" />
                <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-gold-300 pointer-events-none z-10" />
                <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-gold-300 pointer-events-none z-10" />

                {/* Photo Frame Container */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-maroon-900">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95 group-hover:brightness-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Hover Floating Action */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-cinzel text-gold-100 font-semibold text-lg drop-shadow">
                          {photo.title}
                        </h4>
                        <p className="text-gold-200/90 text-sm font-cormorant italic">
                          {photo.subtitle}
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-gold-500/80 text-maroon-950 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Underneath Caption */}
                <div className="mt-3 text-center">
                  <span className="text-xs tracking-widest text-gold-400 font-cinzel">
                    {photo.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-maroon-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gold-500/20 hover:bg-gold-500/40 text-gold-200 border border-gold-400/50 flex items-center justify-center z-50 transition-colors"
              aria-label="Close photo view"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Prev Button */}
            <button
              onClick={showPrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold-500/20 hover:bg-gold-500/40 text-gold-200 border border-gold-400/50 flex items-center justify-center z-50 transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Button */}
            <button
              onClick={showNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold-500/20 hover:bg-gold-500/40 text-gold-200 border border-gold-400/50 flex items-center justify-center z-50 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border-2 border-gold-400/60 shadow-gold-glow-lg bg-maroon-900 p-2 sm:p-3"
            >
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto mx-auto object-contain rounded-xl"
              />
              <div className="py-3 px-4 text-center">
                <h3 className="text-xl font-cinzel text-gold-200 font-bold">
                  {activePhoto.title}
                </h3>
                <p className="text-sm font-cormorant italic text-gold-300/80">
                  {activePhoto.subtitle}
                </p>
                <div className="mt-1 text-xs text-gold-400/60">
                  Photo {selectedIndex + 1} of {gallery.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
