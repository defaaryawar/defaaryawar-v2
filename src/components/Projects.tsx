import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Github as GithubIcon,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Highlighter } from "./ui/Highlighter";
import { projects as projectsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

type MediaItem = { type: "image"; src: string } | { type: "video"; src: string };

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

const projects: Project[] = projectsData.map((p, i) => ({
  index: String(i + 1).padStart(2, "0"),
  title: p.title.split(" - ")[0],
  category: p.technologies.slice(0, 2).join(" · "),
  year: "2024",
  description: p.description,
  media: p.images.map((src) => ({ type: "image" as const, src })),
  tags: p.technologies.slice(0, 4),
  link: p.demoLink ?? "#",
  github: p.githubLink ?? "#",
}));

// ─── Modal ────────────────────────────────────────────────────────────────────
const MediaModal = ({
  media,
  initialIdx,
  onClose,
}: {
  media: MediaItem[];
  initialIdx: number;
  onClose: () => void;
}) => {
  const [idx, setIdx] = useState(initialIdx);
  const total = media.length;
  const item = media[idx];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx((v) => (v - 1 + total) % total);
      if (e.key === "ArrowRight") setIdx((v) => (v + 1) % total);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [total, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((v) => (v - 1 + total) % total);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((v) => (v + 1) % total);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{ background: "rgba(0,0,0,0.95)", padding: "16px" }}
    >
      {/* Top bar */}
      <div
        className="w-full flex items-center justify-between mb-4"
        style={{ maxWidth: 1100 }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            fontWeight: 700,
          }}
        >
          {idx + 1} / {total}
        </span>
        <button
          onClick={onClose}
          className="flex items-center gap-2"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.6)",
            padding: "6px 14px",
            borderRadius: 2,
            cursor: "pointer",
            fontSize: "11px",
            letterSpacing: "0.1em",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#fff";
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
          }}
        >
          <X size={12} /> Close
        </button>
      </div>

      {/* Main media */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ maxWidth: 1100, flex: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video
            key={item.src}
            src={item.src}
            autoPlay
            muted
            loop
            playsInline
            style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: 4 }}
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: 4 }}
          />
        )}

        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute flex items-center justify-center"
              style={{
                left: 0,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                width: 40,
                height: 40,
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute flex items-center justify-center"
              style={{
                right: 0,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                width: 40,
                height: 40,
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div
          className="flex items-center gap-2 mt-5 overflow-x-auto pb-1"
          style={{ maxWidth: 1100 }}
          onClick={(e) => e.stopPropagation()}
        >
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: 60,
                height: 40,
                borderRadius: 2,
                flexShrink: 0,
                border:
                  i === idx ? "2px solid rgba(255,255,255,0.7)" : "2px solid rgba(255,255,255,0.1)",
                overflow: "hidden",
                cursor: "pointer",
                padding: 0,
                background: "#111",
                transition: "all 0.2s",
                opacity: i === idx ? 1 : 0.5,
              }}
            >
              {m.type === "video" ? (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}
                >
                  ▶
                </div>
              ) : (
                <img
                  src={m.src}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {total > 1 && (
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.2)",
            marginTop: 10,
            textTransform: "uppercase",
          }}
        >
          ← → to navigate · esc to close
        </p>
      )}
    </div>
  );
};

