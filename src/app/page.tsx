import { getSiteConfig, getEvents } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { CountdownTimer } from '@/components/countdown/CountdownTimer';
import { MarqueeText } from '@/components/y2k/MarqueeText';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { BlinkText } from '@/components/y2k/BlinkText';
import { FloatingElement } from '@/components/y2k/FloatingElement';
import { BeveledButton } from '@/components/y2k/BeveledButton';
import { WaveAnimation } from '@/components/y2k/WaveAnimation';
import { PixelIcon } from '@/components/y2k/PixelIcon';
import { PageWrapper } from '@/components/layout/PageWrapper';

const QUICK_LINKS = [
  { href: '/our-story', label: 'Our Story', icon: 'heart' },
  { href: '/events', label: 'Events', icon: 'calendar' },
  { href: '/wedding-party', label: 'Wedding Party', icon: 'people' },
  { href: '/gallery', label: 'Gallery', icon: 'camera' },
  { href: '/travel', label: 'Travel', icon: 'plane' },
  { href: '/rsvp', label: 'RSVP', icon: 'mail' },
  { href: '/guestbook', label: 'Guestbook', icon: 'pencil' },
  { href: '/faq', label: 'FAQ', icon: 'question' },
];

export default function HomePage() {
  const site = getSiteConfig();
  const events = getEvents();
  const ceremony = events.find((e) => e.id === 'ceremony');

  return (
    <>
      {/* Marquee banner */}
      <div className="bg-ocean-700 py-1 text-ocean-100">
        <MarqueeText speed={25}>
          <span className="inline-flex items-center gap-2 font-pixel text-xs">
            <PixelIcon name="wave" size={12} />
            {site.couple.partner1} & {site.couple.partner2} are getting married!
            <PixelIcon name="surfer" size={12} />
            Save the date: {formatDate(site.weddingDate)}
            <PixelIcon name="dolphin" size={12} />
            {site.tagline}
            <PixelIcon name="sunset" size={12} />
          </span>
        </MarqueeText>
      </div>

      <PageWrapper className="relative text-center">
        {/* Floating decorations */}
        <div className="pointer-events-none absolute left-4 top-32 hidden lg:block">
          <FloatingElement delay={0} duration={7}>
            <PixelIcon name="surfer" size={40} />
          </FloatingElement>
        </div>
        <div className="pointer-events-none absolute right-8 top-48 hidden lg:block">
          <FloatingElement delay={2} duration={5}>
            <PixelIcon name="dolphin" size={32} />
          </FloatingElement>
        </div>
        <div className="pointer-events-none absolute left-12 top-96 hidden lg:block">
          <FloatingElement delay={4} duration={6}>
            <PixelIcon name="star" size={24} />
          </FloatingElement>
        </div>
        <div className="pointer-events-none absolute right-16 top-80 hidden lg:block">
          <FloatingElement delay={1} duration={8}>
            <PixelIcon name="shell" size={28} />
          </FloatingElement>
        </div>

        {/* Welcome heading */}
        <div className="mb-8">
          <h1 className="font-display text-5xl text-ocean-700 glow-text sm:text-7xl">
            {site.couple.partner1} & {site.couple.partner2}
          </h1>
          <p className="mt-4 font-pixel text-xs text-ocean-500 sm:text-sm">
            are getting married!
          </p>
        </div>

        {/* Tagline */}
        <p className="mx-auto mb-8 max-w-lg text-lg text-ocean-600 italic">
          &ldquo;{site.tagline}&rdquo;
        </p>

        <RainbowDivider />

        {/* Countdown */}
        <div className="my-12">
          <h2 className="mb-6 inline-flex items-center gap-2 font-pixel text-sm text-ocean-600">
            <PixelIcon name="hourglass" size={16} />
            Countdown to the Big Day
            <PixelIcon name="hourglass" size={16} />
          </h2>
          <CountdownTimer targetDate={site.weddingDate} />
        </div>

        <RainbowDivider />

        {/* Date & Venue info */}
        <div className="y2k-card mx-auto my-12 max-w-lg">
          <h3 className="mb-3 font-display text-2xl text-ocean-700">
            {formatDate(site.weddingDate)}
          </h3>
          {ceremony && (
            <>
              <p className="text-lg font-bold text-ocean-600">{ceremony.venue}</p>
              <p className="text-ocean-500">{ceremony.address}</p>
              <p className="mt-2 text-sm text-ocean-400">
                Dress Code: {ceremony.dressCode}
              </p>
            </>
          )}
        </div>

        {/* Welcome message */}
        <div className="my-8">
          <p className="text-lg text-ocean-700">{site.welcomeMessage}</p>
        </div>

        <WaveAnimation className="my-8" />

        {/* Quick links */}
        <div className="my-12">
          <h2 className="mb-6 inline-flex items-center gap-2 font-pixel text-sm text-ocean-600">
            <PixelIcon name="compass" size={16} />
            Explore Our Site
            <PixelIcon name="compass" size={16} />
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {QUICK_LINKS.map((link) => (
              <BeveledButton
                key={link.href}
                href={link.href}
                className="flex-col gap-1 px-4 py-4 text-center"
              >
                <PixelIcon name={link.icon} size={24} />
                <span className="text-xs">{link.label}</span>
              </BeveledButton>
            ))}
          </div>
        </div>

        <RainbowDivider />

        {/* Guestbook CTA */}
        <div className="my-8">
          <BlinkText className="text-lg font-bold text-coral-500">
            <a href="/guestbook" className="retro-link inline-flex items-center gap-2">
              <PixelIcon name="sparkle" size={16} />
              Sign our Guestbook!
              <PixelIcon name="sparkle" size={16} />
            </a>
          </BlinkText>
        </div>
      </PageWrapper>
    </>
  );
}
