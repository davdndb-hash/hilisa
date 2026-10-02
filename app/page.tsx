import Link from "next/link";
import {
  Abschnitt,
  Hero,
  Kartenraster,
  Merkmalkarten,
  Punkteliste,
  Rueckrufblock,
  Schritte,
} from "@/components/Bausteine";
import { KONTAKT } from "@/lib/kontakt";
import {
  IconAngehoerige,
  IconBegleitung,
  IconBetreuerWerden,
  IconEinsamkeit,
  IconHandy,
  IconHaushalt,
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
 *
 * Fünfte Überarbeitung (15.9.2026, UI/UX-Politur): sechs gezielte Änderungen,
 * einzeln abgestimmt (nicht alle Vorschläge übernommen):
 * - Abschnitts-Sprunglinks — die Seite ist inzwischen lang. Zogen von einer
 *   eigenen Zeile unter dem Hero in die Kopfzeile (siehe Nav.tsx, ABSCHNITTE):
 *   bleiben dadurch beim Scrollen oben sichtbar. Ersetzen dort auf der
 *   Startseite die normalen Kopfzeilen-Links im selben Platz statt als
 *   zweite Zeile daneben zu stehen — zwei gestapelte Navigationsleisten sahen
 *   nach zwei Headern aus.
 * - Zebra-Streifen (tone="rose") auf Leistungen/Vertrauen/Ablauf, damit sich
 *   die vielen Karten-Sections beim Scrollen unterscheiden.
 * - Icons auf den Zielgruppenkarten, dieselbe Sprache wie Werteversprechen.
 * - Hover-Anhebung nur auf Zielgruppenkarten (echtes Klickziel drin), nicht auf
 *   Merkmalkarten (reiner Lesestoff, kein Ziel — siehe .card-interactive).
 * - Rückrufformular: kleine Feld-Icons statt reiner Textfelder.
 * - HeroIllustration (Icons.tsx) statt eines echten Fotos erkundet, solange
 *   keine echten Fotos existieren — nur ab Tablet-Breite sichtbar.
 *
 * Sechste Überarbeitung (23.9.2026, HiLisa_Startseite und Navigation.docx):
 * Die Abschnitts-Sprunglinks in der Kopfzeile (siehe Nav.tsx) sind auf vier
 * feste Ziele reduziert: Leistungen, Begleiter finden, Über uns, Begleiter
 * werden. Damit ändert sich einiges hier:
 * - Hero: Fineprint-Zeile unter dem CTA entfällt (Dokument, wörtlich).
 * - Werteversprechen: nur neu sortiert (Einsamkeit → Unabhängigkeit →
 *   Wohlbefinden → Zugang → Kosten), Inhalt unverändert.
 * - Leistungen: neue Kopfzeile, sechs neue Karten (Dokument, wörtlich) statt
 *   der bisherigen Erledigungen-zuerst-Reihenfolge — der Untertext ist im
 *   Dokument als "(offen)" markiert und bleibt deshalb vorerst weg statt
 *   einen zur neuen Kopfzeile unpassenden alten Text stehen zu lassen.
 * - Zielgruppen wird zu zwei eigenständigen Blöcken (Begleiter finden /
 *   Begleiter werden) statt einem Dreier-Raster — Für Einrichtungen fällt
 *   damit von der Startseite weg (bleibt auf /fuer-betriebe und in der
 *   Fußzeile erreichbar, siehe layout.tsx). Das dreht Entscheidung 2 der
 *   vierten Überarbeitung oben bewusst zurück.
 * - Neu: #ueber-uns als Platzhalter-Section kurz vor dem Rückruf, als Ziel für
 *   den gleichnamigen Nav-Punkt. Das Dokument nennt weder Copy noch den
 *   endgültigen Anker dafür ("Ziel-Anker der Nav-Links klären") — Struktur
 *   jetzt, Wording folgt laut Dokument separat.
 * - Ablauf: neue Kopfzeile/Unterzeile/Schritte (Dokument, wörtlich, angelehnt
 *   an papa.com/how-it-works). Der im Dokument gemeldete Nummerierungs-Fehler
 *   ("1. 1", "2. 2") tritt in diesem Code nicht auf — Schritte rendert schon
 *   `list-style: none` auf dem <ol>; vermutlich ein Caching-Stand auf der
 *   Live-Domain, nicht im Quellcode.
 * - Bewusst NICHT übernommen: die Neuformulierung von VERTRAUEN — das
 *   Dokument markiert das ausdrücklich als "nicht final, bitte noch nicht
 *   umsetzen".
 * - Offene Frage aus dem Dokument, nicht entschieden: ob am Ende von Ablauf
 *   ein direkter Rückruf-CTA stehen soll statt nur des Links zu /care.
 */

// Nach Vorbild papa.com/companion-care, aus hilisa-startseite-stand.docx
// übernommen und sprachlich bereinigt (der Entwurf hatte an Karte 4 einen
// Grammatikfehler: doppeltes "ermöglichen").
const WERTEVERSPRECHEN = [
  {
    titel: "Einsamkeit heilen",
    text: "Menschliche Nähe, die trägt: jemand an der Seite, der beim Alltag hilft und einfach da ist.",
    icon: <IconEinsamkeit size={44} />,
  },
  {
    titel: "Unabhängigkeit fördern",
    text: "Damit ältere Menschen in den eigenen vier Wänden selbstbestimmt leben können — mit so viel Eigenständigkeit und Lebensqualität wie möglich.",
    icon: <IconUnabhaengigkeit size={44} />,
  },
  {
    titel: "Wohlbefinden stärken",
    text: "Ein Leben nach den eigenen Wünschen, mit so wenig Einschränkungen wie möglich — durch Unterstützung, auf die Verlass ist.",
    icon: <IconWohlbefinden size={44} />,
  },
  {
    titel: "Zugang für alle schaffen",
    text: "Unterstützung, die zum Alltag, zur Lebenssituation und zum Wohnort passt — unabhängig vom Geldbeutel.",
    icon: <IconZugang size={44} />,
  },
  {
    titel: "Kosten senken und Angehörige entlasten",
    text: "Frühzeitige Unterstützung verhindert teure Notlösungen später — günstiger als ein Pflegeheim, spürbar entlastend für die ganze Familie.",
    icon: <IconKosten size={44} />,
  },
];

// Sechste Überarbeitung: komplett aus dem Dokument übernommen, wörtlich.
// Icon-Zuordnung ist unsere eigene Wahl (das Dokument nennt keine Icons) —
// bestehende Icons wiederverwendet, wo das Motiv passt. Für "Alltagsbegleitung"
// gibt es kein eigenes Icon; IconEinsamkeit (zwei sich überlappende Kreise,
// schon für "Einsamkeit heilen" oben im Einsatz) steht hier als Platzhalter für
// "verlässliche Nähe", bis es ein eigenes Motiv gibt.
const LEISTUNGEN = [
  {
    titel: "Gesellschaft und Aktivitäten",
    text: "Ob Kartenspiel, ein Spaziergang durch alte Erinnerungen oder ein neues Rezept zum Ausprobieren — unsere Begleiter:innen bringen echte Gesellschaft mit, mit Herzlichkeit.",
    icon: <IconZeitZuZweit />,
  },
  {
    titel: "Besorgungen und Fahrten",
    text: "Ein Termin beim Arzt, Besorgungen, der Wocheneinkauf? Unsere Begleiter:innen bringen dich sicher dorthin, wo du hinmusst.",
    icon: <IconBegleitung />,
  },
  {
    titel: "Post und Papierkram",
    text: "Briefe stapeln sich, Formulare wollen verstanden werden, ein Antrag muss noch raus. Wir sortieren mit dir durch, erklären, was drinsteht, und helfen beim Schriftverkehr mit Behörden, Versicherungen und Banken.",
    icon: <IconPost />,
  },
  {
    titel: "Haushalt und tägliche Aufgaben",
    text: "Der Haushalt kann schnell zu viel werden. Unsere Begleiter:innen übernehmen leichte Reinigungsarbeiten, kümmern sich um die Wäsche, bereiten Mahlzeiten vor, schaffen Ordnung, kümmern sich um dein Haustier und mehr.",
    icon: <IconHaushalt />,
  },
  {
    titel: "Alltagsbegleitung",
    text: "Unsere Begleiter:innen sind zuverlässige Ansprechpartner:innen — für praktische Hilfe und für das tägliche Miteinander.",
    icon: <IconEinsamkeit />,
  },
  {
    titel: "Technikhilfe",
    text: "Unsere Begleiter:innen helfen dir dabei, Geräte und Apps einzurichten und zu bedienen — damit du mit deinen Liebsten in Kontakt bleibst, Spiele entdeckst und noch vieles mehr.",
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

// Sechste Überarbeitung: aus dem bisherigen Dreier-Raster (Angehörige,
// Einrichtungen, Betreuer:in werden) werden zwei eigenständige Blöcke, weil
// "Hilfe suchen" und "als Begleiter:in arbeiten" zwei unterschiedliche
// Absichten sind (Dokument, wörtlich). Für Einrichtungen fällt damit von der
// Startseite weg — bleibt auf /fuer-betriebe und in der Fußzeile erreichbar.
const BEGLEITER_FINDEN = {
  titel: "Begleiter finden",
  text: "Wir wissen, was es bedeutet, sich um einen geliebten Menschen zu sorgen — und wie sehr das an die eigenen Grenzen gehen kann. Mit Hi Lisa holst du dir Unterstützung, die dich spürbar entlastet.",
  ctaText: "So funktioniert's",
  href: "/privat",
  icon: <IconAngehoerige size={44} />,
};

// "Kurzintro folgt" laut Dokument — der Fließtext ist wörtlich übernommen,
// eine eigene Überschrift jenseits von "Begleiter werden" gibt es noch nicht.
const BEGLEITER_WERDEN = {
  titel: "Begleiter werden",
  text: "Flexible, sinnstiftende Arbeit, die zu deinem Leben passt. Hilf Menschen in deiner Umgebung, wann es dir passt.",
  ctaText: "Mehr erfahren",
  href: "/mitarbeiten",
  icon: <IconBetreuerWerden size={44} />,
};

// Siebte Überarbeitung (23.9.2026): Pivot auf ausschließlich privat bezahlte
// Begleitung (wie papa.com) — Pflegekasse/Pflegegrad werden sitework sunset.
// WUSSTEST_DU (Pflegekassen-Erklärblock) ist damit komplett hinfällig, nicht
// nur umformuliert — die ganze Section ist raus (siehe Rendering unten).
const ABLAUF_KURZ = [
  {
    titel: "Ruf uns an oder schreib uns, dann geht's los.",
    text: "Zwanzig Minuten am Telefon — wir klären, was gebraucht wird und ab wann es losgehen soll. Kein Antrag, keine Begutachtung.",
  },
  {
    titel: "Vereinbare ein Kennenlernen mit der Begleiterin.",
    text: "Ob persönlich bei euch zu Hause oder erstmal am Telefon — ihr entscheidet, wie ihr euch kennenlernen wollt, direkt mit der Begleiterin, die danach regelmäßig kommt.",
  },
  {
    titel: "Genießt die gemeinsame Zeit — und gebt uns Rückmeldung.",
    text: "Ob Gesellschaft, ein Erledigungsgang oder Hilfe im Alltag: eure Begleiterin richtet sich danach, was gerade gebraucht wird. Nach jedem Besuch fragen wir kurz nach, damit die Chemie wirklich stimmt.",
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
              href={KONTAKT.telefonHref}
              style={{ color: "var(--paper)", borderColor: "var(--paper)" }}
            >
              {KONTAKT.telefonAnzeige}
            </a>
          </>
        }
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
      {/* Untertext laut Dokument "(offen)" — bleibt bewusst weg, statt einen zur
          neuen Kopfzeile unpassenden alten Text stehen zu lassen. */}
      <Abschnitt
        id="leistungen"
        tone="rose"
        label="Was wir machen"
        titel="Eigenständig zu Hause bleiben — mit der richtigen Unterstützung an deiner Seite."
      >
        <Kartenraster eintraege={LEISTUNGEN} />
      </Abschnitt>

      {/* --------------------------------------------------- Begleiter finden */}
      <Abschnitt id="begleiter-finden" narrow titel={BEGLEITER_FINDEN.titel}>
        <div
          className="card card-interactive"
          style={{ marginTop: "var(--s9)", display: "flex", flexDirection: "column", gap: "var(--s3)" }}
        >
          {BEGLEITER_FINDEN.icon}
          <p style={{ margin: 0, fontSize: 18 }}>{BEGLEITER_FINDEN.text}</p>
          <Link
            className="btn btn-outline"
            href={BEGLEITER_FINDEN.href}
            style={{ marginTop: "var(--s3)", alignSelf: "flex-start" }}
          >
            {BEGLEITER_FINDEN.ctaText}
          </Link>
        </div>
      </Abschnitt>

      {/* --------------------------------------------------- Begleiter werden */}
      {/* Kein tone="rose" hier — Vertrauen direkt danach ist schon rose, zwei
          rosane Sections nacheinander würden ohne Trennung verschwimmen. */}
      <Abschnitt id="begleiter-werden" narrow titel={BEGLEITER_WERDEN.titel}>
        <div
          className="card card-interactive"
          style={{ marginTop: "var(--s9)", display: "flex", flexDirection: "column", gap: "var(--s3)" }}
        >
          {BEGLEITER_WERDEN.icon}
          <p style={{ margin: 0, fontSize: 18 }}>{BEGLEITER_WERDEN.text}</p>
          <Link
            className="btn btn-outline"
            href={BEGLEITER_WERDEN.href}
            style={{ marginTop: "var(--s3)", alignSelf: "flex-start" }}
          >
            {BEGLEITER_WERDEN.ctaText}
          </Link>
        </div>
      </Abschnitt>

      {/* --------------------------------------------------------- Vertrauen */}
      <Abschnitt
        id="vertrauen"
        narrow
        tone="rose"
        label="Warum Angehörige uns die Wohnung anvertrauen"
        titel="Wir schicken keine Fremden. Wir schicken deine Begleiterin."
      >
        <div style={{ marginTop: "var(--s6)" }}>
          <Punkteliste punkte={VERTRAUEN} />
        </div>
      </Abschnitt>

      {/* ------------------------------------------------------------ Ablauf */}
      {/* Kein tone="rose" mehr — seit "Wusstest du" (Pflegekassen-Erklärblock)
          entfallen ist, steht Vertrauen (rose) direkt davor; zwei rosane
          Sections nacheinander würden ohne Trennung verschwimmen. */}
      <Abschnitt
        id="ablauf"
        label="Ablauf"
        titel="So läuft es ab"
        lead="In München, bei euch zu Hause oder am Telefon — deine Begleiterin ist da, um zu helfen, zuzuhören und einfach da zu sein."
      >
        <Schritte schritte={ABLAUF_KURZ} />
        {/* Offene Frage aus dem Dokument, nicht entschieden: ob hier ein
            direkter Rückruf-CTA stehen soll statt nur des Links zu /privat. */}
        <div className="stack-cta" style={{ marginTop: "var(--s6)" }}>
          <Link className="btn btn-primary" href="/privat">
            Alle Details und häufige Fragen
          </Link>
        </div>
      </Abschnitt>

      {/* ---------------------------------------------------------- Über uns */}
      {/* Platzhalter-Section für den gleichnamigen Nav-Punkt — das Dokument
          nennt weder Copy noch den endgültigen Anker dafür ("Ziel-Anker der
          Nav-Links klären"). Struktur jetzt, Wording folgt laut Dokument
          separat ("Struktur zuerst, Wording danach"). */}
      <Abschnitt id="ueber-uns" narrow label="Über uns" titel="Über uns">
        <p className="lead">Text folgt.</p>
      </Abschnitt>

      {/* ----------------------------------------------------------- Rückruf */}
      <Rueckrufblock />
    </>
  );
}
