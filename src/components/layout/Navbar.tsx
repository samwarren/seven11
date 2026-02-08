'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PixelIcon } from '@/components/y2k/PixelIcon';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/our-story', label: 'Our Story', icon: 'heart' },
  { href: '/events', label: 'Events', icon: 'calendar' },
  { href: '/wedding-party', label: 'Wedding Party', icon: 'people' },
  { href: '/gallery', label: 'Gallery', icon: 'camera' },
  { href: '/travel', label: 'Travel', icon: 'plane' },
  { href: '/rsvp', label: 'RSVP', icon: 'mail' },
  { href: '/guestbook', label: 'Guestbook', icon: 'pencil' },
  { href: '/faq', label: 'FAQ', icon: 'question' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bevel-raised sticky top-0 z-40 bg-gradient-to-r from-ocean-50 via-ocean-100 to-seafoam-50">
      <div className="mx-auto max-w-6xl px-4">
        {/* Desktop nav */}
        <div className="hidden flex-wrap items-center justify-center gap-1 py-2 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`btn-y2k px-3 py-1.5 text-sm transition-all ${
                  isActive
                    ? 'border-ocean-700 bg-gradient-to-b from-ocean-200 to-ocean-300 font-bold text-ocean-900'
                    : ''
                }`}
              >
                <PixelIcon name={link.icon} size={14} />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile nav toggle */}
        <div className="flex items-center justify-between py-2 md:hidden">
          <Link href="/" className="font-display text-lg text-ocean-700">
            S & M
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn-y2k p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav menu */}
        {mobileOpen && (
          <div className="flex flex-col gap-1 pb-3 md:hidden">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`btn-y2k w-full text-center text-sm ${
                    isActive ? 'font-bold text-ocean-900' : ''
                  }`}
                >
                  <PixelIcon name={link.icon} size={14} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
