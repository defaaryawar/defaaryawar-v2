import type { ReactNode } from "react";
import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxCardProps {
  children: ReactNode;
  index: number;
  delay?: number;
}

export const ParallaxCard = ({ children, index, delay = 0 }: ParallaxCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Parallax effect with scroll
    gsap.fromTo(
      card,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: delay * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Parallax on scroll (subtle offset)
    gsap.to(card, {
      y: -30 * (index + 1),
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [index, delay]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Border Gradient */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0), rgba(255,255,255,0.1))`,
          padding: "1px",
        }}
      />

      {/* Card */}
      <div
        className="relative bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-lg p-10 md:p-16 overflow-hidden
                     group-hover:border-white/20 group-hover:bg-white/8 transition-all duration-500 cursor-default"
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" 
             style={{ background: "radial-gradient(circle at 20% 50%, rgba(16,185,129,0.1), transparent)" }} />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Corner glow effect */}
        {isHovered && (
          <>
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-green-500/10 blur-3xl pointer-events-none" />
          </>
        )}
      </div>
    </motion.div>
  );
};
