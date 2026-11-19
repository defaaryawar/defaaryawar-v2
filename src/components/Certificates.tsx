import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, Maximize2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { certificatesData } from "@/data/certificates";
import { ImageLightbox } from "./ui/image-lightbox";

const FULL = (file: string) => `/certificates/${file}`;
const THUMB = (file: string) => `/certificates/thumbs/${file}`;

export const Certificates = () => {
  const { t, i18n } = useTranslation();
  const isId = i18n.language === "id";
  const [preview, setPreview] = useState<number | null>(null);

  // Certificates with an image first, newest first within each group.
  const certs = useMemo(
    () =>
      [...certificatesData].sort((a, b) => {
        const ia = "image" in a && a.image ? 1 : 0;
        const ib = "image" in b && b.image ? 1 : 0;
        return ib - ia || Number(b.date) - Number(a.date);
      }),
    [],
  );

  const gallery = useMemo(
    () =>
      certs.flatMap((c) => ("image" in c && c.image ? [{ id: c.id, src: FULL(c.image) }] : [])),
    [certs],
  );

  return (
    <section
      id="certificates"
      className="relative border-t border-white/5 bg-[#0a0a0a] py-20 text-white md:py-28"
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm text-white/45">{t("certificates.label")}</p>
            <h2 className="max-w-2xl text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.12] tracking-[-0.02em]">
              {t("certificates.title")}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50">{t("certificates.hint")}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certs.map((cert, i) => {
            const image = "image" in cert && cert.image ? cert.image : "";
            const galleryIndex = gallery.findIndex((g) => g.id === cert.id);
            const title = isId && cert.titleId ? cert.titleId : cert.title;
            const issuer = isId && cert.issuerId ? cert.issuerId : cert.issuer;

            return (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
              >
                {image ? (
                  <button
                    type="button"
                    onClick={() => setPreview(galleryIndex)}
                    aria-label={`${t("certificates.view")}: ${title}`}
                    className="group relative block aspect-[16/10] w-full overflow-hidden bg-white cursor-zoom-in"
                  >
                    <img
                      src={THUMB(image)}
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/90 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                      <Maximize2 size={14} />
                    </span>
                  </button>
                ) : (
                  <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 bg-white/[0.03] text-white/35">
                    <Award size={28} strokeWidth={1.5} />
                    <span className="text-xs">{issuer}</span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-semibold leading-snug">{title}</h3>
                  <p className="mt-1 text-sm text-white/50">
                    {issuer} · {cert.date}
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                      {t("certificates.credential")}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <ImageLightbox
        images={gallery.map((g) => g.src)}
        index={preview}
        onIndexChange={setPreview}
        alt={t("certificates.label")}
      />
    </section>
  );
};
