'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface Photo {
  src: string;
  alt: string;
}

const BORDER_STYLES = ['border-puka', 'border-starfish', 'border-seashell', 'border-coral'] as const;

const PHOTO_SIZE_MOBILE = 150;
const PHOTO_SIZE_DESKTOP = 200;
const SPAWN_INTERVAL = 1500;
const LIFETIME = 6000;
const FADE_DURATION = 1000;
const MIN_SPEED = 0.8;
const MAX_SPEED = 1.8;

interface BouncingPhoto {
  id: number;
  photoIndex: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  borderStyle: (typeof BORDER_STYLES)[number];
  spawnTime: number;
}

function getPhotoSize() {
  if (typeof window === 'undefined') return PHOTO_SIZE_DESKTOP;
  return window.innerWidth < 640 ? PHOTO_SIZE_MOBILE : PHOTO_SIZE_DESKTOP;
}

function randomSpeed() {
  const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
  return Math.random() > 0.5 ? speed : -speed;
}

export function BouncingPhotos({ photos }: { photos: Photo[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<BouncingPhoto[]>([]);
  const nextIdRef = useRef(0);
  const nextPhotoIndexRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [, forceRender] = useState(0);

  const getOpacity = useCallback((photo: BouncingPhoto, now: number) => {
    const age = now - photo.spawnTime;
    if (age < 300) return age / 300; // fade in
    if (age > LIFETIME - FADE_DURATION) {
      return Math.max(0, (LIFETIME - age) / FADE_DURATION);
    }
    return 1;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tick = (now: number) => {
      const size = getPhotoSize();
      const bounds = container.getBoundingClientRect();
      const maxX = bounds.width - size - 24; // account for border padding
      const maxY = bounds.height - size - 24;

      // Spawn new photo
      if (now - lastSpawnRef.current > SPAWN_INTERVAL) {
        lastSpawnRef.current = now;
        const idx = nextPhotoIndexRef.current % photos.length;
        nextPhotoIndexRef.current++;
        const borderIdx = nextIdRef.current % BORDER_STYLES.length;

        photosRef.current.push({
          id: nextIdRef.current++,
          photoIndex: idx,
          x: Math.random() * Math.max(0, maxX),
          y: Math.random() * Math.max(0, maxY),
          vx: randomSpeed(),
          vy: randomSpeed(),
          borderStyle: BORDER_STYLES[borderIdx],
          spawnTime: now,
        });
      }

      // Update positions & remove expired
      photosRef.current = photosRef.current.filter((p) => {
        const age = now - p.spawnTime;
        if (age > LIFETIME) return false;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0) {
          p.x = 0;
          p.vx = Math.abs(p.vx);
        } else if (p.x >= maxX) {
          p.x = maxX;
          p.vx = -Math.abs(p.vx);
        }

        if (p.y <= 0) {
          p.y = 0;
          p.vy = Math.abs(p.vy);
        } else if (p.y >= maxY) {
          p.y = maxY;
          p.vy = -Math.abs(p.vy);
        }

        return true;
      });

      forceRender((n) => n + 1);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const now = performance.now();
  const size = getPhotoSize();

  return (
    <div
      ref={containerRef}
      className="relative h-[500px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-ocean-50 via-seafoam-50 to-sand-50 sm:h-[600px]"
      style={{
        border: '3px solid',
        borderColor: '#bae6fd #0369a1 #0369a1 #bae6fd',
        boxShadow: 'inset 0 0 30px rgba(14, 165, 233, 0.1)',
      }}
    >
      {photosRef.current.map((photo) => {
        const opacity = getOpacity(photo, now);
        return (
          <div
            key={photo.id}
            className={`absolute ${photo.borderStyle}`}
            style={{
              transform: `translate(${photo.x}px, ${photo.y}px)`,
              width: size,
              height: size,
              opacity,
              transition: 'opacity 0.3s ease',
              willChange: 'transform, opacity',
            }}
          >
            <Image
              src={photos[photo.photoIndex].src}
              alt={photos[photo.photoIndex].alt}
              width={PHOTO_SIZE_DESKTOP}
              height={PHOTO_SIZE_DESKTOP}
              className="h-full w-full rounded object-cover"
              sizes="200px"
            />
          </div>
        );
      })}
    </div>
  );
}
