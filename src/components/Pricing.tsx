"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

interface PricingProps {
    lang: "en" | "fr";
}

const CONTENT = {
    en: {
        headline: "Pricing Plans",
        subheadline: "Choose the memory capacity that fits your professional network.",
        bestValue: "Best Value",
        cta: "Choose Plan",
        plans: [
            {
                name: "Free",
                contacts: "30 Contacts",
                queries: "100 Queries per month",
                ocr: "30 OCR Credits (LinkedIn/Cards/Photos)",
                businessCards: "2 Digital Business Cards (Basic)",
                storage: "500MB Storage",
                note: "Note: Scanned cards cannot be stored in this tier",
                color: "#6d605c", // Brushed Taupe
                borderColor: "rgba(109, 96, 92, 0.4)",
            },
            {
                name: "Pro",
                contacts: "300 Contacts",
                queries: "600 Queries per month (Chatbot)",
                ocr: "50 OCR Scans per month",
                businessCards: "10 Digital Business Cards (Pro)",
                storage: "5GB Storage",
                color: "#504d47", // Polished Charcoal
                borderColor: "rgba(80, 77, 71, 0.4)",
            },
            {
                name: "Premium",
                contacts: "1,000 Contacts",
                queries: "23,000 Queries per month",
                ocr: "500 OCR Scans per month",
                businessCards: "50 Digital Business Cards (Premium)",
                storage: "Unlimited Storage",
                color: "#ed6b06", // Vibrant Orange
                borderColor: "rgba(237, 107, 6, 0.4)",
                popular: true
            }
        ]
    },
    fr: {
        headline: "Tarifs",
        subheadline: "Choisissez la capacité de mémoire qui convient à votre réseau professionnel.",
        bestValue: "Meilleure Valeur",
        cta: "Choisir le Plan",
        plans: [
            {
                name: "Gratuit",
                contacts: "30 Contacts",
                queries: "100 Requêtes par mois",
                ocr: "30 Crédits OCR (LinkedIn/Cartes/Photos)",
                businessCards: "2 Cartes de Visite Digitales (Basique)",
                storage: "500 Mo de stockage",
                note: "Note : Les cartes scannées ne sont pas stockées",
                color: "#6d605c",
                borderColor: "rgba(109, 96, 92, 0.4)",
            },
            {
                name: "Professionnel",
                contacts: "300 Contacts",
                queries: "600 Requêtes par mois (Chatbot)",
                ocr: "50 Scans OCR par mois",
                businessCards: "10 Cartes de Visite Digitales (Pro)",
                storage: "5 Go de stockage",
                color: "#504d47",
                borderColor: "rgba(80, 77, 71, 0.4)",
            },
            {
                name: "Premium",
                contacts: "1 000 Contacts",
                queries: "23 000 Requêtes par mois",
                ocr: "500 Scans OCR par mois",
                businessCards: "50 Cartes de Visite Digitales (Premium)",
                storage: "Stockage illimité",
                color: "#ed6b06",
                borderColor: "rgba(237, 107, 6, 0.4)",
                popular: true
            }
        ]
    }
};

