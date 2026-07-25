import { PrintButton } from "@/components/portfolio/print-button";
import { CertificateGallery } from "@/components/portfolio/certificate-gallery";
import { PhotoGallery } from "@/components/portfolio/photo-gallery";

export default function PortfolioPage() {
  return (
    <>
      {/* Print Button */}
      <PrintButton />

      <div className="portfolio-page" id="resume">
        {/* ===== TITLE BLOCK ===== */}
        <div className="titleblock">
          <div className="titleblock-top">
            <div>
              <div className="titleblock-name">Rizqi Akbar Pratama</div>
              <div className="titleblock-role">
                Builder · Solo Developer · Funded Trader
              </div>
            </div>
            <div className="titleblock-mark">
              REV. 2026&nbsp;&nbsp;·&nbsp;&nbsp;KEBUMEN, ID
            </div>
          </div>
          <div className="titleblock-fields">
            <div className="field">
              <div className="field-label">Email</div>
              <div className="field-value">riskiakbarp123@gmail.com</div>
            </div>
            <div className="field">
              <div className="field-label">Lokasi</div>
              <div className="field-value">Kebumen, Jawa Tengah</div>
            </div>
            <div className="field">
              <div className="field-label">Pendidikan</div>
              <div className="field-value">SMK · Teknik Pemesinan</div>
            </div>
            <div className="field">
              <div className="field-label">Fokus Saat Ini</div>
              <div className="field-value">Produk digital &amp; trading</div>
            </div>
          </div>
        </div>

        <div className="portfolio-content">
          {/* ===== SUMMARY ===== */}
          <section className="section" style={{ marginTop: 36 }}>
            <p className="summary">
              Berlatar belakang <strong>Teknik Pemesinan</strong>, bukan ilmu
              komputer formal — tapi membangun dan menjalankan{" "}
              <strong>LuxTrade</strong>, aplikasi jurnal trading berbasis AI, dari
              nol: mengarahkan AI coding agent, membaca log produksi, mengaudit
              keamanan database, dan mengambil keputusan produk &amp; harga
              sendiri. Di luar itu, seorang{" "}
              <strong>
                trader yang lolos evaluasi di empat prop firm berbeda
              </strong>{" "}
              dan menjalankan usaha bakso kecil-kecilan. Terbiasa kerja teliti,
              sistematis, dan nggak nyerah sebelum akar masalah beneran ketemu.
            </p>
          </section>

          {/* ===== FEATURED PROJECT ===== */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">01</span>
              <span className="section-title">Proyek Utama</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <div className="project">
              <div className="project-top">
                <div className="project-name">LuxTrade</div>
                <div className="project-tag">luxtradee.web.id</div>
              </div>
              <p className="project-desc">
                Trading journal SaaS berbasis AI untuk trader retail Indonesia.
                Fitur utama: ekstraksi data trade otomatis dari screenshot
                MT4/MT5 pakai AI vision, sistem achievement &amp; reward, program
                affiliate, dan dashboard analitik. Dibangun dan dioperasikan
                sendiri sebagai solo developer — mulai dari arsitektur,
                keamanan, sampai keputusan harga &amp; go-to-market.
              </p>
              <div className="project-grid">
                <div className="capability">
                  Mengarahkan AI coding agent untuk membangun &amp; memperbaiki
                  fitur produksi
                </div>
                <div className="capability">
                  Debugging sistematis lewat log server &amp; query database
                  langsung
                </div>
                <div className="capability">
                  Audit &amp; perbaikan keamanan (akses data, autentikasi,
                  environment variable)
                </div>
                <div className="capability">
                  Desain skema database &amp; alur integrasi pembayaran
                  (Midtrans)
                </div>
                <div className="capability">
                  Menyusun struktur harga, promosi, dan program referral
                </div>
                <div className="capability">
                  Membangun &amp; mengelola komunitas pengguna (Discord)
                </div>
              </div>
            </div>
          </section>

          {/* ===== TRADING CREDENTIALS ===== */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">02</span>
              <span className="section-title">Kredensial Trading</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <table className="cred-table">
              <thead>
                <tr>
                  <th>Firm</th>
                  <th>Status</th>
                  <th>Ukuran Akun</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cred-firm">Aquafunded</td>
                  <td className="cred-status">
                    Certificate of Achievement — Evaluation Lulus
                  </td>
                  <td className="cred-amount">—</td>
                  <td>18 Jun 2026</td>
                </tr>
                <tr>
                  <td className="cred-firm">
                    Sure Leverage Funding (SLF)
                  </td>
                  <td className="cred-status">Resmi Funded Trader</td>
                  <td className="cred-amount">—</td>
                  <td>9 Jun 2026</td>
                </tr>
                <tr>
                  <td className="cred-firm">V Prop Trader</td>
                  <td className="cred-status">
                    Lulus Evaluasi — Prop Trader Terverifikasi
                  </td>
                  <td className="cred-amount">$1,000</td>
                  <td>2026</td>
                </tr>
                <tr>
                  <td className="cred-firm">PipDance</td>
                  <td className="cred-status">
                    Lulus Fase Tantangan → Fase Evaluasi
                  </td>
                  <td className="cred-amount">$1,000</td>
                  <td>22 Jul 2026</td>
                </tr>
              </tbody>
            </table>
            <CertificateGallery
              certificates={[
                {
                  src: "/evidence/aquafunded.png",
                  alt: "Certificate of Achievement — Evaluation Lulus",
                  firm: "Aquafunded",
                },
                {
                  src: "/evidence/slf.png",
                  alt: "Resmi Funded Trader — Sure Leverage Funding",
                  firm: "Sure Leverage Funding (SLF)",
                },
                {
                  src: "/evidence/v-prop-trader.png",
                  alt: "Lulus Evaluasi — Prop Trader Terverifikasi",
                  firm: "V Prop Trader",
                },
                {
                  src: "/evidence/pipdance.png",
                  alt: "Lulus Fase Tantangan → Fase Evaluasi",
                  firm: "PipDance",
                },
              ]}
            />
          </section>

          {/* ===== SKILLS ===== */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">03</span>
              <span className="section-title">Kemampuan</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <div className="skills-grid">
              <div>
                <div className="skill-group-title">Membangun Produk</div>
                <div className="skill-list">
                  Bekerja efektif dengan AI coding agent
                  <br />
                  Debugging dari log produksi &amp; database
                  <br />
                  Dasar keamanan aplikasi &amp; database
                  <br />
                  Manajemen produk &amp; keputusan harga
                </div>
              </div>
              <div>
                <div className="skill-group-title">Trading &amp; Disiplin</div>
                <div className="skill-list">
                  Manajemen risiko &amp; money management
                  <br />
                  Analisis teknikal pasar forex/komoditas
                  <br />
                  Evaluasi &amp; jurnal performa trading
                  <br />
                  Konsistensi &amp; disiplin eksekusi
                </div>
              </div>
            </div>
          </section>

          {/* ===== EXPERIENCE ===== */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">04</span>
              <span className="section-title">Pengalaman</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <div className="timeline-item">
              <div className="timeline-period">Berjalan</div>
              <div>
                <div className="timeline-role">
                  Solo Developer &amp; Founder
                </div>
                <div className="timeline-org">LuxTrade</div>
                <div className="timeline-desc">
                  Membangun dan mengoperasikan aplikasi jurnal trading AI dari
                  nol hingga digunakan pengguna aktif.
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-period">Berjalan</div>
              <div>
                <div className="timeline-role">Pemilik Usaha</div>
                <div className="timeline-org">
                  Usaha Bakso (skala kecil)
                </div>
                <div className="timeline-desc">
                  Menjalankan usaha kuliner kecil-kecilan secara mandiri.
                </div>
              </div>
            </div>
            <PhotoGallery
              photos={[
                {
                  src: "/evidence/bakso-1.png",
                  alt: "Produk bakso — foto profesional",
                },
                {
                  src: "/evidence/bakso-2.jpeg",
                  alt: "Produk bakso — suasana dapur",
                },
              ]}
              label="Bukti Usaha Bakso"
            />
            <div className="timeline-item">
              <div className="timeline-period">6 bulan</div>
              <div>
                <div className="timeline-role">Karyawan</div>
                <div className="timeline-org">PT Johnson &amp; Son</div>
                <div className="timeline-desc">
                  Pengalaman kerja formal sebelum fokus penuh membangun produk
                  sendiri dan trading.
                </div>
              </div>
            </div>
          </section>

          {/* ===== EDUCATION ===== */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">05</span>
              <span className="section-title">Pendidikan</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <div
              className="timeline-item"
              style={{ borderBottom: "none" }}
            >
              <div className="timeline-period">SMK</div>
              <div>
                <div className="timeline-role">Teknik Pemesinan</div>
                <div className="timeline-org">
                  Kebumen, Jawa Tengah
                </div>
              </div>
            </div>
          </section>

          {/* ===== FOOTER ===== */}
          <footer className="portfolio-footer">
            <div className="footer-note">
              RIZQI AKBAR PRATAMA — PORTOFOLIO
            </div>
            <div className="footer-note">riskiakbarp123@gmail.com</div>
          </footer>
        </div>
      </div>
    </>
  );
}
