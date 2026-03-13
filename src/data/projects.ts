export const projects = [
    {
        title: "APMA - Automated Teaching Module Generator",
        titleId: "APMA - Pembuat Modul Ajar Otomatis",
        description: "An AI-powered SaaS platform designed to help Indonesian teachers create complete, professional teaching modules (Modul Ajar) and exam questions in just minutes. Fully compliant with both Kurikulum Merdeka and K13 standards, it supports all education levels from PAUD to SMA/SMK. Features include flexible export to Word (.docx) and PDF formats, deep customization of module structure, and AI-generated content covering core materials, learning activities, assessments, remedial plans, and reflections. Built to cut administrative workload by up to 90%, letting educators focus on actual teaching.",
        descriptionId: "Platform SaaS berbasis AI yang membantu guru Indonesia membuat Modul Ajar lengkap dan profesional dalam hitungan menit. Sesuai Kurikulum Merdeka & K13, menawarkan kustomisasi mendalam dan berbagai format ekspor.",
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
        title: "SoftShop - Mini Ecommerce System",
        titleId: "SoftShop - Sistem Ecommerce Mini",
        description: "A comprehensive ecommerce ecosystem built with a multi-service monolithic architecture using Golang and NestJS on the backend. The project spans 3 independent backend services and 3 separate frontend applications: a customer-facing storefront with product browsing, cart management, and checkout flow; an internal admin panel for inventory management, order processing, and analytics; and a dedicated courier system featuring real-time delivery tracking via WebSocket and Server-Sent Events (SSE). Utilizes PostgreSQL with Supabase, RabbitMQ for message queuing, Redis for caching, and Cloudinary for media management.",
        descriptionId: "Sistem ecommerce lengkap dengan arsitektur monolitik multi-layanan. Bertanggung jawab membangun 3 layanan backend dan 3 aplikasi frontend, termasuk fitur pengguna eksternal, panel admin internal, serta sistem kurir dengan pelacakan real-time.",
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
        title: "Deflix - Movie Trailer App",
        titleId: "Deflix - Aplikasi Trailer Film",
        description: "A Netflix-inspired movie discovery platform for browsing, searching, and watching trailers powered by the TMDB API. Features include trending movies, genre-based filtering, detailed movie information pages with cast and crew data, and embedded trailer playback. Built as a full-stack application with Next.js on the frontend and NestJS as the backend API layer, using PostgreSQL for persistent data storage, Redux for state management, and Docker for containerized deployment. Designed as a learning project to master modern full-stack development patterns.",
        descriptionId: "Platform penemuan film terinspirasi Netflix untuk menjelajah, mencari, dan menonton trailer menggunakan API TMDB, dibangun sebagai aplikasi full-stack dengan Next.js, NestJS, PostgreSQL, dan Docker.",
        images: ["/projects/deflix.webp"],
        technologies: ["Next.js", "NestJS", "PostgreSQL", "TMDB API", "Redux", "Docker"],
        demoLink: "https://deflix-three.vercel.app/",
        githubLink: "https://github.com/defaaryawar/deflix-frontend"
    },
    {
        title: "Def-AnimeList - Anime Explorer App",
        titleId: "AnimeList - Aplikasi Penjelajah Anime",
        description: "A feature-rich anime discovery application that lets users explore top-rated, popular, and recommended anime titles. Integrates with public anime APIs (Jikan/MyAnimeList) to display detailed information including synopses, ratings, episode counts, and genre categories. Features a clean, modern interface with responsive card layouts, search functionality, and pagination. Built with Next.js for server-side rendering and optimized performance, styled with Tailwind CSS and DaisyUI components, and fully typed with TypeScript for maintainable code.",
        descriptionId: "Aplikasi penjelajah anime dengan antarmuka modern yang terintegrasi API publik anime untuk menampilkan informasi detail termasuk sinopsis, rating, dan kategori genre.",
        images: ["/projects/animelist.webp"],
        technologies: ["Next.js", "React", "Tailwind CSS", "DaisyUI", "TypeScript", "Anime API"],
        demoLink: "https://def-anime.vercel.app/",
        githubLink: "https://github.com/defaaryawar/def-anime"
    },
    {
        title: "Jaya Mandiri - Admin Dashboard",
        titleId: "Jaya Mandiri - Dashboard Admin",
        description: "A modern, responsive admin dashboard application for managing delivery operations at Jaya Mandiri. Features include comprehensive CRUD operations for shipment tracking, driver management, and route optimization. Built with a React (Vite) frontend providing a fast, interactive UI with reusable component architecture, and a NestJS backend with RESTful API endpoints. Uses PostgreSQL for relational data storage and includes extensive unit testing with Jest to ensure code reliability. Implements custom React hooks for data fetching and state management patterns.",
        descriptionId: "Dashboard admin yang modern dan responsif untuk mengelola pengiriman di Jaya Mandiri, dibangun dengan frontend React (Vite) dan backend NestJS, menggunakan PostgreSQL dan pengujian unit dengan Jest.",
        images: ["/projects/admin-jm.webp"],
        technologies: ["React", "Vite", "NestJS", "PostgreSQL", "Jest", "Hooks"],
        githubLink: "https://github.com/defaaryawar/dashboard-jaya-mandiri"
    },
    {
        title: "Jaya Mandiri - Company Profile",
        titleId: "Jaya Mandiri - Profil Perusahaan",
        description: "A clean and professionally designed company profile website for Jaya Mandiri logistics services. Features a polished landing page with smooth scroll animations, service showcases, company history timeline, team profiles, and a contact section. Built with React and styled using TailwindCSS and Shadcn UI for a consistent, premium design system. Implements a modular component architecture with reusable UI elements, responsive layouts optimized for all screen sizes, and performant asset loading for a seamless browsing experience.",
        descriptionId: "Website profil perusahaan yang bersih dan responsif untuk Jaya Mandiri, dibangun dengan React, TailwindCSS, dan Shadcn UI menggunakan komponen modular dan tampilan modern.",
        images: ["/projects/jayamandiri.webp"],
        technologies: ["React", "Tailwind CSS", "Shadcn UI"],
        demoLink: "https://jaya-mandiri.vercel.app/",
        githubLink: "https://github.com/defaaryawar/jaya-mandiri"
    },
    {
        title: "Nion Coffee - Company Profile",
        titleId: "Nion Coffee - Profil Perusahaan",
        description: "A fully-featured and scalable company profile application for Nion Coffee, one of the most complete and polished projects in the portfolio. Built with React and Vite for blazing-fast performance, styled with TailwindCSS and DaisyUI for a rich, caf\u00e9-inspired aesthetic. Implements proper OOP design patterns and Redux for predictable state management. Features include dynamic product catalogs fetched from REST APIs, an interactive menu system, store locator, customer testimonials, and a comprehensive about section. Architected with scalability in mind using clean code principles and separation of concerns.",
        descriptionId: "Aplikasi profil perusahaan yang kaya fitur dan scalable untuk Nion Coffee, menggunakan React dengan Vite, TailwindCSS, DaisyUI, REST API, serta arsitektur solid dengan pendekatan OOP dan Redux.",
        images: ["/projects/nion.webp"],
        technologies: ["React", "Vite", "Tailwind CSS", "DaisyUI", "REST API", "OOP", "Redux"],
        demoLink: "https://nioncoffee.store/",
        githubLink: "https://github.com/defaaryawar/nion-coffee"
    },
    {
        title: "TodoList App - Productivity Tool",
        titleId: "TodoList App - Alat Produktivitas",
        description: "A simple yet powerful task management application with full CRUD capabilities for creating, reading, updating, and deleting tasks. Built with a modern full-stack approach: React and TailwindCSS deliver a responsive, intuitive frontend interface with task filtering, priority levels, and completion tracking. The Python backend (Flask/FastAPI) provides a robust REST API layer connected to PostgreSQL for persistent data storage. Comes with clean, comprehensive API documentation for easy onboarding and future scalability, making it an excellent reference project for full-stack development fundamentals.",
        descriptionId: "Aplikasi TodoList yang sederhana namun powerful dengan kemampuan CRUD penuh, dibangun menggunakan React dan TailwindCSS di frontend, serta backend Python dengan PostgreSQL.",
        images: ["/projects/todo.webp"],
        technologies: ["React", "Tailwind CSS", "Python (Flask/FastAPI)", "PostgreSQL", "CRUD", "Documentation"],
        githubLink: "https://github.com/defaaryawar/Todo-app-list"
    },
];