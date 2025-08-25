
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Data for the service cards that will appear on this page
const industryServicesData = [
  {
    imageSrc: '/locales/images/Commercial solar.jpg',
    dataAiHint: 'business solar panels',
    titleKey: 'services.commercialTitle',
    descriptionKey: 'services.commercialDesc',
    ctaKey: 'services.getCommercialQuoteBtn',
    ctaLink: '/#contact',
  },
  {
    imageSrc: '/locales/images/Solar Power Plants.jpg',
    dataAiHint: 'solar farm field',
    titleKey: 'services.solarPlantsTitle',
    descriptionKey: 'services.solarPlantsDesc',
    ctaKey: 'services.exploreSolarPlantsBtn',
    ctaLink: '/#contact',
  },
];

// Reusable card component, can be moved to its own file later if needed
function ServiceCard({ imageSrc, dataAiHint, titleKey, descriptionKey, ctaKey, ctaLink }: (typeof industryServicesData)[0]) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  return (
    <Card className="service-card group h-[450px]">
      <Image
        src={imageSrc}
        alt={t(titleKey)}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
        className="service-card__background"
        data-ai-hint={dataAiHint}
      />
      <div className="service-card__overlay"></div>
      <div className="service-card__content">
        <h3 className="text-2xl font-bold mb-2">{t(titleKey)}</h3>
        <p className="text-base mb-4 opacity-90">
          {t(descriptionKey)}
        </p>
        <Button
          asChild
          size="lg"
          className="w-full mt-auto bg-black/50 border border-primary text-primary font-bold py-1.5 px-3 text-xs sm:py-3 sm:px-6 sm:text-base rounded-[8px] shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition duration-300 ease-in-out whitespace-normal h-auto"
        >
          <Link href={`/${locale}${ctaLink}`}>
            {t(ctaKey)} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};


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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industryServicesData.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
