
import initServerTranslations from '@/app/i18n';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import LogoMarquee from './components/LogoMarquee';
import ServicesSection from './components/ServicesSection';
import OurServices from './components/OurServices'; 
import VideoCarousel from './components/VideoCarousel';
import SolarCalculator from './components/SolarCalculator';
import WhyChooseGES from './components/WhyChooseGES';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import CallToActionBlock from './components/CallToActionBlock';
import Footer from './components/Footer';


export default async function HomePage({ params: { locale } }: { params: { locale: string }}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <BenefitsSection />
        <LogoMarquee />
        <ServicesSection />
        <OurServices />
        <VideoCarousel />
        <SolarCalculator />
        <WhyChooseGES />
        <TestimonialsSection />
        <FAQSection />
        <CallToActionBlock />
      </main>
      <Footer />
    </div>
  );
}
