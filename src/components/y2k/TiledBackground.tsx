const TILE_CLASSES: Record<string, string> = {
  'ocean-stars': 'bg-tile-ocean bg-tile-stars',
  ocean: 'bg-tile-ocean',
  waves: 'bg-tile-waves',
  stars: 'bg-tile-stars',
};

export function TiledBackground({
  children,
  tile = 'ocean-stars',
  className = '',
}: {
  children: React.ReactNode;
  tile?: string;
  className?: string;
}) {
  return (
    <div className={`min-h-screen ${TILE_CLASSES[tile] || TILE_CLASSES['ocean-stars']} ${className}`}>
      {children}
    </div>
  );
}
