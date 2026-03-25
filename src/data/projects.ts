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
        githubLink: "" // Private repository for SaaS usually
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
        images: ["https://img.freepik.com/free-vector/torn-style-coming-soon-promo-template-social-media-post_1017-55783.jpg?semt=ais_hybrid&w=740&q=80"],
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
        images: ["/projects/deflix.webp"],
        technologies: ["Next.js", "NestJS", "PostgreSQL", "TMDB API", "Redux", "Docker"],
        demoLink: "https://deflix-three.vercel.app/",
        githubLink: "https://github.com/defaaryawar/deflix-frontend"
    },
    {
        slug: "def-animelist",
        title: "Def-AnimeList - Anime Explorer App",
        titleId: "AnimeList - Aplikasi Penjelajah Anime",
        description: "A feature-rich anime discovery application that lets users explore top-rated, popular, and recommended anime titles. Integrates with public anime APIs (Jikan/MyAnimeList) to display detailed information including synopses, ratings, episode counts, and genre categories. Features a clean, modern interface with responsive card layouts, search functionality, and pagination. Built with Next.js for server-side rendering and optimized performance, styled with Tailwind CSS and DaisyUI components, and fully typed with TypeScript for maintainable code.",
        descriptionId: "Aplikasi penjelajah anime dengan antarmuka modern yang terintegrasi API publik anime untuk menampilkan informasi detail termasuk sinopsis, rating, dan kategori genre.",
        detailDescription: `Def-AnimeList adalah aplikasi penjelajah anime yang kaya fitur, memungkinkan pengguna menemukan anime top-rated, populer, dan rekomendasi terbaik.

**Fitur Utama:**
- Eksplorasi anime berdasarkan kategori: Top Rated, Popular, Upcoming, dan Recommended
- Integrasi dengan Jikan API (MyAnimeList) untuk data anime yang komprehensif
- Detail anime lengkap: sinopsis, rating, jumlah episode, genre, studio, dan karakter
- Search functionality dengan autocomplete suggestions
- Responsive card layouts yang optimal di semua ukuran layar

**Teknologi & Implementasi:**
- Next.js dengan App Router untuk routing modern dan SSR
- Tailwind CSS + DaisyUI untuk design system yang konsisten
- TypeScript untuk type safety dan maintainability
- API integration dengan error handling dan loading states
- Pagination untuk navigasi data yang efisien

**Highlight Teknis:**
- Server-side rendering untuk initial page load yang cepat
- Client-side caching untuk mengurangi API calls
- Responsive image optimization dengan Next/Image
- Skeleton loading untuk pengalaman pengguna yang smooth`,
        images: ["/projects/animelist.webp"],
        technologies: ["Next.js", "React", "Tailwind CSS", "DaisyUI", "TypeScript", "Anime API"],
        demoLink: "https://def-anime.vercel.app/",
        githubLink: "https://github.com/defaaryawar/def-anime"
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
        images: ["/projects/jayamandiri.webp"],
        technologies: ["React", "Tailwind CSS", "Shadcn UI"],
        demoLink: "https://jaya-mandiri.vercel.app/",
        githubLink: "https://github.com/defaaryawar/jaya-mandiri"
    },
    {
        slug: "nion-coffee",
        title: "Nion Coffee - Company Profile",
        titleId: "Nion Coffee - Profil Perusahaan",
        description: "A fully-featured and scalable company profile application for Nion Coffee, one of the most complete and polished projects in the portfolio. Built with React and Vite for blazing-fast performance, styled with TailwindCSS and DaisyUI for a rich, caf\u00e9-inspired aesthetic. Implements proper OOP design patterns and Redux for predictable state management. Features include dynamic product catalogs fetched from REST APIs, an interactive menu system, store locator, customer testimonials, and a comprehensive about section. Architected with scalability in mind using clean code principles and separation of concerns.",
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
        images: ["/projects/nion.webp"],
        technologies: ["React", "Vite", "Tailwind CSS", "DaisyUI", "REST API", "OOP", "Redux"],
        demoLink: "https://nioncoffee.store/",
        githubLink: "https://github.com/defaaryawar/nion-coffee"
    },
    {
        slug: "todolist-app",
        title: "TodoList App - Productivity Tool",
        titleId: "TodoList App - Alat Produktivitas",
        description: "A simple yet powerful task management application with full CRUD capabilities for creating, reading, updating, and deleting tasks. Built with a modern full-stack approach: React and TailwindCSS deliver a responsive, intuitive frontend interface with task filtering, priority levels, and completion tracking. The Python backend (Flask/FastAPI) provides a robust REST API layer connected to PostgreSQL for persistent data storage. Comes with clean, comprehensive API documentation for easy onboarding and future scalability, making it an excellent reference project for full-stack development fundamentals.",
        descriptionId: "Aplikasi TodoList yang sederhana namun powerful dengan kemampuan CRUD penuh, dibangun menggunakan React dan TailwindCSS di frontend, serta backend Python dengan PostgreSQL.",
        detailDescription: `TodoList App adalah aplikasi manajemen tugas full-stack yang mendemonstrasikan fundamental pengembangan web modern dengan implementasi CRUD yang solid.

**Fitur Aplikasi:**
- Create, Read, Update, Delete (CRUD) tugas secara lengkap
- Task filtering berdasarkan status (All, Active, Completed)
- Priority levels (Low, Medium, High) dengan visual indicators
- Completion tracking dengan progress bar
- Responsive interface yang nyaman di mobile dan desktop

**Full-Stack Architecture:**
- Frontend: React + TailwindCSS untuk UI yang modern dan responsif
- Backend: Python (Flask/FastAPI) untuk REST API yang robust
- Database: PostgreSQL untuk persistent data storage
- API Documentation: Swagger/OpenAPI untuk onboarding yang mudah

**Aspek Pembelajaran:**
- Implementasi RESTful API dari nol dengan Python
- Database design dan migrations dengan PostgreSQL
- Frontend state management patterns
- API documentation best practices
- Error handling dan validation di kedua sisi (frontend & backend)

**Mengapa Project Ini Penting:**
Meskipun sederhana secara konsep, TodoList App ini menjadi referensi yang excellent untuk memahami fundamental full-stack development, mulai dari database design hingga responsive UI implementation.`,
        images: ["/projects/todo.webp"],
        technologies: ["React", "Tailwind CSS", "Python (Flask/FastAPI)", "PostgreSQL", "CRUD", "Documentation"],
        githubLink: "https://github.com/defaaryawar/Todo-app-list"
    },
];