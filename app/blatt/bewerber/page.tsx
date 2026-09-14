import type { Metadata } from "next";
import { BlattFuss, BlattKopf, BlattListe, BlattSpalte } from "@/components/BlattTeile";

/**
 * Ein-Blatt-Übersicht für Bewerberinnen.
 *
 * Gedacht zum Aushängen: Rewe, Apotheke, Pfarrgemeinde, Nachbarschaftstreff,
 * Volkshochschule. Wird im Vorbeigehen aus zwei Metern gelesen — deshalb steht
 * das Angebot in der Überschrift und die Nummer groß am Fuß.
 *
 * Kein Stundenlohn. Begründung steht in app/mitarbeiten/page.tsx.
 * Selbstständig auf Honorarbasis, nicht angestellt (Korrektur 14.9.2026, abends).
 */

export const metadata: Metadata = {
  title: "Ein-Blatt-Übersicht für Bewerberinnen",
};

export default function BlattBewerber() {
  return (
    <div className="blatt-kompakt">
      <BlattKopf
        marker="Stellenangebot"
        titel="Zwei Stunden bei einem Menschen, der sich auf Sie freut."
        unterzeile="Wir suchen Alltagsbegleiterinnen und Alltagsbegleiter in München. Selbstständig auf Honorarbasis, Ihre Zeiten, feste Kundinnen in Ihrem Viertel."
      />

      <div className="blatt-koerper">
        <BlattSpalte titel="Was die Arbeit ist">
          <BlattListe
            punkte={[
              "Gesellschaft: Kaffee, Spaziergang, Karten, Fotoalben, zuhören",
              "Begleiten zum Arzt, zur Bank, zum Friedhof, zum Einkaufen",
              "Im Haushalt helfen: Wäsche, Küche, aufräumen, Betten",
              "Gemeinsam kochen, einkaufen, Vorräte auffüllen",
              "Post sortieren, Formulare und das Handy erklären",
            ]}
          />
        </BlattSpalte>

        <BlattSpalte titel="Was die Arbeit nicht ist">
          <BlattListe
            kreuz
            punkte={[
              "Keine Körperpflege. Kein Waschen, kein Anziehen.",
              "Keine Medikamente, keine Wunden, keine Spritzen.",
              "Kein Bargeld, keine Vollmachten.",
              "Keine Pflegedokumentation, nur eine kurze Notiz.",
            ]}
          />
          <p style={{ marginTop: "2mm" }}>
            Diese Grenze steht im Vertrag — und ist nicht verhandelbar.
          </p>
        </BlattSpalte>

        <div className="blatt-breit">
          <h2 className="blatt-h2">Was wir zusagen</h2>
          <BlattListe
            zwei
            punkte={[
              "Selbstständige Zusammenarbeit auf Honorarbasis — Sie stellen die Rechnung, kein Arbeitsvertrag.",
              "Die gesetzlich vorgeschriebene Schulung (30 Unterrichtseinheiten) vor dem ersten Einsatz — Details besprechen wir im Gespräch.",
              "Sie wählen Ihre Kundinnen in Ihrem Viertel — feste Zeiten, sobald Sie zugesagt haben.",
              "Wir planen Einsätze im selben Viertel, damit Wege kurz bleiben.",
              "Kein Springerdienst von einer Börse. Sie entscheiden, welche Kundinnen und Zeiten zu Ihnen passen.",
              "Eine Nummer für Ärger, die nicht bei der Einsatzleitung klingelt.",
            ]}
          />
        </div>

        <BlattSpalte titel="Was Sie mitbringen">
          <BlattListe
            punkte={[
              "Keine Ausbildung in der Pflege nötig",
              "Gern zuhören und gern reden — hier die Kernkompetenz",
              "Verlässlichkeit. Wer um zehn wartet, wartet wirklich.",
              "Freundlich nein sagen können, gutes Deutsch",
              "Führungszeugnis ohne Eintrag",
            ]}
          />
        </BlattSpalte>

        <BlattSpalte titel="So bewerben Sie sich">
          <ol className="blatt-schritte">
            <li>Anrufen und sagen, dass es um eine Stelle geht. Kein Anschreiben.</li>
            <li>Wir treffen uns eine Stunde. Dazu Lebenslauf und Führungszeugnis.</li>
            <li>Vereinbarung, dann die Schulung.</li>
            <li>Beim ersten Termin bei der Kundin ist jemand von uns dabei.</li>
          </ol>
        </BlattSpalte>

        <div className="blatt-breit">
          <div className="blatt-kasten">
            <strong>Zum Honorar.</strong> Im ersten Telefonat nennen wir Ihnen eine
            konkrete Zahl pro Einsatz. Sie arbeiten selbstständig und stellen uns
            dafür eine Rechnung — die genauen Konditionen besprechen wir gemeinsam.
          </div>
        </div>
      </div>

      <BlattFuss
        anrede="sie"
        zeile="Rufen Sie an und sagen Sie, dass es um eine Stelle geht. Nimmt niemand ab, sprechen Sie auf den Anrufbeantworter — wir rufen am selben Werktag zurück."
      />
    </div>
  );
}
