
'use client';

import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";
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


export default function SystemsForHomePage() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  const homeBenefits = [
    "home.benefits.item1",
    "home.benefits.item2",
    "home.benefits.item3",
    "home.benefits.item4",
  ];

  const processSteps = [
    {
      step: "01",
      title: "home.process.step1.title",
      description: "home.process.step1.description"
    },
    {
      step: "02",
      title: "home.process.step2.title",
      description: "home.process.step2.description"
    },
    {
      step: "03",
      title: "home.process.step3.title",
      description: "home.process.step3.description"
    },
    {
      step: "04",
      title: "home.process.step4.title",
      description: "home.process.step4.description"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] bg-black text-white flex items-center justify-center text-center">
            <Image 
                src="/locales/images/pages/residential-hero.jpg"
                alt={t('home.hero.alt')}
                fill
                style={{objectFit: 'cover'}}
                className="opacity-50"
                data-ai-hint="family home solar panels"
                priority
            />
            <motion.div 
              className="relative z-10 p-4"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.2 }}
            >
                <motion.h1 variants={textVariants} className="text-4xl md:text-6xl font-bold">{t('home.hero.headline')}</motion.h1>
                <motion.p variants={textVariants} className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">{t('home.hero.subheadline')}</motion.p>
            </motion.div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 md:py-24 bg-muted/30 dark:bg-background/50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
              >
                <Image src="/locales/images/pages/home-benefits.jpg" alt={t('home.benefits.alt')} width={600} height={450} className="rounded-xl shadow-lg" data-ai-hint="modern home exterior savings" />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.15 }}
              >
                <motion.h2 variants={textVariants} className="text-3xl font-bold mb-4">{t('home.benefits.title')}</motion.h2>
                <motion.p variants={textVariants} className="text-muted-foreground mb-6">{t('home.benefits.description')}</motion.p>
                <ul className="space-y-3 mb-8">
                  {homeBenefits.map((key) => (
                    <motion.li key={key} variants={textVariants} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{t(key)}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="process" className="py-16 md:py-24 bg-background">
           <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                className="text-center mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={textVariants}
            >
                <h2 className="text-3xl font-bold">{t('home.process.title')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">{t('home.process.description')}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                    <motion.div 
                        key={step.step}
                        className="text-center p-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: index * 0.1 }}
                        variants={textVariants}
                    >
                        <div className="text-4xl font-bold text-primary mb-4">{step.step}</div>
                        <h3 className="text-xl font-semibold mb-2">{t(step.title)}</h3>
                        <p className="text-muted-foreground">{t(step.description)}</p>
                    </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="container max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">{t('home.cta.headline')}</h2>
                <p className="text-lg opacity-90 mb-8">{t('home.cta.subheadline')}</p>
                <Button asChild size="lg" className="bg-accent hover:bg-yellow-500 text-accent-foreground group">
                    <Link href={`/${locale}/#contact`}>
                        {t('home.cta.button')}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
