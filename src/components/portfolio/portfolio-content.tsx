"use client";

import { useI18n } from "./i18n-provider";
import { PrintButton } from "./print-button";
import { LanguageToggle } from "./language-toggle";
import { CertificateGallery } from "./certificate-gallery";
import { PhotoGallery } from "./photo-gallery";

export function PortfolioContent() {
  const { t } = useI18n();

  return (
    <>
      {/* Top Bar */}
      <div className="print-bar">
        <LanguageToggle />
        <PrintButton label={t.printBtn} />
      </div>

      <div className="portfolio-page" id="resume">
        {/* ===== TITLE BLOCK ===== */}
        <div className="titleblock">
          <div className="titleblock-top">
            <div>
              <div className="titleblock-name">Rizqi Akbar Pratama</div>
              <div className="titleblock-role">{t.titleBlock.role}</div>
            </div>
            <div className="titleblock-mark">{t.titleBlock.rev}</div>
          </div>
          <div className="titleblock-fields">
            <div className="field">
              <div className="field-label">{t.titleBlock.fields.email}</div>
              <div className="field-value">riskiakbarp123@gmail.com</div>
            </div>
            <div className="field">
              <div className="field-label">{t.titleBlock.fields.location}</div>
              <div className="field-value">Kebumen, Jawa Tengah</div>
            </div>
            <div className="field">
              <div className="field-label">{t.titleBlock.fields.education}</div>
              <div className="field-value">{t.titleBlock.fields.educationVal}</div>
            </div>
            <div className="field">
              <div className="field-label">{t.titleBlock.fields.focus}</div>
              <div className="field-value">{t.titleBlock.fields.focusVal}</div>
            </div>
          </div>
        </div>

        <div className="portfolio-content">
          {/* ===== SUMMARY ===== */}
          <section className="section" style={{ marginTop: 36 }}>
            <p className="summary" dangerouslySetInnerHTML={{ __html: t.summary }} />
          </section>

          {/* ===== FEATURED PROJECT ===== */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">01</span>
              <span className="section-title">{t.sections.project}</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <div className="project">
              <div className="project-top">
                <div className="project-name">{t.project.name}</div>
                <div className="project-tag">{t.project.tag}</div>
              </div>
              <p className="project-desc">{t.project.desc}</p>
              <div className="project-grid">
                {t.project.capabilities.map((cap, i) => (
                  <div className="capability" key={i}>{cap}</div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== TRADING CREDENTIALS ===== */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">02</span>
              <span className="section-title">{t.sections.credentials}</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <table className="cred-table">
              <thead>
                <tr>
                  {t.credentials.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.credentials.rows.map((row, i) => (
                  <tr key={i}>
                    <td className="cred-firm">{row.firm}</td>
                    <td className="cred-status">{row.status}</td>
                    <td className="cred-amount">{row.amount}</td>
                    <td>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CertificateGallery
              certificates={[
                {
                  src: "/evidence/aquafunded.png",
                  alt: t.credentials.rows[0].status,
                  firm: t.credentials.rows[0].firm,
                },
                {
                  src: "/evidence/slf.png",
                  alt: t.credentials.rows[1].status,
                  firm: t.credentials.rows[1].firm,
                },
                {
                  src: "/evidence/v-prop-trader.png",
                  alt: t.credentials.rows[2].status,
                  firm: t.credentials.rows[2].firm,
                },
                {
                  src: "/evidence/pipdance.png",
                  alt: t.credentials.rows[3].status,
                  firm: t.credentials.rows[3].firm,
                },
              ]}
              evidenceLabel={t.credentials.evidenceLabel}
            />
          </section>

          {/* ===== SKILLS ===== */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">03</span>
              <span className="section-title">{t.sections.skills}</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <div className="skills-grid">
              {t.skills.groups.map((group, i) => (
                <div key={i}>
                  <div className="skill-group-title">{group.title}</div>
                  <div className="skill-list">
                    {group.items.map((item, j) => (
                      <span key={j}>
                        {item}
                        {j < group.items.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===== EXPERIENCE ===== */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">04</span>
              <span className="section-title">{t.sections.experience}</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            {t.experience.items.map((item, i) => (
              <span key={i}>
                <div className="timeline-item">
                  <div className="timeline-period">{item.period}</div>
                  <div>
                    <div className="timeline-role">{item.role}</div>
                    <div className="timeline-org">{item.org}</div>
                    <div className="timeline-desc">{item.desc}</div>
                  </div>
                </div>
                {"evidenceLabel" in item && (
                  <PhotoGallery
                    photos={[
                      { src: "/evidence/bakso-1.png", alt: t.experience.baksoPhotos[0].alt },
                      { src: "/evidence/bakso-2.jpeg", alt: t.experience.baksoPhotos[1].alt },
                    ]}
                    label={item.evidenceLabel}
                  />
                )}
              </span>
            ))}
          </section>

          {/* ===== EDUCATION ===== */}
          <section className="section">
            <div className="section-head">
              <span className="section-num">05</span>
              <span className="section-title">{t.sections.education}</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <div
              className="timeline-item"
              style={{ borderBottom: "none" }}
            >
              <div className="timeline-period">{t.education.period}</div>
              <div>
                <div className="timeline-role">{t.education.role}</div>
                <div className="timeline-org">{t.education.org}</div>
              </div>
            </div>
          </section>

          {/* ===== FOOTER ===== */}
          <footer className="portfolio-footer">
            <div className="footer-note">{t.footer.left}</div>
            <div className="footer-note">riskiakbarp123@gmail.com</div>
          </footer>
        </div>
      </div>
    </>
  );
}
