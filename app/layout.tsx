import type { Metadata, Viewport } from "next";
import Logo from "@/components/Logo";

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
  title: "Hi Lisa — Begleitung für ältere Menschen in München",
  description:
    "Deine Pflegekasse zahlt 131 Euro im Monat für Begleitung und Hilfe im Haushalt. Wir schicken jede Woche dieselbe Begleiterin und rechnen direkt mit der Kasse ab.",
  metadataBase: new URL("https://hilisa.example"),
  openGraph: {
    title: "Hi Lisa — Begleitung für ältere Menschen in München",
    description:
      "Begleitung, die sich anfühlt wie ein Hallo — nicht wie ein Formular.",
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

const NAV = [
  { href: "#rechner", text: "Was zahlt die Kasse?" },
  { href: "#leistungen", text: "Was wir machen" },
  { href: "#preise", text: "Preise" },
  { href: "#fragen", text: "Fragen" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <a href="#inhalt" className="sr-only">
          Zum Inhalt springen
        </a>

        <header
          style={{
            borderBottom: "1px solid var(--rule)",
            background: "var(--paper)",
            position: "sticky",
            top: 0,
            zIndex: 20,
          }}
        >
          <div
            className="wrap"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--s4)",
              flexWrap: "wrap",
              paddingTop: "var(--s3)",
              paddingBottom: "var(--s3)",
            }}
          >
            <a href="/" aria-label="Hi Lisa — Startseite" style={{ textDecoration: "none" }}>
              <Logo variant="paper" size={38} />
            </a>

            <nav
              aria-label="Hauptnavigation"
              style={{ display: "flex", gap: "var(--s4)", alignItems: "center" }}
            >
              <span className="nav-links">
                {NAV.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    style={{ fontSize: 17, fontWeight: 500, textDecoration: "none" }}
                  >
                    {n.text}
                  </a>
                ))}
              </span>
              <a className="btn btn-accent" href="tel:+4989000000">
                089 — Nummer
              </a>
            </nav>
          </div>
        </header>

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
                <span className="label on-dark">Rechtliches</span>
                <p style={{ marginBottom: 4 }}>
                  <a href="/impressum" style={{ color: "var(--paper)" }}>
                    Impressum
                  </a>
                </p>
                <p style={{ marginBottom: 4 }}>
                  <a href="/datenschutz" style={{ color: "var(--paper)" }}>
                    Datenschutz
                  </a>
                </p>
                <p>
                  <a href="#preise" style={{ color: "var(--paper)" }}>
                    Preise
                  </a>
                </p>
              </div>
              <div>
                <span className="label on-dark">Gut zu wissen</span>
                <p style={{ color: "rgba(252,251,247,0.78)" }}>
                  Wir machen keine Pflege im medizinischen Sinn. Kein Waschen, keine
                  Medikamente. Dafür alles, was den Tag leichter macht.
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: 15,
                color: "rgba(252,251,247,0.55)",
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
