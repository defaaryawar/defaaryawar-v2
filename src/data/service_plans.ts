export interface PlanFeature {
  name: string;
  value?: string;
  inc: boolean;
}

export interface ServicePlan {
  id: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  priceLabel: string;
  recommended?: boolean;
  color: string;
  features: PlanFeature[];
  isEnterprise?: boolean;
}

export const SERVICE_PLANS: Record<string, ServicePlan[]> = {
  "landing-page": [
    {
      id: "basic",
      name: "Starter",
      nameEn: "Starter",
      desc: "Cocok untuk campaign promo singkat atau event satu halaman.",
      descEn: "Perfect for short promo campaigns or single-page events.",
      priceLabel: "Rp 800.000",
      color: "#ffffff",
      features: [
        { name: "Domain .com", value: "Gratis Setahun", inc: true },
        { name: "Hosting", value: "Fast & Secure", inc: true },
        { name: "Design", value: "Modern Template", inc: true },
        { name: "Responsive", inc: true },
        { name: "SEO", value: "Basic", inc: true },
        { name: "Revisions", value: "2x", inc: true },
        { name: "Bug Fix Warranty", value: "15 Days", inc: true },
      ],
    },
    {
      id: "business",
      name: "Professional",
      nameEn: "Professional",
      desc: "Halaman landing custom untuk konversi tinggi dan brand awareness.",
      descEn: "Custom landing page for high conversion and brand awareness.",
      priceLabel: "Rp 1.500.000",
      recommended: true,
      color: "#6366f1",
      features: [
        { name: "Domain .com / .id", value: "Gratis Setahun", inc: true },
        { name: "Hosting", value: "High Performance", inc: true },
        { name: "Design", value: "Custom Tailored UI", inc: true },
        { name: "Responsive", inc: true },
        { name: "SEO", value: "Advanced", inc: true },
        { name: "Revisions", value: "4x", inc: true },
        { name: "Bug Fix Warranty", value: "30 Days", inc: true },
      ],
    },
    {
      id: "premium",
      name: "Conversion Pro",
      nameEn: "Conversion Pro",
      desc: "Optimasi penuh dengan copywriting dan integrasi analytics lengkap.",
      descEn: "Full optimization with copywriting and complete analytics integration.",
      priceLabel: "Rp 2.500.000",
      color: "#facc15",
      features: [
        { name: "Domain .com / .id / .co.id", value: "Gratis Setahun", inc: true },
        { name: "Hosting", value: "Optimized Speed", inc: true },
        { name: "Design", value: "Premium Conversion Design", inc: true },
        { name: "Responsive", inc: true },
        { name: "SEO", value: "Premium", inc: true },
        { name: "Revisions", value: "Unlimited", inc: true },
        { name: "Bug Fix Warranty", value: "45 Days", inc: true },
      ],
    },
  ],
  "travel-tour": [
    {
      id: "basic",
      name: "Standard",
      nameEn: "Standard",
      desc: "Website katalog paket wisata dengan sistem inquiry WhatsApp.",
      descEn: "Tour catalog website with WhatsApp inquiry system.",
      priceLabel: "Rp 2.500.000",
      color: "#ffffff",
      features: [
        { name: "Catalog", value: "Up to 10 Packages", inc: true },
        { name: "Domain .com", value: "Gratis Setahun", inc: true },
        { name: "Hosting", value: "Fast & Secure", inc: true },
        { name: "Responsive", inc: true },
        { name: "Booking System", value: "via WhatsApp", inc: true },
        { name: "Revisions", value: "3x", inc: true },
        { name: "Bug Fix Warranty", value: "30 Days", inc: true },
      ],
    },
    {
      id: "business",
      name: "Agency",
      nameEn: "Agency",
      desc: "Website lengkap dengan CMS untuk kelola paket wisata sendiri.",
      descEn: "Complete website with CMS to manage your own tour packages.",
      priceLabel: "Rp 4.000.000",
      recommended: true,
      color: "#14b8a6",
      features: [
        { name: "Catalog", value: "Unlimited Packages", inc: true },
        { name: "Domain .com / .id", value: "Gratis Setahun", inc: true },
        { name: "CMS", value: "Easy to use", inc: true },
        { name: "Responsive", inc: true },
        { name: "Booking System", value: "Custom Inquiry Form", inc: true },
        { name: "Revisions", value: "5x", inc: true },
        { name: "Bug Fix Warranty", value: "45 Days", inc: true },
      ],
    },
    {
      id: "premium",
      name: "Exclusive",
      nameEn: "Exclusive",
      desc: "Full fitur dengan sistem booking, payment gateway, dan desain mewah.",
      descEn: "Full features with booking system, payment gateway, and luxury design.",
      priceLabel: "Rp 6.500.000",
      color: "#facc15",
      features: [
        { name: "Payment", value: "Payment Gateway Ready", inc: true },
        { name: "Domain", value: "Any extension", inc: true },
        { name: "CMS", value: "Advanced Dashboard", inc: true },
        { name: "Responsive", inc: true },
        { name: "Booking System", value: "Auto Confirmation", inc: true },
        { name: "Revisions", value: "Unlimited", inc: true },
        { name: "Bug Fix Warranty", value: "60 Days", inc: true },
      ],
    },
  ],
  "portfolio": [
    {
      id: "basic",
      name: "Personal",
      nameEn: "Personal",
      desc: "Website portofolio minimalis untuk profesional dan mahasiswa.",
      descEn: "Minimalist portfolio website for professionals and students.",
      priceLabel: "Rp 1.200.000",
      color: "#ffffff",
      features: [
        { name: "Gallery", value: "Up to 15 Works", inc: true },
        { name: "Domain .com", value: "Gratis Setahun", inc: true },
        { name: "Hosting", value: "Fast & Secure", inc: true },
        { name: "Responsive", inc: true },
        { name: "Revisions", value: "2x", inc: true },
        { name: "Bug Fix Warranty", value: "20 Days", inc: true },
      ],
    },
    {
      id: "business",
      name: "Agency",
      nameEn: "Agency",
      desc: "Tampilan premium dengan animasi halus dan galeri interaktif.",
      descEn: "Premium look with smooth animations and interactive galleries.",
      priceLabel: "Rp 2.000.000",
      recommended: true,
      color: "#a855f7",
      features: [
        { name: "Gallery", value: "Unlimited Works", inc: true },
        { name: "Domain .com / .id", value: "Gratis Setahun", inc: true },
        { name: "Animation", value: "Custom Smooth", inc: true },
        { name: "Responsive", inc: true },
        { name: "Revisions", value: "4x", inc: true },
        { name: "Bug Fix Warranty", value: "30 Days", inc: true },
      ],
    },
  ]
};

