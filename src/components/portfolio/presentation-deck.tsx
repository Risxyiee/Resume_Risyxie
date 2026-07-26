"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

interface PresentationDeckProps {
  children: ReactNode;
}

export function PresentationDeck({ children }: PresentationDeckProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const slides = Children.toArray(children);
  const total = slides.length;
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      const deck = deckRef.current;
      if (!deck) return;
      const clamped = Math.max(0, Math.min(total - 1, index));
      const target = deck.children[clamped] as HTMLElement | undefined;
      target?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setCurrent(clamped);
    },
    [total]
  );

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10 && Math.abs(e.deltaX) < 10) return;
      e.preventDefault();
      if (lockRef.current) return;
      lockRef.current = true;
      const dir = e.deltaY + e.deltaX > 0 ? 1 : -1;
      goTo(current + dir);
      window.setTimeout(() => {
        lockRef.current = false;
      }, 600);
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
      const idx = Math.round(deck.scrollLeft / deck.clientWidth);
      if (idx !== current) setCurrent(idx);
    };

    deck.addEventListener("wheel", onWheel, { passive: false });
    deck.addEventListener("touchstart", onTouchStart, { passive: true });
    deck.addEventListener("touchend", onTouchEnd, { passive: true });
    deck.addEventListener("scroll", onScroll);
    window.addEventListener("keydown", onKey);

    return () => {
      deck.removeEventListener("wheel", onWheel);
      deck.removeEventListener("touchstart", onTouchStart);
      deck.removeEventListener("touchend", onTouchEnd);
      deck.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [current, goTo]);

  return (
    <div className="deck-wrapper">
      <div className="deck-progress-rail">
        <div
          className="deck-progress-fill"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      <div className="deck-counter">
        LEMBAR <span>{String(current + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
      </div>

      <div className="deck" ref={deckRef}>
        {slides.map((slide, i) => (
          <section className="deck-slide" key={i} aria-label={`Slide ${i + 1} dari ${total}`}>
            <span className="deck-slide-crop crop-tl" aria-hidden="true" />
            <span className="deck-slide-crop crop-tr" aria-hidden="true" />
            <span className="deck-slide-crop crop-bl" aria-hidden="true" />
            <span className="deck-slide-crop crop-br" aria-hidden="true" />
            <div className="deck-slide-inner">{slide}</div>
          </section>
        ))}
      </div>

      <div className="deck-dots" role="tablist" aria-label="Navigasi slide">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`deck-dot${i === current ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Ke slide ${i + 1}`}
            aria-current={i === current}
          />
        ))}
      </div>

      <div className="deck-arrows">
        <button
          type="button"
          className="deck-arrow-btn"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
        >
          ← Prev
        </button>
        <span className="deck-hint">Scroll atau geser untuk lanjut</span>
        <button
          type="button"
          className="deck-arrow-btn"
          onClick={() => goTo(current + 1)}
          disabled={current === total - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
