export function BlinkText({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`animate-blink ${className}`}>{children}</span>;
}
