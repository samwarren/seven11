import { getEvents } from '@/lib/content';
import { formatDate, formatTime } from '@/lib/utils';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { BeveledButton } from '@/components/y2k/BeveledButton';
import { WaveAnimation } from '@/components/y2k/WaveAnimation';
import { PixelIcon } from '@/components/y2k/PixelIcon';
import { MapPin, Clock, Shirt } from 'lucide-react';

const EVENT_ICONS: Record<string, string> = {
  ceremony: 'ceremony',
  reception: 'party',
  'welcome-drinks': 'drink',
};

export default function EventsPage() {
  const events = getEvents();

  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <PageWrapper>
      <div className="text-center">
        <h1 className="font-display text-4xl text-ocean-700 glow-text sm:text-5xl">
          Events
        </h1>
        <p className="mt-2 inline-flex items-center gap-2 text-ocean-500">
          Everything you need to know about the celebration
          <PixelIcon name="party" size={16} />
        </p>
      </div>

      <RainbowDivider className="mb-12" />

      <div className="space-y-8">
        {sorted.map((event, i) => (
          <div key={event.id}>
            {i > 0 && (
              <div className="my-6 flex justify-center">
                <WaveAnimation className="w-48" />
              </div>
            )}
            <div className="y2k-card">
              <div className="mb-4 flex items-start gap-4">
                <PixelIcon
                  name={EVENT_ICONS[event.id] || 'calendar'}
                  size={40}
                />
                <div className="flex-1">
                  <h2 className="font-display text-3xl text-ocean-700">
                    {event.name}
                  </h2>
                  <p className="font-pixel text-xs text-sunset-500">
                    {formatDate(event.date)}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-ocean-600">
                  <Clock size={18} className="text-ocean-400" />
                  <span>
                    {formatTime(event.date)} - {formatTime(event.endTime)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-ocean-600">
                  <MapPin size={18} className="text-ocean-400" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-ocean-600">
                  <Shirt size={18} className="text-ocean-400" />
                  <span>{event.dressCode}</span>
                </div>
              </div>

              <p className="mb-4 text-ocean-600">{event.description}</p>
              <p className="mb-4 text-sm text-ocean-400">{event.address}</p>

              {event.mealOptions.length > 0 && (
                <div className="mb-4">
                  <p className="mb-1 font-bold text-ocean-600">Menu Options:</p>
                  <div className="flex flex-wrap gap-2">
                    {event.mealOptions.map((meal) => (
                      <span
                        key={meal}
                        className="bevel-raised bg-ocean-50 px-3 py-1 text-sm text-ocean-700"
                      >
                        {meal}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {event.mapUrl && (
                <BeveledButton
                  href={event.mapUrl}
                  variant="sunset"
                  className="text-sm"
                >
                  <PixelIcon name="pin" size={14} />
                  View Map
                </BeveledButton>
              )}
            </div>
          </div>
        ))}
      </div>

      <RainbowDivider className="mt-12" />

      <div className="mt-8 text-center">
        <BeveledButton href="/rsvp" variant="coral">
          <PixelIcon name="mail" size={16} />
          RSVP Now!
        </BeveledButton>
      </div>
    </PageWrapper>
  );
}
