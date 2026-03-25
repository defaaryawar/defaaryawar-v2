import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Github as GithubIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { projects as projectsData } from "@/data/projects";

// ─── Project Detail Page ────────────────────────────────────────────────────
export const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[projectIndex];

  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projectsData.length - 1
      ? projectsData[projectIndex + 1]
      : null;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!project) {
    return (
      <main className="relative bg-brand-bg text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "48px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Project Not Found
          </h1>
          <button
            onClick={() => navigate("/personal-arts")}
            className="mt-6 cursor-pointer"
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#10b981",
              background: "none",
              border: "1px solid rgba(16,185,129,0.3)",
              padding: "12px 24px",
              borderRadius: 4,
            }}
          >
            ← Kembali ke Personal Arts
          </button>
        </div>
      </main>
    );
  }

  const displayTitle = project.title.split(" - ")[0];
  const subtitle = project.title.split(" - ").slice(1).join(" - ");

  // Parse detailDescription markdown-like content into simple HTML
  const renderDescription = (text: string) => {
    const lines = text.split("\n");
    const elements: React.JSX.Element[] = [];

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) {
        elements.push(<br key={i} />);
      } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        elements.push(
          <h4
            key={i}
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "20px",
              letterSpacing: "0.05em",
              color: "#10b981",
              marginTop: "24px",
              marginBottom: "8px",
            }}
          >
            {trimmed.replace(/\*\*/g, "")}
          </h4>,
        );
      } else if (trimmed.startsWith("- ")) {
        elements.push(
          <div
            key={i}
            className="flex gap-3"
            style={{ marginBottom: "6px" }}
          >
            <span
              style={{
                color: "#10b981",
                fontSize: "14px",
                lineHeight: "1.8",
                flexShrink: 0,
              }}
            >
              ▸
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
              }}
              dangerouslySetInnerHTML={{
                __html: trimmed
                  .slice(2)
                  .replace(
                    /\*\*(.+?)\*\*/g,
                    '<strong style="color:rgba(255,255,255,0.85)">$1</strong>',
                  ),
              }}
            />
          </div>,
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        const num = trimmed.match(/^(\d+)\.\s/)?.[1];
        const content = trimmed.replace(/^\d+\.\s/, "");
        elements.push(
          <div
            key={i}
            className="flex gap-3"
            style={{ marginBottom: "6px" }}
          >
            <span
              style={{
                color: "#10b981",
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: "1.8",
                flexShrink: 0,
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              {num}.
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
              }}
              dangerouslySetInnerHTML={{
                __html: content.replace(
                  /\*\*(.+?)\*\*/g,
                  '<strong style="color:rgba(255,255,255,0.85)">$1</strong>',
                ),
              }}
            />
          </div>,
        );
      } else {
        elements.push(
          <p
            key={i}
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.8,
              marginBottom: "8px",
            }}
            dangerouslySetInnerHTML={{
              __html: trimmed.replace(
                /\*\*(.+?)\*\*/g,
                '<strong style="color:rgba(255,255,255,0.85)">$1</strong>',
              ),
            }}
          />,
        );
      }
    });

    return elements;
  };

  return (
    <main className="relative bg-brand-bg text-white selection:bg-white selection:text-black min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10">
        {/* Top Bar */}
        <div
          className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-12 py-5"
          style={{
            background: "rgba(9,9,11,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            onClick={() => navigate("/personal-arts")}
            className="group flex items-center gap-2 cursor-pointer"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.5)")
            }
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All Projects
          </button>

          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {String(projectIndex + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}
          </span>
        </div>

        {/* Hero Image */}
        <div
          className="relative w-full"
          style={{
            height: "clamp(300px, 55vh, 600px)",
            overflow: "hidden",
            background: "#0a0a0a",
          }}
        >
          <img
            src={project.images[0]}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
            style={{
              filter: "brightness(0.7) contrast(1.1)",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #09090b 0%, transparent 40%, transparent 60%, rgba(9,9,11,0.5) 100%)",
            }}
          />

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 md:px-8 lg:px-16 pb-8">
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#10b981",
              }}
            >
              {project.technologies.slice(0, 3).join(" · ")}
            </span>
            <h1
              className="uppercase mt-2"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(36px, 6vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
              }}
            >
              {displayTitle}
            </h1>
            {subtitle && (
              <p
                className="mt-2"
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 400,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left — Detail Description */}
            <div className="flex-1 min-w-0">
              <h3
                style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: "28px",
                  letterSpacing: "0.05em",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: "16px",
                }}
              >
                About This Project
              </h3>
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: "20px",
                }}
              >
                {renderDescription(project.detailDescription || project.description)}
              </div>
            </div>

            {/* Right — Sidebar Info */}
            <div className="w-full lg:w-[320px] shrink-0">
              {/* Tech Stack */}
              <div className="mb-8">
                <h4
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                    fontSize: "18px",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "12px",
                  }}
                >
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.6)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        padding: "6px 14px",
                        borderRadius: 3,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div
                className="pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h4
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                    fontSize: "18px",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "12px",
                  }}
                >
                  Links
                </h4>
                <div className="flex flex-col gap-3">
                  {project.demoLink && project.demoLink !== "" && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 transition-all duration-200"
                      style={{
                        padding: "12px 16px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 4,
                        textDecoration: "none",
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(16,185,129,0.4)";
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.1)";
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.7)";
                      }}
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.githubLink && project.githubLink !== "" && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 transition-all duration-200"
                      style={{
                        padding: "12px 16px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 4,
                        textDecoration: "none",
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.3)";
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.1)";
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.7)";
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <GithubIcon size={14} /> Source Code
                      </span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  {(!project.demoLink || project.demoLink === "") &&
                    (!project.githubLink || project.githubLink === "") && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.2)",
                          letterSpacing: "0.1em",
                          fontStyle: "italic",
                        }}
                      >
                        Private Repository — Links not available
                      </p>
                    )}
                </div>
              </div>

              {/* Gallery (if multiple images) */}
              {project.images.length > 1 && (
                <div
                  className="pt-6 mt-6"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <h4
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize: "18px",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "12px",
                    }}
                  >
                    Gallery
                  </h4>
                  <div className="flex flex-col gap-3">
                    {project.images.slice(1).map((img, i) => (
                      <div
                        key={i}
                        className="relative overflow-hidden"
                        style={{
                          borderRadius: 4,
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <img
                          src={img}
                          alt={`${project.title} - ${i + 2}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto object-cover"
                          style={{
                            filter: "brightness(0.85) contrast(1.05)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Prev / Next Navigation */}
        <div
          className="container mx-auto px-4 md:px-8 lg:px-16 pb-16 md:pb-24"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "32px",
          }}
        >
          <div className="flex items-stretch justify-between gap-4">
            {/* Previous */}
            <div className="flex-1">
              {prevProject && (
                <button
                  onClick={() => navigate(`/personal-arts/${prevProject.slug}`)}
                  className="w-full text-left cursor-pointer group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 4,
                    padding: "20px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.15)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.02)";
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <ChevronLeft size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      Previous
                    </span>
                  </div>
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize: "clamp(16px, 2vw, 24px)",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.1,
                    }}
                  >
                    {prevProject.title.split(" - ")[0]}
                  </p>
                </button>
              )}
            </div>

            {/* Next */}
            <div className="flex-1">
              {nextProject && (
                <button
                  onClick={() => navigate(`/personal-arts/${nextProject.slug}`)}
                  className="w-full text-right cursor-pointer group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 4,
                    padding: "20px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.15)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.02)";
                  }}
                >
                  <div className="flex items-center gap-2 mb-2 justify-end">
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      Next
                    </span>
                    <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
                  </div>
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize: "clamp(16px, 2vw, 24px)",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.1,
                    }}
                  >
                    {nextProject.title.split(" - ")[0]}
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
