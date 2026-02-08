'use client';

export function MarqueeText({
  children,
  speed = 20,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`marquee-container overflow-hidden ${className}`}>
      <div
        className="inline-block whitespace-nowrap"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {children}
        <span className="mx-16">{children}</span>
      </div>
    </div>
  );
}
