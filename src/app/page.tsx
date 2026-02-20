"use client";

import Hero from "@/components/Hero";
import SecondScreen from "@/components/SecondScreen";
import HomeHero from "@/components/HomeHero";
import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";
import TrustedBy from "@/components/TrustedBy";
import Features from "@/components/Features";
import ExperienceFlow from "@/components/ExperienceFlow";
import VideoDemo from "@/components/VideoDemo";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Collective from "@/components/Collective";
import FadingRecollection from "@/components/FadingRecollection";
import Pricing from "@/components/Pricing";
import { useEffect, useState } from "react";

export default function Home() {
  const [lang, setLang] = useState<"en" | "fr">("en");

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data.country_code === "FR") {
          setLang("fr");
        }
      } catch (error) {
        console.error("Geolocation detection failed:", error);
      }
    };
    detectLocation();
  }, []);

  return (
    <main className="relative">
      <Navbar lang={lang} onLangChange={setLang} />
      <Hero lang={lang} />
      <SecondScreen lang={lang} />
      <HomeHero lang={lang} />
      <Stats lang={lang} />
      <TrustedBy lang={lang} />
      <Features lang={lang} />
      <ExperienceFlow lang={lang} />
      <VideoDemo lang={lang} />
      <Testimonials lang={lang} />
      <About lang={lang} />
      <Collective lang={lang} />
      <FadingRecollection lang={lang} />
      <Pricing lang={lang} />
    </main>
  );
}
