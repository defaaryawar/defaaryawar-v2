import { useRef, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Certificates } from "./components/Certificates";
import { BlogSection } from "./components/BlogSection";
import { BlogsPage } from "./components/BlogsPage";
import { BlogDetailPage } from "./components/BlogDetailPage";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { PersonalArtsPage } from "./components/PersonalArtsPage";
import { ProjectDetailPage } from "./components/ProjectDetailPage";
import { ServicesPage } from "./components/ServicesPage";
import { ServiceDetailPage } from "./components/ServiceDetailPage";
import { FloatingDock } from "./components/ui/floating-dock";
import { SOCIAL_LINKS } from "./config/socials";
import { motion, useScroll, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ParallaxProvider } from "react-scroll-parallax";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useGSAP(
    () => {
      const sections = gsap.utils.toArray("section[id]") as HTMLElement[];
      if (sections.length === 0) return;
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: () => {
            const offsetHeight = section.offsetHeight;
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
    <main
      ref={containerRef}
      className="relative bg-brand-bg text-white selection:bg-white selection:text-black"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white z-110 origin-left"
        style={{ scaleX }}
      />
      <div className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Certificates />
        <BlogSection />
        <Contact />
        <Footer />
      </div>
      <FloatingDock
        items={SOCIAL_LINKS.map((link) => ({
          title: link.label,
          href: link.href,
          icon: link.icon,
        }))}
      />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}

export default function App() {
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Show navbar on listing pages, hide on detail pages
  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/personal-arts" ||
    location.pathname === "/blogs" ||
    location.pathname === "/services";

  return (
    <ParallaxProvider>
      {showNavbar && <Navbar />}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/personal-arts" element={<PersonalArtsPage />} />
        <Route path="/personal-arts/:slug" element={<ProjectDetailPage />} />
        {/* Blog routes */}
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />
        {/* Services route */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
      </Routes>
    </ParallaxProvider>
  );
}
