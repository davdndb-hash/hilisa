/**
 * Die drei Zweige an einer Stelle.
 *
 * Alles, was Übersichtskarten, Modell-Finder, Navigation und die Fußzeile über
 * Care, Privat und Enterprise sagen, kommt aus dieser Datei. Wenn sich ein Preis
 * oder eine Bezeichnung ändert, ändert sie sich hier — nicht an sieben Stellen.
 */

export type ZweigId = "care" | "privat" | "enterprise";

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
  care: {
    id: "care",
    name: "Hi Lisa Care",
    kurz: "Care",
    href: "/care",
    zahler: "Die Pflegekasse",
    satz:
      "Begleitung, die die Pflegekasse bezahlt. Du bekommst keine Rechnung — wir rechnen direkt ab.",
    zahl: "131 €",
    zahlText: "im Monat von der Kasse, ab Pflegegrad 1",
    anrede: "du",
    fuerWen: [
      "Es gibt einen Pflegegrad — oder er ist beantragt",
      "Der Entlastungsbetrag wird bisher nicht genutzt",
      "Zwei Stunden in der Woche, fester Termin, feste Person",
    ],
    nichtFuer:
      "Kein Pflegegrad und keiner in Aussicht? Dann ist Hi Lisa Privat der richtige Weg.",
  },
  privat: {
    id: "privat",
    name: "Hi Lisa Privat",
    kurz: "Privat",
    href: "/privat",
    zahler: "Du selbst",
    satz:
      "Dieselbe Begleitung, ohne Pflegegrad und ohne Antrag. Du buchst, wir kommen.",
    zahl: "42 €",
    zahlText: "pro Stunde, ab zwei Stunden, monatlich kündbar",
    anrede: "du",
    fuerWen: [
      "Kein Pflegegrad — oder er soll gar nicht beantragt werden",
      "Mehr Stunden als die Kasse zahlt",
      "Kurzfristig: Urlaub, Krankheit, Umzug, ein schwerer Monat",
    ],
    nichtFuer:
      "Es gibt einen Pflegegrad? Dann fang mit Hi Lisa Care an — das kostet dich nichts.",
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
      "Sie suchen Begleitung für einen einzelnen Menschen? Dann sind Care oder Privat richtig.",
  },
};

export const ZWEIG_LISTE: Zweig[] = [ZWEIGE.care, ZWEIGE.privat, ZWEIGE.enterprise];

/** Was in jedem Zweig gilt — die Grenze, die rechtlich tragend ist. */
export const GRENZE =
  "Wir machen keine Pflege im medizinischen Sinn. Kein Waschen, kein Anziehen, keine Medikamente, keine Wunden. Dafür alles, was den Tag leichter macht.";
