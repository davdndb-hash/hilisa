import type { Metadata } from "next";
import Link from "next/link";
import {
  Abschnitt,
  Fragenliste,
  Hero,
  Kartenraster,
  Punkteliste,
  Rueckrufblock,
  Schritte,
} from "@/components/Bausteine";
import { GRENZE, ZWEIG_LISTE } from "@/lib/zweige";

/**
 * Mitarbeiten — die Seite für Bewerberinnen.
 *
 * Zwei Dinge macht diese Seite anders als die üblichen Pflegestellenseiten:
 *
 * 1. Sie sagt sehr früh, was die Arbeit NICHT ist. Wer Pflege gelernt hat, soll
 *    nicht durch drei Gespräche laufen, um zu merken, dass hier niemand gewaschen
 *    wird. Und wer sich vor Körperpflege scheut, soll sofort sehen, dass das hier
 *    nicht vorkommt — das ist unser größtes Argument gegenüber dem Pflegedienst.
 *
 * 2. Sie nennt keinen Stundenlohn. Das Lohnregime (PflegeArbbV oder allgemeiner
 *    Mindestlohn) ist noch nicht anwaltlich geklärt; eine Zahl auf der Website wäre
 *    eine öffentliche Zusage vor dieser Klärung. Stattdessen wird konkret, was
 *    schon feststeht: Festanstellung, bezahlte Schulung, bezahlte Fahrzeit.
 *    Sobald die Klärung da ist, gehört hier eine Zahl hin — sie schlägt jedes
 *    qualitative Versprechen.
 */

export const metadata: Metadata = {
  title: "Mitarbeiten — Alltagsbegleiterin bei Hi Lisa werden",
  description:
    "Festangestellt, Minijob oder Teilzeit, bezahlte Schulung, feste Kundinnen in deinem Viertel. Keine Körperpflege, keine Selbstständigkeit, keine Fahrten quer durch die Stadt.",
};

const DAS_IST_ES = [
  {
    titel: "Zeit zu zweit",
    text: "Kaffee, Spaziergang, Karten, Fotoalben, zuhören. Das ist keine Nebentätigkeit neben der Arbeit — das ist die Arbeit.",
  },
  {
    titel: "Begleiten",
    text: "Zum Arzt, zur Bank, zum Friedhof, zum Einkaufen. Mit dem Auto oder zu Fuß, wie es gerade geht.",
  },
  {
    titel: "Im Haushalt helfen",
    text: "Wäsche, Küche, aufräumen, Betten frisch beziehen. Kein Großputz, keine Handwerksarbeiten, keine Fenster.",
  },
  {
    titel: "Kochen und einkaufen",
    text: "Gemeinsam kochen oder vorkochen, Vorräte auffüllen, Rezepte in der Apotheke holen.",
  },
  {
    titel: "Papierkram sortieren",
    text: "Briefe öffnen, Formulare erklären, Termine notieren. Keine Vollmachten, kein Bargeld, keine Bankgeschäfte.",
  },
  {
    titel: "Handy und Tablet erklären",
    text: "Videoanruf mit den Enkeln, Fotos anschauen, Termine eintragen. Zum zehnten Mal, ohne genervt zu sein.",
  },
];

const DAS_IST_ES_NICHT = [
  "Keine Körperpflege. Kein Waschen, kein Anziehen, kein Toilettengang.",
  "Keine Medikamente. Nicht stellen, nicht geben, nicht erinnern über das Zeigen der Dose hinaus.",
  "Keine Wunden, keine Verbände, keine Spritzen, keine Messungen.",
  "Kein Bargeld, keine Vollmachten, keine Unterschriften für die Kundin.",
  "Keine Pflegedokumentation im medizinischen Sinn — nur eine kurze Notiz, was war.",
];

