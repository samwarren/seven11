import { PixelIcon } from './PixelIcon';

const SPRITE_MAP: Record<string, string> = {
  surfboard: 'surfer',
  starfish: 'star',
  seagull: 'plane',
  wave: 'wave',
  dolphin: 'dolphin',
  shell: 'shell',
  crab: 'shell',
  sunset: 'sunset',
  palmtree: 'palmtree',
};

export function PixelArt({
  sprite,
  size = 24,
  className = '',
}: {
  sprite: string;
  size?: number;
  className?: string;
}) {
  const iconName = SPRITE_MAP[sprite] || 'wave';
  return (
    <PixelIcon name={iconName} size={size} className={className} />
  );
}
