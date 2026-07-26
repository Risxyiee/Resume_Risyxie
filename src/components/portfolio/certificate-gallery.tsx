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
      <div className="frame-gallery" style={{ marginTop: 36 }}>
        {certificates.map((cert, i) => (
          <figure
            key={cert.src}
            className="frame"
            onClick={() => openLightbox(i)}
            role="button"
            tabIndex={0}
            aria-label={`View certificate: ${cert.firm}`}
            onKeyDown={(e) => { if (e.key === "Enter") openLightbox(i); }}
          >
            <img src={cert.src} alt={cert.alt} loading="lazy" />
            <figcaption className="frame-label">
              <span className="frame-name">{cert.firm}</span>
              <span className="frame-tag">Cert</span>
            </figcaption>
          </figure>
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
