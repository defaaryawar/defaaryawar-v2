"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certificatesData } from "@/data/certificates";
import { Highlighter } from "./ui/Highlighter";
import { ArrowUpRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export const Certificates = () => {
  const [active, setActive] = useState<(typeof certificatesData)[number] | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const isId = i18n.language === 'id';

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = active ? "hidden" : "";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

  useGSAP(
    () => {
      gsap.fromTo(
        ".cert-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".cert-row",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".cert-list", start: "top 85%" },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="certificates"
      className="relative py-20 md:py-36 overflow-hidden"
      style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
        {active && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200]"
              style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)" }}
            />

            {/* Modal panel — fixed, full viewport height, centered */}
            <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full flex flex-col overflow-hidden pointer-events-auto"
                style={{
                  maxWidth: 760,
                  maxHeight: "100%" /* changed from 90vh to 100% of parent container */,
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.08)",
                  margin: "auto",
                }}
              >
                {/* Close button */}
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 z-10 flex items-center justify-center"
                  style={{
                    width: 32,
                    height: 32,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  }}
                >
                  <X size={14} />
                </button>

                {/* Logo area */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    height: 180,
                    background: "#111",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <img
                    src={active.logo}
                    alt={active.title}
                    style={{
                      maxHeight: 100,
                      maxWidth: "70%",
                      objectFit: "contain",
                      filter: "brightness(0.9)",
                    }}
                  />
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1 p-6 md:p-10">
                  {/* Meta row */}
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                      <p
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.35em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.3)",
                          marginBottom: 8,
                        }}
                      >
                        {isId && active.issuerId ? active.issuerId : active.issuer} — {active.date}
                      </p>
                      <h3
                        style={{
                          fontFamily: "'Bebas Neue', Impact, sans-serif",
                          fontSize: "clamp(28px, 4vw, 44px)",
                          letterSpacing: "0.01em",
                          color: "#fff",
                          lineHeight: 1.05,
                        }}
                      >
                        {isId && active.titleId ? active.titleId : active.title}
                      </h3>
                    </div>

                    {active.credentialUrl && (
                      <a
                        href={active.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1.5"
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.5)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          padding: "8px 16px",
                          textDecoration: "none",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.4)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.15)";
                        }}
                      >
                        {t("certificates.verify")} <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>

                  {/* Credential ID */}
                  {active.credentialId && (
                    <div
                      className="mb-6"
                      style={{
                        padding: "10px 14px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "9px",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.3)",
                          fontWeight: 700,
                        }}
                      >
                        {t("certificates.credential_id")}
                      </span>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.6)",
                          marginTop: 4,
                          fontFamily: "monospace",
                          wordBreak: "break-all",
                        }}
                      >
                        {active.credentialId}
                      </p>
                    </div>
                  )}

                  {/* Description */}
                  {active.description && (
                    <p
                      style={{
                        fontSize: "14px",
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.85,
                        marginBottom: 28,
                      }}
                    >
                      {isId && active.descriptionId ? active.descriptionId : active.description}
                    </p>
                  )}

                  {/* Skills */}
                  {active.skills?.length > 0 && (
                    <div>
                      <p
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.35em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.3)",
                          marginBottom: 12,
                        }}
                      >
                        {t("certificates.skills_acquired")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {active.skills.map((skill, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: "8px",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "rgba(255,255,255,0.55)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              padding: "4px 10px",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
        </AnimatePresence>,
        document.body
      )}

      {/* Watermark number */}
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
        {/* ── Header ── */}
        <div ref={titleRef} className="cert-header mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10" style={{ background: "rgba(255,255,255,0.2)" }} />
            <span
              className="uppercase text-[10px] font-bold tracking-[0.55em]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {t("certificates.achievements_label")}
            </span>
          </div>
          <h2
            className="uppercase leading-[0.88]"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "clamp(48px, 8vw, 110px)",
            }}
          >
            {t("certificates.title_part1")}
            <Highlighter action="underline" color="#10b981">
              {t("certificates.title_part2")}
            </Highlighter>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>.</span>
          </h2>
          <p
            className="mt-5 max-w-sm"
            style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}
          >
            {t("certificates.description")}
          </p>
        </div>

        {/* ── List ── */}
        <div
          className="cert-list flex flex-col"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {certificatesData.map((cert, i) => (
            <motion.div
              layoutId={`card-${cert.title}-${id}`}
              key={`card-${cert.title}-${id}`}
              onClick={() => setActive(cert)}
              className="cert-row group flex items-center justify-between gap-4 md:gap-8 cursor-pointer"
              style={{
                padding: "20px 16px",
                borderBottom:
                  i < certificatesData.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Index */}
              <span
                className="hidden md:block shrink-0"
                style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.2)",
                  width: 28,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Logo */}
              <div
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: 44,
                  height: 44,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <img
                  src={cert.logo}
                  alt={cert.issuer}
                  style={{
                    width: 28,
                    height: 28,
                    objectFit: "contain",
                    filter: "brightness(0.85)",
                  }}
                />
              </div>

              {/* Title + issuer */}
              <div className="flex-1 min-w-0">
                <p
                  className="truncate"
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                    fontSize: "clamp(18px, 2.2vw, 30px)",
                    letterSpacing: "0.01em",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1,
                    transition: "color 0.2s",
                  }}
                >
                  {isId && cert.titleId ? cert.titleId : cert.title}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.3)",
                    marginTop: 4,
                    letterSpacing: "0.05em",
                  }}
                >
                  {isId && cert.issuerId ? cert.issuerId : cert.issuer}
                </p>
              </div>

              {/* Date */}
              <span
                className="hidden sm:block shrink-0"
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                {cert.date}
              </span>

              {/* Arrow */}
              <div
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.3)",
                  transition: "all 0.2s",
                }}
              >
                <ArrowUpRight size={13} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
