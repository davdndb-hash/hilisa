import Link from "next/link";
import ModellFinder from "@/components/ModellFinder";
import {
  Abschnitt,
  Fragenliste,
  Hero,
  Kartenraster,
  Rueckrufblock,
  Zweigkarte,
} from "@/components/Bausteine";
import { GRENZE, ZWEIG_LISTE } from "@/lib/zweige";

/**
 * Startseite.
 *
 * Aufgabe: in dreißig Sekunden klarmachen, dass es drei Wege gibt und welcher
 * gemeint ist. Erst danach kommt, was wir eigentlich machen.
 *
 * Gelesen wird das von der Tochter, 50 bis 65, abends am Handy. Deshalb steht
 * die Telefonnummer ohne Scrollen in der Kopfzeile und der Finder direkt unter
 * den drei Karten.
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

const FRAGEN = [
  {
    frage: "Was ist der Unterschied zwischen Care und Privat?",
    antwort:
      "Nur, wer bezahlt. Die Begleiterin, die Aufgaben und die Regeln sind identisch. Bei Care zahlt die Pflegekasse und wir rechnen dort direkt ab — du bekommst keine Rechnung, brauchst aber einen Pflegegrad. Bei Privat zahlst du selbst, brauchst dafür keinen Pflegegrad, keinen Antrag und keine Begutachtung. Viele nutzen beides: die Kassenstunden zuerst, den Rest privat dazu.",
  },
  {
    frage: "Meine Mutter hat noch keinen Pflegegrad. Geht das trotzdem?",
    antwort:
      "Ja, über Hi Lisa Privat. Schon Pflegegrad 1 reicht aber für das Geld von der Kasse, und der wird öfter anerkannt, als die meisten denken. Wir sagen dir am Telefon, ob ein Antrag Sinn ergibt — und du kannst privat starten, während er läuft.",
  },
  {
    frage: "Wir haben das Geld seit Jahren nicht genutzt. Ist es weg?",
    antwort:
      "Nicht alles. Was im laufenden Jahr übrig bleibt, kannst du noch bis zum 30. Juni des nächsten Jahres nutzen. Alles davor ist verfallen. Ruf also lieber heute an als im Juli.",
  },
  {
    frage: "Bekommt sie wirklich immer dieselbe Person?",
    antwort:
      "Ja, das ist der Kern von Hi Lisa. Jede Kundin hat eine feste Begleiterin und eine Vertretung, die sie ebenfalls kennengelernt hat. Wir arbeiten nicht mit einer Börse, in der sich jede Woche jemand anderes den Termin schnappt.",
  },
  {
    frage: "Was ist, wenn die beiden nicht miteinander können?",
    antwort:
      "Dann tauschen wir. Ohne Diskussion und ohne Kosten. Genau deshalb gibt es das Kennenlernen vor dem ersten richtigen Termin.",
  },
  {
    frage: "Helft ihr auch beim Waschen und Anziehen?",
    antwort:
      "Nein. Das darf nur ein Pflegedienst. Wenn das gebraucht wird, nennen wir dir Dienste in eurem Viertel, mit denen wir gut zusammenarbeiten. Beides nebeneinander ist völlig normal.",
  },
  {
    frage: "In welchen Stadtteilen seid ihr unterwegs?",
    antwort:
      "Wir bauen München Viertel für Viertel auf, damit unsere Begleiterinnen nicht im Verkehr stehen statt bei euch zu sitzen. Aktuell: Stadtteile eintragen. Wohnt ihr außerhalb, sag uns Bescheid — wir melden uns, sobald wir da sind.",
  },
  {
    frage: "Ich würde gern bei Hi Lisa arbeiten. Wen rufe ich an?",
    antwort:
      "Dieselbe Nummer. Sag am Telefon, dass es um eine Stelle geht. Wir stellen fest an — Minijob oder Teilzeit, nach Stunden bezahlt, mit bezahlter Schulung vor dem ersten Einsatz. Keine Selbstständigkeit, keine Fahrten quer durch die Stadt.",
  },
];

export default function Home() {
  return (
    <>
      {/* -------------------------------------------------------------- Hero */}
      <Hero
        eyebrow="Begleitung in München"
        title="Jede Woche dieselbe Begleiterin. In den meisten Fällen zahlt die Kasse."
        titleWidth="19ch"
        lead="Spaziergang, Einkauf, Arzttermin oder einfach zwei Stunden reden. Es gibt drei Wege zu uns — je nachdem, wer bezahlt. Wir sagen dir am Telefon, welcher deiner ist."
        cta={
          <>
            <a className="btn btn-accent" href="#zweige">
              Die drei Wege ansehen
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

      {/* ------------------------------------------------------------ Zweige */}
      <Abschnitt
        id="zweige"
        style={{ paddingTop: 0 }}
        label="Die drei Wege"
        titel="Dieselbe Begleiterin. Drei Wege, sie zu bezahlen."
        lead="Was wir machen, ist in allen drei Fällen gleich. Der Unterschied ist, wer die Rechnung bekommt — und ob es dafür einen Pflegegrad braucht."
      >
        <div className="grid grid-3" style={{ marginTop: "var(--s9)" }}>
          {ZWEIG_LISTE.map((z) => (
            <Zweigkarte key={z.id} zweig={z} />
          ))}
        </div>
        <div className="card card-quiet" style={{ marginTop: "var(--s6)" }}>
          <h3>Wo wir aufhören — in allen drei Fällen</h3>
          <p style={{ marginBottom: 0, fontSize: 18 }}>{GRENZE}</p>
        </div>
      </Abschnitt>

      {/* ------------------------------------------------------------ Finder */}
      <Abschnitt
        id="finder"
        narrow
        label="Zwei Fragen"
        titel="Nicht sicher, welcher Weg gemeint ist?"
      >
        <div style={{ marginTop: "var(--s6)" }}>
          <ModellFinder />
        </div>
      </Abschnitt>

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

      {/* -------------------------------------------------------- Mitarbeiten */}
      <Abschnitt id="mitarbeiten" narrow>
        <div className="card card-rose">
          <span className="badge" style={{ background: "var(--paper)" }}>
            Mitarbeiten
          </span>
          <h2 style={{ marginTop: "var(--s4)", fontSize: "clamp(24px, 3.6vw, 30px)" }}>
            Du willst diese Arbeit machen?
          </h2>
          <p style={{ fontSize: 18 }}>
            Wir stellen fest an — Minijob oder Teilzeit, nach Stunden bezahlt, mit bezahlter
            Schulung vor dem ersten Einsatz. Keine Selbstständigkeit, keine Rechnungen, die du
            selbst schreiben musst. Feste Kundinnen in deinem Viertel statt Fahrten quer durch
            die Stadt.
          </p>
          <p style={{ fontSize: 18 }}>
            Was der Unterschied zwischen den drei Zweigen für dich bedeutet, steht auf jeder
            Zweigseite unter <em>Was das für Begleiterinnen bedeutet</em>.
          </p>
          <div className="stack-cta" style={{ marginTop: "var(--s6)" }}>
            <a className="btn btn-primary" href="tel:+4989000000">
              089 — Nummer eintragen
            </a>
            <Link className="btn btn-outline" href="#rueckruf">
              Rückruf anfordern
            </Link>
          </div>
        </div>
      </Abschnitt>

      {/* ------------------------------------------------------------ Fragen */}
      <Abschnitt id="fragen" narrow label="Häufige Fragen" titel="Was Angehörige uns zuerst fragen">
        <Fragenliste fragen={FRAGEN} />

        {/* Für die Hälfte des Marktes, die nicht online liest: ein Blatt zum Ausdrucken,
            Hinlegen und Wochen später wieder in die Hand nehmen. Internetnutzung bei
            78+ liegt bei 42 Prozent (D21-Digital-Index). */}
        <div className="card card-quiet" style={{ marginTop: "var(--s9)" }}>
          <h3>Zum Ausdrucken und Hinlegen</h3>
          <p style={{ fontSize: 18 }}>
            Eine Seite, große Schrift, Telefonnummer unten: was wir machen, was wir nicht
            machen, was die Kasse zahlt und wie es anfängt. Zum Mitnehmen für jemanden, der
            das nicht am Handy lesen will.
          </p>
          <div className="stack-cta">
            <a className="btn btn-primary" href="/hi-lisa-blatt-kunden.pdf">
              Ein-Blatt-Übersicht als PDF
            </a>
          </div>
        </div>
      </Abschnitt>

      {/* ----------------------------------------------------------- Rückruf */}
      <Rueckrufblock />
    </>
  );
}
