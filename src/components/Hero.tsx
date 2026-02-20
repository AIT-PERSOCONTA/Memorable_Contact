"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Scene from "./Scene";
import Image from "next/image";

interface HeroProps {
    lang: "en" | "fr";
}

const CONTENT = {
    en: "MEMORABLE CONTACT",
    fr: "CONTACT MÉMORABLE"
};

const Hero = ({ lang }: HeroProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Hero Transforms
    const scale = useTransform(scrollYProgress, [0, 1], [1, 50]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
    const sceneOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0]);
    const z = useTransform(scrollYProgress, [0, 1], [0, 1000]);

    return (
        <main ref={containerRef} className="bg-[#f5f1ed]">
            {/* Hero Section */}
            <section className="relative h-[300vh]">
                <motion.div style={{ opacity: sceneOpacity }}>
                    <Scene scrollYProgress={scrollYProgress} isHero={true} />
                </motion.div>

                <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                    <motion.div
                        style={{ scale, opacity, translateZ: z }}
                        className="relative z-10 flex flex-col items-center text-center"
                    >
                        <div className="mb-6 md:mb-10 w-32 md:w-48">
                            <Image
                                src="/logo.jpg"
                                alt="Memorable Contact Logo"
                                width={500}
                                height={360}
                                className="w-full h-auto rounded-xl shadow-lg"
                            />
                        </div>
                        <h1 className="text-[10vw] md:text-[8vw] font-bold metallic-shine leading-none tracking-tighter whitespace-nowrap">
                            {CONTENT[lang]}
                        </h1>
                    </motion.div>
                </div>
            </section>

        </main>
    );
};

export default Hero;
