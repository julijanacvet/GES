'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quoteKey: string;
  authorKey: string;
  avatarSrc?: string;
  dataAiHint?: string;
}

export default function TestimonialCard({ quoteKey, authorKey, avatarSrc, dataAiHint }: TestimonialCardProps) {
  const { t } = useTranslation('common');
  const authorName = t(authorKey).split(',')[0];
  const authorInitial = authorName ? authorName.charAt(0) : 'U';

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
      <div className="flex items-center mt-auto">
        <Avatar className="h-10 w-10 mr-3">
          {avatarSrc && <AvatarImage src={avatarSrc} alt={t(authorKey)} data-ai-hint={dataAiHint || "person portrait"}/>}
          <AvatarFallback>{authorInitial}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-foreground">{authorName}</p>
          <p className="text-sm text-muted-foreground">{t(authorKey).split(',')[1]?.trim()}</p>
        </div>
      </div>
    </Card>
  );
}
