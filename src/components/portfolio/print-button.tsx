"use client";

interface PrintButtonProps {
  t?: string;
}

export function PrintButton({ t }: PrintButtonProps) {
  return (
    <button className="print-btn" onClick={() => window.print()}>
      ⬇ {t || "Unduh sebagai PDF"}
    </button>
  );
}
