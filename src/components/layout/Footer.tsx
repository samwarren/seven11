'use client';

import { HitCounter } from '@/components/y2k/HitCounter';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { WaveAnimation } from '@/components/y2k/WaveAnimation';
import { PixelIcon } from '@/components/y2k/PixelIcon';

export function Footer() {
  return (
    <footer className="mt-auto">
      <WaveAnimation />
      <div className="bg-ocean-800 px-4 py-8 text-center text-ocean-200">
        <div className="mx-auto max-w-4xl space-y-4">
          <RainbowDivider />

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <HitCounter />
            <span className="text-ocean-400">|</span>
            <span className="font-pixel text-[8px]">
              Best viewed in Netscape Navigator 4.0
            </span>
            <span className="text-ocean-400">|</span>
            <span className="inline-flex items-center gap-1">
              Made with <PixelIcon name="heart" size={12} /> and <PixelIcon name="wave" size={12} />
            </span>
          </div>

          <div className="space-y-1 text-xs text-ocean-400">
            <p className="inline-flex items-center gap-1">
              <PixelIcon name="dolphin" size={12} />
              This site is optimized for 800x600 resolution
              <PixelIcon name="dolphin" size={12} />
            </p>
            <p>
              &copy; {new Date().getFullYear()} Sam & Maria&apos;s Totally Rad Wedding
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
