import { getParty } from '@/lib/content';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { RetroFrame } from '@/components/y2k/RetroFrame';
import { PixelIcon } from '@/components/y2k/PixelIcon';

export default function WeddingPartyPage() {
  const party = getParty();

  return (
    <PageWrapper>
      <div className="text-center">
        <h1 className="font-display text-4xl text-ocean-700 glow-text sm:text-5xl">
          Wedding Party
        </h1>
        <p className="mt-2 text-ocean-500">
          The amazing humans standing by our side
        </p>
      </div>

      <RainbowDivider className="mb-12" />

      {party.map((group, gi) => (
        <div key={gi} className="mb-16">
          <h2 className="mb-8 text-center font-display text-3xl text-ocean-700">
            {group.label}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.members.map((member, mi) => (
              <div key={mi} className="y2k-card text-center">
                <RetroFrame className="mx-auto mb-4 w-32">
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-ocean-100 to-seafoam-100">
                    <PixelIcon
                      name={gi === 0 ? 'groom' : 'bride'}
                      size={48}
                    />
                  </div>
                </RetroFrame>

                <h3 className="font-display text-xl text-ocean-700">
                  {member.name}
                </h3>
                <p className="font-pixel text-[10px] text-sunset-500">
                  {member.role}
                </p>
                <p className="mt-1 text-xs text-ocean-400 italic">
                  {member.relation}
                </p>
                <p className="mt-3 text-sm text-ocean-600">{member.bio}</p>
              </div>
            ))}
          </div>

          {gi < party.length - 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <PixelIcon name="shell" size={20} />
              <PixelIcon name="wave" size={20} />
              <PixelIcon name="shell" size={20} />
            </div>
          )}
        </div>
      ))}
    </PageWrapper>
  );
}
