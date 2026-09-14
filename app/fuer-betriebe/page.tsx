import type { Metadata } from "next";
import {
  Abschnitt,
  AndereZweige,
  Fragenliste,
  Hero,
  Kartenraster,
  Punkteliste,
  Rueckrufblock,
  Schritte,
} from "@/components/Bausteine";
import { ZWEIGE } from "@/lib/zweige";

const Z = ZWEIGE.enterprise;

export const metadata: Metadata = {
  title: "Hi Lisa Enterprise — Alltagsbegleitung im eigenen Haus",
  description:
    "Für Betreutes Wohnen, Wohnungsgenossenschaften, Kliniken und Pflegedienste: Alltagsbegleitung im eigenen Haus aufbauen — mit Konzept, Schulung und Anerkennungsverfahren von Hi Lisa.",
};

/* Zahlen aus der Musterrechnung im Partnermodell-Dokument, 30 Nutzer. */
const RECHNUNG: { position: string; betrag: string; grundlage: string }[] = [
  { position: "Umsatz aus Kassenmitteln", betrag: "15.025 €", grundlage: "30 Nutzer × 501 € abgerufenes Budget" },
  { position: "Private Zubuchung", betrag: "1.800 €", grundlage: "30 Nutzer × 60 €" },
  { position: "Personalkosten", betrag: "−9.642 €", grundlage: "eigene Kräfte, 17 €/h brutto, 24,6 % Arbeitgeberlast" },
  { position: "Koordination im Haus", betrag: "−1.440 €", grundlage: "rund 0,25 Vollzeitäquivalent" },
  { position: "Sachkosten", betrag: "−300 €", grundlage: "Material, Versicherung" },
  { position: "Royalty an Hi Lisa", betrag: "−1.178 €", grundlage: "7 % vom Betreuungsumsatz" },
  { position: "Systemgebühr", betrag: "−290 €", grundlage: "Software, Schulungsplattform, Rechtsaktualisierung" },
  { position: "Umsatzsteuer auf die Gebühren", betrag: "−279 €", grundlage: "19 %, bei steuerfreiem Umsatz nicht abziehbar" },
  { position: "Einstiegsgebühr, auf 5 Jahre umgelegt", betrag: "−238 €", grundlage: "12.000 € netto, einmalig fällig" },
];

const WIR_LIEFERN = [
  {
    titel: "Qualitätssicherungskonzept",
    text: "Nach dem Musterkonzept des Landesamts für Pflege. Fertig ausgearbeitet, auf Ihr Haus angepasst.",
  },
  {
    titel: "Begleitung des Anerkennungsantrags",
    text: "Antrag ans Landesamt für Pflege in Amberg — vorbereitet und geprüft. Sie unterschreiben, wir begleiten das Verfahren.",
  },
  {
    titel: "Schulung, 30 Unterrichtseinheiten",
    text: "Curriculum und Durchführung nach dem bayerischen Schulungskonzept. Vorgeschrieben vor dem ersten Einsatz.",
  },
  {
    titel: "Abrechnung mit den Pflegekassen",
    text: "System, Formulare, Abtretungserklärungen, Nachweise. Der Teil, an dem Häuser ohne Erfahrung scheitern.",
  },
  {
    titel: "Standortrechnung vorab",
    text: "Wir rechnen Ihr Haus durch: Bewohnerstruktur, Pflegegrade, realistische Nutzungsquote, Personalbedarf. Kostenlos, vor jeder Unterschrift.",
  },
  {
    titel: "Marke und Material",
    text: "Bewohnerinformation, Aushänge, Erstgesprächsleitfaden. Alles unter Hi Lisa oder unter Ihrer eigenen Marke.",
  },
];

const BEI_IHNEN = [
  "Sie stellen Ihr Personal selbst ein, führen es und zahlen es. Das ist keine Formalie: Personalgestellung wäre Arbeitnehmerüberlassung und ein anderes Rechtsverhältnis.",
  "Sie stellen die Räume und die Koordination im Haus — gerechnet ist mit rund einem Viertel einer Vollzeitstelle.",
  "Sie führen die Bewohnergespräche. Ihre Leute kennen die Menschen, wir nicht.",
  "Sie sind der Anbieter gegenüber der Pflegekasse. Die Anerkennung läuft auf Ihr Haus, nicht auf uns.",
];

