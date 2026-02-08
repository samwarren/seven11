'use client';

import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const SPARKLE_COLORS = ['#facc15', '#fb923c', '#f43f5e', '#38bdf8', '#22d3a0'];

export function SparkleTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.3) return;

      const sparkle: Sparkle = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
      };

      setSparkles((prev) => [...prev.slice(-15), sparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            background: sparkle.color,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}
