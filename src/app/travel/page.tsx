import { getTravel } from '@/lib/content';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { HotelCard } from '@/components/travel/HotelCard';
import { MapEmbed } from '@/components/travel/MapEmbed';
import { PixelIcon } from '@/components/y2k/PixelIcon';
import { Plane, Car, Info } from 'lucide-react';

export default function TravelPage() {
  const travel = getTravel();

  return (
    <PageWrapper>
      <div className="text-center">
        <h1 className="font-display text-4xl text-ocean-700 glow-text sm:text-5xl">
          Travel & Lodging
        </h1>
        <p className="mt-2 inline-flex items-center gap-2 text-ocean-500">
          Everything you need for your trip to Stinson Beach
          <PixelIcon name="plane" size={16} />
        </p>
      </div>

      <RainbowDivider className="mb-12" />

      {/* Map */}
      <div className="mb-12">
        <h2 className="mb-4 inline-flex items-center gap-2 font-display text-2xl text-ocean-700">
          <PixelIcon name="pin" size={20} />
          Where We&apos;ll Be
        </h2>
        <MapEmbed />
      </div>

      {/* Hotels */}
      <div className="mb-12">
        <h2 className="mb-6 inline-flex items-center gap-2 font-display text-2xl text-ocean-700">
          <PixelIcon name="hotel" size={20} />
          Where to Stay
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {travel.hotels.map((hotel, i) => (
            <HotelCard key={i} hotel={hotel} />
          ))}
        </div>
      </div>

      <RainbowDivider />

      {/* Transportation */}
      <div className="my-12">
        <h2 className="mb-6 inline-flex items-center gap-2 font-display text-2xl text-ocean-700">
          <PixelIcon name="car" size={20} />
          Getting There
        </h2>
        <div className="space-y-4">
          {travel.transportation.map((item, i) => (
            <div key={i} className="y2k-card flex gap-4">
              <div className="mt-1 text-ocean-400">
                {i < 2 ? <Plane size={20} /> : <Car size={20} />}
              </div>
              <div>
                <h3 className="mb-1 font-bold text-ocean-700">{item.title}</h3>
                <p className="text-ocean-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RainbowDivider />

      {/* Things to Know */}
      <div className="my-12">
        <h2 className="mb-6 inline-flex items-center gap-2 font-display text-2xl text-ocean-700">
          <PixelIcon name="info" size={20} />
          Things to Know
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {travel.thingsToKnow.map((item, i) => (
            <div key={i} className="y2k-card">
              <div className="mb-2 flex items-center gap-2">
                <Info size={16} className="text-sunset-500" />
                <h3 className="font-bold text-ocean-700">{item.title}</h3>
              </div>
              <p className="text-sm text-ocean-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
