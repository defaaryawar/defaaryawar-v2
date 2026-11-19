import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";

type GroupId = "backend" | "frontend" | "data" | "infra" | "quality";

interface Tech {
  name: string;
  /** Lower-case names as they appear in project technology lists. */
  match: string[];
}

const GROUPS: { id: GroupId; techs: Tech[] }[] = [
  {
    id: "backend",
    techs: [
      { name: "Golang", match: ["golang"] },
      { name: "NestJS", match: ["nestjs"] },
      { name: "gRPC", match: ["grpc"] },
      { name: "Hono", match: ["hono"] },
      { name: "REST API", match: ["rest api"] },
    ],
  },
  {
    id: "frontend",
    techs: [
      { name: "Next.js", match: ["next.js"] },
      { name: "React", match: ["react", "react (vite)"] },
      { name: "TypeScript", match: ["typescript"] },
      { name: "Tailwind CSS", match: ["tailwind css"] },
      { name: "Vite", match: ["vite", "react (vite)"] },
    ],
  },
  {
    id: "data",
    techs: [
      { name: "PostgreSQL", match: ["postgresql", "supabase"] },
      { name: "Kafka", match: ["kafka"] },
      { name: "RabbitMQ", match: ["rabbitmq"] },
      { name: "Redis", match: ["redis"] },
      { name: "Sanity CMS", match: ["sanity cms"] },
      { name: "SSE · WebSocket", match: ["sse", "websocket"] },
    ],
  },
  {
    id: "infra",
    techs: [
      { name: "Docker", match: ["docker"] },
      { name: "Nginx", match: ["nginx (api gateway)", "nginx"] },
      { name: "GitHub Actions", match: ["github actions"] },
      { name: "VPS", match: ["vps"] },
      { name: "Cloudflare", match: ["cloudflare workers", "cloudflare d1", "cloudflare r2"] },
    ],
  },
  {
    id: "quality",
    techs: [
      { name: "Jaeger", match: ["jaeger"] },
      { name: "Grafana", match: ["grafana"] },
      { name: "Jest", match: ["jest"] },
      { name: "Mailpit", match: ["mailpit"] },
    ],
  },
];

/** Projects (title + slug) whose tech list contains any of the given names. */
const usedIn = (match: string[]) =>
  projects
    .filter((p) => p.technologies.some((t) => match.includes(t.toLowerCase())))
    .map((p) => ({ slug: p.slug, name: p.title.split(" - ")[0] }));

const MAX_EXAMPLES = 3;

export const TechStack = () => {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className="relative border-t border-white/5 bg-[#0a0a0a] py-20 text-white md:py-28"
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm text-white/45">{t("tech_stack.label")}</p>
            <h2 className="max-w-2xl text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.12] tracking-[-0.02em]">
              {t("tech_stack.title")}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50">{t("tech_stack.hint")}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (gi % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <h3 className="text-lg font-semibold">{t(`tech_stack.groups.${group.id}.title`)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                {t(`tech_stack.groups.${group.id}.desc`)}
              </p>

              <ul className="mt-5 divide-y divide-white/[0.06] border-t border-white/[0.06]">
                {group.techs.map((tech) => {
                  const used = usedIn(tech.match);
                  const shown = used.slice(0, MAX_EXAMPLES);
                  const more = used.length - shown.length;
                  return (
                    <li
                      key={tech.name}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                    >
                      <span className="font-mono text-sm text-white/90">{tech.name}</span>
                      {used.length > 0 && (
                        <span className="text-right text-xs leading-relaxed text-white/40">
                          {shown.map((p, i) => (
                            <span key={p.slug}>
                              {i > 0 && ", "}
                              <Link
                                to={`/projects/${p.slug}`}
                                className="underline decoration-white/15 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60"
                              >
                                {p.name}
                              </Link>
                            </span>
                          ))}
                          {more > 0 && ` +${more}`}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
