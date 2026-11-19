import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type Step = { when: string; title: string; desc: string };

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export const About = () => {
  const { t } = useTranslation();
  const paragraphs = t("about.paragraphs", { returnObjects: true }) as string[];
  const steps = t("about.steps", { returnObjects: true }) as Step[];

  return (
    <section
      id="about"
      className="relative border-t border-white/5 bg-[#0a0a0a] py-20 text-white md:py-28"
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Story */}
          <motion.div {...reveal}>
            <p className="mb-4 text-sm text-white/45">{t("about.label")}</p>
            <h2 className="max-w-xl text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.12] tracking-[-0.02em]">
              {t("about.title")}
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-white/60 md:text-[17px]">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </motion.div>

          {/* Journey */}
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
            <p className="mb-6 text-sm text-white/45">{t("about.steps_title")}</p>
            <ol className="relative border-l border-white/10">
              {steps.map((s, i) => {
                const isLast = i === steps.length - 1;
                return (
                  <li key={s.title} className={`relative pl-7 ${isLast ? "" : "pb-8"}`}>
                    <span
                      className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${
                        isLast ? "bg-emerald-400 ring-4 ring-emerald-400/15" : "bg-white/30"
                      }`}
                    />
                    <p className="font-mono text-xs text-white/40">{s.when}</p>
                    <h3 className="mt-1 text-base font-semibold md:text-lg">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">{s.desc}</p>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
