
'use client';

import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

interface TestimonialCardProps {
  quoteKey: string;
  authorKey: string;
  authorLinkKey: string;
}

export default function TestimonialCard({ quoteKey, authorKey, authorLinkKey }: TestimonialCardProps) {
  const { t } = useTranslation('common');
  const authorName = t(authorKey);
  const authorLink = t(authorLinkKey);

  return (
    <div className="flex flex-col text-center h-full p-6">
      <blockquote className="text-lg md:text-xl font-mono text-neutral-300 mb-6 flex-grow">
        {t(quoteKey)}
      </blockquote>
      <div className="mt-auto">
        <p className="font-bold tracking-wider uppercase text-white">{authorName}</p>
        <a href={`https://${authorLink}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-cyan-400 font-mono text-sm hover:text-cyan-300 transition-colors">
          {authorLink}
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
