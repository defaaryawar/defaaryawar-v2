import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Highlighter } from "./ui/Highlighter";
import { CATEGORIES, getWhatsAppLink, getDiscountPercent, type Service } from "@/data/services";
import { useServices } from "@/hooks/useServices";
import { MessageCircle, Star, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ─── CSS-generated website mockup preview ────────────────────────────────────
const ServicePreview = ({ service }: { service: Service }) => {
  const [imgError, setImgError] = useState(false);

  const previewConfig: Record<
    string,
    { emoji: string; bg: string; accent: string; label: string }
  > = {
    "landing-page": {
      emoji: "🚀",
      bg: "#0d0d1a",
      accent: "#6366f1",
      label: "Campaign · Promo · Event",
    },
    portfolio: {
      emoji: "🎨",
      bg: "#0d0b1a",
      accent: "#a855f7",
      label: "Karya · Gallery · CV Online",
    },
    "company-profile": {
      emoji: "🏢",
      bg: "#0a0f1e",
      accent: "#3b82f6",
      label: "Profil · Visi Misi · Tim",
    },
    "restoran-cafe": {
      emoji: "🍽️",
      bg: "#1a0d00",
      accent: "#f97316",
      label: "Menu · Reservasi · Gallery",
    },
    "travel-tour": {
      emoji: "✈️",
      bg: "#001a18",
      accent: "#14b8a6",
      label: "Paket · Booking · Destinasi",
    },
    "klinik-kecantikan": {
      emoji: "💎",
      bg: "#1a0a18",
      accent: "#ec4899",
      label: "Treatment · Booking · Before-After",
    },
    ecommerce: {
      emoji: "🛒",
      bg: "#001400",
      accent: "#22c55e",
      label: "Produk · Checkout · Dashboard",
    },
    "rumah-sakit": {
      emoji: "🏥",
      bg: "#00140a",
      accent: "#10b981",
      label: "Dokter · Jadwal · Portal",
    },
  };

  const cfg = previewConfig[service.id] ?? {
    emoji: "🌐",
    bg: "#111",
    accent: "#10b981",
    label: "Website",
  };

  if (!imgError) {
    return (
      <img
        src={service.image}
        alt={service.name}
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: cfg.bg }}>
      <div
        className="flex items-center gap-1.5 px-2.5"
        style={{
          height: 26,
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          flexShrink: 0,
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28c840" }} />
        <div
          className="flex-1 mx-1.5 flex items-center px-2"
          style={{ height: 14, borderRadius: 3, background: "rgba(255,255,255,0.05)" }}
        >
          <span style={{ fontSize: 7, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
            defano.dev/{service.id}
          </span>
        </div>
      </div>
      <div
        className="flex items-center justify-between px-3"
        style={{ height: 22, borderBottom: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}
      >
        <div
          style={{ width: 36, height: 5, borderRadius: 2, background: cfg.accent, opacity: 0.9 }}
        />
        <div className="flex gap-2">
          {[24, 18, 22, 18].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 3,
                borderRadius: 1.5,
                background: "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-3">
        <div style={{ fontSize: 22 }}>{cfg.emoji}</div>
        <div
          style={{
            width: "65%",
            height: 5,
            borderRadius: 2.5,
            background: cfg.accent,
            opacity: 0.55,
          }}
        />
        <div
          style={{
            width: "48%",
            height: 3.5,
            borderRadius: 2,
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            width: "38%",
            height: 3.5,
            borderRadius: 2,
            background: "rgba(255,255,255,0.07)",
          }}
        />
        <div
          style={{
            marginTop: 5,
            width: 48,
            height: 11,
            borderRadius: 3,
            background: cfg.accent,
            opacity: 0.8,
          }}
        />
      </div>
      <div
        className="flex items-center justify-center"
        style={{ height: 20, borderTop: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}
      >
        <span
          style={{
            fontSize: 7,
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.06em",
            fontFamily: "system-ui",
          }}
        >
          {cfg.label}
        </span>
      </div>
    </div>
  );
};

// ─── Service Card ─────────────────────────────────────────────────────────────
const ServiceCard = ({
  service,
  onSelect,
}: {
  service: Service;
  onSelect: (s: Service) => void;
}) => {
  const { t, i18n } = useTranslation();
  return (
  <div
    className="service-card flex flex-col overflow-hidden cursor-pointer"
    style={{
      background: "#111113",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 8,
      transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
    }}
    onClick={() => onSelect(service)}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "rgba(255,255,255,0.18)";
      el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)";
      el.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "rgba(255,255,255,0.07)";
      el.style.boxShadow = "none";
      el.style.transform = "translateY(0)";
    }}
  >
    {/* Preview */}
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3", flexShrink: 0 }}>
      <ServicePreview service={service} />

      {service.popular && (
        <div
          className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5"
          style={{
            background: "#ee4d2d",
            borderRadius: 3,
            fontSize: 9,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "system-ui",
          }}
        >
          <Star size={8} fill="#fff" color="#fff" />
          {t("services.popular")}
        </div>
      )}

      <div
        className="absolute top-2 right-2 px-2 py-0.5"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 3,
          fontSize: 8,
          fontWeight: 600,
          color: "rgba(255,255,255,0.55)",
          fontFamily: "system-ui",
          letterSpacing: "0.04em",
        }}
      >
        {i18n.language === "en" ? service.categoryEn : service.category}
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 p-3 gap-2">
      {/* Title */}
      <h3
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.4,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {i18n.language === "en" ? service.nameEn : service.name}
      </h3>

      {/* ── Price section — prominent, right after title ── */}
      <div style={{ marginTop: 2 }}>
        {getDiscountPercent(service) > 0 && (
          <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.3)",
                textDecoration: "line-through",
              }}
            >
              {service.originalPriceLabel}
            </span>
            <span
              className="px-1.5 py-0.5"
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#fff",
                background: "#ee4d2d",
                borderRadius: 3,
                fontFamily: "system-ui",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              -{getDiscountPercent(service)}%
            </span>
          </div>
        )}
        <Highlighter action="underline" color="#ee4d2d">
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            {service.priceLabel}
          </span>
        </Highlighter>
        <span
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.25)",
            display: "block",
            marginTop: 2,
            fontWeight: 500,
            fontFamily: "system-ui",
          }}
        >
          {t("services.starting_from")}
        </span>
      </div>

      {/* Verified */}
      <div className="flex items-center gap-1 mt-auto">
        <BadgeCheck size={10} color="#10b981" />
        <span style={{ fontSize: 9, color: "#10b981", fontWeight: 600, fontFamily: "system-ui" }}>
          {t("services.verified")}
        </span>
      </div>

      {/* CTA */}
      <a
        href={getWhatsAppLink(service)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 w-full py-2"
        style={{
          background: service.popular ? "#ee4d2d" : "transparent",
          border: service.popular ? "1px solid #ee4d2d" : "1px solid rgba(238,77,45,0.35)",
          color: service.popular ? "#fff" : "#ee4d2d",
          borderRadius: 5,
          fontSize: 11,
          fontWeight: 700,
          textDecoration: "none",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          transition: "background 0.15s ease, border-color 0.15s ease, color 0.15s ease",
          letterSpacing: "0.02em",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "#ee4d2d";
          el.style.color = "#fff";
          el.style.borderColor = "#ee4d2d";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          if (service.popular) {
            el.style.background = "#ee4d2d";
            el.style.color = "#fff";
          } else {
            el.style.background = "transparent";
            el.style.color = "#ee4d2d";
            el.style.borderColor = "rgba(238,77,45,0.35)";
          }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <MessageCircle size={12} />
        {t("services.order_now")}
      </a>
    </div>
  </div>
  );
};

// ─── Filter Chip ──────────────────────────────────────────────────────────────
const FilterChip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="shrink-0 px-3 py-1.5 cursor-pointer transition-all duration-150"
    style={{
      background: active ? "rgba(238,77,45,0.12)" : "transparent",
      border: active ? "1px solid rgba(238,77,45,0.4)" : "1px solid rgba(255,255,255,0.09)",
      color: active ? "#ee4d2d" : "rgba(255,255,255,0.4)",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: active ? 700 : 500,
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}
  >
    {label}
  </button>
);

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div
    className="flex flex-col overflow-hidden animate-pulse"
    style={{
      background: "#111113",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 8,
    }}
  >
    <div style={{ aspectRatio: "4/3", background: "rgba(255,255,255,0.04)" }} />
    <div className="flex flex-col flex-1 p-3 gap-3">
      <div style={{ height: 14, width: "75%", borderRadius: 3, background: "rgba(255,255,255,0.06)" }} />
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div style={{ height: 12, width: "40%", borderRadius: 3, background: "rgba(255,255,255,0.05)" }} />
          <div style={{ height: 16, width: 32, borderRadius: 3, background: "rgba(238,77,45,0.15)" }} />
        </div>
        <div style={{ height: 18, width: "55%", borderRadius: 3, background: "rgba(255,255,255,0.08)" }} />
        <div style={{ height: 9, width: "30%", borderRadius: 2, background: "rgba(255,255,255,0.04)" }} />
      </div>
      <div style={{ height: 10, width: "35%", borderRadius: 2, background: "rgba(255,255,255,0.04)", marginTop: "auto" }} />
      <div style={{ height: 32, borderRadius: 5, background: "rgba(255,255,255,0.04)" }} />
    </div>
  </div>
);

