import type { Metadata } from "next";
import Rechner from "@/components/Rechner";
import {
  Abschnitt,
  AndereZweige,
  Fragenliste,
  Grenzhinweis,
  Punkteliste,
  Rueckrufblock,
  Schritte,
} from "@/components/Bausteine";
import { GRENZE, ZWEIGE } from "@/lib/zweige";

const Z = ZWEIGE.care;

export const metadata: Metadata = {
  title: "Hi Lisa Care — die Pflegekasse zahlt",
  description:
    "Mit Pflegegrad zahlt die Pflegekasse 131 Euro im Monat für Begleitung und Hilfe im Haushalt. Wir rechnen direkt mit der Kasse ab — du bekommst keine Rechnung.",
};

const ABLAUF = [
  {
    titel: "Du rufst an oder schreibst uns",
    text: "Zwanzig Minuten am Telefon. Wir klären, was gebraucht wird und wie viel Guthaben bei der Kasse noch offen ist.",
  },
  {
    titel: "Wir kommen einmal zum Kennenlernen",
    text: "Kostenlos, bei euch zu Hause, zusammen mit der Begleiterin, die später auch wirklich kommt.",
  },
  {
    titel: "Einmal unterschreiben, dann machen wir den Papierkram",
    text: "Mit der Abtretungserklärung rechnen wir direkt mit der Pflegekasse ab. Du bekommst keine Rechnung und musst nichts vorstrecken.",
  },
  {
    titel: "Fester Termin, feste Person",
    text: "Zum Beispiel jeden Dienstag von zehn bis zwölf. Ist sie krank, kommt die Vertretung, die ihr schon kennt.",
  },
];

const FUER_BEGLEITER = [
  "Der Einsatz ist geplant, nicht spontan: dieselbe Kundin, dieselbe Uhrzeit, jede Woche.",
  "Die Dokumentation ist Pflicht, weil die Kasse sie sehen will — dafür ist sie kurz und wir haben ein Formular.",
  "Die 30 Unterrichtseinheiten nach dem bayerischen Schulungskonzept sind gesetzlich vorgeschrieben. Wir bezahlen sie und du machst sie vor dem ersten Einsatz.",
  "Die Grenze ist nicht verhandelbar: keine Körperpflege, keine Medikamente. Wenn eine Kundin darum bittet, sagst du nein und rufst die Einsatzleitung an.",
];

const FRAGEN = [
  {
    frage: "Woher kommen die 131 Euro?",
    antwort:
      "Das ist der Entlastungsbetrag nach § 45b SGB XI. Er steht jedem mit Pflegegrad 1 bis 5 zu, der zu Hause lebt — unabhängig vom Einkommen. Das Geld ist zweckgebunden: es wird nicht ausgezahlt, sondern an anerkannte Anbieter gezahlt. Wir sind so ein Anbieter.",
  },
  {
    frage: "Kann es mehr als 131 Euro werden?",
    antwort:
      "Ab Pflegegrad 2 ja. Dann dürfen bis zu 40 Prozent des Pflegesachleistungsbetrags in Betreuung umgewandelt werden (§ 45a Abs. 4 SGB XI). Je nach Pflegegrad sind das mehrere Hundert Euro im Monat zusätzlich. Wir rechnen das im Gespräch für den konkreten Fall aus.",
  },
  {
    frage: "Verfällt das Guthaben?",
    antwort:
      "Ja. Was du im laufenden Jahr nicht nutzt, kannst du noch bis zum 30. Juni des folgenden Jahres abrufen. Danach ist es weg. Bei den meisten Familien liegen mehrere Hundert Euro auf dem Tisch, die zum Jahreswechsel verfallen.",
  },
  {
    frage: "Zahlt die Kasse wirklich alles?",
    antwort:
      "Sie zahlt bis zur Höhe deines Guthabens. Wer mehr Stunden will, als das Guthaben deckt, bucht den Rest über Hi Lisa Privat dazu — auf derselben Rechnung, mit derselben Begleiterin.",
  },
  {
    frage: "Muss meine Mutter dafür etwas beantragen?",
    antwort:
      "Wenn ein Pflegegrad da ist: nein, nur eine Unterschrift auf der Abtretungserklärung. Wenn keiner da ist: dann braucht es einen Antrag bei der Pflegekasse und einen Termin mit dem Medizinischen Dienst. Wir sagen dir am Telefon, ob das Sinn ergibt, und du kannst in der Zwischenzeit privat starten.",
  },
];

