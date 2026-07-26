"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { useI18n } from "./i18n-provider";
import { PrintButton } from "./print-button";
import { LanguageToggle } from "./language-toggle";
import { CertificateGallery } from "./certificate-gallery";
import { PhotoGallery } from "./photo-gallery";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════ */

const ease = [0.25, 1, 0.5, 1] as const;

/** Fade + slide from left */
function SlideLeft({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease }}
    >{children}</motion.div>
  );
}

/** Fade + slide from right */
function SlideRight({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease }}
    >{children}</motion.div>
  );
}

/** Fade + slide up */
function SlideUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
    >{children}</motion.div>
  );
}

/** Scale up from small */
function PopIn({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >{children}</motion.div>
  );
}

/** Stagger container — children get automatic delays */
function Stagger({ children, className, stagger = 0.07 }: { children: ReactNode; className?: string; stagger?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className}
      initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >{children}</motion.div>
  );
}

/** Stagger child item */
function SItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
      }}
    >{children}</motion.div>
  );
}

/** Animated section head with draw-in rule */
function SectionHead({ num, title }: { num: string; title: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <div ref={ref} className="section-head">
      <motion.span className="section-num"
        initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >{num}</motion.span>
      <motion.span className="section-title"
        initial={{ opacity: 0, x: -20, clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease }}
      >{title}</motion.span>
      <motion.span className="section-rule" aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 0.7 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease }}
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PANEL CONFIG
   ═══════════════════════════════════════════════════════════ */