// ─── Services Page ────────────────────────────────────────────────────────────
export const ServicesPage = () => {
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("Semua");
  const { t } = useTranslation();
  const { services, loading } = useServices();

  const filteredServices =
    activeFilter === "Semua"
      ? services
      : services.filter((s) => s.category === activeFilter);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".service-card") as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.32, delay: i * 0.045, ease: "power2.out" },
        );
      });
    },
    { scope: container, dependencies: [activeFilter, loading], revertOnUpdate: true },
  );

  return (
    <main
      className="relative min-h-screen"
      style={{ background: "#080808", fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Grain */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.032]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      <div ref={container} className="relative z-10">
        {/* ── Header ── */}
        <div
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "clamp(80px, 10vw, 140px)",
            paddingBottom: 32,
          }}
        >
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.18)" }} />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.55em",
                  fontFamily: "system-ui",
                }}
              >
                {t("services.header_subtitle")}
              </span>
            </div>

            <h1
              className="uppercase leading-[0.88]"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(40px, 7vw, 96px)",
                marginBottom: 20,
              }}
            >
              {t("services.title_part1").split("").map((c, i) => (
                <span key={i} className="inline-block" style={{ color: "#fff" }}>
                  {c === " " ? "\u00A0" : c}
                </span>
              ))}
              <br />
              <Highlighter action="underline" color="#ee4d2d">
                {t("services.title_part2").split("").map((c, i) => (
                  <span key={i} className="inline-block" style={{ color: "#fff" }}>
                    {c}
                  </span>
                ))}
                <span className="inline-block" style={{ color: "#fff" }}>
                  .
                </span>
              </Highlighter>
            </h1>

            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.75,
                maxWidth: 460,
              }}
            >
              {t("services.description")}
            </p>
          </div>
        </div>

        {/* ── Sticky Filter Bar ── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            background: "rgba(8,8,8,0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="container mx-auto px-4 md:px-8 lg:px-16 py-3">
            <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {CATEGORIES.map((cat) => (
                <FilterChip
                  key={cat}
                  label={t(`services.categories.${cat}`)}
                  active={activeFilter === cat}
                  onClick={() => setActiveFilter(cat)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6 md:py-8">
          <div className="mb-4">
            <span
              style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "system-ui" }}
            >
              <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>
                {filteredServices.length}
              </span>{" "}
              {t("services.services_available")}
            </span>
          </div>

          <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onSelect={(s) => navigate(`/services/${s.id}`)}
                  />
                ))}
          </div>

          {!loading && filteredServices.length === 0 && (
            <div className="flex flex-col items-center py-24 gap-3">
              <span style={{ fontSize: 36 }}>🔍</span>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
                {t("services.no_services")}
              </p>
            </div>
          )}

          {/* ── Bottom CTA ── */}
          <div
            className="mt-12 md:mt-16 p-8 md:p-10 text-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 8,
            }}
          >
            <h2
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                fontSize: "clamp(22px, 3vw, 34px)",
                color: "#fff",
                letterSpacing: "0.04em",
                marginBottom: 8,
              }}
            >
              {t("services.custom_package")}
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.75,
                maxWidth: 420,
                margin: "0 auto 20px",
              }}
            >
              {t("services.custom_package_desc")}
            </p>
            <a
              href={`https://wa.me/6281219147116?text=${encodeURIComponent("Halo Defano! Saya tertarik dengan jasa pembuatan website custom. Bisa kita diskusi lebih lanjut?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5"
              style={{
                background: "#ee4d2d",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: 5,
                transition: "background 0.15s ease",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#d73211";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#ee4d2d";
              }}
            >
              <MessageCircle size={14} />
              {t("services.free_consultation")}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
