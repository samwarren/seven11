'use client';

import { useEffect, useRef } from 'react';

type Direction = 'right' | 'left' | 'up' | 'down';

const SPRITES: Record<Direction, [string, string]> = {
  right: ['/cursors/dog-walk-right-1.png', '/cursors/dog-walk-right-2.png'],
  left:  ['/cursors/dog-walk-left-1.png',  '/cursors/dog-walk-left-2.png'],
  up:    ['/cursors/dog-walk-up-1.png',    '/cursors/dog-walk-up-2.png'],
  down:  ['/cursors/dog-walk-down-1.png',  '/cursors/dog-walk-down-2.png'],
};

export function DogCursor() {
  const dogRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef<Direction>('right');
  const frameRef = useRef(0);
  const posRef = useRef({ x: -100, y: -100 });
  const lastMovePos = useRef({ x: 0, y: 0 });
  const movingRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const bouncePhase = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const dog = dogRef.current;
    if (!dog) return;

    // Hide real cursor globally
    const style = document.createElement('style');
    style.id = 'dog-cursor-hide';
    style.textContent = '* { cursor: none !important; }';
    document.head.appendChild(style);

    // Preload all sprites
    Object.values(SPRITES).flat().forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      const dx = e.clientX - lastMovePos.current.x;
      const dy = e.clientY - lastMovePos.current.y;
      lastMovePos.current = { x: e.clientX, y: e.clientY };

      const threshold = 4;
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

      movingRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        movingRef.current = false;
      }, 150);

      // Cardinal direction
      if (Math.abs(dx) > Math.abs(dy)) {
        dirRef.current = dx > 0 ? 'right' : 'left';
      } else {
        dirRef.current = dy > 0 ? 'down' : 'up';
      }
    };

    // Hide dog when mouse leaves window
    const handleMouseLeave = () => {
      posRef.current = { x: -200, y: -200 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Walk frame animation
    const walkInterval = setInterval(() => {
      if (movingRef.current) {
        frameRef.current = (frameRef.current + 1) % 2;
      }
    }, 200);

    // Render loop - smooth position + bouncy gait
    let lastTime = 0;
    const render = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      if (movingRef.current) {
        // Bouncy gait: quick up-down oscillation with asymmetric timing
        // The "up" is fast, the "down" lingers — like a trotting dog
        bouncePhase.current += dt * 0.012;
        // Use a shaped sine wave for that bouncy-butt feel:
        // steep rise, soft landing
        const raw = Math.sin(bouncePhase.current);
        const bounce = raw > 0 ? raw * raw : raw * 0.3; // squash the top, soften bottom
        const bounceY = -bounce * 8; // 8px peak bounce height

        // Slight tilt/rotation for extra bounciness
        const tilt = Math.sin(bouncePhase.current) * 3; // degrees

        dog.style.transform = `translate(${posRef.current.x - 32}px, ${posRef.current.y - 32 + bounceY}px) rotate(${tilt}deg)`;
      } else {
        // Idle: gentle breathing bob
        bouncePhase.current += dt * 0.003;
        const idleBob = Math.sin(bouncePhase.current) * 2;
        dog.style.transform = `translate(${posRef.current.x - 32}px, ${posRef.current.y - 32 + idleBob}px)`;
      }

      // Update sprite
      const sprite = SPRITES[dirRef.current][frameRef.current];
      const currentSrc = dog.getAttribute('data-src');
      if (currentSrc !== sprite) {
        dog.style.backgroundImage = `url('${sprite}')`;
        dog.setAttribute('data-src', sprite);
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(walkInterval);
      cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      const styleEl = document.getElementById('dog-cursor-hide');
      if (styleEl) styleEl.remove();
    };
  }, []);

  return (
    <div
      ref={dogRef}
      style={{
        position: 'fixed',
        width: 64,
        height: 64,
        zIndex: 9999,
        pointerEvents: 'none',
        backgroundSize: '64px 64px',
        backgroundRepeat: 'no-repeat',
        backgroundImage: "url('/cursors/dog-walk-right-1.png')",
        imageRendering: 'pixelated',
        willChange: 'transform',
      }}
    />
  );
}
