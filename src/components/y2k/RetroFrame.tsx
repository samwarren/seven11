export function RetroFrame({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bevel-frame ${className}`}>
      <div className="bevel-sunken bg-white">{children}</div>
    </div>
  );
}
