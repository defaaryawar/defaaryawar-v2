import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "../lib/utils";

const NAV_ITEMS = [
  { key: "about", to: "/about" },
  { key: "tech", to: "/tech-stack" },
  { key: "projects", to: "/projects" },
  { key: "experience", to: "/experience" },
  { key: "blog", to: "/blogs" },
  { key: "services", to: "/services" },
] as const;

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(location.pathname);

  // Close the mobile menu whenever the route changes.
  if (menuPath !== location.pathname) {
    setMenuPath(location.pathname);
    setMenuOpen(false);
  }

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    setHidden(y > 160 && y > prev);
  });

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const toggleLanguage = () => i18n.changeLanguage(i18n.language === "en" ? "id" : "en");
  const langLabel = i18n.language === "en" ? "EN" : "ID";
  const solid = scrolled || location.pathname !== "/";

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,transform] duration-300",
          solid ? "border-white/[0.06] bg-[#0a0a0a]/85 backdrop-blur-xl" : "border-transparent bg-transparent",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-5 md:h-20 md:px-10 lg:px-16">
          <Link to="/" className="text-lg font-semibold tracking-tight text-white" aria-label="Home">
            Defano<span className="text-white/35">.</span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive ? "bg-white/[0.08] text-white" : "text-white/55 hover:text-white",
                  )
                }
              >
                {t(`navbar.${item.key}`)}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Switch language"
              className="rounded-lg border border-white/15 px-2.5 py-1.5 font-mono text-xs text-white/60 transition-colors hover:border-white/35 hover:text-white cursor-pointer"
            >
              {langLabel}
            </button>
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/85"
            >
              {t("navbar.contact_cta")}
            </NavLink>
          </div>

          {/* Mobile toggles */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Switch language"
              className="rounded-lg border border-white/15 px-2.5 py-1.5 font-mono text-xs text-white/70 cursor-pointer"
            >
              {langLabel}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white cursor-pointer"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {createPortal(
        <div
          className={cn(
            "fixed inset-0 z-40 bg-[#0a0a0a] pt-16 transition-opacity duration-200 md:pt-20 lg:hidden",
            menuOpen ? "opacity-100" : "pointer-events-none invisible opacity-0",
          )}
        >
          <div className="container mx-auto flex h-full flex-col overflow-y-auto px-5 pb-10 md:px-10">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between border-b border-white/[0.07] py-4 text-xl font-semibold",
                  isActive ? "text-white" : "text-white/60",
                )
              }
            >
              {t("navbar.home")}
            </NavLink>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between border-b border-white/[0.07] py-4 text-xl font-semibold",
                    isActive ? "text-white" : "text-white/60",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {t(`navbar.${item.key}`)}
                    {isActive && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
                  </>
                )}
              </NavLink>
            ))}

            <Link
              to="/contact"
              className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-white py-3.5 text-base font-semibold text-black"
            >
              {t("navbar.contact_cta")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
