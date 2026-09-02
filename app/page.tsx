import Rechner from "@/components/Rechner";
import Rueckruf from "@/components/Rueckruf";
import { Bildmarke } from "@/components/Logo";

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

const ABLAUF = [
  {
    titel: "Du rufst an oder schreibst uns",
    text: "Zwanzig Minuten am Telefon. Wir klären, was gebraucht wird und was die Kasse dazuzahlt.",
  },
  {
    titel: "Wir kommen einmal zum Kennenlernen",
    text: "Kostenlos, bei euch zu Hause, zusammen mit der Begleiterin, die später auch wirklich kommt.",
  },
  {
    titel: "Wir übernehmen den Papierkram",
    text: "Einmal unterschreiben, dann rechnen wir direkt mit der Pflegekasse ab. Du bekommst keine Rechnung.",
  },
  {
    titel: "Fester Termin, feste Person",
    text: "Zum Beispiel jeden Dienstag von zehn bis zwölf. Ist sie krank, kommt die Vertretung, die ihr schon kennt.",
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
    text: "Mindestens 30 Stunden Ausbildung, bevor jemand das erste Mal allein zu euch kommt.",
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
    frage: "Meine Mutter hat noch keinen Pflegegrad. Geht das trotzdem?",
    antwort:
      "Ja, dann zahlt ihr erst mal selbst. Schon Pflegegrad 1 reicht für das Geld von der Kasse, und der wird öfter anerkannt, als die meisten denken. Wir sagen dir am Telefon, ob ein Antrag Sinn ergibt.",
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
];

export default function Home() {
  return (
    <>
      {/* -------------------------------------------------------------- Hero */}
      <section style={{ paddingTop: "var(--s12)", paddingBottom: "var(--s12)" }}>
        <div className="wrap">
          <div className="surface-olive" style={{ padding: "clamp(28px, 5vw, 56px)" }}>
            <span className="label on-olive">Begleitung in München</span>
            <h1 style={{ color: "var(--paper)", maxWidth: "17ch" }}>
              Deine Pflegekasse zahlt 131 Euro im Monat. Die meisten holen sie sich nie.
            </h1>
            <p className="lead" style={{ color: "rgba(252,251,247,0.9)" }}>
              Wir schicken jede Woche dieselbe Begleiterin — für einen Spaziergang, den
              Einkauf oder einfach zum Reden. Den Papierkram mit der Kasse machen wir.
            </p>
            <div className="stack-cta" style={{ marginTop: "var(--s9)" }}>
              <a className="btn btn-accent" href="#rechner">
                Was steht mir zu?
              </a>
              <a
                className="btn btn-outline"
                href="tel:+4989000000"
                style={{ color: "var(--paper)", borderColor: "var(--paper)" }}
              >
                089 — Nummer eintragen
              </a>
            </div>
            <p
              style={{
                marginTop: "var(--s6)",
                marginBottom: 0,
                fontSize: 17,
                color: "rgba(252,251,247,0.75)",
              }}
            >
              Kostenloses Erstgespräch. Wir prüfen mit, wie viel Guthaben noch offen ist.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Rechner */}
      <section id="rechner" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <Rechner />
        </div>
      </section>

      {/* -------------------------------------------------------- Leistungen */}
      <section id="leistungen">
        <div className="wrap">
          <span className="label">Was wir machen</span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)" }}>
            Gesellschaft. Und alles, was den Tag leichter macht.
          </h2>
          <p className="lead">
            Zwei Stunden, ein fester Termin, dieselbe Person. Keine Pflege im medizinischen
            Sinn — dafür genau das, wofür sonst niemand mehr Zeit hat.
          </p>
          <div className="grid grid-3" style={{ marginTop: "var(--s9)" }}>
            {LEISTUNGEN.map((l) => (
              <div className="card" key={l.titel}>
                <h3>{l.titel}</h3>
                <p style={{ marginBottom: 0, color: "var(--ink-70)", fontSize: 18 }}>{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Preise */}
      <section id="preise">
        <div className="wrap">
          <span className="label">Was es kostet</span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)" }}>
            In den meisten Fällen: nichts aus eigener Tasche.
          </h2>
          <div className="grid grid-2" style={{ marginTop: "var(--s9)" }}>
            <div className="card">
              <span className="badge badge-olive">Mit Pflegegrad</span>
              <p style={{ marginTop: "var(--s4)", marginBottom: "var(--s2)" }}>
                Deine Pflegekasse zahlt
              </p>
              <span className="big-number mono-num">131 €</span>
              <p style={{ marginTop: "var(--s3)" }}>
                im Monat. Das sind 1.572 Euro im Jahr. Wir rechnen direkt mit der Kasse ab,
                du bekommst keine Rechnung.
              </p>
              <p style={{ marginBottom: 0, color: "var(--ink-70)", fontSize: 18 }}>
                Ab Pflegegrad 2 kommt oft noch deutlich mehr dazu. Das rechnen wir dir im
                Gespräch aus.
              </p>
            </div>
            <div className="card card-rose">
              <span className="badge" style={{ background: "var(--paper)" }}>
                Ohne Pflegegrad
              </span>
              <p style={{ marginTop: "var(--s4)", marginBottom: "var(--s2)" }}>Du zahlst</p>
              <span className="big-number mono-num">Preis eintragen</span>
              <p style={{ marginTop: "var(--s3)" }}>
                pro Stunde. Keine Mitgliedsgebühr, keine Mindestlaufzeit, monatlich kündbar.
              </p>
              <p style={{ marginBottom: 0, color: "var(--ink-70)", fontSize: 18 }}>
                Anfahrt pauschal pro Einsatz. Zwei Stunden sind die kleinste Buchung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Ablauf */}
      <section id="ablauf">
        <div className="wrap">
          <span className="label">So läuft es ab</span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)" }}>
            Vier Schritte, und du machst davon einen.
          </h2>
          <ol style={{ listStyle: "none", padding: 0, margin: "var(--s9) 0 0", maxWidth: "56rem" }}>
            {ABLAUF.map((s, i) => (
              <li
                key={s.titel}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  gap: "var(--s6)",
                  padding: "var(--s6) 0",
                  borderTop: "1px solid var(--rule)",
                }}
              >
                <span
                  className="display"
                  aria-hidden="true"
                  style={{ fontSize: 34, color: "var(--olive)", lineHeight: 1 }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3>{s.titel}</h3>
                  <p style={{ marginBottom: 0, color: "var(--ink-70)", fontSize: 18 }}>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------- Vertrauen */}
      <section id="vertrauen">
        <div className="wrap">
          <span className="label">Warum Angehörige uns die Wohnung anvertrauen</span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)" }}>
            Wir schicken keine Fremden. Wir schicken deine Begleiterin.
          </h2>
          <p className="lead">
            Das Schwierigste an dieser Arbeit ist nicht die Wäsche. Es ist die Frage, wer da
            eigentlich in der Wohnung steht, wenn du nicht dabei bist.
          </p>
          <div className="grid grid-3" style={{ marginTop: "var(--s9)" }}>
            {VERTRAUEN.map((v) => (
              <div key={v.titel} style={{ borderTop: "3px solid var(--olive)", paddingTop: "var(--s4)" }}>
                <h3>{v.titel}</h3>
                <p style={{ marginBottom: 0, color: "var(--ink-70)", fontSize: 18 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Fragen */}
      <section id="fragen">
        <div className="wrap narrow">
          <span className="label">Häufige Fragen</span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)" }}>Was Angehörige uns zuerst fragen</h2>
          <div style={{ marginTop: "var(--s6)" }}>
            {FRAGEN.map((f) => (
              <details
                key={f.frage}
                style={{ borderBottom: "1px solid var(--rule)", padding: "var(--s2) 0" }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    padding: "var(--s4) 0",
                    fontWeight: 800,
                    fontSize: 19,
                    lineHeight: 1.35,
                    minHeight: 44,
                  }}
                >
                  {f.frage}
                </summary>
                <p style={{ paddingBottom: "var(--s4)", color: "var(--ink-70)" }}>{f.antwort}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Rückruf */}
      <section id="rueckruf" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="surface-ink" style={{ padding: "clamp(28px, 5vw, 56px)" }}>
            <div className="grid grid-2" style={{ alignItems: "start" }}>
              <div>
                <Bildmarke variant="ink" size={52} title="" />
                <span className="label on-dark" style={{ marginTop: "var(--s6)" }}>
                  Erstgespräch
                </span>
                <h2 style={{ color: "var(--paper)", fontSize: "clamp(26px, 4vw, 34px)" }}>
                  Zwanzig Minuten, und du weißt, woran du bist.
                </h2>
                <p style={{ color: "rgba(252,251,247,0.8)" }}>
                  Ruf uns an unter <strong style={{ color: "var(--paper)" }}>089 — Nummer
                  eintragen</strong>, Montag bis Freitag von 8 bis 18 Uhr. Oder lass uns deine
                  Nummer da — wir melden uns am selben Werktag zurück.
                </p>
              </div>
              <div
                className="card"
                style={{ background: "var(--paper)", borderColor: "transparent" }}
              >
                <Rueckruf />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
