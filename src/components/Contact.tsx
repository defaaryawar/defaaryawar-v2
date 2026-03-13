import { useState, useRef } from "react";
import { Mail, Send } from "lucide-react";
import { SOCIAL_LINKS } from "@/config/socials";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Contact = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Horizontal sliding reveal
      gsap.fromTo(
        ".contact-left",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".contact-right",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: container },
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:defadefa1313@gmail.com?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`,
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <section ref={container} id="contact" className="py-32 border-t bg-[#080808] border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="contact-left">
              <div className="flex items-center gap-3 text-white/50 mb-8">
                <div className="w-8 h-px bg-white/30" />
                <span className="uppercase tracking-[0.4em] text-[10px] font-bold">Inquiry</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-[1.1] tracking-tighter uppercase">
                Let's Start a <br />
                <span className="text-white/35">Conversation.</span>
              </h2>
              <p className="text-xl text-white/55 font-light mb-16 leading-relaxed tracking-tight max-w-md">
                Currently accepting new projects and technical consultations. Reach out to discuss
                your vision.
              </p>

              <div className="space-y-8">
                <a
                  href="mailto:defadefa1313@gmail.com"
                  className="flex items-center gap-6 p-8 border border-white/10 hover:border-white/30 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">
                      Direct Email
                    </p>
                    <p className="text-xl font-bold tracking-tight">defadefa1313@gmail.com</p>
                  </div>
                </a>

                <div className="flex flex-wrap items-center gap-4">
                  {SOCIAL_LINKS.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-500 [&>svg]:w-[18px] [&>svg]:h-[18px]"
                      title={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-right">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-8 py-5 bg-white/2 border border-white/10 focus:border-white focus:outline-none transition-all duration-500 placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-8 py-5 bg-white/2 border border-white/10 focus:border-white focus:outline-none transition-all duration-500 placeholder:text-white/10"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-8 py-5 bg-white/2 border border-white/10 focus:border-white focus:outline-none transition-all duration-500 placeholder:text-white/10"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell me about your project requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-8 py-5 bg-white/2 border border-white/10 focus:border-white focus:outline-none transition-all duration-500 placeholder:text-white/10 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-6 bg-white text-black font-bold uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all duration-500"
                >
                  Submit Inquiry
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
