import { getSiteConfig } from '@/lib/content';
import { CountdownTimer } from '@/components/countdown/CountdownTimer';
import { MarqueeText } from '@/components/y2k/MarqueeText';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { BlinkText } from '@/components/y2k/BlinkText';
import { FloatingElement } from '@/components/y2k/FloatingElement';
import { WaveAnimation } from '@/components/y2k/WaveAnimation';
import { PixelIcon } from '@/components/y2k/PixelIcon';
import { PageWrapper } from '@/components/layout/PageWrapper';

export default function HomePage() {
  const site = getSiteConfig();

  return (
    <>
      {/* Marquee banner */}
      <div className="bg-ocean-700 py-1 text-ocean-100">
        <MarqueeText speed={25}>
          <span className="inline-flex items-center gap-2 font-pixel text-xs">
            <PixelIcon name="wave" size={12} />
            {site.couple.partner1} & {site.couple.partner2} are getting married!
            <PixelIcon name="otter" size={12} />
            November 6th&ndash;8th, 2026
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
            <PixelIcon name="otter" size={40} />
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

        {/* Date & Venue */}
        <div className="y2k-card mx-auto my-12 max-w-lg">
          <h2 className="mb-4 font-display text-3xl text-ocean-700">
            November 6th&ndash;8th
          </h2>
          <p className="mb-2 text-lg font-bold">
            <a
              href="https://www.visitasilomar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-link inline-flex items-center gap-2 text-ocean-600"
            >
              <PixelIcon name="wave" size={16} />
              Asilomar Conference Grounds
              <PixelIcon name="wave" size={16} />
            </a>
          </p>
          <p>
            <a
              href="https://www.google.com/maps/place/Asilomar+Hotel+and+Conference+Grounds/@36.6191335,-121.9375932,17z/data=!3m1!4b1!4m9!3m8!1s0x808de1301ce496cb:0x763d96cf8eb0e519!5m2!4m1!1i2!8m2!3d36.6191335!4d-121.9375932!16s%2Fm%2F03w9nhs"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-link inline-flex items-center gap-1 text-sm text-ocean-500"
            >
              <PixelIcon name="map" size={14} />
              Pacific Grove, CA
              <PixelIcon name="pin" size={14} />
            </a>
          </p>
        </div>

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

        {/* Welcome message */}
        <div className="my-8">
          <p className="text-lg text-ocean-700">{site.welcomeMessage}</p>
        </div>

        <WaveAnimation className="my-8" />

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
