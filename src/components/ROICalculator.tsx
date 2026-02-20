"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, animate } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { Award, Zap, Shield, ArrowRight, Lock } from "lucide-react";

interface ROICalculatorProps {
    lang: "en" | "fr";
}

const PRICING = {
    basic: 12,
    pro: 21
};

const BONUSES = {
    basic: [
        { threshold: 50, bonus: 1 },
        { threshold: 100, bonus: 3 },
        { threshold: 200, bonus: 6 },
    ],
    pro: [
        { threshold: 50, bonus: 0.5 },
        { threshold: 100, bonus: 2 },
        { threshold: 200, bonus: 4 },
    ]
};

const OdometerValue = ({ value }: { value: number }) => {
    const motionValue = useMotionValue(0);
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(motionValue, value, {
            duration: 0.8,
            ease: "easeOut",
            onUpdate: (latest) => setDisplayValue(Math.round(latest))
        });
        return controls.stop;
    }, [value, motionValue]);

    return (
        <span className="tabular-nums">
            {displayValue}
        </span>
    );
};

const SphereHandle = () => {
    return (
        <Float speed={5} rotationIntensity={2} floatIntensity={1}>
            <Sphere args={[1, 64, 64]} scale={2.5}>
                <MeshDistortMaterial
                    color="#ed6b06"
                    speed={2}
                    distort={0.4}
                    roughness={0.1}
                    metalness={0.9}
                    emissive="#ed6b06"
                    emissiveIntensity={0.5}
                />
            </Sphere>
        </Float>
    );
};

