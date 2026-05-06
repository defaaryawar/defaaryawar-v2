import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { Highlighter } from "./ui/Highlighter";
import { getWhatsAppLink, type Service } from "@/data/services";
import { SERVICE_PLANS, DEFAULT_PLANS, type ServicePlan } from "@/data/service_plans";
import { useService } from "@/hooks/useServices";
import { useParams, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  BadgeCheck,
  Globe,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Zap,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Mini preview (same as ServicesPage) ─────────────────────────────────────
const previewConfig: Record<string, { emoji: string; bg: string; accent: string; label: string }> =
  {
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

const ServiceHeroBanner = ({ service }: { service: Service }) => {
  const cfg = previewConfig[service.id] ?? {
    emoji: "🌐",
    bg: "#111",
    accent: "#10b981",
    label: "Website",
  };
  const [imgError, setImgError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = service.images?.length ? service.images : [service.image];

  // Auto slide effect
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000); // ganti gambar tiap 4 detik
    return () => clearInterval(timer);
  }, [images.length]);

  if (!imgError) {
    return (
      <div className="relative w-full h-full group overflow-hidden bg-white/5">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${service.name} preview ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 md:px-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                }}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all cursor-pointer pointer-events-auto shadow-sm active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                }}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all cursor-pointer pointer-events-auto shadow-sm active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer shadow-sm ${
                    i === currentIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/70 w-2"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: cfg.bg }}>
      <div
        className="flex items-center gap-2 px-4"
        style={{
          height: 36,
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          flexShrink: 0,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
        <div
          className="flex-1 mx-3 flex items-center px-3"
          style={{ height: 20, borderRadius: 4, background: "rgba(255,255,255,0.05)" }}
        >
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
            defano.dev/{service.id}
          </span>
        </div>
      </div>
      <div
        className="flex items-center justify-between px-4"
        style={{ height: 32, borderBottom: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}
      >
        <div
          style={{ width: 56, height: 6, borderRadius: 3, background: cfg.accent, opacity: 0.9 }}
        />
        <div className="flex gap-3">
          {[36, 28, 32, 28].map((w, i) => (
            <div
              key={i}
              style={{ width: w, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
        <div style={{ fontSize: 48 }}>{cfg.emoji}</div>
        <div
          style={{
            width: "55%",
            height: 7,
            borderRadius: 3.5,
            background: cfg.accent,
            opacity: 0.6,
          }}
        />
        <div
          style={{
            width: "40%",
            height: 5,
            borderRadius: 2.5,
            background: "rgba(255,255,255,0.12)",
          }}
        />
        <div
          style={{
            width: "32%",
            height: 5,
            borderRadius: 2.5,
            background: "rgba(255,255,255,0.07)",
          }}
        />
        <div
          style={{
            marginTop: 10,
            width: 72,
            height: 18,
            borderRadius: 5,
            background: cfg.accent,
            opacity: 0.85,
          }}
        />
      </div>
      <div
        className="flex items-center justify-center"
        style={{ height: 28, borderTop: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}
      >
        <span
          style={{
            fontSize: 9,
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

// ─── Service Detail Page ──────────────────────────────────────────────────────
export const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { service, loading } = useService(slug);
  const container = useRef<HTMLDivElement>(null);

  // --- Dynamic Plan State ---
  const availablePlans = service ? (SERVICE_PLANS[service.id] ?? DEFAULT_PLANS) : [];
  const [selectedTier, setSelectedTier] = useState<ServicePlan | null>(null);

  // Set initial selected plan once service is loaded
  useEffect(() => {
    if (service && !selectedTier) {
      const recommended = availablePlans.find((p) => p.recommended) || availablePlans[0];
      setSelectedTier(recommended);
    }
  }, [service, availablePlans, selectedTier]);

  // ✅ Call all hooks FIRST, before any early returns
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useGSAP(
    () => {
      if (!service) return; // Guard inside effect

      gsap.fromTo(
        ".detail-hero",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
      gsap.fromTo(
        ".detail-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.12, ease: "power2.out" },
      );
      gsap.fromTo(
        ".detail-sidebar",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, delay: 0.2, ease: "power2.out" },
      );
    },
    { scope: container },
  );

  // ✅ Now early returns are OK since all hooks already called
  if (loading) {
    return (
      <main className="relative bg-[#080808] text-white min-h-screen flex items-center justify-center font-['DM_Sans',system-ui,sans-serif]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
            }}
          />
          <div
            style={{
              width: 200,
              height: 14,
              borderRadius: 4,
              background: "rgba(255,255,255,0.06)",
            }}
          />
        </div>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="relative bg-[#080808] text-white min-h-screen flex items-center justify-center font-['DM_Sans',system-ui,sans-serif]">
        <div className="text-center">
          <h1
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "48px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {t("service_detail.not_found")}
          </h1>
          <button
            onClick={() => navigate("/services")}
            className="mt-6 cursor-pointer hover:bg-white/5 transition-colors"
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#ee4d2d",
              background: "none",
              border: "1px solid rgba(238,77,45,0.3)",
              padding: "12px 24px",
              borderRadius: 4,
            }}
          >
            ← {t("service_detail.back_to_services")}
          </button>
        </div>
      </main>
    );
  }

  // ✅ Now safe to use service
  const onBack = () => navigate("/services");

  const cfg = previewConfig[service.id] ?? {
    emoji: "🌐",
    bg: "#111",
    accent: "#10b981",
    label: "Website",
  };

  const warrantyLabel =
    service.warrantyDays >= 45
      ? i18n.language === "en"
        ? "1.5 months"
        : "1,5 bulan"
      : `${service.warrantyDays} ${i18n.language === "en" ? "days" : "hari"}`;

  return (
    <main
      ref={container}
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
      {/* Accent glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 300,
          borderRadius: "50%",
          background: `${cfg.accent}10`,
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        <div
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "clamp(24px, 5vw, 40px)",
          }}
        >
          <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-5">
            <button
              onClick={onBack}
              className="flex items-center gap-2 mb-6 cursor-pointer"
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                fontSize: 12,
                fontWeight: 600,
                padding: 0,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <ArrowLeft size={14} /> {t("service_detail.back_to_services")}
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>Services</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)" }}>›</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                {i18n.language === "en" ? service.categoryEn : service.category}
              </span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)" }}>›</span>
              <span style={{ fontSize: 10, color: cfg.accent, fontWeight: 600 }}>
                {i18n.language === "en" ? service.nameEn : service.name}
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-16">
            <div className="detail-content flex flex-col gap-6">
              <div
                className="detail-hero relative w-full overflow-hidden"
                style={{
                  aspectRatio: "16/9",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <ServiceHeroBanner service={service} />
              </div>

              <div>
                <h1
                  className="uppercase leading-[0.88] mb-4"
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                    fontSize: "clamp(32px,5vw,56px)",
                  }}
                >
                  <Highlighter action="underline" color={cfg.accent}>
                    {(i18n.language === "en" ? service.nameEn : service.name)
                      .split("")
                      .map((c, i) => (
                        <span key={i} className="inline-block" style={{ color: "#fff" }}>
                          {c === " " ? "\u00A0" : c}
                        </span>
                      ))}
                  </Highlighter>
                </h1>
                <p
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.8,
                    maxWidth: 640,
                  }}
                >
                  {i18n.language === "en" ? service.descriptionEn : service.description}
                </p>
              </div>

              {/* --- Plan Selector (Dynamic Tabs) --- */}
              <div className="mt-8">
                <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/5 w-fit">
                  {availablePlans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedTier(plan)}
                      className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer ${
                        selectedTier?.id === plan.id
                          ? "bg-white text-black shadow-lg"
                          : "text-white/40 hover:text-white/70 hover:bg-white/5"
                      }`}
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>
              </div>

              {selectedTier && (
                <motion.div
                  key={selectedTier.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-10"
                >
                  {/* Dynamic Stats */}
                  <div
                    className="flex flex-wrap items-center gap-x-10 gap-y-6 pt-8 mt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {[
                      {
                        icon: Globe,
                        label: "DOMAIN & HOSTING",
                        value:
                          selectedTier.features.find((f) => f.name.toLowerCase().includes("domain"))
                            ?.value || "Included",
                      },
                      {
                        icon: RefreshCw,
                        label: t("service_detail.revisions"),
                        value:
                          selectedTier.features.find((f) =>
                            f.name.toLowerCase().includes("revision"),
                          )?.value || "2x",
                      },
                      {
                        icon: ShieldCheck,
                        label: t("service_detail.warranty"),
                        value:
                          selectedTier.features.find((f) =>
                            f.name.toLowerCase().includes("warranty"),
                          )?.value || warrantyLabel,
                      },
                    ].map((stat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <div
                          className="flex items-center gap-2"
                          style={{ color: selectedTier.color }}
                        >
                          <stat.icon size={13} strokeWidth={2.5} />
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              letterSpacing: "0.1em",
                              fontFamily: "system-ui",
                            }}
                          >
                            {stat.label}
                          </span>
                        </div>
                        <div style={{ fontSize: 15, color: "#fff", fontWeight: 500 }}>
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Features */}
                  {!selectedTier.isEnterprise && (
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Bebas Neue', Impact, sans-serif",
                          fontSize: 24,
                          letterSpacing: "0.05em",
                          color: "#fff",
                          marginBottom: 20,
                        }}
                      >
                        {t("service_detail.what_you_get")}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                        {selectedTier.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-3 group">
                            <CheckCircle2
                              size={16}
                              style={{ color: selectedTier.color }}
                              className="mt-0.5 opacity-90 shrink-0"
                            />
                            <div className="flex flex-col">
                              <span
                                style={{
                                  fontSize: 14,
                                  color: "rgba(255,255,255,0.7)",
                                  lineHeight: 1.5,
                                }}
                              >
                                {f.name}
                              </span>
                              {f.value && (
                                <span
                                  style={{
                                    fontSize: 11,
                                    color: "rgba(255,255,255,0.3)",
                                    fontWeight: 700,
                                  }}
                                >
                                  {f.value}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Workflow */}
                  <div className="mt-2">
                    <h3
                      style={{
                        fontFamily: "'Bebas Neue', Impact, sans-serif",
                        fontSize: 24,
                        letterSpacing: "0.05em",
                        color: "#fff",
                        marginBottom: 24,
                      }}
                    >
                      {t("service_detail.workflow")}
                    </h3>
                    <div className="flex flex-col gap-6">
                      {[
                        {
                          step: "01",
                          title: t("service_detail.workflow_steps.step1_title"),
                          desc: t("service_detail.workflow_steps.step1_desc"),
                        },
                        {
                          step: "02",
                          title: t("service_detail.workflow_steps.step2_title"),
                          desc: t("service_detail.workflow_steps.step2_desc"),
                        },
                        {
                          step: "03",
                          title: t("service_detail.workflow_steps.step3_title"),
                          desc: t("service_detail.workflow_steps.step3_desc"),
                        },
                        {
                          step: "04",
                          title: t("service_detail.workflow_steps.step4_title"),
                          desc: t("service_detail.workflow_steps.step4_desc", {
                            revisions:
                              selectedTier.features.find((f) =>
                                f.name.toLowerCase().includes("revision"),
                              )?.value || "2x",
                          }),
                        },
                        {
                          step: "05",
                          title: t("service_detail.workflow_steps.step5_title"),
                          desc: t("service_detail.workflow_steps.step5_desc"),
                        },
                      ].map((item, i) => (
                        <div key={i} className="relative pl-7 group">
                          <div
                            className="absolute w-2 h-2 rounded-full -left-[4px] top-1.5 transition-all duration-300 group-hover:scale-150"
                            style={{
                              background: selectedTier.color,
                              boxShadow: `0 0 10px ${selectedTier.color}80`,
                            }}
                          />
                          <div
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: selectedTier.color,
                              letterSpacing: "0.15em",
                              marginBottom: 4,
                            }}
                          >
                            Tahap {item.step}
                          </div>
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: 700,
                              color: "#fff",
                              marginBottom: 4,
                            }}
                          >
                            {item.title}
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              color: "rgba(255,255,255,0.45)",
                              lineHeight: 1.6,
                            }}
                          >
                            {item.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="detail-sidebar">
              <div className="sticky top-24 flex flex-col gap-8" style={{ padding: "8px 0" }}>
                {selectedTier && (
                  <motion.div
                    key={selectedTier.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-[24px] border border-white/10 relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                      boxShadow: selectedTier.recommended
                        ? `0 20px 40px -20px ${selectedTier.color}40`
                        : "none",
                    }}
                  >
                    {/* Accent glow */}
                    <div
                      className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 blur-[60px]"
                      style={{ background: selectedTier.color }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-6">
                        <div
                          className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            background: `${selectedTier.color}20`,
                            color: selectedTier.color,
                          }}
                        >
                          {selectedTier.name}
                        </div>
                        {selectedTier.recommended && (
                          <span className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-1">
                            <Star size={10} fill="currentColor" /> Most Popular
                          </span>
                        )}
                      </div>

                      {!selectedTier.isEnterprise ? (
                        <div className="mb-8">
                          <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                            Investment
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span
                              style={{
                                fontSize: 40,
                                fontWeight: 900,
                                color: "#fff",
                                fontFamily: "'DM Sans', sans-serif",
                                letterSpacing: "-0.04em",
                              }}
                            >
                              {selectedTier.priceLabel}
                            </span>
                          </div>
                          <div className="text-white/30 text-[10px] mt-2 flex items-center gap-1.5">
                            <BadgeCheck size={12} className="text-green-500" />
                            One-time payment. No hidden fees.
                          </div>
                        </div>
                      ) : (
                        <div className="mb-8">
                          <div className="text-2xl font-black text-white leading-tight">
                            Custom Quote
                          </div>
                          <p className="text-white/40 text-xs mt-2 leading-relaxed">
                            {t("service_detail.enterprise_note")}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col gap-3">
                        <a
                          href={`${getWhatsAppLink(service)}&text=${encodeURIComponent(`Halo, saya tertarik dengan layanan ${service.name} untuk paket ${selectedTier.name}. Bisa minta info lebih lanjut?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/20"
                          style={{
                            background: selectedTier.color,
                            color:
                              selectedTier.id === "basic" || selectedTier.id === "enterprise"
                                ? "#000"
                                : "#fff",
                          }}
                        >
                          <MessageCircle size={18} />
                          {i18n.language === "en" ? "Order via WhatsApp" : "Pesan via WhatsApp"}
                        </a>
                        <p className="text-[10px] text-white/20 text-center leading-relaxed px-4">
                          {t("service_detail.delivery_estimation", { days: service.deliveryDays })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <ShieldCheck size={16} className="text-green-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Safe Payment</div>
                      <div className="text-[10px] text-white/30">Direct to Developer</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Zap size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Fast Delivery</div>
                      <div className="text-[10px] text-white/30">5-15 Days Estimation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
