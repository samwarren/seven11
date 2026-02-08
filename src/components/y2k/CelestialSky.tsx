'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  brightness: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 4,
    brightness: 0.4 + Math.random() * 0.6,
  }));
}

function MoonSvg() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" className="drop-shadow-lg">
      <defs>
        <radialGradient id="moon-glow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#fef9c3" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#fef9c3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moon-face" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#fefce8" />
          <stop offset="100%" stopColor="#fde68a" />
        </radialGradient>
      </defs>
      {/* outer glow */}
      <circle cx="30" cy="30" r="28" fill="url(#moon-glow)">
        <animate attributeName="r" values="28;30;28" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* moon body - crescent effect */}
      <circle cx="30" cy="30" r="18" fill="url(#moon-face)" />
      {/* craters */}
      <circle cx="24" cy="25" r="3" fill="#fde68a" opacity="0.5" />
      <circle cx="34" cy="20" r="2" fill="#fde68a" opacity="0.4" />
      <circle cx="30" cy="34" r="2.5" fill="#fde68a" opacity="0.45" />
      <circle cx="22" cy="33" r="1.5" fill="#fde68a" opacity="0.35" />
      {/* shadow for crescent effect */}
      <circle cx="38" cy="28" r="14" fill="#0c4a6e" opacity="0.25" />
    </svg>
  );
}

function TwinklingStar({ star }: { star: Star }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
      }}
    >
      {/* 4-pointed star shape */}
      <svg
        width={star.size * 6}
        height={star.size * 6}
        viewBox="0 0 20 20"
        style={{
          filter: `drop-shadow(0 0 ${star.size}px rgba(255,255,200,${star.brightness * 0.5}))`,
        }}
      >
        <path
          d="M10,0 L11.5,8 L20,10 L11.5,12 L10,20 L8.5,12 L0,10 L8.5,8Z"
          fill={`rgba(255,255,230,${star.brightness})`}
        >
          <animate
            attributeName="opacity"
            values={`${star.brightness};${star.brightness * 0.3};${star.brightness};${star.brightness * 0.6};${star.brightness}`}
            dur={`${star.duration}s`}
            begin={`${star.delay}s`}
            repeatCount="indefinite"
          />
        </path>
        <circle cx="10" cy="10" r="1" fill={`rgba(255,255,255,${star.brightness})`}>
          <animate
            attributeName="opacity"
            values={`${star.brightness};${star.brightness * 0.2};${star.brightness}`}
            dur={`${star.duration * 0.7}s`}
            begin={`${star.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

export function CelestialSky() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStars(generateStars(50));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* dark sky gradient overlay - very subtle so it doesn't darken the page too much */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(12,74,110,0.08) 0%, rgba(12,74,110,0.02) 30%, transparent 60%)',
        }}
      />

      {/* Moon - top right */}
      <div className="absolute right-[12%] top-[3%] opacity-60">
        <MoonSvg />
      </div>

      {/* Twinkling stars scattered everywhere */}
      {stars.map((star) => (
        <TwinklingStar key={star.id} star={star} />
      ))}

      {/* A few extra bright stars */}
      <div className="absolute left-[8%] top-[5%] opacity-70">
        <svg width="8" height="8" viewBox="0 0 20 20">
          <path d="M10,0 L12,8 L20,10 L12,12 L10,20 L8,12 L0,10 L8,8Z" fill="#fef9c3">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
      <div className="absolute left-[45%] top-[2%] opacity-60">
        <svg width="10" height="10" viewBox="0 0 20 20">
          <path d="M10,0 L12,8 L20,10 L12,12 L10,20 L8,12 L0,10 L8,8Z" fill="#e0f2fe">
            <animate attributeName="opacity" values="0.7;0.2;0.9;0.4;0.7" dur="3.8s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
      <div className="absolute left-[75%] top-[8%] opacity-50">
        <svg width="7" height="7" viewBox="0 0 20 20">
          <path d="M10,0 L12,8 L20,10 L12,12 L10,20 L8,12 L0,10 L8,8Z" fill="#fde68a">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    </div>
  );
}
