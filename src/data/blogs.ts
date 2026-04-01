export interface BlogPost {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  coverImage: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export const blogs: BlogPost[] = [
  {
    slug: "membangun-saas-pertama-dengan-nextjs",
    title: "Membangun SaaS Pertama dengan Next.js — Pelajaran dari APMA",
    titleEn: "Building Your First SaaS with Next.js — Lessons from APMA",
    excerpt:
      "Cerita di balik layar bagaimana saya membangun platform SaaS pertama untuk membantu guru Indonesia membuat modul ajar otomatis menggunakan AI.",
    excerptEn:
      "A behind-the-scenes look at how I built my first SaaS platform to help Indonesian teachers create automated teaching modules using AI.",
    content: `Membangun produk SaaS dari nol adalah pengalaman yang mengubah cara pandang saya terhadap software engineering. APMA (Automated Professional Module Author) adalah proyek yang lahir dari keresahan melihat guru-guru Indonesia menghabiskan berjam-jam untuk membuat modul ajar secara manual.

**Mengapa Saya Membangun APMA?**

Ide ini muncul ketika saya melihat betapa repetitifnya proses pembuatan modul ajar. Setiap guru harus mengikuti format tertentu sesuai Kurikulum Merdeka, dan prosesnya bisa memakan waktu 4-6 jam per modul. Saya berpikir: "Bagaimana kalau AI bisa membantu?"

**Tech Stack yang Dipilih**

Saya memilih Next.js sebagai framework utama karena beberapa alasan:
- Server-Side Rendering untuk SEO yang optimal
- API Routes untuk backend logic tanpa server terpisah
- Built-in image optimization
- Vercel deployment yang seamless

**Tantangan Terbesar: Streaming AI Response**

Salah satu tantangan teknis terbesar adalah mengimplementasikan streaming response dari OpenAI API. User tidak mau menunggu 30 detik untuk melihat hasil — mereka ingin melihat teks yang dihasilkan secara real-time, seperti ChatGPT.

Solusinya adalah menggunakan Server-Sent Events (SSE):
- Frontend membuka koneksi SSE ke API route
- Backend melakukan streaming dari OpenAI API
- Setiap chunk langsung dikirim ke frontend
- UI di-update secara incremental

**Prompt Engineering: Seni yang Sering Diremehkan**

Prompt engineering ternyata jauh lebih kompleks dari yang saya bayangkan. Untuk menghasilkan modul ajar yang berkualitas, saya harus:
- Merancang system prompt yang sangat detail
- Menambahkan contoh output yang diharapkan
- Iterasi puluhan kali untuk mendapatkan format yang konsisten
- Menangani edge cases seperti mata pelajaran yang berbeda

**Pelajaran Penting**

1. **Start Small, Iterate Fast** — Versi pertama APMA sangat sederhana. Hanya bisa membuat satu jenis modul. Tapi itu cukup untuk mendapatkan feedback dari pengguna awal.

2. **User Feedback is Gold** — Guru-guru memberikan insight yang tidak pernah saya pikirkan. Misalnya, mereka butuh format ekspor ke Word, bukan hanya PDF.

3. **Performance Matters** — Tidak ada yang mau menunggu. Setiap detik loading time bisa membuat user pergi.

4. **Security First** — Mengelola API keys, user sessions, dan data sensitif di SaaS membutuhkan perhatian ekstra.

**Kesimpulan**

Membangun SaaS pertama mengajarkan saya bahwa coding hanyalah 30% dari keseluruhan proses. Sisanya adalah memahami masalah pengguna, merancang solusi yang tepat, dan iterasi tanpa henti. APMA sekarang sudah membantu ratusan guru memangkas waktu pembuatan modul ajar hingga 90%.`,
    contentEn: `Building a SaaS product from scratch was an experience that changed my perspective on software engineering. APMA (Automated Professional Module Author) was a project born out of frustration seeing Indonesian teachers spend hours creating teaching modules manually.

**Why Did I Build APMA?**

The idea emerged when I saw how repetitive the process of creating teaching modules was. Every teacher follows a specific format according to Kurikulum Merdeka, and the process could take 4-6 hours per module. I thought: "What if AI could help?"

**Chosen Tech Stack**

I chose Next.js as the primary framework for several reasons:
- Server-Side Rendering for optimal SEO
- API Routes for backend logic without a separate server
- Built-in image optimization
- Seamless Vercel deployment

**Biggest Challenge: Streaming AI Response**

One of the biggest technical challenges was implementing streaming responses from the OpenAI API. Users don't want to wait 30 seconds to see results — they want to see the text generated in real-time, just like ChatGPT.

The solution was to use Server-Sent Events (SSE):
- Frontend opens an SSE connection to the API route
- Backend streams from the OpenAI API
- Each chunk is immediately sent to the frontend
- UI is updated incrementally

**Prompt Engineering: An Often Underrated Art**

Prompt engineering turned out to be far more complex than I imagined. To produce high-quality teaching modules, I had to:
- Design very detailed system prompts
- Add expected output examples
- Iterate dozens of times to get a consistent format
- Handle edge cases like different subjects

**Important Lessons**

1. **Start Small, Iterate Fast** — The first version of APMA was very simple. It could only create one type of module. But it was enough to get feedback from early users.

2. **User Feedback is Gold** — Teachers provided insights I never thought of. For example, they needed Word export format, not just PDF.

3. **Performance Matters** — No one wants to wait. Every second of loading time can drive users away.

4. **Security First** — Managing API keys, user sessions, and sensitive data in SaaS requires extra attention.

**Conclusion**

Building my first SaaS taught me that coding is only 30% of the entire process. The rest is understanding user problems, designing the right solution, and iterating relentlessly. APMA has now helped hundreds of teachers cut down module creation time by up to 90%.`,
    coverImage: "/projects/apma-thumbnail.webp",
    author: "Defaaryawar",
    date: "2025-03-15",
    readTime: "8 min",
    tags: ["Next.js", "SaaS", "AI", "OpenAI"],
    featured: true,
  },
  {
    slug: "arsitektur-microservice-vs-monolith",
    title: "Microservice vs Monolith — Kapan Harus Pakai Yang Mana?",
    titleEn: "Microservice vs Monolith — When Should You Use Which?",
    excerpt:
      "Pengalaman nyata membangun sistem ecommerce dengan arsitektur multi-service dan pelajaran yang didapat dari setiap pendekatan.",
    excerptEn:
      "Real-world experience building an ecommerce system with multi-service architecture and the lessons learned from each approach.",
    content: `Perdebatan antara microservice dan monolith sudah berlangsung bertahun-tahun. Tapi setelah membangun SoftShop — sebuah ekosistem ecommerce dengan 3 backend services dan 3 frontend apps — saya punya perspektif yang lebih nuanced.

**Apa yang Saya Bangun?**

SoftShop adalah sistem ecommerce lengkap dengan:
- Customer storefront untuk browsing dan checkout
- Admin panel untuk manajemen inventaris
- Courier system dengan real-time tracking

Awalnya saya membangun semuanya sebagai monolith. Tapi seiring bertambahnya fitur, saya memutuskan untuk memecahnya menjadi layanan terpisah.

**Kapan Monolith Lebih Masuk Akal?**

Monolith cocok ketika:
- Tim development kecil (1-5 orang)
- Fitur masih dalam tahap eksplorasi
- Deployment perlu cepat dan sederhana
- Shared database masih manageable

**Kapan Beralih ke Microservice?**

Tanda-tanda waktunya beralih:
- Deploy satu fitur kecil harus re-deploy seluruh sistem
- Scaling kebutuhan yang berbeda antar modul
- Tim yang membesar dan butuh ownership terpisah
- Technical debt yang semakin sulit dikelola

**Message Queue: RabbitMQ sebagai Penghubung**

Salah satu komponen kunci dalam arsitektur multi-service adalah message queue. RabbitMQ membantu:
- Komunikasi asinkron antar layanan
- Retry mechanism untuk operasi yang gagal
- Event-driven architecture yang loosely coupled

**Real-time Tracking: WebSocket + SSE**

Untuk fitur courier tracking, saya mengkombinasikan WebSocket dan Server-Sent Events:
- WebSocket untuk komunikasi dua arah (update lokasi kurir)
- SSE sebagai fallback yang lebih ringan untuk client yang hanya perlu menerima update

**Pelajaran Utama**

1. **Jangan over-engineer** — Mulai dengan monolith, pecah ketika ada alasan yang jelas
2. **Data consistency itu sulit** — Eventual consistency membutuhkan mindset yang berbeda
3. **Monitoring is essential** — Tanpa observability yang baik, debugging microservice itu mimpi buruk
4. **Communication overhead** — Network calls antar service menambah latency

**Kesimpulan**

Tidak ada arsitektur yang "benar" secara universal. Yang penting adalah memahami tradeoff dari setiap pendekatan dan memilih berdasarkan kebutuhan aktual, bukan tren.`,
    contentEn: `The debate between microservices and monoliths has been going on for years. But after building SoftShop — an ecommerce ecosystem with 3 backend services and 3 frontend apps — I have a more nuanced perspective.

**What Did I Build?**

SoftShop is a complete ecommerce system with:
- Customer storefront for browsing and checkout
- Admin panel for inventory management
- Courier system with real-time tracking

Initially, I built everything as a monolith. But as features grew, I decided to break it down into separate services.

**When Does a Monolith Make More Sense?**

A monolith is suitable when:
- The development team is small (1-5 people)
- Features are still in the exploration stage
- Deployment needs to be fast and simple
- Shared database is still manageable

**When to Switch to Microservices?**

Signs it's time to switch:
- Deploying one small feature requires re-deploying the entire system
- Scaling needs differ between modules
- The team is growing and needs separate ownership
- Technical debt is becoming increasingly difficult to manage

**Message Queue: RabbitMQ as a Connector**

One of the key components in a multi-service architecture is the message queue. RabbitMQ helps with:
- Asynchronous communication between services
- Retry mechanism for failed operations
- Loosely coupled event-driven architecture

**Real-time Tracking: WebSocket + SSE**

For the courier tracking feature, I combined WebSockets and Server-Sent Events:
- WebSocket for two-way communication (courier location updates)
- SSE as a lighter fallback for clients who only need to receive updates

**Main Lessons**

1. **Don't over-engineer** — Start with a monolith, break it down when there's a clear reason
2. **Data consistency is hard** — Eventual consistency requires a different mindset
3. **Monitoring is essential** — Without good observability, debugging microservices is a nightmare
4. **Communication overhead** — Network calls between services add latency

**Conclusion**

There is no universally "right" architecture. What matters is understanding the tradeoffs of each approach and choosing based on actual needs, not trends.`,
    coverImage:
      "https://www.sparkfabrik.com/images/blog/microservices-and-cloud-native-applications-vs-monolithic-applications/monolothic-microservices-image-articles.png",
    author: "Defaaryawar",
    date: "2025-02-28",
    readTime: "7 min",
    tags: ["Architecture", "Microservice", "Backend", "RabbitMQ"],
    featured: false,
  },
  {
    slug: "tips-react-performance-optimization",
    title: "7 Tips React Performance yang Sering Diabaikan Developer",
    titleEn: "7 React Performance Tips Often Ignored by Developers",
    excerpt:
      "Kumpulan teknik optimasi performa React yang sudah saya terapkan di berbagai proyek nyata, dari lazy loading hingga memoization.",
    excerptEn:
      "A collection of React performance optimization techniques I've applied in various real projects, from lazy loading to memoization.",
    content: `Performa adalah salah satu aspek yang sering dikorbankan demi kecepatan development. Padahal, di dunia nyata, setiap milidetik loading time bisa berdampak pada user retention. Berikut 7 tips yang sudah saya terapkan di berbagai proyek.

**1. Lazy Loading Components**

Jangan load semua komponen sekaligus. Gunakan React.lazy() dan Suspense untuk memuat komponen hanya ketika dibutuhkan.

Ini sangat efektif untuk:
- Route-based code splitting
- Modal dan dialog yang jarang dibuka
- Tab content yang tidak langsung terlihat

**2. Memoization dengan useMemo dan useCallback**

Tidak semua re-render itu buruk, tapi re-render yang tidak perlu bisa memperlambat aplikasi secara signifikan.

Gunakan useMemo untuk:
- Komputasi berat yang hasilnya jarang berubah
- Derived state dari props atau state yang kompleks

Gunakan useCallback untuk:
- Event handler yang di-pass sebagai prop
- Dependencies di useEffect yang stabil

**3. Virtualization untuk List Panjang**

Jika menampilkan ratusan atau ribuan item, jangan render semuanya. Gunakan library seperti react-window atau react-virtualized.

Benefit utama:
- Hanya render item yang terlihat di viewport
- Memory usage yang jauh lebih rendah
- Scroll yang tetap smooth

**4. Image Optimization**

Gambar sering menjadi bottleneck terbesar. Tips:
- Gunakan format modern: WebP atau AVIF
- Implementasi lazy loading native dengan loading="lazy"
- Responsive images dengan srcset
- Placeholder blur saat loading

**5. Debounce dan Throttle**

Untuk event yang trigger terus-menerus seperti scroll, resize, dan input:
- Debounce: Tunggu user selesai mengetik sebelum melakukan action
- Throttle: Batasi eksekusi ke interval tertentu

**6. Bundle Analysis**

Secara berkala analisis bundle size dengan tools seperti:
- webpack-bundle-analyzer
- source-map-explorer
- Vite's built-in rollup-plugin-visualizer

Sering kali ada library besar yang bisa diganti dengan alternatif yang lebih ringan.

**7. State Management yang Tepat**

Tidak semua state perlu di global store:
- Local state → useState
- Shared state antar sibling → lift state up
- Global state → Context API atau Redux (hanya jika benar-benar perlu)
- Server state → React Query / TanStack Query

**Kesimpulan**

Optimasi performa bukan one-time task, tapi proses berkelanjutan. Mulai dari mengukur (profiling), identifikasi bottleneck, lalu optimalkan secara targeted. Jangan optimasi prematur, tapi juga jangan abaikan sampai terlambat.`,
    contentEn: `Performance is one aspect often sacrificed for development speed. Yet, in the real world, every millisecond of loading time can impact user retention. Here are 7 tips I've implemented in various projects.

**1. Lazy Loading Components**

Don't load all components at once. Use React.lazy() and Suspense to load components only when needed.

This is highly effective for:
- Route-based code splitting
- Rarely opened modals and dialogs
- Tab content that isn't immediately visible

**2. Memoization with useMemo and useCallback**

Not every re-render is bad, but unnecessary re-renders can significantly slow down an application.

Use useMemo for:
- Heavy computations whose results rarely change
- Derived state from complex props or state

Use useCallback for:
- Event handlers passed as props
- Stable dependencies in useEffect

**3. Virtualization for Long Lists**

If displaying hundreds or thousands of items, don't render them all. Use libraries like react-window or react-virtualized.

Main benefits:
- Only render items visible in the viewport
- Much lower memory usage
- Consistently smooth scrolling

**4. Image Optimization**

Images are often the biggest bottleneck. Tips:
- Use modern formats: WebP or AVIF
- Implement native lazy loading with loading="lazy"
- Responsive images with srcset
- Blur placeholders during loading

**5. Debounce and Throttle**

For events that trigger continuously like scroll, resize, and input:
- Debounce: Wait for the user to finish typing before performing an action
- Throttle: Limit execution to a certain interval

**6. Bundle Analysis**

Periodically analyze bundle size with tools like:
- webpack-bundle-analyzer
- source-map-explorer
- Vite's built-in rollup-plugin-visualizer

Often, large libraries can be replaced with lighter alternatives.

**7. Proper State Management**

Not all state belongs in a global store:
- Local state → useState
- Shared state between siblings → lift state up
- Global state → Context API or Redux (only if absolutely necessary)
- Server state → React Query / TanStack Query

**Conclusion**

Performance optimization isn't a one-time task but a continuous process. Start by measuring (profiling), identify bottlenecks, then optimize in a targeted manner. Don't optimize prematurely, but don't ignore it until it's too late.`,
    coverImage:
      "https://www.bigscal.com/wp-content/uploads/2023/11/Methods-of-how-to-Improve-and-Optimize-Performance-of-React-Application.png",
    author: "Defaaryawar",
    date: "2025-02-10",
    readTime: "6 min",
    tags: ["React", "Performance", "Frontend", "Optimization"],
    featured: false,
  },
  {
    slug: "fullstack-developer-roadmap-2026",
    title: "Roadmap Fullstack Developer 2026 — Dari Nol Sampai Production",
    titleEn: "Fullstack Developer Roadmap 2026 — From Zero to Production",
    excerpt:
      "Panduan lengkap untuk menjadi fullstack developer di tahun 2026, berdasarkan pengalaman dan tech stack yang actually dipakai di industri.",
    excerptEn:
      "A complete guide to becoming a fullstack developer in 2026, based on experience and the tech stack actually used in the industry.",
    content: `Menjadi fullstack developer di 2026 membutuhkan pemahaman yang luas tapi juga kedalaman di area tertentu. Berdasarkan pengalaman saya membangun berbagai proyek, berikut roadmap yang realistis.

**Phase 1: Foundation (Bulan 1-3)**

Fondasi yang kuat adalah segalanya. Fokus pada:
- HTML semantik dan accessibility
- CSS modern (Flexbox, Grid, Custom Properties)
- JavaScript ES6+ secara mendalam
- Git dan version control workflow

Jangan skip fondasi ini. Saya melihat banyak developer yang langsung lompat ke framework tapi struggle dengan konsep dasar.

**Phase 2: Frontend Framework (Bulan 3-6)**

Pilih satu framework dan kuasai:
- React (recommended) — Ekosistem terbesar, paling banyak job opportunity
- Vue.js — Learning curve lebih gentle
- Svelte — Pendekatan yang fresh dan performant

Yang harus dikuasai di React:
- Component lifecycle dan hooks
- State management patterns
- Routing (React Router)
- API integration dan data fetching

**Phase 3: Backend Development (Bulan 6-9)**

Pilih bahasa backend:
- Node.js (Express/NestJS) — Natural buat yang sudah bisa JavaScript
- Python (Django/FastAPI) — Great untuk data-heavy apps
- Go — Performa tinggi, concurrency yang elegant

Yang harus dikuasai:
- RESTful API design
- Database design (PostgreSQL recommended)
- Authentication dan authorization
- Error handling dan logging

**Phase 4: DevOps Basics (Bulan 9-10)**

Minimal harus tahu:
- Docker containerization
- CI/CD pipeline basics
- Cloud deployment (Vercel, Railway, atau AWS)
- Environment management

**Phase 5: Advanced Topics (Bulan 10-12)**

Setelah fondasi kuat, explore:
- TypeScript (harus di 2026)
- Testing (Unit, Integration, E2E)
- WebSocket untuk real-time features
- Caching strategies (Redis)
- Message queues untuk async processing

**Tech Stack Rekomendasi 2026**

Berdasarkan job market dan kebutuhan industri:
- Frontend: React/Next.js + TypeScript + Tailwind CSS
- Backend: NestJS atau Express.js
- Database: PostgreSQL + Redis
- Deployment: Docker + Vercel/Railway
- Testing: Jest + Playwright

**Tips Penting**

1. **Build projects, not tutorials** — Tutorial hell itu nyata. Setelah dasar paham, langsung build proyek nyata.
2. **Contribute to open source** — Cara terbaik belajar dari code yang sudah production-grade.
3. **Networking matters** — Ikuti komunitas, attend meetups, aktif di Twitter/LinkedIn.
4. **T-shaped skills** — Luas di banyak area, dalam di beberapa area spesifik.

**Kesimpulan**

Tidak ada shortcut untuk menjadi developer yang baik. Tapi dengan roadmap yang jelas dan konsistensi, 12 bulan sudah cukup untuk membangun fondasi yang solid sebagai fullstack developer.`,
    contentEn: `Being a fullstack developer in 2026 requires both broad understanding and depth in specific areas. Based on my experience building various projects, here is a realistic roadmap.

**Phase 1: Foundation (Months 1-3)**

A strong foundation is everything. Focus on:
- Semantic HTML and accessibility
- Modern CSS (Flexbox, Grid, Custom Properties)
- In-depth JavaScript ES6+
- Git and version control workflow

Don't skip this foundation. I see many developers jumping straight into frameworks only to struggle with basic concepts.

**Phase 2: Frontend Framework (Months 3-6)**

Choose one framework and master it:
- React (recommended) — Largest ecosystem, most job opportunities
- Vue.js — Gentler learning curve
- Svelte — A fresh and performant approach

What to master in React:
- Component lifecycle and hooks
- State management patterns
- Routing (React Router)
- API integration and data fetching

**Phase 3: Backend Development (Months 6-9)**

Choose a backend language:
- Node.js (Express/NestJS) — Natural for those who already know JavaScript
- Python (Django/FastAPI) — Great for data-heavy apps
- Go — High performance, elegant concurrency

What to master:
- RESTful API design
- Database design (PostgreSQL recommended)
- Authentication and authorization
- Error handling and logging

**Phase 4: DevOps Basics (Months 9-10)**

At the minimum, know:
- Docker containerization
- CI/CD pipeline basics
- Cloud deployment (Vercel, Railway, or AWS)
- Environment management

**Phase 5: Advanced Topics (Months 10-12)**

After a strong foundation, explore:
- TypeScript (a must in 2026)
- Testing (Unit, Integration, E2E)
- WebSockets for real-time features
- Caching strategies (Redis)
- Message queues for async processing

**Recommended Tech Stack 2026**

Based on the job market and industry needs:
- Frontend: React/Next.js + TypeScript + Tailwind CSS
- Backend: NestJS or Express.js
- Database: PostgreSQL + Redis
- Deployment: Docker + Vercel/Railway
- Testing: Jest + Playwright

**Important Tips**

1. **Build projects, not tutorials** — Tutorial hell is real. Once the basics are understood, immediately build a real project.
2. **Contribute to open source** — The best way to learn from production-grade code.
3. **Networking matters** — Follow communities, attend meetups, be active on Twitter/LinkedIn.
4. **T-shaped skills** — Broad in many areas, deep in a few specific ones.

**Conclusion**

There are no shortcuts to becoming a good developer. But with a clear roadmap and consistency, 12 months is enough to build a solid foundation as a fullstack developer.`,
    coverImage:
      "https://cambridgeinfotech.io/wp-content/uploads/2026/01/Full-Stack-Developer-Roadmap-in-2026.jpg-1200x900.jpeg",
    author: "Defaaryawar",
    date: "2025-01-20",
    readTime: "10 min",
    tags: ["Career", "Fullstack", "Roadmap", "Guide"],
    featured: false,
  },
  {
    slug: "typescript-tips-untuk-developer-indonesia",
    title: "TypeScript Tips yang Bikin Code Lebih Clean dan Aman",
    titleEn: "TypeScript Tips that Make Your Code Cleaner and Safer",
    excerpt:
      "Kumpulan tips TypeScript praktis yang bisa langsung diterapkan di proyek React kamu, dari generic types sampai utility types.",
    excerptEn:
      "A collection of practical TypeScript tips that can be directly applied to your React projects, from generic types to utility types.",
    content: `TypeScript bukan lagi optional di 2026 — ini sudah menjadi standar industri. Setelah menggunakan TypeScript di hampir semua proyek, berikut tips yang paling berdampak.

**Mengapa TypeScript?**

Sebelum masuk ke tips, mari pahami value proposition-nya:
- Catch bugs sebelum runtime
- IntelliSense dan autocomplete yang powerful
- Self-documenting code melalui types
- Refactoring yang lebih aman

**1. Gunakan Interface untuk Object Shapes**

Interface lebih baik dari type alias untuk mendefinisikan shapes karena bisa di-extend dan di-merge. Gunakan interface ketika mendefinisikan bentuk data yang akan sering digunakan.

**2. Discriminated Unions untuk State Management**

Pattern ini sangat powerful untuk mengelola state yang memiliki beberapa kemungkinan bentuk, seperti loading state, success state, dan error state. TypeScript akan memastikan setiap case di-handle dengan benar.

**3. Utility Types yang Sering Dipakai**

TypeScript punya built-in utility types yang sangat berguna:
- Partial<T> — Membuat semua property optional
- Required<T> — Membuat semua property required
- Pick<T, K> — Memilih property tertentu dari sebuah type
- Omit<T, K> — Menghapus property tertentu dari sebuah type
- Record<K, V> — Membuat object type dengan key dan value type tertentu

**4. Generic Types untuk Reusability**

Generic memungkinkan kita membuat komponen dan fungsi yang type-safe tapi tetap fleksibel. Contoh klasik adalah API response wrapper yang bisa digunakan untuk berbagai jenis response data.

**5. Const Assertions**

Keyword 'as const' sangat berguna untuk:
- Array yang tidak boleh dimodifikasi
- Object literals yang harus precise
- Enum-like patterns tanpa enum

**6. Type Guards**

Type guards membantu TypeScript mempersempit type dalam conditional blocks. Bisa menggunakan typeof, instanceof, atau custom type guard functions with 'is' keyword.

**7. Template Literal Types**

Fitur yang sering diabaikan tapi sangat powerful untuk membuat type dari kombinasi string. Sangat berguna untuk event names, CSS values, and API endpoint patterns.

**Kesimpulan**

TypeScript memang menambah sedikit overhead di awal, tapi return on investment-nya sangat besar. Code yang lebih aman, lebih mudah di-maintain, dan developer experience yang jauh lebih baik. Mulai dari tips sederhana, lalu gradually adopt yang lebih advanced.`,
    contentEn: `TypeScript is no longer optional in 2026 — it has become the industry standard. After using TypeScript in almost every project, here are the tips with the biggest impact.

**Why TypeScript?**

Before diving into the tips, let's understand the value proposition:
- Catch bugs before runtime
- Powerful IntelliSense and autocomplete
- Self-documenting code through types
- Safer refactoring

**1. Use Interfaces for Object Shapes**

Interfaces are better than type aliases for defining shapes because they can be extended and merged. Use interfaces when defining data shapes that will be used frequently.

**2. Discriminated Unions for State Management**

This pattern is very powerful for managing state with several possible shapes, such as loading state, success state, and error state. TypeScript will ensure that every case is handled correctly.

**3. Commonly Used Utility Types**

TypeScript has built-in utility types that are extremely useful:
- Partial<T> — Makes all properties optional
- Required<T> — Makes all properties required
- Pick<T, K> — Selects specific properties from a type
- Omit<T, K> — Removes specific properties from a type
- Record<K, V> — Creates an object type with specific key and value types

**4. Generic Types for Reusability**

Generics allow us to create components and functions that are type-safe but still flexible. A classic example is an API response wrapper that can be used for various types of response data.

**5. Const Assertions**

The 'as const' keyword is very useful for:
- Arrays that should not be modified
- Object literals that must be precise
- Enum-like patterns without using enums

**6. Type Guards**

Type guards help TypeScript narrow down types in conditional blocks. You can use typeof, instanceof, or custom type guard functions with the 'is' keyword.

**7. Template Literal Types**

A feature often ignored but very powerful for creating types from string combinations. Extremely useful for event names, CSS values, and API endpoint patterns.

**Conclusion**

TypeScript does add a bit of overhead initially, but the return on investment is huge. Safer code, easier maintenance, and a much better developer experience. Start with simple tips, then gradually adopt more advanced ones.`,
    coverImage:
      "https://media.licdn.com/dms/image/v2/C5612AQHm4GkIrMzBIQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1573486000286?e=2147483647&v=beta&t=z5Zf7ydiiIyoYUIAFYfodUF2l7q9slwetKxJ8cLxF0Y",
    author: "Defaaryawar",
    date: "2025-01-05",
    readTime: "7 min",
    tags: ["TypeScript", "React", "Tips", "Frontend"],
    featured: false,
  },
  {
    slug: "migrasi-pages-ke-app-router-nextjs",
    title: "Mengapa Saya Beralih ke App Router Next.js (dan Tips Migrasinya)",
    titleEn: "Why I Switched to Next.js App Router (and Migration Tips)",
    excerpt: "Sebuah catatan perjalanan memindahkan project SaaS dari Pages Router ke App Router, tantangan yang dihadapi, dan mengapa React Server Components (RSC) adalah masa depan.",
    excerptEn: "A travel log of moving a SaaS project from Pages Router to App Router, the challenges faced, and why React Server Components (RSC) are the future.",
    content: `Selama beberapa tahun terakhir, Pages Router Next.js telah menjadi standar de-facto untuk membangun aplikasi React yang SEO-friendly. Namun, rilisnya Next.js 13 dengan App Router dan React Server Components (RSC) mengubah paradigma tersebut.
    
**Kenapa Harus Pindah?**

Awalnya saya skeptis. "Kalau tidak rusak, kenapa diperbaiki?" Pikir saya. Tapi setelah mencoba membangun satu project kecil dengan App Router, ada beberapa keunggulan yang tidak bisa diabaikan:

- **Pengurangan Bundle Size Ekstrem:** Karena komponen secara default berjalan di server (Server Components), library besar yang dulunya membebani client-side bundle (seperti date-fns atau markdown parser) tidak lagi dikirim ke browser.
- **Data Fetching yang Simpel:** Lupakan \`getServerSideProps\` atau \`getStaticProps\`. Sekarang kita cukup menggunakan \`async/await\` standar di dalam komponen.
- **Nested Layouts:** Ini game changer. Membuat layout bertingkat yang preserving state dan tidak re-render saat navigasi jauh lebih rapi dibanding paradigma Pages Router.

**Tantangan Migrasi**

Migrasi bukan berarti tanpa rasa sakit. Beberapa tantangan utama yang saya hadapi:

1. **Mental Model Shift:** Berpikir dalam konteks "Apa yang harus dirender di server?" dan "Aktivitas apa yang butuh interaktivitas client (\`use client\`)?".
2. **Third-party Libraries:** Banyak library UI (seperti Chakra UI versi lama atau emotion) yang awalnya tidak sepenuhnya kompatibel dengan RSC karena mereka mengandalkan React Context yang hanya berjalan di client.
3. **Caching Behavior:** Handling caching di App Router (Fetch API override) sempat membingungkan. Mengerti kapan harus \`revalidate\` dan kapan menggunakan \`no-store\` butuh trial & error.

**Tips Migrasi Bertahap**

Jangan rewrite semuanya dari awal. Next.js mendukung Pages Router dan App Router berjalan bersamaan dalam satu project.

- **Mulai dari halaman yang statis:** Pindahkan halaman \`/about\`, \`/terms\`, atau blog terlebih dahulu karena mereka sangat diuntungkan oleh Server Components.
- **Pisahkan interaktivitas ke pinggir (Leaves):** Jaga komponen server tetap di atas pohon komponen, letakkan komponen interaktif (\`use client\`) sejauh mungkin ke ujung daun komponen.
- **Gunakan Route Handlers:** Pindahkan API dari \`pages/api\` ke \`app/api/route.ts\` secara perlahan.

**Kesimpulan**

Kurva pembelajarannya memang lumayan curam, tapi keuntungan performa dan arsitektur yang didapat sangat sepadan. App Router mendesak kita untuk menulis kode React yang lebih baik dan lebih efisien.`,
    contentEn: `Over the past few years, Next.js Pages Router has been the de-facto standard for building SEO-friendly React applications. However, the release of Next.js 13 with the App Router and React Server Components (RSC) changed that paradigm.

**Why Switch?**

Initially, I was skeptical. "If it's not broken, why fix it?" I thought. But after trying to build a small project with the App Router, there were several advantages that could not be ignored:

- **Extreme Bundle Size Reduction:** Because components run on the server by default (Server Components), large libraries that used to weigh down the client-side bundle (like date-fns or markdown parsers) are no longer sent to the browser.
- **Simple Data Fetching:** Forget \`getServerSideProps\` or \`getStaticProps\`. Now we just use standard \`async/await\` inside components.
- **Nested Layouts:** This is a game changer. Creating nested layouts that preserve state and don't re-render during navigation is much cleaner than the Pages Router paradigm.

**Migration Challenges**

Migration isn't without its pain. Several key challenges I faced:

1. **Mental Model Shift:** Thinking in terms of "What should be rendered on the server?" and "What activities need client interactivity (\`use client\`)?".
2. **Third-party Libraries:** Many UI libraries (like older versions of Chakra UI or Emotion) were initially not fully compatible with RSC because they relied on React Context which only runs on the client.
3. **Caching Behavior:** Handling caching in the App Router (Fetch API override) was confusing at first. Understanding when to \`revalidate\` and when to use \`no-store\` required trial and error.

**Gradual Migration Tips**

Don't rewrite everything from scratch. Next.js supports both Pages Router and App Router running concurrently in one project.

- **Start with static pages:** Move pages like \`/about\`, \`/terms\`, or blogs first as they benefit significantly from Server Components.
- **Delegate interactivity to the leaves:** Keep server components high up in the component tree, and place interactive components (\`use client\`) as far down as possible.
- **Use Route Handlers:** Gradually move APIs from \`pages/api\` to \`app/api/route.ts\`.

**Conclusion**

The learning curve is quite steep, but the performance and architectural gains are well worth it. App Router pushes us to write better and more efficient React code.`,
    coverImage: "https://miro.medium.com/v2/resize:fit:1200/1*dN9q0DLP70Sth2cuj8_8Pw.png",
    author: "Defaaryawar",
    date: "2024-12-15",
    readTime: "9 min",
    tags: ["Next.js", "React", "Frontend", "Migration"],
    featured: false,
  },
  {
    slug: "tailwind-css-best-practices-untuk-tim",
    title: "Best Practices Tailwind CSS: Menjaga Codebase Tetap Bersih",
    titleEn: "Tailwind CSS Best Practices: Keeping Your Codebase Clean",
    excerpt: "Bagaimana cara mengatur project Tailwind CSS agar tidak berakhir dengan 'class soup' yang berantakan, dan mudah dipelihara oleh tim.",
    excerptEn: "How to organize Tailwind CSS projects so they don't end up as messy 'class soup', keeping them easy for teams to maintain.",
    content: `Tailwind CSS sangat cepat dan efisien. Tapi tanpa aturan yang jelas, komponen React Anda bisa dengan cepat dipenuhi oleh ratusan class utility yang sulit dibaca (sering disebut "class soup"). 

Berikut adalah beberapa praktik terbaik yang saya terapkan saat menggunakan Tailwind dalam tim.

**1. Gunakan clsx dan tailwind-merge (cn utility)**

Ini adalah standar industri saat ini (dipopulerkan oleh shadcn/ui). Seringkali kita menemui isu konflik class:

\`\`\`javascript
<button className={\`bg-blue-500 \${isDestructive ? 'bg-red-500' : ''}\`}>
\`\`\`

Terkadang \`bg-blue-500\` menang karena urutan di CSS output. Solusinya, buat utility \`cn\`:

\`\`\`javascript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Penggunaan: className={cn("bg-blue-500 p-4", isDestructive && "bg-red-500")}
\`\`\`

**2. Ekstraksi Komponen (Bukan \`@apply\`)**

Dokumentasi Tailwind sendiri menyarankan: lebih baik mengekstraksi komponen React/Vue daripada menggunakan \`@apply\` di file CSS. 

Menggunakan \`@apply\` mengalahkan tujuan utama Tailwind (utility-first) dan membuat kita kembali ke masalah "context switching" gaya CSS tradisional. Cukup buat \`<Button>\` component dan kapsulasi class-class tersebut di sana.

**3. Urutan Class yang Konsisten**

Membaca string class yang berantakan itu memusingkan. Gunakan \`prettier-plugin-tailwindcss\`. Plugin ini akan mengurutkan class sesuai hirarki box-model (layout -> size -> typography -> colors -> effects), membuat class apa pun langsung mudah dibaca oleh anggota tim.

**4. Jangan Takut Pakai Arbitrary Values**

Kadang kita butuh nilai yang spesifik: \`top-[117px]\`. Jangan kotori \`tailwind.config.ts\` dengan nilai one-off yang hanya dipakai sekali. Gunakan arbitrary values, itu memang dibuat untuk kasus ini. Tapi ingat, kalau nilai tersebut dipakai berulang (misal warna brand), baru masukkan ke config.

**5. Manfaatkan Konfigurasi Warna secara Semantik**

Jangan hardcode \`bg-blue-600\` di 50 tempat. Konfigurasikan semantic colors di \`tailwind.config.ts\`:

\`\`\`javascript
colors: {
  primary: {
    DEFAULT: 'var(--primary)',
    foreground: 'var(--primary-foreground)',
  }
}
\`\`\`

Ini membuat dukungan Dark Mode atau multi-tema menjadi semudah membalik telapak tangan dengan CSS variables.`,
    contentEn: `Tailwind CSS is extremely fast and efficient. But without clear rules, your React components can quickly become flooded with hundreds of hard-to-read utility classes (often called "class soup").

Here are several best practices I implement when using Tailwind in a team.

**1. Use clsx and tailwind-merge (cn utility)**

This is the current industry standard (popularized by shadcn/ui). Often we encounter class conflict issues:

\`\`\`javascript
<button className={\`bg-blue-500 \${isDestructive ? 'bg-red-500' : ''}\`}>
\`\`\`

Sometimes \`bg-blue-500\` wins due to the order in the CSS output. The solution is to create the \`cn\` utility:

\`\`\`javascript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Usage: className={cn("bg-blue-500 p-4", isDestructive && "bg-red-500")}
\`\`\`

**2. Component Extraction (Not \`@apply\`)**

Tailwind's documentation itself suggests: it's better to extract React/Vue components than to use \`@apply\` in CSS files.

Using \`@apply\` defeats the primary purpose of Tailwind (utility-first) and brings us back to traditional CSS "context switching" problems. Simply create a \`<Button>\` component and encapsulate those classes there.

**3. Consistent Class Ordering**

Reading messy class strings is confusing. Use \`prettier-plugin-tailwindcss\`. This plugin will sort classes according to box-model hierarchy (layout -> size -> typography -> colors -> effects), making any class string immediately legible for team members.

**4. Don't be Afraid to Use Arbitrary Values**

Sometimes we need a specific value: \`top-[117px]\`. Don't clutter \`tailwind.config.ts\` with one-off values used only once. Use arbitrary values—they were made for this case. But remember, if that value is used repeatedly (e.g., a brand color), put it in the config.

**5. Utilize Semantic Color Configuration**

Don't hardcode \`bg-blue-600\` in 50 different places. Configure semantic colors in \`tailwind.config.ts\`:

\`\`\`javascript
colors: {
  primary: {
    DEFAULT: 'var(--primary)',
    foreground: 'var(--primary-foreground)',
  }
}
\`\`\`

This makes Dark Mode or multi-theme support as easy as flipping a hand with CSS variables.`,
    coverImage: "https://miro.medium.com/v2/resize:fit:1400/1*__f27S-qQF2CAASt5bOwqg.png",
    author: "Defaaryawar",
    date: "2024-11-28",
    readTime: "6 min",
    tags: ["Tailwind", "CSS", "Frontend", "Best Practices"],
    featured: false,
  },
  {
    slug: "optimasi-postgresql-untuk-aplikasi-skala-menengah",
    title: "Optimasi Database PostgreSQL: Query Lebih Cepat Tanpa Upgrade Server",
    titleEn: "PostgreSQL Optimization: Faster Queries Without Server Upgrades",
    excerpt: "Cara-cara praktis melakukan optimasi database PostgreSQL mulai dari indexing yang tepat hingga menangani N+1 query problem.",
    excerptEn: "Practical ways to optimize PostgreSQL databases, from proper indexing to handling the N+1 query problem.",
    content: `Aplikasi Anda mulai terasa lambat? Respons API yang tadinya di bawah 100ms sekarang memakan waktu 2 detik? Sebelum terburu-buru melakukan upgrade spesifikasi server database, ada baiknya melihat kembali query dan struktur PostgreSQL Anda.

**1. Masalah Terbesar: N+1 Queries**

Ini adalah musuh nomor satu di framework modern berbasis ORM (seperti Prisma, TypeORM, atau Sequelize). N+1 terjadi ketika aplikasi melakukan satu query untuk mendapatkan *N* baris (kumpulan data utama), lalu melakukan satu query tambahan per baris untuk mendapatkan relasinya.

*Solusi:* 
Gunakan fitur join/include pada ORM. Di Prisma, pastikan Anda menggunakan \`include\` secara bijak, atau optimalkan menjadi dua flat query dan mapping di memori untuk kasus data yang sangat masif.

**2. Indexing yang Efektif (Tidak Semua Kolom Butuh Index!)**

Menambahkan Index (\`CREATE INDEX\`) memang mempercepat operasi \`SELECT\`. Tapi ingat, index memperlambat operasi \`INSERT\`, \`UPDATE\`, dan \`DELETE\`.

- Berikan index pada Foreign Key (ORM seringkali tidak otomatis membuatnya).
- Berikan index pada kolom yang sering muncul di klausa \`WHERE\`, \`ORDER BY\`, atau \`JOIN\`.
- Gunakan *Composite Index* jika Anda sering meng-query dua kolom secara bersamaan (misalnya \`status\` dan \`created_at\`). 
- Hindari index pada kolom berjenis boolean atau status yang variasinya sangat sedikit (Low Cardinality), database query planner seringkali mengabaikan index tersebut.

**3. Gunakan EXPLAIN ANALYZE**

Berhentilah menebak kenapa query lambat. Tambahkan \`EXPLAIN ANALYZE\` di depan query SQL Anda. Perhatikan metrik *Execution Time* dan lihat tahap mana yang lambat (misal apakah terjadi *Seq Scan* / Sequential Scan alih-alih *Index Scan* di tabel berukuran jutaan baris).

**4. Pagination Berbasis Cursor/Keyset**

Offset pagination (\`LIMIT 10 OFFSET 100000\`) akan sangat lambat ketika pengguna mencapai halaman akhir. Database tetap harus menghitung dan melewati 100,000 baris pertama sebelum memberikan 10 baris yang diminta.

Beralihlah ke *Cursor Pagination* menggunakan kondisi \`WHERE id > last_seen_id ORDER BY id LIMIT 10\`. Metode ini memanfaatkan index secara langsung dan akan tetap cepat di jutaan data.

**5. Connection Pooling**

Setiap koneksi ke PostgreSQL memakan memori server. Jika aplikasi Next.js/Node.js Anda spawn koneksi baru di setiap request, database akan cepat kehabisan resource. Selalu gunakan Connection Pooler seperti \`PgBouncer\` (sering disediakan default oleh Supabase atau provider cloud db) atau konfigurasi pooling bawaan ORM Anda secara ketat.

Database tweaking adalah sebuah seni. Upgrade resource hardware adalah jalan pintas yang mahal; optimasi query adalah investasi teknis jangka panjang.`,
    contentEn: `Is your application starting to feel slow? API responses that were under 100ms now take 2 seconds? Before rushing to upgrade your database server specs, it's a good idea to look back at your PostgreSQL queries and structure.

**1. The Biggest Issue: N+1 Queries**

This is enemy number one in modern ORM-based frameworks (like Prisma, TypeORM, or Sequelize). N+1 occurs when an application makes one query to get *N* rows (the main data set), then makes one additional query per row to get its relations.

*Solution:*
Use join/include features in your ORM. In Prisma, make sure you use \`include\` wisely, or optimize into two flat queries and map them in memory for cases with massive data.

**2. Effective Indexing (Not All Columns Need an Index!)**

Adding an Index (\`CREATE INDEX\`) does speed up \`SELECT\` operations. But remember, indexes slow down \`INSERT\`, \`UPDATE\`, and \`DELETE\`.

- Index Foreign Keys (ORMs often don't create them automatically).
- Index columns that frequently appear in \`WHERE\`, \`ORDER BY\`, or \`JOIN\`.
- Use *Composite Indexes* if you frequently query two columns together (e.g., \`status\` and \`created_at\`).
- Avoid indexing columns with boolean types or statuses with very little variation (Low Cardinality); the database query planner often ignores these indexes.

**3. Use EXPLAIN ANALYZE**

Stop guessing why a query is slow. Add \`EXPLAIN ANALYZE\` before your SQL query. Pay attention to the *Execution Time* metric and see which stage is slow (e.g., whether a *Seq Scan* / Sequential Scan is happening instead of an *Index Scan* on a table with millions of rows).

**4. Cursor/Keyset Based Pagination**

Offset pagination (\`LIMIT 10 OFFSET 100000\`) will be very slow when the user reaches later pages. The database still has to count and pass the first 100,000 rows before giving the 10 rows requested.

Switch to *Cursor Pagination* using the condition \`WHERE id > last_seen_id ORDER BY id LIMIT 10\`. This method directly leverages indexes and will remain fast even with millions of rows.

**5. Connection Pooling**

Every connection to PostgreSQL consumes server memory. If your Next.js/Node.js application spawns a new connection for every request, the database will quickly run out of resources. Always use a Connection Pooler like \`PgBouncer\` (often provided by default by Supabase or cloud DB providers) or strictly configure your ORM's built-in pooling.

Database tweaking is an art. Upgrading hardware resources is a costly shortcut; optimizing queries is a long-term technical investment.`,
    coverImage: "https://miro.medium.com/v2/resize:fit:1400/1*9kZEeIFveAWBWAAXVyiLFw.png",
    author: "Defaaryawar",
    date: "2024-11-10",
    readTime: "8 min",
    tags: ["PostgreSQL", "Database", "Backend", "Optimization"],
    featured: false,
  }
];
