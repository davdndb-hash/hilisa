import type { Metadata } from "next";
import {
  Abschnitt,
  AndereZweige,
  Fragenliste,
  Grenzhinweis,
  Hero,
  Kartenraster,
  Punkteliste,
  Rueckrufblock,
  Schritte,
} from "@/components/Bausteine";
import { GRENZE, ZWEIGE } from "@/lib/zweige";

const Z = ZWEIGE.privat;

export const metadata: Metadata = {
  title: "Hi Lisa Privat — ohne Pflegegrad, ohne Antrag",
  description:
    "Begleitung ohne Pflegegrad und ohne Antrag. Du buchst die Stunden, die du brauchst, ab zwei Stunden, monatlich kündbar.",
};

const ABLAUF = [
  {
    titel: "Du rufst an oder schreibst uns",
    text: "Zwanzig Minuten am Telefon. Kein Antrag, keine Begutachtung, kein Attest.",
  },
  {
    titel: "Wir kommen einmal zum Kennenlernen",
    text: "Kostenlos, bei euch zu Hause, zusammen mit der Begleiterin, die später auch wirklich kommt.",
  },
  {
    titel: "Du buchst die Stunden, die du willst",
    text: "Ab zwei Stunden pro Einsatz. Feste Woche oder einzelne Termine, wie es passt.",
  },
  {
    titel: "Rechnung am Monatsende",
    text: "Eine Rechnung, alle Einsätze aufgelistet, per Überweisung oder Lastschrift. Monatlich kündbar.",
  },
];

const ANLAESSE = [
  {
    titel: "Kein Pflegegrad — und soll auch keiner werden",
    text: "Manche wollen keine Begutachtung und keine Akte bei der Kasse. Völlig legitim. Privat läuft ohne beides.",
  },
  {
    titel: "Mehr Stunden, als die Kasse zahlt",
    text: "Das Kassenguthaben ist bei zwei Stunden pro Woche schnell aufgebraucht. Was darüber hinaus gebraucht wird, läuft privat weiter — dieselbe Begleiterin, dieselbe Uhrzeit.",
  },
  {
    titel: "Ein schwerer Monat",
    text: "Nach einem Krankenhausaufenthalt, während eurem Urlaub, nach einem Sturz, bei einem Umzug. Vorübergehend mehr Hilfe, ohne dass sich dauerhaft etwas ändert.",
  },
  {
    titel: "Der Antrag läuft noch",
    text: "Zwischen Antrag und Bescheid liegen oft Wochen. Du kannst sofort privat starten und später auf Care wechseln — ohne die Begleiterin zu wechseln.",
  },
  {
    titel: "Ihr wohnt weit auseinander",
    text: "Wer nicht in München lebt, kann nicht jede Woche vorbeifahren. Privat ist der Weg, jemanden verlässlich vor Ort zu haben.",
  },
  {
    titel: "Ein Geschenk",
    text: "Manche Familien buchen Stunden als Geschenk zum Geburtstag oder zu Weihnachten. Das funktioniert und wird überraschend oft gemacht.",
  },
];

const FUER_BEGLEITER = [
  "Die Einsätze sind bunter: manche wöchentlich, manche einmalig, manche für ein paar Wochen.",
  "Es gibt keine Kassendokumentation — nur unsere eigene kurze Notiz nach dem Einsatz.",
  "Die Kundin hat oft keinen Pflegegrad und ist körperlich fitter. Der Schwerpunkt liegt stärker auf Gesellschaft und Unternehmungen als auf Haushalt.",
  "Dieselbe Grenze wie überall: keine Körperpflege, keine Medikamente. Auch wenn privat bezahlt wird, ändert das nichts.",
];

const FRAGEN = [
  {
    frage: "Was kostet die Stunde?",
    antwort:
      "Preis eintragen. Es gibt keine Mitgliedsgebühr und keine Mindestlaufzeit. Anfahrt kommt pauschal pro Einsatz dazu, zwei Stunden sind die kleinste Buchung.",
  },
  {
    frage: "Warum ist Privat teurer als Care?",
    antwort:
      "Bei Care ist der Stundensatz gesetzlich gedeckelt, weil die Kasse zahlt. Bei Privat gibt es diesen Deckel nicht — dafür fallen Antrag, Begutachtung und Nachweispflichten weg. Das ist derselbe Dienst mit einer anderen Rechnung, nicht ein besserer.",
  },
  {
    frage: "Können wir Care und Privat kombinieren?",
    antwort:
      "Ja, und das ist der häufigste Fall. Zuerst wird das Kassenguthaben abgerufen, der Rest läuft privat. Du bekommst eine Rechnung nur über den privaten Teil.",
  },
  {
    frage: "Kann ich das von der Steuer absetzen?",
    antwort:
      "In vielen Fällen ja — haushaltsnahe Dienstleistungen nach § 35a EStG, 20 Prozent der Kosten bis zu einer Höchstgrenze. Wir stellen die Rechnung so aus, dass sie das Finanzamt akzeptiert: Leistung aufgeschlüsselt, per Überweisung bezahlt, kein Bargeld. Ob es in eurem Fall greift, sagt euer Steuerberater.",
  },
  {
    frage: "Wie kurzfristig geht das?",
    antwort:
      "Das Kennenlernen meist innerhalb einer Woche, der erste Einsatz danach. Ganz kurzfristig hängt es daran, ob im Viertel eine Begleiterin frei ist — ruf an, dann wissen wir es in fünf Minuten.",
  },
  {
    frage: "Gibt es eine Mindestlaufzeit?",
    antwort:
      "Nein. Monatlich kündbar, zum Monatsende, ohne Begründung. Auch einzelne Einsätze ohne festen Termin sind möglich.",
  },
];

