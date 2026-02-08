import { PixelIcon } from '@/components/y2k/PixelIcon';

export function MapEmbed({ className = '' }: { className?: string }) {
  return (
    <div className={`bevel-frame ${className}`}>
      <div className="aspect-video bg-gradient-to-br from-ocean-200 to-ocean-300">
        <div className="flex h-full flex-col items-center justify-center text-ocean-600">
          <PixelIcon name="map" size={48} />
          <p className="mt-2 font-pixel text-xs">Map placeholder</p>
          <p className="mt-1 text-sm">
            <a
              href="https://maps.google.com/?q=Stinson+Beach+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-link"
            >
              Open in Google Maps
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
