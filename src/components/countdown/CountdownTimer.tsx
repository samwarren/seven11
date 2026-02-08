'use client';

import { useEffect, useState } from 'react';
import { getTimeUntil } from '@/lib/utils';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function CountdownDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bevel-raised bg-gradient-to-b from-ocean-700 to-ocean-900 px-3 py-2 sm:px-5 sm:py-4">
        <span className="font-pixel text-lg text-ocean-100 sm:text-3xl">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 font-pixel text-[8px] uppercase text-ocean-600 sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setTime(getTimeUntil(targetDate));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <CountdownDigit value={0} label="Days" />
        <span className="font-pixel text-2xl text-ocean-400">:</span>
        <CountdownDigit value={0} label="Hours" />
        <span className="font-pixel text-2xl text-ocean-400">:</span>
        <CountdownDigit value={0} label="Mins" />
        <span className="font-pixel text-2xl text-ocean-400">:</span>
        <CountdownDigit value={0} label="Secs" />
      </div>
    );
  }

  if (time.isPast) {
    return (
      <div className="text-center">
        <p className="font-display text-3xl text-sunset-500 glow-text-sunset">
          We&apos;re married!
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      <CountdownDigit value={time.days} label="Days" />
      <span className="font-pixel text-2xl text-ocean-400">:</span>
      <CountdownDigit value={time.hours} label="Hours" />
      <span className="font-pixel text-2xl text-ocean-400">:</span>
      <CountdownDigit value={time.minutes} label="Mins" />
      <span className="font-pixel text-2xl text-ocean-400">:</span>
      <CountdownDigit value={time.seconds} label="Secs" />
    </div>
  );
}
