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

export function PhotoGallery({ photos, label }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {label && (
        <div className="evidence-label" style={{ marginTop: 16 }}>
          <span className="evidence-label-text">{label}</span>
          <span className="evidence-label-line" />
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, marginTop: 8 }}>
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            className="photo-frame"
            onClick={() => openLightbox(i)}
            aria-label={`View photo: ${photo.alt}`}
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
