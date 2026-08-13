"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { useI18n } from "./i18n-provider";
import { PrintButton } from "./print-button";
import { LanguageToggle } from "./language-toggle";
import { CertificateGallery } from "./certificate-gallery";
import { PhotoGallery } from "./photo-gallery";
import { SnakeParticles } from "./snake-particles";
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

/** Animated gold decorative line */
function GoldLine({ delay = 0, className, style }: { delay?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div className={className} style={{ height: 1, background: "linear-gradient(90deg, var(--gold-1), var(--gold-2), transparent)", ...style }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease }}
    />
  );
}

/** Text reveal with clip-path animation */
function TextReveal({ children, delay = 0, className, as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: React.ElementType }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, delay, ease }}
    >{children}</motion.div>
  );
}

/** Word-by-word stagger reveal */
function WordStagger({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <motion.span key={i} style={{ display: "inline-block", marginRight: "0.3em" }}
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } }}
        >{word}</motion.span>
      ))}
    </motion.div>
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
   PROJECT CARD — per-card mouse spotlight
   ═══════════════════════════════════════════════════════════ */
function ProjectCard({
  proj,
  index,
  images,
}: {
  proj: { name: string; url: string; link: string; desc: string; capabilities: readonly string[] };
  index: number;
  images?: string[];
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.a
      href={proj.link}
      target="_blank"
      rel="noopener noreferrer"
      className="feature-card project-card-link"
      onMouseMove={handleMouseMove}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, delay: 0.1 + index * 0.15, ease: [0.25, 1, 0.5, 1] }}
    >
      {images && images.length > 0 && (
        <div className="project-card-images">
          {images.map((src, i) => (
            <div key={i} className="project-card-image-wrap">
              <img src={src} alt={proj.name} loading="lazy" />
            </div>
          ))}
        </div>
      )}
      <TextReveal delay={0.25 + index * 0.15} className="feature-card-name">
        {proj.name}
      </TextReveal>
      <GoldLine delay={0.5 + index * 0.15} />
      <motion.div className="feature-url"
        initial={{ opacity: 0, y: 8, letterSpacing: "0.3em" }}
        whileInView={{ opacity: 1, y: 0, letterSpacing: "0.1em" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.55 + index * 0.15, ease }}
      >{proj.url}</motion.div>
      <div style={{ marginTop: 16 }}>
        <WordStagger text={proj.desc} delay={0.6 + index * 0.15} />
      </div>
      <GoldLine delay={0.9 + index * 0.15} style={{ marginTop: 20, marginBottom: 4 }} />
      <Stagger className="feature-bullets" stagger={0.07}>
        {proj.capabilities.map((cap) => (
          <SItem key={cap}>{cap}</SItem>
        ))}
      </Stagger>
    </motion.a>
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
  const total = PANEL_IDS.length;
  const currentRef = useRef(current);
  useEffect(() => { currentRef.current = current; });

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
  const projectImages: Record<string, string[]> = {
    [t.projects[0].name]: [],
    [t.projects[1].name]: ["/evidence/bakso-1.png", "/evidence/bakso-2.jpeg"],
    [t.projects[2].name]: ["/evidence/pesanlagi-1.png", "/evidence/pesanlagi-2.png"],
  };
  const factEntries = [
    { label: t.about.facts.email, value: "riskiakbarp123@gmail.com" },
    { label: t.about.facts.location, value: locale === "id" ? "Kebumen, Jawa Tengah" : "Kebumen, Central Java" },
    { label: t.about.facts.education, value: t.about.facts.educationVal },
    { label: t.about.facts.focus, value: t.about.facts.focusVal },
  ];

  return (
    <>
      <SnakeParticles />
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
            initial={{ opacity: 0, x: -24, filter: "blur(3px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
          >{t.hero.eyebrow}</motion.div>
          <h1 className="hero-name">
            <motion.span className="hero-line"
              initial={{ opacity: 0, y: 50, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: "block" }}
            >Rizqi Akbar</motion.span>
            <motion.span className="hero-line it gold-text"
              initial={{ opacity: 0, y: 50, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 1.05, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: "block" }}
            >Pratama</motion.span>
          </h1>
          <motion.p className="hero-role"
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.4, ease }}
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
                <TextReveal delay={0.3} className="about-lead" as="p">{t.about.p1.replace(/<[^>]*>/g, "")}</TextReveal>
                <div style={{ marginTop: 24 }}><WordStagger text={t.about.p2.replace(/<[^>]*>/g, "")} delay={0.5} className="summary" /></div>
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
                      <motion.div className="fact-value"
                        initial={{ opacity: 0, x: 12, filter: "blur(3px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease }}
                      >{fact.value}</motion.div>
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
            <div className="project-cards-grid">
              {t.projects.map((proj, pi) => (
                <ProjectCard
                  key={proj.name}
                  proj={proj}
                  index={pi}
                  images={projectImages[proj.name]}
                />
              ))}
            </div>
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
                      initial={{ opacity: 0, x: -16, clipPath: "inset(0 100% 0 0)" }}
                      whileInView={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.2 + gi * 0.12, ease }}
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
                      <div className="timeline-desc"><WordStagger text={item.desc} delay={0.35} /></div>
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
              initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >06</motion.div>
            <motion.div className="big serif" style={{ marginTop: 24, marginBottom: 8 }}
              initial={{ opacity: 0, y: 28, clipPath: "inset(0 100% 0 0)", filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            >{t.footer.big}</motion.div>
            <motion.div className="footer-links"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
            >
              <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
              <a href="https://luxtradee.web.id" target="_blank" rel="noopener noreferrer">{t.footer.website}</a>
              <a href="https://baksoaanmuda.vercel.app/" target="_blank" rel="noopener noreferrer">{t.footer.baksoWebsite}</a>
              <a href="https://pesanlagi.web.id" target="_blank" rel="noopener noreferrer">{t.footer.pesanlagiWebsite}</a>
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
