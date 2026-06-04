/**
 * Triggers the browser's print dialog, which the user saves as a PDF. The
 * print stylesheet (see index.css `@media print`) reflows the page into a
 * clean, light, ATS-friendly résumé, so the exported PDF always reflects the
 * current resume data — no separate document to maintain.
 */
export function DownloadResumeButton() {
  return (
    <button
      type="button"
      className="download-pdf no-print"
      onClick={() => window.print()}
      aria-label="Download résumé as PDF"
    >
      <span aria-hidden="true">⤓</span> Download PDF
    </button>
  );
}
