import { Github, Linkedin, Instagram } from "lucide-react";
import React from "react";

// Reusable custom SVG icons
export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.15a8.16 8.16 0 005.58 2.2v-3.46a4.85 4.85 0 01-1.98-.42 4.83 4.83 0 01-1.8-1.36V6.69h3.78z" />
  </svg>
);

export const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className={className}>
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.773.767c-1.082-3.834-3.6-5.565-7.547-5.59-2.792.02-4.87.96-6.166 2.804-1.186 1.685-1.797 4.09-1.82 7.148.025 3.06.636 5.464 1.82 7.149 1.297 1.845 3.375 2.786 6.166 2.804 2.26-.016 3.94-.55 5.17-1.638.964-.867 1.587-2.057 1.788-3.594-1.18.575-2.495.876-3.904.876h-.216a5.028 5.028 0 01-3.552-1.47 5.028 5.028 0 01-1.47-3.567v-.01a5.035 5.035 0 015.022-5.038c1.353 0 2.587.54 3.502 1.415.23-.58.35-1.2.35-1.842 0-1.375-.523-2.655-1.476-3.602A5.063 5.063 0 0012.2 5.963h-.013a5.064 5.064 0 00-5.05 5.05v.014a5.064 5.064 0 005.05 5.05h.216c.692 0 1.358-.107 1.982-.303l.805 2.67a8.12 8.12 0 01-2.787.493h-.216z" />
  </svg>
);

export type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/6281219147116?text=Halo%20Defano!%20Saya%20tertarik%20untuk%20bekerja%20sama%20dengan%20Anda.%20Bisa%20kita%20diskusi%20lebih%20lanjut%3F",
    icon: <WhatsAppIcon className="h-full w-full" />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/defaaryawar",
    icon: <Instagram className="h-full w-full" />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@user.deff",
    icon: <TikTokIcon className="h-full w-full" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/defano-arya-wardhana-50ab11328/",
    icon: <Linkedin className="h-full w-full" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/defaaryawar",
    icon: <Github className="h-full w-full" />,
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@defaaryawar",
    icon: <ThreadsIcon className="h-full w-full" />,
  },
];
