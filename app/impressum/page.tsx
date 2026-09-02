import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum — Hi Lisa" };

/**
 * Pflichtangaben nach § 5 DDG. Die Platzhalter müssen vor dem Livegang gefüllt
 * und der Text anwaltlich geprüft werden — ein fehlerhaftes Impressum ist abmahnfähig.
 */
export default function Impressum() {
  return (
    <section>
      <div className="wrap narrow">
        <span className="label">Pflichtangaben</span>
        <h1>Impressum</h1>

        <div className="card card-rose" style={{ marginBottom: "var(--s9)" }}>
          <p style={{ marginBottom: 0, fontWeight: 500 }}>
            Entwurf. Alle Platzhalter müssen vor dem Livegang gefüllt und der Text
            anwaltlich geprüft werden.
          </p>
        </div>

        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          Firmierung eintragen
          <br />
          Straße und Hausnummer eintragen
          <br />
          PLZ München
        </p>

        <h2>Vertreten durch</h2>
        <p>Name der Geschäftsführung eintragen</p>

        <h2>Kontakt</h2>
        <p>
          Telefon: 089 — Nummer eintragen
          <br />
          E-Mail: Adresse eintragen
        </p>

        <h2>Registereintrag</h2>
        <p>
          Registergericht eintragen
          <br />
          Registernummer eintragen
        </p>

        <h2>Umsatzsteuer</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer eintragen, oder Hinweis auf die
          Steuerbefreiung, sobald steuerlich geklärt.
        </p>

        <h2>Anerkennung</h2>
        <p>
          Anerkanntes Angebot zur Unterstützung im Alltag nach § 45a SGB XI.
          <br />
          Bayerisches Landesamt für Pflege, Amberg. Aktenzeichen eintragen, sobald erteilt.
        </p>

        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor
          einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </section>
  );
}
