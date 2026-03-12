import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Tech', href: '#tech' },
    { name: 'Work', href: '#projects' },
    { name: 'Career', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
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
    </nav>

    {/* Mobile Menu Overlay — rendered via Portal to escape stacking context */}
    {ReactDOM.createPortal(
      <div className={cn(
        "fixed inset-0 bg-brand-bg text-white flex flex-col items-center justify-center transition-all duration-500 md:hidden overflow-hidden",
        isMobileMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible pointer-events-none"
      )}
      style={{ zIndex: 9998 }}
      >
        {/* Active state CSS for mobile tap feedback */}
        <style>{`
          .mobile-nav-link {
            -webkit-tap-highlight-color: transparent;
          }
          .mobile-nav-link:active {
            background: rgba(255,255,255,0.05);
            transform: scale(0.98);
          }
          .mobile-nav-link:active .mobile-nav-num {
            color: #fff;
          }
          .mobile-nav-link:active .mobile-nav-name {
            transform: translateX(12px);
          }
          .mobile-nav-link:active .mobile-nav-arrow {
            opacity: 1;
            transform: translateX(4px);
          }
          .mobile-nav-cta:active {
            background: #d4d4d8;
            transform: scale(0.97);
          }
        `}</style>

        {/* Background Decorative Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/2 uppercase tracking-tighter leading-none rotate-90 md:rotate-0">
            Navigation
          </span>
        </div>

        {/* Close Button */}
        <button 
          className="absolute top-8 right-6 text-white p-2 z-50 active:rotate-90 transition-transform duration-500"
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
                  "mobile-nav-link relative w-full py-6 flex items-center justify-between border-b border-white/5 transition-all duration-300",
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="mobile-nav-num text-xs font-mono text-white/30 transition-colors duration-300">0{i + 1}</span>
                <span className="mobile-nav-name text-4xl font-black uppercase tracking-tighter transition-transform duration-300">
                  {link.name}
                </span>
                <span className="mobile-nav-arrow text-white/30 text-lg transition-all duration-300">→</span>
              </a>
            </React.Fragment>
          ))}
          
          <a 
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "mobile-nav-cta mt-12 w-full py-6 bg-white text-black text-center text-xs font-black uppercase tracking-[0.4em] transition-all duration-300",
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
      </div>,
      document.body
    )}
    </>
  );
};
