import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Highlighter } from "./ui/Highlighter";
import { projects as projectsData } from "@/data/projects";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDisplay {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  descriptionId: string;
  descriptionEn: string;
  image: string;
  tags: string[];
}

const allProjects: ProjectDisplay[] = projectsData.map((p, i) => ({
  slug: p.slug,
  index: String(i + 1).padStart(2, "0"),
  title: p.title.split(" - ")[0],
  category: p.technologies.slice(0, 2).join(" · "),
  year: "2024",
  descriptionId: p.descriptionId || p.description,
  descriptionEn: p.description,
  image: p.images[0],
  tags: p.technologies.slice(0, 4),
}));

const ITEMS_PER_PAGE = 4;

const ZigzagItem = ({
  project,
  isLeft,
  onNavigate,
}: {
  project: ProjectDisplay;
  isLeft: boolean;
  onNavigate: (slug: string) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const { t, i18n } = useTranslation();
  const desc = i18n.language === "en" ? project.descriptionEn : project.descriptionId;

  return (
    <div
      className={`zigzag-item relative flex flex-col md:flex-row items-center gap-0 md:gap-0 ${isLeft ? "" : "md:flex-row-reverse"}`}
    >
      {/* Image Side */}
      <div
        className="w-full md:w-[calc(50%-32px)] shrink-0 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onNavigate(project.slug)}
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 4,
            border: `1px solid ${hovered ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)"}`,
            transition: "border-color 0.3s",
          }}
        >
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "brightness(0.85) contrast(1.05)",
                transition: "transform 0.5s ease",
                transform: hovered ? "scale(1.03)" : "scale(1)",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement("div");
                  fallback.className = "absolute inset-0 flex items-center justify-center";
                  fallback.style.background = "rgba(255,255,255,0.03)";
                  fallback.innerHTML = `<span style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.2);font-weight:700;">${t("projects.no_preview")}</span>`;
                  parent.appendChild(fallback);
                }
              }}
            />
            {/* Hover Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: "rgba(0,0,0,0.55)",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.35s ease",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.4)",
                  padding: "10px 24px",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                }}
              >
                {t("projects.view_detail")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Node (center) — hidden on mobile */}
      <div className="hidden md:flex flex-col items-center shrink-0" style={{ width: 64 }}>
        <div
          className="relative z-10 w-4 h-4 rounded-full transition-transform duration-300"
          style={{
            background: "#10b981",
            boxShadow: "0 0 20px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.15)",
          }}
        />
      </div>

      {/* Text Side */}
      <div
        className={`w-full md:w-[calc(50%-32px)] shrink-0 ${isLeft ? "md:text-left" : "md:text-right"}`}
      >
        <div className="p-5 md:p-0">
          {/* Index & Category */}
          <div className={`flex items-center gap-3 mb-4 ${isLeft ? "" : "md:justify-end"}`}>
            <span
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "12px",
                letterSpacing: "0.15em",
                color: "#10b981",
              }}
            >
              {project.index}
            </span>
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="uppercase mb-4"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "clamp(26px, 3.5vw, 42px)",
              letterSpacing: "-0.01em",
              color: "#fff",
              lineHeight: 1.05,
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="mb-5"
            style={{
              fontSize: "14px",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.8,
              fontWeight: 400,
            }}
          >
            {desc.length > 180 ? desc.slice(0, 180) + "..." : desc}
          </p>

          {/* Tags */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? "" : "md:justify-end"}`}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "4px 12px",
                  borderRadius: 3,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View detail hint */}
          <div
            className={`mt-4 flex items-center gap-2 cursor-pointer ${isLeft ? "" : "md:justify-end"}`}
            onClick={() => onNavigate(project.slug)}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
              }}
            >
              {t("projects.view_detail")} →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ──────────────────────────────────────────────────────────────
export const Projects = () => {
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { t } = useTranslation();

  // Recalculate inside component so it's always reactive
  const currentTotalPages = Math.ceil(allProjects.length / ITEMS_PER_PAGE);
  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const displayProjects = allProjects.slice(start, end);

  const canPrev = page > 0;
  const canNext = page < currentTotalPages - 1;

  const goToDetail = (slug: string) => {
    navigate(`/personal-arts/${slug}`);
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

      const items = gsap.utils.toArray(".zigzag-item") as HTMLElement[];
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          },
        );
      });
    },
    { scope: container, dependencies: [page] },
  );

  return (
    <section
      ref={container}
      id="projects"
      className="relative py-20 md:py-36 overflow-hidden"
      style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Big BG number */}
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
                {t("projects.portfolio_label")}
              </span>
            </div>
            <h2
              className="overflow-hidden uppercase leading-[0.88]"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(48px, 8vw, 110px)",
              }}
            >
              {t("projects.title_part1")
                .split("")
                .map((c, i) => (
                  <span
                    key={i}
                    className={`proj-heading-char inline-block${c === " " ? " w-[0.25em]" : ""}`}
                  >
                    {c !== " " ? c : ""}
                  </span>
                ))}
              <br />
              <Highlighter action="underline" color="#10b981">
                {t("projects.title_part2")
                  .split("")
                  .map((c, i) => (
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
            {t("projects.description")}
          </p>
        </div>

        {/* Zigzag Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line — desktop only */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: 2,
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 10%, rgba(255,255,255,0.08) 90%, transparent)",
            }}
          />

          {/* Items */}
          <div className="flex flex-col gap-12 md:gap-20">
            {displayProjects.map((project, i) => (
              <ZigzagItem
                key={`${page}-${project.slug}`}
                project={project}
                isLeft={(start + i) % 2 === 0}
                onNavigate={goToDetail}
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 md:mt-16 flex items-center justify-center gap-4 md:gap-6">
          {/* Previous */}
          <button
            onClick={() => {
              if (canPrev) setPage((p) => p - 1);
            }}
            disabled={!canPrev}
            aria-label="Previous page"
            className="flex items-center gap-2"
            style={{
              cursor: canPrev ? "pointer" : "not-allowed",
              background: canPrev ? "rgba(255,255,255,0.04)" : "transparent",
              border: `1px solid ${canPrev ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"}`,
              color: canPrev ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
              padding: "10px 18px",
              borderRadius: 4,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              transition: "all 0.3s",
              // Fix: reserve space so button doesn't disappear — use opacity instead of hiding
              opacity: canPrev ? 1 : 0.35,
            }}
            onMouseEnter={(e) => {
              if (canPrev) {
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }
            }}
            onMouseLeave={(e) => {
              if (canPrev) {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }
            }}
          >
            <ChevronLeft size={14} /> {t("projects.prev")}
          </button>

          {/* Page dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: currentTotalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                style={{
                  cursor: "pointer",
                  width: i === page ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === page ? "#10b981" : "rgba(255,255,255,0.15)",
                  border: "none",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => {
              if (canNext) setPage((p) => p + 1);
            }}
            disabled={!canNext}
            aria-label="Next page"
            className="flex items-center gap-2"
            style={{
              cursor: canNext ? "pointer" : "not-allowed",
              background: canNext ? "rgba(255,255,255,0.04)" : "transparent",
              border: `1px solid ${canNext ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"}`,
              color: canNext ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
              padding: "10px 18px",
              borderRadius: 4,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              transition: "all 0.3s",
              // Fix: reserve space so button doesn't disappear
              opacity: canNext ? 1 : 0.35,
            }}
            onMouseEnter={(e) => {
              if (canNext) {
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }
            }}
            onMouseLeave={(e) => {
              if (canNext) {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }
            }}
          >
            {t("projects.next")} <ChevronRight size={14} />
          </button>
        </div>

        {/* Lihat Selengkapnya */}
        <div
          className="mt-12 md:mt-20 flex flex-col items-center gap-5 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "32px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {t("projects.view_all_prefix")} {allProjects.length} {t("projects.view_all_suffix")}
          </p>
          <button
            onClick={() => navigate("/personal-arts")}
            className="group flex items-center justify-center gap-3 cursor-pointer"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontSize: "clamp(18px, 2.5vw, 28px)",
              fontStyle: "italic",
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.5)",
              background: "none",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
              padding: "8px 4px",
              borderRadius: 0,
              transition: "all 0.4s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#fff";
              (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(16,185,129,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
              (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(255,255,255,0.15)";
            }}
          >
            {t("projects.view_more")}
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