const PricingCard = ({ plan, isPremium, lang }: { plan: any, isPremium: boolean, lang: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const t = CONTENT[lang as keyof typeof CONTENT];

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                borderColor: plan.borderColor,
                backgroundColor: isPremium ? "" : `${plan.color}20`
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            className={`relative w-full md:w-[380px] rounded-[24px] p-8 transition-all duration-500 overflow-hidden cursor-pointer
                ${isPremium ? "bg-gradient-to-br from-[#ed6b06] to-[#af4d02] shadow-[0_0_50px_rgba(237,107,6,0.3)]" : "bg-white/5 backdrop-blur-md border"}
            `}
        >
            {/* Metallic Sheen Effect for Premium */}
            {isPremium && (
                <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-30 pointer-events-none"
                />
            )}

            {/* Popular Badge */}
            {plan.popular && (
                <div className="absolute top-6 right-6 bg-[#f5f1ed]/20 backdrop-blur-md text-[#f5f1ed] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                    {t.bestValue}
                </div>
            )}

            <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-full flex flex-col">
                <h3 className={`text-4xl font-bold mb-8 ${isPremium ? "text-[#f5f1ed]" : "text-[#504d47]"}`} style={{ color: isPremium ? "#f5f1ed" : plan.color }}>
                    {plan.name}
                </h3>

                <ul className="space-y-6 mb-12 flex-grow">
                    {[plan.contacts, plan.queries, plan.ocr, plan.businessCards, plan.storage].map((feature, i) => (
                        <li key={i} className={`flex items-start gap-3 text-lg leading-tight ${isPremium ? "text-[#f5f1ed]" : "text-[#504d47] opacity-80"}`}>
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isPremium ? "bg-white" : "bg-[#ed6b06]"}`} />
                            {feature}
                        </li>
                    ))}
                    {plan.note && (
                        <li className={`text-xs italic mt-4 ${isPremium ? "text-white/60" : "text-[#504d47]/60"}`}>
                            {plan.note}
                        </li>
                    )}
                </ul>

                <button
                    onClick={async () => {
                        try {
                            const price = plan.name === "Free" || plan.name === "Gratuit" ? 0 : plan.name === "Pro" || plan.name === "Professionnel" ? 19 : 49;
                            if (price === 0) return; // Or handle free tier differently

                            const response = await fetch('/api/checkout', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ amount: price, lang }),
                            });
                            const data = await response.json();
                            if (data.url) window.location.href = data.url;
                        } catch (err) {
                            console.error(err);
                        }
                    }}
                    className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all duration-300
                        ${isPremium
                            ? "bg-[#f5f1ed] text-[#ed6b06] hover:bg-white hover:shadow-xl"
                            : "bg-[#ed6b06] text-[#f5f1ed] hover:bg-[#af4d02] shadow-lg"
                        }
                    `}
                >
                    {t.cta}
                </button>

                {/* Watermark Logo */}
                <div className="absolute bottom-[-10px] right-[-10px] opacity-10 pointer-events-none">
                    <LinkIcon size={80} color={isPremium ? "#ffffff" : plan.color} />
                </div>
            </div>
        </motion.div>
    );
};

const Pricing = ({ lang }: PricingProps) => {
    const t = CONTENT[lang];

    return (
        <section className="bg-[#f5f1ed] py-32 px-8 md:px-24 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#504d47] text-5xl md:text-8xl font-bold mb-8 tracking-tighter"
                    >
                        {t.headline}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#504d47] opacity-60 text-xl md:text-3xl max-w-4xl mx-auto font-medium"
                    >
                        {t.subheadline}
                    </motion.p>
                </div>

                {/* 3D Card Stack Container */}
                <div className="flex flex-col lg:flex-row gap-10 justify-center items-center perspective-[1500px] mb-20">
                    {t.plans.map((plan, idx) => (
                        <PricingCard
                            key={idx}
                            plan={plan}
                            isPremium={idx === 2}
                            lang={lang}
                        />
                    ))}
                </div>

                {/* Calculate Now CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Link
                        href="/pricing"
                        className="group relative"
                    >
                        {/* 3D Shadow/Glow */}
                        <div className="absolute -inset-1 bg-[#504d47] blur-2xl opacity-20 group-hover:opacity-40 group-hover:bg-[#ed6b06] transition-all duration-500 rounded-[20px]" />

                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative flex items-center justify-center gap-4 w-[90vw] md:w-auto px-8 md:px-16 h-[60px] md:h-[80px] bg-gradient-to-br from-[#ed6b06] to-[#ff8c42] rounded-[20px] shadow-[0_10px_40px_rgba(237,107,6,0.3)] overflow-hidden border border-white/20 mx-auto"
                        >
                            {/* Metallic Sheen Animation */}
                            <motion.div
                                animate={{ x: ["-100%", "250%"] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
                            />

                            <span className="text-[#f5f1ed] text-2xl font-bold uppercase tracking-widest relative z-10">
                                {lang === "en" ? "Calculate Now" : "Calculer Maintenant"}
                            </span>

                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-[#f5f1ed] text-3xl font-bold relative z-10"
                            >
                                →
                            </motion.span>
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
