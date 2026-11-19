import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trails, setTrails] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsEnabled(true);
    } else {
      return;
    }

    let trailId = 0;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Add trail sparkle
      if (Math.random() > 0.4) {
        const newTrail = {
          id: trailId++,
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          size: Math.random() * 4 + 2,
        };
        setTrails((prev) => [...prev.slice(-12), newTrail]);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Decay trails
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(1));
    }, 60);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      clearInterval(interval);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Sparkle Trails */}
      {trails.map((t) => (
        <div
          key={t.id}
          className="absolute rounded-full bg-gold-400 blur-[0.5px] opacity-70 transition-all duration-300"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            width: `${t.size}px`,
            height: `${t.size}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Main Gold Dot */}
      <div
        className={`absolute rounded-full bg-gold-300 border border-gold-500 shadow-gold-glow transition-transform duration-75 ease-out ${
          isHovered ? 'scale-150 bg-amber-200' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '10px',
          height: '10px',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
