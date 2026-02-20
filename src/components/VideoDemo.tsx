"use client";

import { motion } from "framer-motion";

interface VideoDemoProps {
    lang: "en" | "fr";
}

const CONTENT = {
    en: {
        comingSoon: "Demo Video Coming Soon",
    },
    fr: {
        comingSoon: "Démo Vidéo Bientôt Disponible",
    }
};

const VideoDemo = ({ lang }: VideoDemoProps) => {
    const t = CONTENT[lang];

    return (
        <section className="bg-[#f5f1ed] py-24 px-8 md:px-24">
            <div className="max-w-7xl mx-auto flex justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-[90vw] md:w-full md:max-w-[1000px] aspect-video rounded-[24px] overflow-hidden shadow-2xl group"
                >
                    {/* Background Image (Blurred Networking theme) */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop&blur=20')`,
                        }}
                    />

                    {/* Dark Glassmorphism Overlay */}
                    <div className="absolute inset-0 bg-[#504d47]/40 backdrop-blur-[10px]" />

                    {/* Content Layer */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        {/* Pulse Play Icon */}
                        <div className="relative mb-8">
                            {/* Outer Pulse */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 bg-[#ed6b06] rounded-full blur-xl"
                            />

                            {/* Play Button Icon */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="relative w-24 h-24 bg-[#ed6b06] rounded-full flex items-center justify-center shadow-lg border border-white/20"
                            >
                                <svg
                                    width="32"
                                    height="38"
                                    viewBox="0 0 32 38"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2"
                                >
                                    <path d="M29.5 15.6699C31.5 17.0163 31.5 19.9837 29.5 21.3301L5.5 37.5692C3.5 38.9157 0.749998 37.432 0.749998 35.2391L0.749999 2.76089C0.749999 0.568018 3.5 -0.915655 5.5 0.430752L29.5 15.6699Z" fill="#f5f1ed" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Text Overlay */}
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-[#f5f1ed] text-3xl md:text-5xl font-bold tracking-tight uppercase"
                            style={{ fontFamily: "'Forma DJR Banner', sans-serif" }}
                        >
                            {t.comingSoon}
                        </motion.h3>
                    </div>

                    {/* Subtle Gradient Glow */}
                    <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-[#ed6b06] blur-[200px] opacity-10 pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
};

export default VideoDemo;
