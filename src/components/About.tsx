"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
    lang: "en" | "fr";
}

const TRANSLATIONS = {
    en: {
        badge: "Rescuing Relationships",
        subtitle: "From the Limits of Human Memory",
        storyTitle: "Our Story",
        storyContent: "Welcome to Memorable Contact. We believe every handshake holds potential, but human memory is imperfect. In the rush of a conference, the \"where,\" \"why,\" and \"how\" often slip away. We aren't building a database; we are building your Personal Memory System.",
        promiseTitle: "Our Promise",
        promiseContent: "To bridge the gap between meeting someone and actually remembering them—one intelligent conversation at a time.",
        ceoName: "Amurtha",
        ceoRole: "Founder & CEO",
        ceoOrg: "Asokumar Group of Companies",
    },
    fr: {
        badge: "Sauver les Relations",
        subtitle: "Des limites de la mémoire humaine",
        storyTitle: "Notre Histoire",
        storyContent: "Bienvenue chez Memorable Contact. Nous pensons que chaque poignée de main recèle un potentiel, mais la mémoire humaine est imparfaite. Dans le rush d'une conférence, le « où », le « pourquoi » et le « comment » s'échappent souvent. Nous ne construisons pas une base de données ; nous construisons votre système de mémoire personnel.",
        promiseTitle: "Notre Promesse",
        promiseContent: "Combler le fossé entre la rencontre et le souvenir réel—une conversation intelligente à la fois.",
        ceoName: "Amurtha",
        ceoRole: "Fondatrice et PDG",
        ceoOrg: "Asokumar Group of Companies",
    },
};

export default function About({ lang }: Props) {
    const t = TRANSLATIONS[lang];

    return (
        <section className="relative py-24 overflow-hidden brushed-metal">

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Narrative Content */}
                    <div className="lg:w-3/5 space-y-12">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <span className="inline-block px-4 py-1 rounded-full bg-[#ed6b06]/10 text-[#ed6b06] font-bold tracking-widest text-sm uppercase" style={{ fontFamily: "'Forma DJR Banner', sans-serif" }}>
                                {t.badge}
                            </span>
                            <h2 className="text-4xl lg:text-5xl font-bold text-[#504d47] leading-tight">
                                {t.subtitle}
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="space-y-4"
                            >
                                <h3 className="text-2xl font-bold text-[#ed6b06] flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-[#ed6b06]" />
                                    {t.storyTitle}
                                </h3>
                                <p className="text-[#504d47]/80 text-lg leading-relaxed font-medium">
                                    {t.storyContent}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="space-y-4"
                            >
                                <h3 className="text-2xl font-bold text-[#ed6b06] flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-[#ed6b06]" />
                                    {t.promiseTitle}
                                </h3>
                                <p className="text-[#504d47]/80 text-lg leading-relaxed font-medium italic">
                                    "{t.promiseContent}"
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* CEO Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, rotateY: 20 }}
                        whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-2/5 relative group"
                    >
                        <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-white/20">
                            <Image
                                src="https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771487248/WhatsApp_Image_2026-02-19_at_1.13.49_PM_wu9kvc.jpg"
                                alt="Amurtha - Founder & CEO"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Glass Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#504d47] via-transparent to-transparent opacity-60" />

                            {/* Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-10 space-y-2 backdrop-blur-sm bg-black/20">
                                <motion.h4
                                    className="text-3xl font-bold text-[#f5f1ed]"
                                    whileHover={{ color: "#ed6b06" }}
                                >
                                    {t.ceoName}
                                </motion.h4>
                                <p className="text-[#ed6b06] font-bold tracking-widest uppercase text-sm">
                                    {t.ceoRole}
                                </p>
                                <p className="text-white/60 text-xs font-medium tracking-wider">
                                    {t.ceoOrg}
                                </p>
                            </div>
                        </div>

                        {/* Decorative Metallic Ring */}
                        <div className="absolute -inset-4 border border-[#ed6b06]/20 rounded-[48px] -z-10 group-hover:border-[#ed6b06]/40 transition-colors duration-500" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
