import { Github, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-20 bg-brand-bg border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <p className="text-xl font-black tracking-tighter uppercase mb-2">
              Defa <span className="text-white/20">Wardhana.</span>
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
              Frontend Architect & UI Specialist
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
