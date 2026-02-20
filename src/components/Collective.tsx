"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface Member {
    id: string;
    name: string;
    role: { en: string; fr: string };
    desc: { en: string; fr: string };
    img: string;
}

const TEAM: Member[] = [
    {
        id: "amurtha",
        name: "Amurtha",
        role: { en: "Chief Executive Officer", fr: "Chef de la Direction" },
        desc: {
            en: "Visionary leader focused on revolutionizing how professionals maintain networks.",
            fr: "Leader visionnaire axée sur la révolution de la gestion des réseaux professionnels."
        },
        img: "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771487248/WhatsApp_Image_2026-02-19_at_1.13.49_PM_wu9kvc.jpg"
    },
    {
        id: "pradeep",
        name: "Pradeep",
        role: { en: "Lead Developer", fr: "Développeur Principal" },
        desc: {
            en: "Architecture specialist dedicated to building the robust, AI-driven core.",
            fr: "Spécialiste de l'architecture dédié à la construction du cœur dopé à l'IA."
        },
        img: "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771605580/Gemini_Generated_Image_ndqnj0ndqnj0ndqn_moam8k.png" // Using Hemanth's as placeholder for Pradeep since others are pending
    },
    {
        id: "santhosh",
        name: "Santhosh",
        role: { en: "Software Developer", fr: "Développeur Logiciel" },
        desc: {
            en: "Full-stack engineer focused on scaling neural relationship management systems.",
            fr: "Ingénieur full-stack axé sur la mise à l'échelle des systèmes de gestion."
        },
        img: "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771605573/Gemini_Generated_Image_wv9cvfwv9cvfwv9c_smiydj.png" // Placeholder
    },
    {
        id: "subashini",
        name: "Subashini",
        role: { en: "Product Manager", fr: "Responsable de Produit" },
        desc: {
            en: "Strategic leader creating intuitive experiences between AI and human memory.",
            fr: "Leader stratégique créant des expériences intuitives entre l'IA et la mémoire."
        },
        img: "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771605602/Gemini_Generated_Image_oz7enzoz7enzoz7e_hneksd.png"
    },
    {
        id: "arun",
        name: "Arun Chintesh",
        role: { en: "Product Management", fr: "Gestion de Produit" },
        desc: {
            en: "Strategic lead defining the future of product synergy across digital ecosystems.",
            fr: "Responsable stratégique définissant la synergie des produits numériques."
        },
        img: "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771605580/Gemini_Generated_Image_ndqnj0ndqnj0ndqn_moam8k.png" // Placeholder
    },
    {
        id: "aswathy",
        name: "Aswathy",
        role: { en: "Director Product Development", fr: "Directrice du Développement Produit" },
        desc: {
            en: "Visionary overseeing the engineering lifecycle for global impact.",
            fr: "Visionnaire supervisant le cycle de vie technique pour un impact mondial."
        },
        img: "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771605573/Gemini_Generated_Image_wv9cvfwv9cvfwv9c_smiydj.png" // Placeholder
    },
    {
        id: "hemanth",
        name: "Hemanth M",
        role: { en: "Web Developer", fr: "Développeur Web" },
        desc: {
            en: "Specialist in creating high-fidelity, interactive digital architectures.",
            fr: "Spécialiste de la création d'architectures numériques interactives."
        },
        img: "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771605580/Gemini_Generated_Image_ndqnj0ndqnj0ndqn_moam8k.png"
    },
    {
        id: "meghanaa",
        name: "Meghanaa",
        role: { en: "Marketing Lead", fr: "Responsable Marketing" },
        desc: {
            en: "Growth strategist dedicated to sharing the vision of cognitive memory with the world.",
            fr: "Stratège de croissance dédiée à partager la vision de la mémoire cognitive."
        },
        img: "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771605573/Gemini_Generated_Image_wv9cvfwv9cvfwv9c_smiydj.png"
    },
];

interface Props {
    lang: "en" | "fr";
}

const CollectiveCard = ({ member, lang, index }: { member: Member; lang: "en" | "fr"; index: number }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"],
    });

    const blur = useTransform(scrollYProgress, [0, 0.8], ["20px", "0px"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity, scale }}
            className={`relative group h-[500px] w-full bg-[#504d47] rounded-[32px] overflow-hidden shadow-2xl border border-white/5
        ${index % 3 === 1 ? "md:translate-y-12" : index % 3 === 2 ? "md:-translate-y-12" : ""}
      `}
        >
            <motion.div style={{ filter: `blur(${blur.get()})` }} className="absolute inset-0">
                <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
            </motion.div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#504d47] via-transparent to-transparent opacity-90" />

            {/* Metallic Grain */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-8 space-y-3">
                <motion.h4
                    className="text-3xl font-bold tracking-tighter text-[#f5f1ed] transition-colors duration-300 group-hover:text-[#ed6b06] cursor-default"
                    style={{ fontFamily: "'Forma DJR Banner', sans-serif" }}
                    whileHover={{ textShadow: "0 0 20px rgba(237, 107, 6, 0.5)" }}
                >
                    {member.name}
                </motion.h4>
                <div className="space-y-1">
                    <p className="text-[#ed6b06] font-bold text-xs uppercase tracking-widest">
                        {member.role[lang]}
                    </p>
                    <p className="text-[#f5f1ed]/60 text-sm leading-relaxed font-medium">
                        {member.desc[lang]}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default function Collective({ lang }: Props) {
    const title = lang === "en" ? "The Collective" : "Le Collectif";
    const subtitle = lang === "en" ? "The Minds Behind Memorable Contact" : "Les esprits derrière Memorable Contact";
    const intro = lang === "en"
        ? "We're a team of researchers, engineers, and designers dedicated to making human connections permanent and searchable."
        : "Nous sommes une équipe de chercheurs, d'ingénieurs et de designers dévoués à rendre les connexions humaines permanentes et consultables.";

    return (
        <section className="relative py-32 bg-[#f5f1ed] overflow-hidden">
            {/* Background Graphic */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ed6b06]/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-2"
                    >
                        <h2 className="text-5xl lg:text-7xl font-bold text-[#504d47] tracking-tighter" style={{ fontFamily: "'Forma DJR Banner', sans-serif" }}>
                            {title}
                        </h2>
                        <p className="text-[#ed6b06] font-bold tracking-[0.2em] uppercase text-lg">
                            {subtitle}
                        </p>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#504d47]/70 text-xl font-medium leading-relaxed"
                    >
                        {intro}
                    </motion.p>
                </div>

                {/* Neural Mesh Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-24">
                    {TEAM.map((member, index) => (
                        <CollectiveCard key={member.id} member={member} lang={lang} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
