
'use client';

import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { DollarSign, Zap, Leaf, TrendingUp } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface Benefit {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
}

const benefits: Benefit[] = [
  { icon: DollarSign, titleKey: 'benefits.lowerBillsTitle', descriptionKey: 'benefits.lowerBillsDesc' },
  { icon: Zap, titleKey: 'benefits.energyIndependenceTitle', descriptionKey: 'benefits.energyIndependenceDesc' },
  { icon: Leaf, titleKey: 'benefits.carbonReductionTitle', descriptionKey: 'benefits.carbonReductionDesc' },
  { icon: TrendingUp, titleKey: 'benefits.propertyValueTitle', descriptionKey: 'benefits.propertyValueDesc' },
];

export default function BenefitsSection() {
  const { t, i18n } = useTranslation('common');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.card');
    if (cards.length === 0) return;

    const timeouts = new Map<Element, NodeJS.Timeout>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timeoutId = setTimeout(() => {
              entry.target.classList.add('card-active');
            }, 3000); // 3-second delay
            timeouts.set(entry.target, timeoutId);
          } else {
            const timeoutId = timeouts.get(entry.target);
            if (timeoutId) {
              clearTimeout(timeoutId);
              timeouts.delete(entry.target);
            }
            entry.target.classList.remove('card-active');
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the card is visible
      }
    );

    cards.forEach((card) => {
      observer.observe(card);
    });

    // Cleanup observer and timeouts on component unmount
    return () => {
      cards.forEach((card) => {
        observer.unobserve(card);
      });
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

  return (
    <section className="bg-background" ref={sectionRef}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="h-full">
              <Card className="card h-full flex flex-col p-6">
                 <div className="relative z-10">
                    <span className="icon">
                      <benefit.icon className="h-6 w-6 relative z-10" />
                    </span>
                    <h4 className="mt-3 mb-1 text-base font-semibold">{t(benefit.titleKey)}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t(benefit.descriptionKey)}
                    </p>
                </div>
                <div className="shine"></div>
                <div className="background">
                  <div className="tiles">
                    <div className="tile tile-1"></div>
                    <div className="tile tile-2"></div>
                    <div className="tile tile-3"></div>
                    <div className="tile tile-4"></div>
                    <div className="tile tile-5"></div>
                    <div className="tile tile-6"></div>
                    <div className="tile tile-7"></div>
                    <div className="tile tile-8"></div>
                    <div className="tile tile-9"></div>
                    <div className="tile tile-10"></div>
                  </div>
                  <div className="line line-1"></div>
                  <div className="line line-2"></div>
                  <div className="line line-3"></div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
