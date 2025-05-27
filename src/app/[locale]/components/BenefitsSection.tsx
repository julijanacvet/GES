
'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Zap, Leaf, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BenefitsSection() {
  const { t } = useTranslation('common');

  return (
    <section className="bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="h-full" // Ensure motion.div takes full height for consistent card sizing
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden group h-full flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4 px-4 pb-2 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                  <div className="p-3 rounded-full bg-primary text-primary-foreground">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-base font-semibold">{t(benefit.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex-grow">
                  <p className="text-sm text-muted-foreground">{t(benefit.descriptionKey)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