export const DEFAULT_PLANS: ServicePlan[] = [
  {
    id: "basic",
    name: "Basic",
    nameEn: "Basic",
    desc: "Paket standar dengan fitur esensial.",
    descEn: "Standard package with essential features.",
    priceLabel: "Rp 1.500.000",
    color: "#ffffff",
    features: [
      { name: "Domain .com", value: "Gratis Setahun", inc: true },
      { name: "Hosting", value: "Fast & Secure", inc: true },
      { name: "Responsive", inc: true },
      { name: "SEO", value: "Basic", inc: true },
      { name: "Revisions", value: "2x", inc: true },
      { name: "Bug Fix Warranty", value: "30 Days", inc: true },
    ],
  },
  {
    id: "business",
    name: "Business",
    nameEn: "Business",
    desc: "Paket profesional untuk bisnis yang sedang berkembang.",
    descEn: "Professional package for growing businesses.",
    priceLabel: "Rp 2.500.000",
    recommended: true,
    color: "#ee4d2d",
    features: [
      { name: "Domain .com / .id", value: "Gratis Setahun", inc: true },
      { name: "Hosting", value: "High Performance", inc: true },
      { name: "Responsive", inc: true },
      { name: "SEO", value: "Advanced", inc: true },
      { name: "Revisions", value: "4x", inc: true },
      { name: "Bug Fix Warranty", value: "45 Days", inc: true },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    nameEn: "Premium",
    desc: "Paket lengkap dengan optimasi maksimal dan fitur eksklusif.",
    descEn: "Full package with maximum optimization and exclusive features.",
    priceLabel: "Rp 4.500.000",
    color: "#facc15",
    features: [
      { name: "Domain", value: "All Extensions", inc: true },
      { name: "Hosting", value: "Dedicated Performance", inc: true },
      { name: "Responsive", inc: true },
      { name: "SEO", value: "Premium", inc: true },
      { name: "Revisions", value: "Unlimited", inc: true },
      { name: "Bug Fix Warranty", value: "60 Days", inc: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    nameEn: "Enterprise",
    desc: "Solusi khusus untuk kebutuhan institusi atau korporasi besar.",
    descEn: "Custom solution for large-scale corporate or institutional needs.",
    priceLabel: "Custom Quote",
    color: "#ffffff",
    isEnterprise: true,
    features: [],
  },
];