const PANEL_IDS = ["hero", "about", "project", "credentials", "skills", "experience", "contact"] as const;
type PanelKey = (typeof PANEL_IDS)[number];

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function PortfolioContent() {
  const { t, locale } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const [current, setCurrent] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const total = PANEL_IDS.length;
  const currentRef = useRef(current);
  currentRef.current = current;

  /* ── Horizontal scroll logic ──────────────────────────── */
  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(total - 1, index));
    track.scrollTo({ left: clamped * window.innerWidth, behavior: "smooth" });
    setCurrent(clamped);
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      if (lockRef.current) return;
      lockRef.current = true;
      goTo(currentRef.current + (e.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => { lockRef.current = false; }, 700);
    };
    let touchX = 0;
    const onTS = (e: TouchEvent) => { touchX = e.touches[0].clientX; };
    const onTE = (e: TouchEvent) => { const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 50) goTo(currentRef.current + (dx < 0 ? 1 : -1)); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowRight") goTo(currentRef.current + 1); if (e.key === "ArrowLeft") goTo(currentRef.current - 1); };
    const onScroll = () => setCurrent(Math.round(track.scrollLeft / track.clientWidth));
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTS, { passive: true });
    window.addEventListener("touchend", onTE, { passive: true });
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchend", onTE);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [goTo]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const handleNavClick = (key: PanelKey) => { const idx = PANEL_IDS.indexOf(key); if (idx >= 0) goTo(idx); };

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
      <div className="grain-overlay" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* ── NAV ──────────────────────────────────────────── */}
      <nav className="site-nav">
        <motion.div className="nav-mark"
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
        >R·P</motion.div>
        <div className="nav-links">
          {(Object.keys(t.nav) as PanelKey[]).map((key) => (
            <motion.button key={key} type="button"
              className={`nav-link${PANEL_IDS.indexOf(key) === current ? " active" : ""}`}
              onClick={() => handleNavClick(key)}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 + PANEL_IDS.indexOf(key) * 0.06, ease }}
            >{t.nav[key]}</motion.button>
          ))}
        </div>
        <motion.div className="nav-actions"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <LanguageToggle />
          <PrintButton label={t.printBtn} />
        </motion.div>
      </nav>

      {/* ── PROGRESS BAR ─────────────────────────────────── */}
      <div className="h-progress-rail">
        <motion.div className="h-progress-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1, width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* ── HORIZONTAL SCROLL TRACK ─────────────────────── */}
      <div className="h-track" ref={trackRef}>

        {/* ════════ PANEL 0 : HERO ════════ */}
        <section className="h-panel hero-panel" id="hero">
          <motion.div className="hero-rule"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.7, 0, 0.2, 1] }}
          />
          <motion.div className="eyebrow"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
          >{t.hero.eyebrow}</motion.div>
          <h1 className="hero-name">
            <motion.span className="hero-line"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease }}
              style={{ display: "block" }}
            >Rizqi Akbar</motion.span>
            <motion.span className="hero-line it gold-text"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease }}
              style={{ display: "block" }}
            >Pratama</motion.span>
          </h1>
          <motion.p className="hero-role"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease }}
          >
            {roleParts[0]}{roleParts[1] && <br />}{roleParts[1]}
          </motion.p>
          <div className="hero-tags">
            {t.hero.tags.map((tag, i) => (
              <motion.span key={tag} className="tag"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.5 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              >{tag}</motion.span>
            ))}
          </div>
          <motion.div className="scroll-cue"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
          >{t.scrollCue}</motion.div>
        </section>

        {/* ════════ PANEL 1 : ABOUT ════════ */}
        <section className="h-panel" id="about">
          <div className="h-panel-inner">
            <SectionHead num="01" title={t.sections.about} />
            <div className="about-grid">
              <SlideLeft delay={0.2}>
                <p className="about-lead" dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
                <p className="summary" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t.about.p2 }} />
              </SlideLeft>
              <SlideRight delay={0.35}>
                <div className="fact-list">
                  {factEntries.map((fact, i) => (
                    <motion.div key={fact.label} className="fact-row"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease }}
                    >
                      <div className="fact-label">{fact.label}</div>
                      <div className="fact-value">{fact.value}</div>
                    </motion.div>
                  ))}
                </div>
              </SlideRight>
            </div>
          </div>
        </section>

        {/* ════════ PANEL 2 : PROJECT ════════ */}
        <section className="h-panel" id="project">
          <div className="h-panel-inner">
            <SectionHead num="02" title={t.sections.project} />
            <motion.div className="feature-card"
              onMouseMove={handleMouseMove} ref={cardRef}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
            >
              <motion.h3 className="feature-card-name"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
              >{t.project.name}</motion.h3>
              <motion.div className="feature-url"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.45 }}
              >{t.project.url}</motion.div>
              <motion.p className="feature-card-desc"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, ease }}
              >{t.project.desc}</motion.p>
              <Stagger className="feature-bullets" stagger={0.06}>
                {t.project.capabilities.map((cap) => (
                  <SItem key={cap}>{cap}</SItem>
                ))}
              </Stagger>
            </motion.div>
          </div>
        </section>

        {/* ════════ PANEL 3 : CREDENTIALS ════════ */}
        <section className="h-panel" id="credentials">
          <div className="h-panel-inner">
            <SectionHead num="03" title={t.sections.credentials} />
            <Stagger className="cred-list" stagger={0.08}>
              {t.credentials.rows.map((row, i) => (
                <motion.div key={i} className="cred-row"
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
                  }}
                >
                  <div className="cred-row-firm">{row.firm}</div>
                  <div className="cred-row-status">{row.status}</div>
                  <div className="cred-row-amount">{row.amount}</div>
                  <div className="cred-row-date">{row.date}</div>
                </motion.div>
              ))}
            </Stagger>
            <SlideUp delay={0.25}>
              <CertificateGallery certificates={certificates} />
            </SlideUp>
          </div>
        </section>

        {/* ════════ PANEL 4 : SKILLS ════════ */}
        <section className="h-panel" id="skills">
          <div className="h-panel-inner">
            <SectionHead num="04" title={t.sections.skills} />
            <div className="ledger">
              {t.skills.groups.map((group, gi) => (
                <SlideUp key={group.title} delay={0.15 + gi * 0.12}>
                  <div className="ledger-column">
                    <motion.div className="ledger-column-title"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + gi * 0.12, ease }}
                    >{group.title}</motion.div>
                    <Stagger stagger={0.06}>
                      {group.items.map((item, i) => (
                        <motion.div key={i} className="ledger-item"
                          variants={{
                            hidden: { opacity: 0, x: -16 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
                          }}
                        >
                          <div className="ledger-skill">{item}</div>
                          <motion.div className="ledger-meter"
                            variants={{
                              hidden: { scaleX: 0 },
                              visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.2, ease } },
                            }}
                            style={{ transformOrigin: "left" }}
                          />
                        </motion.div>
                      ))}
                    </Stagger>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ PANEL 5 : EXPERIENCE ════════ */}
        <section className="h-panel" id="experience">
          <div className="h-panel-inner">
            <SectionHead num="05" title={t.sections.experience} />
            <div className="timeline">
              <motion.div className="timeline-line"
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease }}
                style={{ transformOrigin: "top" }}
              />
              {t.experience.items.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease }}
                >
                  <div className="timeline-item">
                    <motion.div className="timeline-period"
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    >{item.period}</motion.div>
                    <div>
                      <div className="timeline-role">{item.role}</div>
                      <div className="timeline-org">{item.org}</div>
                      {item.org.includes("Bakso") || item.org.includes("bakso") ? (
                        <motion.a
                          href="https://baksoaanmuda.vercel.app/"
                          target="_blank" rel="noopener noreferrer"
                          className="timeline-link"
                          initial={{ opacity: 0, width: 0 }}
                          whileInView={{ opacity: 1, width: "auto" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >baksoaanmuda.vercel.app</motion.a>
                      ) : null}
                      <div className="timeline-desc">{item.desc}</div>
                    </div>
                  </div>
                  {i === 1 && <PhotoGallery photos={baksoPhotos} />}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
              >
                <div className="timeline-item">
                  <div className="timeline-period">{t.education.period}</div>
                  <div>
                    <div className="timeline-role">{t.education.role}</div>
                    <div className="timeline-org">{t.education.org}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════ PANEL 6 : FOOTER ════════ */}
        <section className="h-panel" id="contact">
          <div className="h-panel-inner footer-inner">
            <motion.div className="footer-mark"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >06</motion.div>
            <motion.div className="big serif" style={{ marginTop: 24, marginBottom: 8 }}
              initial={{ opacity: 0, y: 24, clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease }}
            >{t.footer.big}</motion.div>
            <motion.div className="footer-links"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
            >
              <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
              <a href="https://luxtradee.web.id" target="_blank" rel="noopener noreferrer">{t.footer.website}</a>
              <a href="https://baksoaanmuda.vercel.app/" target="_blank" rel="noopener noreferrer">{t.footer.baksoWebsite}</a>
            </motion.div>
            <motion.div className="footer-bottom"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span>{t.footer.bottomLeft}</span>
              <span>{t.footer.bottomRight}</span>
            </motion.div>
          </div>
        </section>

      </div>{/* end h-track */}

      {/* ── DOTS NAVIGATION ─────────────────────────────── */}
      <div className="h-dots" role="tablist" aria-label="Navigasi panel">
        {PANEL_IDS.map((_, i) => (
          <motion.button
            key={i} type="button"
            className={`h-dot${i === current ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Panel ${i + 1}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 1.4 + i * 0.05 }}
          />
        ))}
      </div>
    </>
  );
}
