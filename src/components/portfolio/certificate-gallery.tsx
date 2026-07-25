"use client";

import { useState } from "react";
import { Lightbox } from "./lightbox";

interface CertificateGalleryProps {
  certificates: {
    src: string;
    alt: string;
    firm: string;
  }[];
}

export function CertificateGallery({ certificates }: CertificateGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = certificates.map((c) => ({
    src: c.src,
    alt: `${c.firm} — ${c.alt}`,
  }));

  return (
    <>
      <div className="evidence-label">
        <span className="evidence-label-text">Bukti Sertifikat</span>
        <span className="evidence-label-line" />
      </div>
      <div className="cert-grid">
        {certificates.map((cert, i) => (
          <button
            key={cert.src}
            className="cert-thumb"
            onClick={() => openLightbox(i)}
            aria-label={`Lihat sertifikat ${cert.firm}`}
          >
            <img src={cert.src} alt={cert.alt} loading="lazy" />
            <span className="cert-thumb-label">{cert.firm}</span>
          </button>
        ))}
      </div>
      <Lightbox
        images={lightboxImages}
        initialIndex={activeIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
