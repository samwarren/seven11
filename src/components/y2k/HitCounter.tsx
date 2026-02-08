'use client';

import { useEffect, useState } from 'react';

export function HitCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Generate a fun fake visitor count
    const base = 7110;
    const daysSinceEpoch = Math.floor(Date.now() / 86400000);
    setCount(base + (daysSinceEpoch % 1000));
  }, []);

  const digits = String(count).padStart(6, '0');

  return (
    <div className="inline-flex items-center gap-2">
      <span className="font-pixel text-[10px] text-ocean-600">Visitors:</span>
      <div className="bevel-sunken flex bg-black px-2 py-1">
        {digits.split('').map((digit, i) => (
          <span
            key={i}
            className="font-pixel text-sm text-green-400"
            style={{ textShadow: '0 0 5px #22c55e' }}
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
}
