export const projects = [
    {
        title: "APMA - Automated Teaching Module Generator",
        titleId: "APMA - Pembuat Modul Ajar Otomatis",
        description: "An AI-powered SaaS platform that helps Indonesian teachers create professional teaching modules (Modul Ajar) in minutes. Compliant with Merdeka Curriculum & K13, offers deep customization and various export formats.",
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
        description: "A full-featured ecommerce system built with a multi-service monolithic architecture. Responsible for building 3 backend services and 3 frontend applications, including external user features, internal admin panel, and courier system with real-time tracking.",
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
        description: "A Netflix-like UI for browsing and watching trailers using TMDB API, built for learning with Next.js, NestJS, PostgreSQL, and Docker.",
        descriptionId: "Tampilan mirip Netflix untuk menjelajah dan menonton trailer menggunakan API TMDB, dibuat untuk keperluan belajar dengan Next.js, NestJS, PostgreSQL, dan Docker.",
        images: ["/projects/deflix.webp"],
        technologies: ["Next.js", "NestJS", "PostgreSQL", "TMDB API", "Redux", "Docker"],
        demoLink: "https://deflix-three.vercel.app/",
        githubLink: "https://github.com/defaaryawar/deflix-frontend"
    },
    {
        title: "Def-AnimeList - Anime Explorer App",
        titleId: "AnimeList - Aplikasi Penjelajah Anime",
        description: "Simple anime listing app using public anime APIs with a modern interface built using Next.js, Tailwind CSS, DaisyUI, and TypeScript.",
        descriptionId: "Aplikasi daftar anime sederhana dengan antarmuka modern, dibangun menggunakan Next.js, Tailwind CSS, DaisyUI, dan TypeScript dengan integrasi API publik anime.",
        images: ["/projects/animelist.webp"],
        technologies: ["Next.js", "React", "Tailwind CSS", "DaisyUI", "TypeScript", "Anime API"],
        demoLink: "https://def-anime.vercel.app/",
        githubLink: "https://github.com/defaaryawar/def-anime"
    },
    {
        title: "Jaya Mandiri - Admin Dashboard",
        titleId: "Jaya Mandiri - Dashboard Admin",
        description: "A modern and responsive admin dashboard for managing deliveries at Jaya Mandiri, built with React (Vite) frontend and NestJS backend, featuring PostgreSQL and unit testing with Jest.",
        descriptionId: "Dashboard admin yang modern dan responsif untuk mengelola pengiriman di Jaya Mandiri, dibangun dengan frontend React (Vite) dan backend NestJS, menggunakan PostgreSQL dan pengujian unit dengan Jest.",
        images: ["/projects/admin-jm.webp"],
        technologies: ["React", "Vite", "NestJS", "PostgreSQL", "Jest", "Hooks"],
        githubLink: "https://github.com/defaaryawar/dashboard-jaya-mandiri"
    },
    {
        title: "Jaya Mandiri - Company Profile",
        titleId: "Jaya Mandiri - Profil Perusahaan",
        description: "A clean and responsive company profile website for Jaya Mandiri, built using React, TailwindCSS, and Shadcn UI with smooth layout and modular components.",
        descriptionId: "Website profil perusahaan yang bersih dan responsif untuk Jaya Mandiri, dibangun dengan React, TailwindCSS, dan Shadcn UI menggunakan komponen modular dan tampilan modern.",
        images: ["/projects/jayamandiri.webp"],
        technologies: ["React", "Tailwind CSS", "Shadcn UI"],
        demoLink: "https://jaya-mandiri.vercel.app/",
        githubLink: "https://github.com/defaaryawar/jaya-mandiri"
    },
    {
        title: "Nion Coffee - Company Profile",
        titleId: "Nion Coffee - Profil Perusahaan",
        description: "A fully-featured and scalable company profile app for Nion Coffee, leveraging React with Vite, TailwindCSS, DaisyUI, REST API, and solid architecture using OOP and Redux. One of the most complete and polished projects.",
        descriptionId: "Aplikasi profil perusahaan yang kaya fitur dan scalable untuk Nion Coffee, menggunakan React dengan Vite, TailwindCSS, DaisyUI, REST API, serta arsitektur solid dengan pendekatan OOP dan manajemen state menggunakan Redux. Salah satu proyek paling lengkap dan matang.",
        images: ["/projects/nion.webp"],
        technologies: ["React", "Vite", "Tailwind CSS", "DaisyUI", "REST API", "OOP", "Redux"],
        demoLink: "https://nioncoffee.store/",
        githubLink: "https://github.com/defaaryawar/nion-coffee"
    },
    {
        title: "TodoList App - Productivity Tool",
        titleId: "TodoList App - Alat Produktivitas",
        description: "A simple yet powerful TodoList application with full CRUD capabilities, built using React and TailwindCSS on the frontend, and Python backend with PostgreSQL. Includes clean and comprehensive documentation for easy understanding and scalability.",
        descriptionId: "Aplikasi TodoList yang sederhana namun powerful dengan kemampuan CRUD penuh, dibangun menggunakan React dan TailwindCSS di frontend, serta backend Python dengan PostgreSQL. Didukung dokumentasi lengkap dan rapi untuk kemudahan pengembangan dan skalabilitas.",
        images: ["/projects/todo.webp"],
        technologies: ["React", "Tailwind CSS", "Python (Flask/FastAPI)", "PostgreSQL", "CRUD", "Documentation"],
        githubLink: "https://github.com/defaaryawar/Todo-app-list"
    },
];