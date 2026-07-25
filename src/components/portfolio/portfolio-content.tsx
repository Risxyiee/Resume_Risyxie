"use client";

import { useI18n } from "./i18n-provider";
import { PrintButton } from "./print-button";
import { LanguageToggle } from "./language-toggle";
import { CertificateGallery } from "./certificate-gallery";
import { PhotoGallery } from "./photo-gallery";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./animated-section";
import { motion } from "framer-motion";

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
        <motion.div
          className="titleblock"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="titleblock-top">
            <div>
              <motion.div
                className="titleblock-name"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Rizqi Akbar Pratama
              </motion.div>
              <motion.div
                className="titleblock-role"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {t.titleBlock.role}
              </motion.div>
            </div>
            <motion.div
              className="titleblock-mark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {t.titleBlock.rev}
            </motion.div>
          </div>
          <div className="titleblock-fields">
            {(
              [
                { label: t.titleBlock.fields.email, value: "riskiakbarp123@gmail.com" },
                { label: t.titleBlock.fields.location, value: "Kebumen, Jawa Tengah" },
                { label: t.titleBlock.fields.education, value: t.titleBlock.fields.educationVal },
                { label: t.titleBlock.fields.focus, value: t.titleBlock.fields.focusVal },
              ] as const
            ).map((field, i) => (
              <motion.div
                key={field.label}
                className="field"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
              >
                <div className="field-label">{field.label}</div>
                <div className="field-value">{field.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="portfolio-content">
          {/* ===== SUMMARY ===== */}
          <AnimatedSection delay={0.2} style={{ marginTop: 36 }}>
            <p className="summary" dangerouslySetInnerHTML={{ __html: t.summary }} />
          </AnimatedSection>

          {/* ===== FEATURED PROJECT ===== */}
          <AnimatedSection delay={0.1}>
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
              <StaggerContainer className="project-grid">
                {t.project.capabilities.map((cap, i) => (
                  <StaggerItem key={i} className="capability">{cap}</StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* ===== TRADING CREDENTIALS ===== */}
          <AnimatedSection delay={0.1}>
            <div className="section-head">
              <span className="section-num">02</span>
              <span className="section-title">{t.sections.credentials}</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <StaggerContainer>
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
                    <StaggerItem key={i}>
                      <tr>
                        <td className="cred-firm">{row.firm}</td>
                        <td className="cred-status">{row.status}</td>
                        <td className="cred-amount">{row.amount}</td>
                        <td>{row.date}</td>
                      </tr>
                    </StaggerItem>
                  ))}
                </tbody>
              </table>
            </StaggerContainer>
            <CertificateGallery
              certificates={[
                { src: "/evidence/aquafunded.png", alt: t.credentials.rows[0].status, firm: t.credentials.rows[0].firm },
                { src: "/evidence/slf.png", alt: t.credentials.rows[1].status, firm: t.credentials.rows[1].firm },
                { src: "/evidence/v-prop-trader.png", alt: t.credentials.rows[2].status, firm: t.credentials.rows[2].firm },
                { src: "/evidence/pipdance.png", alt: t.credentials.rows[3].status, firm: t.credentials.rows[3].firm },
              ]}
              evidenceLabel={t.credentials.evidenceLabel}
            />
          </AnimatedSection>

          {/* ===== SKILLS ===== */}
          <AnimatedSection delay={0.1}>
            <div className="section-head">
              <span className="section-num">03</span>
              <span className="section-title">{t.sections.skills}</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <div className="skills-grid">
              {t.skills.groups.map((group, gi) => (
                <StaggerContainer key={gi}>
                  <div className="skill-group-title">{group.title}</div>
                  {group.items.map((item, i) => (
                    <StaggerItem key={i}>
                      <div className="skill-item">{item}</div>
                      <div className="skill-bar-wrap">
                        <div
                          className="skill-bar"
                          style={{ width: `${75 + i * 8}%` }}
                        />
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ))}
            </div>
          </AnimatedSection>

          {/* ===== EXPERIENCE ===== */}
          <AnimatedSection delay={0.1}>
            <div className="section-head">
              <span className="section-num">04</span>
              <span className="section-title">{t.sections.experience}</span>
              <span className="section-rule" aria-hidden="true" />
            </div>
            <div className="timeline">
              <div className="timeline-line" />
              <StaggerContainer>
                {t.experience.items.map((item, i) => (
                  <StaggerItem key={i}>
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
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* ===== EDUCATION ===== */}
          <AnimatedSection delay={0.1}>
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
          </AnimatedSection>

          {/* ===== FOOTER ===== */}
          <AnimatedSection delay={0}>
            <footer className="portfolio-footer">
              <div className="footer-note">{t.footer.left}</div>
              <div className="footer-note">riskiakbarp123@gmail.com</div>
            </footer>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
