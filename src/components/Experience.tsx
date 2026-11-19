import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { experience } from "@/data/experience";

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

/** "06-2025" → "Jun 2025"; anything else is returned as-is. */
const formatDate = (raw: string, lang: string) => {
  const m = /^(\d{2})-(\d{4})$/.exec(raw);
  if (!m) return raw;
  const months = lang === "id" ? MONTHS_ID : MONTHS_EN;
  return `${months[Number(m[1]) - 1]} ${m[2]}`;
};

export const Experience = () => {
  const { t, i18n } = useTranslation();
  const isId = i18n.language === "id";

  return (
    <section
      id="experience"
      className="relative border-t border-white/5 bg-[#0a0a0a] py-20 text-white md:py-28"
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-16">
        <div className="mb-12 md:mb-16">
          <p className="mb-4 text-sm text-white/45">{t("experience.label")}</p>
          <h2 className="max-w-2xl text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.12] tracking-[-0.02em]">
            {t("experience.title")}
          </h2>
        </div>

        <ol className="border-t border-white/10">
          {experience.map((exp, i) => {
            const current = exp.endDate === "Present";
            const end = current
              ? t("experience.current")
              : isId && exp.endDateId
                ? exp.endDateId
                : exp.endDate;
            const achievements = isId && exp.achievementsId ? exp.achievementsId : exp.achievements;

            return (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-4 border-b border-white/10 py-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:py-10"
              >
                <div className="flex flex-wrap items-center gap-2 md:block">
                  <p className="font-mono text-sm text-white/50">
                    {formatDate(exp.startDate, i18n.language)} – {end}
                  </p>
                  {current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300 md:mt-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {t("experience.now_badge")}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold leading-snug md:text-xl">
                    {isId && exp.titleId ? exp.titleId : exp.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">
                    {exp.company} · {exp.location}
                  </p>
                  <p className="mt-4 max-w-3xl leading-relaxed text-white/65">
                    {isId && exp.descriptionId ? exp.descriptionId : exp.description}
                  </p>
                  {achievements.length > 0 && (
                    <ul className="mt-4 max-w-3xl space-y-2">
                      {achievements.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/55">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/35" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
