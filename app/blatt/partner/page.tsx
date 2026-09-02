import type { Metadata } from "next";
import { BlattFuss, BlattKopf, BlattListe, BlattSpalte } from "@/components/BlattTeile";

/**
 * Ein-Blatt-Übersicht für Partnerbetriebe.
 *
 * Wird am Ende eines Erstgesprächs übergeben — der Geschäftsführer eines
 * Betreuten Wohnens legt es einem Kollegen oder dem Aufsichtsrat hin. Deshalb
 * steht die Rechnung drauf und nicht nur das Versprechen, und deshalb steht die
 * Abgrenzung zur Arbeitnehmerüberlassung sichtbar auf dem Blatt: sie ist die
 * erste Frage, die ein Anwalt stellt.
 *
 * Zahlen aus HiLisa_Enterprise_Partnermodell (Musterhaus, 30 Nutzer).
 */

export const metadata: Metadata = {
  title: "Ein-Blatt-Übersicht für Partnerbetriebe",
};

const RECHNUNG: [string, string][] = [
  ["Kassenmittel — 30 Nutzer × 501 € Budget", "15.025 €"],
  ["Private Zubuchung — 30 × 60 €", "1.800 €"],
  ["Personal — eigene Kräfte, 17 €/h brutto, 24,6 % AG-Last", "−9.642 €"],
  ["Koordination im Haus — rund 0,25 Vollzeitäquivalent", "−1.440 €"],
  ["Sachkosten — Material, Versicherung", "−300 €"],
  ["Royalty an Hi Lisa — 7 % vom Betreuungsumsatz", "−1.178 €"],
  ["Systemgebühr — Software, Schulung, Rechtsstand", "−290 €"],
  ["USt auf Royalty und Systemgebühr — 19 %, nicht abziehbar", "−279 €"],
  ["Einstiegsgebühr — 12.000 € netto, auf 5 Jahre umgelegt", "−238 €"],
];

export default function BlattPartner() {
  return (
    <div className="blatt-kompakt">
      <BlattKopf
        marker="Partnermodell"
        titel="131 € im Monat pro Bewohner — die meisten rufen sie nie ab."
        unterzeile="Bauen Sie die Alltagsbegleitung in Ihrem Haus selbst auf — mit unserem Konzept, unserer Schulung und unserer Erfahrung im Anerkennungsverfahren. Ihr Personal, Ihre Anerkennung, Ihr Ergebnis."
      />

      {/* Rasteraufbau: Die Tabelle ist der höchste Block und läuft deshalb über die
          ganze Breite — in einer Spalte würde jede Zeile umbrechen und der Block
          doppelt so hoch. Danach je zwei Spalten ähnlicher Höhe: die Zeilenhöhe
          eines Rasters ist immer die des höheren Kindes. */}
      <div className="blatt-koerper">
        <div className="blatt-breit">
          <h2 className="blatt-h2">Die Rechnung: ein Haus mit 30 Nutzern, pro Monat</h2>
          <table className="blatt-tabelle">
            <thead>
              <tr>
                <th scope="col">Position</th>
                <th scope="col" className="zahl">
                  € / Monat
                </th>
              </tr>
            </thead>
            <tbody>
              {RECHNUNG.map(([pos, betrag]) => (
                <tr key={pos}>
                  <th scope="row" style={{ fontWeight: 400 }}>
                    {pos}
                  </th>
                  <td className="zahl">{betrag}</td>
                </tr>
              ))}
              <tr className="summe">
                <th scope="row">Ergebnis · 20,6 % Marge · 41.493 € im Jahr</th>
                <td className="zahl">3.458 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <BlattSpalte titel="Was Hi Lisa liefert">
          <BlattListe
            punkte={[
              "Qualitätssicherungskonzept nach dem Musterkonzept des LfP",
              "Anerkennungsantrag beim LfP Amberg, vorbereitet und begleitet",
              "Schulung: 30 Unterrichtseinheiten, Curriculum und Durchführung",
              "Abrechnungssystem, Formulare, Abtretungserklärungen",
              "Marke und Material — Hi Lisa oder Ihre Marke",
            ]}
          />
        </BlattSpalte>

        <BlattSpalte titel="Was bei Ihnen bleibt">
          <BlattListe
            punkte={[
              "Sie stellen Ihr Personal selbst ein, führen es und zahlen es",
              "Räume und Koordination im Haus, rund 0,25 VZÄ",
              "Die Bewohnergespräche — Ihre Leute kennen die Menschen",
              "Sie sind Anbieter gegenüber der Kasse — die Anerkennung läuft auf Ihr Haus",
            ]}
          />
        </BlattSpalte>

        <BlattSpalte titel="Die Konditionen">
          <BlattListe
            punkte={[
              "Fünf Jahre Laufzeit",
              "12.000 € netto Einstiegsgebühr, einmalig",
              "7 % vom Betreuungsumsatz, 290 € Systemgebühr im Monat",
              "Sechs bis zehn Wochen bis zum ersten Einsatz",
            ]}
          />
          <h2 className="blatt-h2" style={{ marginTop: "3.5mm" }}>
            Warum es im Haus besser läuft
          </h2>
          <p style={{ marginBottom: 0 }}>
            Ein ambulanter Dienst, der quer durch die Stadt fährt, bringt rund 72 Prozent
            der bezahlten Zeit beim Kunden an. Im Haus, wo die Wege Treppen sind, sind es
            etwa 88 Prozent.
          </p>
        </BlattSpalte>

        <div className="blatt-kasten">
          <strong>Ehrlich gesagt:</strong> Nutzungsquote 45 % und abrechenbare Quote 88 %
          sind Annahmen. Wir messen sie im ersten Partnerhaus und legen sie offen.
          <br />
          <strong>Keine Personalgestellung:</strong> Sie stellen ein, weisen an und zahlen.
          § 82c Abs. 2b SGB XI gilt für zugelassene Pflegeeinrichtungen — Betreutes Wohnen
          ist keine. Beides gehört vor Vertragsschluss zu Ihrem Anwalt.
        </div>
      </div>

      <BlattFuss
        anrede="sie"
        zeile="Erster Schritt ist die Standortrechnung für Ihr Haus — kostenlos, bevor irgendetwas unterschrieben wird."
      />
    </div>
  );
}