export default function Care() {
  return (
    <>
      <section style={{ paddingTop: "var(--s12)", paddingBottom: "var(--s9)" }}>
        <div className="wrap">
          <div className="surface-olive" style={{ padding: "clamp(28px, 5vw, 56px)" }}>
            <span className="label on-olive">Weg 1 von 3 · Bezahlt wird von: {Z.zahler}</span>
            <h1 style={{ color: "var(--paper)", maxWidth: "18ch" }}>
              Deine Pflegekasse zahlt 131 Euro im Monat. Die meisten holen sie sich nie.
            </h1>
            <p className="lead" style={{ color: "var(--on-olive-soft)" }}>
              Nur 38 von 100 Familien mit Pflegegeld nutzen dieses Geld überhaupt. Wir rechnen
              direkt mit der Kasse ab — du bekommst keine Rechnung und streckst nichts vor.
            </p>
            <div className="stack-cta" style={{ marginTop: "var(--s9)" }}>
              <a className="btn btn-accent" href="#rechner">
                Was steht uns zu?
              </a>
              <a
                className="btn btn-outline"
                href="tel:+4989000000"
                style={{ color: "var(--paper)", borderColor: "var(--paper)" }}
              >
                089 — Nummer eintragen
              </a>
            </div>
          </div>
        </div>
      </section>

      <Abschnitt narrow style={{ paddingTop: 0 }} label="Für wen" titel="Care ist der richtige Weg, wenn">
        <div style={{ marginTop: "var(--s6)" }}>
          <Punkteliste punkte={Z.fuerWen} />
        </div>
      </Abschnitt>

      <section id="rechner" style={{ paddingTop: "var(--s9)" }}>
        <div className="wrap narrow">
          <Rechner />
        </div>
      </section>

      <Abschnitt
        id="ablauf"
        label="So läuft es ab"
        titel="Vier Schritte, und du machst davon einen."
      >
        <Schritte schritte={ABLAUF} />
        <Grenzhinweis text={GRENZE} />
      </Abschnitt>

      <Abschnitt
        id="begleiterinnen"
        narrow
        label="Was das für Begleiterinnen bedeutet"
        titel="Care ist der planbarste Zweig"
        lead="Wenn du bei uns arbeitest, merkst du den Unterschied zwischen den drei Zweigen an vier Stellen."
      >
        <div style={{ marginTop: "var(--s6)" }}>
          <Punkteliste punkte={FUER_BEGLEITER} />
        </div>
        <p style={{ marginTop: "var(--s6)", color: "var(--ink-70)", fontSize: 18 }}>
          Angestellt, nicht selbstständig. Nach Stunden bezahlt, Schulung bezahlt, Fahrzeit
          innerhalb des Viertels bezahlt.
        </p>
      </Abschnitt>

      <Abschnitt id="fragen" narrow label="Häufige Fragen" titel="Fragen zur Kassenabrechnung">
        <Fragenliste fragen={FRAGEN} />
        <p style={{ marginTop: "var(--s9)", fontSize: 18 }}>
          Zum Ausdrucken und Hinlegen:{" "}
          <a href="/hi-lisa-blatt-kunden.pdf">Ein-Blatt-Übersicht als PDF</a> — eine Seite,
          große Schrift, Telefonnummer unten.
        </p>
      </Abschnitt>

      <AndereZweige ausser="care" />

      <Rueckrufblock titel="Wir prüfen mit, wie viel bei der Kasse noch offen ist." />
    </>
  );
}
