import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Tech', href: '#tech' },
    { name: 'Work', href: '#projects' },
    { name: 'Career', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b",
        isScrolled 
          ? "bg-brand-bg/80 backdrop-blur-xl border-white/5 py-4" 
          : "bg-transparent border-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-black tracking-tighter uppercase group">
          Defa<span className="text-white/20 group-hover:text-white transition-colors duration-500">aryawar.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-brand-bg z-100 flex flex-col items-center justify-center transition-all duration-700 md:hidden overflow-hidden",
        isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        {/* Background Decorative Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/2 uppercase tracking-tighter leading-none rotate-90 md:rotate-0">
            Navigation
          </span>
        </div>

        {/* Close Button */}
        <button 
          className="absolute top-8 right-6 text-white p-2 z-50 hover:rotate-90 transition-transform duration-500"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={32} />
        </button>

        <div className="relative z-10 flex flex-col items-center w-full px-12">
          {navLinks.map((link, i) => (
            <React.Fragment key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "group relative w-full py-6 flex items-center justify-between border-b border-white/5 transition-all duration-500",
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-xs font-mono text-white/20 group-hover:text-white transition-colors">0{i + 1}</span>
                <span className="text-4xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                  {link.name}
                </span>
                <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </React.Fragment>
          ))}
          
          <a 
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "mt-12 w-full py-6 bg-white text-black text-center text-xs font-black uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all duration-700",
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            )}
            style={{ transitionDelay: `${navLinks.length * 100}ms` }}
          >
            Start a Project
          </a>
        </div>

        {/* Bottom Info */}
        <div className={cn(
          "absolute bottom-12 left-12 right-12 flex justify-between items-end transition-all duration-1000 delay-500",
          isMobileMenuOpen ? "opacity-40 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="text-[10px] font-bold uppercase tracking-widest">
            Based in Jakarta, ID
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest">
            © 2024
          </div>
        </div>
      </div>
    </nav>
  );
};
