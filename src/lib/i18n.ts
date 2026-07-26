export type Locale = "id" | "en";

export const translations = {
  id: {
    nav: {
      about: "Tentang",
      project: "Proyek",
      credentials: "Kredensial",
      skills: "Kemampuan",
      experience: "Pengalaman",
      contact: "Kontak",
    },
    hero: {
      eyebrow: "Kebumen, Jawa Tengah · Rev. 2026",
      role:
        "Builder, solo developer, dan funded trader.||Membangun LuxTrade dari nol tanpa latar belakang ilmu komputer formal — dan lolos evaluasi di empat prop firm berbeda.",
      tags: ["Solo Developer", "Funded Trader", "Founder, LuxTrade"],
    },
    about: {
      title: "Tentang",
      p1: 'Berlatar belakang <strong>Teknik Pemesinan</strong>, bukan ilmu komputer formal — tapi membangun dan menjalankan <strong>LuxTrade</strong>, aplikasi jurnal trading berbasis AI, dari nol: mengarahkan AI coding agent, membaca log produksi, mengaudit keamanan database, dan mengambil keputusan produk & harga sendiri.',
      p2: 'Di luar itu, seorang <strong>trader yang lolos evaluasi di empat prop firm berbeda</strong> dan menjalankan usaha bakso kecil-kecilan. Terbiasa kerja teliti, sistematis, dan nggak nyerah sebelum akar masalah beneran ketemu.',
      facts: {
        email: "Email",
        location: "Lokasi",
        education: "Pendidikan",
        focus: "Fokus Saat Ini",
        educationVal: "SMK · Teknik Pemesinan",
        focusVal: "Produk digital & trading",
      },
    },
    sections: {
      about: "Tentang",
      project: "Proyek",
      credentials: "Kredensial",
      skills: "Kemampuan",
      experience: "Pengalaman",
      contact: "Kontak",
    },
    project: {
      name: "LuxTrade",
      url: "luxtradee.web.id",
      desc: "Trading journal SaaS berbasis AI untuk trader retail Indonesia. Fitur utama: ekstraksi data trade otomatis dari screenshot MT4/MT5 pakai AI vision, sistem achievement & reward, program affiliate, dan dashboard analitik. Dibangun dan dioperasikan sendiri sebagai solo developer — mulai dari arsitektur, keamanan, sampai keputusan harga & go-to-market.",
      capabilities: [
        "Mengarahkan AI coding agent untuk membangun & memperbaiki fitur produksi",
        "Debugging sistematis lewat log server & query database langsung",
        "Audit & perbaikan keamanan (akses data, autentikasi, environment variable)",
        "Desain skema database & alur integrasi pembayaran (Midtrans)",
        "Menyusun struktur harga, promosi, dan program referral",
        "Membangun & mengelola komunitas pengguna (Discord)",
      ],
    },
    credentials: {
      rows: [
        {
          firm: "Aquafunded",
          status: "Certificate of Achievement — Evaluation Lulus",
          amount: "—",
          date: "18 Jun 2026",
        },
        {
          firm: "Sure Leverage Funding (SLF)",
          status: "Resmi Funded Trader",
          amount: "—",
          date: "9 Jun 2026",
        },
        {
          firm: "V Prop Trader",
          status: "Lulus Evaluasi — Prop Trader Terverifikasi",
          amount: "$1,000",
          date: "2026",
        },
        {
          firm: "PipDance",
          status: "Lulus Fase Tantangan → Fase Evaluasi",
          amount: "$1,000",
          date: "22 Jul 2026",
        },
      ],
    },
    skills: {
      groups: [
        {
          title: "Membangun Produk",
          items: [
            "Bekerja efektif dengan AI coding agent",
            "Debugging dari log produksi & database",
            "Dasar keamanan aplikasi & database",
            "Manajemen produk & keputusan harga",
          ],
        },
        {
          title: "Trading & Disiplin",
          items: [
            "Manajemen risiko & money management",
            "Analisis teknikal pasar forex/komoditas",
            "Evaluasi & jurnal performa trading",
            "Konsistensi & disiplin eksekusi",
          ],
        },
      ],
    },
    experience: {
      items: [
        {
          period: "Berjalan",
          role: "Solo Developer & Founder",
          org: "LuxTrade",
          desc: "Membangun dan mengoperasikan aplikasi jurnal trading AI dari nol hingga digunakan pengguna aktif.",
        },
        {
          period: "Berjalan",
          role: "Pemilik Usaha",
          org: "Usaha Bakso (skala kecil)",
          desc: "Menjalankan usaha kuliner kecil-kecilan secara mandiri.",
        },
        {
          period: "6 bulan",
          role: "Karyawan",
          org: "PT Johnson & Son",
          desc: "Pengalaman kerja formal sebelum fokus penuh membangun produk sendiri dan trading.",
        },
      ],
      baksoPhotos: [
        { alt: "Produk bakso — foto profesional" },
        { alt: "Produk bakso — suasana dapur" },
      ],
    },
    education: {
      period: "SMK",
      role: "Teknik Pemesinan",
      org: "Kebumen, Jawa Tengah",
    },
    footer: {
      big: "Mari bicarakan proyek atau kolaborasi berikutnya.",
      email: "riskiakbarp123@gmail.com",
      website: "luxtradee.web.id",
      baksoWebsite: "baksoaanmuda.vercel.app",
      bottomLeft: "RIZQI AKBAR PRATAMA",
      bottomRight: "REV. 2026",
    },
    scrollCue: "GESER KE KANAN →",
    scrollRight: "Geser ke kanan",
    printBtn: "Unduh sebagai PDF",
    langToggle: "EN",
  },
  en: {
    nav: {
      about: "About",
      project: "Project",
      credentials: "Credentials",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Kebumen, Central Java · Rev. 2026",
      role:
        "Builder, solo developer, and funded trader.||Building LuxTrade from scratch without a formal computer science background — and passing evaluations at four different prop firms.",
      tags: ["Solo Developer", "Funded Trader", "Founder, LuxTrade"],
    },
    about: {
      title: "About",
      p1: 'From a <strong>Machining Engineering</strong> background — not formal computer science — but built and operates <strong>LuxTrade</strong>, an AI-powered trading journal app, from scratch: directing AI coding agents, reading production logs, auditing database security, and making product & pricing decisions independently.',
      p2: 'Outside of that, a <strong>trader who passed evaluations at four different prop firms</strong> and runs a small bakso (meatball soup) business. Used to meticulous, systematic work — and not giving up until the root cause is truly found.',
      facts: {
        email: "Email",
        location: "Location",
        education: "Education",
        focus: "Current Focus",
        educationVal: "Vocational HS · Machining Engineering",
        focusVal: "Digital products & trading",
      },
    },
    sections: {
      about: "About",
      project: "Project",
      credentials: "Credentials",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    },
    project: {
      name: "LuxTrade",
      url: "luxtradee.web.id",
      desc: "AI-powered trading journal SaaS for Indonesian retail traders. Key features: automatic trade data extraction from MT4/MT5 screenshots via AI vision, achievement & reward system, affiliate program, and analytics dashboard. Built and operated solo as a solo developer — from architecture and security to pricing decisions and go-to-market strategy.",
      capabilities: [
        "Directing AI coding agents to build & fix production features",
        "Systematic debugging via server logs & direct database queries",
        "Security audit & fixes (data access, auth, environment variables)",
        "Database schema design & payment integration flow (Midtrans)",
        "Structuring pricing, promotions, and referral programs",
        "Building & managing user community (Discord)",
      ],
    },
    credentials: {
      rows: [
        {
          firm: "Aquafunded",
          status: "Certificate of Achievement — Evaluation Passed",
          amount: "—",
          date: "Jun 18, 2026",
        },
        {
          firm: "Sure Leverage Funding (SLF)",
          status: "Official Funded Trader",
          amount: "—",
          date: "Jun 9, 2026",
        },
        {
          firm: "V Prop Trader",
          status: "Evaluation Passed — Verified Prop Trader",
          amount: "$1,000",
          date: "2026",
        },
        {
          firm: "PipDance",
          status: "Passed Challenge Phase → Evaluation Phase",
          amount: "$1,000",
          date: "Jul 22, 2026",
        },
      ],
    },
    skills: {
      groups: [
        {
          title: "Product Building",
          items: [
            "Working effectively with AI coding agents",
            "Debugging from production logs & databases",
            "Application & database security fundamentals",
            "Product management & pricing decisions",
          ],
        },
        {
          title: "Trading & Discipline",
          items: [
            "Risk management & money management",
            "Technical analysis of forex/commodity markets",
            "Trading performance evaluation & journaling",
            "Consistency & execution discipline",
          ],
        },
      ],
    },
    experience: {
      items: [
        {
          period: "Ongoing",
          role: "Solo Developer & Founder",
          org: "LuxTrade",
          desc: "Building and operating an AI trading journal app from zero to active users.",
        },
        {
          period: "Ongoing",
          role: "Business Owner",
          org: "Bakso Business (small scale)",
          desc: "Running a small food business independently.",
        },
        {
          period: "6 months",
          role: "Employee",
          org: "PT Johnson & Son",
          desc: "Formal work experience before fully focusing on building products and trading.",
        },
      ],
      baksoPhotos: [
        { alt: "Bakso product — professional shot" },
        { alt: "Bakso product — kitchen setting" },
      ],
    },
    education: {
      period: "Vocational HS",
      role: "Machining Engineering",
      org: "Kebumen, Central Java",
    },
    footer: {
      big: "Let\u2019s talk about your next project or collaboration.",
      email: "riskiakbarp123@gmail.com",
      website: "luxtradee.web.id",
      baksoWebsite: "baksoaanmuda.vercel.app",
      bottomLeft: "RIZQI AKBAR PRATAMA",
      bottomRight: "REV. 2026",
    },
    scrollCue: "SCROLL RIGHT →",
    scrollRight: "Scroll right",
    printBtn: "Download as PDF",
    langToggle: "ID",
  },
} as const;

export type TranslationKey = typeof translations.id;

export function t(locale: Locale): TranslationKey {
  return translations[locale];
}
