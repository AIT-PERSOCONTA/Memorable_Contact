"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Testimonial {
    id: number;
    name: string;
    quoteEn: string;
    quoteFr: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Subashini",
        quoteEn: "“We managed all our meeting flows through the chat platform. That alone saved us weeks. We caught details we didn't even think to recall.”",
        quoteFr: "« Nous avons géré tous nos flux de rencontres via la plateforme de chat. Cela nous a fait gagner des semaines. Nous avons saisi des détails que nous n'aurions même pas pensé à retenir. »"
    },
    {
        id: 2,
        name: "Arun",
        quoteEn: "“Reliable, fast, and surprisingly easy to use. Memorable Contact is now a critical part of our professional networking pipeline.”",
        quoteFr: "« Fiable, rapide et étonnamment simple à utiliser. Memorable Contact est désormais un élément essentiel de notre pipeline de réseautage professionnel. »"
    },
    {
        id: 3,
        name: "Aswathy",
        quoteEn: "“Our productivity improved overnight. The platform understands how people really connect—it feels like chatting with a personal assistant, not a database.”",
        quoteFr: "« Notre productivité s'est améliorée du jour au lendemain. La plateforme comprend comment les gens se connectent réellement—on a l'impression de discuter avec un assistant personnel, pas une base de données. »"
    },
    {
        id: 4,
        name: "Hemanth",
        quoteEn: "“Memorable Contact helped us scale real-world relationships. Our team is smarter and more organized because every chat log becomes a searchable asset.”",
        quoteFr: "« Memorable Contact nous a aidés à développer nos relations réelles. Notre équipe est plus intelligente et mieux organisée car chaque log de chat devient un atout consultable. »"
    }
];

const CONTENT = {
    en: {
        headline: "What Our Customers Say",
        rating: "Rating: 4.8 / 5.0",
        subheadline: "Memorable Contact has become the industry standard for AI-driven networking productivity.",
    },
    fr: {
        headline: "Ce que disent nos clients",
        rating: "Note : 4.8 / 5.0",
        subheadline: "Memorable Contact est devenu la norme de l'industrie pour la productivité du réseautage piloté par l'IA.",
    }
};

const AnimatedStars = () => {
    return (
        <div className="flex justify-center md:justify-start gap-1">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="star-container"
                    style={{ animationDelay: `${i * 0.15}s` }}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 md:w-4 md:h-4"
                    >
                        <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            fill="#ed6b06"
                            className="star-path"
                        />
                    </svg>
                </div>
            ))}
            <style jsx>{`
                .star-container {
                    display: inline-block;
                    animation: star-pulse 3s infinite ease-in-out;
                    will-change: transform;
                }
                .star-path {
                    animation: star-shine 3s infinite ease-in-out;
                }
                @keyframes star-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }
                @keyframes star-shine {
                    0%, 100% { 
                        fill: #ed6b06;
                        opacity: 0.8;
                    }
                    50% { 
                        fill: #ffb800;
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

const VisualBridgeArrow = () => {
    return (
        <div className="relative w-full flex justify-center py-8 overflow-hidden pointer-events-none">
            <svg
                width="200"
                height="120"
                viewBox="0 0 200 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:block" // Desktop S-Curve
            >
                <motion.path
                    d="M100 10 C 130 10, 170 40, 170 60 C 170 80, 130 110, 100 110"
                    stroke="#ed6b06"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="0 1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                        filter: "drop-shadow(0 4px 10px rgba(237, 107, 6, 0.4))",
                    }}
                />
                <motion.path
                    d="M95 105 L100 110 L105 105"
                    stroke="#ed6b06"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                />
            </svg>

            <svg
                width="40"
                height="100"
                viewBox="0 0 40 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:hidden" // Mobile Vertical Arrow
            >
                <motion.path
                    d="M20 10 L20 90"
                    stroke="#ed6b06"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    style={{ filter: "drop-shadow(0 2px 5px rgba(237, 107, 6, 0.4))" }}
                />
                <motion.path
                    d="M15 85 L20 90 L25 85"
                    stroke="#ed6b06"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                />
            </svg>

            {/* Hover Pulse Glow */}
            <motion.div
                className="absolute inset-x-0 bottom-0 flex justify-center"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-24 h-4 bg-[#ed6b06] blur-[20px] rounded-full" />
            </motion.div>
        </div>
    );
};

const Testimonials = ({ lang }: { lang: "en" | "fr" }) => {
    const [index, setIndex] = useState(0);
    const t = CONTENT[lang];

    // Carousel logic for mobile
    const nextStep = () => setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    const prevStep = () => setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

    return (
        <section className="bg-[#f5f1ed] py-24 px-8 md:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-4 bg-[#ed6b06]/10 text-[#ed6b06] px-6 py-2 rounded-full font-bold text-lg mb-6"
                    >
                        <span>{t.rating}</span>
                        <AnimatedStars />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#504d47] text-4xl md:text-6xl font-bold mb-6"
                    >
                        {t.headline}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#504d47] opacity-60 text-xl max-w-3xl mx-auto leading-relaxed"
                    >
                        {t.subheadline}
                    </motion.p>
                </div>

                {/* Visual Bridge Arrow */}
                <VisualBridgeArrow />

                {/* Mobile Carousel (One card at a time with swipe) */}
                <div className="md:hidden relative h-[450px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={TESTIMONIALS[index].id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="bg-[#f5f1ed] border border-[#ed6b06]/20 rounded-[15px] p-10 shadow-xl w-full text-center relative overflow-hidden group">
                                <span className="absolute top-4 left-6 text-[#ed6b06] text-7xl opacity-20 font-serif leading-none transition-transform group-hover:scale-110 duration-500">“</span>
                                <p className="text-[#504d47] text-xl leading-relaxed mb-10 min-h-[160px] flex items-center justify-center italic">
                                    {lang === "en" ? TESTIMONIALS[index].quoteEn : TESTIMONIALS[index].quoteFr}
                                </p>
                                <div className="space-y-2">
                                    <h4 className="text-[#ed6b06] text-2xl font-bold uppercase tracking-widest">{TESTIMONIALS[index].name}</h4>
                                    <div className="flex justify-center w-full">
                                        <AnimatedStars />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Carousel Controls */}
                    <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-4">
                        <button onClick={prevStep} className="w-12 h-12 bg-[#504d47] text-[#f5f1ed] rounded-full flex items-center justify-center hover:bg-[#ed6b06] transition-colors">←</button>
                        <button onClick={nextStep} className="w-12 h-12 bg-[#504d47] text-[#f5f1ed] rounded-full flex items-center justify-center hover:bg-[#ed6b06] transition-colors">→</button>
                    </div>
                </div>

                {/* Desktop Grid Layout */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#f5f1ed] border border-[#ed6b06]/20 rounded-[15px] p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 relative flex flex-col justify-between group h-full"
                        >
                            <span className="absolute top-4 left-4 text-[#ed6b06] text-6xl opacity-20 font-serif leading-none transition-transform group-hover:scale-110 duration-500">“</span>
                            <p className="text-[#504d47] text-lg leading-relaxed mb-8 relative z-10 italic">
                                {lang === "en" ? testimonial.quoteEn : testimonial.quoteFr}
                            </p>
                            <div className="relative z-10 border-t border-[#ed6b06]/10 pt-6 mt-auto">
                                <h4 className="text-[#ed6b06] text-xl font-bold uppercase tracking-wider mb-2">{testimonial.name}</h4>
                                <AnimatedStars />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
