import { useRef, useState } from "react";
import { Github as GithubIcon, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Highlighter } from "./ui/Highlighter";

gsap.registerPlugin(ScrollTrigger);

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

interface Project {
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  media: MediaItem[];
  tags: string[];
  link: string;
  github: string;
}

const projects: Project[] = [
  {
    index: "01",
    title: "APMA",
    category: "SaaS Architecture",
    year: "2024",
    description:
      "A comprehensive SaaS solution designed specifically for teachers to manage student performance and curriculum efficiently.",
    media: [
      { type: "image", src: "https://picsum.photos/seed/apma-1/1200/800" },
      { type: "image", src: "https://picsum.photos/seed/apma-2/1200/800" },
      { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
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
    media: [
      { type: "image", src: "https://picsum.photos/seed/aaa-1/1200/800" },
      { type: "image", src: "https://picsum.photos/seed/aaa-2/1200/800" },
    ],
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
    media: [
      { type: "image", src: "https://picsum.photos/seed/dash-1/1200/800" },
      { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { type: "image", src: "https://picsum.photos/seed/dash-2/1200/800" },
    ],
    tags: ["TypeScript", "Recharts", "Tailwind"],
    link: "#",
    github: "#",
  },
];

const MediaSlide = ({ item, active }: { item: MediaItem; active: boolean }) => {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(20%) brightness(0.6) contrast(1.1)",
          opacity: active ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />
    );
  }
  return (
    <img
      src={item.src}
      alt=""
      referrerPolicy="no-referrer"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "grayscale(20%) brightness(0.6) contrast(1.1)",
        opacity: active ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    />
  );
};

export const Projects = () => {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);

  const handleProjectEnter = (i: number) => {
    if (i !== active) {
      setActive(i);
      setMediaIndex(0);
    }
  };

  const currentMedia = projects[active].media;
  const total = currentMedia.length;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMediaIndex((v) => (v - 1 + total) % total);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMediaIndex((v) => (v + 1) % total);
  };

  useGSAP(
    () => {
      gsap.from(".proj-heading-char", {
        y: 100,
        opacity: 0,
        duration: 1.1,
        stagger: 0.025,
        ease: "power4.out",
        scrollTrigger: { trigger: ".proj-header", start: "top 82%" },
      });
      gsap.fromTo(
        ".proj-panel",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".proj-panel", start: "top 80%" },
        },
      );
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
        {/* Header */}
        <div className="proj-header flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
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
              <Highlighter action="underline" color="#10b981">
                {"Works".split("").map((c, i) => (
                  <span key={i} className="proj-heading-char inline-block">{c}</span>
                ))}
                <span className="proj-heading-char inline-block">.</span>
              </Highlighter>
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

        {/* Panel */}
        <div
          className="proj-panel flex flex-col lg:flex-row"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Left: list */}
          <div
            className="lg:w-1/2 flex flex-col"
            style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
          >
            {projects.map((project, i) => (
              <div
                key={project.title}
                onMouseEnter={() => handleProjectEnter(i)}
                style={{
                  padding: "32px 36px",
                  borderBottom:
                    i < projects.length - 1
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "none",
                  background: active === i ? "rgba(255,255,255,0.03)" : "transparent",
                  transition: "background 0.25s ease",
                  cursor: "default",
                }}
              >
                <div className="flex items-baseline gap-4 mb-3">
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.2)",
                    }}
                  >
                    {project.index}
                  </span>
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize: "clamp(36px, 3vw, 52px)",
                      letterSpacing: "-0.01em",
                      color: active === i ? "#fff" : "rgba(255,255,255,0.35)",
                      lineHeight: 1,
                      transition: "color 0.25s ease",
                    }}
                  >
                    {project.title}
                  </span>
                </div>

                <div className="flex items-center gap-5 mb-3">
                  <span
                    style={{
                      fontFamily: "system-ui",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "system-ui",
                      fontSize: "9px",
                      color: "rgba(255,255,255,0.15)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {project.year}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.35)",
                    lineHeight: 1.7,
                    maxWidth: "400px",
                    marginBottom: "16px",
                  }}
                >
                  {project.description}
                </p>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "system-ui",
                          fontSize: "8px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.2)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          padding: "3px 8px",
                          borderRadius: "2px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    className="flex items-center gap-3 shrink-0"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transition: "opacity 0.25s ease",
                    }}
                  >
                    <a
                      href={project.link}
                      style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                    <a
                      href={project.github}
                      style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
                    >
                      <GithubIcon size={15} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: media */}
          <div className="lg:w-1/2 relative" style={{ minHeight: "420px", background: "#0d0d0d" }}>
            <div className="sticky top-0 w-full" style={{ height: "100%", minHeight: "420px" }}>
              {/* All media layers for active project */}
              {currentMedia.map((item, i) => (
                <MediaSlide key={i} item={item} active={i === mediaIndex} />
              ))}

              {/* Prev / Next — only show if more than 1 */}
              {total > 1 && (
                <>
                  <button
                    onClick={prev}
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.5)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)",
                      width: "36px",
                      height: "36px",
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s",
                      zIndex: 10,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.5)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.5)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)",
                      width: "36px",
                      height: "36px",
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s",
                      zIndex: 10,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.5)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Bottom bar: label + dots */}
              <div
                className="absolute bottom-0 left-0 right-0 px-7 py-5 flex items-center justify-between"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "system-ui",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {projects[active].category} — {projects[active].year}
                </span>

                {/* Dots */}
                {total > 1 && (
                  <div className="flex items-center gap-2" style={{ pointerEvents: "all" }}>
                    {currentMedia.map((item, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setMediaIndex(i); }}
                        style={{
                          width: i === mediaIndex ? "20px" : "6px",
                          height: "6px",
                          borderRadius: "3px",
                          background: i === mediaIndex ? "#fff" : "rgba(255,255,255,0.3)",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          transition: "all 0.25s ease",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Video badge */}
              {currentMedia[mediaIndex]?.type === "video" && (
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    fontFamily: "system-ui",
                    fontSize: "8px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "3px 8px",
                    borderRadius: "2px",
                    background: "rgba(0,0,0,0.4)",
                  }}
                >
                  Video
                </div>
              )}
            </div>
          </div>
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
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.18)"; }}
          >
            View All on GitHub
            <ArrowUpRight size={28} />
          </a>
        </div>
      </div>
    </section>
  );
};