const BEDINGUNGEN = [
  {
    titel: "Festangestellt, nicht selbstständig",
    text: "Minijob oder Teilzeit, Arbeitsvertrag, Lohnabrechnung, Sozialversicherung. Du schreibst keine Rechnungen und meldest kein Gewerbe an. Das ist bei uns eine Grundsatzentscheidung, keine Verhandlungssache.",
  },
  {
    titel: "Schulung bezahlt, vor dem ersten Einsatz",
    text: "30 Unterrichtseinheiten nach dem bayerischen Schulungskonzept. Die sind gesetzlich vorgeschrieben, wir bezahlen sie, und du gehst erst danach zum ersten Mal allein zu einer Kundin.",
  },
  {
    titel: "Feste Kundinnen in deinem Viertel",
    text: "Du bekommst dieselben Menschen zu denselben Zeiten, so wohnortnah wie möglich. Wir bauen München absichtlich Viertel für Viertel auf, damit du nicht im Verkehr stehst statt bei den Menschen zu sitzen.",
  },
  {
    titel: "Fahrzeit im Viertel wird bezahlt",
    text: "Die Wege zwischen zwei Einsätzen im Viertel sind Arbeitszeit, nicht dein Privatvergnügen.",
  },
  {
    titel: "Kein Springerdienst über eine App",
    text: "Es gibt keine Börse, in der du dir morgens Einsätze schnappst. Dein Plan steht, und wenn er sich ändert, ruft ein Mensch an.",
  },
  {
    titel: "Eine Nummer, wenn es Ärger gibt",
    text: "Sie klingelt nicht bei der Einsatzleitung. Für Kundinnen und für dich, mit derselben Nummer.",
  },
];

const PASST_ZU_DIR = [
  "Du hörst gern zu und redest gern — das ist hier die Kernkompetenz, nicht die Nebensache.",
  "Du bist verlässlich bei Terminen. Ein älterer Mensch, der um zehn wartet, wartet wirklich.",
  "Du kannst nein sagen, freundlich. Wenn eine Kundin dich um etwas außerhalb der Grenze bittet, ist ein klares Nein der Dienst an ihr.",
  "Du sprichst gut Deutsch. Ein Teil der Arbeit ist Briefe erklären und Formulare verstehen.",
  "Ein Führungszeugnis ohne Eintrag. Wir verlangen es bei der Einstellung und danach alle drei Jahre — vorgeschrieben ist das nicht, wir machen es trotzdem.",
];

const WEG = [
  {
    titel: "Du rufst an",
    text: "Sag am Telefon, dass es um eine Stelle geht. Zehn Minuten, wir stellen dir drei Fragen und du uns so viele du willst. Kein Anschreiben, kein Lebenslauf im ersten Schritt.",
  },
  {
    titel: "Wir treffen uns",
    text: "Eine Stunde, persönlich. Danach weißt du, was die Arbeit ist, und wir, ob es passt. Lebenslauf und Führungszeugnis brauchen wir bis hierher.",
  },
  {
    titel: "Vertrag und Schulung",
    text: "Arbeitsvertrag, dann die 30 Unterrichtseinheiten. Bezahlt, bevor du zum ersten Mal allein arbeitest.",
  },
  {
    titel: "Kennenlernen bei der Kundin",
    text: "Beim ersten Termin ist jemand von uns dabei. Erst danach bist du allein — und dann bei denselben Menschen, immer wieder.",
  },
];

