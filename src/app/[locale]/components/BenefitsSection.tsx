
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
  hidden: { opacity: 0, y: 50, rotate: -5 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotate: 0,
  },
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
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 12,
                duration: 0.6,
                delay: index * 0.15
              }}
              className="h-full"
            >
              <Card className="h-full flex flex-col p-6">
                <div className="relative z-10">
                    <span className="icon relative inline-block p-2 after:absolute after:inset-[4.5px] after:rounded-full after:bg-primary/10 after:border after:border-primary/20 after:backdrop-blur-sm group-hover:after:bg-primary/15 group-hover:after:border-primary/30 transition-colors duration-200">
                      <benefit.icon className="h-6 w-6 relative z-10 text-primary" />
                    </span>
                    <h4 className="mt-3 mb-1 text-base font-semibold text-foreground">{t(benefit.titleKey)}</h4>
                    <p className="text-sm text-muted-foreground">{t(benefit.descriptionKey)}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
