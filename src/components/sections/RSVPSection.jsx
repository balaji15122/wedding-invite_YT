import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Users, MessageSquare, CheckCircle, Sparkles, Phone, Mail } from 'lucide-react';
import { fireRoyalConfetti, fireWeddingFireworks } from '../../utils/confetti';

export default function RSVPSection({ rsvp, couple, dates, defaultGuestName }) {
  const [formData, setFormData] = useState({
    name: defaultGuestName || '',
    phone: '',
    guestsCount: 1,
    attendance: 'both', // 'wedding', 'reception', 'both', 'regret'
    dietary: 'vegetarian',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Check localStorage for prior submission
  useEffect(() => {
    try {
      const savedRSVP = localStorage.getItem('krishan_pooja_wedding_rsvp');
      if (savedRSVP) {
        const parsed = JSON.parse(savedRSVP);
        setSubmittedData(parsed);
        setIsSubmitted(true);
      }
    } catch (e) {
      console.warn('Could not read RSVP from localStorage', e);
    }
  }, []);

  // Update default guest name if prop arrives late
  useEffect(() => {
    if (defaultGuestName && !formData.name) {
      setFormData((prev) => ({ ...prev, name: defaultGuestName }));
    }
  }, [defaultGuestName]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submission = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem('krishan_pooja_wedding_rsvp', JSON.stringify(submission));
    setSubmittedData(submission);
    setIsSubmitted(true);

    // Trigger royal confetti & fireworks celebration!
    fireRoyalConfetti();
    fireWeddingFireworks();

    // ══════════════════════════════════════════════════════════════════════
    // BACKEND INTEGRATION HOOK (GOOGLE SHEETS / REST API / SUPABASE / AIRTABLE)
    // ══════════════════════════════════════════════════════════════════════
    // To send this RSVP to your Google Sheet or backend API, simply uncomment:
    /*
    fetch('https://your-backend-api.com/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    }).catch(err => console.error('RSVP upload failed:', err));
    */
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    <section id="rsvp" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs sm:text-sm uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Join the Festivities
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-transparent bg-clip-text bg-gold-gradient font-bold">
            RSVP & Blessings
          </h2>
          <p className="mt-3 text-gold-200/80 font-cormorant italic text-lg sm:text-xl max-w-xl mx-auto">
            Your gracious presence will bring joy and auspicious light to our new beginning.
          </p>
          <div className="mt-2 text-xs font-cinzel text-gold-400 uppercase tracking-wider">
            Kindly respond by {rsvp.deadline}
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="text-gold-400 text-sm">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>
        </div>

        {/* Form Container */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-maroon-850 to-maroon-950 border-2 border-gold-400/40 shadow-gold-glow overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-gold-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Gupta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-maroon-900/90 border border-gold-500/30 text-gold-100 placeholder-gold-500/40 focus:outline-none focus:border-gold-400 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-gold-300 mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-maroon-900/90 border border-gold-500/30 text-gold-100 placeholder-gold-500/40 focus:outline-none focus:border-gold-400 transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Number of Guests & Attendance Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-gold-300 mb-2">
                      Total Attending Guests (Including You) *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl bg-maroon-900/90 border border-gold-500/30 text-gold-100 focus:outline-none focus:border-gold-400 text-sm appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, '7+'].map((num) => (
                          <option key={num} value={num} className="bg-maroon-950 text-gold-100">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                      <Users className="w-4 h-4 text-gold-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-gold-300 mb-2">
                      Will You Join Us? *
                    </label>
                    <select
                      value={formData.attendance}
                      onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-maroon-900/90 border border-gold-500/30 text-gold-100 focus:outline-none focus:border-gold-400 text-sm"
                    >
                      <option value="both" className="bg-maroon-950 text-gold-100">
                        Joyfully Attending Both Wedding & Reception
                      </option>
                      <option value="wedding" className="bg-maroon-950 text-gold-100">
                        Attending Wedding Only (3 Dec 2026)
                      </option>
                      <option value="reception" className="bg-maroon-950 text-gold-100">
                        Attending Reception Only (6 Dec 2026)
                      </option>
                      <option value="regret" className="bg-maroon-950 text-gold-100">
                        Celebrating From Afar (Sending Blessings)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Warm Wishes & Message for the Couple */}
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-gold-300 mb-2">
                    Message / Blessings for Krishan & Pooja
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write a warm note, blessing or memory for the newlyweds..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-maroon-900/90 border border-gold-500/30 text-gold-100 placeholder-gold-500/40 focus:outline-none focus:border-gold-400 text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-gold-gradient text-maroon-950 font-cinzel font-bold text-sm sm:text-base tracking-wider shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
                  >
                    <Heart className="w-4 h-4 fill-maroon-950" />
                    <span>Confirm RSVP & Send Blessings</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8 px-4"
              >
                <div className="w-16 h-16 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center text-gold-300 mx-auto mb-4 shadow-gold-glow animate-bounce">
                  <CheckCircle className="w-8 h-8 text-gold-400" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-transparent bg-clip-text bg-gold-gradient">
                  Dhanyawaad, {submittedData?.name || 'Dear Guest'}!
                </h3>
                <p className="mt-2 text-gold-200/90 font-cormorant italic text-lg sm:text-xl max-w-lg mx-auto">
                  Your heartfelt RSVP has been received with boundless joy. We eagerly await welcoming you and your family in Jaipur!
                </p>

                <div className="mt-6 inline-block text-left p-4 rounded-xl bg-maroon-900/70 border border-gold-400/20 text-xs sm:text-sm text-gold-200 space-y-1">
                  <div>
                    <strong>Attending:</strong>{' '}
                    {submittedData?.attendance === 'both'
                      ? 'Both Wedding & Reception'
                      : submittedData?.attendance === 'wedding'
                      ? 'Wedding Day (3 Dec 2026)'
                      : submittedData?.attendance === 'reception'
                      ? 'Grand Reception (6 Dec 2026)'
                      : 'Sending Blessings from Afar'}
                  </div>
                  <div>
                    <strong>Guests Confirmed:</strong> {submittedData?.guestsCount || 1}
                  </div>
                  {submittedData?.message && (
                    <div className="italic text-gold-300/80 pt-1">
                      "{submittedData.message}"
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={handleEdit}
                    className="text-xs font-cinzel text-gold-400 hover:text-gold-200 underline tracking-wider"
                  >
                    Need to update your response? Click here
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Contact Help */}
          <div className="mt-8 pt-6 border-t border-gold-500/15 flex flex-wrap items-center justify-around gap-4 text-xs text-gold-300/70">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>RSVP Contact: {rsvp.primaryContactName} ({rsvp.phone})</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold-400" />
              <span>{rsvp.email}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
