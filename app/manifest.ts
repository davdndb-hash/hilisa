import type { MetadataRoute } from "next";

/**
 * Damit sich Hi Lisa auf dem Telefon wie eine App auf den Startbildschirm
 * legen lässt — auf Android über „Zum Startbildschirm hinzufügen", auf iOS
 * über Teilen → „Zum Home-Bildschirm".
 *
 * Next.js liefert diese Datei als /manifest.webmanifest aus und setzt den
 * <link rel="manifest"> selbst; er muss nicht ins Layout.
 *
 * `start_url` ist /lisa, nicht /. Wer das Symbol antippt, will in die App,
 * nicht auf die Werbeseite. `scope` bleibt trotzdem "/" — sonst öffnete jeder
 * Link aus der App heraus (Impressum, Datenschutz) einen Browser daneben.
 *
 * Auf iOS zieht das Manifest nur teilweise: Name und Anzeigeart liest Safari,
 * das Symbol holt es sich aus app/apple-icon.png. Beides muss zusammenpassen.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/lisa",
    name: "Hi Lisa — Begleitung in München",
    short_name: "Hi Lisa",
    description:
      "Begleiterin, Termine und Nachrichten an einer Stelle — dieselbe Begleiterin, jede Woche.",
    lang: "de",
    dir: "ltr",
    start_url: "/lisa",
    scope: "/",
    display: "standalone",
    background_color: "#FCFBF7",
    theme_color: "#7C8A2A",
    icons: [
      { src: "/marke/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/marke/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // Android schneidet Symbole in die Form zu, die das Gerät vorgibt
      // (Kreis, Rundquadrat, …). Dieses hier hat dafür Luft am Rand.
      { src: "/marke/icon-maskierbar-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Neue Anfrage",
        short_name: "Anfrage",
        url: "/lisa/neu",
        icons: [{ src: "/marke/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Chats",
        short_name: "Chats",
        url: "/lisa/chats",
        icons: [{ src: "/marke/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
