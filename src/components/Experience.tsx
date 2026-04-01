import { experience } from "@/data/experience";
import { Timeline } from "@/components/timeline";
import { useTranslation } from "react-i18next";

export const Experience = () => {
  const { t, i18n } = useTranslation();
  
  const timelineData = experience.map((exp) => {
    const isId = i18n.language === 'id';
    return {
      title: exp.startDate.split("-")[1] ?? exp.startDate,
      content: (
        <div className="pb-10">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              {exp.endDate === "Present" && (
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full mb-2 inline-block">
                  {t("experience.current")}
                </span>
              )}
              <h3 className="text-xl font-bold text-white tracking-tight">{exp.company}</h3>
              <p className="text-sm text-neutral-400 mt-0.5">{isId && exp.titleId ? exp.titleId : exp.title}</p>
              <p className="text-xs text-neutral-600 mt-0.5">{exp.location}</p>
            </div>
            <span className="text-xs text-neutral-600 whitespace-nowrap mt-1">
              {exp.startDate} — {isId && exp.endDateId ? exp.endDateId : exp.endDate}
            </span>
          </div>

          <p className="text-sm text-neutral-500 leading-relaxed mb-4">
            {isId && exp.descriptionId ? exp.descriptionId : exp.description}
          </p>

          <ul className="space-y-1.5 mb-6">
            {(isId && exp.achievementsId ? exp.achievementsId : exp.achievements).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-500">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="w-full h-px bg-neutral-800" />
        </div>
      ),
    };
  });

  return (
    <section id="experience" className="relative w-full">
      <Timeline data={timelineData} />
    </section>
  );
};
