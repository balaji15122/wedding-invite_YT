import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ couple, blessings, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 250);
          return 100;
        }
        const step = Math.floor(Math.random() * 10) + 8;
        return Math.min(100, prev + step);
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-royal-gradient px-4"
    >
      {/* Background Soft Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none animate-pulse-slow" />

      {/* Ganesh Invocation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-gold-400 font-cinzel text-sm sm:text-base tracking-widest mb-6"
      >
        {blessings.invocation}
      </motion.div>

      {/* Center Animated Mandala & Diya */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
        {/* Rotating Outer Mandala SVG */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full animate-spin-slow text-gold-400/40"
        >
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          {/* 12 Petal Lotus Mandala points */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 100 + 72 * Math.cos(angle);
            const y = 100 + 72 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>

        {/* Counter-Rotating Inner Ring */}
        <svg
          viewBox="0 0 100 100"
          className="absolute w-28 h-28 text-gold-300/30 animate-[spin_12s_linear_infinite_reverse]"
        >
          <polygon
            points="50,5 95,50 50,95 5,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <polygon
            points="50,15 85,50 50,85 15,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </svg>

        {/* Center Glowing Diya SVG */}
        <motion.div
          animate={{ scale: [0.96, 1.05, 0.96] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Diya Flame */}
          <div className="relative">
            <div className="w-5 h-8 bg-gradient-to-t from-amber-500 via-yellow-400 to-white rounded-full blur-[1px] shadow-[0_0_20px_#FFA500]" />
            <div className="absolute top-1 left-1 w-3 h-5 bg-white/80 rounded-full blur-[0.5px]" />
          </div>

          {/* Diya Base */}
          <svg viewBox="0 0 60 25" className="w-14 h-6 text-gold-400 drop-shadow">
            <path
              d="M5 5 Q30 25 55 5 Q45 22 15 22 Z"
              fill="currentColor"
            />
            <line x1="8" y1="6" x2="52" y2="6" stroke="#FFE89E" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </div>

      {/* Couple Names */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-cinzel text-transparent bg-clip-text bg-gold-shimmer font-bold tracking-wider">
          {couple.groom.firstName}{' '}
          <span className="text-rosewood-light font-script text-3xl sm:text-4xl px-1">
            ♥
          </span>{' '}
          {couple.bride.firstName}
        </h1>
        <p className="text-gold-300/70 text-xs sm:text-sm uppercase tracking-widest mt-1 font-cinzel">
          Royal Wedding Celebration
        </p>
      </motion.div>

      {/* Progress Bar & Percentage */}
      <div className="mt-8 w-60 sm:w-72">
        <div className="flex justify-between items-center text-xs text-gold-400/80 mb-2 font-mono">
          <span>Unfolding Royal Invite</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-maroon-900 rounded-full overflow-hidden border border-gold-500/30 p-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-500 via-amber-300 to-gold-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
