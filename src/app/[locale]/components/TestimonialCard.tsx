'use client';

import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quoteKey: string;
  authorKey: string;
}

export default function TestimonialCard({ quoteKey, authorKey }: TestimonialCardProps) {
  const { t } = useTranslation('common');
  const authorName = t(authorKey).split(',')[0];
  const authorLocation = t(authorKey).split(',')[1]?.trim();

  return (
    <Card className="bg-background p-6 rounded-xl shadow-lg h-full flex flex-col">
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-accent fill-accent" />
        ))}
      </div>
      <blockquote className="text-lg text-foreground italic mb-4 flex-grow">
        "{t(quoteKey)}"
      </blockquote>
      <div className="flex items-center mt-auto pt-4 border-t border-border/20">
        <div>
          <p className="font-semibold text-foreground">{authorName}</p>
          {authorLocation && (
            <p className="text-sm text-muted-foreground">{authorLocation}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
