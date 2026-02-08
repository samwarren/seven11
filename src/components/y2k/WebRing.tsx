import { PixelIcon } from './PixelIcon';

export function WebRing() {
  return (
    <div className="bevel-raised inline-flex items-center gap-2 bg-gradient-to-r from-ocean-50 to-ocean-100 px-4 py-2 text-xs">
      <span className="font-pixel text-[8px] text-ocean-700">{'<'}</span>
      <span className="inline-flex items-center gap-1 font-pixel text-[8px] text-ocean-600">
        <PixelIcon name="surfer" size={12} />
        Beach Wedding Web Ring
        <PixelIcon name="surfer" size={12} />
      </span>
      <span className="font-pixel text-[8px] text-ocean-700">{'>'}</span>
    </div>
  );
}
