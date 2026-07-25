"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LightboxProps {
  images: { src: string; alt: string }[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

export function Lightbox({
  images,
  initialIndex = 0,
  open,
  onClose,
}: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex]);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="lightbox-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="lightbox-close"
              onClick={onClose}
              aria-label="Tutup"
            >
              ✕
            </button>

            {/* Prev button */}
            {images.length > 1 && (
              <button
                className="lightbox-nav lightbox-prev"
                onClick={goPrev}
                aria-label="Sebelumnya"
              >
                ‹
              </button>
            )}

            {/* Image */}
            <img
              src={images[current].src}
              alt={images[current].alt}
              className="lightbox-img"
            />

            {/* Next button */}
            {images.length > 1 && (
              <button
                className="lightbox-nav lightbox-next"
                onClick={goNext}
                aria-label="Selanjutnya"
              >
                ›
              </button>
            )}

            {/* Caption / counter */}
            <div className="lightbox-caption">
              <span>{images[current].alt}</span>
              {images.length > 1 && (
                <span className="lightbox-counter">
                  {current + 1} / {images.length}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