const FRAGEN = [
  {
    frage: "Was verdiene ich?",
    antwort:
      "Das besprechen wir im Erstgespräch und nennen dir dabei eine konkrete Zahl. Wir schreiben hier bewusst keine hin, solange die Einordnung ins Lohnregime nicht arbeitsrechtlich abschließend geklärt ist — eine Zahl auf einer Website ist eine Zusage, und wir machen keine, die wir vielleicht korrigieren müssen. Was feststeht: nach Stunden bezahlt, Schulung bezahlt, Fahrzeit im Viertel bezahlt.",
  },
  {
    frage: "Brauche ich eine Ausbildung in der Pflege?",
    antwort:
      "Nein, und das ist keine Freundlichkeit — die Arbeit ist ausdrücklich keine Pflege. Was du brauchst, ist die 30-stündige Schulung, und die machst du bei uns. Wer aus der Pflege kommt, ist willkommen, muss sich aber daran gewöhnen, dass hier niemand gewaschen wird.",
  },
  {
    frage: "Wie viele Stunden sind möglich?",
    antwort:
      "Von einem Minijob mit ein paar Stunden in der Woche bis Teilzeit. Sag uns, was in deine Woche passt — wir bauen den Plan darum, nicht umgekehrt. Vollzeit ist am Anfang die Ausnahme, weil wir Viertel für Viertel wachsen.",
  },
  {
    frage: "Brauche ich ein Auto?",
    antwort:
      "Nicht zwingend. Vieles läuft zu Fuß und mit der Tram, weil wir wohnortnah einteilen. Ein Auto erweitert, was möglich ist, ist aber keine Bedingung.",
  },
  {
    frage: "Was, wenn ich mit einer Kundin nicht kann?",
    antwort:
      "Dann tauschen wir, ohne Diskussion. Das gilt in beide Richtungen und ist ausdrücklich kein Scheitern. Genau deshalb gibt es das Kennenlernen vor dem ersten richtigen Termin.",
  },
  {
    frage: "Was, wenn eine Kundin mich um Körperpflege bittet?",
    antwort:
      "Du sagst nein und rufst uns an. Diese Grenze trägt unsere Anerkennung bei der Pflegekasse und deine Absicherung — sie ist nicht verhandelbar, auch nicht, wenn es lieb gemeint ist. Wenn Körperpflege gebraucht wird, vermitteln wir einen Pflegedienst dazu.",
  },
  {
    frage: "Arbeite ich bei allen drei Modellen?",
    antwort:
      "Bei Care und Privat ja, oft bei denselben Menschen — der Unterschied ist nur, wer die Rechnung bekommt, nicht dein Gehalt. In einem Partnerhaus (Enterprise) bist du beim Partnerbetrieb angestellt, nicht bei uns; die Schulung machen trotzdem wir.",
  },
];

