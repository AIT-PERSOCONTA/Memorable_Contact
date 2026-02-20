"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TrustedByProps {
    lang: "en" | "fr";
}

const LOGOS = [
    "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771595553/download_rjjces.jpg",
    "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771595540/download_i8wxxv.jpg",
    "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771595542/download_iy8d3j.jpg",
    "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771595588/download_wtyclq.png",
    "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771595559/download_rwxwyy.png"
];

const CONTENT = {
    en: "Trusted & Featured By",
    fr: "Ils nous font confiance"
};

const TrustedBy = ({ lang }: TrustedByProps) => {
    // Duplicate logos for seamless scroll
    const marqueeLogos = [...LOGOS, ...LOGOS, ...LOGOS];

    return (
        <section className="bg-[#f5f1ed] py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-[#504d47] uppercase tracking-[0.2em] opacity-60">
                    {CONTENT[lang]}
                </h2>
            </div>

            <div className="relative flex">
                <motion.div
                    className="flex items-center gap-12 md:gap-24 px-4"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {marqueeLogos.map((logo, idx) => (
                        <div
                            key={idx}
                            className="relative flex-shrink-0 w-32 h-16 md:w-48 md:h-24 grayscale brightness-[0.8] contrast-[1.2] hover:grayscale-0 hover:brightness-100 hover:scale-110 transition-all duration-500 cursor-pointer group"
                        >
                            <Image
                                src={logo}
                                alt={`Partner Logo ${idx}`}
                                fill
                                className="object-contain filter transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(237,107,6,0.3)]"
                            />
                            {/* Metallic Filter Overlay Effect */}
                            <div className="absolute inset-0 bg-[#504d47]/5 mix-blend-color group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustedBy;
