import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHOTO_SRC = "/images/photo-profil/defaaryawar-landscape.png";

export const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bgPhotoRef = useRef<HTMLDivElement>(null);
  const titleFirstRef = useRef<HTMLDivElement>(null);
  const titleSecondRef = useRef<HTMLDivElement>(null);
  const watermarkLeftRef = useRef<HTMLDivElement>(null);
  const watermarkRightRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── INTRO TIMELINE ──────────────────────────────────────
      // clearProps ensures styles are cleaned up after animation
      // so elements remain visible and don't get stuck
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        bgPhotoRef.current,
        { opacity: 0, scale: 1.08, filter: "brightness(0)" },
        {
          opacity: 1,
          scale: 1,
          filter: "brightness(1)",
          duration: 2.8,
          ease: "power3.out",
        },
      )
        .from(
          ".hero-char",
          { y: 180, opacity: 0, duration: 1.3, stagger: 0.025, ease: "power4.out" },
          "-=2",
        )
        .from(
          ".subtitle-char",
          { y: 30, opacity: 0, duration: 0.8, stagger: 0.015, ease: "power4.out" },
          "-=0.9",
        )
        .from(
          ".cta-char",
          {
            y: 24,
            opacity: 0,
            duration: 0.8,
            stagger: 0.01,
            ease: "power4.out",
            clearProps: "opacity,transform",
          },
          "-=0.6",
        )
        .from(".side-label", { opacity: 0, duration: 1 }, "-=0.6")
        .from(".scroll-hint", { opacity: 0, y: 10, duration: 0.8 }, "-=0.4");

      // ── SCROLL PARALLAX (scrub only, no pin) ────────────────
      const st = {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      };

      gsap.to(bgPhotoRef.current, { y: 160, ease: "none", scrollTrigger: st });
      gsap.to(titleFirstRef.current, { x: -120, ease: "none", scrollTrigger: st });
      gsap.to(titleSecondRef.current, { x: 120, ease: "none", scrollTrigger: st });
      gsap.to(watermarkLeftRef.current, { x: -280, ease: "none", scrollTrigger: st });
      gsap.to(watermarkRightRef.current, { x: 280, ease: "none", scrollTrigger: st });

      // Fade subtitle + cta as scroll — reverse when scroll back up
      gsap.fromTo(
        [subtitleRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        {
          y: -40,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            ...st,
            end: "35% top",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cleanup on unmount
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  const firstName = "DEFANO";
  const restName = "ARYA WARDHANA";

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]"
      style={{ fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif" }}
    >
      {/* Noise Grain */}
      <div
        className="absolute inset-0 z-1 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-30"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.15) 60%, transparent)",
        }}
      />

      {/* Background Photo */}
      <div
        ref={bgPhotoRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: 0, willChange: "transform, opacity" }}
      >
        <img
          src={PHOTO_SRC}
          alt=""
          className="w-full h-full object-cover"
          style={{
            objectPosition: "72% center",
            filter: "grayscale(10%) brightness(0.99) contrast(1.1) saturate(0.9)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(105deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.82) 28%, rgba(8,8,8,0.35) 55%, rgba(8,8,8,0.12) 100%),
              linear-gradient(to top, rgba(8,8,8,0.88) 0%, transparent 38%),
              linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, transparent 18%)
            `,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)",
          }}
        />
      </div>

      {/* Watermarks */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div
          ref={watermarkLeftRef}
          className="absolute"
          style={{ top: "5%", left: "-1%", willChange: "transform" }}
        >
          <span
            style={{
              fontSize: "16vw",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              whiteSpace: "nowrap",
              userSelect: "none",
              fontFamily: "'Bebas Neue', Impact, sans-serif",
            }}
          >
            FULLSTACK
          </span>
        </div>
        <div
          ref={watermarkRightRef}
          className="absolute"
          style={{ bottom: "4%", right: "-1%", willChange: "transform" }}
        >
          <span
            style={{
              fontSize: "16vw",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              whiteSpace: "nowrap",
              userSelect: "none",
              fontFamily: "'Bebas Neue', Impact, sans-serif",
            }}
          >
            DEVELOPER
          </span>
        </div>
      </div>

      {/* Side label right */}
      <div className="side-label hidden md:flex absolute right-7 inset-y-0 z-30 pointer-events-none flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-5">
          <div
            className="w-px h-20"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12))",
            }}
          />
          <span
            className="text-[9px] font-bold uppercase text-white/20 select-none tracking-[0.45em]"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontFamily: "system-ui",
            }}
          >
            FullStack Developer
          </span>
          <div
            className="w-px h-20"
            style={{ background: "linear-gradient(to top, transparent, rgba(255,255,255,0.12))" }}
          />
        </div>
      </div>

      {/* Year label left */}
      <div className="side-label hidden md:flex absolute left-7 inset-y-0 z-30 pointer-events-none flex-col justify-center items-center">
        <span
          className="text-[9px] font-bold uppercase text-white/15 select-none tracking-[0.55em]"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontFamily: "system-ui" }}
        >
          ©2025 Portfolio
        </span>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-8 md:px-16 relative z-20 pt-24 pb-16">
        <div className="max-w-5xl">
          {/* Badge */}
          <div className="overflow-hidden mb-10">
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-white/20" />
              <span
                className="text-[10px] uppercase tracking-[0.6em] text-white/35 font-medium"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Available for Work
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </div>
          </div>

          {/* Name — use hero-char class (not "char" to avoid conflicts with other sections) */}
          <h1
            className="mb-12 leading-[0.86] uppercase select-none"
            style={{ fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif" }}
          >
            <div ref={titleFirstRef} className="inline-block" style={{ willChange: "transform" }}>
              <div
                style={{
                  fontSize: "clamp(80px, 14vw, 200px)",
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {firstName.split("").map((char, i) => (
                  <span key={i} className="hero-char inline-block">
                    {char}
                  </span>
                ))}
              </div>
            </div>
            <br />
            <div ref={titleSecondRef} className="inline-block" style={{ willChange: "transform" }}>
              <div
                style={{
                  fontSize: "clamp(36px, 6.2vw, 96px)",
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.18)",
                  lineHeight: 1,
                }}
              >
                {restName.split("").map((char, i) => (
                  <span
                    key={i}
                    className={`hero-char inline-block${char === " " ? " w-[0.28em]" : ""}`}
                  >
                    {char !== " " ? char : ""}
                  </span>
                ))}
                <span className="hero-char inline-block" style={{ color: "rgba(255,255,255,0.5)" }}>
                  .
                </span>
              </div>
            </div>
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-5 mb-10">
            <div
              className="h-px flex-1 max-w-20"
              style={{
                background: "linear-gradient(to right, rgba(255,255,255,0.25), transparent)",
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.5em] text-white/20"
              style={{ fontFamily: "system-ui" }}
            >
              Based in Indonesia
            </span>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mb-14 text-white/40 font-light leading-relaxed"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "clamp(15px, 1.4vw, 20px)",
              maxWidth: "480px",
              letterSpacing: "0.01em",
            }}
          >
            {"Building robust full-stack applications and reliable networks with precision and technical excellence."
              .split("")
              .map((char, i) => (
                <span
                  key={i}
                  className={`subtitle-char inline-block${char === " " ? " w-[0.25em]" : ""}`}
                >
                  {char !== " " ? char : ""}
                </span>
              ))}
          </p>

          {/* CTA — NO initial opacity:0 inline style, let GSAP handle it entirely */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-6">
            <a
              href="#projects"
              className="group relative overflow-hidden"
              style={{
                padding: "18px 44px",
                background: "#fff",
                color: "#080808",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
              }}
            >
              <span style={{ position: "relative", zIndex: 1, display: "inline-flex", gap: "2px" }}>
                {"Explore Work".split("").map((char, i) => (
                  <span
                    key={i}
                    className={`cta-char inline-block${char === " " ? " w-[0.3em]" : ""}`}
                  >
                    {char !== " " ? char : ""}
                  </span>
                ))}
              </span>
              <ArrowRight
                size={14}
                style={{ position: "relative", zIndex: 1, transition: "transform 0.3s ease" }}
              />
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#e5e5e5",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s ease",
                }}
                className="group-hover:scale-x-100"
              />
            </a>

            <a
              href="#contact"
              style={{
                padding: "17px 44px",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                transition: "border-color 0.3s ease, color 0.3s ease",
                textDecoration: "none",
                gap: "2px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              {"Get In Touch".split("").map((char, i) => (
                <span
                  key={i}
                  className={`cta-char inline-block${char === " " ? " w-[0.3em]" : ""}`}
                >
                  {char !== " " ? char : ""}
                </span>
              ))}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .group:hover .group-hover\\:scale-x-100 { transform: scaleX(1) !important; }
      `}</style>
    </section>
  );
};
