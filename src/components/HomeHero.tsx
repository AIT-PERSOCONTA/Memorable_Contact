"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface HomeHeroProps {
    lang: "en" | "fr";
}

const CONTENT = {
    en: {
        headline: "Stop Forgetting Who You Met.",
        subheadline: "The AI-powered personal memory system that captures every professional detail—exactly where, when, and how you met.",
        btnPrimary: "Request a Call",
        btnSecondary: "View Demo",
        phone: "+33 665354787"
    },
    fr: {
        headline: "Ne perdez plus jamais le fil de vos rencontres.",
        subheadline: "Le système de mémoire personnelle assisté par IA qui capture chaque détail professionnel — exactement où, quand et comment vous vous êtes rencontrés.",
        btnPrimary: "Demander un rappel",
        btnSecondary: "Voir la démo",
        phone: "+33 665354787"
    }
};

const HomeHero = ({ lang }: HomeHeroProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Entrance Animation: Zoom from 70% to 100%
    const scale = useTransform(scrollYProgress, [0, 0.4], [0.7, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    const t = CONTENT[lang];

    return (
        <section
            ref={containerRef}
            className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#f5f1ed] p-8 md:p-24"
        >
            <motion.div
                style={{ scale, opacity }}
                className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12"
            >
                {/* Left: Text Content */}
                <div className="w-full md:w-1/2 flex flex-col items-start space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-[#504d47] leading-tight tracking-tight">
                        {t.headline.split(" ").map((word, i) => (
                            <span key={i} className={word === "Forgetting" || word === "perdez" ? "text-[#ed6b06]" : ""}>
                                {word}{" "}
                            </span>
                        ))}
                    </h1>
                    <p className="text-xl text-[#504d47] opacity-80 max-w-xl leading-relaxed">
                        {t.subheadline}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <a
                            href="https://wa.me/33665354787"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-orange-metallic px-10 py-5 rounded-full text-lg flex items-center justify-center w-full sm:w-auto"
                        >
                            {t.btnPrimary}
                        </a>
                        <button className="btn-white-metallic px-10 py-5 rounded-full text-lg w-full sm:w-auto">
                            {t.btnSecondary}
                        </button>
                    </div>
                </div>

                {/* Right: 3D Asset Placeholder */}
                <div className="w-full md:w-1/2 relative h-[40vh] md:h-[60vh] flex items-center justify-center">
                    <div className="relative w-full h-full max-w-[600px] animate-pulse-slow">
                        {/* 
                            Placeholder for the 3D Orange Blocks image. 
                            In a real scenario, this would be an Image component or a 3D Scene.
                        */}
                        <div className="w-full h-full bg-gradient-to-br from-[#ed6b06] to-[#ff9233] opacity-20 rounded-full blur-3xl absolute inset-0 -z-10" />
                        <div className="w-full h-full flex items-center justify-center">
                            <motion.div
                                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="150" y="50" width="100" height="100" rx="12" fill="#ed6b06" fillOpacity="0.8" />
                                    <rect x="50" y="150" width="80" height="80" rx="10" fill="#ed6b06" fillOpacity="0.6" />
                                    <rect x="250" y="180" width="120" height="120" rx="15" fill="#ed6b06" fillOpacity="0.9" />
                                    <rect x="180" y="280" width="60" height="60" rx="8" fill="#ed6b06" fillOpacity="0.5" />
                                    <rect x="80" y="280" width="90" height="90" rx="12" fill="#ed6b06" fillOpacity="0.7" />
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HomeHero;
