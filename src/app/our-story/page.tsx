import { getStory, getSiteConfig } from '@/lib/content';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { RetroFrame } from '@/components/y2k/RetroFrame';
import { PixelIcon } from '@/components/y2k/PixelIcon';

const STORY_ICONS = ['fire', 'house', 'car', 'home', 'dog', 'ring', 'party'];

export default function OurStoryPage() {
  const story = getStory();
  const site = getSiteConfig();

  return (
    <PageWrapper>
      <div className="text-center">
        <h1 className="font-display text-4xl text-ocean-700 glow-text sm:text-5xl">
          Our Story
        </h1>
        <p className="mt-2 inline-flex items-center gap-2 text-ocean-500">
          How {site.couple.partner1} & {site.couple.partner2} found each other
          <PixelIcon name="heart" size={16} />
        </p>
      </div>

      <RainbowDivider className="mb-12" />

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-ocean-300 via-seafoam-400 to-sunset-400 md:block" />

        <div className="space-y-12">
          {story.map((entry, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="relative">
                {/* Year badge on timeline */}
                <div className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 md:block">
                  <div className="bevel-raised rounded-full bg-gradient-to-r from-ocean-100 to-seafoam-100 px-4 py-1">
                    <span className="font-pixel text-xs text-ocean-700">
                      {entry.year}
                    </span>
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`md:w-[45%] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
                >
                  <div className="y2k-card">
                    {/* Mobile year */}
                    <div className="mb-2 md:hidden">
                      <span className="bevel-raised inline-block bg-ocean-100 px-3 py-1 font-pixel text-xs text-ocean-700">
                        {entry.year}
                      </span>
                    </div>

                    <h3 className="mb-2 font-display text-2xl text-ocean-700">
                      {entry.title}
                    </h3>

                    {entry.image && (
                      <RetroFrame className="mb-3">
                        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-ocean-100 to-ocean-200">
                          <PixelIcon name={STORY_ICONS[i] || 'star'} size={48} />
                        </div>
                      </RetroFrame>
                    )}

                    <p className="text-ocean-600">{entry.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
