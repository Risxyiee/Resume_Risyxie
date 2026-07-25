export type Lang = "id" | "en";

export const translations: Record<Lang, Record<string, string>> = {
  id: {
    // Title Block
    "role.title": "Builder · Solo Developer · Funded Trader",
    "rev.mark": "REV. 2026 · KEBUMEN, ID",
    "field.email": "Email",
    "field.location": "Lokasi",
    "field.education": "Pendidikan",
    "field.focus": "Fokus Saat Ini",
    "field.email.val": "riskiakbarp123@gmail.com",
    "field.location.val": "Kebumen, Jawa Tengah",
    "field.education.val": "SMK · Teknik Pemesinan",
    "field.focus.val": "Produk digital & trading",

    // Summary
    "summary":
      'Berlatar belakang <strong>Teknik Pemesinan</strong>, bukan ilmu komputer formal — tapi membangun dan menjalankan <strong>LuxTrade</strong>, aplikasi jurnal trading berbasis AI, dari nol: mengarahkan AI coding agent, membaca log produksi, mengaudit keamanan database, dan mengambil keputusan produk & harga sendiri. Di luar itu, seorang <strong>trader yang lolos evaluasi di empat prop firm berbeda</strong> dan menjalankan usaha bakso kecil-kecilan. Terbiasa kerja teliti, sistematis, dan nggak nyerah sebelum akar masalah beneran ketemu.',

    // Sections
    "section.project": "Proyek Utama",
    "section.credentials": "Kredensial Trading",
    "section.skills": "Kemampuan",
    "section.experience": "Pengalaman",
    "section.education": "Pendidikan",

    // Project
    "project.name": "LuxTrade",
    "project.tag": "luxtradee.web.id",
    "project.desc":
      "Trading journal SaaS berbasis AI untuk trader retail Indonesia. Fitur utama: ekstraksi data trade otomatis dari screenshot MT4/MT5 pakai AI vision, sistem achievement & reward, program affiliate, dan dashboard analitik. Dibangun dan dioperasikan sendiri sebagai solo developer — mulai dari arsitektur, keamanan, sampai keputusan harga & go-to-market.",
    "project.cap.1":
      "Mengarahkan AI coding agent untuk membangun & memperbaiki fitur produksi",
    "project.cap.2":
      "Debugging sistematis lewat log server & query database langsung",
    "project.cap.3":
      "Audit & perbaikan keamanan (akses data, autentikasi, environment variable)",
    "project.cap.4":
      "Desain skema database & alur integrasi pembayaran (Midtrans)",
    "project.cap.5":
      "Menyusun struktur harga, promosi, dan program referral",
    "project.cap.6": "Membangun & mengelola komunitas pengguna (Discord)",

    // Credentials Table
    "cred.firm": "Firm",
    "cred.status": "Status",
    "cred.size": "Ukuran Akun",
    "cred.date": "Tanggal",
    "cred.firm1": "Aquafunded",
    "cred.status1": "Certificate of Achievement — Evaluation Lulus",
    "cred.firm2": "Sure Leverage Funding (SLF)",
    "cred.status2": "Resmi Funded Trader",
    "cred.firm3": "V Prop Trader",
    "cred.status3": "Lulus Evaluasi — Prop Trader Terverifikasi",
    "cred.firm4": "PipDance",
    "cred.status4": "Lulus Fase Tantangan → Fase Evaluasi",

    // Skills
    "skills.build": "Membangun Produk",
    "skills.trade": "Trading & Disiplin",
    "skill.1": "Bekerja efektif dengan AI coding agent",
    "skill.2": "Debugging dari log produksi & database",
    "skill.3": "Dasar keamanan aplikasi & database",
    "skill.4": "Manajemen produk & keputusan harga",
    "skill.5": "Manajemen risiko & money management",
    "skill.6": "Analisis teknikal pasar forex/komoditas",
    "skill.7": "Evaluasi & jurnal performa trading",
    "skill.8": "Konsistensi & disiplin eksekusi",

    // Experience
    "exp.period.ongoing": "Berjalan",
    "exp.period.6mo": "6 bulan",
    "exp.role1": "Solo Developer & Founder",
    "exp.org1": "LuxTrade",
    "exp.desc1":
      "Membangun dan mengoperasikan aplikasi jurnal trading AI dari nol hingga digunakan pengguna aktif.",
    "exp.role2": "Pemilik Usaha",
    "exp.org2": "Usaha Bakso (skala kecil)",
    "exp.desc2": "Menjalankan usaha kuliner kecil-kecilan secara mandiri.",
    "exp.role3": "Karyawan",
    "exp.org3": "PT Johnson & Son",
    "exp.desc3":
      "Pengalaman kerja formal sebelum fokus penuh membangun produk sendiri dan trading.",

    // Education
    "edu.period": "SMK",
    "edu.role": "Teknik Pemesinan",
    "edu.org": "Kebumen, Jawa Tengah",

    // Evidence
    "evidence.cert": "Bukti Sertifikat",
    "evidence.bakso": "Bukti Usaha Bakso",
    "evidence.bakso.1": "Produk bakso — foto profesional",
    "evidence.bakso.2": "Produk bakso — suasana dapur",

    // Cert alt texts
    "cert.alt1": "Certificate of Achievement — Evaluation Lulus",
    "cert.alt2": "Resmi Funded Trader — Sure Leverage Funding",
    "cert.alt3": "Lulus Evaluasi — Prop Trader Terverifikasi",
    "cert.alt4": "Lulus Fase Tantangan → Fase Evaluasi",

    // Footer
    "footer.left": "RIZQI AKBAR PRATAMA — PORTOFOLIO",

    // Print
    "print.btn": "⬇ Unduh sebagai PDF",

    // Toggle
    "lang.toggle": "EN",
  },
  en: {
    // Title Block
    "role.title": "Builder · Solo Developer · Funded Trader",
    "rev.mark": "REV. 2026 · KEBUMEN, ID",
    "field.email": "Email",
    "field.location": "Location",
    "field.education": "Education",
    "field.focus": "Current Focus",
    "field.email.val": "riskiakbarp123@gmail.com",
    "field.location.val": "Kebumen, Central Java",
    "field.education.val": "Vocational High School · Machining Engineering",
    "field.focus.val": "Digital products & trading",

    // Summary
    "summary":
      'Background in <strong>Machining Engineering</strong>, not formal computer science — but built and runs <strong>LuxTrade</strong>, an AI-powered trading journal app, from scratch: directing AI coding agents, reading production logs, auditing database security, and making product & pricing decisions independently. Outside of that, a <strong>trader who passed evaluations at four different prop firms</strong> and runs a small bakso business. Used to working meticulously, systematically, and not giving up until the root cause is truly found.',

    // Sections
    "section.project": "Featured Project",
    "section.credentials": "Trading Credentials",
    "section.skills": "Skills",
    "section.experience": "Experience",
    "section.education": "Education",

    // Project
    "project.name": "LuxTrade",
    "project.tag": "luxtradee.web.id",
    "project.desc":
      "AI-powered trading journal SaaS for Indonesian retail traders. Key features: automatic trade data extraction from MT4/MT5 screenshots using AI vision, achievement & reward system, affiliate program, and analytics dashboard. Built and operated as a solo developer — from architecture and security to pricing decisions and go-to-market strategy.",
    "project.cap.1":
      "Directing AI coding agents to build & fix production features",
    "project.cap.2":
      "Systematic debugging via server logs & direct database queries",
    "project.cap.3":
      "Security audit & fixes (data access, authentication, environment variables)",
    "project.cap.4":
      "Database schema design & payment integration flow (Midtrans)",
    "project.cap.5":
      "Structuring pricing, promotions, and referral programs",
    "project.cap.6": "Building & managing user community (Discord)",

    // Credentials Table
    "cred.firm": "Firm",
    "cred.status": "Status",
    "cred.size": "Account Size",
    "cred.date": "Date",
    "cred.firm1": "Aquafunded",
    "cred.status1": "Certificate of Achievement — Evaluation Passed",
    "cred.firm2": "Sure Leverage Funding (SLF)",
    "cred.status2": "Officially Funded Trader",
    "cred.firm3": "V Prop Trader",
    "cred.status3": "Evaluation Passed — Verified Prop Trader",
    "cred.firm4": "PipDance",
    "cred.status4": "Challenge Phase Passed → Evaluation Phase",

    // Skills
    "skills.build": "Building Products",
    "skills.trade": "Trading & Discipline",
    "skill.1": "Working effectively with AI coding agents",
    "skill.2": "Debugging from production logs & databases",
    "skill.3": "Application & database security fundamentals",
    "skill.4": "Product management & pricing decisions",
    "skill.5": "Risk management & money management",
    "skill.6": "Technical analysis of forex/commodity markets",
    "skill.7": "Trading performance evaluation & journaling",
    "skill.8": "Consistency & execution discipline",

    // Experience
    "exp.period.ongoing": "Ongoing",
    "exp.period.6mo": "6 months",
    "exp.role1": "Solo Developer & Founder",
    "exp.org1": "LuxTrade",
    "exp.desc1":
      "Built and operated an AI trading journal app from scratch to active users.",
    "exp.role2": "Business Owner",
    "exp.org2": "Bakso Business (small scale)",
    "exp.desc2": "Running a small food business independently.",
    "exp.role3": "Employee",
    "exp.org3": "PT Johnson & Son",
    "exp.desc3":
      "Formal work experience before fully focusing on building products and trading.",

    // Education
    "edu.period": "Vocational HS",
    "edu.role": "Machining Engineering",
    "edu.org": "Kebumen, Central Java",

    // Evidence
    "evidence.cert": "Certificate Evidence",
    "evidence.bakso": "Bakso Business Evidence",
    "evidence.bakso.1": "Bakso product — professional photo",
    "evidence.bakso.2": "Bakso product — kitchen scene",

    // Cert alt texts
    "cert.alt1": "Certificate of Achievement — Evaluation Passed",
    "cert.alt2": "Officially Funded Trader — Sure Leverage Funding",
    "cert.alt3": "Evaluation Passed — Verified Prop Trader",
    "cert.alt4": "Challenge Phase Passed → Evaluation Phase",

    // Footer
    "footer.left": "RIZQI AKBAR PRATAMA — PORTFOLIO",

    // Print
    "print.btn": "⬇ Download as PDF",

    // Toggle
    "lang.toggle": "ID",
  },
};
