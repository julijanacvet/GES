'use client';

import OurServices from "../components/OurServices";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

export default function TechnicalMaintenancePage() {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="bg-muted/30 dark:bg-background/50 py-16 md:py-24">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <OurServices />
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
