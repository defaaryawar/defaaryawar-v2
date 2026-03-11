import React, { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LensProps {
  children: React.ReactNode;
  className?: string;
  zoom?: number;
}

export const Lens: React.FC<LensProps> = ({ children, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const lensX = useSpring(mouseX, springConfig);
  const lensY = useSpring(mouseY, springConfig);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden group cursor-none", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      
      <motion.div
        className="absolute pointer-events-none z-50 rounded-full border border-white/20 shadow-[0_0_50px_rgba(0,255,148,0.2)]"
        style={{
          width: 200,
          height: 200,
          left: lensX,
          top: lensY,
          x: "-50%",
          y: "-50%",
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
          backdropFilter: `contrast(1.1) brightness(1.1)`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-brand-primary/10 to-brand-secondary/10" />
      </motion.div>

      {/* Custom Cursor Dot */}
      <motion.div
        className="absolute pointer-events-none z-60 w-2 h-2 bg-brand-primary rounded-full"
        style={{
          left: lensX,
          top: lensY,
          x: "-50%",
          y: "-50%",
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </div>
  );
};
