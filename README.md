# Rizqi Akbar Pratama — Portofolio

Portofolio digital bergaya **engineering drawing** untuk Rizqi Akbar Pratama — Builder, Solo Developer & Funded Trader dari Kebumen, Jawa Tengah.

## Isi Portofolio

| Section | Konten |
|---------|--------|
| Title Block | Nama, role, email, lokasi, pendidikan, fokus saat ini |
| 01 Proyek Utama | **LuxTrade** — Trading journal SaaS berbasis AI (6 capability points) |
| 02 Kredensial Trading | 4 prop firm dengan sertifikat bukti (Aquafunded, SLF, V Prop Trader, PipDance) |
| 03 Kemampuan | Membangun Produk & Trading & Disiplin |
| 04 Pengalaman | LuxTrade, Usaha Bakso (+ foto bukti), PT Johnson & Son |
| 05 Pendidikan | SMK Teknik Pemesinan |

## Fitur

- Desain bergaya **technical drawing / blueprint** (paper texture, brass & ink color system)
- **Gallery bukti** — sertifikat trading & foto usaha bakso dengan lightbox
- **Lightbox** — navigasi keyboard (← → Esc), prev/next, caption & counter
- **Print-friendly** — tombol "Unduh sebagai PDF" untuk cetak portofolio
- **Responsive** — mobile-first, adaptif untuk layar kecil

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS 4
- Framer Motion (lightbox animation)
- Google Fonts: Space Grotesk, Inter, IBM Plex Mono

## Menjalankan Lokal

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Buka di browser
# http://localhost:3000
```

## Struktur File

```
src/
├── app/
│   ├── globals.css          # Theme & styling (engineering drawing aesthetic)
│   ├── layout.tsx           # Font loading (Space Grotesk, Inter, IBM Plex Mono)
│   └── page.tsx             # Halaman portofolio utama
├── components/
│   └── portfolio/
│       ├── certificate-gallery.tsx  # Gallery sertifikat trading
│       ├── lightbox.tsx             # Modal lightbox dengan navigasi
│       ├── photo-gallery.tsx        # Gallery foto (bakso)
│       └── print-button.tsx         # Tombol cetak PDF
public/
└── evidence/
    ├── aquafunded.png       # Sertifikat Aquafunded
    ├── slf.png              # Sertifikat Sure Leverage Funding
    ├── v-prop-trader.png    # Sertifikat V Prop Trader
    ├── pipdance.png         # Sertifikat PipDance
    ├── bakso-1.png          # Foto produk bakso
    └── bakso-2.jpeg         # Foto produk bakso
```

---

© 2026 Rizqi Akbar Pratama
