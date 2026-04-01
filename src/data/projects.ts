export const projects = [
    {
        slug: "apma",
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
        slug: "spillthethings",
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