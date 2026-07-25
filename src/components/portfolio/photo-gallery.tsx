"use client";

import { useState } from "react";
import { Lightbox } from "./lightbox";

interface PhotoGalleryProps {
  photos: {
    src: string;
    alt: string;
  }[];
  label?: string;
}

export function PhotoGallery({ photos, label = "Bukti Foto" }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="evidence-label">
        <span className="evidence-label-text">{label}</span>
        <span className="evidence-label-line" />
      </div>
      <div className="photo-grid">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            className="photo-thumb"
            onClick={() => openLightbox(i)}
            aria-label={`Lihat foto ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </button>
        ))}
      </div>
      <Lightbox
        images={photos}
        initialIndex={activeIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