export default function ROICalculator({ lang }: ROICalculatorProps) {
    const [amount, setAmount] = useState(100);
    const [plan, setPlan] = useState<"basic" | "pro">("pro");
    const [bonusTrigger, setBonusTrigger] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleInvest = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, lang }),
            });
            const data = await response.json();
            if (response.ok && data.url) {
                window.location.href = data.url;
            } else {
                console.error("Failed to create session:", data.error);
                const message = data.error === 'Stripe API key is not configured'
                    ? (lang === 'en' ? "Stripe is not configured. Please add STRIPE_SECRET_KEY to your .env.local file." : "Stripe n'est pas configuré. Veuillez ajouter STRIPE_SECRET_KEY à votre fichier .env.local.")
                    : (lang === 'en' ? `Error: ${data.error || "Unknown error"}` : `Erreur: ${data.error || "Erreur inconnue"}`);
                alert(message);
                setIsLoading(false);
            }
        } catch (err) {
            console.error("Checkout error:", err);
            alert(lang === 'en' ? "A connection error occurred. Check if the server is running and API keys are set." : "Une erreur de connexion est survenue. Vérifiez que le serveur tourne et que les clés API sont configurées.");
            setIsLoading(false);
        }
    };

    const price = PRICING[plan];
    const baseMonths = Math.round(amount / price);

    let bonus = 0;
    const tierBonuses = BONUSES[plan];
    for (const tier of tierBonuses) {
        if (amount >= tier.threshold) {
            bonus = tier.bonus;
        }
    }

    const totalMonths = baseMonths + bonus;

    // Detect threshold crossing for animations
    useEffect(() => {
        setBonusTrigger(prev => prev + 1);
    }, [bonus]);

    const t = {
        en: {
            title: "Memory ROI Calculator",
            subtitle: "Visualize the return on your professional growth investment.",
            investment: "Investment Amount",
            months: "Total Subscription Months",
            bonus: "Reward Tier Unlocked!",
            early: "Early Supporter",
            basic: "Basic Plan",
            pro: "Pro Plan",
            max: "Max Reward Tier Reached!",
            invest: (amt: number) => `Invest €${amt} Now`,
            secure: "Secure Checkout via Stripe"
        },
        fr: {
            title: "Calculateur de ROI de Mémoire",
            subtitle: "Visualisez le retour sur votre investissement dans votre croissance professionnelle.",
            investment: "Montant de l'Investissement",
            months: "Mois d'Abonnement Totaux",
            bonus: "Palier de Récompense Débloqué !",
            early: "Supporter de la Première Heure",
            basic: "Plan Basique",
            pro: "Plan Pro",
            max: "Palier Maximum Atteint !",
            invest: (amt: number) => `Investir ${amt} € Maintenant`,
            secure: "Paiement Sécurisé via Stripe"
        }
    }[lang];

    return (
        <section className="py-24 px-8 md:px-16 bg-[#504d47]/5 rounded-[40px] border border-[#504d47]/10 backdrop-blur-sm max-w-6xl mx-auto my-24 overflow-hidden relative">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

            <div className="relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-[#504d47] text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                        {t.title}
                    </h2>
                    <p className="text-[#504d47]/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Interaction Panel */}
                    <div className="space-y-12">
                        {/* Plan Toggle */}
                        <div className="flex justify-center">
                            <div className="bg-[#504d47]/10 p-1.5 rounded-2xl flex gap-2">
                                {(["basic", "pro"] as const).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPlan(p)}
                                        className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${plan === p
                                            ? "bg-[#504d47] text-[#f5f1ed] shadow-xl scale-105"
                                            : "text-[#504d47]/60 hover:text-[#504d47]"
                                            }`}
                                    >
                                        {p === "basic" ? t.basic : t.pro}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Slider Control */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <span className="text-[#504d47]/60 font-bold uppercase tracking-widest text-sm">
                                    {t.investment}
                                </span>
                                <span className="text-[#ed6b06] text-5xl font-bold italic tracking-tighter">
                                    €{amount}
                                </span>
                            </div>

                            <div className="relative h-20 flex items-center">
                                {/* Track */}
                                <div className="absolute w-full h-8 bg-[#504d47] rounded-full shadow-inner overflow-hidden">
                                    <motion.div
                                        style={{ width: `${(amount / 500) * 100}%` }}
                                        className="h-full bg-[#ed6b06] shadow-[0_0_20px_#ed6b06]"
                                    />
                                </div>

                                {/* 3D Sphere Handle */}
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    step="10"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                                />

                                <div
                                    className="absolute pointer-events-none"
                                    style={{ left: `calc(${(amount / 500) * 100}% - 40px)` }}
                                >
                                    <div className="w-20 h-20">
                                        <Canvas camera={{ position: [0, 0, 5] }}>
                                            <ambientLight intensity={1.5} />
                                            <pointLight position={[10, 10, 10]} intensity={2} />
                                            <SphereHandle />
                                        </Canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Badges/Thresholds */}
                        <AnimatePresence mode="wait">
                            {amount < 50 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center gap-3 bg-[#ed6b06]/10 text-[#ed6b06] p-4 rounded-2xl border border-[#ed6b06]/20 font-bold justify-center"
                                >
                                    <Award />
                                    {t.early}
                                </motion.div>
                            )}
                            {amount === 500 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-3 bg-gradient-to-r from-[#ed6b06] to-[#ff8c42] text-white p-4 rounded-2xl shadow-xl font-bold justify-center"
                                >
                                    <Zap />
                                    {t.max}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Results Display */}
                    <div className="relative h-full min-h-[400px]">
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/40 rounded-[32px] p-12 shadow-2xl flex flex-col items-center justify-center text-center">

                            <h3 className="text-[#504d47]/40 font-bold uppercase tracking-[0.2em] mb-12">
                                {t.months}
                            </h3>

                            <div className="relative">
                                <motion.div
                                    key={totalMonths}
                                    initial={{ scale: 0.8, filter: "blur(10px)", opacity: 0 }}
                                    animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                                    className="text-[#ed6b06] text-[12rem] font-bold leading-none tracking-tighter"
                                >
                                    <OdometerValue value={totalMonths} />
                                </motion.div>

                                {/* Bonus Label */}
                                <AnimatePresence>
                                    {bonus > 0 && (
                                        <motion.div
                                            key={bonusTrigger}
                                            initial={{ y: 20, opacity: 0, scale: 0.8 }}
                                            animate={{ y: 0, opacity: 1, scale: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="absolute -top-8 -right-8 bg-[#504d47] text-[#f5f1ed] px-4 py-2 rounded-full font-bold shadow-xl border border-white/10"
                                        >
                                            +{bonus} {lang === "en" ? "Bonus" : "Bonus"}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <motion.div
                                animate={bonus > 0 ? { filter: ["blur(0px)", "blur(20px)", "blur(0px)"], opacity: [0.1, 0.4, 0.1] } : { opacity: 0.05 }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-[#ed6b06] rounded-[32px] pointer-events-none -z-10"
                            />

                            {/* Invest Now Button */}
                            <div className="absolute -bottom-8 left-0 right-0 flex flex-col items-center gap-3">
                                <motion.button
                                    onClick={handleInvest}
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{
                                        boxShadow: [
                                            `0 0 20px rgba(237, 107, 6, ${0.2 + (amount / 500) * 0.4})`,
                                            `0 0 40px rgba(237, 107, 6, ${0.4 + (amount / 500) * 0.4})`,
                                            `0 0 20px rgba(237, 107, 6, ${0.2 + (amount / 500) * 0.4})`
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="relative flex items-center gap-3 px-10 py-5 bg-gradient-to-br from-[#ed6b06] to-[#ff8c42] rounded-2xl text-[#f5f1ed] font-bold text-xl uppercase tracking-widest overflow-hidden border border-white/20 shadow-2xl group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {/* Shimmer Effect */}
                                    <motion.div
                                        animate={{ x: ["-100%", "250%"] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
                                    />

                                    <span>{isLoading ? (lang === 'en' ? 'Processing...' : 'Traitement...') : t.invest(amount)}</span>
                                    {!isLoading && <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />}
                                </motion.button>

                                <div className="flex items-center gap-2 text-[#504d47]/60 text-sm font-bold uppercase tracking-widest">
                                    <Lock size={14} className="text-[#504d47]" />
                                    <Shield size={14} />
                                    {t.secure}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
