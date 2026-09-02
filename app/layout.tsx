import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import Nav from "@/components/Nav";
import { ZWEIG_LISTE } from "@/lib/zweige";

/**
 * Die Schriften kommen als npm-Paket und werden von unserer eigenen Domain
 * ausgeliefert. Es geht weder beim Bauen noch im Browser eine Anfrage an Google —
 * genau das war der Streitpunkt im Urteil des LG München I (3 O 17493/20).
 * Variable Achsen 200–800 decken alle im Brand Guide genannten Schnitte ab.
 */
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hi Lisa — Begleitung für ältere Menschen in München",
    template: "%s · Hi Lisa",
  },
  description:
    "Deine Pflegekasse zahlt 131 Euro im Monat für Begleitung und Hilfe im Haushalt. Wir schicken jede Woche dieselbe Begleiterin und rechnen direkt mit der Kasse ab.",
  metadataBase: new URL("https://hilisa.example"),
  openGraph: {
    title: "Hi Lisa — Begleitung für ältere Menschen in München",
    description: "Begleitung, die sich anfühlt wie ein Hallo — nicht wie ein Formular.",
    locale: "de_DE",
    type: "website",
  },
  robots: { index: false, follow: false }, // Entwurf: noch nicht indexieren
};

export const viewport: Viewport = {
  themeColor: "#7c8a2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <a href="#inhalt" className="skip-link">
          Zum Inhalt springen
        </a>

        <Nav />

        <main id="inhalt">{children}</main>

        <footer
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            marginTop: "var(--s18)",
            paddingTop: "var(--s12)",
            paddingBottom: "var(--s12)",
          }}
        >
          <div className="wrap">
            <Logo variant="ink" size={40} />
            <p
              className="display"
              style={{
                fontSize: "clamp(22px, 3.4vw, 30px)",
                lineHeight: 1.2,
                margin: "var(--s6) 0 var(--s9)",
                maxWidth: "22ch",
                color: "var(--paper)",
              }}
            >
              Begleitung, die sich anfühlt wie ein Hallo — nicht wie ein Formular.
            </p>

            <div className="grid grid-3" style={{ marginBottom: "var(--s9)" }}>
              <div>
                <span className="label on-dark">Kontakt</span>
                <p style={{ color: "rgba(252,251,247,0.78)", marginBottom: 4 }}>
                  089 — Nummer eintragen
                </p>
                <p style={{ color: "rgba(252,251,247,0.78)", marginBottom: 4 }}>
                  hallo@ — Adresse eintragen
                </p>
                <p style={{ color: "rgba(252,251,247,0.78)" }}>Montag bis Freitag, 8 bis 18 Uhr</p>
              </div>
              <div>
                <span className="label on-dark">Unsere drei Wege</span>
                {ZWEIG_LISTE.map((z) => (
                  <p key={z.id} style={{ margin: 0 }}>
                    <Link href={z.href} className="footer-link">
                      {z.name}
                    </Link>
                  </p>
                ))}
                <p style={{ margin: 0 }}>
                  <Link href="/#finder" className="footer-link">
                    Welches passt?
                  </Link>
                </p>
                <p style={{ margin: 0 }}>
                  <Link href="/mitarbeiten" className="footer-link">
                    Mitarbeiten
                  </Link>
                </p>
              </div>
              <div>
                <span className="label on-dark">Rechtliches</span>
                <p style={{ margin: 0 }}>
                  <Link href="/impressum" className="footer-link">
                    Impressum
                  </Link>
                </p>
                <p style={{ margin: "0 0 var(--s4)" }}>
                  <Link href="/datenschutz" className="footer-link">
                    Datenschutz
                  </Link>
                </p>
                <p style={{ margin: 0 }}>
                  <a href="/hi-lisa-blatt-kunden.pdf" className="footer-link">
                    Ein-Blatt-Übersicht (PDF)
                  </a>
                </p>
                <p style={{ color: "rgba(252,251,247,0.78)", fontSize: 17, marginTop: "var(--s4)" }}>
                  Wir machen keine Pflege im medizinischen Sinn. Kein Waschen, keine
                  Medikamente. Dafür alles, was den Tag leichter macht.
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: 16,
                color: "rgba(252,251,247,0.62)",
                borderTop: "1px solid rgba(252,251,247,0.18)",
                paddingTop: "var(--s6)",
                marginBottom: 0,
                maxWidth: "none",
              }}
            >
              Entwurf · Stand September 2026 · Beträge nach aktuellem Stand der Pflegeversicherung
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
