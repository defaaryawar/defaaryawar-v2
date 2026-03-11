import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const technologies = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/white' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/white' },
  { name: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/white' },
  { name: 'Chakra UI', icon: 'https://cdn.simpleicons.org/chakraui/white' },
  { name: 'React Query', icon: 'https://cdn.simpleicons.org/reactquery/white' },
  { name: 'Framer Motion', icon: 'https://cdn.simpleicons.org/framer/white' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/white' },
];

export const TechStack = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".tech-card", 
      { 
        x: (i) => i % 2 === 0 ? -50 : 50,
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
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
    <section ref={container} id="skills" className="py-32 bg-[#0B0B0B]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 text-white/40 mb-8">
            <div className="w-8 h-px bg-white/20" />
            <span className="uppercase tracking-[0.4em] text-[10px] font-bold">Capabilities</span>
            <div className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tighter">
            Technical <span className="text-white/20">Arsenal.</span>
          </h2>
          <p className="text-lg text-white/40 font-light tracking-tight">
            A curated selection of technologies I leverage to build high-end digital products.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="tech-card bg-brand-bg p-12 flex flex-col items-center justify-center gap-6 group hover:bg-white/2 transition-all duration-500"
            >
              <div className="w-12 h-12 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 group-hover:text-white transition-colors duration-500">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
