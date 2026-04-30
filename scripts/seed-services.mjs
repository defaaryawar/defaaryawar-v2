import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const projectId = process.env.VITE_SANITY_PROJECT_ID || "66p6lfv1";
const dataset = process.env.VITE_SANITY_DATASET || "production";
const apiVersion = process.env.VITE_SANITY_API_VERSION || "2026-04-07";
const authToken = process.env.SANITY_AUTH_TOKEN;

if (!authToken) {
  console.error("Error: SANITY_AUTH_TOKEN is not set in .env file");
  console.error(
    "Please add your Sanity auth token to .env file: SANITY_AUTH_TOKEN=<your_token>"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: authToken,
  useCdn: false, // Disable CDN when writing
});

// Services data from services.ts
const services = [
  {
    id: "landing-page",
    name: "Website Landing Page",
    nameEn: "Landing Page Website",
    category: "Landing Page",
    categoryEn: "Landing Page",
    price: 800000,
    priceLabel: "Rp 800.000",
    originalPrice: 1500000,
    originalPriceLabel: "Rp 1.500.000",
    packages: {
      basic: { price: 800000, priceLabel: "Rp 800.000" },
      business: { price: 1500000, priceLabel: "Rp 1.500.000" },
      premium: { price: 2500000, priceLabel: "Rp 2.500.000" },
    },
    description:
      "Halaman promosi satu halaman yang powerful untuk campaign, produk, atau event Anda. Didesain untuk konversi tinggi dengan animasi modern dan form lead capture.",
    descriptionEn:
      "A powerful single-page promotion for your campaign, product, or event. Designed for high conversion with modern animations and lead capture forms.",
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
    featuresEn: [
      "Single page responsive design",
      "Smooth & modern animation",
      "Contact form / lead capture",
      "Basic SEO optimization",
      "Free hosting setup",
      "Free .com domain (1 year)",
      "2x design revisions",
      "15-day bug fix guarantee",
    ],
    highlights: ["Domain .com gratis", "2x Revisi", "Garansi 15 hari", "Delivery 5 hari"],
    highlightsEn: ["Free .com domain", "2x Revisions", "15-day Warranty", "5-day Delivery"],
    revisions: 2,
    warrantyDays: 15,
    includeDomain: true,
    deliveryDays: 5,
    image: "/our-services/landing-page-1.webp",
  },
  {
    id: "portfolio",
    name: "Website Portfolio",
    nameEn: "Portfolio Website",
    category: "Portfolio",
    categoryEn: "Portfolio",
    price: 1200000,
    priceLabel: "Rp 1.200.000",
    originalPrice: 2000000,
    originalPriceLabel: "Rp 2.000.000",
    packages: {
      basic: { price: 1200000, priceLabel: "Rp 1.200.000" },
      business: { price: 2000000, priceLabel: "Rp 2.000.000" },
      premium: { price: 3500000, priceLabel: "Rp 3.500.000" },
    },
    description:
      "Tunjukkan karya terbaik Anda dengan website portfolio yang elegan dan profesional. Cocok untuk freelancer, desainer, fotografer, dan kreator konten.",
    descriptionEn:
      "Showcase your best work with an elegant and professional portfolio website. Perfect for freelancers, designers, photographers, and content creators.",
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
    featuresEn: [
      "Premium custom design",
      "Gallery / work showcase",
      "About & Contact page",
      "Interactive animations",
      "Mobile responsive",
      "Free .com domain (1 year)",
      "2x design revisions",
      "20-day bug fix guarantee",
    ],
    highlights: ["Domain .com gratis", "2x Revisi", "Garansi 20 hari", "Delivery 7 hari"],
    highlightsEn: ["Free .com domain", "2x Revisions", "20-day Warranty", "7-day Delivery"],
    revisions: 2,
    warrantyDays: 20,
    includeDomain: true,
    deliveryDays: 7,
    image: "/our-services/portofolio-1.webp",
    images: ["/our-services/portofolio-1.webp", "/our-services/portofolio-2.webp"],
  },
  {
    id: "company-profile",
    name: "Website Company Profile",
    nameEn: "Company Profile Website",
    category: "Company Profile",
    categoryEn: "Company Profile",
    price: 1500000,
    priceLabel: "Rp 1.500.000",
    originalPrice: 2500000,
    originalPriceLabel: "Rp 2.500.000",
    packages: {
      basic: { price: 1500000, priceLabel: "Rp 1.500.000" },
      business: { price: 2500000, priceLabel: "Rp 2.500.000" },
      premium: { price: 4000000, priceLabel: "Rp 4.000.000" },
    },
    description:
      "Bangun kesan profesional perusahaan Anda dengan website modern, informatif, dan mudah dikelola. Dilengkapi CMS agar konten bisa diedit sendiri tanpa coding.",
    descriptionEn:
      "Build a professional impression for your company with a modern, informative, and easy-to-manage website. Equipped with a CMS so you can edit content yourself without coding.",
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
    featuresEn: [
      "Premium & professional design",
      "Profile, vision-mission, team pages",
      "Product / service gallery",
      "Google Maps integration",
      "SEO optimized",
      "CMS — edit content yourself",
      "Free .com domain (1 year)",
      "3x design revisions",
      "30-day bug fix guarantee",
    ],
    highlights: ["Domain .com gratis", "3x Revisi", "Garansi 30 hari", "CMS mudah edit"],
    highlightsEn: ["Free .com domain", "3x Revisions", "30-day Warranty", "Easy CMS"],
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
    nameEn: "Restaurant / Cafe Website",
    category: "Restoran & Cafe",
    categoryEn: "Restaurant & Cafe",
    price: 2000000,
    priceLabel: "Rp 2.000.000",
    originalPrice: 3500000,
    originalPriceLabel: "Rp 3.500.000",
    packages: {
      basic: { price: 2000000, priceLabel: "Rp 2.000.000" },
      business: { price: 3500000, priceLabel: "Rp 3.500.000" },
      premium: { price: 5000000, priceLabel: "Rp 5.000.000" },
    },
    description:
      "Menu digital, reservasi online, dan tampilan estetis untuk tempat makan Anda. Pelanggan bisa lihat menu dan langsung booking meja dari HP mereka.",
    descriptionEn:
      "Digital menu, online reservation, and aesthetic look for your eatery. Customers can view the menu and book a table directly from their phones.",
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
    featuresEn: [
      "Interactive digital menu",
      "Online reservation system",
      "HD food photo gallery",
      "Google Maps & WhatsApp integration",
      "Aesthetic & responsive design",
      "CMS — update menu yourself",
      "Free .com domain (1 year)",
      "3x design revisions",
      "30-day bug fix guarantee",
    ],
    highlights: ["Domain .com gratis", "3x Revisi", "Garansi 30 hari", "CMS menu mandiri"],
    highlightsEn: ["Free .com domain", "3x Revisions", "30-day Warranty", "Self-managed menu"],
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
    nameEn: "Travel & Tour Website",
    category: "Travel & Tour",
    categoryEn: "Travel & Tour",
    price: 2500000,
    priceLabel: "Rp 2.500.000",
    originalPrice: 4000000,
    originalPriceLabel: "Rp 4.000.000",
    packages: {
      basic: { price: 2500000, priceLabel: "Rp 2.500.000" },
      business: { price: 4000000, priceLabel: "Rp 4.000.000" },
      premium: { price: 6500000, priceLabel: "Rp 6.500.000" },
    },
    description:
      "Tampilkan paket wisata Anda dengan website menarik lengkap dengan sistem booking dan katalog destinasi yang memukau.",
    descriptionEn:
      "Showcase your tour packages with an attractive website complete with a booking system and a stunning destination catalog.",
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
    featuresEn: [
      "Tour package catalog",
      "Booking / inquiry system",
      "HD destination gallery",
      "Customer testimonials",
      "WhatsApp integration",
      "CMS — manage packages yourself",
      "Free .com domain (1 year)",
      "4x design revisions",
      "35-day bug fix guarantee",
    ],
    highlights: ["Domain .com gratis", "4x Revisi", "Garansi 35 hari", "CMS paket wisata"],
    highlightsEn: ["Free .com domain", "4x Revisions", "35-day Warranty", "Package CMS"],
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
    nameEn: "Beauty Clinic Website",
    category: "Klinik Kecantikan",
    categoryEn: "Beauty Clinic",
    price: 3000000,
    priceLabel: "Rp 3.000.000",
    originalPrice: 5000000,
    originalPriceLabel: "Rp 5.000.000",
    packages: {
      basic: { price: 3000000, priceLabel: "Rp 3.000.000" },
      business: { price: 5000000, priceLabel: "Rp 5.000.000" },
      premium: { price: 7500000, priceLabel: "Rp 7.500.000" },
    },
    description:
      "Website elegan untuk klinik kecantikan. Tampilkan layanan treatment, jadwal dokter, dan sistem booking appointment yang seamless.",
    descriptionEn:
      "Elegant website for beauty clinics. Showcase treatment services, doctor schedules, and a seamless appointment booking system.",
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
    featuresEn: [
      "Elegant & luxury feel design",
      "Treatment / service catalog",
      "Appointment booking system",
      "Before-after gallery",
      "Promo & blog section",
      "CMS — manage content yourself",
      "Free .com domain (1 year)",
      "4x design revisions",
      "40-day bug fix guarantee",
    ],
    highlights: ["Domain .com gratis", "4x Revisi", "Garansi 40 hari", "CMS + Blog"],
    highlightsEn: ["Free .com domain", "4x Revisions", "40-day Warranty", "CMS + Blog"],
    revisions: 4,
    warrantyDays: 40,
    includeDomain: true,
    deliveryDays: 16,
    image: "/our-services/klinik-1.webp",
  },
  {
    id: "ecommerce",
    name: "Website Toko Online",
    nameEn: "E-Commerce Website",
    category: "E-Commerce",
    categoryEn: "E-Commerce",
    price: 4000000,
    priceLabel: "Rp 4.000.000",
    originalPrice: 6500000,
    originalPriceLabel: "Rp 6.500.000",
    packages: {
      basic: { price: 4000000, priceLabel: "Rp 4.000.000" },
      business: { price: 6500000, priceLabel: "Rp 6.500.000" },
      premium: { price: 9000000, priceLabel: "Rp 9.000.000" },
    },
    description:
      "Toko online lengkap dengan keranjang belanja, checkout, manajemen produk, dan dashboard admin. Siap terima order dari hari pertama.",
    descriptionEn:
      "Full e-commerce website with shopping cart, checkout, product management, and admin dashboard. Ready to receive orders from day one.",
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
    featuresEn: [
      "Dynamic product catalog",
      "Cart & checkout system",
      "Order management",
      "Payment gateway integration",
      "Complete admin dashboard",
      "Mobile-first responsive",
      "CMS — manage products & stock",
      "Free .com domain (1 year)",
      "5x design revisions",
      "45-day bug fix guarantee",
    ],
    highlights: ["Domain .com gratis", "5x Revisi", "Garansi 45 hari", "Payment gateway"],
    highlightsEn: ["Free .com domain", "5x Revisions", "45-day Warranty", "Payment gateway"],
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
    nameEn: "Hospital Website",
    category: "Rumah Sakit",
    categoryEn: "Hospital",
    price: 5000000,
    priceLabel: "Rp 5.000.000",
    originalPrice: 8000000,
    originalPriceLabel: "Rp 8.000.000",
    packages: {
      basic: { price: 5000000, priceLabel: "Rp 5.000.000" },
      business: { price: 8000000, priceLabel: "Rp 8.000.000" },
      premium: { price: 12000000, priceLabel: "Rp 12.000.000" },
    },
    description:
      "Solusi digital paling lengkap: profil dokter, jadwal praktek, booking appointment, portal pasien, dan blog kesehatan. Siap untuk institusi skala besar.",
    descriptionEn:
      "The most complete digital solution: doctor profiles, practice schedules, appointment booking, patient portal, and health blog. Ready for large-scale institutions.",
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
    featuresEn: [
      "Doctor profiles & schedules",
      "Appointment booking system",
      "Patient information portal",
      "List of services & facilities",
      "Health blog / articles",
      "Multi-language support (ID & EN)",
      "Complete admin dashboard & CMS",
      "Free .com domain (1 year)",
      "5x design revisions",
      "45-day bug fix guarantee",
    ],
    highlights: ["Domain .com gratis", "5x Revisi", "Garansi 45 hari", "Multi-language"],
    highlightsEn: ["Free .com domain", "5x Revisions", "45-day Warranty", "Multi-language"],
    revisions: 5,
    warrantyDays: 45,
    includeDomain: true,
    deliveryDays: 30,
    image: "/our-services/rumah-sakit-1.webp",
    images: ["/our-services/rumah-sakit-1.webp", "/our-services/rumah-sakit-2.webp"],
  },
];

async function seedServices() {
  try {
    console.log("🌱 Starting seed process...");
    console.log(`📊 Total services to seed: ${services.length}`);

    const results = [];
    for (const service of services) {
      try {
        // Create document with ID from service.id
        const doc = await client.createOrReplace({
          _type: "service",
          _id: `service-${service.id}`,
          ...service,
        });

        results.push({ success: true, id: service.id, docId: doc._id });
        console.log(`✅ Seeded: ${service.name}`);
      } catch (err) {
        results.push({
          success: false,
          id: service.id,
          error: err instanceof Error ? err.message : String(err),
        });
        console.error(`❌ Failed: ${service.id} - ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // Summary
    const successful = results.filter((r) => r.success).length;
    console.log("\n📈 Seed Summary:");
    console.log(`✅ Successful: ${successful}/${services.length}`);
    console.log(`❌ Failed: ${services.length - successful}/${services.length}`);

    if (successful === services.length) {
      console.log("\n🎉 All services seeded successfully!");
    } else {
      console.log("\n⚠️  Some services failed to seed. Check errors above.");
    }
  } catch (error) {
    console.error("💥 Fatal error during seeding:", error);
    process.exit(1);
  }
}

seedServices();