const WEG = [
  {
    titel: "Standortrechnung",
    text: "Wir rechnen Ihr Haus durch: Bewohnerstruktur, Pflegegrade, realistische Nutzungsquote, Personalbedarf. Kostenlos und unverbindlich, bevor irgendetwas unterschrieben wird.",
  },
  {
    titel: "Partnervertrag und Einstiegsgebühr",
    text: "Fünf Jahre Laufzeit, 12.000 € netto einmalig, danach 7 Prozent vom Betreuungsumsatz und 290 € Systemgebühr im Monat.",
  },
  {
    titel: "Konzept und Anerkennungsantrag",
    text: "Wir erstellen das Qualitätssicherungskonzept und bereiten den Antrag ans Landesamt für Pflege vor. Sie unterschreiben, wir begleiten das Verfahren.",
  },
  {
    titel: "Personal und Schulung",
    text: "Sie stellen die ersten Kräfte ein, wir schulen sie mit den 30 Unterrichtseinheiten. Die Schulung muss vor dem ersten Einsatz abgeschlossen sein — das ist gesetzlich vorgeschrieben.",
  },
  {
    titel: "Start",
    text: "Bewohnerinformation, Abtretungserklärungen, erste Einsätze. In der Regel sechs bis zehn Wochen nach Vertragsschluss.",
  },
];

const FRAGEN = [
  {
    frage: "Warum sollte das in unserem Haus besser laufen als bei einem ambulanten Dienst?",
    antwort:
      "Weil die Fahrzeit wegfällt. Ein Dienst, der quer durch die Stadt fährt, bringt etwa 72 Prozent der bezahlten Zeit beim Kunden an. Im Haus, wo die Wege Treppen sind, rechnen wir mit rund 88 Prozent. Das ist der ganze Unterschied — und das ganze Verkaufsargument.",
  },
  {
    frage: "Welche Zahlen in Ihrer Rechnung sind Annahmen?",
    antwort:
      "Zwei: die Nutzungsquote von 45 Prozent und die abrechenbare Quote von 88 Prozent im Haus. Beide messen wir im ersten Partnerhaus und legen die Ergebnisse offen. Wenn Ihre Bewohnerstruktur anders aussieht, sagen Sie es uns vor Vertragsschluss — wir rechnen Ihr Haus durch, nicht unseres.",
  },
  {
    frage: "Ist das Personalgestellung?",
    antwort:
      "Nein, und das ist die wichtigste Abgrenzung im ganzen Modell. Wir stellen kein Personal. Sie stellen ein, Sie weisen an, Sie zahlen. Wir liefern Konzept, Schulung, Abrechnungssystem und Marke. Käme das Weisungsrecht zu uns, wäre es Arbeitnehmerüberlassung — mit ganz anderen Folgen für beide Seiten.",
  },
  {
    frage: "Wir sind Betreutes Wohnen. Greifen die Vergütungsvorgaben für Pflegeeinrichtungen?",
    antwort:
      "Nach unserer Prüfung nicht. § 82c Abs. 2b SGB XI knüpft an zugelassene Pflegeeinrichtungen an — Betreutes Wohnen und Wohnungsgenossenschaften sind das nicht. Deshalb sind Sie unsere erste Zielgruppe. Vor Vertragsschluss gehört diese Frage trotzdem auf den Tisch Ihres Anwalts, nicht nur auf unseren.",
  },
  {
    frage: "Was passiert nach fünf Jahren?",
    antwort:
      "Der Vertrag läuft aus oder wird verlängert. Anerkennung, Personal und Kundenbeziehung liegen bei Ihnen — Sie stehen nach fünf Jahren nicht vor dem Nichts, wenn Sie nicht verlängern wollen. Was entfällt, ist Systempflege, Schulungsplattform und Rechtsaktualisierung.",
  },
  {
    frage: "Können wir das unter unserer eigenen Marke betreiben?",
    antwort:
      "Ja. Der Regelfall ist Hi Lisa als sichtbare Marke, weil sie den Bewohnern das Erklären erspart. Wer eine starke eigene Marke im Haus hat, kann sie behalten — dann liefern wir das Material in Ihrem Auftritt.",
  },
];

