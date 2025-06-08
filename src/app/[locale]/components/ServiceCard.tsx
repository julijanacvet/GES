'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  imageSrc: string;
  imageAltKey: string;
  dataAiHint: string;
  titleKey: string;
  descriptionKey: string;
  ctaKey: string;
  ctaLink: string;
}

export default function ServiceCard({
  imageSrc,
  imageAltKey,
  dataAiHint,
  titleKey,
  descriptionKey,
  ctaKey,
  ctaLink,
}: ServiceCardProps) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="relative w-full h-56">
        <Image 
            src={imageSrc} 
            alt={t(imageAltKey)} 
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint={dataAiHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{t(titleKey)}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{t(descriptionKey)}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full btn-primary group">
          <Link href={`/${locale}${ctaLink}`}>
            {t(ctaKey)}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
