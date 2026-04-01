"use client";

import { forwardRef, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatedBeam } from "./ui/animated-beam";
import { cn } from "@/lib/utils";
import { Highlighter } from "./ui/Highlighter";
import { useTranslation } from "react-i18next";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const technologies = [
  {
    name: "React",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
    category: "Frontend",
    desc: "Component-based UIs",
  },
  {
    name: "Next.js",
    icon: "https://cdn.simpleicons.org/nextdotjs/ffffff",
    category: "Framework",
    desc: "Full-stack React apps",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
    category: "Language",
    desc: "Type-safe JavaScript",
  },
  {
    name: "Tailwind",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    category: "Styling",
    desc: "Utility-first CSS",
  },
  {
    name: "NestJS",
    icon: "https://cdn.simpleicons.org/nestjs/E0234E",
    category: "Backend",
    desc: "Node.js framework",
  },
  {
    name: "Golang",
    icon: "https://cdn.simpleicons.org/go/00ADD8",
    category: "Language",
    desc: "Compiled backend",
  },
  {
    name: "Docker",
    icon: "https://cdn.simpleicons.org/docker/2496ED",
    category: "DevOps",
    desc: "Container deployment",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.simpleicons.org/postgresql/4169E1",
    category: "Database",
    desc: "Relational data storage",
  },
];

// Accent colors per category
const categoryColors: Record<string, string> = {
  Frontend: "#61DAFB",
  Framework: "#ffffff",
  Language: "#3178C6",
  Styling: "#06B6D4",
  Backend: "#E0234E",
  DevOps: "#2496ED",
  Database: "#4169E1",
};

const TechCircle = forwardRef<HTMLDivElement, { className?: string; icon: string; name: string }>(
  ({ className, icon, name }, ref) => (
    <div
      ref={ref}
      title={name}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border border-white/10 bg-[#0f0f11] p-2.5",
        "shadow-[0_0_20px_-8px_rgba(99,102,241,0.5)]",
        className,
      )}
    >
      <img
        src={icon}
        alt={name}
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  ),
);
TechCircle.displayName = "TechCircle";