export default function FuerBetriebe() {
  return (
    <>
      <Hero
        eyebrow={`Weg 3 von 3 · Bezahlt wird von: ${Z.zahler}`}
        title="Ihre Bewohner haben Anspruch auf 131 Euro im Monat. Die meisten rufen ihn nicht ab."
        lead="Bauen Sie die Alltagsbegleitung in Ihrem Haus selbst auf — mit unserem Konzept, unserer Schulung und unserer Erfahrung im Anerkennungsverfahren. Ihr Personal, Ihre Anerkennung, Ihr Ergebnis."
        cta={
          <>
            <a className="btn btn-accent" href="#rueckruf">
              Standortrechnung anfordern
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
        fineprint="Kostenlos und unverbindlich, bevor irgendetwas unterschrieben wird."
      />

      <Abschnitt narrow style={{ paddingTop: 0 }} label="Für wen" titel="Enterprise passt, wenn">
        <div style={{ marginTop: "var(--s6)" }}>
          <Punkteliste punkte={Z.fuerWen} />
        </div>
      </Abschnitt>

      {/* ---------------------------------------------------- Musterrechnung */}
      <Abschnitt
        id="rechnung"
        label="Die Rechnung"
        titel="Ein Haus mit 30 Nutzern"
        lead="Musterrechnung, nicht Ihr Haus. Was daran Annahme und was Rechengröße ist, steht darunter."
      >
        <div className="card" style={{ marginTop: "var(--s9)", padding: 0, overflow: "hidden" }}>
          {/* Auf dem Telefon scrollt die Tabelle seitwärts. Ein scrollbarer Bereich
              muss auch mit der Tastatur erreichbar sein — daher tabIndex und ein Name. */}
          <div
            style={{ overflowX: "auto" }}
            tabIndex={0}
            role="region"
            aria-label="Musterrechnung, seitwärts scrollbar"
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 17,
                minWidth: 560,
              }}
            >
              <caption className="sr-only">
                Musterrechnung eines Partnerhauses mit 30 Nutzern, Beträge pro Monat
              </caption>
              <thead>
                <tr style={{ background: "var(--light-olive)" }}>
                  <th scope="col" style={{ textAlign: "left", padding: "var(--s4)", fontWeight: 800 }}>
                    Position
                  </th>
                  <th scope="col" style={{ textAlign: "right", padding: "var(--s4)", fontWeight: 800, whiteSpace: "nowrap" }}>
                    € / Monat
                  </th>
                  <th scope="col" style={{ textAlign: "left", padding: "var(--s4)", fontWeight: 800 }}>
                    Grundlage
                  </th>
                </tr>
              </thead>
              <tbody>
                {RECHNUNG.map((r) => (
                  <tr key={r.position} style={{ borderTop: "1px solid var(--rule-soft)" }}>
                    <th scope="row" style={{ textAlign: "left", padding: "var(--s4)", fontWeight: 600 }}>
                      {r.position}
                    </th>
                    <td
                      className="mono-num"
                      style={{ textAlign: "right", padding: "var(--s4)", whiteSpace: "nowrap", fontWeight: 700 }}
                    >
                      {r.betrag}
                    </td>
                    <td style={{ padding: "var(--s4)", color: "var(--ink-70)", fontSize: 16 }}>
                      {r.grundlage}
                    </td>
                  </tr>
                ))}
                <tr style={{ borderTop: "3px solid var(--olive)", background: "var(--olive-wash)" }}>
                  <th scope="row" style={{ textAlign: "left", padding: "var(--s4)", fontWeight: 800, fontSize: 19 }}>
                    Ergebnis
                  </th>
                  <td
                    className="mono-num"
                    style={{ textAlign: "right", padding: "var(--s4)", fontWeight: 800, fontSize: 19, whiteSpace: "nowrap" }}
                  >
                    3.458 €
                  </td>
                  <td style={{ padding: "var(--s4)", color: "var(--ink-70)", fontSize: 16 }}>
                    20,6 % Marge · 41.493 € im Jahr
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card card-quiet" style={{ marginTop: "var(--s6)" }}>
          <h3>Ehrlich gesagt</h3>
          <p style={{ marginBottom: 0, fontSize: 18 }}>
            Zwei Zahlen in dieser Rechnung sind Annahmen, keine Messwerte: die Nutzungsquote
            von 45 Prozent und die abrechenbare Quote von 88 Prozent im Haus. Beide messen wir
            im ersten Partnerhaus und legen die Ergebnisse offen. Wenn Ihre Bewohnerstruktur
            anders aussieht, sagen Sie es uns vor Vertragsschluss — wir rechnen Ihr Haus durch,
            nicht unseres.
          </p>
        </div>
      </Abschnitt>

      {/* ------------------------------------------------------ Aufgabenteilung */}
      <Abschnitt
        id="aufgabenteilung"
        label="Die Aufgabenteilung"
        titel="Was wir liefern"
        lead="Alles, was einmal gebaut werden muss und danach für jedes Haus gleich funktioniert."
      >
        <Kartenraster eintraege={WIR_LIEFERN} />
      </Abschnitt>

      <Abschnitt narrow titel="Was bei Ihnen bleibt" style={{ paddingTop: 0 }}>
        <div style={{ marginTop: "var(--s4)" }}>
          <Punkteliste punkte={BEI_IHNEN} />
        </div>
      </Abschnitt>

      {/* -------------------------------------------------------------- Weg */}
      <Abschnitt
        id="weg"
        label="Der Weg"
        titel="Von der Unterschrift bis zum ersten abgerechneten Einsatz"
        lead="In der Regel sechs bis zehn Wochen."
      >
        <Schritte schritte={WEG} />
      </Abschnitt>

      {/* --------------------------------------------- Was das für Personal heißt */}
      <Abschnitt
        id="begleiterinnen"
        narrow
        label="Was das für Begleiterinnen bedeutet"
        titel="Im Partnerhaus arbeitet Ihr eigenes Personal"
        lead="Wichtig für Ihre Personalgespräche: Die Kräfte im Partnerhaus sind bei Ihnen angestellt, nicht bei uns."
      >
        <div style={{ marginTop: "var(--s6)" }}>
          <Punkteliste
            punkte={[
              "Anstellung, Weisung und Gehalt liegen bei Ihrem Haus — wir sind nicht Arbeitgeber und dürfen es auch nicht sein.",
              "Die Schulung mit 30 Unterrichtseinheiten machen wir, bevor jemand zum ersten Mal allein zu einem Bewohner geht.",
              "Fast keine Fahrzeit: Die Wege sind Treppen und Flure. Das ist der Grund, warum im Haus rund 88 statt 72 Prozent der bezahlten Zeit beim Menschen ankommen.",
              "Dieselbe Grenze wie in allen Zweigen: keine Körperpflege, keine Medikamente, keine Wunden. Diese Grenze trägt die Anerkennung — sie ist nicht verhandelbar.",
            ]}
          />
        </div>
      </Abschnitt>

      <Abschnitt id="fragen" narrow label="Was Sie noch fragen werden" titel="Die Fragen aus den ersten Gesprächen">
        <Fragenliste fragen={FRAGEN} />
        <div className="card card-quiet" style={{ marginTop: "var(--s9)" }}>
          <h3>Zum Weitergeben im Haus</h3>
          <p style={{ fontSize: 18 }}>
            Eine Seite A4 mit der Musterrechnung, der Aufgabenteilung, den Konditionen und
            der Abgrenzung zur Arbeitnehmerüberlassung — für den Kollegen, den Aufsichtsrat
            oder Ihren Anwalt.
          </p>
          <div className="stack-cta">
            <a className="btn btn-primary" href="/hi-lisa-blatt-partner.pdf">
              Partnerblatt als PDF
            </a>
          </div>
        </div>
      </Abschnitt>

      <AndereZweige ausser="enterprise" />

      <Rueckrufblock
        anrede="sie"
        titel="Wir rechnen Ihr Haus durch — kostenlos und vor jeder Unterschrift."
      />
    </>
  );
}
