import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SOCIAL_LINKS } from "@/config/socials";

const PHOTO_SRC = "/images/photo-profil/defaaryawar.png";

type Proof = { value: string; label: string };
type Skill = {
  term: string;
  title: string;
  desc: string;
  project: string;
  slug: string;
  note: string;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const whatsapp = SOCIAL_LINKS.find((l) => l.label === "WhatsApp")?.href ?? "#contact";

export const Hero = () => {
  const { t } = useTranslation();
  const proof = t("hero.proof", { returnObjects: true }) as Proof[];
  const skills = t("hero.skills", { returnObjects: true }) as Skill[];
  const featuredPoints = t("hero.featured_points", { returnObjects: true }) as {
    term: string;
    desc: string;
  }[];

  return (
    <section className="relative bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-5 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24 lg:px-16">
        {/* ── Intro ─────────────────────────────────────────────── */}
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/55"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {t("hero.status")}
              </span>
              <span className="text-white/25">/</span>
              <span>{t("hero.location")}</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="max-w-4xl text-[clamp(34px,5.4vw,68px)] font-semibold leading-[1.08] tracking-[-0.03em]"
            >
              {t("hero.headline_a")}{" "}
              <span className="text-white/45">{t("hero.headline_b")}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg"
            >
              {t("hero.intro")}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/85"
              >
                {t("hero.cta_work")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/35 hover:text-white"
              >
                {t("hero.cta_chat")}
                <ArrowUpRight size={16} />
              </a>
            </motion.div>

            <motion.dl
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6"
            >
              {proof.map((p) => (
                <div key={p.label}>
                  <dt className="sr-only">{p.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight md:text-3xl">{p.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-white/45 md:text-sm">{p.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Photo */}
          <motion.figure
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="order-first mx-auto w-40 sm:w-52 lg:order-none lg:w-full"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <img
                src={PHOTO_SRC}
                alt="Defano Arya Wardhana"
                width={1024}
                height={1536}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover object-[30%_20%]"
              />
            </div>
            <figcaption className="mt-3 hidden text-sm text-white/45 lg:block">
              Defano Arya Wardhana
              <span className="block text-white/30">Software Engineer</span>
            </figcaption>
          </motion.figure>
        </div>

        {/* ── Currently building ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] md:mt-28"
        >
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            <Link
              to="/personal-arts/jajanim"
              className="group block border-b border-white/10 bg-black lg:border-b-0 lg:border-r"
              aria-label={t("hero.featured_cta")}
            >
              <img
                src="/projects/jajanim-architecture.webp"
                alt="Jajanim architecture: load balancer and Nginx gateway in front of 7 Go services, each with its own PostgreSQL database and replica, connected by gRPC and Kafka"
                loading="lazy"
                width={1586}
                height={992}
                className="h-full w-full object-contain transition-opacity group-hover:opacity-90"
              />
            </Link>

            <div className="p-6 md:p-8">
              <p className="inline-flex items-center gap-2 text-sm text-amber-300/90">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                {t("hero.featured_label")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                {t("hero.featured_title")}
              </h2>
              <p className="mt-3 leading-relaxed text-white/60">{t("hero.featured_desc")}</p>
              <p className="mt-3 font-mono text-xs text-white/40">{t("hero.featured_stack")}</p>

              <dl className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {featuredPoints.map((p) => (
                  <div key={p.term}>
                    <dt className="font-mono text-xs uppercase tracking-wider text-emerald-400/90">
                      {p.term}
                    </dt>
                    <dd className="mt-1 text-sm leading-snug text-white/55">{p.desc}</dd>
                  </div>
                ))}
              </dl>

              <Link
                to="/personal-arts/jajanim"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white"
              >
                {t("hero.featured_cta")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── What I work on ────────────────────────────────────── */}
        <div className="mt-20 md:mt-28">
          <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {t("hero.skills_title")}
            </h2>
            <p className="text-sm text-white/40">{t("hero.skills_hint")}</p>
          </div>

          <ol className="border-t border-white/10">
            {skills.map((s, i) => (
              <motion.li
                key={s.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-3 border-b border-white/10 py-7 md:grid-cols-[48px_minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-8 md:py-9"
              >
                <span className="font-mono text-sm text-white/30">0{i + 1}</span>

                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-emerald-400/90">
                    {s.term}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug md:text-xl">{s.title}</h3>
                </div>

                <div>
                  <p className="leading-relaxed text-white/60">{s.desc}</p>
                  <Link
                    to={`/personal-arts/${s.slug}`}
                    className="group mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
                  >
                    <span className="text-white/40">{t("hero.example")}:</span>
                    <span className="font-medium text-white underline decoration-white/25 underline-offset-4 transition-colors group-hover:decoration-white">
                      {s.project}
                    </span>
                    <span className="text-white/40">· {s.note}</span>
                    <ArrowRight
                      size={14}
                      className="text-white/50 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
