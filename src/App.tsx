import { useEffect, type ReactNode } from "react";
import { Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
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
import { ProjectDetailPage } from "./components/ProjectDetailPage";
import { ServicesPage } from "./components/ServicesPage";
import { ServiceDetailPage } from "./components/ServiceDetailPage";
import { FloatingDock } from "./components/ui/floating-dock";
import { SOCIAL_LINKS } from "./config/socials";
import { motion, useScroll, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const dockItems = SOCIAL_LINKS.map((link) => ({
  title: link.label,
  href: link.href,
  icon: link.icon,
}));

/** Shared shell for top-level pages: navbar offset, footer, social dock. */
function PageLayout({ children, offsetNavbar = true }: { children: ReactNode; offsetNavbar?: boolean }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Images and fonts load after first layout; recompute trigger positions once
  // everything is in so reveal animations fire at the right scroll offset.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const id = window.setTimeout(refresh, 600);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(id);
    };
  }, []);

  return (
    <main
      className={`relative min-h-screen bg-brand-bg text-white selection:bg-white selection:text-black ${
        offsetNavbar ? "pt-16 md:pt-20" : ""
      }`}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white z-110 origin-left"
        style={{ scaleX }}
      />
      <div className="relative z-10">
        {children}
        <Footer />
      </div>
      <FloatingDock items={dockItems} />
    </main>
  );
}

function HomePage() {
  return (
    <PageLayout offsetNavbar={false}>
      <Hero />
      <Projects />
      <BlogSection />
      <Contact />
    </PageLayout>
  );
}

/** Old /personal-arts/:slug links keep working. */
function LegacyProjectRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/projects/${slug ?? ""}`} replace />;
}

const DETAIL_ROUTE = /^\/(projects|blogs|services)\/[^/]+\/?$/;

export default function App() {
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Detail pages have their own back button instead of the navbar
  const showNavbar = !DETAIL_ROUTE.test(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<PageLayout><About /></PageLayout>} />
        <Route path="/tech-stack" element={<PageLayout><TechStack /></PageLayout>} />
        <Route path="/projects" element={<PageLayout><Projects full /></PageLayout>} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route
          path="/experience"
          element={
            <PageLayout>
              <Experience />
              <Certificates />
            </PageLayout>
          }
        />
        <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />

        {/* Legacy URLs */}
        <Route path="/personal-arts" element={<Navigate to="/projects" replace />} />
        <Route path="/personal-arts/:slug" element={<LegacyProjectRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
