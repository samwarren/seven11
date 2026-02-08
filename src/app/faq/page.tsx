'use client';

import { useState } from 'react';
import { getFaq } from '@/lib/content';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { RainbowDivider } from '@/components/y2k/RainbowDivider';
import { PixelIcon } from '@/components/y2k/PixelIcon';
import { ChevronDown } from 'lucide-react';

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="y2k-card">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="inline-flex items-center gap-2 pr-4 font-bold text-ocean-700">
          <PixelIcon name="shell" size={14} />
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-ocean-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-3 border-t-2 border-ocean-100 pt-3 text-ocean-600">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const faq = getFaq();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <PageWrapper>
      <div className="text-center">
        <h1 className="font-display text-4xl text-ocean-700 glow-text sm:text-5xl">
          FAQ
        </h1>
        <p className="mt-2 inline-flex items-center gap-2 text-ocean-500">
          Got questions? We&apos;ve got answers!
          <PixelIcon name="question" size={16} />
        </p>
      </div>

      <RainbowDivider className="mb-12" />

      <div className="mx-auto max-w-3xl space-y-4">
        {faq.map((entry, i) => (
          <FAQItem
            key={i}
            question={entry.question}
            answer={entry.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>

      <RainbowDivider className="mt-12" />

      <div className="mt-8 text-center text-ocean-500">
        <p className="inline-flex items-center gap-2">
          Still have questions? Reach out to us directly -- we&apos;d love to help!
          <PixelIcon name="mail" size={16} />
        </p>
      </div>
    </PageWrapper>
  );
}
