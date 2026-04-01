import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag, ChevronLeft, ChevronRight, Share2, Copy, Check } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { blogs } from "@/data/blogs";

gsap.registerPlugin(ScrollTrigger);

// ─── Parse content into sections for TOC ───────────────────────────────────
interface ContentSection {
  id: string;
  title: string;
  level: number;
}

function parseHeadings(content: string): ContentSection[] {
  const lines = content.split("\n");
  const headings: ContentSection[] = [];
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      const title = trimmed.replace(/\*\*/g, "");
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, title, level: 2 });
    }
  });
  return headings;
}

// ─── Render markdown-like content ──────────────────────────────────────────
function renderContent(content: string): React.JSX.Element[] {
  const lines = content.split("\n");
  const elements: React.JSX.Element[] = [];

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<br key={i} />);
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      const title = trimmed.replace(/\*\*/g, "");
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      elements.push(
        <h2
          key={i}
          id={id}
          className="blog-content-heading"
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: "26px",
            letterSpacing: "0.04em",
            color: "#fff",
            marginTop: "40px",
            marginBottom: "12px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            scrollMarginTop: "120px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "4px",
              height: "20px",
              background: "#10b981",
              marginRight: "12px",
              borderRadius: "2px",
              verticalAlign: "middle",
            }}
          />
          {title}
        </h2>
      );
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <div key={i} className="flex gap-3" style={{ marginBottom: "6px" }}>
          <span
            style={{
              color: "#10b981",
              fontSize: "15px",
              lineHeight: "1.9",
              flexShrink: 0,
            }}
          >
            ▸
          </span>
          <span
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.9,
            }}
            dangerouslySetInnerHTML={{
              __html: trimmed
                .slice(2)
                .replace(
                  /\*\*(.+?)\*\*/g,
                  '<strong style="color:rgba(255,255,255,0.9)">$1</strong>'
                ),
            }}
          />
        </div>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      const num = trimmed.match(/^(\d+)\.\s/)?.[1];
      const text = trimmed.replace(/^\d+\.\s/, "");
      elements.push(
        <div key={i} className="flex gap-3" style={{ marginBottom: "8px" }}>
          <span
            style={{
              color: "#10b981",
              fontSize: "13px",
              fontWeight: 700,
              lineHeight: "1.9",
              flexShrink: 0,
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            {num}.
          </span>
          <span
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.9,
            }}
            dangerouslySetInnerHTML={{
              __html: text.replace(
                /\*\*(.+?)\*\*/g,
                '<strong style="color:rgba(255,255,255,0.9)">$1</strong>'
              ),
            }}
          />
        </div>
      );
    } else {
      elements.push(
        <p
          key={i}
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.9,
            marginBottom: "10px",
          }}
          dangerouslySetInnerHTML={{
            __html: trimmed.replace(
              /\*\*(.+?)\*\*/g,
              '<strong style="color:rgba(255,255,255,0.9)">$1</strong>'
            ),
          }}
        />
      );
    }
  });

  return elements;
}

