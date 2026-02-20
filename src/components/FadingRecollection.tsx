"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface FadingRecollectionProps {
    lang: "en" | "fr";
}

const CONTENT = {
    en: {
        headline: "The Fading Recollection",
        subheadline: "70% of professional context is lost within 48 hours.",
        askHeadline: "Ask Yourself...",
        questions: [
            "You remember the face, but can you recall the one specific problem they asked you to solve?",
            "It’s been three days since the conference. Do you still remember why you promised to follow up with \"that person from the tech panel\"?",
            "If you lost your phone today, how much of your last networking event would actually remain in your head?"
        ],
        scienceHeadline: "The Science of Memory",
        scienceText: "Human memory is designed to filter, not to store. Without an external system, names become faces, and faces become \"someone I used to know.\"",
        solution: "Clarity through AI",
        cta: "Request a Call"
    },
    fr: {
        headline: "L'évanouissement des Souvenirs",
        subheadline: "70 % du contexte professionnel est perdu en moins de 48 heures.",
        askHeadline: "Posez-vous la question...",
        questions: [
            "Vous vous souvenez du visage, mais pouvez-vous rappeler le problème spécifique qu'ils vous ont demandé de résoudre ?",
            "Trois jours ont passé depuis la conférence. Vous rappelez-vous pourquoi vous avez promis de recontacter « cette personne du panel tech » ?",
            "Si vous perdiez votre téléphone aujourd'hui, quelle part de votre dernier événement de networking resterait réellement dans votre esprit ?"
        ],
        scienceHeadline: "La Science de la Mémoire",
        scienceText: "La mémoire humaine est conçue pour filtrer, pas pour stocker. Sans un système externe, les noms deviennent des visages, et les visages deviennent des « connaissances oubliées ».",
        solution: "La clarté via l'IA",
        cta: "Demander un Appel"
    }
};

const QuestionItem = ({ text, index, scrollYProgress }: { text: string, index: number, scrollYProgress: any }) => {
    // Each question is fully opaque only in its specific part of the scroll
    const start = index * 0.25 + 0.1;
    const end = (index + 1) * 0.25 + 0.1;
    const peak = (start + end) / 2;

    const opacity = useTransform(
        scrollYProgress,
        [start, peak, end],
        [0, 1, 0]
    );

    const blur = useTransform(
        scrollYProgress,
        [start, peak, end],
        ["20px", "0px", "20px"]
    );

    const scale = useTransform(
        scrollYProgress,
        [start, peak, end],
        [0.9, 1, 0.9]
    );

    return (
        <motion.div
            style={{ opacity, filter: `blur(${blur})`, scale }}
            className="absolute inset-0 flex items-center justify-center px-8 md:px-0"
        >
            <div className="max-w-3xl text-center">
                <p className="text-[#f5f1ed] text-2xl md:text-5xl font-medium leading-relaxed italic">
                    {text}
                </p>
            </div>
        </motion.div>
    );
};

const FadingRecollection = ({ lang }: FadingRecollectionProps) => {
    const t = CONTENT[lang];
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Global background blur that increases as we move deeper
    const sectionBlur = useTransform(smoothScroll, [0, 0.8], ["0px", "20px"]);
    const sectionOpacity = useTransform(smoothScroll, [0.8, 1], [0.8, 0.4]);

    // Final reveal logic
    const solutionOpacity = useTransform(smoothScroll, [0.85, 0.95], [0, 1]);
    const solutionScale = useTransform(smoothScroll, [0.85, 0.95], [0.8, 1]);
    const fogClear = useTransform(smoothScroll, [0.85, 0.95], ["blur(15px)", "blur(0px)"]);

    return (
        <section ref={containerRef} className="relative h-[500vh] bg-[#504d47]">
            {/* Sticky Canvas */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

                {/* Visual Fog Background */}
                <motion.div
                    style={{ filter: `blur(${sectionBlur})`, opacity: sectionOpacity }}
                    className="absolute inset-0 bg-gradient-to-b from-[#504d47] to-[#252321]"
                />

                {/* Background "Noise" Texture to simulate mist/pixelation */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

                <div className="container mx-auto h-full relative z-10 w-full max-w-full">

                    {/* Intro Headline - fades out early */}
                    <motion.div
                        style={{
                            opacity: useTransform(smoothScroll, [0, 0.1], [1, 0]),
                            y: useTransform(smoothScroll, [0, 0.1], [0, -100]),
                            filter: useTransform(smoothScroll, [0, 0.1], ["blur(0px)", "blur(10px)"])
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                    >
                        <h2 className="text-[#f5f1ed] text-5xl md:text-8xl font-bold mb-8 tracking-tighter">
                            {t.headline}
                        </h2>
                        <div className="h-1 w-32 bg-[#ed6b06] mb-8" />
                        <p className="text-[#ed6b06] text-xl md:text-3xl font-bold uppercase tracking-widest max-w-4xl">
                            {t.subheadline}
                        </p>
                    </motion.div>

                    {/* Questions Loop */}
                    <div className="relative h-full w-full">
                        {t.questions.map((q, idx) => (
                            <QuestionItem
                                key={idx}
                                text={q}
                                index={idx}
                                scrollYProgress={smoothScroll}
                            />
                        ))}
                    </div>

                    {/* The "Orange Beacon" Solution Reveal */}
                    <motion.div
                        style={{
                            opacity: solutionOpacity,
                            scale: solutionScale,
                            filter: fogClear
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-20"
                    >
                        <div className="relative group max-w-5xl">
                            {/* Emissive Glow */}
                            <motion.div
                                animate={{
                                    boxShadow: ["0 0 40px #ed6b06", "0 0 100px #ed6b06", "0 0 40px #ed6b06"]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-[#ed6b06] rounded-full blur-[80px] opacity-20"
                            />

                            <div className="relative z-10 flex flex-col items-center gap-12">
                                <div className="text-[#ed6b06] text-7xl md:text-[12rem] font-bold mb-4 tracking-tighter leading-none">
                                    MEMORABLE
                                </div>
                                <h3 className="text-[#f5f1ed] text-3xl md:text-6xl font-bold uppercase tracking-tight">
                                    {t.solution}
                                </h3>
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(237,107,6,0.6)" }}
                                    className="px-16 py-6 bg-[#ed6b06] text-[#f5f1ed] rounded-2xl font-bold text-2xl shadow-[0_0_30px_rgba(237,107,6,0.3)] transition-all duration-300 uppercase tracking-widest"
                                >
                                    {t.cta}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Spacer to allow for full scroll progress */}
        </section>
    );
};

export default FadingRecollection;
