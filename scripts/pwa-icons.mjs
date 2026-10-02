/**
 * Erzeugt die PNG-Symbole für den Startbildschirm aus derselben Bildmarke,
 * die auch app/icon.svg zeigt — olivgrünes Quadrat, „Hi" in Bricolage.
 *
 * Warum überhaupt PNG, wo es das SVG schon gibt: iOS nimmt für
 * apple-touch-icon ausschließlich PNG, ein SVG wird dort stillschweigend
 * ignoriert und das Telefon legt stattdessen einen Screenshot der Seite auf
 * den Startbildschirm. Android ist toleranter, aber maskierbare Symbole sind
 * als PNG verlässlicher.
 *
 * Gerendert wird mit Chromium über Playwright (schon als devDependency da,
 * siehe scripts/blatt-pdf.mjs). Die Schrift kommt aus node_modules, nicht aus
 * dem Netz — dieselbe Regel wie in app/layout.tsx.
 *
 *   npx playwright install chromium     (einmalig)
 *   node scripts/pwa-icons.mjs
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const OLIVE = "#7C8A2A";
const PAPIER = "#FCFBF7";

const SCHRIFT = pathToFileURL(
  resolve("node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2")
).href;

/**
 * `anteil` ist der Durchmesser der Bildmarke im Verhältnis zur Kachel.
 * Maskierbare Symbole werden von Android beschnitten — alles Wichtige muss
 * im inneren Kreis von 80 % liegen, deshalb dort nur 0.62.
 */
const SYMBOLE = [
  { datei: "public/marke/icon-192.png", groesse: 192, radius: 0.23, anteil: 1 },
  { datei: "public/marke/icon-512.png", groesse: 512, radius: 0.23, anteil: 1 },
  { datei: "public/marke/icon-maskierbar-512.png", groesse: 512, radius: 0, anteil: 0.62 },
  // Next.js verlinkt app/apple-icon.png automatisch als apple-touch-icon.
  // iOS rundet selbst ab, deshalb hier eckig und randlos.
  { datei: "app/apple-icon.png", groesse: 180, radius: 0, anteil: 1 },
];

function seite({ groesse, radius, anteil }) {
  const schriftgroesse = Math.round(groesse * 0.47 * anteil);
  const eckradius = Math.round(groesse * radius);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face {
      font-family: "Bricolage";
      src: url("${SCHRIFT}") format("woff2");
      font-weight: 200 800;
    }
    html, body { margin: 0; padding: 0; }
    body { width: ${groesse}px; height: ${groesse}px; }
    .kachel {
      width: ${groesse}px; height: ${groesse}px;
      border-radius: ${eckradius}px;
      background: ${OLIVE};
      display: flex; align-items: center; justify-content: center;
    }
    .marke {
      font-family: "Bricolage", sans-serif;
      font-weight: 800;
      font-size: ${schriftgroesse}px;
      letter-spacing: ${-schriftgroesse * 0.03}px;
      color: ${PAPIER};
      line-height: 1;
      /* Die Schrift sitzt optisch etwas zu tief, wenn man nur zentriert. */
      transform: translateY(-${Math.round(schriftgroesse * 0.04)}px);
    }
  </style></head><body><div class="kachel"><span class="marke">Hi</span></div></body></html>`;
}

const browser = await chromium.launch();
await mkdir("public/marke", { recursive: true });

for (const symbol of SYMBOLE) {
  const page = await browser.newPage({
    viewport: { width: symbol.groesse, height: symbol.groesse },
    deviceScaleFactor: 1,
  });
  await page.setContent(seite(symbol), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: symbol.datei, omitBackground: false });
  await page.close();
  console.log("geschrieben:", symbol.datei, `${symbol.groesse}px`);
}

await browser.close();
