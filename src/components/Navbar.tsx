"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
    lang: "en" | "fr";
    onLangChange: (lang: "en" | "fr") => void;
}

const Navbar = ({ lang, onLangChange }: NavbarProps) => {
    const { scrollY } = useScroll();

    // Navbar appears when user scrolls past a certain threshold
    const opacity = useTransform(scrollY, [0, 100], [0, 1]);
    const y = useTransform(scrollY, [0, 100], [-100, 0]);

    const menu = {
        en: [
            { name: "Home", href: "/" },
            { name: "About", href: "/#about" },
            { name: "Pricing", href: "/pricing" },
            { name: "More", href: "/#more" }
        ],
        fr: [
            { name: "Accueil", href: "/" },
            { name: "À propos", href: "/#about" },
            { name: "Tarifs", href: "/pricing" },
            { name: "Plus", href: "/#more" }
        ]
    };

    const t = menu[lang];

    return (
        <motion.nav
            style={{ opacity, y }}
            className="fixed top-0 left-0 right-0 z-50 glass-cream h-20 flex items-center justify-between px-8 md:px-16"
        >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 relative">
                    <Image
                        src="/logo.jpg"
                        alt="Memorable Contact"
                        width={40}
                        height={40}
                        className="rounded-lg"
                    />
                </div>
                <span className="text-[#504d47] font-bold text-xl uppercase tracking-tighter">
                    Memorable <span className="text-[#ed6b06]">Contact</span>
                </span>
            </Link>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-10">
                {t.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-[#504d47] font-medium hover:text-[#ed6b06] transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[#504d47] font-bold cursor-pointer">
                    <span
                        className={lang === "en" ? "text-[#ed6b06]" : "hover:text-[#ed6b06]/60"}
                        onClick={() => onLangChange("en")}
                    >
                        EN
                    </span>
                    <span className="opacity-30">|</span>
                    <span
                        className={lang === "fr" ? "text-[#ed6b06]" : "hover:text-[#ed6b06]/60"}
                        onClick={() => onLangChange("fr")}
                    >
                        FR
                    </span>
                </div>

                <a
                    href="https://wa.me/+33665354787"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#504d47]" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                </a>
            </div>
        </motion.nav>
    );
};

export default Navbar;