// ─── Blog Detail Page ──────────────────────────────────────────────────────
export const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const { t, i18n } = useTranslation();

  const blogIndex = blogs.findIndex((b) => b.slug === slug);
  const blog = blogs[blogIndex];
  const prevBlog = blogIndex > 0 ? blogs[blogIndex - 1] : null;
  const nextBlog = blogIndex < blogs.length - 1 ? blogs[blogIndex + 1] : null;

  const content = blog ? (i18n.language === "en" ? blog.contentEn : blog.content) : "";
  const title = blog ? (i18n.language === "en" ? blog.titleEn : blog.title) : "";
  const excerpt = blog ? (i18n.language === "en" ? blog.excerptEn : blog.excerpt) : "";

  const headings = blog ? parseHeadings(content) : [];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  // Track active heading with IntersectionObserver
  useEffect(() => {
    if (!blog || headings.length === 0) return;

    // rootMargin: top -120px (sticky header), bottom -70% (only top 30% of viewport triggers)
    // This means only the heading near the TOP gets marked active, not ones further down
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-120px 0px -70% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [blog, headings]);

  // GSAP animations
  useGSAP(
    () => {
      if (!blog) return;

      const tl = gsap.timeline();

      tl.fromTo(
        ".detail-hero-image",
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      )
        .fromTo(
          ".detail-meta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".detail-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ".detail-content",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".detail-toc",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
    },
    { scope: container, dependencies: [slug] }
  );

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // 404
  if (!blog) {
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
            {t("blog_detail.not_found")}
          </h1>
          <button
            onClick={() => navigate("/blogs")}
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
            ← {t("blog_detail.back_to_blog")}
          </button>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(blog.date).toLocaleDateString(i18n.language === "en" ? "en-US" : "id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main
      ref={container}
      className="relative bg-brand-bg text-white selection:bg-white selection:text-black min-h-screen"
    >
      {/* Noise overlay */}
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
            onClick={() => navigate("/blogs")}
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
            {t("blog_detail.all_posts")}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 cursor-pointer transition-colors"
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                color: copied ? "#10b981" : "rgba(255,255,255,0.4)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "6px 12px",
                borderRadius: 4,
                transition: "all 0.3s",
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? t("blog_detail.link_copied") : t("blog_detail.copy_link")}
            </button>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div
          className="detail-hero-image relative w-full"
          style={{
            height: "clamp(280px, 50vh, 550px)",
            overflow: "hidden",
            background: "#0a0a0a",
          }}
        >
          <img
            src={blog.coverImage}
            alt={blog.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            style={{
              filter: "brightness(0.5) contrast(1.1)",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #09090b 0%, rgba(9,9,11,0.4) 40%, transparent 60%, rgba(9,9,11,0.3) 100%)",
            }}
          />

          {/* Title overlay on hero */}
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 md:px-8 lg:px-16 pb-10 md:pb-14">
            <div className="detail-meta flex flex-wrap items-center gap-4 mb-5">
              {blog.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5"
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#10b981",
                    background: "rgba(16,185,129,0.1)",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    border: "1px solid rgba(16,185,129,0.15)",
                  }}
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
            <h1
              className="detail-title uppercase"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(32px, 5vw, 68px)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                maxWidth: "900px",
              }}
            >
              {title}
            </h1>
            <div className="detail-meta flex flex-wrap items-center gap-5 mt-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full overflow-hidden"
                  style={{ border: "2px solid rgba(255,255,255,0.1)" }}
                >
                  <img
                    src="/images/photo-profil/defaaryawar.png"
                    alt={blog.author}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?name=Defaaryawar&background=random";
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {blog.author}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={13} style={{ color: "rgba(255,255,255,0.35)" }} />
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 500,
                  }}
                >
                  {formattedDate}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={13} style={{ color: "rgba(255,255,255,0.35)" }} />
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 500,
                  }}
                >
                  {blog.readTime} {t("blog_detail.read")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area (TOC + Article) */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left — Sticky Table of Contents */}
            <aside className="detail-toc hidden lg:block w-[240px] shrink-0">
              <div
                className="sticky top-24"
                style={{
                  maxHeight: "calc(100vh - 120px)",
                  overflowY: "auto",
                }}
              >
                <div className="mb-4">
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    Table of Contents
                  </span>
                </div>
                <nav
                  style={{
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                    paddingLeft: 0,
                  }}
                >
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(h.id);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className="block transition-all duration-300 hover:!text-white"
                      style={{
                        fontSize: "12px",
                        fontWeight: activeSection === h.id ? 600 : 400,
                        color:
                          activeSection === h.id
                            ? "#10b981"
                            : "rgba(255,255,255,0.35)",
                        padding: "8px 16px",
                        borderLeft:
                          activeSection === h.id
                            ? "2px solid #10b981"
                            : "2px solid transparent",
                        marginLeft: "-1px",
                        lineHeight: 1.5,
                        textDecoration: "none",
                      }}
                    >
                      {h.title}
                    </a>
                  ))}
                </nav>

                {/* Share section in TOC */}
                <div
                  className="mt-8 pt-6"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 cursor-pointer w-full"
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: copied ? "#10b981" : "rgba(255,255,255,0.3)",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      padding: "10px 14px",
                      borderRadius: 4,
                      transition: "all 0.3s",
                    }}
                  >
                    <Share2 size={13} />
                    {copied ? t("blog_detail.link_copied") : t("blog_detail.share_article")}
                  </button>
                </div>
              </div>
            </aside>

            {/* Mobile TOC */}
            <details
              className="lg:hidden mb-8 detail-toc"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <summary
                className="cursor-pointer px-5 py-4 flex items-center justify-between"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  listStyle: "none",
                }}
              >
                <span>{t("blog_detail.table_of_contents")}</span>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>▾</span>
              </summary>
              <nav className="px-5 pb-4">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(h.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className="block py-2 transition-all duration-300 hover:!text-white"
                    style={{
                      fontSize: "12px",
                      fontWeight: activeSection === h.id ? 600 : 400,
                      color:
                        activeSection === h.id
                          ? "#10b981"
                          : "rgba(255,255,255,0.4)",
                      paddingLeft: "12px",
                      borderLeft:
                        activeSection === h.id
                          ? "2px solid #10b981"
                          : "2px solid transparent",
                      textDecoration: "none",
                    }}
                  >
                    {h.title}
                  </a>
                ))}
              </nav>
            </details>

            {/* Right — Main Article Content */}
            <article className="detail-content flex-1 min-w-0 max-w-3xl">
              {/* Excerpt / Lead paragraph */}
              <p
                style={{
                  fontSize: "17px",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.9,
                  fontStyle: "italic",
                  marginBottom: "32px",
                  paddingBottom: "24px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {i18n.language === "en" ? blog.excerptEn : excerpt}
              </p>

              {/* Rendered content */}
              <div>{renderContent(i18n.language === "en" ? blog.contentEn : content)}</div>

              {/* Tags at bottom */}
              <div
                className="mt-16 pt-8 flex flex-wrap gap-2"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "6px 14px",
                      borderRadius: 4,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author box */}
              <div
                className="mt-10 p-6 md:p-8 flex flex-col sm:flex-row items-start gap-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full overflow-hidden shrink-0"
                  style={{ border: "2px solid rgba(255,255,255,0.1)" }}
                >
                  <img
                    src="/images/photo-profil/defaaryawar.png"
                    alt={blog.author}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?name=Defaaryawar&background=random";
                    }}
                  />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {t("blog_detail.written_by")}
                  </span>
                  <h4
                    className="mt-1"
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize: "22px",
                      letterSpacing: "0.05em",
                      color: "#fff",
                    }}
                  >
                    {blog.author}
                  </h4>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                      lineHeight: 1.7,
                      marginTop: "4px",
                    }}
                  >
                    {t("blog_detail.author_bio")}
                  </p>
                </div>
              </div>
            </article>
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
              {prevBlog && (
                <button
                  onClick={() => navigate(`/blogs/${prevBlog.slug}`)}
                  className="w-full text-left cursor-pointer group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 6,
                    padding: "20px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(16,185,129,0.3)";
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
                    <ChevronLeft
                      size={12}
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    />
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      {t("blog_detail.previous_post")}
                    </span>
                  </div>
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize: "clamp(16px, 2vw, 22px)",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.1,
                    }}
                  >
                    {(i18n.language === "en" ? prevBlog.titleEn : prevBlog.title).length > 60
                      ? (i18n.language === "en" ? prevBlog.titleEn : prevBlog.title).slice(0, 60) + "..."
                      : (i18n.language === "en" ? prevBlog.titleEn : prevBlog.title)}
                  </p>
                </button>
              )}
            </div>

            {/* Next */}
            <div className="flex-1">
              {nextBlog && (
                <button
                  onClick={() => navigate(`/blogs/${nextBlog.slug}`)}
                  className="w-full text-right cursor-pointer group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 6,
                    padding: "20px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(16,185,129,0.3)";
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
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.25)",
                      }}
                    >
                      {t("blog_detail.table_of_contents")}
                    </span>
                    <ChevronRight
                      size={12}
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    />
                  </div>
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      fontSize: "clamp(16px, 2vw, 22px)",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.1,
                    }}
                  >
                    {(i18n.language === "en" ? nextBlog.titleEn : nextBlog.title).length > 60
                      ? (i18n.language === "en" ? nextBlog.titleEn : nextBlog.title).slice(0, 60) + "..."
                      : (i18n.language === "en" ? nextBlog.titleEn : nextBlog.title)}
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
