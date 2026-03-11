import { useRef } from "react";
import { Github as GithubIcon, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: "01",
    title: "APMA",
    category: "SaaS Architecture",
    year: "2024",
    description:
      "A comprehensive SaaS solution designed specifically for teachers to manage student performance and curriculum efficiently.",
    image: "https://picsum.photos/seed/apma-pro/1200/800",
    tags: ["React", "Next.js", "Tailwind", "Supabase"],
    link: "#",
    github: "#",
  },
  {
    index: "02",
    title: "AAA Clan",
    category: "Community Engineering",
    year: "2024",
    description:
      "A modern, high-performance website for a gaming community featuring real-time updates and interactive member profiles.",
    image: "https://picsum.photos/seed/aaa-pro/1200/800",
    tags: ["React", "Framer Motion", "Chakra UI"],
    link: "#",
    github: "#",
  },
  {
    index: "03",
    title: "Data Dashboard",
    category: "Visual Intelligence",
    year: "2023",
    description:
      "A premium admin dashboard with complex data visualisations and real-time monitoring capabilities built for scale.",
    image: "https://picsum.photos/seed/dash-pro/1200/800",
    tags: ["TypeScript", "Recharts", "Tailwind"],
    link: "#",
    github: "#",
  },
];

export const Projects = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Heading reveal
      gsap.from(".proj-heading-char", {
        y: 100,
        opacity: 0,
        duration: 1.1,
        stagger: 0.025,
        ease: "power4.out",
        scrollTrigger: { trigger: ".proj-header", start: "top 82%" },
      });

      // Each project item
      gsap.utils.toArray<HTMLElement>(".project-item").forEach((item, i) => {
        const isEven = i % 2 === 0;

        gsap.fromTo(
          item,
          { x: isEven ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Image zoom on scroll
        const img = item.querySelector<HTMLElement>(".proj-img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 1 },
            },
          );
        }
      });

      // Index numbers fade in
      gsap.from(".proj-index", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 75%" },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="projects"
      className="relative py-36 overflow-hidden"
      style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* BG number */}
      <div
        className="absolute top-10 right-8 md:right-16 select-none pointer-events-none"
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: "clamp(80px, 13vw, 180px)",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 1,
        }}
      >
        04
      </div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* ── Header ── */}
        <div className="proj-header flex flex-col md:flex-row md:items-end justify-between mb-28 gap-10">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-10" style={{ background: "rgba(255,255,255,0.2)" }} />
              <span
                className="uppercase text-[10px] font-bold tracking-[0.55em]"
                style={{ fontFamily: "system-ui", color: "rgba(255,255,255,0.3)" }}
              >
                Portfolio
              </span>
            </div>
            <h2
              className="overflow-hidden uppercase leading-[0.88]"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(56px, 8vw, 110px)",
              }}
            >
              {"Selected ".split("").map((c, i) => (
                <span
                  key={i}
                  className={`proj-heading-char inline-block${c === " " ? " w-[0.25em]" : ""}`}
                >
                  {c !== " " ? c : ""}
                </span>
              ))}
              <br />
              <span style={{ color: "rgba(255,255,255,0.18)" }}>
                {"Works".split("").map((c, i) => (
                  <span key={i} className="proj-heading-char inline-block">
                    {c}
                  </span>
                ))}
                <span
                  className="proj-heading-char inline-block"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  .
                </span>
              </span>
            </h2>
          </div>
          <p
            className="max-w-sm"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.75,
            }}
          >
            A showcase of technical implementations where performance meets aesthetic precision.
          </p>
        </div>

        {/* ── Project list ── */}
        <div className="space-y-12">
          {projects.map((project, i) => {
            return (
              <div
                key={project.title}
                className="project-item group relative overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.5s cubic-bezier(0.32, 0, 0.67, 0)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.2)";
                  el.style.background = "rgba(255,255,255,0.05)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.background = "rgba(255,255,255,0.02)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  {/* Image Section */}
                  <div
                    className="relative lg:col-span-6 overflow-hidden"
                    style={{
                      aspectRatio: "16/10",
                      background: "rgba(0,0,0,0.4)",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="proj-img w-full h-full object-cover"
                      style={{
                        filter: "grayscale(40%) brightness(0.5) contrast(1.2)",
                        transition: "filter 0.7s ease, transform 0.7s ease",
                        willChange: "transform",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.filter =
                          "grayscale(0%) brightness(0.75) contrast(1.1)";
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.filter =
                          "grayscale(40%) brightness(0.5) contrast(1.2)";
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                      }}
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-all duration-700 group-hover:opacity-20"
                      style={{
                        background:
                          "linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
                        opacity: 0.35,
                      }}
                    />

                    {/* Index badge */}
                    <div
                      className="proj-index absolute top-5 left-5"
                      style={{
                        fontFamily: "'Bebas Neue', Impact, sans-serif",
                        fontSize: "28px",
                        letterSpacing: "0.05em",
                        color: "rgba(255,255,255,0.15)",
                        fontWeight: 900,
                      }}
                    >
                      {project.index}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div
                    className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between"
                    style={{ background: "rgba(8,8,8,0.4)" }}
                  >
                    {/* Top content */}
                    <div>
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mb-10">
                        <span
                          className="uppercase font-bold tracking-[0.3em] px-3 py-1"
                          style={{
                            fontFamily: "system-ui",
                            fontSize: "9px",
                            color: "#fff",
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "2px",
                          }}
                        >
                          {project.category}
                        </span>
                        <span
                          className="uppercase tracking-[0.2em]"
                          style={{
                            fontFamily: "system-ui",
                            fontSize: "13px",
                            color: "rgba(255,255,255,0.4)",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                          }}
                        >
                          {project.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className="uppercase leading-[0.85] mb-6"
                        style={{
                          fontFamily: "'Bebas Neue', Impact, sans-serif",
                          fontSize: "clamp(48px, 5vw, 72px)",
                          letterSpacing: "-0.015em",
                          color: "#fff",
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="mb-8"
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.55)",
                          lineHeight: 1.8,
                          maxWidth: "450px",
                        }}
                      >
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-10">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: "4px 12px",
                              border: "1px solid rgba(255,255,255,0.15)",
                              fontFamily: "system-ui",
                              fontSize: "9px",
                              fontWeight: 600,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "rgba(255,255,255,0.4)",
                              borderRadius: "2px",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor =
                                "rgba(255,255,255,0.4)";
                              (e.currentTarget as HTMLElement).style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor =
                                "rgba(255,255,255,0.15)";
                              (e.currentTarget as HTMLElement).style.color =
                                "rgba(255,255,255,0.4)";
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                      <a
                        href={project.link}
                        className="group/link relative"
                        style={{
                          fontFamily: "system-ui",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.35em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.7)",
                          textDecoration: "none",
                          transition: "color 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color =
                            "rgba(255,255,255,0.7)";
                        }}
                      >
                        View Project
                        <ArrowUpRight
                          size={14}
                          style={{
                            transition: "transform 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            const parent = (e.target as HTMLElement).closest("a");
                            if (parent) {
                              (e.target as HTMLElement).style.transform =
                                "translate(4px, -4px)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.transform = "translate(0)";
                          }}
                        />
                      </a>
                      <a
                        href={project.github}
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          transition: "color 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color =
                            "rgba(255,255,255,0.4)";
                        }}
                      >
                        <GithubIcon size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-32 flex flex-col items-center gap-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "64px" }}
        >
          <p
            style={{
              fontFamily: "system-ui",
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            Want to see more?
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.18)",
              textDecoration: "none",
              transition: "color 0.4s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.18)";
            }}
          >
            View All on GitHub
            <ArrowUpRight size={28} />
          </a>
        </div>
      </div>
    </section>
  );
};
