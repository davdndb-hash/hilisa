import { Bildmarke } from "@/components/Logo";

/**
 * Bausteine der Ein-Blatt-Übersichten.
 *
 * Regeln, die hier gelten und auf dem Bildschirm nicht:
 *   - Fließtext nie unter 11 pt, Kernaussagen 13 pt. Auf Papier misst man in Punkt,
 *     nicht in Pixel, und ein 78-Jähriger liest 9 pt nicht.
 *   - Keine oliven Vollflächen über die ganze Seite. Ein Blatt, das eine
 *     Tintenpatrone leert, wird nicht gedruckt.
 *   - Die Telefonnummer steht auf jedem Blatt unten und ist das Größte nach der
 *     Überschrift. Wer dieses Blatt in der Hand hält, hat kein Internet dabei.
 *   - Alles passt auf eine Seite A4. Zwei Seiten heißt, die zweite wird verloren.
 */

export function BlattKopf({
  marker,
  titel,
  unterzeile,
}: {
  marker: string;
  titel: string;
  unterzeile: string;
}) {
  return (
    <header className="blatt-kopf">
      <div className="blatt-marke">
        <Bildmarke variant="paper" size={34} title="" />
        <span className="blatt-wortmarke">
          <span>Hi</span> <span className="blatt-lisa">Lisa</span>
        </span>
        <span className="blatt-marker">{marker}</span>
      </div>
      <h1 className="blatt-titel">{titel}</h1>
      <p className="blatt-unterzeile">{unterzeile}</p>
    </header>
  );
}

export function BlattSpalte({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="blatt-spalte">
      <h2 className="blatt-h2">{titel}</h2>
      {children}
    </section>
  );
}

export function BlattListe({
  punkte,
  kreuz = false,
  zwei = false,
}: {
  punkte: string[];
  kreuz?: boolean;
  /** Zweispaltig — für Listen, die über die ganze Blattbreite laufen. */
  zwei?: boolean;
}) {
  return (
    <ul className={zwei ? "blatt-liste blatt-liste-zwei" : "blatt-liste"}>
      {punkte.map((p) => (
        <li key={p}>
          <span aria-hidden="true" className={kreuz ? "blatt-kreuz" : "blatt-haken"}>
            {kreuz ? "✕" : "✓"}
          </span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

export function BlattZahl({ zahl, text }: { zahl: string; text: string }) {
  return (
    <div className="blatt-zahl-box">
      <span className="blatt-zahl">{zahl}</span>
      <span className="blatt-zahl-text">{text}</span>
    </div>
  );
}

export function BlattFuss({
  zeile,
  anrede = "du",
}: {
  zeile: string;
  anrede?: "du" | "sie";
}) {
  return (
    <footer className="blatt-fuss">
      <div className="blatt-fuss-tel">
        <span className="blatt-fuss-label">
          {anrede === "sie" ? "Rufen Sie an" : "Ruf an"}
        </span>
        <span className="blatt-tel">089 — Nummer eintragen</span>
        <span className="blatt-fuss-zeit">Montag bis Freitag, 8 bis 18 Uhr</span>
      </div>
      <p className="blatt-fuss-zeile">{zeile}</p>
      <p className="blatt-fuss-klein">
        Hi Lisa · Firmierung und Adresse eintragen · hilisa-adresse.de eintragen ·
        Entwurf, Stand September 2026
      </p>
    </footer>
  );
}
