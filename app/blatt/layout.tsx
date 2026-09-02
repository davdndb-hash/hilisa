import type { Metadata } from "next";

/**
 * Layout für die Ein-Blatt-Übersichten.
 *
 * Diese Seiten sind kein Teil der Website im üblichen Sinn — sie sind die
 * Druckvorlagen, aus denen die PDFs in `public/` erzeugt werden. Kopfzeile und
 * Fußzeile der Website haben darauf nichts zu suchen; sie werden über
 * `body:has(.blatt)` in `globals.css` ausgeblendet, weil das Wurzel-Layout in
 * Next.js nicht umgangen werden kann.
 *
 * PDFs neu erzeugen: `node scripts/blatt-pdf.mjs` (siehe README).
 */

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BlattLayout({ children }: { children: React.ReactNode }) {
  return <div className="blatt">{children}</div>;
}
