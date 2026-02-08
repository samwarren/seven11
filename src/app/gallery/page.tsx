'use client';

import { useState } from 'react';
import { getGallery } from '@/lib/content';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { PixelIcon } from '@/components/y2k/PixelIcon';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PHOTO_ICONS = ['camera', 'wave', 'beach', 'dog', 'ring', 'party'];

export default function GalleryPage() {
  const photos = getGallery();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <PageWrapper>
      <div className="text-center">
        <h1 className="font-display text-4xl text-ocean-700 glow-text sm:text-5xl">
          Gallery
        </h1>
        <p className="mt-2 inline-flex items-center gap-2 text-ocean-500">
          Snapshots from our adventure together
          <PixelIcon name="camera" size={16} />
        </p>
      </div>

      <RainbowDivider className="mb-12" />

      {/* Photo grid */}
      <div className="columns-2 gap-4 sm:columns-3">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="mb-4 cursor-pointer break-inside-avoid"
            onClick={() => setSelectedIndex(i)}
          >
            <div className="bevel-frame transition-transform hover:scale-[1.02]">
              <div className="relative aspect-square bg-gradient-to-br from-ocean-100 to-ocean-200">
                <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                  <PixelIcon
                    name={PHOTO_ICONS[i % PHOTO_ICONS.length]}
                    size={40}
                  />
                  <p className="mt-2 text-xs text-ocean-500">{photo.caption}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 text-white hover:text-ocean-300"
            aria-label="Close"
          >
            <X size={32} />
          </button>

          {selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex - 1);
              }}
              className="absolute left-4 text-white hover:text-ocean-300"
              aria-label="Previous"
            >
              <ChevronLeft size={40} />
            </button>
          )}

          {selectedIndex < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex + 1);
              }}
              className="absolute right-16 text-white hover:text-ocean-300"
              aria-label="Next"
            >
              <ChevronRight size={40} />
            </button>
          )}

          <div
            className="mx-auto max-w-2xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bevel-frame">
              <div className="relative aspect-square bg-gradient-to-br from-ocean-200 to-ocean-300">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <PixelIcon
                    name={PHOTO_ICONS[selectedIndex % PHOTO_ICONS.length]}
                    size={80}
                  />
                  <p className="mt-4 text-lg text-ocean-700">
                    {photos[selectedIndex].caption}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-sm text-ocean-300">
              {selectedIndex + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
