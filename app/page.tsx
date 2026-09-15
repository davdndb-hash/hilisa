import Link from "next/link";
import {
  Abschnitt,
  Hero,
  Kartenraster,
  Merkmalkarten,
  Punkteliste,
  Rueckrufblock,
  Schritte,
  Zielgruppenkarten,
} from "@/components/Bausteine";
import {
  IconBegleitung,
  IconEinsamkeit,
  IconHandy,
  IconHaushalt,
  IconKochen,
  IconKosten,
  IconPost,
  IconUnabhaengigkeit,
  IconWohlbefinden,
  IconZeitZuZweit,
  IconZugang,
} from "@/components/Icons";

/**
 * Startseite (Care-only, seit 14.9.2026 — vierte Überarbeitung 15.9.2026,
 * nach Abgleich mit hilisa-startseite-stand.docx).
 *
 * Dritte Überarbeitung (14.9.2026): Hero repositioniert. Vorher führte der Hero
 * mit dem Pflegekassen-Betrag — liest sich wie eine Versicherungs-Transaktion,
 * bevor überhaupt klar ist, was Hi Lisa eigentlich ist. Jetzt identitätserst
 * wie papa.com ("Hi! We're Papa."): "Hi Lisa!" als Marke/Begrüßung in einem,
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
 * Vierte Überarbeitung (15.9.2026): hilisa-startseite-stand.docx brachte einen
 * kompletten Text-Entwurf mit, im Papa-Stil (Werteversprechen-Kacheln,
 * Zielgruppen-Teaser, Pflegekassen-Erklärblock). Übernommen wurde, was sich
 * ohne Bruch einfügt; drei Punkte, die frühere bewusste Entscheidungen
 * umgekehrt hätten, wurden vorher mit dem Auftraggeber abgestimmt:
 *
 * 1. Hero-Überschrift: Der Entwurf ersetzt "Hi Lisa!" durch einen Satz
 *    ("Selbstständig bleiben, mit Begleitung an der Seite"). Entscheidung:
 *    "Hi Lisa!" bleibt die große Titelmarke (samt Glow/Pop-Animation, die
 *    genau dafür gebaut wurde) — der neue Satz steht stattdessen jetzt als
 *    Lead-Text unter dem Titel und, identisch, als Tagline in der Fußzeile.
 * 2. Zielgruppen-Teaser: Der Entwurf verlinkt wieder auf /fuer-betriebe und
 *    /mitarbeiten — das kehrt die Care-only-Restrukturierung (Abschnitt 5 im
 *    Projekt) teilweise um. Entscheidung: gewünscht, siehe ZIELGRUPPEN unten
 *    und die Navigation in Nav.tsx/layout.tsx (Mitarbeiten bleibt trotzdem nur
 *    in der Fußzeile — Bewerber:innen sind keine Kundennavigation).
 * 3. Vertrauens-Block: Der Entwurf ersetzt den Vetting-Block (Führungszeugnis,
 *    Schulung, Beschwerdenummer) durch einen Pflegekassen-Erklärblock im
 *    selben Slot. Entscheidung: beide Blöcke bleiben, nacheinander — VERTRAUEN
 *    unverändert, WUSSTEST_DU neu direkt danach.
 *
 * Bewusst nicht übernommen: die Kartenreihenfolge in "Was wir machen" bleibt
 * erledigungs-zuerst (siehe oben) statt auf den Entwurfs-Vorschlag
 * gesellschaftlich-zuerst zu drehen — das widerspräche Entscheidung 1 oben.
 * Die Haushalt-Karte hat trotzdem den Haustier-Hinweis aus dem Entwurf
 * übernommen. Testimonials aus dem Entwurf sind nur Platzhalter-Zitate ohne
 * echten Inhalt — dafür wird nichts erfunden (siehe frühere Entscheidung
 * gegen fingierte Social Proof), die Section fehlt hier bewusst noch.
 *
 * Architektur: Hero → Werteversprechen → Leistungen (Kartenraster) →
 * Zielgruppen (neu) → Vertrauen (Punkteliste) → Wusstest-du (neu, Punkteliste)
 * → Ablauf (Schritte) → Rückruf.
 *
 * Privat bleibt aus Navigation und Querverweisen (siehe Abschnitt 5 im
 * Projekt) — nur Enterprise kommt mit diesem Entwurf zurück. Details, der
 * Rechner und die volle FAQ stehen auf /care.
 */

