
'use client';

import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServicesSection from "../components/ServicesSection";

export default function SystemsForIndustryPage() {
  const { t } = useTranslation('common');
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="bg-muted/30 dark:bg-background/50 py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold">
                {t('nav.systemsForIndustry')}
              </h1>
            </div>
            <ServicesSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
