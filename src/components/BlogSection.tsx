import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Highlighter } from "./ui/Highlighter";
import { blogs } from "@/data/blogs";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const latestBlogs = blogs.slice(0, 3);

export const BlogSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useGSAP(
    () => {
      gsap.fromTo(
        ".blog-header",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".blog-header", start: "top 80%" },
        },
      );

      const cards = gsap.utils.toArray(".blog-card") as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="blogs"
      className="relative py-20 md:py-36 overflow-hidden"
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
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
        05
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div className="blog-header flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-10">
          <div>
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="h-px w-10" style={{ background: "rgba(255,255,255,0.2)" }} />
              <span
                className="uppercase text-[10px] font-bold tracking-[0.55em]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {t("blogs_section.editorial")}
              </span>
            </div>
            <h2
              className="overflow-hidden uppercase leading-[0.88]"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(48px, 8vw, 110px)",
              }}
            >
              {t("blogs_section.title_part1").split("").map((c, i) => (
                <span key={i} className="blog-heading-char inline-block">
                  {c}
                </span>
              ))}
              <Highlighter action="underline" color="#10b981">
                <span className="blog-heading-char inline-block">{t("blogs_section.title_part2")}</span>
              </Highlighter>
            </h2>
          </div>
          <p
            className="max-w-sm"
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.75,
            }}
          >
            {t("blogs_section.description")}
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {latestBlogs.map((blog) => (
            <article
              key={blog.slug}
              className="blog-card group cursor-pointer relative overflow-hidden"
              onClick={() => navigate(`/blogs/${blog.slug}`)}
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8,
                height: 420,
                transition: "all 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              {/* Full-bleed Cover Image */}
              <img
                src={blog.coverImage}
                alt={i18n.language === "en" ? blog.titleEn : blog.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ filter: "brightness(0.65) contrast(1.1)" }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 45%, transparent 100%)",
                }}
              />

              {/* Content overlaid on image */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                {/* Tags + Read time */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.5)",
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(8px)",
                        padding: "3px 8px",
                        borderRadius: 3,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    · {blog.readTime}
                  </span>
                </div>

                {/* Date */}
                <div
                  className="mb-2"
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#10b981",
                  }}
                >
                  {new Date(blog.date).toLocaleDateString(i18n.language === 'en' ? "en-US" : "id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                {/* Title */}
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                    fontSize: "clamp(22px, 2.5vw, 28px)",
                    letterSpacing: "0.02em",
                    color: "#fff",
                    lineHeight: 1.15,
                  }}
                >
                  {(i18n.language === "en" ? blog.titleEn : blog.title).length > 60 
                    ? (i18n.language === "en" ? blog.titleEn : blog.title).slice(0, 60) + "..." 
                    : (i18n.language === "en" ? blog.titleEn : blog.title)}
                </h3>

                {/* Excerpt */}
                <p
                  style={{
                    fontSize: "12px",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.7,
                    fontWeight: 400,
                  }}
                >
                  {(i18n.language === "en" ? blog.excerptEn : blog.excerpt).length > 100 
                    ? (i18n.language === "en" ? blog.excerptEn : blog.excerpt).slice(0, 100) + "..." 
                    : (i18n.language === "en" ? blog.excerptEn : blog.excerpt)}
                </p>

                {/* Read more */}
                <div className="mt-3 flex items-center gap-2">
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                      transition: "color 0.3s",
                    }}
                    className="group-hover:!text-white/60"
                  >
                    {t("blogs_section.read_more")} →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div
          className="mt-12 md:mt-16 flex flex-col items-center gap-5 text-center"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "32px",
          }}
        >
          <button
            onClick={() => navigate("/blogs")}
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
            {t("blogs_section.view_all")}
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