export const TechStack = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const beamContainer = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  const ref6 = useRef<HTMLDivElement>(null);
  const ref7 = useRef<HTMLDivElement>(null);
  const ref8 = useRef<HTMLDivElement>(null);
  const techRefs = [ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8];
  const { t } = useTranslation();

  const curvatures = [-60, -20, 20, 60];

  useGSAP(
    () => {
      gsap.fromTo(
        ".tech-title-line",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".tech-card",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: ".tech-grid", start: "top 82%" },
        },
      );
      gsap.to(".ticker-inner", { x: "-50%", duration: 22, ease: "none", repeat: -1 });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="skills"
      className="relative py-24 overflow-hidden"
      style={{ background: "#080809" }}
    >
      {/* Dot grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6 xl:px-12 relative">
        {/* ── Header ── */}
        <div ref={titleRef} className="mb-16">
          <div className="overflow-hidden mb-2">
            <p
              className="tech-title-line text-[11px] font-bold uppercase tracking-[0.45em]"
              style={{ color: "rgba(165,180,252,0.5)", fontFamily: "monospace" }}
            >
              {t("tech_stack.capabilities")}
            </p>
          </div>
          <div>
            <h2
              className="tech-title-line text-5xl leading-none font-black sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            >
              <span style={{ color: "#EFEFEF" }}>{t("tech_stack.title_part1")}</span>
              <Highlighter action="underline" color="#FF9800">
                {t("tech_stack.title_part2")}
              </Highlighter>{" "}
            </h2>
          </div>
          <div className="overflow-hidden mt-5">
            <p
              className="tech-title-line text-sm max-w-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {t("tech_stack.description")}
            </p>
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left — Animated Beam */}
          <div
            ref={beamContainer}
            className="relative flex items-center justify-center rounded-2xl border border-white/[0.07] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.015)", minHeight: "440px" }}
          >
            <span
              className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.4em]"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}
            >
              {t("tech_stack.full_stack_dev")}
            </span>

            <div className="relative flex w-full max-w-160 items-center justify-between px-6 py-10">
              <div className="flex flex-col gap-10">
                {technologies.slice(0, 4).map((tech, i) => (
                  <TechCircle key={tech.name} ref={techRefs[i]} icon={tech.icon} name={tech.name} />
                ))}
              </div>

              <div
                ref={centerRef}
                className="z-10 relative rounded-full overflow-hidden shrink-0"
                style={{
                  width: "100px",
                  height: "100px",
                  border: "2px solid rgba(99,102,241,0.5)",
                  boxShadow: "0 0 40px -8px rgba(99,102,241,0.7), 0 0 0 8px rgba(99,102,241,0.05)",
                }}
              >
                <img
                  src="/images/photo-profil/defaaryawar.png"
                  alt="Defa Aryawar — Fullstack Developer"
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0 rounded-full border border-indigo-400/30 animate-ping"
                  style={{ animationDuration: "2.8s" }}
                />
              </div>

              <div className="flex flex-col gap-10">
                {technologies.slice(4, 8).map((tech, i) => (
                  <TechCircle
                    key={tech.name}
                    ref={techRefs[i + 4]}
                    icon={tech.icon}
                    name={tech.name}
                  />
                ))}
              </div>
            </div>

            {[0, 1, 2, 3].map((i) => (
              <AnimatedBeam
                key={`l${i}`}
                containerRef={beamContainer}
                fromRef={techRefs[i]}
                toRef={centerRef}
                curvature={curvatures[i]}
                gradientStartColor="#6366F1"
                gradientStopColor="#A855F7"
                duration={3.5 + i * 0.4}
                pathOpacity={0.15}
              />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <AnimatedBeam
                key={`r${i}`}
                containerRef={beamContainer}
                fromRef={centerRef}
                toRef={techRefs[i + 4]}
                curvature={curvatures[i]}
                gradientStartColor="#A855F7"
                gradientStopColor="#06B6D4"
                duration={3.5 + i * 0.4}
                pathOpacity={0.15}
                reverse
              />
            ))}
          </div>

          {/* ── Right — Redesigned Tech List ── */}
          <div
            className="tech-grid flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.015)" }}
          >
            {/* Header row */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <span
                className="text-[9px] font-bold uppercase tracking-[0.4em]"
                style={{ color: "rgba(165,180,252,0.4)", fontFamily: "monospace" }}
              >
                {t("tech_stack.stack_label")}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
                <span
                  className="text-[9px] uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}
                >
                  {t("tech_stack.technologies_count")}
                </span>
              </div>
            </div>

            {/* Tech rows */}
            {technologies.map((tech, i) => {
              const accent = categoryColors[tech.category] ?? "#6366F1";
              const isLast = i === technologies.length - 1;
              return (
                <div
                  key={tech.name}
                  className="tech-card relative flex items-center gap-4 px-5 py-4"
                  style={{
                    borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 transition-opacity duration-300 tech-card-bar"
                    style={{ background: accent }}
                  />

                  {/* Icon */}
                  <div
                    className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg"
                    style={{
                      background: `${accent}12`,
                      border: `1px solid ${accent}22`,
                    }}
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-5 h-5 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Name + desc */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[13px] font-semibold leading-tight"
                      style={{
                        color: "rgba(255,255,255,0.82)",
                        fontFamily: "monospace",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {tech.name}
                    </p>
                    <p
                      className="text-[11px] mt-0.5 truncate"
                      style={{ color: "rgba(255,255,255,0.28)" }}
                    >
                      {t(`tech_stack.tech_desc.${tech.name}`)}
                    </p>
                  </div>

                  {/* Category pill */}
                  <div
                    className="shrink-0 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.3em]"
                    style={{
                      background: `${accent}15`,
                      color: accent,
                      fontFamily: "monospace",
                      border: `1px solid ${accent}25`,
                    }}
                  >
                    {tech.category}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="mt-14 overflow-hidden border-t border-white/5 pt-5">
          <div
            className="ticker-inner flex gap-10 whitespace-nowrap select-none"
            style={{ width: "max-content" }}
          >
            {[...slugs, ...slugs].map((slug, i) => (
              <span
                key={i}
                className="text-[9px] font-bold uppercase tracking-[0.35em]"
                style={{ color: "rgba(255,255,255,0.1)", fontFamily: "monospace" }}
              >
                {slug}
                <span className="ml-8 text-indigo-500/25">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @media (hover: hover) {
          .tech-card:hover {
            background: rgba(255,255,255,0.03);
          }
          .tech-card:hover .tech-card-bar {
            opacity: 1;
          }
        }

        /* Mobile: show accent bar always-on for a polished look */
        @media (hover: none) {
          .tech-card-bar {
            opacity: 0.35 !important;
          }
        }
      `}</style>
    </section>
  );
};