export default function Mitarbeiten() {
  return (
    <>
      <Hero
        eyebrow="Mitarbeiten"
        title="Zwei Stunden bei einem Menschen, der sich auf dich freut."
        lead="Wir suchen Alltagsbegleiterinnen und Alltagsbegleiter in München. Festangestellt, mit bezahlter Schulung, feste Kundinnen in deinem Viertel. Keine Körperpflege, keine Selbstständigkeit, kein Springerdienst über eine App."
        cta={
          <>
            <a className="btn btn-accent" href="tel:+4989000000">
              089 — Nummer eintragen
            </a>
            <a
              className="btn btn-outline"
              href="#rueckruf"
              style={{ color: "var(--paper)", borderColor: "var(--paper)" }}
            >
              Lieber zurückrufen lassen
            </a>
          </>
        }
        fineprint="Im ersten Schritt genügt ein Anruf. Kein Anschreiben, kein Lebenslauf."
      />

      <Abschnitt
        id="das-ist-es"
        style={{ paddingTop: 0 }}
        label="Was die Arbeit ist"
        titel="Sechs Dinge, und alle sechs haben mit einem Menschen zu tun"
        lead="Ein Einsatz sind meist zwei Stunden bei derselben Person, zur selben Zeit, jede Woche."
      >
        <Kartenraster eintraege={DAS_IST_ES} />
      </Abschnitt>

      <Abschnitt
        id="das-ist-es-nicht"
        narrow
        label="Was die Arbeit nicht ist"
        titel="Diese Grenze steht im Vertrag — auf beiden Seiten"
        lead="Wir sagen das so früh, weil es der wichtigste Unterschied zu einer Stelle im Pflegedienst ist."
      >
        <div style={{ marginTop: "var(--s6)" }}>
          <Punkteliste punkte={DAS_IST_ES_NICHT} />
        </div>
        <div className="card card-quiet" style={{ marginTop: "var(--s9)" }}>
          <h3>Warum das so hart gezogen ist</h3>
          <p style={{ marginBottom: 0, fontSize: 18 }}>
            {GRENZE} Körperbezogene Pflege darf nur ein zugelassener Pflegedienst leisten.
            Würden wir die Grenze weich machen, verlieren wir die Anerkennung bei der
            Pflegekasse — und du stehst ohne Versicherungsschutz in einer fremden Wohnung.
          </p>
        </div>
      </Abschnitt>

      <Abschnitt
        id="bedingungen"
        label="Was wir zusagen"
        titel="Sechs Dinge, die bei uns festliegen"
      >
        <Kartenraster eintraege={BEDINGUNGEN} />
      </Abschnitt>

      <Abschnitt
        id="passt-zu-dir"
        narrow
        label="Was du mitbringen musst"
        titel="Keine Ausbildung. Fünf andere Dinge schon."
      >
        <div style={{ marginTop: "var(--s6)" }}>
          <Punkteliste punkte={PASST_ZU_DIR} />
        </div>
      </Abschnitt>

      <Abschnitt id="weg" label="So läuft die Bewerbung" titel="Vier Schritte, der erste ist ein Anruf.">
        <Schritte schritte={WEG} />
      </Abschnitt>

      {/* Die drei Zweige aus Sicht der Mitarbeiterin — kurz, mit Verweis in die Tiefe. */}
      <Abschnitt
        id="zweige"
        narrow
        label="Die drei Zweige"
        titel="Was die drei Modelle für dich bedeuten"
        lead="Für Kundinnen unterscheiden sich die drei Wege darin, wer bezahlt. Für dich unterscheiden sie sich in der Art der Einsätze."
      >
        <div style={{ marginTop: "var(--s6)" }}>
          {ZWEIG_LISTE.map((z) => (
            <div
              key={z.id}
              style={{ borderTop: "1px solid var(--rule)", padding: "var(--s6) 0" }}
            >
              <h3>{z.name}</h3>
              <p style={{ color: "var(--ink-70)", fontSize: 18, marginBottom: "var(--s3)" }}>
                {z.id === "care"
                  ? "Der planbarste Zweig: feste Termine, dieselbe Kundin, kurze Dokumentation für die Pflegekasse."
                  : z.id === "privat"
                    ? "Der abwechslungsreichste Zweig: manche Einsätze wöchentlich, manche einmalig, Schwerpunkt Gesellschaft und Unternehmungen."
                    : "Im Partnerhaus bist du beim Partnerbetrieb angestellt, nicht bei uns. Fast keine Fahrzeit, weil die Wege Treppen sind. Die Schulung machen trotzdem wir."}
              </p>
              <Link href={`${z.href}#begleiterinnen`} style={{ fontSize: 18, fontWeight: 700 }}>
                Ausführlich auf der Seite {z.name}
              </Link>
            </div>
          ))}
        </div>
      </Abschnitt>

      <Abschnitt id="fragen" narrow label="Häufige Fragen" titel="Was Bewerberinnen zuerst fragen">
        <Fragenliste fragen={FRAGEN} />
        <p style={{ marginTop: "var(--s9)", fontSize: 18 }}>
          Zum Aufhängen oder Weitergeben:{" "}
          <a href="/hi-lisa-blatt-bewerber.pdf">Ein-Blatt-Übersicht als PDF</a> — eine Seite,
          große Schrift, Telefonnummer unten.
        </p>
      </Abschnitt>

      <Rueckrufblock
        titel="Ruf an und sag, dass es um eine Stelle geht."
        text={
          "089 — Nummer eintragen, Montag bis Freitag von 8 bis 18 Uhr. Oder lass uns deine " +
          "Nummer da — wir melden uns am selben Werktag zurück. Schreib ins Feld " +
          "„Wann passt es dir?“ gern dazu, dass es um eine Bewerbung geht."
        }
      />
    </>
  );
}
