'use client';

import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';

const differentiatorsKeys = [
  'whyChooseUs.expertise',
  'whyChooseUs.quality',
  'whyChooseUs.installers',
  'whyChooseUs.support',
  'whyChooseUs.sustainability',
];

export default function WhyChooseGES() {
  const { t } = useTranslation('common');

  return (
    <section id="why-ges" className="bg-muted/30 dark:bg-background/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('whyChooseUs.headline')}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-6">
            {differentiatorsKeys.map((key) => (
              <li key={key} className="flex items-start p-4 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                <p className="text-foreground">{t(key)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
