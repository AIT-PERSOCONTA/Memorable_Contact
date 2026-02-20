"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface Step {
    id: string;
    number: string;
    titleEn: string;
    titleFr: string;
    descriptionEn: string;
    descriptionFr: string;
    interfaceType: "otp" | "chat" | "map" | "dashboard";
}

const STEPS: Step[] = [
    {
        id: "step1",
        number: "01",
        titleEn: "Seamless Entry",
        titleFr: "Accès Sécurisé",
        descriptionEn: "Start in seconds. Access your personal memory vault using a secure OTP via Phone or Email. No passwords, no data sharing—just total privacy for your network.",
        descriptionFr: "Commencez en quelques secondes. Accédez à votre coffre-fort de mémoire via un OTP sécurisé (SMS ou Email). Pas de mots de passe, pas de partage de données—une confidentialité totale pour votre réseau.",
        interfaceType: "otp"
    },
    {
        id: "step2",
        number: "02",
        titleEn: "Capture the Moment",
        titleFr: "Capturez l'Instant",
        descriptionEn: "Forget tedious forms. Tell the chatbot: \"I met Sarah, a Lead Designer at Google, at the Paris Summit. Her email is sarah@google.com.\" The AI automatically extracts the Name, Phone, Email, and Photo.",
        descriptionFr: "Oubliez les formulaires fastidieux. Dites au chatbot : \"J'ai rencontré Sarah, Lead Designer chez Google, au Sommet de Paris. Son email est sarah@google.com.\" L'IA extrait automatiquement le Nom, Tél, Email et Photo.",
        interfaceType: "chat"
    },
    {
        id: "step3",
        number: "03",
        titleEn: "Contextual Intelligence",
        titleFr: "Intelligence Contextuelle",
        descriptionEn: "While you chat, the app intelligently captures the GPS location and timestamp. Whether in Chennai or NYC, the system anchors the contact to the exact place and time of your meeting.",
        descriptionFr: "Pendant que vous discutez, l'application capture intelligemment la position GPS et l'heure. Que ce soit à Chennai ou à NYC, le système ancre le contact au lieu et au moment exacts de votre rencontre.",
        interfaceType: "map"
    },
    {
        id: "step4",
        number: "04",
        titleEn: "Neural Search & Management",
        titleFr: "Recherche et Gestion",
        descriptionEn: "Six months later, just ask: \"Who was the designer I met in Paris?\" Instantly retrieve her profile, update her details, or export her info. Manage your network with natural language.",
        descriptionFr: "Six mois plus tard, demandez simplement : \"Qui était la designer rencontrée à Paris ?\" Retrouvez instantanément son profil, mettez à jour ses infos ou exportez-les. Gérez votre réseau en langage naturel.",
        interfaceType: "dashboard"
    }
];

const CONTENT = {
    en: {
        headline: "Experience the Flow",
        subtitle: "From a casual chat to a permanent professional asset.",
        viewInterface: "View Interface"
    },
    fr: {
        headline: "Découvrez le Parcours",
        subtitle: "Du simple discours à un atout professionnel permanent.",
        viewInterface: "Voir l'interface"
    }
};

const UIPreview = ({ type, lang }: { type: string, lang: "en" | "fr" }) => {
    if (type === "chat") {
        return (
            <div className="w-full h-full bg-[#504d47] rounded-3xl p-6 flex flex-col gap-4 shadow-xl">
                <div className="flex justify-start">
                    <div className="bg-[#ed6b06] text-white p-3 rounded-2xl rounded-bl-none max-w-[80%] text-sm">
                        {lang === "en" ? "I met Sarah from Google at the Paris Summit." : "J'ai rencontré Sarah de Google au Sommet de Paris."}
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="bg-[#f5f1ed]/10 text-[#f5f1ed] p-3 rounded-2xl rounded-br-none max-w-[80%] text-sm border border-white/10 italic">
                        {lang === "en" ? "Extracting: Sarah, Lead Designer, Google..." : "Extraction : Sarah, Lead Designer, Google..."}
                    </div>
                </div>
            </div>
        );
    }
    if (type === "map") {
        return (
            <div className="w-full h-full bg-[#504d47] rounded-3xl overflow-hidden relative shadow-xl">
                <div className="absolute inset-0 opacity-20 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=48.8566,2.3522&zoom=13&size=600x300&key=YOUR_API_KEY')] bg-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-8 h-8 bg-[#ed6b06] rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                    >
                        <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-[10px] text-white">
                    48.8566° N, 2.3522° E • Paris, France
                </div>
            </div>
        );
    }
    return <div className="w-full h-full bg-[#504d47] rounded-3xl flex items-center justify-center text-[#f5f1ed]/20 font-bold text-4xl">UI</div>;
};

const ExperienceFlow = ({ lang }: { lang: "en" | "fr" }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeUI, setActiveUI] = useState<string | null>(null);
    const t = CONTENT[lang];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={containerRef} className="bg-[#f5f1ed] py-24 px-8 md:px-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24 text-center md:text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#504d47] text-4xl md:text-6xl font-bold mb-4"
                    >
                        {t.headline}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#504d47] opacity-60 text-xl"
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#504d47]/10" />
                    <motion.div
                        style={{ scaleY: pathLength }}
                        className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#ed6b06] origin-top z-10 shadow-[0_0_15px_#ed6b06]"
                    />

                    <div className="space-y-24">
                        {STEPS.map((step, index) => (
                            <div key={step.id} className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center md:items-start`}>

                                {/* Connector Number */}
                                <div className="absolute left-[-2px] md:left-1/2 -translate-x-1/2 z-20">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        className="w-11 h-11 rounded-full bg-[#f5f1ed] border-2 border-[#ed6b06] flex items-center justify-center text-[#504d47] font-bold text-sm shadow-lg"
                                    >
                                        {step.number}
                                    </motion.div>
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-[45%] mt-16 md:mt-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className="backdrop-blur-[15px] bg-white/40 border border-[#ed6b06]/10 rounded-[32px] p-8 md:p-10 shadow-xl relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#ed6b06]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <h3 className="text-[#504d47] text-2xl md:text-3xl font-bold mb-4 relative z-10">
                                            {lang === "en" ? step.titleEn : step.titleFr}
                                        </h3>
                                        <p className="text-[#504d47] opacity-80 leading-relaxed mb-8 relative z-10">
                                            {lang === "en" ? step.descriptionEn : step.descriptionFr}
                                        </p>

                                        {(step.interfaceType === "chat" || step.interfaceType === "map") && (
                                            <button
                                                onClick={() => setActiveUI(activeUI === step.id ? null : step.id)}
                                                className="bg-[#504d47] text-[#f5f1ed] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#ed6b06] transition-all duration-300 relative z-10 group/btn flex items-center gap-2"
                                            >
                                                {t.viewInterface}
                                                <motion.span animate={{ rotate: activeUI === step.id ? 180 : 0 }}>↓</motion.span>
                                            </button>
                                        )}

                                        <AnimatePresence>
                                            {activeUI === step.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, rotateY: 90, height: 0 }}
                                                    animate={{ opacity: 1, rotateY: 0, height: 200 }}
                                                    exit={{ opacity: 0, rotateY: -90, height: 0 }}
                                                    transition={{ duration: 0.6, type: "spring" }}
                                                    className="mt-8 perspective-1000 overflow-hidden"
                                                >
                                                    <UIPreview type={step.interfaceType} lang={lang} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
        </section>
    );
};

export default ExperienceFlow;
