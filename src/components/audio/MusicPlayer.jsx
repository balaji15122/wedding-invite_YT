import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sliders } from 'lucide-react';
import { soundEngine } from '../../utils/audioPlayer';

export default function MusicPlayer({ musicInfo }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    // Initialize sound engine with audio track path
    soundEngine.init(musicInfo.trackPath);

    // Subscribe to state updates
    const unsubscribe = soundEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
      setVolume(state.volume);
    });

    return () => unsubscribe();
  }, [musicInfo]);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    soundEngine.toggle();
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    soundEngine.setMute(!isMuted);
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    soundEngine.setVolume(newVol);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Expandable Volume Slider */}
      {showSlider && (
        <div className="bg-maroon-950/90 backdrop-blur-md p-3 rounded-2xl border border-gold-400/40 shadow-gold-glow flex items-center gap-3 animate-fade-in">
          <button
            onClick={handleToggleMute}
            className="text-gold-300 hover:text-gold-100 transition-colors"
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rosewood-light" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 accent-gold-500 cursor-pointer h-1.5 bg-maroon-800 rounded-lg"
          />
          <span className="text-[10px] font-mono text-gold-300/80 w-7">
            {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
          </span>
        </div>
      )}

      {/* Main Floating Vinyl Music Disk */}
      <div className="relative group">
        <button
          onClick={handleTogglePlay}
          onMouseEnter={() => setShowSlider(true)}
          className={`relative w-13 h-13 sm:w-14 sm:h-14 rounded-full p-0.5 bg-gold-gradient shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center`}
          aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
        >
          {/* Inner Vinyl Center */}
          <div className="w-full h-full rounded-full bg-maroon-950 flex items-center justify-center relative overflow-hidden border border-gold-400/30">
            {/* Spinning Grooves (When Playing) */}
            <div
              className={`absolute inset-1 rounded-full border border-gold-500/20 border-dashed ${
                isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
              }`}
            />

            {/* Equalizer Bars or Music Note */}
            {isPlaying ? (
              <div className="flex items-end justify-center gap-0.5 h-4">
                <span className="w-0.5 bg-gold-400 h-3 animate-[pulse_0.6s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-gold-300 h-4 animate-[pulse_0.4s_ease-in-out_infinite_0.2s]" />
                <span className="w-0.5 bg-gold-400 h-2 animate-[pulse_0.7s_ease-in-out_infinite_0.1s]" />
                <span className="w-0.5 bg-gold-300 h-3.5 animate-[pulse_0.5s_ease-in-out_infinite_0.3s]" />
              </div>
            ) : (
              <Play className="w-5 h-5 text-gold-400 ml-0.5" />
            )}
          </div>
        </button>

        {/* Small Volume Toggle Pill */}
        <button
          onClick={() => setShowSlider(!showSlider)}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-500 text-maroon-950 flex items-center justify-center shadow-md hover:bg-gold-400 transition-colors"
          title="Adjust Volume"
          aria-label="Adjust volume settings"
        >
          <Sliders className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
