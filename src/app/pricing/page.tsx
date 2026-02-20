"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, Link as LinkIcon, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ROICalculator from "@/components/ROICalculator";

const CONTENT = {
    en: {
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the memory capacity that fits your professional network.",
        back: "Back to Home",
        cta: "Get Started",
        plans: [
            {
                name: "Free",
                tier: "Starter",
                price: "$0",
                period: "/month",
                features: ["30 Contacts", "100 Queries per month", "30 OCR Credits", "2 Digital Business Cards", "500MB Cloud Storage"],
                note: "Note: Scanned visiting cards cannot be stored in this tier",
                colors: {
                    bg: "#f5f1ed",
                    text: "#504d47",
                    accent: "#504d47",
                    border: "rgba(80, 77, 71, 0.2)"
                }
            },
            {
                name: "Pro",
                tier: "Power User",
                price: "$19",
                period: "/month",
                features: ["300 Contacts", "600 Queries per month", "50 OCR Scans per month", "10 Digital Business Cards", "5GB Cloud Storage"],
                colors: {
                    bg: "#504d47",
                    text: "#f5f1ed",
                    accent: "#ed6b06",
                    border: "rgba(237, 107, 6, 0.3)"
                }
            },
            {
                name: "Premium",
                tier: "Networker",
                price: "$49",
                period: "/month",
                isRecommended: true,
                features: ["1,000 Contacts", "23,000 Queries per month", "500 OCR Scans per month", "50 Digital Business Cards", "Unlimited Storage"],
                colors: {
                    bg: "#ed6b06",
                    text: "#f5f1ed",
                    accent: "#f5f1ed",
                    border: "rgba(245, 241, 237, 0.3)"
                }
            }
        ]
    },
    fr: {
        title: "Tarification Simple et Transparente",
        subtitle: "Choisissez la capacité de mémoire qui convient à votre réseau professionnel.",
        back: "Retour à l'accueil",
        cta: "Commencer",
        plans: [
            {
                name: "Gratuit",
                tier: "Débutant",
                price: "0 €",
                period: "/mois",
                features: ["30 Contacts", "100 Requêtes par mois", "30 Crédits OCR", "2 Cartes de Visite Digitales", "500 Mo de Stockage"],
                note: "Note : Les cartes scannées ne sont pas stockées",
                colors: {
                    bg: "#f5f1ed",
                    text: "#504d47",
                    accent: "#504d47",
                    border: "rgba(80, 77, 71, 0.2)"
                }
            },
            {
                name: "Pro",
                tier: "Utilisateur Élite",
                price: "19 €",
                period: "/mois",
                features: ["300 Contacts", "600 Requêtes par mois", "50 Scans OCR par mois", "10 Cartes de Visite Digitales", "5 Go de Stockage"],
                colors: {
                    bg: "#504d47",
                    text: "#f5f1ed",
                    accent: "#ed6b06",
                    border: "rgba(237, 107, 6, 0.3)"
                }
            },
            {
                name: "Premium",
                tier: "Le Réseauteur",
                price: "49 €",
                period: "/mois",
                isRecommended: true,
                features: ["1 000 Contacts", "23 000 Requêtes par mois", "500 Scans OCR par mois", "50 Cartes de Visite Digitales", "Stockage Illimité"],
                colors: {
                    bg: "#ed6b06",
                    text: "#f5f1ed",
                    accent: "#f5f1ed",
                    border: "rgba(245, 241, 237, 0.3)"
                }
            }
        ]
    }
};

