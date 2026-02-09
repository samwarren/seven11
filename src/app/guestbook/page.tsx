'use client';

import { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { BeveledButton } from '@/components/y2k/BeveledButton';
import { MarqueeText } from '@/components/y2k/MarqueeText';
import { PixelIcon } from '@/components/y2k/PixelIcon';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      if (data.entries) setEntries(data.entries);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
        return;
      }

      setSubmitted(true);
      setName('');
      setMessage('');
      fetchEntries();
    } catch {
      setError('Failed to connect. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageWrapper>
      {/* Classic guestbook marquee */}
      <div className="bevel-raised mb-8 bg-gradient-to-r from-ocean-700 via-ocean-600 to-seafoam-600 py-1">
        <MarqueeText speed={18}>
          <span className="inline-flex items-center gap-3 font-pixel text-xs text-ocean-100">
            <PixelIcon name="star" size={10} />
            Welcome to our Guestbook!
            <PixelIcon name="star" size={10} />
            Leave us a message!
            <PixelIcon name="star" size={10} />
            Thanks for visiting!
            <PixelIcon name="star" size={10} />
            Sign our guestbook!
            <PixelIcon name="star" size={10} />
          </span>
        </MarqueeText>
      </div>

      <div className="text-center">
        <h1 className="font-display text-4xl text-ocean-700 glow-text sm:text-5xl">
          Guestbook
        </h1>
        <p className="mt-2 inline-flex items-center gap-2 text-ocean-500">
          Leave us a message -- we&apos;d love to hear from you!
          <PixelIcon name="pencil" size={16} />
        </p>
      </div>

      <RainbowDivider className="mb-8" />

      {/* Sign the guestbook form */}
      <div className="mx-auto mb-12 max-w-lg">
        <div className="y2k-card">
          <h2 className="mb-4 inline-flex items-center justify-center gap-2 w-full font-pixel text-sm text-ocean-600">
            <PixelIcon name="pencil" size={14} />
            Sign Our Guestbook
            <PixelIcon name="pencil" size={14} />
          </h2>

          {submitted ? (
            <div className="text-center">
              <p className="mb-2 inline-flex items-center gap-2 text-lg text-seafoam-600">
                <PixelIcon name="party" size={20} />
                Thanks for signing our guestbook!
              </p>
              <BeveledButton onClick={() => setSubmitted(false)} variant="ocean">
                Write Another Message
              </BeveledButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="gb-name"
                  className="mb-1 block font-bold text-ocean-600"
                >
                  Your Name:
                </label>
                <input
                  id="gb-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                  className="bevel-sunken w-full bg-white px-3 py-2 text-ocean-900 outline-none focus:ring-2 focus:ring-ocean-400"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="gb-message"
                  className="mb-1 block font-bold text-ocean-600"
                >
                  Your Message:
                </label>
                <textarea
                  id="gb-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  maxLength={1000}
                  rows={4}
                  className="bevel-sunken w-full bg-white px-3 py-2 text-ocean-900 outline-none focus:ring-2 focus:ring-ocean-400"
                  placeholder="Congratulations! So excited for you two..."
                />
                <p className="mt-1 text-right text-xs text-ocean-400">
                  {message.length}/1000
                </p>
              </div>

              {error && (
                <div className="mb-4 bevel-sunken bg-coral-50 p-3 text-sm text-coral-600">
                  {error}
                </div>
              )}

              <BeveledButton
                type="submit"
                variant="sunset"
                disabled={submitting}
                className="w-full justify-center"
              >
                {submitting ? (
                  <>
                    <PixelIcon name="send" size={14} />
                    Signing...
                  </>
                ) : (
                  <>
                    <PixelIcon name="pencil" size={14} />
                    Sign Guestbook!
                  </>
                )}
              </BeveledButton>
            </form>
          )}
        </div>
      </div>

      <RainbowDivider className="mb-8" />

      {/* Guestbook entries */}
      <h2 className="mb-6 inline-flex items-center justify-center gap-2 w-full font-pixel text-sm text-ocean-600">
        <PixelIcon name="book" size={14} />
        Messages
        <PixelIcon name="book" size={14} />
      </h2>

      {loading ? (
        <div className="text-center text-ocean-400">
          <PixelIcon name="surfer" size={24} className="animate-spin-slow" />
          <p className="mt-2 font-pixel text-xs">Loading messages...</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center text-ocean-400">
          <PixelIcon name="book" size={40} />
          <p className="mt-2">
            No messages yet -- be the first to sign our guestbook!
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="y2k-card">
              <div className="mb-2 flex items-center gap-2">
                <PixelIcon name="star" size={14} />
                <span className="font-bold text-ocean-700">{entry.name}</span>
                {entry.created_at && (
                  <span className="text-xs text-ocean-400">
                    {new Date(entry.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
              <p className="text-ocean-600">{entry.message}</p>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
