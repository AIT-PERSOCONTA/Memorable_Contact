"use client";

import { motion } from "framer-motion";

interface StatsProps {
    lang: "en" | "fr";
}

const CONTENT = {
    en: [
        {
            value: "2.5s",
            label: "Storage Speed",
            description: "AI extracts details in 2.5s.",
            icon: "lightning"
        },
        {
            value: "99.9%",
            label: "Recall Accuracy",
            description: "Find people with vague memories.",
            icon: "target"
        },
        {
            value: "OCR",
            label: "Instant Extraction",
            description: "Precision from LinkedIn/Cards.",
            icon: "id-card"
        },
        {
            value: "100%",
            label: "Offline Reliability",
            description: "GPS & notes sync on reconnect.",
            icon: "airplane"
        }
    ],
    fr: [
        {
            value: "2.5s",
            label: "Vitesse de Stockage",
            description: "Enregistrement en 2.5s.",
            icon: "lightning"
        },
        {
            value: "99.9%",
            label: "Précision du Rappel",
            description: "Retrouvez vos contacts.",
            icon: "target"
        },
        {
            value: "OCR",
            label: "Extraction Instantanée",
            description: "Précision OCR LinkedIn.",
            icon: "id-card"
        },
        {
            value: "100%",
            label: "Fiabilité Hors-Ligne",
            description: "Synchronisation GPS.",
            icon: "airplane"
        }
    ]
};

const Icon = ({ type }: { type: string }) => {
    switch (type) {
        case "lightning":
            return (
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-[#ed6b06] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 10V3L4 14H11V21L20 10H13Z" />
                </svg>
            );
        case "target":
            return (
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-[#504d47] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                </svg>
            );
        case "id-card":
            return (
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-[#504d47] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-12 6h4v2h-4v-2zm0 4h4v2h-4v-2zm10 4h-10v-2h10v2zm0-4h-4v-4h4v4z" />
                </svg>
            );
        case "airplane":
            return (
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-[#6d605c] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16v-2l-8-5v-11.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5l-8 5v2l8-2.5v5.5l-2 1.5v1.5l3.5-1 3.5 1v-1.5l-2-1.5v-5.5l8 2.5z" />
                </svg>
            );
        default:
            return null;
    }
};

const Stats = ({ lang }: StatsProps) => {
    const items = CONTENT[lang];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="bg-[#f5f1ed] py-20 px-8 md:px-24">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
            >
                {items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl glass-cream shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                    >
                        <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
                            <Icon type={item.icon} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-4xl md:text-5xl font-bold text-[#ed6b06] metallic-shine">
                                {item.value}
                            </h3>
                            <p className="text-lg font-bold text-[#504d47] uppercase tracking-wider">
                                {item.label}
                            </p>
                        </div>
                        <p className="text-[#504d47] opacity-70 leading-relaxed italic">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Stats;
