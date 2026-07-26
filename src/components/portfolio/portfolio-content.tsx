"use client";

import { useRef, type ReactNode } from "react";
import { useI18n } from "./i18n-provider";
import { PrintButton } from "./print-button";
import { LanguageToggle } from "./language-toggle";
import { CertificateGallery } from "./certificate-gallery";
import { PhotoGallery } from "./photo-gallery";
import { motion, useInView } from "framer-motion";
import { useState, useEffect } from "react";

/* ── Inline Reveal wrapper ──────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Nav scroll state hook ──────────────────────────────────── */
function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

/* ── Section head helper ────────────────────────────────────── */
function SectionHead({
  num,
  title,
}: {
  num: string;
  title: string;
}) {
  return (
    <div className="sec-head">
      <span className="section-num">{num}</span>
      <span className="section-title">{title}</span>
      <span className="section-rule" aria-hidden="true" />
    </div>
  );
}

export function PortfolioContent() {
  const { t, locale } = useI18n();
  const scrolled = useNavScroll();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const roleParts = t.hero.role.split("||");

  const certificates = [
    { src: "/evidence/aquafunded.png", alt: t.credentials.rows[0].status, firm: t.credentials.rows[0].firm },
    { src: "/evidence/slf.png", alt: t.credentials.rows[1].status, firm: t.credentials.rows[1].firm },
    { src: "/evidence/v-prop-trader.png", alt: t.credentials.rows[2].status, firm: t.credentials.rows[2].firm },
    { src: "/evidence/pipdance.png", alt: t.credentials.rows[3].status, firm: t.credentials.rows[3].firm },
  ];

  const baksoPhotos = [
    { src: "/evidence/bakso-1.png", alt: t.experience.baksoPhotos[0].alt },
    { src: "/evidence/bakso-2.jpeg", alt: t.experience.baksoPhotos[1].alt },
  ];

  const factEntries = [
    { label: t.about.facts.email, value: "riskiakbarp123@gmail.com" },
    { label: t.about.facts.location, value: locale === "id" ? "Kebumen, Jawa Tengah" : "Kebumen, Central Java" },
    { label: t.about.facts.education, value: t.about.facts.educationVal },
    { label: t.about.facts.focus, value: t.about.facts.focusVal },
  ];

  return (
    <>
      {/* Film grain + vignette overlays */}
      <div className="grain-overlay" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="nav-mark">R·P</div>
        <div className="nav-links">
          {(["about", "project", "credentials", "skills", "experience", "contact"] as const).map(
            (key) => (
              <a key={key} href={`#${key}`}>{t.nav[key]}</a>
            )
          )}
        </div>
        <div className="nav-actions">
          <LanguageToggle />
          <PrintButton label={t.printBtn} />
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="hero">
        <motion.div
          className="hero-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.7, 0, 0.2, 1] }}
        />
        <div className="eyebrow">{t.hero.eyebrow}</div>
        <h1 className="hero-name">
          Rizqi Akbar
          <br />
          <span className="it gold-text">Pratama</span>
        </h1>
        <p className="hero-role">
          {roleParts[0]}
          {roleParts[1] && <br />}
          {roleParts[1]}
        </p>
        <div className="hero-tags">
          {t.hero.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="scroll-cue">{t.scrollCue}</div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section id="about" className="section">
        <Reveal>
          <SectionHead num="01" title={t.sections.about} />
        </Reveal>
        <div className="about-grid">
          <Reveal delay={0.1}>
            <div>
              <p
                className="about-lead"
                dangerouslySetInnerHTML={{ __html: t.about.p1 }}
              />
              <p
                className="summary"
                style={{ marginTop: 24 }}
                dangerouslySetInnerHTML={{ __html: t.about.p2 }}
              />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="fact-list">
              {factEntries.map((fact) => (
                <div key={fact.label} className="fact-row">
                  <div className="fact-label">{fact.label}</div>
                  <div className="fact-value">{fact.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROJECT ─────────────────────────────────────────── */}
      <section id="project" className="section">
        <Reveal>
          <SectionHead num="02" title={t.sections.project} />
        </Reveal>
        <Reveal delay={0.1}>
          <div
            className="feature-card"
            onMouseMove={handleMouseMove}
            ref={cardRef}
          >
            <h3 className="feature-card-name">{t.project.name}</h3>
            <div className="feature-url">{t.project.url}</div>
            <p className="feature-card-desc">{t.project.desc}</p>
            <div className="feature-bullets">
              {t.project.capabilities.map((cap) => (
                <div key={cap}>{cap}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CREDENTIALS ──────────────────────────────────────── */}
      <section id="credentials" className="section">
        <Reveal>
          <SectionHead num="03" title={t.sections.credentials} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="cred-list">
            {t.credentials.rows.map((row, i) => (
              <div key={i} className="cred-row">
                <div className="cred-row-firm">{row.firm}</div>
                <div className="cred-row-status">{row.status}</div>
                <div className="cred-row-amount">{row.amount}</div>
                <div className="cred-row-date">{row.date}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <CertificateGallery certificates={certificates} />
        </Reveal>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────── */}
      <section id="skills" className="section">
        <Reveal>
          <SectionHead num="04" title={t.sections.skills} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="ledger">
            {t.skills.groups.map((group) => (
              <div key={group.title} className="ledger-column">
                <div className="ledger-column-title">{group.title}</div>
                {group.items.map((item, i) => (
                  <div key={i} className="ledger-item">
                    <div className="ledger-skill">{item}</div>
                    <div className="ledger-meter" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────────── */}
      <section id="experience" className="section">
        <Reveal>
          <SectionHead num="05" title={t.sections.experience} />
        </Reveal>
        <div className="timeline">
          <div className="timeline-line" />
          {t.experience.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="timeline-item">
                <div className="timeline-period">{item.period}</div>
                <div>
                  <div className="timeline-role">{item.role}</div>
                  <div className="timeline-org">{item.org}</div>
                  <div className="timeline-desc">{item.desc}</div>
                </div>
              </div>
              {/* Bakso photo gallery for the bakso item (index 1) */}
              {i === 1 && (
                <PhotoGallery photos={baksoPhotos} />
              )}
            </Reveal>
          ))}
          {/* Education — separate timeline item at the end */}
          <Reveal delay={0.3}>
            <div className="timeline-item">
              <div className="timeline-period">{t.education.period}</div>
              <div>
                <div className="timeline-role">{t.education.role}</div>
                <div className="timeline-org">{t.education.org}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer id="contact" className="section" style={{ paddingBottom: 48 }}>
        <Reveal>
          <div className="footer-mark">06</div>
          <div className="big serif" style={{ marginTop: 24, marginBottom: 8 }}>
            {t.footer.big}
          </div>
          <div className="footer-links">
            <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
            <a href="https://luxtradee.web.id" target="_blank" rel="noopener noreferrer">
              {t.footer.website}
            </a>
          </div>
          <div className="footer-bottom">
            <span>{t.footer.bottomLeft}</span>
            <span>{t.footer.bottomRight}</span>
          </div>
        </Reveal>
      </footer>
    </>
  );
}
