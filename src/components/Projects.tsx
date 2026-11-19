import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Highlighter } from "./ui/Highlighter";
import {
  projects as projectsData,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/data/projects";

type Filter = "all" | ProjectCategory;

interface ProjectDisplay {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  descriptionId: string;
  descriptionEn: string;
  image: string;
  tags: string[];
  extraTags: number;
  demoLink: string;
  live: boolean;
  inDevelopment: boolean;
}

const allProjects: ProjectDisplay[] = projectsData.map((p, i) => {
  const [title, ...rest] = p.title.split(" - ");
  return {
    slug: p.slug,
    index: String(i + 1).padStart(2, "0"),
    title,
    subtitle: rest.join(" - "),
    category: p.category,
    descriptionId: p.descriptionId || p.description,
    descriptionEn: p.description,
    image: p.images[0],
    tags: p.technologies.slice(0, 3),
    extraTags: Math.max(0, p.technologies.length - 3),
    demoLink: ("demoLink" in p && p.demoLink) || "",
    live: "live" in p && !!p.live,
    inDevelopment: "inDevelopment" in p && !!p.inDevelopment,
  };
});

const categoryLabel = (id: ProjectCategory) =>
  PROJECT_CATEGORIES.find((c) => c.id === id)?.label ?? id;

const INITIAL_COUNT = 6;

const ProjectCard = ({
  project,
  onOpen,
}: {
  project: ProjectDisplay;
  onOpen: (slug: string) => void;
}) => {
  const { t, i18n } = useTranslation();
  const desc = i18n.language === "en" ? project.descriptionEn : project.descriptionId;

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/8 bg-white/[0.025] transition-colors duration-300 hover:border-emerald-500/40 hover:bg-white/[0.04]"
    >
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => onOpen(project.slug)}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-white/[0.03] cursor-pointer"
        aria-label={`${t("projects.view_detail")}: ${project.title}`}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
          {categoryLabel(project.category)}
        </span>
        {project.inDevelopment && (
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            {t("projects.in_development")}
          </span>
        )}
        {project.live && (
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {t("projects.live")}
          </span>
        )}
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-baseline gap-3">
          <span
            className="text-emerald-400 text-sm tracking-widest"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            {project.index}
          </span>
          <h3
            className="uppercase leading-none text-white"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "clamp(24px, 2.2vw, 30px)",
              letterSpacing: "0.01em",
            }}
          >
            {project.title}
          </h3>
        </div>
        {project.subtitle && (
          <p className="mb-3 text-[13px] font-medium text-white/60">{project.subtitle}</p>
        )}
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-white/45">{desc}</p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] font-medium text-white/55"
            >
              {tag}
            </span>
          ))}
          {project.extraTags > 0 && (
            <span className="rounded-md px-2 py-1 text-[11px] font-medium text-white/35">
              +{project.extraTags}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
          <button
            type="button"
            onClick={() => onOpen(project.slug)}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white cursor-pointer"
          >
            {t("projects.view_detail")}
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-400/90 transition-colors hover:text-emerald-300"
            >
              {t("projects.demo")}
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export const Projects = ({ full = false }: { full?: boolean }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: allProjects.length };
    for (const p of allProjects) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? allProjects : allProjects.filter((p) => p.category === filter)),
    [filter],
  );
  const visible = full ? filtered : filtered.slice(0, INITIAL_COUNT);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t("projects.filter_all") },
    ...PROJECT_CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.label })),
  ];

  const openProject = (slug: string) => navigate(`/projects/${slug}`);

  return (
    <section
      id="projects"
      className="relative py-20 md:py-32"
      style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div
        className="pointer-events-none absolute right-4 top-10 select-none md:right-16"
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: "clamp(60px, 13vw, 180px)",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 1,
        }}
      >
        04
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end md:gap-10">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-10 bg-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.55em] text-white/40">
                {t("projects.portfolio_label")}
              </span>
            </div>
            <h2
              className="uppercase leading-[0.88]"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(48px, 8vw, 110px)",
              }}
            >
              {t("projects.title_part1")}
              <br />
              <Highlighter action="underline" color="#10b981">
                {t("projects.title_part2")}.
              </Highlighter>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="mb-4 text-[15px] leading-relaxed text-white/50">
              {t("projects.description")}
            </p>
            <p className="text-white/80">
              <span
                className="mr-2 text-emerald-400"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 40, lineHeight: 1 }}
              >
                {allProjects.length}+
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                {t("projects.count_label")}
              </span>
            </p>
          </div>
        </div>

        {/* Filters — horizontally scrollable on phones */}
        <div className="-mx-4 mb-8 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2">
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFilter(f.id);
                  }}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? "border-white bg-white text-black"
                      : "border-white/12 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {f.label}
                  <span className={active ? "text-black/50" : "text-white/30"}>{counts[f.id] ?? 0}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} onOpen={openProject} />
            ))}
          </AnimatePresence>
        </motion.div>

        {!full && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="group flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/85 cursor-pointer"
            >
              {t("projects.show_all", { count: allProjects.length })}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
