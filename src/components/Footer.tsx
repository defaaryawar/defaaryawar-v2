import { useRef } from "react";
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ── Change this to your own background image path ──
const FOOTER_BG = "/images/photo-profil/defaaryawar-landscape.png";

export const Footer = () => {
  const container = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax background shift as footer scrolls into view
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: -60 },
          {
            y: 60,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          },
        );
      }

      // Fade in content
      gsap.fromTo(
        ".footer-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: container },
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const socials = [
    { Icon: Github, href: "#", label: "GitHub" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
    { Icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer
      ref={container}
      className="relative z-[2] min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          top: "60px",
          bottom: "-60px",
          backgroundImage: FOOTER_BG
            ? `url(${FOOTER_BG})`
            : "linear-gradient(135deg, #0a0a0a 0%, #111 40%, #0d0d0d 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark overlays for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.5) 35%, rgba(5,5,5,0.5) 65%, rgba(5,5,5,0.92) 100%),
            linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)
          `,
        }}
      />

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
        }}
      />

      {/* Content */}
      <div className="footer-content relative z-10 container mx-auto px-8 md:px-16 py-8 flex flex-col items-center text-center">
        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="group mb-16 flex flex-col items-center gap-3 cursor-pointer"
          style={{ background: "none", border: "none" }}
        >
          <div
            className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-all duration-500"
            style={{ borderRadius: "50%" }}
          >
            <ArrowUp
              size={18}
              className="text-white/30 group-hover:text-white transition-colors duration-500"
            />
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/15 group-hover:text-white/40 transition-colors duration-500"
            style={{ fontFamily: "system-ui" }}
          >
            Back to top
          </span>
        </button>

        {/* Brand name */}
        <h2
          className="uppercase leading-[0.9] mb-4 select-none"
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: "clamp(48px, 10vw, 140px)",
            letterSpacing: "-0.02em",
            color: "#fff",
          }}
        >
          Defa
          <span style={{ color: "rgba(255,255,255,0.12)" }}> Wardhana</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>.</span>
        </h2>

        {/* Tagline */}
        <p
          className="mb-14 max-w-md"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "clamp(14px, 1.2vw, 18px)",
            color: "rgba(255,255,255,0.25)",
            lineHeight: 1.7,
            letterSpacing: "0.01em",
          }}
        >
          Crafting high-performance digital interfaces with precision, motion, and technical
          excellence.
        </p>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mb-14">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors duration-400"
              style={{
                fontFamily: "system-ui",
                textDecoration: "none",
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div
          className="w-full max-w-xs h-px mb-14"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* Social icons */}
        <div className="flex items-center gap-6 mb-16">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-11 h-11 flex items-center justify-center border border-white/8 text-white/20 hover:text-white hover:border-white/30 transition-all duration-500"
              style={{ textDecoration: "none" }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/10"
          style={{ fontFamily: "system-ui" }}
        >
          © {new Date().getFullYear()} Defano Arya Wardhana. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
