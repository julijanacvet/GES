
'use client';

import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

const projectImages = [
    { src: "/locales/images/pages/projects/01-GND-Excavation.jpg", alt: "Ground excavation for solar panel foundation", dataAiHint: "ground excavation" },
    { src: "/locales/images/pages/projects/02-GND-Racking_Install.jpg", alt: "Installation of solar panel racking system", dataAiHint: "racking install" },
    { src: "/locales/images/pages/projects/04-GND-Completed_Array_Hillsid...jpg", alt: "Completed solar array on a hillside", dataAiHint: "solar array hillside" },
    { src: "/locales/images/pages/projects/05-LGR-Racking_Sunset.jpg", alt: "Solar panel racking at sunset", dataAiHint: "racking sunset" },
    { src: "/locales/images/pages/projects/06-LGR-Racking_Wide_View.jpg", alt: "Wide view of solar panel racking", dataAiHint: "racking wide" },
    { src: "/locales/images/pages/projects/07-LGR-Panel_Install_Progress.jpg", alt: "Progress of a solar panel installation", dataAiHint: "panel installation" },
    { src: "/locales/images/pages/projects/08-LGR-Working_In_Mist.jpg", alt: "Technicians working on solar panels in mist", dataAiHint: "solar work mist" },
    { src: "/locales/images/pages/projects/09-LGR-Completed_Section.jpg", alt: "A completed section of a solar farm", dataAiHint: "solar section" },
    { src: "/locales/images/pages/projects/10-CRV-Crew_On_Ridge.jpg", alt: "Installation crew on a roof ridge", dataAiHint: "crew roof" },
    { src: "/locales/images/pages/projects/11-CRV-Wiring_Detail.jpg", alt: "Detailed view of solar panel wiring", dataAiHint: "solar wiring" },
    { src: "/locales/images/pages/projects/12-CRV-Completed_Array_Overvie...jpg", alt: "Overview of a completed solar array", dataAiHint: "array overview" },
    { src: "/locales/images/pages/projects/13-SML-Red_Roof_Residential.jpg", alt: "Solar panels on a red roof of a residential house", dataAiHint: "red roof" },
    { src: "/locales/images/pages/projects/14-SML-City_Rooftop_View.jpg", alt: "Solar panels on a city rooftop", dataAiHint: "city rooftop" },
    { src: "/locales/images/pages/projects/15-SML-Apartment_Reflection.jpg", alt: "Reflection on solar panels on an apartment building", dataAiHint: "apartment reflection" },
    { src: "/locales/images/pages/projects/16-SML-Two_Section_Roof.jpg", alt: "Two sections of solar panels on a roof", dataAiHint: "roof sections" },
    { src: "/locales/images/pages/projects/17-SML-Flat_Commercial.jpg", alt: "Solar panels on a flat commercial roof", dataAiHint: "flat commercial" },
    { src: "/locales/images/pages/projects/18-OVW-Project_Collage.jpg", alt: "A collage overview of a solar project", dataAiHint: "project collage" },
];


export default function ProjectsPage() {
    const { t } = useTranslation('common');

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
                <section className="py-16 md:py-24">
                    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div 
                          className="text-center mb-12"
                          initial="hidden"
                          animate="visible"
                          variants={itemVariants}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold">{t('projects.pageTitle')}</h1>
                            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">{t('projects.pageDescription')}</p>
                        </motion.div>

                        <motion.div 
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                            {projectImages.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative h-64 md:h-80 w-full overflow-hidden rounded-xl shadow-lg"
                                    variants={itemVariants}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        style={{objectFit: 'cover'}}
                                        className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        data-ai-hint={image.dataAiHint}
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

