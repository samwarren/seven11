import { getRegistry } from '@/lib/content';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { BeveledButton } from '@/components/y2k/BeveledButton';
import { PixelIcon } from '@/components/y2k/PixelIcon';

const ICON_MAP: Record<string, string> = {
  plane: 'plane',
  home: 'home',
  gift: 'gift',
};

export default function RegistryPage() {
  const registry = getRegistry();

  return (
    <PageWrapper>
      <div className="text-center">
        <h1 className="font-display text-4xl text-ocean-700 glow-text sm:text-5xl">
          Registry
        </h1>
        <p className="mt-4 mx-auto max-w-lg text-ocean-600">
          {registry.message}
        </p>
      </div>

      <RainbowDivider className="mb-12" />

      <div className="mx-auto grid max-w-2xl gap-6">
        {registry.registries.map((reg, i) => (
          <div key={i} className="y2k-card flex items-center gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ocean-100 to-seafoam-100">
              <PixelIcon
                name={ICON_MAP[reg.icon] || 'gift'}
                size={28}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl text-ocean-700">{reg.name}</h3>
              <p className="mb-3 text-sm text-ocean-500">{reg.description}</p>
              <BeveledButton href={reg.url} variant="sunset" className="text-sm">
                <PixelIcon name="gift" size={14} />
                View Registry
              </BeveledButton>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
