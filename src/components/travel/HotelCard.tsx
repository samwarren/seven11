import type { Hotel } from '@/lib/content';
import { BeveledButton } from '@/components/y2k/BeveledButton';
import { PixelIcon } from '@/components/y2k/PixelIcon';
import { MapPin, Car } from 'lucide-react';

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="y2k-card">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="font-display text-xl text-ocean-700">{hotel.name}</h3>
        <span className="bevel-raised bg-sand-50 px-2 py-0.5 font-pixel text-[10px] text-sand-600">
          {hotel.priceRange}
        </span>
      </div>

      <div className="mb-2 flex items-center gap-2 text-sm text-ocean-500">
        <MapPin size={14} />
        <span>{hotel.address}</span>
      </div>

      <div className="mb-3 flex items-center gap-2 text-sm text-seafoam-600">
        <Car size={14} />
        <span>{hotel.distanceToVenue} to venue</span>
      </div>

      <p className="mb-4 text-ocean-600">{hotel.description}</p>

      <BeveledButton
        href={hotel.bookingUrl}
        variant="sunset"
        className="text-sm"
      >
        <PixelIcon name="hotel" size={14} />
        Book Now
      </BeveledButton>
    </div>
  );
}
