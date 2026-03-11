import { useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
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

      // Animation directions for variety
      const directions = [
        { x: -100, y: 0 }, // from left
        { x: 100, y: 0 }, // from right
        { x: 0, y: 100 }, // from bottom
        { x: -80, y: 80 }, // diagonal
        { x: 80, y: -80 }, // diagonal
      ];

      // Create scroll triggers for pinning + entrance animations
      sections.forEach((section, i) => {
        const direction = directions[i % directions.length];

        // Pinning Setup
        ScrollTrigger.create({
          trigger: section,
          start: () => {
            const offsetHeight = section.offsetHeight;
            return offsetHeight < window.innerHeight ? "top top" : "bottom bottom";
          },
          pin: true,
          pinSpacing: false,
        });

        // Entrance Animation with parallax effect
        gsap.fromTo(
          section,
          {
            opacity: 0,
            x: direction.x,
            y: direction.y,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          },
        );
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

        {/* Global Background Grain */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </main>
    </ParallaxProvider>
  );
}
