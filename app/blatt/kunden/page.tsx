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
 *
 * Seit dem Pivot auf ausschließlich privat bezahlte Begleitung (23.9.2026, wie
 * papa.com): kein Pflegekassen-Rahmen mehr, direkte Buchung und Bezahlung.
 */

export const metadata: Metadata = {
  title: "Ein-Blatt-Übersicht für Angehörige",
};

export default function BlattKunden() {
  return (
    <>
      <BlattKopf
        marker="Zum Mitnehmen"
        titel="Begleitung, die Sie direkt buchen — ohne Antrag, ohne Wartezeit."
        unterzeile="Für Spaziergänge, Einkäufe, Arzttermine oder einfach zwei Stunden Gesellschaft. Jede Woche dieselbe Begleiterin — Sie buchen direkt bei uns."
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
          <BlattZahl zahl="42 €" text="pro Stunde, ab zwei Stunden pro Einsatz" />
          <BlattListe
            punkte={[
              "Keine Mitgliedsgebühr, keine Mindestlaufzeit.",
              "Anfahrt pauschal pro Einsatz.",
              "Monatlich kündbar, eine Rechnung am Monatsende.",
            ]}
          />
          <p style={{ marginTop: "2mm" }}>
            <strong>Gut zu wissen:</strong> Bis zu 20 Prozent als haushaltsnahe Dienstleistung
            von der Steuer absetzbar (§ 35a EStG).
          </p>
        </BlattSpalte>

        <BlattSpalte titel="So fängt es an">
          <ol className="blatt-schritte">
            <li>Sie rufen an. Zwanzig Minuten am Telefon.</li>
            <li>Wir kommen zum Kennenlernen — kostenlos, mit Ihrer künftigen Begleiterin.</li>
            <li>Sie buchen die Stunden, die Sie brauchen.</li>
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
        zeile="Kostenloses Erstgespräch — auch wenn Sie sich danach gegen uns entscheiden."
      />
    </>
  );
}
