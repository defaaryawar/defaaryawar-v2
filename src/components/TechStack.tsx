import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/white" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/white" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/white" },
  { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/white" },
  { name: "GSAP", icon: "https://cdn.simpleicons.org/greensock/white" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/white" },
  { name: "React Query", icon: "https://cdn.simpleicons.org/reactquery/white" },
];

export const TechStack = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header reveal
      gsap.fromTo(
        [".ts-label", ".ts-heading"],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      // Divider grows from left
      gsap.fromTo(
        ".ts-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      // Cards stagger in
      gsap.fromTo(
        ".ts-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ts-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // BG number parallax
      gsap.to(".ts-bg-num", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Ticker
      gsap.to(".ts-ticker-inner", {
        xPercent: -50,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: container },
  );

  const tickerItems = [
    "React",
    "Next.js",
    "TypeScript",
    "GSAP",
    "Tailwind",
    "Framer Motion",
    "Node.js",
    "Performance",
    "Motion Design",
    "UI Architecture",
  ];

  return (
    <section
      ref={container}
      id="skills"
      className="relative overflow-hidden flex flex-col justify-center"
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* BG giant number parallax */}
      <div
        className="ts-bg-num absolute select-none pointer-events-none"
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: "clamp(180px, 28vw, 380px)",
          color: "rgba(255,255,255,0.022)",
          lineHeight: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
        }}
      >
        03
      </div>

      <div className="container mx-auto px-8 md:px-16 relative z-10 py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="ts-label flex items-center gap-4 mb-6">
              <div className="h-px w-10" style={{ background: "rgba(255,255,255,0.2)" }} />
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.55em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Capabilities
              </span>
            </div>
            <h2
              className="ts-heading uppercase leading-[0.88]"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(52px, 7.5vw, 104px)",
                letterSpacing: "-0.01em",
              }}
            >
              Technical <span style={{ color: "rgba(255,255,255,0.2)" }}>Arsenal</span>
              <span style={{ color: "rgba(255,255,255,0.45)" }}>.</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.32)",
              lineHeight: 1.75,
              maxWidth: "360px",
            }}
          >
            Tools and technologies I rely on to build fast, precise, and expressive digital
            products.
          </p>
        </div>

        {/* Divider */}
        <div
          className="ts-divider h-px mb-14"
          style={{ background: "rgba(255,255,255,0.08)", transformOrigin: "left" }}
        />

        {/* Grid */}
        <div className="ts-grid grid grid-cols-4 md:grid-cols-8 gap-0">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="ts-card group relative flex flex-col items-center justify-center gap-4 cursor-default"
              style={{
                padding: "clamp(24px, 3vw, 44px) 12px",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                transition: "background 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Hover top line */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
              />

              <div
                className="group-hover:opacity-90 group-hover:scale-110 transition-all duration-300"
                style={{ width: 36, height: 36, opacity: 0.3 }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <span
                className="group-hover:text-white/60 transition-colors duration-300 text-center"
                style={{
                  fontFamily: "system-ui",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.18)",
                }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-14">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: "10px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.15)",
            }}
          >
            & more
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>
      </div>

      {/* Ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "14px 0",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        <div className="ts-ticker-inner flex whitespace-nowrap" style={{ width: "max-content" }}>
          {[0, 1].map((ri) => (
            <div key={ri} className="flex items-center">
              {tickerItems.map((item, i) => (
                <span key={i} className="flex items-center gap-5 px-6">
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize: "12px",
                      letterSpacing: "0.3em",
                      color: "rgba(255,255,255,0.15)",
                    }}
                  >
                    {item}
                  </span>
                  <span
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.12)",
                      display: "inline-block",
                    }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
