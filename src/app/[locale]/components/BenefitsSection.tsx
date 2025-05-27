
'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Zap, Leaf, TrendingUp } from 'lucide-react'; // Zap for Energy, Leaf for Carbon, TrendingUp for Property Value

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
  const { t } = useTranslation('common');

  return (
    <section className="bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden group">
              <CardHeader className="flex flex-row items-center gap-4 px-4 pb-2 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                <div className="p-3 rounded-full bg-primary text-primary-foreground">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-base font-semibold">{t(benefit.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">{t(benefit.descriptionKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