const PricingCard = ({ plan, index, lang }: { plan: any, index: number, lang: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
        setIsHovered(false);
    };

    const t = CONTENT[lang as keyof typeof CONTENT];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, x: index === 0 ? -100 : index === 1 ? 0 : 100, y: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            className="w-full md:w-[400px] h-full"
        >
            <div
                className={`relative h-full rounded-[32px] p-10 border overflow-hidden backdrop-blur-xl transition-all duration-500
                    ${plan.isRecommended ? "shadow-[0_0_80px_rgba(237,107,6,0.3)]" : "shadow-2xl"}
                `}
                style={{
                    backgroundColor: plan.colors.bg,
                    borderColor: plan.colors.border,
                }}
            >
                {/* Metallic Sheen for Premium */}
                {plan.isRecommended && (
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-30 pointer-events-none"
                    />
                )}

                <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col h-full">
                    <div className="mb-8">
                        <span className="text-sm font-bold uppercase tracking-[0.2em] opacity-60" style={{ color: plan.colors.text }}>
                            {plan.tier}
                        </span>
                        <h3 className="text-4xl font-bold mt-2" style={{ color: plan.colors.text }}>
                            {plan.name}
                        </h3>
                    </div>

                    <div className="mb-10 flex items-baseline gap-1">
                        <span className="text-5xl font-bold" style={{ color: plan.colors.text }}>{plan.price}</span>
                        <span className="text-xl opacity-60" style={{ color: plan.colors.text }}>{plan.period}</span>
                    </div>

                    <ul className="space-y-6 mb-12 flex-grow">
                        {plan.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-center gap-4 group">
                                <motion.div
                                    animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                                        ${isHovered ? "bg-[#ed6b06] shadow-[0_0_15px_#ed6b06]" : "bg-black/10"}
                                    `}
                                >
                                    <Check size={14} color={isHovered ? "#ffffff" : plan.colors.accent} strokeWidth={3} />
                                </motion.div>
                                <span className="text-lg font-medium opacity-80" style={{ color: plan.colors.text }}>
                                    {feature}
                                </span>
                            </li>
                        ))}
                        {plan.note && (
                            <p className="text-xs italic opacity-50 mt-4" style={{ color: plan.colors.text }}>{plan.note}</p>
                        )}
                    </ul>

                    <button
                        onClick={async () => {
                            const price = plan.price.replace(/[^0-9]/g, '');
                            const amount = parseInt(price) || 0;
                            if (amount === 0) return;

                            try {
                                const response = await fetch('/api/checkout', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ amount, lang }),
                                });
                                const data = await response.json();
                                if (data.url) window.location.href = data.url;
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                        className={`w-full py-5 rounded-2xl font-bold text-lg uppercase tracking-widest transition-all duration-300
                            ${plan.isRecommended
                                ? "bg-[#f5f1ed] text-[#ed6b06] hover:bg-white hover:scale-[1.02] active:scale-95 shadow-xl"
                                : "bg-[#ed6b06] text-[#f5f1ed] hover:bg-[#af4d02] hover:scale-[1.02] active:scale-95 shadow-lg"
                            }
                        `}
                        style={{
                            boxShadow: plan.isRecommended ? "0 10px 30px rgba(0,0,0,0.1)" : "0 10px 20px rgba(237,107,6,0.2)"
                        }}
                    >
                        {t.cta}
                    </button>

                    {/* Watermark Logo */}
                    <div className="absolute bottom-[-20px] right-[-20px] opacity-[0.05] pointer-events-none rotate-[-15deg]">
                        <LinkIcon size={120} color={plan.colors.text} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function PricingPage() {
    const [lang, setLang] = useState<"en" | "fr">("en");
    const t = CONTENT[lang];

    useEffect(() => {
        const savedLang = localStorage.getItem("lang") as "en" | "fr";
        if (savedLang) setLang(savedLang);
    }, []);

    const handleLangChange = (newLang: "en" | "fr") => {
        setLang(newLang);
        localStorage.setItem("lang", newLang);
    };

    return (
        <main className="min-h-screen bg-[#f5f1ed] overflow-x-hidden">
            <Navbar lang={lang} onLangChange={handleLangChange} />

            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="pt-40 pb-20 px-8"
            >
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-24">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[#504d47]/60 hover:text-[#ed6b06] font-bold uppercase tracking-widest text-sm mb-12 transition-colors group"
                        >
                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            {t.back}
                        </Link>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-[#504d47] text-6xl md:text-8xl font-bold tracking-tighter mb-8"
                        >
                            {t.title}
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-[#504d47] opacity-60 text-xl md:text-3xl max-w-3xl mx-auto leading-relaxed"
                        >
                            {t.subtitle}
                        </motion.p>
                    </div>

                    {/* Pricing Cards Grid */}
                    <div className="flex flex-col lg:flex-row gap-12 justify-center items-stretch perspective-[2000px] mb-32">
                        {t.plans.map((plan, idx) => (
                            <PricingCard key={idx} plan={plan} index={idx} lang={lang} />
                        ))}
                    </div>

                    {/* ROI Calculator Section */}
                    <ROICalculator lang={lang} />
                </div>
            </motion.div>

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </main>
    );
}
