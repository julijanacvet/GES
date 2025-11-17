
'use client';

import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

const projectImages = [
    { src: "/locales/images/projects/project-1.jpg", alt: "Solar panel installation on a modern home", dataAiHint: "modern home solar" },
    { src: "/locales/images/projects/project-2.jpg", alt: "Expansive solar farm under a clear blue sky", dataAiHint: "solar farm aerial" },
    { src: "/locales/images/projects/project-3.jpg", alt: "Close-up of solar panels on a commercial roof", dataAiHint: "commercial roof solar" },
    { src: "/locales/images/projects/project-4.jpg", alt: "Residential solar system with a battery storage unit", dataAiHint: "home solar battery" },
    { src: "/locales/images/projects/project-5.jpg", alt: "Solar panels installed on a rural barn", dataAiHint: "farm solar panels" },
    { src: "/locales/images/projects/project-6.jpg", alt: "Technician inspecting solar panels on a rooftop", dataAiHint: "solar panel maintenance" },
    { src: "/locales/images/projects/project-7.jpg", alt: "Large ground-mounted solar array in a field", dataAiHint: "ground mount solar" },
    { src: "/locales/images/projects/project-8.jpg", alt: "Solar panels on a multi-story apartment building", dataAiHint: "apartment building solar" },
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

