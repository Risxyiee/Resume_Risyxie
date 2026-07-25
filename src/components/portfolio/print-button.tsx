"use client";

interface PrintButtonProps {
  label?: string;
}

export function PrintButton({ label = "Unduh sebagai PDF" }: PrintButtonProps) {
  return (
    <button className="print-btn" onClick={() => window.print()}>
      ⬇ {label}
    </button>
  );
}
