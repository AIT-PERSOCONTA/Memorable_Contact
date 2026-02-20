"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FeaturesProps {
    lang: "en" | "fr";
}

const CONTENT = {
    en: {
        headline: "Features for Professionals",
        subheadline: "Designed for networkers, sales pros, and leaders who value every connection.",
        readProtocol: "Read Protocol",
        features: [
            {
                id: "ai",
                title: "AI Conversations",
                description: "Simply tell Memorable Contact about your meeting; it understands context, tone, and specific details automatically.",
                protocol: "Our system utilizes specialized Large Language Models (LLMs) to parse unstructured voice or text inputs. It goes beyond simple keywords to identify user intent, emotional sentiment, and specific meeting details from casual speech to create structured data automatically."
            },
            {
                id: "location",
                title: "Location Aware",
                description: "Geo-tagging ensures you remember exactly where you were when you met that key stakeholder.",
                protocol: "Integrated with the Google Maps API to fetch high-precision GPS coordinates at the moment of entry. This creates a \"spatial memory\" layer in your database, allowing you to search for contacts by \"Meetings near [Location]\" or visual map clusters."
            },
            {
                id: "entity",
                title: "Entity Extraction",
                description: "Instantly extracts names, company roles, and social handles from casual voice or text logs.",
                protocol: "We employ advanced OCR (Optical Character Recognition) to scan LinkedIn screenshots or physical business cards. The engine automatically maps fields like Name, Role, Company, and Social Handles directly into your Personal Memory System with 99.9% accuracy."
            },
            {
                id: "recall",
                title: "Instant Recall",
                description: "Search for context like \"that guy from the coffee shop\" and get a bio in 1 second.",
                protocol: "Powered by Vector Embeddings and Semantic Search, this protocol enables \"Fuzzy Matching\". You can find contacts based on context (e.g., \"the person I met at the airport\") rather than needing an exact name or email."
            },
            {
                id: "privacy",
                title: "Privacy First",
                description: "All data is protected with secure OTP authentication and high-security standards.",
                protocol: "Built on a secure Zero-Password architecture. Access is granted via Mobile OTP (One-Time Password) only, ensuring no passwords can be stolen or leaked. All data is encrypted at rest and in transit, and is never used to train public AI models."
            }
        ]
    },
    fr: {
        headline: "Fonctionnalités pour Professionnels",
        subheadline: "Conçu pour les networkers, les pros de la vente et les leaders qui valorisent chaque connexion.",
        readProtocol: "Lire le protocole",
        features: [
            {
                id: "ai",
                title: "Conversations IA",
                description: "Racontez simplement votre rencontre à Memorable Contact ; il comprend automatiquement le contexte, le ton et les détails.",
                protocol: "Notre système utilise des modèles de langage (LLM) spécialisés pour analyser les entrées vocales ou textuelles non structurées. Il va au-delà des simples mots-clés pour identifier l'intention de l'utilisateur, le sentiment et les détails spécifiques d'un discours informel afin de créer des données structurées automatiquement."
            },
            {
                id: "location",
                title: "Géo-Localisation",
                description: "Le géo-marquage vous permet de vous souvenir exactement de l'endroit où vous avez rencontré cet interlocuteur clé.",
                protocol: "Intégré à l'API Google Maps pour récupérer des coordonnées GPS de haute précision au moment de la saisie. Cela crée une couche de « mémoire spatiale » dans votre base de données, vous permettant de rechercher des contacts par « Rencontres près de [Lieu] » ou par groupes de cartes visuelles."
            },
            {
                id: "entity",
                title: "Extraction d'Entités",
                description: "Extrait instantanément noms, rôles en entreprise et pseudos sociaux à partir de notes vocales ou textuelles.",
                protocol: "Nous utilisons une technologie OCR (Reconnaissance Optique de Caractères) avancée pour scanner les captures d'écran LinkedIn ou les cartes de visite physiques. Le moteur associe automatiquement des champs comme le Nom, le Rôle, l'Entreprise et les réseaux sociaux directement dans votre Système de Mémoire Personnel avec une précision de 99,9 %."
            },
            {
                id: "recall",
                title: "Rappel Instantané",
                description: "Recherchez par contexte comme « le gars du café » et obtenez une bio en 1 seconde.",
                protocol: "Propulsé par les \"Vector Embeddings\" et la recherche sémantique, ce protocole permet une « correspondance floue ». Vous pouvez trouver des contacts en fonction du contexte (par exemple, « la personne rencontrée à l'aéroport ») au lieu d'avoir besoin d'un nom ou d'un e-mail exact."
            },
            {
                id: "privacy",
                title: "Confidentialité Totale",
                description: "Toutes les données sont protégées par une authentification OTP sécurisée et des normes de sécurité élevées.",
                protocol: "Construit sur une architecture sécurisée sans mot de passe. L'accès est accordé via OTP mobile (Mot de passe à usage unique) uniquement, garantissant qu'aucun mot de passe ne peut être volé ou divulgué. Toutes les données sont cryptées au repos et en transit, et ne sont jamais utilisées pour entraîner des modèles d'IA publics."
            }
        ]
    }
};

const PROTOCOL_TITLES = {
    en: " Protocol",
    fr: " Protocole"
};

const Features = ({ lang }: FeaturesProps) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const t = CONTENT[lang];
    const selectedFeature = t.features.find(f => f.id === selectedId);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section className="bg-[#f5f1ed] py-24 px-8 md:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[#504d47] text-4xl md:text-6xl font-bold mb-6 italic"
                    >
                        {t.headline}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#504d47] opacity-60 text-xl max-w-2xl"
                    >
                        {t.subheadline}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {t.features.map((feature) => (
                        <motion.div
                            key={feature.id}
                            variants={cardVariants}
                            className="group relative bg-[#f5f1ed] border border-[#ed6b06]/20 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-2xl hover:shadow-[#ed6b06]/10 transition-all duration-500 flex flex-col justify-between overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-transparent group-hover:bg-[#ed6b06]/[0.02] transition-colors duration-500 pointer-events-none" />
                            <div className="absolute -inset-[1px] bg-gradient-to-br from-[#ed6b06]/0 via-[#ed6b06]/0 to-[#ed6b06]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />

                            <div className="relative z-10">
                                <h3 className="text-[#504d47] text-2xl md:text-3xl font-bold mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-[#504d47] opacity-80 leading-relaxed mb-6">
                                    {feature.description}
                                </p>
                            </div>

                            <div className="relative z-10">
                                <button
                                    onClick={() => setSelectedId(feature.id)}
                                    className="flex items-center gap-2 text-[#ed6b06] font-bold group/link"
                                >
                                    <span className="border-b-2 border-transparent group-hover/link:border-[#ed6b06] transition-all">
                                        {t.readProtocol}
                                    </span>
                                    <span className="inline-block transition-transform group-hover/link:translate-x-1">
                                        →
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Glassmorphism Modal */}
            <AnimatePresence>
                {selectedId && selectedFeature && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl backdrop-blur-[20px] bg-[#f5f1ed]/80 p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/20 overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-6 right-6 w-10 h-10 bg-[#504d47] rounded-full flex items-center justify-center group hover:scale-110 transition-transform"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>

                            <div className="space-y-6">
                                <h2 className="text-[#ed6b06] text-3xl md:text-4xl font-bold tracking-tight">
                                    {selectedFeature.title}{PROTOCOL_TITLES[lang]}
                                </h2>
                                <p className="text-[#504d47] text-lg md:text-xl leading-relaxed font-medium">
                                    {selectedFeature.protocol}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Features;
