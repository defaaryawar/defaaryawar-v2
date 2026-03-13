import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SOCIAL_LINKS } from "@/config/socials";

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

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      ref={container}
      className="relative z-[2] min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#050505" }}
    >
      <style>{`
        .footer-bg-parallax {
          background-image: url('${FOOTER_BG}');
        }
        @media (max-width: 768px) {
          .footer-bg-parallax {
            background-image: url('/images/photo-profil/defaaryawar.png');
            background-position: top center !important;
          }
        }
      `}</style>
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="footer-bg-parallax absolute inset-0 pointer-events-none"
        style={{
          top: "60px",
          bottom: "-60px",
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
            linear-gradient(to bottom, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.4) 35%, rgba(5,5,5,0.4) 65%, rgba(5,5,5,0.92) 100%),
            linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)
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
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.15) 70%, transparent)",
        }}
      />

      {/* Content — centered vertically with flex-1 */}
      <div className="footer-content relative z-10 container mx-auto px-8 md:px-16 flex-1 flex flex-col items-center justify-center text-center">
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
          <span style={{ color: "rgba(255,255,255,0.4)" }}> Wardhana</span>
          <span style={{ color: "rgba(255,255,255,0.6)" }}>.</span>
        </h2>

        {/* Tagline */}
        <p
          className="mb-8 max-w-md"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "clamp(14px, 1.2vw, 18px)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            letterSpacing: "0.01em",
          }}
        >
          Crafting high-performance digital interfaces with precision, motion, and technical
          excellence.
        </p>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mb-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors duration-400"
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
          className="w-full max-w-xs h-px mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />

        {/* Social icons */}
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 flex items-center justify-center border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-all duration-500 [&>svg]:w-5 [&>svg]:h-5"
              style={{ textDecoration: "none" }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright — pinned to bottom */}
      <div className="relative z-10 py-8 text-center">
        <p
          className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/30"
          style={{ fontFamily: "system-ui" }}
        >
          © {new Date().getFullYear()} Defano Arya Wardhana. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
