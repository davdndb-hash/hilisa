/**
 * Die verbleibenden Zweige an einer Stelle.
 *
 * Seit dem Pivot auf ausschließlich privat bezahlte Begleitung (23.9.2026, wie
 * papa.com) ist Care raus — die Pflegekasse spielt für Kundinnen keine Rolle
 * mehr. Enterprise bleibt vorerst unangetastet (eigene Entscheidung, nicht Teil
 * dieses Pivots) und braucht die Pflegekasse für sein eigenes Modell weiterhin.
 * Was Übersichtskarten, Navigation und Fußzeile über Privat und Enterprise
 * sagen, kommt aus dieser Datei — nicht an sieben Stellen einzeln.
 */

export type ZweigId = "privat" | "enterprise";

export type Zweig = {
  id: ZweigId;
  /** Name wie er auf der Seite steht — Brand Guide: „Hi Lisa" in zwei Wörtern */
  name: string;
  /** Kurzname für Navigation und Marker */
  kurz: string;
  href: string;
  /** Wer bezahlt — die härteste Unterscheidung zwischen den drei Zweigen */
  zahler: string;
  /** Ein Satz. Wird auf der Startseite und im Finder gelesen. */
  satz: string;
  /** Die Zahl, die man sich merkt */
  zahl: string;
  zahlText: string;
  /** Anrede: die Verbraucherzweige duzen, Enterprise siezt */
  anrede: "du" | "sie";
  /** Für wen dieser Zweig gedacht ist */
  fuerWen: string[];
  /** Woran man merkt, dass es der falsche Zweig ist */
  nichtFuer: string;
};

export const ZWEIGE: Record<ZweigId, Zweig> = {
  privat: {
    id: "privat",
    name: "Hi Lisa Privat",
    kurz: "Privat",
    href: "/privat",
    zahler: "Du selbst",
    satz:
      "Begleitung, die du direkt buchst und bezahlst. Du buchst, wir kommen — kein Antrag, keine Wartezeit.",
    zahl: "42 €",
    zahlText: "pro Stunde, ab zwei Stunden, monatlich kündbar",
    anrede: "du",
    fuerWen: [
      "Ihr wollt Unterstützung im Alltag, ohne Anträge oder Bürokratie",
      "Ihr braucht flexible oder kurzfristige Stunden",
      "Kurzfristig: Urlaub, Krankheit, Umzug, ein schwerer Monat",
    ],
    nichtFuer:
      "Du suchst Begleitung für eine ganze Einrichtung, nicht für eine einzelne Person? Dann ist Hi Lisa für Betriebe der richtige Weg.",
  },
  enterprise: {
    id: "enterprise",
    name: "Hi Lisa Enterprise",
    kurz: "Für Betriebe",
    href: "/fuer-betriebe",
    zahler: "Ihr Betrieb",
    satz:
      "Sie bauen die Alltagsbegleitung in Ihrem Haus auf — mit unserem Konzept, unserer Schulung und unserer Anerkennung im Rücken.",
    zahl: "3.458 €",
    zahlText: "Ergebnis im Monat in der Musterrechnung für 30 Nutzer",
    anrede: "sie",
    fuerWen: [
      "Betreutes Wohnen, Wohnungsgenossenschaft, Klinik, Pflegedienst",
      "Bewohner oder Patienten, die Begleitung brauchen",
      "Eigenes Personal, das Sie selbst einstellen und führen",
    ],
    nichtFuer:
      "Sie suchen Begleitung für einen einzelnen Menschen? Dann ist Hi Lisa Privat richtig.",
  },
};

export const ZWEIG_LISTE: Zweig[] = [ZWEIGE.privat, ZWEIGE.enterprise];

/** Was in jedem Zweig gilt — die Grenze, die rechtlich tragend ist. */
export const GRENZE =
  "Wir machen keine Pflege im medizinischen Sinn. Kein Waschen, kein Anziehen, keine Medikamente, keine Wunden. Dafür alles, was den Tag leichter macht.";
