import Link from "next/link";
import { Abschnitt, Hero, Kartenraster, Rueckrufblock } from "@/components/Bausteine";

/**
 * Startseite (Care-only, seit 14.9.2026).
 *
 * Privat und Enterprise sind für jetzt aus dem Kundenauftritt genommen — Code und
 * Routen bleiben (`/privat`, `/fuer-betriebe`, `lib/zweige.ts`), nur Navigation und
 * Querverweise sind weg. Architektur angelehnt an papa.com: Hero → Leistungen
 * (Value Props) → Vertrauen (Trust) → kurzer Ablauf-Teaser → Rückruf. Keine
 * Drei-Wege-Auswahl mehr, kein Modell-Finder — es gibt nur noch einen Weg.
 *
 * Details, der Entlastungsbetrags-Rechner und die Fragen zur Abrechnung stehen auf
 * `/care`, die jetzt die Info-Seite ist.
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

const VERTRAUEN = [
  {
    titel: "Festangestellt",
    text: "Unsere Begleiterinnen sind bei uns angestellt. Keine App, keine wechselnden Fremden.",
  },
  {
    titel: "Jede legt ein Führungszeugnis vor",
    text: "Bei der Einstellung und danach alle drei Jahre. Vorgeschrieben ist das nicht. Wir machen es trotzdem.",
  },
  {
    titel: "Geschult, bevor sie kommt",
    text: "30 Unterrichtseinheiten nach dem bayerischen Schulungskonzept, bevor jemand das erste Mal allein kommt.",
  },
  {
    titel: "Wir schauen selbst vorbei",
    text: "Im ersten Monat und danach jedes Vierteljahr. Bei euch, nicht am Telefon.",
  },
  {
    titel: "Klare Grenzen, schriftlich",
    text: "Kein Waschen, keine Medikamente, kein Bargeld, keine Vollmachten. Von beiden Seiten unterschrieben.",
  },
  {
    titel: "Eine Nummer für Beschwerden",
    text: "Sie klingelt nicht bei der Einsatzleitung. Für euch und für unsere Mitarbeiterinnen.",
  },
];

export default function Home() {
  return (
    <>
      {/* -------------------------------------------------------------- Hero */}
      <Hero
        eyebrow="Begleitung in München"
        title="Deine Pflegekasse zahlt 131 € im Monat. Die meisten holen sie sich nie."
        titleWidth="19ch"
        lead="Jede Woche dieselbe Begleiterin: Spaziergang, Einkauf, Arzttermin, oder einfach zwei Stunden reden. Nur 38 von 100 Familien mit Pflegegeld nutzen dieses Guthaben überhaupt — wir rechnen direkt mit der Kasse ab, du bekommst keine Rechnung."
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
        label="Warum Angehörige uns die Wohnung anvertrauen"
        titel="Wir schicken keine Fremden. Wir schicken deine Begleiterin."
        lead="Das Schwierigste an dieser Arbeit ist nicht die Wäsche. Es ist die Frage, wer da eigentlich in der Wohnung steht, wenn du nicht dabei bist."
      >
        <Kartenraster eintraege={VERTRAUEN} />
      </Abschnitt>

      {/* ------------------------------------------------------ Ablauf-Teaser */}
      <Abschnitt
        narrow
        label="So läuft es ab"
        titel="Anrufen. Kennenlernen. Wir übernehmen den Papierkram."
        lead="Vier Schritte, und du machst davon genau einen — den ersten Anruf. Den vollständigen Ablauf, den Rechner für dein Guthaben und Antworten auf die häufigsten Fragen zur Kassenabrechnung findest du auf einer eigenen Seite."
      >
        <div className="stack-cta" style={{ marginTop: "var(--s6)" }}>
          <Link className="btn btn-primary" href="/care">
            So funktioniert&apos;s im Detail
          </Link>
        </div>
      </Abschnitt>

      {/* ----------------------------------------------------------- Rückruf */}
      <Rueckrufblock />
    </>
  );
}
