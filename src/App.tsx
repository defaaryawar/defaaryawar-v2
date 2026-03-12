import { useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingDock } from "./components/ui/floating-dock";
import { motion, useScroll, useSpring } from "framer-motion";
import { MessageCircle, Instagram, Music, Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ParallaxProvider } from "react-scroll-parallax";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const socialLinks = [
    {
      title: "WhatsApp",
      icon: <MessageCircle size={24} className="text-gray-200" />,
      href: "https://wa.me/6281219147116?text=Halo%20Defano,%20saya%20melihat%20portfolio%20Anda%20dan%20ingin%20berdiskusi...",
    },
    {
      title: "Instagram",
      icon: <Instagram size={24} className="text-gray-200" />,
      href: "https://www.instagram.com/defaaryawar/",
    },
    {
      title: "TikTok",
      icon: <Music size={24} className="text-gray-200" />,
      href: "https://www.tiktok.com/@user.deff",
    },
    {
      title: "LinkedIn",
      icon: <Linkedin size={24} className="text-gray-200" />,
      href: "https://www.linkedin.com/in/defano-arya-wardhana-50ab11328/",
    },
  ];

  useGSAP(
    () => {
      const sections = gsap.utils.toArray("section[id]") as HTMLElement[];

      if (sections.length === 0) return;

      // Parallax background effect
      const getRatio = (el: HTMLElement) =>
        window.innerHeight / (window.innerHeight + el.offsetHeight);

      sections.forEach((section, i) => {
        const bg = section.querySelector(".section-bg") as HTMLElement;

        // Parallax background effect
        if (bg) {
          gsap.fromTo(
            bg,
            {
              backgroundPosition: () =>
                i === 0 ? "50% 0px" : `50% ${-window.innerHeight * getRatio(section)}px`,
            },
            {
              backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: () => (i === 0 ? "top top" : "top bottom"),
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        // Pinning effect for panel sections
        const isPinnable =
          section.offsetHeight < window.innerHeight * 1.5 ||
          section.classList.contains("pin-section");

        if (isPinnable) {
          ScrollTrigger.create({
            trigger: section,
            start: () => (section.offsetHeight < window.innerHeight ? "top top" : "bottom bottom"),
            pin: true,
            pinSpacing: false,
          });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <ParallaxProvider>
      <main
        ref={containerRef}
        className="relative bg-brand-bg text-white selection:bg-white selection:text-black"
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-white z-110 origin-left"
          style={{ scaleX }}
        />

        {/* Floating Dock with Social Links */}
        <FloatingDock items={socialLinks} />

        <Navbar />

        <div className="relative z-10">
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>

        {/* Global Background Grain */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </main>
    </ParallaxProvider>
  );
}
