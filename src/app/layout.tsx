import type { Metadata } from 'next';
import { Press_Start_2P, Pacifico } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SparkleTrail } from '@/components/y2k/SparkleTrail';
import { DogCursor } from '@/components/y2k/DogCursor';
import { TidePoolMargins } from '@/components/y2k/TidePoolMargins';
import { CelestialSky } from '@/components/y2k/CelestialSky';
import { getSiteConfig } from '@/lib/content';
import './globals.css';

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const site = getSiteConfig();

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart.variable} ${pacifico.variable} bg-tile-ocean bg-tile-stars min-h-screen font-comic antialiased`}
      >
        <CelestialSky />
        <TidePoolMargins />
        <SparkleTrail />
        <DogCursor />
        <div className="relative z-20 flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
