"use client";

export function PrintButton() {
  return (
    <div className="print-bar">
      <button
        className="print-btn"
        onClick={() => window.print()}
      >
        ⬇ Unduh sebagai PDF
      </button>
    </div>
  );
}