export default function Privat() {
  return (
    <>
      <Hero
        variant="ink"
        eyebrow={`Weg 2 von 3 · Bezahlt wird von: ${Z.zahler}`}
        title="Kein Pflegegrad, kein Antrag, keine Begutachtung."
        lead="Dieselbe Begleiterin, dieselben Aufgaben, dieselben Regeln wie bei Care — nur ohne die Pflegekasse dazwischen. Du buchst, wir kommen. Ab zwei Stunden, monatlich kündbar."
        cta={
          <>
            <a className="btn btn-accent" href="#rueckruf">
              Rückruf anfordern
            </a>
            <a
              className="btn btn-outline"
              href="tel:+4989000000"
              style={{ color: "var(--paper)", borderColor: "var(--paper)" }}
            >
              089 — Nummer eintragen
            </a>
          </>
        }
      />

      <Abschnitt narrow style={{ paddingTop: 0 }} label="Für wen" titel="Privat ist der richtige Weg, wenn">
        <div style={{ marginTop: "var(--s6)" }}>
          <Punkteliste punkte={Z.fuerWen} />
        </div>
        <div className="card card-rose" style={{ marginTop: "var(--s9)" }}>
          <h3>Was es kostet</h3>
          <span className="big-number mono-num" style={{ marginTop: "var(--s3)" }}>
            {Z.zahl}
          </span>
          <p style={{ marginTop: "var(--s3)", fontSize: 18 }}>{Z.zahlText}</p>
          <p style={{ marginTop: "var(--s2)", marginBottom: 0, fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>
            Bis zu 20 % als haushaltsnahe Dienstleistung von der Steuer absetzbar (§ 35a EStG) — mehr dazu unten bei den Fragen.
          </p>
          <p style={{ marginTop: "var(--s3)", marginBottom: 0, color: "var(--ink-70)", fontSize: 18 }}>
            Anfahrt pauschal pro Einsatz. Keine Mitgliedsgebühr, keine Mindestlaufzeit.
          </p>
        </div>
      </Abschnitt>

      <Abschnitt
        id="anlaesse"
        label="Wann Familien privat buchen"
        titel="Sechs Fälle, die wir jede Woche hören"
      >
        <Kartenraster eintraege={ANLAESSE} />
      </Abschnitt>

      <Abschnitt id="ablauf" label="So läuft es ab" titel="Vier Schritte, ohne Behörde.">
        <Schritte schritte={ABLAUF} />
        <Grenzhinweis text={GRENZE} />
      </Abschnitt>

      <Abschnitt
        id="begleiterinnen"
        narrow
        label="Was das für Begleiterinnen bedeutet"
        titel="Privat ist der abwechslungsreichste Zweig"
        lead="Wenn du bei uns arbeitest, merkst du den Unterschied zwischen den drei Zweigen an vier Stellen."
      >
        <div style={{ marginTop: "var(--s6)" }}>
          <Punkteliste punkte={FUER_BEGLEITER} />
        </div>
        <p style={{ marginTop: "var(--s6)", color: "var(--ink-70)", fontSize: 18 }}>
          Der Stundenlohn ist derselbe wie bei Care. Wer bezahlt, ist eine Frage der
          Abrechnung — nicht deines Gehalts.
        </p>
      </Abschnitt>

      <Abschnitt id="fragen" narrow label="Häufige Fragen" titel="Fragen zu Preis und Abrechnung">
        <Fragenliste fragen={FRAGEN} />
        <p style={{ marginTop: "var(--s9)", fontSize: 18 }}>
          Zum Ausdrucken und Hinlegen:{" "}
          <a href="/hi-lisa-blatt-kunden.pdf">Ein-Blatt-Übersicht als PDF</a> — eine Seite,
          große Schrift, Telefonnummer unten.
        </p>
      </Abschnitt>

      <AndereZweige ausser="privat" />

      <Rueckrufblock titel="Sag uns, was gebraucht wird. Wir sagen dir, was es kostet." />
    </>
  );
}
