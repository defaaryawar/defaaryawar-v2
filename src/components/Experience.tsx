import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const experiences = [
  {
    company: 'TechFlow Solutions',
    role: 'Senior Frontend Architect',
    period: '2023 - Present',
    description: 'Leading the technical direction of high-traffic SaaS applications. Implementing modern architecture and optimizing runtime performance.'
  },
  {
    company: 'Creative Digital Agency',
    role: 'Frontend Engineer',
    period: '2021 - 2023',
    description: 'Developed interactive websites and web applications for global brands. Focused on motion design and responsive architecture.'
  },
  {
    company: 'Startup Hub',
    role: 'Web Developer',
    period: '2020 - 2021',
    description: 'Assisted in building and maintaining client websites. Learned the fundamentals of modern web development and user experience.'
  }
];

export const Experience = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".exp-item", 
      { 
        x: (i) => i % 2 === 0 ? -100 : 100,
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="experience" className="py-32 bg-[#0B0B0B]">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 text-white/40 mb-8">
            <div className="w-8 h-px bg-white/20" />
            <span className="uppercase tracking-[0.4em] text-[10px] font-bold">Career Path</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-20 uppercase tracking-tighter">
            Work <span className="text-white/20">History.</span>
          </h2>

          <div className="space-y-px bg-white/5 border border-white/5">
            {experiences.map((exp, _i) => (
              <div
                key={exp.company}
                className="exp-item group bg-brand-bg p-10 md:p-16 flex flex-col md:flex-row md:items-start justify-between gap-12 hover:bg-white/2 transition-all duration-500"
              >
                <div className="md:w-1/3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-4 block">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight group-hover:text-white transition-colors">
                    {exp.company}
                  </h3>
                </div>
                
                <div className="md:w-2/3">
                  <h4 className="text-xl font-bold text-white/60 mb-6 uppercase tracking-tight">
                    {exp.role}
                  </h4>
                  <p className="text-white/40 font-light leading-relaxed tracking-tight text-lg max-w-xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
