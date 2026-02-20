"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CONTENT = {
    en: {
        headline: "Rescuing Relationships from the Limits of Human Memory.",
        body: "Welcome to Memorable Contact. We believe every handshake holds a world of potential... we are building your Personal Memory System.",
        signature: "— Amurtha, Founder & CEO",
    },
    fr: {
        headline: "Sauver vos relations des limites de la mémoire humaine.",
        body: "Bienvenue chez Memorable Contact. Nous ne construisons pas une base de données classique ; nous créons votre Système de Mémoire Personnel.",
        signature: "— Amurtha, Fondatrice & CEO",
    },
};

interface SecondScreenProps {
    lang: "en" | "fr";
}

const SecondScreen = ({ lang }: SecondScreenProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const signatureRef = useRef<HTMLDivElement>(null);
    const isSignatureInView = useInView(signatureRef, { once: true, amount: 0.5 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const { scrollYProgress: exitProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"],
    });

    // Parallax and Ken Burns transforms
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const imageX = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

    // Exit transforms (Zoom Out Effect)
    const exitScale = useTransform(exitProgress, [0.8, 1], [1, 1.5]);
    const exitOpacity = useTransform(exitProgress, [0.8, 1], [1, 0]);

    const t = CONTENT[lang];

    return (
        <section
            ref={containerRef}
            className="brushed-metal min-h-screen relative overflow-hidden flex flex-col md:flex-row items-center justify-center p-8 md:p-24"
            style={{ backgroundColor: "#f5f1ed" }}
        >
            <motion.div
                style={{ scale: exitScale, opacity: exitOpacity }}
                className="w-full h-full flex flex-col md:flex-row items-center justify-center"
            >
                {/* Left Side: Typography */}
                <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8 z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-bold text-[#ed6b06] leading-tight"
                    >
                        {t.headline}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-lg md:text-xl text-[#504d47] max-w-lg leading-relaxed"
                    >
                        {t.body}
                    </motion.p>

                    <motion.div
                        ref={signatureRef}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className={`text-xl md:text-2xl font-serif text-[#ed6b06] italic metallic-glint py-2 ${isSignatureInView ? "animate-glint" : ""
                            }`}
                    >
                        {t.signature}
                    </motion.div>
                </div>

                {/* Right Side: CEO Portrait */}
                <div className="w-full md:w-1/2 relative h-[50vh] md:h-screen mt-12 md:mt-0 flex items-center justify-center">
                    <motion.div
                        style={{ x: imageX, y, scale: imageScale }}
                        className="relative w-full h-full max-w-[500px] max-h-[700px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771487248/WhatsApp_Image_2026-02-19_at_1.13.49_PM_wu9kvc.jpg"
                            alt="Amurtha, Founder & CEO"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default SecondScreen;
