/**
 * Kontaktdaten an einer Stelle.
 *
 * Telefon, WhatsApp und E-Mail stehen an über einem Dutzend Stellen im Code
 * (Hero-CTAs, Fußzeile, Impressum, PDF-Blätter, Formulare). Solange es echte
 * Nummern gibt, ändert sich der Wert hier einmal statt an jeder Stelle einzeln.
 */

export const KONTAKT = {
  telefonHref: "tel:+4989000000",
  telefonAnzeige: "089 — Nummer eintragen",
  telefonKurz: "089 — Nummer",
  whatsappHref: "https://wa.me/491700000000",
  whatsappAnzeige: "WhatsApp — Nummer eintragen",
  emailAnzeige: "hallo@ — Adresse eintragen",
} as const;
