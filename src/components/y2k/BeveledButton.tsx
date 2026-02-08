import Link from 'next/link';

type Variant = 'ocean' | 'coral' | 'sunset';

const variantClass: Record<Variant, string> = {
  ocean: 'btn-y2k',
  coral: 'btn-y2k btn-y2k-coral',
  sunset: 'btn-y2k btn-y2k-sunset',
};

interface BeveledButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export function BeveledButton({
  children,
  variant = 'ocean',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: BeveledButtonProps) {
  const classes = `${variantClass[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
