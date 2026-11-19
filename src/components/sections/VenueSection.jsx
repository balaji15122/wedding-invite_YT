import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, Bed, Phone, ExternalLink, Sparkles } from 'lucide-react';
import Venue3D from '../3d/Venue3D';

export default function VenueSection({ venues, couple }) {
  const [activeVenueTab, setActiveVenueTab] = useState('wedding');
  const activeVenue = activeVenueTab === 'wedding' ? venues.wedding : venues.reception;

  return (
    <section id="venue" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs sm:text-sm uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Destination Jaipur
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-transparent bg-clip-text bg-gold-gradient font-bold">
            Venues & Hospitality
          </h2>
          <p className="mt-3 text-gold-200/80 font-cormorant italic text-lg sm:text-xl max-w-xl mx-auto">
            Experience the royal heritage of the Pink City as we celebrate in grand palace splendor.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="text-gold-400 text-sm">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>
        </div>

        {/* 3D Rotating Royal Palace Dome Model */}
        <div className="mb-12">
          <Venue3D />
        </div>

        {/* Venue Selection Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-maroon-900/90 border border-gold-400/30 shadow-royal-card">
            <button
              onClick={() => setActiveVenueTab('wedding')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-cinzel font-semibold transition-all ${
                activeVenueTab === 'wedding'
                  ? 'bg-gold-gradient text-maroon-950 shadow-gold-glow'
                  : 'text-gold-200 hover:text-gold-100'
              }`}
            >
              Wedding Venue (3 Dec)
            </button>
            <button
              onClick={() => setActiveVenueTab('reception')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-cinzel font-semibold transition-all ${
                activeVenueTab === 'reception'
                  ? 'bg-gold-gradient text-maroon-950 shadow-gold-glow'
                  : 'text-gold-200 hover:text-gold-100'
              }`}
            >
              Reception Venue (6 Dec)
            </button>
          </div>
        </div>

        {/* Main Venue Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Column (5 cols) */}
          <motion.div
            key={activeVenueTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 rounded-3xl p-7 sm:p-9 bg-gradient-to-b from-maroon-850 to-maroon-950 border border-gold-400/40 shadow-royal-card flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-cinzel uppercase tracking-wider mb-4">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                {activeVenueTab === 'wedding' ? 'The Wedding Location' : 'The Reception Location'}
              </div>

              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-100 mb-2">
                {activeVenue.name}
              </h3>
              <p className="text-sm font-cormorant text-gold-200/90 leading-relaxed mb-6">
                {activeVenue.address}
              </p>

              {activeVenue.landmark && (
                <div className="text-xs text-gold-400 font-cinzel mb-4">
                  <strong>Landmark:</strong> {activeVenue.landmark}
                </div>
              )}

              {/* Action: Get Directions Button */}
              <a
                href={activeVenue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gold-gradient text-maroon-950 font-cinzel font-bold text-sm shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all mb-6"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              {/* Contact Phone */}
              {activeVenue.phone && (
                <div className="flex items-center gap-2 text-xs text-gold-300/80 mb-6">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>Venue Inquiries: {activeVenue.phone}</span>
                </div>
              )}
            </div>

            {/* Parking & Stay Info Sub-cards */}
            <div className="space-y-4 pt-6 border-t border-gold-500/20">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-300 shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-cinzel font-bold text-gold-200 uppercase tracking-wider">
                    Valet & Parking
                  </h4>
                  <p className="text-xs font-cormorant text-gold-300/80 mt-0.5">
                    {activeVenue.parkingInfo}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-300 shrink-0">
                  <Bed className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-cinzel font-bold text-gold-200 uppercase tracking-wider">
                    Guest Accommodation
                  </h4>
                  <p className="text-xs font-cormorant text-gold-300/80 mt-0.5">
                    {activeVenue.stayInfo}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Map Embed Column (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-gold-400/40 shadow-royal-card relative min-h-[350px] lg:min-h-full bg-maroon-900">
            <iframe
              title={`${activeVenue.name} Map Location`}
              src={activeVenue.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113847.16523999974!2d75.7483669784381!3d26.91243364951474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40669b9e6ff%3A0xc6c4f03932fa5a74!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-[0.85] contrast-[1.1]"
            />

            {/* Map Decorative Corner Border */}
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-maroon-950/90 backdrop-blur-md border border-gold-400/40 text-gold-200 text-xs font-cinzel">
              📍 Jaipur, Rajasthan
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