// ─── Carousel ─────────────────────────────────────────────────────────────────
const MediaCarousel = ({ media }: { media: MediaItem[] }) => {
  const [idx, setIdx] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const total = media.length;
  const item = media[idx];

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((v) => (v - 1 + total) % total);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((v) => (v + 1) % total);
  };

  return (
    <>
      {modalOpen &&
        ReactDOM.createPortal(
          <MediaModal media={media} initialIdx={idx} onClose={() => setModalOpen(false)} />,
          document.body,
        )}

      {/* 
        Mobile  : aspect-ratio 16/9 (proporsional, tidak fixed px)
        Desktop : height 360px fixed
        Trick   : padding-bottom 56.25% = 16:9, di-override via media query
      */}
      <div className="media-carousel-outer relative w-full" style={{ background: "#0d0d0d" }}>
        <style>{`
          .media-carousel-outer {
            padding-bottom: 56.25%; /* 16:9 mobile */
            height: 0;
          }
          @media (min-width: 768px) {
            .media-carousel-outer {
              padding-bottom: 0 !important;
              height: 420px !important;
            }
          }
        `}</style>

        <div className="absolute inset-0 overflow-hidden">
          {item.type === "video" ? (
            <video
              key={item.src}
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.75) contrast(1.1)",
              }}
            />
          ) : imgErrors[idx] ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.2)",
                  fontSize: 20,
                }}
              >
                ×
              </div>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)",
                  fontWeight: 700,
                }}
              >
                No Preview
              </span>
            </div>
          ) : (
            <img
              key={item.src}
              src={item.src}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setImgErrors((prev) => ({ ...prev, [idx]: true }))}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.75) contrast(1.1)",
              }}
            />
          )}

          {/* Preview button */}
          {!imgErrors[idx] && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}
              className="absolute flex items-center gap-1.5"
              style={{
                top: 10,
                right: 10,
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
                padding: "5px 10px",
                borderRadius: 2,
                cursor: "pointer",
                zIndex: 10,
                transition: "all 0.2s",
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.55)";
              }}
            >
              <Maximize2 size={11} /> Preview
            </button>
          )}

          {/* Prev/Next */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={next}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                <ChevronRight size={15} />
              </button>

              <div
                className="absolute bottom-3 left-1/2 flex items-center gap-1.5"
                style={{ transform: "translateX(-50%)" }}
              >
                {media.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIdx(i);
                    }}
                    style={{
                      width: i === idx ? 18 : 5,
                      height: 5,
                      borderRadius: 3,
                      background: i === idx ? "#fff" : "rgba(255,255,255,0.3)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.25s ease",
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 12,
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.1em",
                }}
              >
                {idx + 1}/{total}
              </div>
            </>
          )}

          {item.type === "video" && (
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                fontSize: "7px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "2px 6px",
                borderRadius: 2,
                background: "rgba(0,0,0,0.4)",
              }}
            >
              Video
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export const Projects = () => {
  const container = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(0);

  const toggle = (i: number) => {
    setExpanded((prev) => (prev === i ? null : i));
    // Wait for the accordion transition to complete (0.55s) before recalculating ScrollTrigger heights
    // This prevents the "Contact" section from sliding over early if the Projects section grows taller.
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".proj-header",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".proj-header", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".proj-panel",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
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
      className="relative py-20 md:py-36 overflow-hidden"
      style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div
        className="absolute top-10 right-4 md:right-16 select-none pointer-events-none"
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: "clamp(60px, 13vw, 180px)",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 1,
        }}
      >
        04
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div className="proj-header flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-10">
          <div>
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="h-px w-10" style={{ background: "rgba(255,255,255,0.2)" }} />
              <span
                className="uppercase text-[10px] font-bold tracking-[0.55em]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Portfolio
              </span>
            </div>
            <h2
              className="overflow-hidden uppercase leading-[0.88]"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(48px, 8vw, 110px)",
              }}
            >
              {"Personal ".split("").map((c, i) => (
                <span
                  key={i}
                  className={`proj-heading-char inline-block${c === " " ? " w-[0.25em]" : ""}`}
                >
                  {c !== " " ? c : ""}
                </span>
              ))}
              <br />
              <Highlighter action="underline" color="#10b981">
                {"Arts".split("").map((c, i) => (
                  <span key={i} className="proj-heading-char inline-block">
                    {c}
                  </span>
                ))}
                <span className="proj-heading-char inline-block">.</span>
              </Highlighter>
            </h2>
          </div>
          <p
            className="max-w-sm"
            style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}
          >
            A showcase of technical implementations where performance meets aesthetic precision.
          </p>
        </div>

        {/* Accordion */}
        <div
          className="proj-panel flex flex-col"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {projects.map((project, i) => {
            const isOpen = expanded === i;
            return (
              <div
                key={project.title}
                style={{
                  borderBottom:
                    i < projects.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                {/* Row header */}
                <div
                  onClick={() => toggle(i)}
                  className="md:px-9"
                  style={{
                    padding: "20px 16px",
                    background: isOpen ? "rgba(255,255,255,0.03)" : "transparent",
                    transition: "background 0.25s ease",
                    cursor: "pointer",
                  }}
                >
                  <div className="flex items-center justify-between gap-3 md:gap-6">
                    <div className="flex items-baseline gap-2 md:gap-4 min-w-0">
                      <span
                        style={{
                          fontFamily: "'Bebas Neue', Impact, sans-serif",
                          fontSize: "10px",
                          letterSpacing: "0.1em",
                          color: "rgba(255,255,255,0.25)",
                          flexShrink: 0,
                        }}
                      >
                        {project.index}
                      </span>
                      <span
                        className="uppercase truncate"
                        style={{
                          fontFamily: "'Bebas Neue', Impact, sans-serif",
                          fontSize: "clamp(22px, 3vw, 44px)",
                          letterSpacing: "-0.01em",
                          color: isOpen ? "#fff" : "rgba(255,255,255,0.5)",
                          lineHeight: 1,
                          transition: "color 0.25s ease",
                        }}
                      >
                        {project.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-6 shrink-0">
                      <span
                        className="hidden md:block"
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {project.category}
                      </span>
                      <span
                        className="hidden sm:block"
                        style={{
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.35)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {project.year}
                      </span>
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          border: "1px solid rgba(255,255,255,0.18)",
                          borderRadius: 2,
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "rgba(255,255,255,0.6)",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                          fontSize: 17,
                          lineHeight: 1,
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded */}
                <div
                  style={{
                    maxHeight: isOpen ? "1200px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/*
                    Mobile  : flex-col  → gambar atas (16:9), info di bawah
                    Desktop : flex-row  → gambar kiri (360px fixed), info kanan
                  */}
                  <div
                    className="flex flex-col md:flex-row"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {/* Gambar */}
                    <div className="w-full md:w-1/2 shrink-0">
                      <MediaCarousel media={project.media} />
                    </div>

                    {/* Info */}
                    <div className="w-full md:w-1/2 flex flex-col justify-between">
                      <style>{`
                        @media (min-width: 768px) {
                          .proj-info-${i} {
                            padding: 32px 36px !important;
                            border-top: none !important;
                            border-left: 1px solid rgba(255,255,255,0.07) !important;
                          }
                        }
                      `}</style>
                      <div
                        className={`proj-info-${i} flex flex-col justify-between h-full`}
                        style={{
                          padding: "20px 16px",
                          borderTop: "1px solid rgba(255,255,255,0.07)",
                          background: "rgba(255,255,255,0.01)",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: "9px",
                              fontWeight: 700,
                              letterSpacing: "0.3em",
                              textTransform: "uppercase",
                              color: "rgba(255,255,255,0.3)",
                              marginBottom: 12,
                            }}
                          >
                            {project.category} — {project.year}
                          </p>

                          <p
                            style={{
                              fontSize: "15px",
                              fontFamily: "'DM Sans', system-ui, sans-serif",
                              color: "rgba(255,255,255,0.75)",
                              lineHeight: 1.9,
                              marginBottom: "20px",
                              fontWeight: 400,
                            }}
                          >
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  letterSpacing: "0.08em",
                                  textTransform: "uppercase",
                                  color: "rgba(255,255,255,0.6)",
                                  border: "1px solid rgba(255,255,255,0.15)",
                                  padding: "5px 14px",
                                  borderRadius: 3,
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div
                          className="flex items-center gap-5 pt-4"
                          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          {project.link && project.link !== "#" && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5"
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.6)",
                                textDecoration: "none",
                                transition: "color 0.2s",
                              }}
                              onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLElement).style.color = "#fff")
                              }
                              onMouseLeave={(e) =>
                                ((e.currentTarget as HTMLElement).style.color =
                                  "rgba(255,255,255,0.6)")
                              }
                            >
                              Live <ArrowUpRight size={13} />
                            </a>
                          )}
                          {project.github && project.github !== "#" && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5"
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.6)",
                                textDecoration: "none",
                                transition: "color 0.2s",
                              }}
                              onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLElement).style.color = "#fff")
                              }
                              onMouseLeave={(e) =>
                                ((e.currentTarget as HTMLElement).style.color =
                                  "rgba(255,255,255,0.6)")
                              }
                            >
                              GitHub <GithubIcon size={13} />
                            </a>
                          )}
                          {(!project.link || project.link === "#") &&
                            (!project.github || project.github === "#") && (
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "rgba(255,255,255,0.2)",
                                  letterSpacing: "0.1em",
                                }}
                              >
                                Private Repository
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-20 md:mt-32 flex flex-col items-center gap-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "48px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
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
              fontSize: "clamp(24px, 3.5vw, 48px)",
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
