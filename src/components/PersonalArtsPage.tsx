import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { Highlighter } from "./ui/Highlighter";
import { projects as projectsData } from "@/data/projects";

interface ProjectDisplay {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  descriptionEn: string;
  image: string;
  tags: string[];
}

const ZigzagItemFull = ({
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

  const description = i18n.language === "en" ? project.descriptionEn : project.description;

  return (
    <div
      className={`zigzag-page-item relative flex flex-col md:flex-row items-center gap-0 ${
        isLeft ? "" : "md:flex-row-reverse"
      }`}
    >
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
                  fallback.innerHTML = `<span style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.2);font-weight:700;">No Preview</span>`;
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
                {t("personal_arts_page.view_detail")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Node */}
      <div className="hidden md:flex flex-col items-center shrink-0" style={{ width: 64 }}>
        <div
          className="relative z-10 w-4 h-4 rounded-full"
          style={{
            background: "#10b981",
            boxShadow: "0 0 20px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.15)",
          }}
        />
      </div>

      {/* Text Side */}
      <div
        className={`w-full md:w-[calc(50%-32px)] shrink-0 ${
          isLeft ? "md:text-left" : "md:text-right"
        }`}
      >
        <div className="p-5 md:p-0">
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
            {description.length > 220 ? description.slice(0, 220) + "..." : description}
          </p>

          <div className={`flex flex-wrap gap-2 mb-4 ${isLeft ? "" : "md:justify-end"}`}>
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

          <div
            className={`flex items-center gap-2 cursor-pointer ${isLeft ? "" : "md:justify-end"}`}
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
              {t("personal_arts_page.view_detail")} →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Personal Arts Full Page (NO pagination, show ALL) ──────────────────────
export const PersonalArtsPage = () => {
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const allProjects: ProjectDisplay[] = projectsData.map((p, i) => ({
    slug: p.slug,
    index: String(i + 1).padStart(2, "0"),
    title: p.title.split(" - ")[0],
    category: p.technologies.slice(0, 2).join(" · "),
    year: "2024",
    description: p.descriptionId,
    descriptionEn: p.description,
    image: p.images[0],
    tags: p.technologies.slice(0, 4),
  }));

  const goToDetail = (slug: string) => {
    navigate(`/personal-arts/${slug}`);
  };

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".zigzag-page-item") as HTMLElement[];
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <main className="relative bg-brand-bg text-white selection:bg-white selection:text-black min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div ref={container} className="relative z-10">
        {/* Page Header */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-32 md:pt-40 pb-8 md:pb-16">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="h-px w-10" style={{ background: "rgba(255,255,255,0.2)" }} />
            <span
              className="uppercase text-[10px] font-bold tracking-[0.55em]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {t("personal_arts_page.all_projects")}
            </span>
          </div>
          <h1
            className="overflow-hidden uppercase leading-[0.88]"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "clamp(42px, 7vw, 100px)",
            }}
          >
            {t("personal_arts_page.title_personal")
              .split("")
              .map((c, i) => (
                <span key={i} className={`inline-block${c === " " ? " w-[0.25em]" : ""}`}>
                  {c !== " " ? c : ""}
                </span>
              ))}
            <br />
            <Highlighter action="underline" color="#10b981">
              {t("personal_arts_page.title_arts")
                .split("")
                .map((c, i) => (
                  <span key={i} className="inline-block">
                    {c}
                  </span>
                ))}
              <span className="inline-block">.</span>
            </Highlighter>
          </h1>
          <p
            className="mt-6 max-w-md"
            style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.75 }}
          >
            {t("personal_arts_page.subtitle")}
          </p>
        </div>

        {/* Zigzag Timeline (ALL projects, no pagination) */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-20 md:pb-32">
          <div className="relative">
            <div
              className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
              style={{
                width: 2,
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 5%, rgba(255,255,255,0.08) 95%, transparent)",
              }}
            />

            <div className="flex flex-col gap-12 md:gap-24">
              {allProjects.map((project, i) => (
                <ZigzagItemFull
                  key={project.title}
                  project={project}
                  isLeft={i % 2 === 0}
                  onNavigate={goToDetail}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
