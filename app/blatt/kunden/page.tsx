import type { Metadata } from "next";
import { BlattFuss, BlattKopf, BlattListe, BlattSpalte, BlattZahl } from "@/components/BlattTeile";

/**
 * Ein-Blatt-Übersicht für Kundinnen und Angehörige.
 *
 * Zielgruppe ist ausdrücklich die Hälfte des Marktes, die nicht online liest:
 * Internetnutzung bei 78+ liegt bei 42 Prozent, und 30 Prozent der Nichtnutzer
 * lassen Angehörige alles Digitale erledigen. Dieses Blatt wird ausgedruckt,
 * hingelegt und Wochen später wieder in die Hand genommen.
 *
 * Deshalb: eine Seite, Telefonnummer groß am Fuß, keine Verweise auf
 * Website-Abschnitte, keine QR-Codes als einziger Weg.
 */

export const metadata: Metadata = {
  title: "Ein-Blatt-Übersicht für Angehörige",
};

export default function BlattKunden() {
  return (
    <>
      <BlattKopf
        marker="Zum Mitnehmen"
        titel="Ihre Pflegekasse zahlt 131 Euro im Monat für Begleitung."
        unterzeile="Für Spaziergänge, Einkäufe, Arzttermine oder einfach zwei Stunden Gesellschaft. Jede Woche dieselbe Begleiterin — den Papierkram mit der Kasse machen wir."
      />

      <div className="blatt-koerper">
        <BlattSpalte titel="Was wir machen">
          <BlattListe
            punkte={[
              "Gesellschaft: Kaffee, Spaziergang, Karten, Fotoalben, erzählen",
              "Begleitung zum Arzt, zur Bank, zum Friedhof, zum Einkaufen",
              "Haushalt: Wäsche, Küche, aufräumen, Betten frisch beziehen",
              "Kochen, einkaufen, Vorräte auffüllen, Rezepte holen",
              "Post sortieren, Formulare verstehen, Termine notieren",
              "Handy und Tablet: Videoanruf mit den Enkeln, Fotos, Apps",
            ]}
          />
        </BlattSpalte>

        <BlattSpalte titel="Was wir nicht machen">
          <BlattListe
            kreuz
            punkte={[
              "Kein Waschen, kein Anziehen, keine Körperpflege",
              "Keine Medikamente, keine Verbände, keine Spritzen",
              "Kein Großputz, keine Fenster, keine Handwerksarbeiten",
              "Kein Bargeld, keine Vollmachten, keine Bankgeschäfte",
            ]}
          />
          <p style={{ marginTop: "2mm" }}>
            Körperpflege darf nur ein Pflegedienst leisten. Wird sie gebraucht, nennen wir
            Ihnen Dienste im Viertel.
          </p>
        </BlattSpalte>

        <BlattSpalte titel="Was es kostet">
          <BlattZahl zahl="131 €" text="im Monat von der Pflegekasse, ab Pflegegrad 1 — 1.572 € im Jahr" />
          <BlattListe
            punkte={[
              "Wir rechnen direkt mit der Kasse ab — Sie bekommen keine Rechnung.",
              "Ab Pflegegrad 2 kommt oft deutlich mehr dazu.",
              "Ohne Pflegegrad zahlen Sie selbst, ab zwei Stunden, monatlich kündbar.",
            ]}
          />
          <p style={{ marginTop: "2mm" }}>
            <strong>Wichtig:</strong> Nur 38 von 100 Familien nutzen dieses Geld überhaupt.
            Was Sie dieses Jahr nicht abrufen, verfällt am 30. Juni des nächsten Jahres.
          </p>
        </BlattSpalte>

        <BlattSpalte titel="So fängt es an">
          <ol className="blatt-schritte">
            <li>Sie rufen an. Zwanzig Minuten am Telefon.</li>
            <li>Wir kommen zum Kennenlernen — kostenlos, mit Ihrer künftigen Begleiterin.</li>
            <li>Sie unterschreiben einmal, den Rest mit der Kasse machen wir.</li>
            <li>Fester Termin, feste Person. Etwa jeden Dienstag, zehn bis zwölf.</li>
          </ol>
        </BlattSpalte>

        <div className="blatt-breit">
          <h2 className="blatt-h2">Warum Angehörige uns die Wohnung anvertrauen</h2>
          <BlattListe
            zwei
            punkte={[
              "Sorgfältig ausgesucht — keine App, keine wechselnden Fremden",
              "Führungszeugnis bei der Einstellung und alle drei Jahre",
              "30 Stunden Schulung, bevor jemand allein kommt",
              "Passt es nicht, tauschen wir — ohne Diskussion, ohne Kosten",
            ]}
          />
        </div>
      </div>

      <BlattFuss
        anrede="sie"
        zeile="Kostenloses Erstgespräch. Wir prüfen mit, wie viel Guthaben bei Ihrer Pflegekasse noch offen ist — auch wenn Sie sich danach gegen uns entscheiden."
      />
    </>
  );
}
