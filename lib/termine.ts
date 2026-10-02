import type { Database } from "@/lib/supabase/types";

/**
 * Darstellung von Terminen: Zeitzone, Formulierungen, Status-Beschriftungen.
 *
 * Getrennt von lib/concierge-data.ts, weil dort ausschließlich der
 * Datenbankzugriff liegt — hier geht es nur darum, wie ein Termin aussieht,
 * wenn man ihn liest.
 */

export type Terminstatus = Database["public"]["Enums"]["terminstatus"];

/**
 * Alles rechnet in Münchner Zeit.
 *
 * Der Grund ist nicht Bequemlichkeit, sondern Richtigkeit: `starts_at` ist
 * ein timestamptz, und ohne feste Zone formatiert der Server (auf Vercel in
 * UTC) anders als der Browser der Nutzerin. Das gäbe im besten Fall einen
 * Hydration-Fehler und im schlechtesten eine Uhrzeit, die um zwei Stunden
 * danebenliegt — bei einem Arzttermin ist das kein Schönheitsfehler.
 * Hi Lisa arbeitet in München; die Zone ist damit eine Konstante, keine
 * Nutzereinstellung.
 */
export const ZONE = "Europe/Berlin";

/** Versatz der Zone gegenüber UTC in Minuten, zum gegebenen Zeitpunkt. */
function versatzMinuten(zeitpunkt: Date): number {
  const teile = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONE,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(zeitpunkt);

  const t = Object.fromEntries(teile.map((p) => [p.type, p.value])) as Record<string, string>;
  // "24" statt "00" kommt bei hour12: false gelegentlich vor.
  const stunde = Number(t.hour) % 24;
  const alsWaereEsUtc = Date.UTC(
    Number(t.year),
    Number(t.month) - 1,
    Number(t.day),
    stunde,
    Number(t.minute),
    Number(t.second)
  );
  return (alsWaereEsUtc - zeitpunkt.getTime()) / 60000;
}

/**
 * Macht aus der Wanduhrzeit, die im Formular steht ("2026-10-07" + "14:00"),
 * den tatsächlichen Zeitpunkt als ISO-Zeichenkette.
 *
 * Zwei Durchgänge, weil der Versatz selbst vom Zeitpunkt abhängt: Ende März
 * und Ende Oktober liegt zwischen Schätzung und Ergebnis eine Stunde. Der
 * zweite Durchgang korrigiert das. Die eine Stunde, die es bei der
 * Zeitumstellung gar nicht gibt, bleibt ein Sonderfall — sie fällt nachts um
 * zwei an, und dann fährt niemand zum Arzt.
 */
export function wanduhrNachIso(datum: string, uhrzeit: string): string {
  const naiv = new Date(`${datum}T${uhrzeit}:00Z`);
  if (Number.isNaN(naiv.getTime())) throw new Error("Ungültiges Datum oder Uhrzeit");
  const ersterVersuch = new Date(naiv.getTime() - versatzMinuten(naiv) * 60000);
  return new Date(naiv.getTime() - versatzMinuten(ersterVersuch) * 60000).toISOString();
}

/** "Dienstag, 7. Oktober" */
export function tagLang(iso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(iso));
}

/** "14:00" */
export function uhrzeitKurz(iso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: ZONE,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

/** "Dienstag, 7. Oktober, 14:00 Uhr" */
export function terminLang(iso: string): string {
  return `${tagLang(iso)}, ${uhrzeitKurz(iso)} Uhr`;
}

/** "2 Stunden", "2,5 Stunden" */
export function dauerText(minuten: number): string {
  const stunden = minuten / 60;
  const zahl = Number.isInteger(stunden) ? String(stunden) : stunden.toFixed(1).replace(".", ",");
  return `${zahl} Stunden`;
}

/**
 * Was die Kundin über den Stand lesen soll.
 *
 * Bewusst in ganzen Sätzen und ohne Fachwörter: „angeboten" sagt einer
 * Angehörigen nichts, „Wir fragen gerade Begleiterinnen an" schon.
 *
 * Die Hälfte dieser Zustände kann heute noch gar nicht eintreten — es gibt
 * keine Ansicht, in der eine Begleiterin zusagt. Sie stehen trotzdem schon
 * hier, damit die Oberfläche nicht nachgezogen werden muss, sobald es sie
 * gibt, und damit ein von Hand gesetzter Status sofort richtig aussieht.
 */
export const STATUS_TEXT: Record<Terminstatus, { kurz: string; lang: string; ton: Ton }> = {
  angefragt: {
    kurz: "Angefragt",
    lang: "Angekommen. Wir suchen eine Begleiterin für diesen Termin.",
    ton: "wartet",
  },
  angeboten: {
    kurz: "In Vermittlung",
    lang: "Wir fragen gerade Begleiterinnen an.",
    ton: "wartet",
  },
  angenommen: {
    kurz: "Bestätigt",
    lang: "Eine Begleiterin hat zugesagt.",
    ton: "gut",
  },
  abgelehnt: {
    kurz: "Noch offen",
    lang: "Für diesen Termin war noch niemand frei. Wir melden uns bei euch.",
    ton: "achtung",
  },
  laeuft: {
    kurz: "Läuft gerade",
    lang: "Der Einsatz läuft gerade.",
    ton: "gut",
  },
  erledigt: {
    kurz: "Erledigt",
    lang: "Dieser Termin ist vorbei.",
    ton: "ruhig",
  },
  storniert: {
    kurz: "Storniert",
    lang: "Dieser Termin wurde abgesagt.",
    ton: "ruhig",
  },
};

export type Ton = "wartet" | "gut" | "achtung" | "ruhig";

/** Ein Termin lässt sich absagen, solange er nicht vorbei oder schon weg ist. */
export function stornierbar(status: Terminstatus): boolean {
  return status !== "erledigt" && status !== "storniert";
}
