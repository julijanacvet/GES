
'use client';

import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
     },
};


export default function SystemsForIndustryPage() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  const commercialBenefits = [
    "industry.commercial.benefit1",
    "industry.commercial.benefit2",
    "industry.commercial.benefit3",
    "industry.commercial.benefit4",
  ];

  const plantBenefits = [
    "industry.plants.benefit1",
    "industry.plants.benefit2",
    "industry.plants.benefit3",
    "industry.plants.benefit4",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] bg-black text-white flex items-center justify-center text-center">
            <Image 
                src="/locales/images/pages/commercial%20solar/Large%20commercial%20building%20with%20solar%20panels%20on%20the%20roof.jpg"
                alt={t('industry.hero.alt')}
                fill
                style={{objectFit: 'cover'}}
                className="opacity-50"
                data-ai-hint="industrial solar"
                priority
            />
            <motion.div 
              className="relative z-10 p-4"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.2 }}
            >
                <motion.h1 variants={textVariants} className="text-4xl md:text-6xl font-bold">{t('industry.hero.headline')}</motion.h1>
                <motion.p variants={textVariants} className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">{t('industry.hero.subheadline')}</motion.p>
            </motion.div>
        </section>

        {/* Commercial Solar Systems Section */}
        <section id="commercial" className="py-16 md:py-24 bg-muted/30 dark:bg-background/50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
              >
                <Image src="/locales/images/pages/commercial%20solar/Workers%20installing%20solar%20panels%20on%20a%20large%20factory%20roof.jpg" alt={t('industry.commercial.alt')} width={600} height={400} className="rounded-xl shadow-lg" data-ai-hint="commercial building solar" />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.15 }}
              >
                <motion.h2 variants={textVariants} className="text-3xl font-bold mb-4">{t('industry.commercial.title')}</motion.h2>
                <motion.p variants={textVariants} className="text-muted-foreground mb-6">{t('industry.commercial.description')}</motion.p>
                <ul className="space-y-3 mb-8">
                  {commercialBenefits.map((key, index) => (
                     <motion.li key={key} variants={textVariants} className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <span>{t(key)}</span>
                    </motion.li>
                  ))}
                </ul>
                 <motion.div variants={textVariants}>
                    <Button asChild size="lg" className="group">
                        <Link href={`/${locale}/#contact`}>{t('industry.commercial.cta')}<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></Link>
                    </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Solar Power Plants Section */}
        <section id="plants" className="py-16 md:py-24 bg-background">
           <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="md:order-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
              >
                <Image src="/locales/images/pages/commercial%20solar/Aerial%20view%20of%20a%20large%20solar%20power%20plant.jpg" alt={t('industry.plants.alt')} width={600} height={400} className="rounded-xl shadow-lg" data-ai-hint="solar power plant" />
              </motion.div>
              <motion.div 
                className="md:order-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.15 }}
              >
                <motion.h2 variants={textVariants} className="text-3xl font-bold mb-4">{t('industry.plants.title')}</motion.h2>
                <motion.p variants={textVariants} className="text-muted-foreground mb-6">{t('industry.plants.description')}</motion.p>
                <ul className="space-y-3 mb-8">
                  {plantBenefits.map((key) => (
                     <motion.li key={key} variants={textVariants} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{t(key)}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div variants={textVariants}>
                    <Button asChild size="lg" className="group">
                        <Link href={`/${locale}/#contact`}>{t('industry.plants.cta')}<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></Link>
                    </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