// Nach Vorbild papa.com/companion-care, aus hilisa-startseite-stand.docx
// übernommen und sprachlich bereinigt (der Entwurf hatte an Karte 4 einen
// Grammatikfehler: doppeltes "ermöglichen").
const WERTEVERSPRECHEN = [
  {
    titel: "Unabhängigkeit fördern",
    text: "Damit ältere Menschen in den eigenen vier Wänden selbstbestimmt leben können — mit so viel Eigenständigkeit und Lebensqualität wie möglich.",
    icon: <IconUnabhaengigkeit size={44} />,
  },
  {
    titel: "Zugang für alle schaffen",
    text: "Unterstützung, die zum Alltag, zur Lebenssituation und zum Wohnort passt — unabhängig vom Geldbeutel.",
    icon: <IconZugang size={44} />,
  },
  {
    titel: "Einsamkeit heilen",
    text: "Menschliche Nähe, die trägt: jemand an der Seite, der beim Alltag hilft und einfach da ist.",
    icon: <IconEinsamkeit size={44} />,
  },
  {
    titel: "Wohlbefinden stärken",
    text: "Ein Leben nach den eigenen Wünschen, mit so wenig Einschränkungen wie möglich — durch Unterstützung, auf die Verlass ist.",
    icon: <IconWohlbefinden size={44} />,
  },
  {
    titel: "Kosten senken und Angehörige entlasten",
    text: "Frühzeitige Unterstützung verhindert teure Notlösungen später — günstiger als ein Pflegeheim, spürbar entlastend für die ganze Familie.",
    icon: <IconKosten size={44} />,
  },
];

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
    text: "Wäsche, Küche, aufräumen, Betten frisch beziehen, auch mal nach dem Haustier schauen. Keine Handwerksarbeiten.",
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

// Aus hilisa-startseite-stand.docx, Abschnitt "Zielgruppen-Teaser (neu)".
// Verlinkt bewusst wieder /fuer-betriebe und /mitarbeiten — siehe
// Entscheidung 2 im Kommentar oben.
const ZIELGRUPPEN = [
  {
    titel: "Für Angehörige",
    text: "Wir wissen, was es bedeutet, sich um einen geliebten Menschen zu sorgen — und wie sehr das an die eigenen Grenzen gehen kann. Mit Hi Lisa holst du dir Unterstützung, die dich spürbar entlastet.",
    ctaText: "So funktioniert's",
    href: "/care",
  },
  {
    titel: "Für Einrichtungen",
    text: "Pflegeeinrichtungen und Pflegedienste arbeiten mit Hi Lisa zusammen, um Bewohner:innen und Klient:innen ein besseres, selbstbestimmteres Leben zu ermöglichen.",
    ctaText: "Für Einrichtungen & Pflegedienste",
    href: "/fuer-betriebe",
  },
  {
    titel: "Selbstständige:r Betreuer:in werden",
    text: "Flexible, sinnstiftende Arbeit, die zu deinem Leben passt. Hilf Menschen in deiner Umgebung, wann es dir passt.",
    ctaText: "Mehr erfahren",
    href: "/mitarbeiten",
  },
];

// Eigener Block statt Ersatz für VERTRAUEN (siehe Entscheidung 3 oben). Die
// drei Punkte stehen inhaltlich schon geprüft auf /care (Fragenliste FRAGEN,
// § 45b SGB XI) — hier nur kurz zusammengefasst, nichts Neues behauptet.
const WUSSTEST_DU = [
  "Bis zu 131 € im Monat, ohne Vorleistung — der Entlastungsbetrag nach § 45b SGB XI steht jedem mit Pflegegrad 1–5 zu, unabhängig vom Einkommen.",
  "Ungenutztes Guthaben verfällt — was im laufenden Jahr nicht abgerufen wird, ist nur noch bis zum 30. Juni des Folgejahres nutzbar.",
  "Wir rechnen direkt mit der Kasse ab — keine Rechnung, nichts musst du vorstrecken.",
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
        lead="Selbstständig bleiben, mit Begleitung an der Seite — für Gesellschaft, Unterstützung im Alltag, Fahrten und mehr."
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

      {/* ------------------------------------------------------ Werteversprechen */}
      <Abschnitt
        id="werteversprechen"
        label="Warum Hi Lisa"
        titel="Unsere Begleiter:innen leisten echte soziale Unterstützung."
      >
        <Merkmalkarten eintraege={WERTEVERSPRECHEN} />
      </Abschnitt>

      {/* -------------------------------------------------------- Leistungen */}
      <Abschnitt
        id="leistungen"
        label="Was wir machen"
        titel="Alles, was allein nicht mehr so einfach geht."
        lead="Zwei Stunden, ein fester Termin, dieselbe Person. Keine Pflege im medizinischen Sinn — dafür genau das, wofür sonst niemand mehr Zeit hat."
      >
        <Kartenraster eintraege={LEISTUNGEN} />
      </Abschnitt>

      {/* ------------------------------------------------------- Zielgruppen */}
      <Abschnitt
        id="zielgruppen"
        label="Für wen wir da sind"
        titel="Ob als Angehörige, Einrichtung oder Begleiter:in — Hi Lisa passt sich an."
      >
        <Zielgruppenkarten eintraege={ZIELGRUPPEN} />
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

      {/* ------------------------------------------------------- Wusstest du */}
      <Abschnitt
        id="wusstest-du"
        narrow
        label="Gut zu wissen"
        titel="Wusstest du schon?"
        lead="Hi Lisa fördert die Abrechnung über die Pflegekasse — mit Pflegegrad 1–5 könnt ihr Alltagsbegleitung über den monatlichen Entlastungsbetrag finanzieren."
      >
        <div style={{ marginTop: "var(--s6)" }}>
          <Punkteliste punkte={WUSSTEST_DU} />
        </div>
        <p style={{ marginTop: "var(--s6)", marginBottom: 0, fontSize: 18 }}>
          <Link href="/care#rechner">Rechnen, was genau euch zusteht</Link>
        </p>
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
