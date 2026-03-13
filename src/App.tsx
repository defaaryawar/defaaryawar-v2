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
import { SOCIAL_LINKS } from "./config/socials";
import { motion, useScroll, useSpring } from "framer-motion";
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

  useGSAP(
    () => {
      // Get all section elements except Hero (sections with id attributes)
      const sections = gsap.utils.toArray("section[id]") as HTMLElement[];

      if (sections.length === 0) return;

      // Ensure ScrollTrigger layout is recalculated when images or components resize
      window.addEventListener("resize", () => ScrollTrigger.refresh());

      sections.forEach((section) => {
        // "Tirai slide" effect (curtain slide):
        // Just pin the section when it reaches the appropriate scroll position.
        // No scale, no fade, no parallax.
        ScrollTrigger.create({
          trigger: section,
          start: () => {
            const offsetHeight = section.offsetHeight;
            // If section is smaller than viewport, pin at top.
            // If taller, let it scroll until bottom hits bottom of viewport, then pin.
            return offsetHeight <= window.innerHeight ? "top top" : "bottom bottom";
          },
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
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

        <FloatingDock items={SOCIAL_LINKS.map(link => ({ title: link.label, href: link.href, icon: link.icon }))} />

        {/* Global Background Grain */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </main>
    </ParallaxProvider>
  );
}
