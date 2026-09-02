import type { Metadata } from "next";

export const metadata: Metadata = { title: "Datenschutz — Hi Lisa" };

/**
 * Gerüst einer Datenschutzerklärung. Muss vor dem Livegang von einer Anwältin
 * oder einem Anwalt für IT-Recht geprüft und an die tatsächliche Verarbeitung
 * angepasst werden.
 */
export default function Datenschutz() {
  return (
    <section>
      <div className="wrap narrow">
        <span className="label">Deine Daten</span>
        <h1>Datenschutz</h1>

        <div className="card card-rose" style={{ marginBottom: "var(--s9)" }}>
          <p style={{ marginBottom: 0, fontWeight: 500 }}>
            Entwurf. Muss vor dem Livegang anwaltlich geprüft und an die tatsächliche
            Verarbeitung angepasst werden.
          </p>
        </div>

        <h2>Kurz gesagt</h2>
        <p>
          Diese Seite setzt keine Cookies und lädt keine Werkzeuge zur Reichweitenmessung.
          Deshalb siehst du hier auch kein Banner. Die Schriftarten liegen auf unserem
          eigenen Server — es geht keine Anfrage an Google.
        </p>

        <h2>Verantwortlich</h2>
        <p>
          Firmierung und Anschrift eintragen. Kontaktdaten stehen im{" "}
          <a href="/impressum">Impressum</a>.
        </p>

        <h2>Rückrufformular</h2>
        <p>
          Wenn du uns deinen Namen und deine Telefonnummer hinterlässt, nutzen wir diese
          Angaben ausschließlich, um dich zurückzurufen. Wir geben sie nicht weiter und
          löschen sie, wenn der Kontakt abgeschlossen ist und keine gesetzlichen
          Aufbewahrungsfristen entgegenstehen. Rechtsgrundlage ist Artikel 6 Absatz 1
          Buchstabe b der Datenschutz-Grundverordnung.
        </p>

        <h2>Server-Protokolle</h2>
        <p>
          Beim Aufruf der Seite verarbeitet unser Hoster technische Zugriffsdaten. Hoster
          und Speicherdauer eintragen. Ein Vertrag zur Auftragsverarbeitung ist
          abzuschließen.
        </p>

        <h2>Deine Rechte</h2>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem kannst du dich bei
          einer Aufsichtsbehörde beschweren. Zuständig ist das Bayerische Landesamt für
          Datenschutzaufsicht.
        </p>
      </div>
    </section>
  );
}
