"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { useI18n } from "./i18n-provider";
import { PrintButton } from "./print-button";
import { LanguageToggle } from "./language-toggle";
import { CertificateGallery } from "./certificate-gallery";
import { PhotoGallery } from "./photo-gallery";
import { motion, useInView } from "framer-motion";

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
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: 28 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
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
    <div className="section-head">
      <span className="section-num">{num}</span>
      <span className="section-title">{title}</span>
      <span className="section-rule" aria-hidden="true" />
    </div>
  );
}

/* ── Panel IDs for navigation ───────────────────────────────── */
const PANEL_IDS = ["hero", "about", "project", "credentials", "skills", "experience", "contact"] as const;

type PanelKey = (typeof PANEL_IDS)[number];

export function PortfolioContent() {
  const { t, locale } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const [current, setCurrent] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const total = PANEL_IDS.length;

  /* ── Horizontal scroll logic ──────────────────────────── */
  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(total - 1, index));
      track.scrollTo({ left: clamped * window.innerWidth, behavior: "smooth" });
      setCurrent(clamped);
    },
    [total],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8 && Math.abs(e.deltaX) < 8) return;
      e.preventDefault();
      if (lockRef.current) return;
      lockRef.current = true;
      const dir = e.deltaY + e.deltaX > 0 ? 1 : -1;
      goTo(current + dir);
      window.setTimeout(() => {
        lockRef.current = false;
      }, 650);
    };

    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    };

    const onScroll = () => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      if (idx !== current) setCurrent(idx);
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [current, goTo]);

  /* ── Feature card spotlight ────────────────────────────── */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  /* ── Nav click → panel index ──────────────────────────── */
  const handleNavClick = (key: PanelKey) => {
    const idx = PANEL_IDS.indexOf(key);
    if (idx >= 0) goTo(idx);
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
      <nav className="site-nav">
        <div className="nav-mark">R·P</div>
        <div className="nav-links">
          {(Object.keys(t.nav) as PanelKey[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`nav-link${PANEL_IDS.indexOf(key) === current ? " active" : ""}`}
              onClick={() => handleNavClick(key)}
            >
              {t.nav[key]}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <LanguageToggle />
          <PrintButton label={t.printBtn} />
        </div>
      </nav>

      {/* ── PROGRESS BAR ────────────────────────────────────── */}
      <div className="h-progress-rail">
        <div
          className="h-progress-fill"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* ── HORIZONTAL SCROLL TRACK ────────────────────────── */}
      <div className="h-track" ref={trackRef}>

        {/* ═══ PANEL 0 : HERO ═══ */}
        <section className="h-panel hero-panel" id="hero">
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
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <div className="scroll-cue">{t.scrollCue}</div>
        </section>

        {/* ═══ PANEL 1 : ABOUT ═══ */}
        <section className="h-panel" id="about">
          <div className="h-panel-inner">
            <Reveal>
              <SectionHead num="01" title={t.sections.about} />
            </Reveal>
            <div className="about-grid">
              <Reveal delay={0.1}>
                <div>
                  <p className="about-lead" dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
                  <p className="summary" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t.about.p2 }} />
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
          </div>
        </section>

        {/* ═══ PANEL 2 : PROJECT ═══ */}
        <section className="h-panel" id="project">
          <div className="h-panel-inner">
            <Reveal>
              <SectionHead num="02" title={t.sections.project} />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="feature-card" onMouseMove={handleMouseMove} ref={cardRef}>
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
          </div>
        </section>

        {/* ═══ PANEL 3 : CREDENTIALS ═══ */}
        <section className="h-panel" id="credentials">
          <div className="h-panel-inner">
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
          </div>
        </section>

        {/* ═══ PANEL 4 : SKILLS ═══ */}
        <section className="h-panel" id="skills">
          <div className="h-panel-inner">
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
          </div>
        </section>

        {/* ═══ PANEL 5 : EXPERIENCE ═══ */}
        <section className="h-panel" id="experience">
          <div className="h-panel-inner">
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
                      {item.org.includes("Bakso") || item.org.includes("bakso") ? (
                        <a
                          href="https://baksoaanmuda.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="timeline-link"
                        >
                          baksoaanmuda.vercel.app
                        </a>
                      ) : null}
                      <div className="timeline-desc">{item.desc}</div>
                    </div>
                  </div>
                  {i === 1 && <PhotoGallery photos={baksoPhotos} />}
                </Reveal>
              ))}
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
          </div>
        </section>

        {/* ═══ PANEL 6 : FOOTER / CONTACT ═══ */}
        <section className="h-panel" id="contact">
          <div className="h-panel-inner footer-inner">
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
                <a href="https://baksoaanmuda.vercel.app/" target="_blank" rel="noopener noreferrer">
                  {t.footer.baksoWebsite}
                </a>
              </div>
              <div className="footer-bottom">
                <span>{t.footer.bottomLeft}</span>
                <span>{t.footer.bottomRight}</span>
              </div>
            </Reveal>
          </div>
        </section>

      </div>{/* end h-track */}

      {/* ── DOTS NAVIGATION ─────────────────────────────────── */}
      <div className="h-dots" role="tablist" aria-label="Navigasi panel">
        {PANEL_IDS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`h-dot${i === current ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Panel ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}
