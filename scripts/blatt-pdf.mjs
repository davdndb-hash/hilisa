/**
 * Erzeugt die drei Ein-Blatt-PDFs aus den Routen unter /blatt/…
 *
 * Warum aus der Website heraus und nicht als eigenes Dokument: so gibt es für
 * Inhalt und Gestaltung genau eine Quelle. Ändert sich der Stundenpreis in
 * lib/zweige.ts oder eine Formulierung auf einem Blatt, wird das PDF neu
 * erzeugt — es kann nicht auseinanderlaufen.
 *
 * Voraussetzung: Chromium über Playwright.
 *   npm i -D playwright
 *   npx playwright install chromium      (nicht nötig, wenn Chromium schon da ist)
 *
 * Aufruf:
 *   npm run build
 *   npx next start -p 4000 &
 *   node scripts/blatt-pdf.mjs
 *
 * Ergebnis: public/hi-lisa-blatt-{kunden,bewerber,partner}.pdf
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASIS = process.env.BLATT_BASIS ?? "http://localhost:4000";

const BLAETTER = [
  { route: "/blatt/kunden", datei: "hi-lisa-blatt-kunden.pdf", titel: "Hi Lisa — Begleitung für ältere Menschen in München" },
  { route: "/blatt/bewerber", datei: "hi-lisa-blatt-bewerber.pdf", titel: "Hi Lisa — Alltagsbegleiterin werden" },
  { route: "/blatt/partner", datei: "hi-lisa-blatt-partner.pdf", titel: "Hi Lisa Enterprise — Partnermodell" },
];

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PFAD || undefined,
});

await mkdir(new URL("../public/", import.meta.url), { recursive: true });

for (const blatt of BLAETTER) {
  const seite = await browser.newPage();
  await seite.goto(BASIS + blatt.route, { waitUntil: "networkidle" });
  // Die Schriften kommen selbst gehostet; ohne dieses Warten druckt Chromium
  // gelegentlich die Ersatzschrift.
  await seite.evaluate(() => document.fonts.ready);
  await seite.emulateMedia({ media: "print" });
  await seite.pdf({
    path: new URL(`../public/${blatt.datei}`, import.meta.url).pathname,
    printBackground: true,
    format: "A4",
    // Kein Rand hier und keiner in @page: der Rand steckt als padding im Blatt
    // selbst. Nur so rechnen Browservorschau und PDF mit derselben Seitenhöhe.
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  await seite.close();
  console.log("geschrieben:", blatt.datei);
}

await browser.close();
