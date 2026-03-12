"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import { useEffect, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockComponent items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockComponent = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInitially, setShowInitially] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Auto-collapse after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitially(false);
    }, 3000); // Show icons for 3 seconds, then collapse

    return () => clearTimeout(timer);
  }, []);

  const displayItems = showInitially || isExpanded;

  return (
    <div
      className={cn(
        "fixed bottom-8 right-8 hidden md:flex flex-col items-end gap-4 z-50",
        className
      )}
    >
      <AnimatePresence>
        {displayItems && (
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: showInitially ? idx * 0.08 : 0,
                }}
                className="relative"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 duration-200 backdrop-blur-sm"
                  title={item.title}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="h-6 w-6">{item.icon}</div>
                </a>
                {/* Tooltip */}
                {hoveredIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full right-0 mb-3 px-3 py-2 rounded-md bg-white/20 backdrop-blur-md text-gray-200 text-xs font-semibold whitespace-nowrap shadow-lg"
                  >
                    {item.title}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-bold text-lg backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isExpanded || showInitially ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.div>
      </motion.button>
    </div>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInitially, setShowInitially] = useState(true);

  // Auto-collapse after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitially(false);
    }, 3000); // Show icons for 3 seconds, then collapse

    return () => clearTimeout(timer);
  }, []);

  const displayItems = showInitially || isExpanded;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 flex md:hidden flex-col items-end gap-3 z-50",
        className
      )}
    >
      <AnimatePresence>
        {displayItems && (
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 15 }}
                transition={{
                  duration: 0.3,
                  delay: showInitially ? idx * 0.06 : 0,
                }}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
                  title={item.title}
                >
                  <div className="h-5 w-5">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-bold backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isExpanded || showInitially ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.div>
      </motion.button>
    </div>
  );
};
