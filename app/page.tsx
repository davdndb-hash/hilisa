import Link from "next/link";
import { Abschnitt, Hero, Kartenraster, Punkteliste, Rueckrufblock, Schritte } from "@/components/Bausteine";

/**
 * Startseite (Care-only, seit 14.9.2026 — überarbeitet 14.9.2026 abends).
 *
 * Zweite Überarbeitung: Hero auf einen Satz reduziert (keine separate Lead-Zeile
 * mehr). Die Architektur war zu monoton — zwei optisch identische
 * Sechser-Kartenraster hintereinander (Leistungen, Vertrauen) sahen nach
 * derselben Vorlage zweimal aus, und der "So läuft es ab"-Absatz danach hatte
 * kein visuelles Gewicht. Jetzt: Kartenraster (Leistungen) → Punkteliste
 * (Vertrauen, andere Form als eine Bausteine-Wiederholung) → Schritte
 * (kompakter Drei-Schritte-Ablauf, tatsächlich auf der Startseite wie bei
 * papa.com, nicht nur als Textverweis) → Rückruf.
 *
 * Privat und Enterprise bleiben aus Navigation und Querverweisen (siehe
 * Abschnitt 5 im Projekt). Details, der Rechner und die volle FAQ stehen auf /care.
 */

const LEISTUNGEN = [
  {
    titel: "Zeit zu zweit",
    text: "Kaffee, Spaziergang, Karten, Fotoalben, erzählen. Der Teil, den Angehörige am meisten vermissen.",
  },
  {
    titel: "Begleitung",
    text: "Zum Arzt, zur Bank, zum Friedhof, zum Einkaufen. Mit dem Auto oder zu Fuß, wie es gerade geht.",
  },
  {
    titel: "Haushalt",
    text: "Wäsche, Küche, aufräumen, Betten frisch beziehen. Keine Handwerksarbeiten.",
  },
  {
    titel: "Kochen und Einkauf",
    text: "Gemeinsam kochen oder vorkochen, Vorräte auffüllen, Rezepte in der Apotheke holen.",
  },
  {
    titel: "Post und Papierkram",
    text: "Briefe sortieren, Formulare verstehen, Termine notieren, Anträge vorbereiten.",
  },
  {
    titel: "Handy und Tablet",
    text: "Videoanruf mit den Enkeln, Fotos anschauen, Termine eintragen, Apps erklären.",
  },
];

// Begleiterinnen arbeiten selbstständig auf Honorarbasis für Hi Lisa, nicht
// angestellt. "Persönlich ausgesucht" ersetzt die frühere Formulierung
// "Festangestellt" — derselbe Vertrauenspunkt (keine wechselnden Fremden über
// eine App), ohne einen falschen Beschäftigungsstatus zu behaupten.
const VERTRAUEN = [
  "Persönlich ausgesucht — nicht wechselnde Fremde über eine App",
  "Führungszeugnis bei der Einstellung und danach alle drei Jahre",
  "30 Stunden Schulung, bevor jemand zum ersten Mal allein kommt",
  "Wir schauen selbst vorbei — im ersten Monat und danach jedes Vierteljahr",
  "Klare Grenzen schriftlich: kein Waschen, keine Medikamente, kein Bargeld",
  "Eine Nummer für Beschwerden, die nicht bei der Einsatzleitung klingelt",
];

const ABLAUF_KURZ = [
  {
    titel: "Anrufen oder schreiben",
    text: "Zwanzig Minuten am Telefon. Wir klären, was gebraucht wird.",
  },
  {
    titel: "Kostenlos kennenlernen",
    text: "Bei euch zu Hause, zusammen mit der Begleiterin, die später kommt.",
  },
  {
    titel: "Wir übernehmen den Papierkram",
    text: "Direkt mit der Kasse abgerechnet. Feste Woche, feste Person.",
  },
];

export default function Home() {
  return (
    <>
      {/* -------------------------------------------------------------- Hero */}
      <Hero
        eyebrow="Begleitung in München"
        title="Deine Pflegekasse zahlt 131 € im Monat — die meisten holen sich das Geld nie."
        titleWidth="22ch"
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
        fineprint="Kostenloses Erstgespräch. Wir prüfen mit, wie viel Guthaben bei der Kasse noch offen ist."
      />

      {/* -------------------------------------------------------- Leistungen */}
      <Abschnitt
        id="leistungen"
        label="Was wir machen"
        titel="Gesellschaft. Und alles, was den Tag leichter macht."
        lead="Zwei Stunden, ein fester Termin, dieselbe Person. Keine Pflege im medizinischen Sinn — dafür genau das, wofür sonst niemand mehr Zeit hat."
      >
        <Kartenraster eintraege={LEISTUNGEN} />
      </Abschnitt>

      {/* --------------------------------------------------------- Vertrauen */}
      <Abschnitt
        id="vertrauen"
        narrow
        label="Warum Angehörige uns die Wohnung anvertrauen"
        titel="Wir schicken keine Fremden. Wir schicken deine Begleiterin."
      >
        <div style={{ marginTop: "var(--s6)" }}>
          <Punkteliste punkte={VERTRAUEN} />
        </div>
      </Abschnitt>

      {/* ------------------------------------------------------------ Ablauf */}
      <Abschnitt
        id="ablauf"
        label="So läuft es ab"
        titel="Anrufen. Kennenlernen. Wir übernehmen den Papierkram."
      >
        <Schritte schritte={ABLAUF_KURZ} />
        <div className="stack-cta" style={{ marginTop: "var(--s6)" }}>
          <Link className="btn btn-primary" href="/care">
            Alle Details, der Rechner und häufige Fragen
          </Link>
        </div>
      </Abschnitt>

      {/* ----------------------------------------------------------- Rückruf */}
      <Rueckrufblock />
    </>
  );
}
