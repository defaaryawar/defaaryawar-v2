import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Highlighter } from "./ui/Highlighter";
import { blogs } from "@/data/blogs";

export const BlogsPage = () => {
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];
  const regularBlogs = blogs
    .filter((b) => b.slug !== featuredBlog.slug)
    .filter(
      (b) =>
        !searchQuery ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())),
    );

  useGSAP(
    () => {
      window.scrollTo(0, 0);
      const tl = gsap.timeline();

      tl.fromTo(
        ".nav-back",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
      )
        .fromTo(
          ".page-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".featured-card",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(".archive-header", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");

      const cards = gsap.utils.toArray(".grid-card") as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 0.6 + i * 0.08,
            ease: "power2.out",
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="min-h-screen relative selection:bg-white selection:text-black"
      style={{ background: "#080808" }}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-32 md:pt-40 pb-8">
        {/* Page Header — more compact */}
        <div className="page-title mb-10 md:mb-14">
          <span
            className="uppercase text-[10px] font-bold tracking-[0.5em]"
            style={{ color: "#10b981" }}
          >
            Editorial
          </span>
          <h1
            className="uppercase leading-[0.9] mt-3"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "clamp(48px, 9vw, 120px)",
              color: "#fff",
            }}
          >
            The{" "}
            <Highlighter action="underline" color="#10b981">
              Journal
            </Highlighter>
          </h1>
          <p
            className="mt-5 max-w-lg"
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
            }}
          >
            Long-form notes on product, engineering, and design. Search the archive or start with
            this week's cover story.
          </p>
        </div>

        {/* ─── Featured Card — full-width image overlay ───────────── */}
        <div
          className="featured-card group relative rounded-xl overflow-hidden cursor-pointer mb-16 md:mb-20"
          onClick={() => navigate(`/blogs/${featuredBlog.slug}`)}
          style={{
            transition: "box-shadow 0.4s ease, border-color 0.4s ease",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.25)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(16,185,129,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 rgba(0,0,0,0)";
          }}
        >
          {/* Cover image */}
          <div className="relative" style={{ height: "clamp(300px, 45vw, 480px)" }}>
            <img
              src={featuredBlog.coverImage}
              alt={featuredBlog.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.55) contrast(1.1)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
              }}
            />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10">
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#10b981",
                  background: "rgba(16,185,129,0.12)",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
              >
                Cover Story
              </span>

              <h2
                className="mt-4 uppercase"
                style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: "clamp(24px, 4vw, 52px)",
                  lineHeight: 1.05,
                  color: "#fff",
                }}
              >
                {featuredBlog.title}
              </h2>
              <p
                className="mt-3 max-w-2xl hidden sm:block"
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7,
                }}
              >
                {featuredBlog.excerpt}
              </p>

              {/* Author + meta */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full overflow-hidden"
                  style={{ border: "2px solid rgba(255,255,255,0.15)" }}
                >
                  <img
                    src="/images/photo-profil/defaaryawar.png"
                    alt="Author"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?name=Defaaryawar&background=random";
                    }}
                  />
                </div>
                <span className="text-[11px] font-bold" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {featuredBlog.author}
                </span>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {new Date(featuredBlog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                <span
                  className="flex items-center gap-1 text-[11px]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  <Clock size={11} /> {featuredBlog.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Archive Section ───────────────────────────────────── */}
        <div className="archive-header flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-10">
          <h2
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontStyle: "italic",
              color: "#fff",
            }}
          >
            From the archive
          </h2>

          <div className="relative w-full sm:w-72">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="text"
              placeholder="Search by title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-[13px] text-white focus:outline-none focus:border-[#10b981]/50 transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Archive Grid — compact cards with text inside image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {regularBlogs.map((blog) => (
            <article
              key={blog.slug}
              className="grid-card group relative cursor-pointer"
              onClick={() => navigate(`/blogs/${blog.slug}`)}
            >
              <div
                className="relative overflow-hidden rounded-xl mb-6 bg-white/5"
                style={{ height: 240 }}
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ filter: "brightness(0.85) contrast(1.05)" }}
                />
              </div>

              <div
                className="mb-3 uppercase"
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "#10b981",
                }}
              >
                {new Date(blog.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              <h3
                className="mb-3 transition-colors duration-300 group-hover:text-[#10b981]"
                style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: "28px",
                  lineHeight: 1.1,
                  color: "#fff",
                  letterSpacing: "0.02em",
                }}
              >
                {blog.title}
              </h3>

              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.7,
                }}
              >
                {blog.excerpt.length > 100 ? blog.excerpt.slice(0, 100) + "..." : blog.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
