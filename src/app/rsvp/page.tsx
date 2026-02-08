import { getSiteConfig } from '@/lib/content';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { BeveledButton } from '@/components/y2k/BeveledButton';
import { BlinkText } from '@/components/y2k/BlinkText';
import { PixelIcon } from '@/components/y2k/PixelIcon';
import { formatDate } from '@/lib/utils';

export default function RSVPPage() {
  const site = getSiteConfig();

  return (
    <PageWrapper>
      <div className="text-center">
        <h1 className="font-display text-4xl text-ocean-700 glow-text sm:text-5xl">
          RSVP
        </h1>
        <p className="mt-2 inline-flex items-center gap-2 text-ocean-500">
          Let us know if you can make it!
          <PixelIcon name="mail" size={16} />
        </p>
      </div>

      <RainbowDivider className="mb-12" />

      <div className="y2k-card mx-auto max-w-lg text-center">
        <div className="mb-6">
          <PixelIcon name="mail" size={48} />
        </div>

        <h2 className="mb-4 font-display text-2xl text-ocean-700">
          You&apos;re Invited!
        </h2>

        <p className="mb-2 text-ocean-600">
          Please join us for the wedding of
        </p>
        <p className="mb-2 font-display text-3xl text-ocean-700">
          {site.couple.partner1} & {site.couple.partner2}
        </p>
        <p className="mb-6 text-ocean-500">
          {formatDate(site.weddingDate)}
        </p>

        <p className="mb-8 text-ocean-600">
          Click the button below to fill out our RSVP form. Please respond by
          <strong> June 1, 2025</strong>.
        </p>

        <BeveledButton
          href={site.rsvpFormUrl}
          variant="coral"
          className="inline-flex justify-center px-8 py-3 text-lg"
        >
          <PixelIcon name="pencil" size={18} />
          RSVP Now!
        </BeveledButton>

        <div className="mt-6">
          <BlinkText className="inline-flex items-center gap-2 text-sm text-sunset-500">
            <PixelIcon name="sparkle" size={12} />
            We can&apos;t wait to celebrate with you!
            <PixelIcon name="sparkle" size={12} />
          </BlinkText>
        </div>
      </div>

      <RainbowDivider className="mt-12" />

      <div className="mt-8 text-center text-sm text-ocean-400">
        <p className="inline-flex items-center gap-2">
          Having trouble with the form? Email us and we&apos;ll sort it out!
          <PixelIcon name="email" size={14} />
        </p>
      </div>
    </PageWrapper>
  );
}
