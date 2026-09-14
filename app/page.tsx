import Link from "next/link";
import { Abschnitt, Hero, Kartenraster, Punkteliste, Rueckrufblock, Schritte } from "@/components/Bausteine";
import { IconBegleitung, IconKochen, IconPost, IconHaushalt, IconZeitZuZweit, IconHandy } from "@/components/Icons";

/**
 * Startseite (Care-only, seit 14.9.2026 — dritte Überarbeitung 14.9.2026 abends).
 *
 * Dritte Überarbeitung: Hero repositioniert. Vorher führte der Hero mit dem
 * Pflegekassen-Betrag — liest sich wie eine Versicherungs-Transaktion, bevor
 * überhaupt klar ist, was Hi Lisa eigentlich ist. Jetzt identitätserst wie
 * papa.com ("Hi! We're Papa."): "Hi Lisa!" als Marke/Begrüßung in einem,
 * direkt gefolgt von den konkreten Erledigungen (Arzt, Apotheke, Einkauf) —
 * Geselligkeit ist Teil des Satzes, aber nicht mehr die ganze Botschaft.
 * "Bezahlter Freund" ist bewusst zweitrangig: Hi Lisa ist in erster Linie
 * Alltagshilfe für Dinge, die allein nicht mehr gehen, keine Einsamkeitskur.
 * Das Pflegekassen-Argument bleibt im Fineprint unter dem CTA, nicht im Hero.
 *
 * "Hi Lisa!" läuft im Hero-Titel-Modus "display" (siehe Bausteine.tsx/Hero):
 * viel größer als die Satz-Titel auf den anderen Seiten, mit einem einmaligen
 * Auftauch-Effekt beim Reinscrollen (HeroTitlePop.tsx, per IntersectionObserver,
 * respektiert prefers-reduced-motion).
 *
 * Leistungen-Reihenfolge dementsprechend gedreht: Erledigungen (Begleitung,
 * Kochen/Einkauf, Post/Papierkram, Haushalt) vor den beiden rein sozialen
 * Punkten (Zeit zu zweit, Handy/Tablet) — spiegelt die neue Hero-Gewichtung.
 *
 * Architektur (unverändert seit zweiter Überarbeitung): Kartenraster
 * (Leistungen) → Punkteliste (Vertrauen) → Schritte (Ablauf) → Rückruf.
 *
 * Privat und Enterprise bleiben aus Navigation und Querverweisen (siehe
 * Abschnitt 5 im Projekt). Details, der Rechner und die volle FAQ stehen auf /care.
 */

const LEISTUNGEN = [
  {
    titel: "Begleitung",
    text: "Zum Arzt, zur Bank, zum Friedhof, zum Einkaufen. Mit dem Auto oder zu Fuß, wie es gerade geht.",
    icon: <IconBegleitung />,
  },
  {
    titel: "Kochen und Einkauf",
    text: "Gemeinsam kochen oder vorkochen, Vorräte auffüllen, Rezepte in der Apotheke holen.",
    icon: <IconKochen />,
  },
  {
    titel: "Post und Papierkram",
    text: "Briefe sortieren, Formulare verstehen, Termine notieren, Anträge vorbereiten.",
    icon: <IconPost />,
  },
  {
    titel: "Haushalt",
    text: "Wäsche, Küche, aufräumen, Betten frisch beziehen. Keine Handwerksarbeiten.",
    icon: <IconHaushalt />,
  },
  {
    titel: "Zeit zu zweit",
    text: "Kaffee, Spaziergang, Karten, Fotoalben, erzählen. Der Teil, den Angehörige am meisten vermissen.",
    icon: <IconZeitZuZweit />,
  },
  {
    titel: "Handy und Tablet",
    text: "Videoanruf mit den Enkeln, Fotos anschauen, Termine eintragen, Apps erklären.",
    icon: <IconHandy />,
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
        title="Hi Lisa!"
        titleVariant="display"
        lead="Jemand, der vorbeikommt — für den Arzttermin, die Apotheke, den Wocheneinkauf. Und zwischendurch auch für einen Kaffee und ein offenes Ohr."
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
        titel="Alles, was allein nicht mehr so einfach geht."
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
