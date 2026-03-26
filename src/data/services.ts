export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  priceLabel: string;
  description: string;
  features: string[];
  highlights: string[]; // short badge-style highlights shown on detail page
  revisions: number;
  warrantyDays: number; // e.g. 15, 30, 45
  includeDomain: boolean;
  deliveryDays: number;
  image: string;
  images?: string[];
  popular?: boolean;
}

export const CATEGORIES = [
  "Semua",
  "Landing Page",
  "Portfolio",
  "Company Profile",
  "Restoran & Cafe",
  "Travel & Tour",
  "Klinik Kecantikan",
  "E-Commerce",
  "Rumah Sakit",
] as const;

export const services: Service[] = [
  {
    id: "landing-page",
    name: "Website Landing Page",
    category: "Landing Page",
    price: 800000,
    priceLabel: "Rp 800.000",
    description:
      "Halaman promosi satu halaman yang powerful untuk campaign, produk, atau event Anda. Didesain untuk konversi tinggi dengan animasi modern dan form lead capture.",
    features: [
      "Single page responsive design",
      "Animasi smooth & modern",
      "Form kontak / lead capture",
      "Optimasi SEO dasar",
      "Hosting setup gratis",
      "Gratis domain .com (1 tahun)",
      "2x revisi desain",
      "Garansi bug fix 15 hari",
    ],
    highlights: ["Domain .com gratis", "2x Revisi", "Garansi 15 hari", "Delivery 5 hari"],
    revisions: 2,
    warrantyDays: 15,
    includeDomain: true,
    deliveryDays: 5,
    image: "/our-services/landing-page-1.webp",
  },
  {
    id: "portfolio",
    name: "Website Portfolio",
    category: "Portfolio",
    price: 1200000,
    priceLabel: "Rp 1.200.000",
    description:
      "Tunjukkan karya terbaik Anda dengan website portfolio yang elegan dan profesional. Cocok untuk freelancer, desainer, fotografer, dan kreator konten.",
    features: [
      "Desain custom premium",
      "Gallery / showcase karya",
      "Halaman About & Contact",
      "Animasi interaktif",
      "Mobile responsive",
      "Gratis domain .com (1 tahun)",
      "2x revisi desain",
      "Garansi bug fix 20 hari",
    ],
    highlights: ["Domain .com gratis", "2x Revisi", "Garansi 20 hari", "Delivery 7 hari"],
    revisions: 2,
    warrantyDays: 20,
    includeDomain: true,
    deliveryDays: 7,
    image: "/our-services/portofolio-1.webp",
    images: [
      "/our-services/portofolio-1.webp",
      "/our-services/portofolio-2.webp",
    ],
  },
  {
    id: "company-profile",
    name: "Website Company Profile",
    category: "Company Profile",
    price: 1500000,
    priceLabel: "Rp 1.500.000",
    description:
      "Bangun kesan profesional perusahaan Anda dengan website modern, informatif, dan mudah dikelola. Dilengkapi CMS agar konten bisa diedit sendiri tanpa coding.",
    features: [
      "Desain premium & profesional",
      "Halaman profil, visi-misi, tim",
      "Galeri produk / layanan",
      "Integrasi Google Maps",
      "SEO optimized",
      "CMS — edit konten mandiri",
      "Gratis domain .com (1 tahun)",
      "3x revisi desain",
      "Garansi bug fix 30 hari",
    ],
    highlights: ["Domain .com gratis", "3x Revisi", "Garansi 30 hari", "CMS mudah edit"],
    revisions: 3,
    warrantyDays: 30,
    includeDomain: true,
    deliveryDays: 10,
    image: "/our-services/logistik-compro.webp",
    popular: true,
  },
  {
    id: "restoran-cafe",
    name: "Website Restoran / Cafe",
    category: "Restoran & Cafe",
    price: 2000000,
    priceLabel: "Rp 2.000.000",
    description:
      "Menu digital, reservasi online, dan tampilan estetis untuk tempat makan Anda. Pelanggan bisa lihat menu dan langsung booking meja dari HP mereka.",
    features: [
      "Menu digital interaktif",
      "Sistem reservasi online",
      "Gallery foto makanan HD",
      "Integrasi Google Maps & WhatsApp",
      "Desain estetis & responsif",
      "CMS — update menu sendiri",
      "Gratis domain .com (1 tahun)",
      "3x revisi desain",
      "Garansi bug fix 30 hari",
    ],
    highlights: ["Domain .com gratis", "3x Revisi", "Garansi 30 hari", "CMS menu mandiri"],
    revisions: 3,
    warrantyDays: 30,
    includeDomain: true,
    deliveryDays: 12,
    image: "/our-services/restorant-1.webp",
    images: ["/our-services/restorant-1.webp", "/our-services/restorant-2.webp"],
  },
  {
    id: "travel-tour",
    name: "Website Travel & Tour",
    category: "Travel & Tour",
    price: 2500000,
    priceLabel: "Rp 2.500.000",
    description:
      "Tampilkan paket wisata Anda dengan website menarik lengkap dengan sistem booking dan katalog destinasi yang memukau.",
    features: [
      "Katalog paket wisata",
      "Sistem booking / inquiry",
      "Gallery destinasi HD",
      "Testimoni pelanggan",
      "Integrasi WhatsApp",
      "CMS — kelola paket wisata sendiri",
      "Gratis domain .com (1 tahun)",
      "4x revisi desain",
      "Garansi bug fix 35 hari",
    ],
    highlights: ["Domain .com gratis", "4x Revisi", "Garansi 35 hari", "CMS paket wisata"],
    revisions: 4,
    warrantyDays: 35,
    includeDomain: true,
    deliveryDays: 14,
    image: "/our-services/travel-1.webp",
    images: ["/our-services/travel-1.webp", "/our-services/travel-2.webp"],
    popular: true,
  },
  {
    id: "klinik-kecantikan",
    name: "Website Klinik Kecantikan",
    category: "Klinik Kecantikan",
    price: 3000000,
    priceLabel: "Rp 3.000.000",
    description:
      "Website elegan untuk klinik kecantikan. Tampilkan layanan treatment, jadwal dokter, dan sistem booking appointment yang seamless.",
    features: [
      "Desain elegan & luxury feel",
      "Katalog treatment / layanan",
      "Sistem booking appointment",
      "Before-after gallery",
      "Promo & blog section",
      "CMS — kelola konten sendiri",
      "Gratis domain .com (1 tahun)",
      "4x revisi desain",
      "Garansi bug fix 40 hari",
    ],
    highlights: ["Domain .com gratis", "4x Revisi", "Garansi 40 hari", "CMS + Blog"],
    revisions: 4,
    warrantyDays: 40,
    includeDomain: true,
    deliveryDays: 16,
    image: "/our-services/klinik-1.webp",
  },
  {
    id: "ecommerce",
    name: "Website Toko Online",
    category: "E-Commerce",
    price: 4000000,
    priceLabel: "Rp 4.000.000",
    description:
      "Toko online lengkap dengan keranjang belanja, checkout, manajemen produk, dan dashboard admin. Siap terima order dari hari pertama.",
    features: [
      "Katalog produk dinamis",
      "Keranjang & checkout system",
      "Manajemen pesanan",
      "Integrasi payment gateway",
      "Dashboard admin lengkap",
      "Mobile-first responsive",
      "CMS — kelola produk & stok sendiri",
      "Gratis domain .com (1 tahun)",
      "5x revisi desain",
      "Garansi bug fix 45 hari",
    ],
    highlights: ["Domain .com gratis", "5x Revisi", "Garansi 45 hari", "Payment gateway"],
    revisions: 5,
    warrantyDays: 45,
    includeDomain: true,
    deliveryDays: 21,
    image: "/our-services/ecommerce-1.webp",
    images: [
      "/our-services/ecommerce-1.webp",
      "/our-services/ecommerce-2.webp",
      "/our-services/ecommerce-3.webp",
    ],
    popular: true,
  },
  {
    id: "rumah-sakit",
    name: "Website Rumah Sakit",
    category: "Rumah Sakit",
    price: 5000000,
    priceLabel: "Rp 5.000.000",
    description:
      "Solusi digital paling lengkap: profil dokter, jadwal praktek, booking appointment, portal pasien, dan blog kesehatan. Siap untuk institusi skala besar.",
    features: [
      "Profil dokter & jadwal praktek",
      "Sistem booking appointment",
      "Portal informasi pasien",
      "Daftar layanan & fasilitas",
      "Blog kesehatan / artikel",
      "Multi-language support (ID & EN)",
      "Dashboard admin & CMS lengkap",
      "Gratis domain .com (1 tahun)",
      "5x revisi desain",
      "Garansi bug fix 45 hari",
    ],
    highlights: [
      "Domain .com gratis",
      "5x Revisi",
      "Garansi 45 hari",
      "Multi-language",
    ],
    revisions: 5,
    warrantyDays: 45,
    includeDomain: true,
    deliveryDays: 30,
    image: "/our-services/rumah-sakit-1.webp",
    images: [
      "/our-services/rumah-sakit-1.webp",
      "/our-services/rumah-sakit-2.webp",
    ],
  },
];

export const WA_NUMBER = "6281219147116";

export function getWhatsAppLink(service: Service): string {
  const message = `Halo Defano! Saya tertarik dengan paket *${service.name}* (${service.priceLabel}). Bisa kita diskusi lebih lanjut?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}