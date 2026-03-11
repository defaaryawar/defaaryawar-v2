import { useRef } from "react";
import { Code2, Zap } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHOTO_SRC = "/images/photo-profil/defaaryawar-landscape.png";

export const About = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Left column slides in — play once, no reverse
      gsap.fromTo(
        ".about-left",
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            // once:true equivalent — play only forward
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".about-right",
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Stats count up — play once
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseInt(el.getAttribute("data-val") || "0");
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.8,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: container.current,
              start: "top 65%",
              toggleActions: "play none none none",
            },
            onUpdate() {
              el.textContent = Math.round(parseFloat(el.innerHTML)) + "+";
            },
          },
        );
      });

      // Heading lines reveal
      gsap.fromTo(
        ".about-heading-line",
        { y: 60, opacity: 0 },
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

      // Floating card bob
      gsap.to(".float-card", {
        y: -8,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="about"
      className="relative py-36 overflow-hidden"
      style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* BG section number */}
      <div
        className="absolute top-12 right-8 md:right-16 select-none pointer-events-none"
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: "clamp(80px, 12vw, 160px)",
          color: "rgba(255,255,255,0.03)",
          lineHeight: 1,
        }}
      >
        02
      </div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}
          <div className="about-left">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-10" style={{ background: "rgba(255,255,255,0.2)" }} />
              <span
                className="uppercase text-[10px] font-bold tracking-[0.55em]"
                style={{ fontFamily: "system-ui", color: "rgba(255,255,255,0.3)" }}
              >
                Background
              </span>
            </div>

            <div className="overflow-hidden mb-2">
              <h2
                className="about-heading-line uppercase leading-[0.9]"
                style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: "clamp(52px, 7vw, 96px)",
                  letterSpacing: "-0.01em",
                }}
              >
                Merging Design
              </h2>
            </div>
            <div className="overflow-hidden mb-12">
              <h2
                className="about-heading-line uppercase leading-[0.9]"
                style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: "clamp(52px, 7vw, 96px)",
                  letterSpacing: "-0.01em",
                  color: "rgba(255,255,255,0.18)",
                }}
              >
                with Engineering.
              </h2>
            </div>

            <div
              className="space-y-6 mb-16"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "clamp(15px, 1.3vw, 18px)",
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.75,
                maxWidth: "520px",
              }}
            >
              <p>
                I'm a technical architect specialising in the frontend layer. My work is rooted in
                the belief that digital products should be as performant as they are beautiful.
              </p>
              <p>
                With a focus on React ecosystems and modern motion libraries, I build interfaces
                that feel alive — bridging complex backend logic with intuitive user experience.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-0">
              {[
                { val: 3, label: "Years of Craft" },
                { val: 20, label: "Projects Shipped" },
                { val: 8, label: "Tech Mastered" },
              ].map(({ val, label }, i) => (
                <div
                  key={label}
                  className="py-6"
                  style={{
                    borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    paddingLeft: i > 0 ? "28px" : 0,
                  }}
                >
                  <div
                    className="stat-num"
                    data-val={val}
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize: "clamp(40px, 4.5vw, 64px)",
                      color: "#fff",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {val}+
                  </div>
                  <p
                    className="uppercase tracking-[0.2em] mt-2"
                    style={{
                      fontFamily: "system-ui",
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.2)",
                      fontWeight: 700,
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="about-right relative">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <img
                src={PHOTO_SRC}
                alt="Defano Arya Wardhana"
                className="w-full h-full object-cover"
                style={{
                  filter: "grayscale(30%) brightness(0.65) contrast(1.1)",
                  transform: "scale(1.06)",
                  transition: "transform 1.2s ease, filter 1.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter = "grayscale(0%) brightness(0.8) contrast(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1.06)";
                  e.currentTarget.style.filter = "grayscale(30%) brightness(0.65) contrast(1.1)";
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 40%)",
                }}
              />
            </div>

            {/* Float card — Core Focus */}
            <div
              className="float-card absolute hidden xl:flex items-center gap-4 z-20"
              style={{
                top: "10%",
                left: "-60px",
                background: "rgba(14,14,14,0.92)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(16px)",
                padding: "18px 22px",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Code2 size={20} color="rgba(255,255,255,0.7)" />
              </div>
              <div>
                <p
                  className="uppercase tracking-widest mb-1"
                  style={{
                    fontFamily: "system-ui",
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.25)",
                    fontWeight: 700,
                  }}
                >
                  Core Focus
                </p>
                <p
                  className="uppercase tracking-tight"
                  style={{
                    fontFamily: "system-ui",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  Technical Architecture
                </p>
              </div>
            </div>

            {/* Float card — Motion */}
            <div
              className="float-card absolute hidden xl:flex items-center gap-4 z-20"
              style={{
                bottom: "12%",
                right: "-48px",
                background: "rgba(14,14,14,0.92)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(16px)",
                padding: "18px 22px",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={20} color="rgba(255,255,255,0.7)" />
              </div>
              <div>
                <p
                  className="uppercase tracking-widest mb-1"
                  style={{
                    fontFamily: "system-ui",
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.25)",
                    fontWeight: 700,
                  }}
                >
                  Specialty
                </p>
                <p
                  className="uppercase tracking-tight"
                  style={{
                    fontFamily: "system-ui",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  Motion & Performance
                </p>
              </div>
            </div>

            {/* Corner accent */}
            <div
              className="absolute -bottom-4 -left-4 w-20 h-20 pointer-events-none"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.15)",
                borderLeft: "1px solid rgba(255,255,255,0.15)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
