export type ProjectCategory = "travel" | "saas" | "ecommerce" | "company";

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
    { id: "travel", label: "Travel & Hospitality" },
    { id: "saas", label: "SaaS & Web App" },
    { id: "ecommerce", label: "E-Commerce" },
    { id: "company", label: "Company Profile" },
];

export const projects = [
    {
        slug: "jajanim",
        category: "ecommerce" as ProjectCategory,
        inDevelopment: true,
        title: "Jajanim - Microservices E-commerce Platform",
        titleId: "Jajanim - Platform E-commerce Microservices",
        description: "A marketplace built as 7 Go microservices (catalog, promotion, order, payment, delivery, user, review), each with its own PostgreSQL database and read replicas. Traffic enters through a load balancer and an Nginx API gateway; services talk over gRPC and publish events to Kafka; the Next.js storefront and React (Vite) dashboard get live updates through Server-Sent Events. Traced with Jaeger, monitored with Grafana, emails tested in Mailpit, and every service lives in its own repository. Currently in development.",
        descriptionId: "Marketplace yang dibangun sebagai 7 microservice Go (catalog, promotion, order, payment, delivery, user, review), masing-masing dengan database PostgreSQL sendiri plus replikasi. Trafik masuk lewat load balancer dan API gateway Nginx; antar layanan bicara lewat gRPC dan mengirim event lewat Kafka; storefront Next.js dan dashboard React (Vite) dapat update live lewat Server-Sent Events. Dilacak dengan Jaeger, dipantau dengan Grafana, email dites di Mailpit, dan tiap layanan punya repo sendiri. Sedang dikembangkan.",
        detailDescription: `Jajanim adalah platform e-commerce (marketplace) yang sedang saya kembangkan dengan arsitektur microservices penuh. Fokusnya bukan cuma tampilan toko, tapi bagaimana sistemnya tetap jalan saat ramai dan gampang dikembangkan per bagian.

**Arsitektur:**
- **7 microservice** ditulis dengan Golang, tiap layanan mengurus satu bagian bisnis: Catalog (produk & kategori), Promotion (diskon & voucher), Order, Payment, Delivery (pengiriman & tracking), User (profil & akun), dan Review (rating & ulasan)
- **Load balancer + API gateway (Nginx)**: satu pintu masuk untuk semua request, membagi beban ke layanan, dan mengurus routing, autentikasi, serta rate limiting
- **Database per service (PostgreSQL)**: tiap layanan punya database sendiri, jadi masalah di satu bagian tidak menjatuhkan semuanya
- **Database replication**: tiap database punya replika untuk keamanan data dan membagi beban baca
- **gRPC** untuk komunikasi langsung antar layanan yang cepat dan bertipe jelas
- **Kafka** sebagai event bus: layanan mengirim kabar (event) tanpa harus menunggu layanan lain, jadi tetap jalan walau ada yang sedang down
- **Polyrepo**: setiap layanan punya repository sendiri dan bisa dirilis terpisah

**Frontend:**
- **Next.js** untuk storefront pembeli: cepat dan ramah SEO
- **React + Vite** untuk dashboard
- **Server-Sent Events (SSE)** untuk update status langsung di layar tanpa refresh

**Observability & Tooling:**
- **Jaeger** untuk distributed tracing: satu request bisa dilacak perjalanannya lintas layanan
- **Grafana** untuk dashboard metrik kesehatan sistem
- **Mailpit** untuk menguji email (verifikasi, notifikasi pesanan) sebelum dikirim sungguhan
- **Docker**: setiap layanan dikemas dalam container
- **GitHub Actions** untuk CI/CD: build, test, dan deploy otomatis
- **Deploy di VPS** yang dikelola sendiri

**Status:** sedang dalam pengembangan.`,
        detailDescriptionEn: `Jajanim is an e-commerce marketplace I'm building on a full microservices architecture. The focus isn't only the storefront, but keeping the system running under load and easy to grow one piece at a time.

**Architecture:**
- **7 microservices** written in Golang, each owning one part of the business: Catalog (products & categories), Promotion (discounts & vouchers), Order, Payment, Delivery (shipping & tracking), User (profile & account), and Review (ratings & reviews)
- **Load balancer + API gateway (Nginx)**: a single entry point for every request that spreads load across services and handles routing, authentication, and rate limiting
- **Database per service (PostgreSQL)**: every service has its own database, so a problem in one part doesn't take everything down
- **Database replication**: each database has replicas for data safety and to spread read load
- **gRPC** for fast, strongly typed service-to-service calls
- **Kafka** as the event bus: services publish events without waiting on each other, so the system keeps working even when one service is down
- **Polyrepo**: every service has its own repository and ships independently

**Frontend:**
- **Next.js** storefront: fast and SEO-friendly
- **React + Vite** dashboard
- **Server-Sent Events (SSE)** for live status updates without refreshing

**Observability & Tooling:**
- **Jaeger** for distributed tracing: follow a single request across services
- **Grafana** dashboards for system health metrics
- **Mailpit** to test emails (verification, order notifications) before they go out for real
- **Docker**: every service is packaged as a container
- **GitHub Actions** for CI/CD: automated build, test, and deploy
- **Deployed on a self-managed VPS**

**Status:** in development.`,
        images: ["/projects/jajanim.webp", "/projects/jajanim-architecture.webp"],
        technologies: ["Golang", "gRPC", "Kafka", "PostgreSQL", "Nginx (API Gateway)", "Load Balancer", "Next.js", "React (Vite)", "SSE", "Jaeger", "Grafana", "Mailpit", "DB Replication", "Polyrepo", "Docker", "GitHub Actions", "VPS"],
        demoLink: "",
        githubLink: ""
    },
    {
        slug: "traveljauh",
        category: "travel" as ProjectCategory,
        live: true,
        title: "Travel Jauh - Open & Private Trip Agency",
        titleId: "Travel Jauh - Agensi Open & Private Trip",
        description: "Official website for the Travel Jauh travel agency: open trip and private trip packages across East Java (Bromo, Kawah Ijen, Tumpak Sewu, Malang), event packages like Jember Fashion Carnaval, a travel blog, order tracking, and WhatsApp booking. Live and used by the client.",
        descriptionId: "Website resmi agensi liburan Travel Jauh: katalog paket open trip & private trip Jawa Timur (Bromo, Kawah Ijen, Tumpak Sewu, Malang), paket event, blog, lacak pesanan, dan booking via WhatsApp. Live dan dipakai klien.",
        detailDescription: `Travel Jauh adalah website resmi agensi liburan open trip & private trip di Jawa Timur. Live dan dipakai langsung oleh klien.

**Fitur Utama:**
- Katalog paket tour dengan durasi, harga DP, dan halaman detail
- Pencarian destinasi dan filter kategori trip
- Lacak pesanan: pelanggan bisa cek status booking sendiri
- Blog untuk konten wisata dan SEO
- Tombol chat WhatsApp di setiap halaman untuk konversi cepat
- Bilingual: Bahasa Indonesia & English

**Untuk Pemilik Bisnis:**
- Paket tour, promo, dan artikel dikelola sendiri lewat Sanity CMS
- Popup promo untuk campaign seperti open trip musiman
- Metadata & Open Graph yang rapi saat link dibagikan ke media sosial`,
        detailDescriptionEn: `Travel Jauh is the official website of an open trip & private trip agency in East Java. It is live and used by the client.

**Key Features:**
- Tour package catalog with duration, down-payment price, and detail pages
- Destination search and trip category filters
- Order tracking: customers can check their booking status themselves
- Blog for travel content and SEO
- WhatsApp chat button on every page for fast conversion
- Bilingual: Indonesian & English

**For the Business Owner:**
- Tour packages, promos, and articles managed independently via Sanity CMS
- Promo popups for campaigns such as seasonal open trips
- Clean metadata & Open Graph previews when links are shared on social media`,
        images: ["/projects/traveljauh.webp"],
        technologies: ["Next.js", "Sanity CMS", "TypeScript", "Tailwind CSS", "Shadcn UI", "WhatsApp", "i18n"],
        demoLink: "https://www.traveljauh.com/",
        githubLink: ""
    },
    {
        slug: "kisahframe",
        category: "saas" as ProjectCategory,
        live: true,
        title: "KisahFrame - Virtual Photobooth & Wedding Album SaaS",
        titleId: "KisahFrame - SaaS Photobooth Virtual & Album Pernikahan",
        description: "A SaaS for weddings and events: guests scan one QR code to shoot with a virtual photobooth, upload to a shared digital album, and sign the guestbook, with no app to install. Used at 89+ events.",
        descriptionId: "SaaS untuk pernikahan dan acara: tamu cukup scan satu QR untuk memotret dengan photobooth virtual, mengunggah ke album digital, dan mengisi buku tamu, tanpa unduh aplikasi. Sudah dipakai di 89+ acara.",
        detailDescription: `KisahFrame adalah platform SaaS untuk pernikahan dan acara. Tamu cukup scan satu QR untuk memotret dengan photobooth virtual, mengunggah ke album digital, dan mengisi buku tamu, tanpa unduh aplikasi.

**Dampak:**
- 89+ acara sudah menggunakan KisahFrame

**Fitur Utama:**
- Host membuat acara dalam ±1 menit dan langsung dapat QR code unik
- Tamu scan QR, ketik nama, lalu memotret langsung dari browser HP
- Photobooth virtual dengan 50+ bingkai (1 foto, 2 foto, strip 3 foto)
- Preset kamera film analog dan galeri live
- Template kartu QR meja siap cetak yang terisi otomatis
- Dashboard host untuk mengunduh seluruh album HD sekaligus

**Bisnis & Teknis:**
- Model SaaS berbayar per acara dengan halaman harga dan akun pengguna
- Backend API Hono di Cloudflare Workers, ringan dan cepat di edge
- Database Cloudflare D1, foto HD tersimpan di Cloudflare R2
- Galeri live real-time lewat Pusher: foto tamu langsung muncul tanpa refresh
- Bilingual (ID / EN) dan blog untuk SEO`,
        detailDescriptionEn: `KisahFrame is a SaaS platform for weddings and events. Guests scan a single QR code to shoot with a virtual photobooth, upload to a digital album, and sign the guestbook, with no app download.

**Impact:**
- Used at 89+ events

**Key Features:**
- Hosts create an event in about a minute and instantly get a unique QR code
- Guests scan the QR, type their name, and shoot straight from their phone browser
- Virtual photobooth with 50+ frames (single, double, 3-photo strip)
- Analog film camera presets and a live gallery
- Print-ready table QR card templates filled in automatically
- Host dashboard to download the whole HD album at once

**Business & Technical:**
- Paid-per-event SaaS model with pricing page and user accounts
- Hono API backend on Cloudflare Workers, lightweight and fast at the edge
- Cloudflare D1 database, HD photos stored on Cloudflare R2
- Real-time live gallery via Pusher: guest photos appear without refreshing
- Bilingual (ID / EN) with a blog for SEO`,
        images: ["/projects/kisahframe.webp"],
        technologies: ["Next.js", "Hono", "Cloudflare Workers", "Pusher", "Cloudflare D1", "Cloudflare R2", "TypeScript", "Tailwind CSS"],
        demoLink: "https://kisahframe.com/",
        githubLink: ""
    },
    {
        slug: "villazahira",
        category: "travel" as ProjectCategory,
        title: "Villa Zahira - Luxury Villa & Resort in Puncak Bogor",
        titleId: "Villa Zahira - Villa & Resort Luxury di Puncak Bogor",
        description: "A luxury villa and resort reservation platform nestled in the scenic highlands of Puncak, Bogor. Features an elegant facility showcase, high-definition mountain view gallery, interactive route map, and seamless WhatsApp integration for direct guest bookings.",
        descriptionId: "Platform reservasi villa & resort luxury di kawasan Puncak, Bogor. Menampilkan showcase fasilitas eksklusif, galeri pemandangan pegunungan, peta lokasi interaktif, serta sistem pemesanan langsung via WhatsApp.",
        detailDescription: `Villa Zahira adalah platform digital resort dan villa mewah yang berlokasi di kawasan sejuk Puncak, Bogor. Didesain dengan estetika modern-tropis yang elegan untuk memberikan pengalaman reservasi villa secara cepat, eksklusif, dan tanpa hambatan.

**Fitur Utama:**
- **WhatsApp Direct Booking**: Sistem reservasi cepat yang mengarahkan calon tamu langsung ke layanan customer service WhatsApp.
- **Exclusive Villa Showcase**: Galeri foto pemandangan pegunungan, kamar, kolam renang private, dan fasilitas outdoor dengan tampilan jernih.
- **Interactive Facilities List**: Informasi detail fasilitas villa (Kolam renang private, BBQ area, WiFi cepat, kapasitas tamu, & karaoke lounge).
- **Location & Route Map**: Integrasi petunjuk arah interaktif menuju lokasi villa di Puncak Bogor.
- **Responsive & Fast Loading**: Performa loading super instan yang nyaman diakses di smartphone maupun desktop.

**Tantangan Teknis:**
- Optimasi aset gambar galeri villa resolusi tinggi agar tetap ringan di jaringan seluler.
- Desain antarmuka eksklusif yang menonjolkan keindahan alam Puncak Bogor dan kemewahan villa.
- Integrasi alur pemesanan langsung tanpa kerumitan form yang panjang.`,
        detailDescriptionEn: `Villa Zahira is a luxury resort and villa digital platform located in the cool highlands of Puncak, Bogor. Designed with an elegant modern-tropical aesthetic to deliver a fast, exclusive, and seamless booking experience.

**Key Features:**
- **WhatsApp Direct Booking**: Rapid reservation system linking prospective guests straight to WhatsApp customer service.
- **Exclusive Villa Showcase**: High-definition photo gallery showcasing mountain views, private rooms, swimming pool, and outdoor amenities.
- **Interactive Facilities List**: Comprehensive details on villa facilities (Private pool, BBQ area, high-speed WiFi, guest capacity, & karaoke lounge).
- **Location & Route Map**: Interactive map integration providing turn-by-turn directions to the Puncak location.
- **Responsive & Fast Loading**: Instant page load performance optimized for both mobile and desktop users.

**Technical Challenges:**
- Optimizing high-resolution villa gallery assets for fast mobile network loading.
- Crafting an exclusive UI showcasing Puncak's natural beauty and villa luxury.
- Streamlining the reservation workflow without tedious multi-step forms.`,
        images: [
            "/projects/villazahira-thumbnail.png"
        ],
        technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "WhatsApp API"
        ],
        demoLink: "https://villazahira.defanolabs.com/",
        githubLink: ""
    },
    {
        slug: "travlia",
        category: "travel" as ProjectCategory,
        title: "Travlia - Premium Travel & Tour Platform",
        titleId: "Travlia - Platform Travel & Tour Modern",
        description: "A high-end travel and tour ecosystem featuring an automated booking engine and integrated WhatsApp support. Built with a modern aesthetic, it offers a seamless experience for discovering destinations, managing bookings, and real-time communication. The platform focuses on high conversion rates through a polished UI/UX and efficient data handling.",
        descriptionId: "Ekosistem travel dan tour kelas atas yang memiliki sistem booking otomatis dan dukungan WhatsApp terintegrasi. Dibangun dengan estetika modern, platform ini menawarkan pengalaman mulus untuk menjelajah destinasi, mengelola pemesanan, dan komunikasi real-time.",
        detailDescription: `Travlia adalah platform travel & tour modern yang dirancang untuk memberikan pengalaman booking yang tanpa hambatan bagi para pelancong.

**Fitur Utama:**
- **Automated Booking Engine**: Sistem pemesanan otomatis yang terintegrasi untuk konfirmasi instan.
- **WhatsApp Integration**: Fitur booking dan konsultasi langsung via WhatsApp untuk fleksibilitas maksimal.
- **Modern UI/UX**: Desain premium dengan animasi halus menggunakan Framer Motion.
- **Dynamic Content**: Manajemen destinasi dan paket tour yang dinamis.
- **Responsive Design**: Pengalaman optimal di semua perangkat, dari mobile hingga desktop.

**Tantangan Teknis:**
- Sinkronisasi antara sistem booking otomatis dan ketersediaan real-time.
- Optimasi performa gambar destinasi untuk loading yang cepat.
- Implementasi sistem filter tour yang kompleks namun tetap user-friendly.`,
        detailDescriptionEn: `Travlia is a modern travel & tour platform designed to provide a seamless booking experience for travelers.

**Key Features:**
- **Automated Booking Engine**: Integrated automatic booking system for instant confirmation.
- **WhatsApp Integration**: Direct booking and consultation features via WhatsApp for maximum flexibility.
- **Modern UI/UX**: Premium design with smooth animations using Framer Motion.
- **Dynamic Content**: Dynamic management of destinations and tour packages.
- **Responsive Design**: Optimal experience across all devices, from mobile to desktop.

**Technical Challenges:**
- Synchronizing the automated booking system with real-time availability.
- Optimizing destination image performance for fast loading.
- Implementing a complex yet user-friendly tour filtering system.`,
        images: [
            "/projects/travlia-thumbnail.webp",
        ],
        technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "Sanity CMS",
            "WhatsApp API"
        ],
        demoLink: "https://travllia.defanolabs.com/",
        githubLink: ""
    },
    {
        slug: "maraptur",
        category: "travel" as ProjectCategory,
        title: "Maraptur - Adventure & Expedition Agency",
        titleId: "Maraptur - Agen Petualangan & Ekspedisi",
        description: "A specialized platform for adventure enthusiasts, focusing on direct communication and personalized planning via WhatsApp. Maraptur provides a clean, high-performance interface for browsing extreme expedition packages, ensuring users can quickly connect with experts for custom adventure itineraries.",
        descriptionId: "Platform khusus untuk pecinta petualangan, fokus pada komunikasi langsung dan perencanaan personal via WhatsApp. Maraptur menyediakan antarmuka bersih dengan performa tinggi untuk menjelajah paket ekspedisi ekstrem.",
        detailDescription: `Maraptur adalah platform digital bagi agen perjalanan yang mengkhususkan diri pada paket wisata petualangan dan ekspedisi.

**Fokus Utama:**
- **WhatsApp-Centric Booking**: Menyederhanakan alur konversi dengan mengarahkan pengguna langsung ke konsultasi WhatsApp.
- **Adventure Showcase**: Layout galeri yang dirancang khusus untuk menonjolkan visual destinasi alam liar.
- **Fast Performance**: Loading super cepat untuk memastikan pengguna di area dengan sinyal minim tetap bisa mengakses informasi.
- **Itinerary Builder**: Struktur konten yang jelas untuk menampilkan detail rencana perjalanan hari demi hari.

**Kelebihan:**
- Integrasi **Sanity CMS** untuk manajemen konten tour yang mandiri dan fleksibel.
- Memberikan sentuhan personal melalui komunikasi langsung.
- Navigasi yang sangat simpel dan to-the-point.
- Optimasi SEO untuk kata kunci spesifik di bidang adventure travel.`,
        detailDescriptionEn: `Maraptur is a digital platform for travel agencies specializing in adventure and expedition packages.

**Core Focus:**
- **WhatsApp-Centric Booking**: Streamlining the conversion flow by directing users directly to WhatsApp consultation.
- **Adventure Showcase**: Gallery layouts specifically designed to highlight visuals of wilderness destinations.
- **Fast Performance**: Super-fast loading to ensure users in low-signal areas can still access information.
- **Itinerary Builder**: Clear content structure to display day-by-day travel plan details.

**Advantages:**
- **Sanity CMS Integration** for independent and flexible tour content management.
- Provides a personal touch through direct communication.
- Extremely simple and to-the-point navigation.
- SEO optimization for specific keywords in the adventure travel niche.`,
        images: [
            "/projects/maraptur-thumbnail.webp"
        ],
        technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Sanity CMS",
            "WhatsApp Integration"
        ],
        demoLink: "https://maraptur.defanolabs.com/",
        githubLink: ""
    },
    {
        slug: "travelo",
        category: "travel" as ProjectCategory,
        title: "Travelo - Southeast Asia Travel Booking",
        titleId: "Travelo - Reservasi Travel Asia Tenggara",
        description: "A travel reservation platform for Southeast Asian destinations: destination catalog with prices and ratings, flights, stays and attractions in one place, testimonials, and user accounts for booking.",
        descriptionId: "Platform reservasi travel untuk destinasi Asia Tenggara: katalog destinasi dengan harga dan rating, testimoni, serta akun pengguna untuk booking.",
        detailDescription: `Travelo adalah platform reservasi travel untuk destinasi Asia Tenggara.

**Fitur Utama:**
- Katalog destinasi dengan harga, rating, dan jumlah ulasan
- Section layanan: flight, stay, dan atraksi dalam satu tempat
- Login & registrasi akun pengguna
- Testimoni pelanggan dan logo partner
- Pilihan bahasa (ID / EN)

**Highlight Teknis:**
- Metadata SEO per halaman untuk kata kunci travel
- Layout responsif dengan menu mobile khusus`,
        detailDescriptionEn: `Travelo is a travel reservation platform for Southeast Asian destinations.

**Key Features:**
- Destination catalog with prices, ratings, and review counts
- Services section: flights, stays, and attractions in one place
- User login & registration
- Customer testimonials and partner logos
- Language switcher (ID / EN)

**Technical Highlights:**
- Per-page SEO metadata for travel keywords
- Responsive layout with a dedicated mobile menu`,
        images: ["/projects/travelo.webp"],
        technologies: ["Next.js", "React", "Tailwind CSS", "i18n"],
        demoLink: "https://travelo.defanolabs.com/",
        githubLink: ""
    },
    {
        slug: "travelworld",
        category: "travel" as ProjectCategory,
        title: "Travel World - Global Tour & Travel",
        titleId: "Travel World - Website Tour & Travel Global",
        description: "A tour agency website with a tour package catalog, luxury and adventure destinations, travel guides, and user accounts for booking tours.",
        descriptionId: "Website agen tour dengan katalog paket wisata, destinasi luxury dan petualangan, panduan perjalanan, serta akun pengguna untuk memesan tour.",
        detailDescription: `Travel World adalah website agen tour & travel global.

**Fitur Utama:**
- Katalog tour dengan halaman detail paket
- Section "Know Before You Go" untuk informasi perjalanan
- Login & registrasi pengguna
- Navigasi desktop dan mobile yang terpisah dan dioptimasi`,
        detailDescriptionEn: `Travel World is a global tour & travel agency website.

**Key Features:**
- Tour catalog with package detail pages
- "Know Before You Go" section with travel information
- User login & registration
- Separate, optimized desktop and mobile navigation`,
        images: ["/projects/travelworld.webp"],
        technologies: ["Next.js", "React", "Tailwind CSS"],
        demoLink: "https://travelworld.defanolabs.com/",
        githubLink: ""
    },
    {
        slug: "dorent",
        category: "travel" as ProjectCategory,
        title: "Dorent - Luxury VIP Car Rental Jakarta",
        titleId: "Dorent - Sewa Mobil Mewah VIP Jakarta",
        description: "A luxury car rental website: fleet catalog by brand, self-drive or VIP-with-driver options, transparent pricing, and direct booking to customer service via WhatsApp.",
        descriptionId: "Website rental mobil mewah: katalog armada, pilihan sewa lepas kunci atau dengan sopir VIP, halaman harga, dan pemesanan langsung ke CS via WhatsApp.",
        detailDescription: `Dorent adalah website rental mobil mewah VIP di Jakarta.

**Fitur Utama:**
- Katalog armada mobil mewah per brand
- Pilihan sewa lepas kunci atau dengan sopir
- Halaman harga yang transparan
- Pemesanan langsung via WhatsApp CS
- Login & registrasi pelanggan`,
        detailDescriptionEn: `Dorent is a VIP luxury car rental website in Jakarta.

**Key Features:**
- Luxury fleet catalog by brand
- Self-drive or chauffeured rental options
- Transparent pricing page
- Direct booking via WhatsApp customer service
- Customer login & registration`,
        images: ["/projects/dorent.webp"],
        technologies: ["Next.js", "React", "Tailwind CSS", "Shadcn UI", "WhatsApp"],
        demoLink: "https://dorent.defanolabs.com/",
        githubLink: ""
    },
    {
        slug: "apma",
        category: "saas" as ProjectCategory,
        title: "APMA - Automated Teaching Module Generator",
        titleId: "APMA - Pembuat Modul Ajar Otomatis",
        description: "An AI-powered SaaS platform designed to help Indonesian teachers create complete, professional teaching modules (Modul Ajar) and exam questions in just minutes. Fully compliant with both Kurikulum Merdeka and K13 standards, it supports all education levels from PAUD to SMA/SMK. Features include flexible export to Word (.docx) and PDF formats, deep customization of module structure, and AI-generated content covering core materials, learning activities, assessments, remedial plans, and reflections. Built to cut administrative workload by up to 90%, letting educators focus on actual teaching.",
        descriptionId: "Platform SaaS berbasis AI yang membantu guru Indonesia membuat Modul Ajar lengkap dan profesional dalam hitungan menit. Sesuai Kurikulum Merdeka & K13, menawarkan kustomisasi mendalam dan berbagai format ekspor.",
        detailDescription: `APMA (Automated Professional Module Author) adalah platform SaaS berbasis AI yang dirancang khusus untuk membantu guru-guru Indonesia membuat Modul Ajar lengkap dan profesional dalam hitungan menit.

**Fitur Utama:**
- Pembuatan modul ajar otomatis menggunakan AI (OpenAI API) yang sesuai standar Kurikulum Merdeka dan K13
- Mendukung semua jenjang pendidikan dari PAUD hingga SMA/SMK
- Ekspor fleksibel ke format Word (.docx) dan PDF
- Kustomisasi mendalam untuk struktur modul, termasuk materi inti, aktivitas pembelajaran, asesmen, rencana remedial, dan refleksi
- Dashboard interaktif untuk manajemen modul

**Tantangan Teknis:**
- Integrasi streaming response dari OpenAI API untuk pengalaman real-time
- Implementasi template engine yang fleksibel untuk berbagai format kurikulum
- Optimasi prompt engineering untuk menghasilkan konten edukatif yang berkualitas
- Sistem autentikasi dan manajemen langganan untuk model SaaS

**Dampak:**
Platform ini mampu memangkas beban administratif guru hingga 90%, memungkinkan mereka fokus pada proses pengajaran yang sesungguhnya.`,
        detailDescriptionEn: `APMA (Automated Professional Module Author) is an AI-powered SaaS platform specifically designed to help Indonesian teachers create complete and professional teaching modules (Modul Ajar) in minutes.

**Key Features:**
- Automated module generation using AI (OpenAI API) compliant with Kurikulum Merdeka and K13 standards
- Supports all education levels from PAUD to SMA/SMK
- Flexible export to Word (.docx) and PDF formats
- Deep customization of module structure, including core materials, learning activities, assessments, remedial plans, and reflections
- Interactive dashboard for module management

**Technical Challenges:**
- Integrating streaming responses from OpenAI API for a real-time experience
- Implementing a flexible template engine for various curriculum formats
- Optimizing prompt engineering to generate high-quality educational content
- Authentication system and subscription management for the SaaS model

**Impact:**
This platform can reduce teachers' administrative workload by up to 90%, allowing them to focus on the actual teaching process.`,
        images: [
            "/projects/apma-thumbnail.webp",
            "/projects/apma-1.webp"
        ],
        technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "OpenAI API",
            "SaaS"
        ],
        demoLink: "https://apma.defanolabs.com/",
        githubLink: ""
    },
    {
        slug: "softshop",
        category: "ecommerce" as ProjectCategory,
        title: "SoftShop - Mini Ecommerce System",
        titleId: "SoftShop - Sistem Ecommerce Mini",
        description: "A comprehensive ecommerce ecosystem built with a multi-service monolithic architecture using Golang and NestJS on the backend. The project spans 3 independent backend services and 3 separate frontend applications: a customer-facing storefront with product browsing, cart management, and checkout flow; an internal admin panel for inventory management, order processing, and analytics; and a dedicated courier system featuring real-time delivery tracking via WebSocket and Server-Sent Events (SSE). Utilizes PostgreSQL with Supabase, RabbitMQ for message queuing, Redis for caching, and Cloudinary for media management.",
        descriptionId: "Sistem ecommerce lengkap dengan arsitektur monolitik multi-layanan. Bertanggung jawab membangun 3 layanan backend dan 3 aplikasi frontend, termasuk fitur pengguna eksternal, panel admin internal, serta sistem kurir dengan pelacakan real-time.",
        detailDescription: `SoftShop adalah ekosistem ecommerce komprehensif yang dibangun dengan arsitektur monolitik multi-layanan, menunjukkan kemampuan dalam membangun sistem skala besar dari nol.

**Arsitektur Sistem:**
- 3 layanan backend independen menggunakan Golang dan NestJS
- 3 aplikasi frontend terpisah untuk pengguna, admin, dan kurir
- Message queuing dengan RabbitMQ untuk komunikasi antar layanan
- Caching layer menggunakan Redis untuk optimasi performa

**Fitur Per Aplikasi:**
1. **Customer Storefront**: Browsing produk, manajemen keranjang, alur checkout lengkap
2. **Admin Panel**: Manajemen inventaris, pemrosesan pesanan, analytics dashboard
3. **Courier System**: Pelacakan pengiriman real-time via WebSocket dan Server-Sent Events (SSE)

**Stack Teknologi:**
- Backend: Golang + NestJS dengan arsitektur clean code
- Database: PostgreSQL via Supabase
- Real-time: WebSocket + SSE untuk tracking kurir
- Media: Cloudinary untuk manajemen gambar produk
- Queue: RabbitMQ untuk event-driven communication

**Tantangan Teknis:**
- Desain arsitektur yang scalable untuk multiple services
- Implementasi real-time tracking dengan fallback SSE
- Konsistensi data antar layanan menggunakan event-driven patterns`,
        detailDescriptionEn: `SoftShop is a comprehensive ecommerce ecosystem built with a multi-service monolithic architecture, demonstrating the ability to build large-scale systems from scratch.

**System Architecture:**
- 3 independent backend services using Golang and NestJS
- 3 separate frontend applications for customers, admins, and couriers
- Message queuing with RabbitMQ for inter-service communication
- Caching layer using Redis for performance optimization

**Features Per Application:**
1. **Customer Storefront**: Product browsing, cart management, complete checkout flow
2. **Admin Panel**: Inventory management, order processing, analytics dashboard
3. **Courier System**: Real-time delivery tracking via WebSocket and Server-Sent Events (SSE)

**Technology Stack:**
- Backend: Golang + NestJS with clean code architecture
- Database: PostgreSQL via Supabase
- Real-time: WebSocket + SSE for courier tracking
- Media: Cloudinary for product image management
- Queue: RabbitMQ for event-driven communication

**Technical Challenges:**
- Scalable architecture design for multiple services
- Implementing real-time tracking with SSE fallback
- Data consistency across services using event-driven patterns`,
        images: ["/projects/softShop.webp"],
        technologies: [
            "Golang",
            "NestJS",
            "Next.js",
            "React (Vite)",
            "Tailwind CSS",
            "Supabase",
            "PostgreSQL",
            "WebSocket",
            "RabbitMQ",
            "Redis",
            "Cloudinary",
            "SSE"
        ],
        demoLink: "",
        githubLink: ""
    },
    {
        slug: "shopco",
        category: "ecommerce" as ProjectCategory,
        title: "Shop.co - Fashion & Streetwear Store",
        titleId: "Shop.co - Toko Online Fashion & Streetwear",
        description: "A fashion e-commerce platform with New Arrivals, Top Selling and On Sale collections, product ratings, discount labels, customer accounts, and checkout.",
        descriptionId: "Platform e-commerce fashion dengan katalog New Arrivals, Top Selling, dan On Sale, rating produk, label diskon, akun pelanggan, sampai checkout.",
        detailDescription: `Shop.co adalah toko online fashion & streetwear.

**Fitur Utama:**
- Koleksi New Arrivals, Top Selling, On Sale, dan Brands
- Kartu produk dengan rating dan harga diskon
- Akun pelanggan dan alur checkout
- Banner promo pendaftaran untuk akuisisi pelanggan baru`,
        detailDescriptionEn: `Shop.co is a fashion & streetwear online store.

**Key Features:**
- New Arrivals, Top Selling, On Sale, and Brands collections
- Product cards with ratings and discounted prices
- Customer accounts and checkout flow
- Sign-up promo banner for new customer acquisition`,
        images: ["/projects/shopco.webp"],
        technologies: ["Next.js", "React", "Tailwind CSS"],
        demoLink: "https://shopco.defanolabs.com/",
        githubLink: ""
    },
    {
        slug: "exclusive",
        category: "ecommerce" as ProjectCategory,
        title: "Exclusive - Multi-Category Marketplace",
        titleId: "Exclusive - Marketplace Multi-Kategori",
        description: "A marketplace for electronics, fashion and lifestyle: full product categories, promo codes, wishlist, cart, customer accounts, and an admin dashboard.",
        descriptionId: "Marketplace untuk elektronik, fashion, dan lifestyle: kategori lengkap, kode promo, favorit, keranjang, akun pelanggan, dan dashboard admin.",
        detailDescription: `Exclusive adalah marketplace multi-kategori.

**Fitur Utama:**
- Kategori produk lengkap, dari elektronik sampai kebutuhan rumah
- Banner promo dan kode voucher untuk pengguna baru
- Wishlist / favorit dan keranjang belanja
- Login & registrasi pelanggan
- Dashboard admin untuk kelola toko
- Pilihan bahasa (ID / EN)`,
        detailDescriptionEn: `Exclusive is a multi-category marketplace.

**Key Features:**
- Full product categories, from electronics to home goods
- Promo banners and voucher codes for new users
- Wishlist / favorites and shopping cart
- Customer login & registration
- Admin dashboard for store management
- Language switcher (ID / EN)`,
        images: ["/projects/exclusive.webp"],
        technologies: ["Next.js", "React", "Tailwind CSS", "i18n"],
        demoLink: "https://exclusive.defanolabs.com/",
        githubLink: ""
    },
    {
        slug: "spillthethings",
        category: "ecommerce" as ProjectCategory,
        title: "SpillTheThings - Fashion Online Store",
        titleId: "SpillTheThings - Toko Fashion Online",
        description: "A modern and stylish fashion e-commerce platform for browsing and purchasing a wide range of fashion products including bags, clothing, pants, and accessories. Built with Next.js for blazing-fast performance and SEO, Sanity CMS as the headless content management backend for easy product management, styled with Tailwind CSS and Shadcn UI for a clean, premium aesthetic. Features include product catalog with category filtering, product detail pages, shopping cart, and a smooth checkout experience.",
        descriptionId: "Platform e-commerce fashion modern untuk membeli berbagai produk fashion seperti tas, baju, celana, dan aksesori. Dibangun dengan Next.js, Sanity CMS, Tailwind CSS, dan Shadcn UI untuk pengalaman belanja yang premium dan responsif.",
        detailDescription: `SpillTheThings adalah toko online fashion yang menawarkan berbagai produk fashion berkualitas mulai dari tas, baju, celana, hingga aksesori pilihan.

**Fitur Utama:**
- Katalog produk lengkap dengan kategori: Tas, Baju, Celana, Aksesori
- Filter dan sorting produk berdasarkan kategori, harga, dan popularitas
- Halaman detail produk dengan galeri gambar, deskripsi, dan pilihan ukuran/warna
- Shopping cart dengan manajemen quantity
- Checkout flow yang smooth dan intuitif
- Manajemen konten produk via Sanity Studio (CMS)

**Arsitektur & Stack:**
- Frontend: Next.js (App Router) untuk SSR, SSG, dan performa optimal
- CMS: Sanity sebagai headless CMS untuk manajemen produk yang mudah
- Styling: Tailwind CSS + Shadcn UI untuk design system yang konsisten dan premium
- TypeScript untuk type safety di seluruh codebase

**Highlight Teknis:**
- Integrasi Next.js Image Optimization untuk loading gambar produk yang cepat
- GROQ queries via Sanity client untuk fetching data yang efisien
- Incremental Static Regeneration (ISR) untuk performa dan freshness konten
- Responsive design yang sempurna di mobile, tablet, dan desktop
- SEO-friendly dengan metadata dinamis per halaman produk`,
        detailDescriptionEn: `SpillTheThings is an online fashion store offering a variety of high-quality fashion products ranging from bags, clothes, pants, to selected accessories.

**Key Features:**
- Complete product catalog with categories: Bags, Clothes, Pants, Accessories
- Product filtering and sorting based on category, price, and popularity
- Product detail pages with image gallery, description, and size/color options
- Shopping cart with quantity management
- Smooth and intuitive checkout flow
- Product content management via Sanity Studio (headless CMS)

**Architecture & Stack:**
- Frontend: Next.js (App Router) for SSR, SSG, and optimal performance
- CMS: Sanity as a headless CMS for easy product management
- Styling: Tailwind CSS + Shadcn UI for a consistent and premium design system
- TypeScript for type safety throughout the codebase

**Technical Highlights:**
- Next.js Image Optimization integration for fast product image loading
- GROQ queries via Sanity client for efficient data fetching
- Incremental Static Regeneration (ISR) for performance and content freshness
- Perfect responsive design on mobile, tablet, and desktop
- SEO-friendly with dynamic metadata per product page`,
        images: ["/projects/SpillTheThings.webp"],
        technologies: [
            "Next.js",
            "Sanity CMS",
            "Tailwind CSS",
            "Shadcn UI",
            "TypeScript",
            "E-Commerce"
        ],
        demoLink: "",
        githubLink: ""
    },
    {
        slug: "deflix",
        category: "saas" as ProjectCategory,
        title: "Deflix - Movie Trailer App",
        titleId: "Deflix - Aplikasi Trailer Film",
        description: "A Netflix-inspired movie discovery platform for browsing, searching, and watching trailers powered by the TMDB API. Features include trending movies, genre-based filtering, detailed movie information pages with cast and crew data, and embedded trailer playback. Built as a full-stack application with Next.js on the frontend and NestJS as the backend API layer, using PostgreSQL for persistent data storage, Redux for state management, and Docker for containerized deployment. Designed as a learning project to master modern full-stack development patterns.",
        descriptionId: "Platform penemuan film terinspirasi Netflix untuk menjelajah, mencari, dan menonton trailer menggunakan API TMDB, dibangun sebagai aplikasi full-stack dengan Next.js, NestJS, PostgreSQL, dan Docker.",
        detailDescription: `Deflix adalah platform penemuan film terinspirasi Netflix yang memungkinkan pengguna menjelajah, mencari, dan menonton trailer film secara langsung.

**Fitur Utama:**
- Halaman trending movies yang diperbarui secara real-time
- Filter berdasarkan genre, tahun rilis, dan rating
- Halaman detail film lengkap dengan data cast, crew, dan sinopsis
- Embedded trailer playback langsung di aplikasi
- Search functionality dengan debouncing untuk UX yang optimal

**Arsitektur Full-Stack:**
- Frontend: Next.js dengan server-side rendering untuk SEO dan performa
- Backend: NestJS sebagai API layer dengan RESTful endpoints
- Database: PostgreSQL untuk penyimpanan data persisten
- State Management: Redux untuk predictable state updates
- Deployment: Docker containers untuk konsistensi environment

**Pembelajaran Kunci:**
- Implementasi SSR (Server-Side Rendering) dengan Next.js
- Integrasi API pihak ketiga (TMDB) dengan caching strategy
- Containerized deployment workflow dengan Docker
- State management patterns dengan Redux Toolkit`,
        detailDescriptionEn: `Deflix is a Netflix-inspired movie discovery platform that allows users to browse, search, and watch movie trailers directly.

**Key Features:**
- Trending movies page updated in real-time
- Filtering by genre, release year, and rating
- Detailed movie pages complete with cast, crew, and synopsis data
- Embedded trailer playback directly in the app
- Search functionality with debouncing for optimal UX

**Full-Stack Architecture:**
- Frontend: Next.js with server-side rendering for SEO and performance
- Backend: NestJS as an API layer with RESTful endpoints
- Database: PostgreSQL for persistent data storage
- State Management: Redux for predictable state updates
- Deployment: Docker containers for environment consistency

**Key Learnings:**
- Implementing SSR (Server-Side Rendering) with Next.js
- Third-party API integration (TMDB) with caching strategy
- Containerized deployment workflow with Docker
- State management patterns with Redux Toolkit`,
        images: ["/projects/deflix.webp"],
        technologies: ["Next.js", "NestJS", "PostgreSQL", "TMDB API", "Redux", "Docker"],
        demoLink: "https://deflix-three.vercel.app/",
        githubLink: "https://github.com/defaaryawar/deflix-frontend"
    },
    {
        slug: "jaya-mandiri-dashboard",
        category: "saas" as ProjectCategory,
        title: "Jaya Mandiri - Admin Dashboard",
        titleId: "Jaya Mandiri - Dashboard Admin",
        description: "A modern, responsive admin dashboard application for managing delivery operations at Jaya Mandiri. Features include comprehensive CRUD operations for shipment tracking, driver management, and route optimization. Built with a React (Vite) frontend providing a fast, interactive UI with reusable component architecture, and a NestJS backend with RESTful API endpoints. Uses PostgreSQL for relational data storage and includes extensive unit testing with Jest to ensure code reliability. Implements custom React hooks for data fetching and state management patterns.",
        descriptionId: "Dashboard admin yang modern dan responsif untuk mengelola pengiriman di Jaya Mandiri, dibangun dengan frontend React (Vite) dan backend NestJS, menggunakan PostgreSQL dan pengujian unit dengan Jest.",
        detailDescription: `Dashboard admin modern untuk Jaya Mandiri yang mengelola operasional pengiriman secara efisien dan terorganisir.

**Fitur Dashboard:**
- CRUD lengkap untuk tracking pengiriman (shipment management)
- Manajemen driver dengan status tracking
- Route optimization dan assignment
- Analytics dan reporting untuk performa pengiriman
- Data visualization dengan charts dan graphs

**Arsitektur Aplikasi:**
- Frontend: React (Vite) untuk build time yang sangat cepat
- Backend: NestJS dengan arsitektur modular
- Database: PostgreSQL untuk relational data storage
- Testing: Jest dengan coverage yang komprehensif

**Best Practices:**
- Custom React hooks untuk data fetching dan state management
- Reusable component architecture untuk konsistensi UI
- RESTful API design dengan proper error handling
- Unit testing ekstensif untuk code reliability
- Responsive design yang optimal di desktop dan tablet`,
        detailDescriptionEn: `A modern admin dashboard for Jaya Mandiri that manages delivery operations efficiently and organized.

**Dashboard Features:**
- Full CRUD for shipment tracking (shipment management)
- Driver management with status tracking
- Route optimization and assignment
- Analytics and reporting for delivery performance
- Data visualization with charts and graphs

**Application Architecture:**
- Frontend: React (Vite) for extremely fast build times
- Backend: NestJS with modular architecture
- Database: PostgreSQL for relational data storage
- Testing: Jest with comprehensive coverage

**Best Practices:**
- Custom React hooks for data fetching and state management
- Reusable component architecture for UI consistency
- RESTful API design with proper error handling
- Extensive unit testing for code reliability
- Optimal responsive design for desktop and tablets`,
        images: ["/projects/admin-jm.webp"],
        technologies: ["React", "Vite", "NestJS", "PostgreSQL", "Jest", "Hooks"],
        githubLink: "https://github.com/defaaryawar/dashboard-jaya-mandiri"
    },
    {
        slug: "jaya-mandiri-profile",
        category: "company" as ProjectCategory,
        title: "Jaya Mandiri - Company Profile",
        titleId: "Jaya Mandiri - Profil Perusahaan",
        description: "A clean and professionally designed company profile website for Jaya Mandiri logistics services. Features a polished landing page with smooth scroll animations, service showcases, company history timeline, team profiles, and a contact section. Built with React and styled using TailwindCSS and Shadcn UI for a consistent, premium design system. Implements a modular component architecture with reusable UI elements, responsive layouts optimized for all screen sizes, and performant asset loading for a seamless browsing experience.",
        descriptionId: "Website profil perusahaan yang bersih dan responsif untuk Jaya Mandiri, dibangun dengan React, TailwindCSS, dan Shadcn UI menggunakan komponen modular dan tampilan modern.",
        detailDescription: `Website profil perusahaan yang profesional untuk Jaya Mandiri, perusahaan jasa logistik yang menampilkan identitas brand secara elegan.

**Halaman & Fitur:**
- Landing page dengan smooth scroll animations
- Service showcase yang menampilkan layanan logistik
- Timeline sejarah perusahaan yang interaktif
- Profil tim dengan foto dan jabatan
- Contact section dengan form dan informasi kontak
- Google Maps integration untuk lokasi kantor

**Design System:**
- TailwindCSS untuk utility-first styling
- Shadcn UI untuk komponen yang konsisten dan accessible
- Custom animations menggunakan CSS transitions dan Framer Motion
- Typography system yang premium dan readable

**Aspek Teknis:**
- Modular component architecture untuk reusability
- Responsive layouts yang optimal di semua ukuran layar
- Lazy loading untuk gambar dan asset performance
- SEO-friendly structure dengan proper meta tags
- Performance optimization dengan code splitting`,
        detailDescriptionEn: `A professional company profile website for Jaya Mandiri, a logistics company that elegantly displays its brand identity.

**Pages & Features:**
- Landing page with smooth scroll animations
- Service showcase displaying logistics services
- Interactive company history timeline
- Team profiles with photos and roles
- Contact section with form and contact info
- Google Maps integration for office locations

**Design System:**
- TailwindCSS for utility-first styling
- Shadcn UI for consistent and accessible components
- Custom animations using CSS transitions and Framer Motion
- Premium and readable typography system

**Technical Aspects:**
- Modular component architecture for reusability
- Optimal responsive layouts on all screen sizes
- Lazy loading for image and asset performance
- SEO-friendly structure with proper meta tags
- Performance optimization with code splitting`,
        images: ["/projects/jayamandiri.webp"],
        technologies: ["React", "Tailwind CSS", "Shadcn UI"],
        demoLink: "https://jaya-mandiri.vercel.app/",
        githubLink: "https://github.com/defaaryawar/jaya-mandiri"
    },
    {
        slug: "nion-coffee",
        category: "company" as ProjectCategory,
        title: "Nion Coffee - Company Profile",
        titleId: "Nion Coffee - Profil Perusahaan",
        description: "A fully-featured and scalable company profile application for Nion Coffee, one of the most complete and polished projects in the portfolio. Built with React and Vite for blazing-fast performance, styled with TailwindCSS and DaisyUI for a rich, café-inspired aesthetic. Implements proper OOP design patterns and Redux for predictable state management. Features include dynamic product catalogs fetched from REST APIs, an interactive menu system, store locator, customer testimonials, and a comprehensive about section. Architected with scalability in mind using clean code principles and separation of concerns.",
        descriptionId: "Aplikasi profil perusahaan yang kaya fitur dan scalable untuk Nion Coffee, menggunakan React dengan Vite, TailwindCSS, DaisyUI, REST API, serta arsitektur solid dengan pendekatan OOP dan Redux.",
        detailDescription: `Nion Coffee adalah salah satu project paling lengkap dan polished dalam portfolio, menampilkan profil perusahaan kopi dengan estetika yang terinspirasi dari dunia café.

**Fitur Lengkap:**
- Dynamic product catalog yang di-fetch dari REST API
- Interactive menu system dengan filtering dan sorting
- Store locator dengan informasi lokasi dan jam operasional
- Customer testimonials section
- Comprehensive about section dengan sejarah perusahaan
- Newsletter subscription

**Arsitektur & Patterns:**
- OOP design patterns untuk clean code structure
- Redux untuk predictable state management
- Separation of concerns yang ketat antar layer
- REST API integration dengan proper error handling
- Component-based architecture untuk scalability

**Teknologi:**
- React + Vite untuk blazing-fast development dan build
- TailwindCSS + DaisyUI untuk rich, café-inspired aesthetic
- Redux Toolkit untuk state management
- REST API untuk dynamic content fetching
- Responsive design yang sempurna di semua device

**Highlight:**
Project ini menunjukkan kemampuan dalam membangun aplikasi web yang tidak hanya fungsional, tetapi juga memiliki estetika visual yang premium dan user experience yang menyenangkan.`,
        detailDescriptionEn: `Nion Coffee is one of the most complete and polished projects in the portfolio, featuring a coffee company profile with a cafe-inspired aesthetic.

**Complete Features:**
- Dynamic product catalog fetched from REST API
- Interactive menu system with filtering and sorting
- Store locator with location and operating house information
- Customer testimonials section
- Comprehensive about section with company history
- Newsletter subscription

**Architecture & Patterns:**
- OOP design patterns for clean code structure
- Redux for predictable state management
- Strict separation of concerns between layers
- REST API integration with proper error handling
- Component-based architecture for scalability

**Technology:**
- React + Vite for blazing-fast development and build
- TailwindCSS + DaisyUI for a rich, cafe-inspired aesthetic
- Redux Toolkit for state management
- REST API for dynamic content fetching
- Perfect responsive design on all devices

**Highlight:**
This project demonstrates the ability to build a web application that is not only functional but also possesses a premium visual aesthetic and an enjoyable user experience.`,
        images: ["/projects/nion.webp"],
        technologies: ["React", "Vite", "Tailwind CSS", "DaisyUI", "REST API", "OOP", "Redux"],
        demoLink: "https://nioncoffee.store/",
        githubLink: "https://github.com/defaaryawar/nion-coffee"
    },
];