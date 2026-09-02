import Link from "next/link";
import { Bildmarke } from "@/components/Logo";
import Rueckruf from "@/components/Rueckruf";
import { ZWEIGE, ZWEIG_LISTE, type Zweig, type ZweigId } from "@/lib/zweige";

/**
 * Wiederverwendbare Blöcke. Jede Zweigseite ist aus diesen Bausteinen gebaut,
 * damit die drei Seiten gleich aussehen und sich gleich bedienen lassen.
 * Wer eine Seite ändert, ändert nicht versehentlich nur eine von drei.
 */

/* --------------------------------------------------------------- Abschnitt */

export function Abschnitt({
  id,
  label,
  titel,
  lead,
  narrow = false,
  children,
  style,
}: {
  id?: string;
  label?: string;
  titel?: string;
  lead?: string;
  narrow?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <section id={id} style={style}>
      <div className={narrow ? "wrap narrow" : "wrap"}>
        {label ? <span className="label">{label}</span> : null}
        {titel ? <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)" }}>{titel}</h2> : null}
        {lead ? <p className="lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Karten */

export function Kartenraster({
  eintraege,
  spalten = 3,
}: {
  eintraege: { titel: string; text: string }[];
  spalten?: 2 | 3;
}) {
  return (
    <div className={`grid grid-${spalten}`} style={{ marginTop: "var(--s9)" }}>
      {eintraege.map((e) => (
        <div className="card" key={e.titel}>
          <h3>{e.titel}</h3>
          <p style={{ marginBottom: 0, color: "var(--ink-70)", fontSize: 18 }}>{e.text}</p>
        </div>
      ))}
    </div>
  );
}

/** Aufzählung mit Häkchen. Das Häkchen ist Dekoration und wird nicht vorgelesen. */
export function Punkteliste({ punkte }: { punkte: string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {punkte.map((p) => (
        <li
          key={p}
          style={{
            display: "grid",
            gridTemplateColumns: "28px 1fr",
            gap: "var(--s3)",
            alignItems: "start",
            padding: "var(--s3) 0",
            borderBottom: "1px solid var(--rule-soft)",
            fontSize: 18,
            lineHeight: 1.5,
          }}
        >
          <span aria-hidden="true" style={{ color: "var(--olive-ink)", fontWeight: 800 }}>
            ✓
          </span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ Ablauf */

export function Schritte({ schritte }: { schritte: { titel: string; text: string }[] }) {
  return (
    <ol style={{ listStyle: "none", padding: 0, margin: "var(--s9) 0 0", maxWidth: "56rem" }}>
      {schritte.map((s, i) => (
        <li
          key={s.titel}
          style={{
            display: "grid",
            gridTemplateColumns: "56px 1fr",
            gap: "var(--s6)",
            padding: "var(--s6) 0",
            borderTop: "1px solid var(--rule)",
          }}
        >
          <span
            className="display"
            aria-hidden="true"
            style={{ fontSize: 34, color: "var(--olive-ink)", lineHeight: 1 }}
          >
            {i + 1}
          </span>
          <div>
            <h3>{s.titel}</h3>
            <p style={{ marginBottom: 0, color: "var(--ink-70)", fontSize: 18 }}>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ Fragen */

export function Fragenliste({ fragen }: { fragen: { frage: string; antwort: string }[] }) {
  return (
    <div style={{ marginTop: "var(--s6)" }}>
      {fragen.map((f) => (
        <details
          key={f.frage}
          style={{ borderBottom: "1px solid var(--rule)", padding: "var(--s2) 0" }}
        >
          <summary
            style={{
              cursor: "pointer",
              padding: "var(--s4) 0",
              fontWeight: 800,
              fontSize: 19,
              lineHeight: 1.35,
              minHeight: 44,
            }}
          >
            {f.frage}
          </summary>
          <p style={{ paddingBottom: "var(--s4)", color: "var(--ink-70)" }}>{f.antwort}</p>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- Zweigkarten */

export function Zweigkarte({ zweig, aktiv = false }: { zweig: Zweig; aktiv?: boolean }) {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--s3)",
        borderColor: aktiv ? "var(--olive)" : "var(--rule)",
        borderWidth: aktiv ? 2 : 1,
      }}
    >
      <span className={`badge ${zweig.id === "enterprise" ? "badge-olive" : "badge-rose"}`}>
        {zweig.name}
      </span>
      <p style={{ margin: 0, fontSize: 16, color: "var(--ink-55)" }}>
        Bezahlt wird von: {zweig.zahler}
      </p>
      <span
        className="big-number mono-num"
        style={{
          /* Ein Platzhalter wie „Preis eintragen" bricht in der Zahlengröße hässlich um.
             Solange keine Ziffer drinsteht, setzen wir ihn kleiner. */
          fontSize: /\d/.test(zweig.zahl) ? "clamp(30px, 5vw, 42px)" : "clamp(22px, 3vw, 26px)",
          letterSpacing: /\d/.test(zweig.zahl) ? undefined : "-0.01em",
        }}
      >
        {zweig.zahl}
      </span>
      <p style={{ margin: 0, fontSize: 17, color: "var(--ink-70)" }}>{zweig.zahlText}</p>
      <p style={{ marginTop: "var(--s2)", marginBottom: "var(--s4)", fontSize: 18 }}>
        {zweig.satz}
      </p>
      <Link
        className="btn btn-primary"
        href={zweig.href}
        style={{ marginTop: "auto", alignSelf: "flex-start" }}
      >
        {zweig.name} ansehen
      </Link>
    </div>
  );
}

/** Querverweis am Fuß einer Zweigseite auf die beiden anderen Zweige. */
export function AndereZweige({ ausser }: { ausser: ZweigId }) {
  const andere = ZWEIG_LISTE.filter((z) => z.id !== ausser);
  return (
    <Abschnitt
      label="Passt das nicht?"
      titel="Es gibt zwei andere Wege"
      lead={ZWEIGE[ausser].nichtFuer}
    >
      <div className="grid grid-2" style={{ marginTop: "var(--s9)" }}>
        {andere.map((z) => (
          <Zweigkarte key={z.id} zweig={z} />
        ))}
      </div>
    </Abschnitt>
  );
}

/* ------------------------------------------------------------ Rückrufblock */

export function Rueckrufblock({
  titel = "Zwanzig Minuten, und du weißt, woran du bist.",
  text,
  anrede = "du",
}: {
  titel?: string;
  text?: string;
  anrede?: "du" | "sie";
}) {
  const standard =
    anrede === "sie"
      ? "Rufen Sie uns an unter 089 — Nummer eintragen, Montag bis Freitag von 8 bis 18 Uhr. Oder lassen Sie uns Ihre Nummer da — wir melden uns am selben Werktag zurück."
      : "Ruf uns an unter 089 — Nummer eintragen, Montag bis Freitag von 8 bis 18 Uhr. Oder lass uns deine Nummer da — wir melden uns am selben Werktag zurück.";

  return (
    <section id="rueckruf" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="surface-ink" style={{ padding: "clamp(28px, 5vw, 56px)" }}>
          <div className="grid grid-2" style={{ alignItems: "start" }}>
            <div>
              <Bildmarke variant="ink" size={52} title="" />
              <span className="label on-dark" style={{ marginTop: "var(--s6)", display: "block" }}>
                Erstgespräch
              </span>
              <h2 style={{ color: "var(--paper)", fontSize: "clamp(26px, 4vw, 34px)" }}>{titel}</h2>
              <p style={{ color: "rgba(252,251,247,0.8)" }}>{text ?? standard}</p>
              <a
                className="btn btn-accent"
                href="tel:+4989000000"
                style={{ marginTop: "var(--s4)" }}
              >
                089 — Nummer eintragen
              </a>
            </div>
            <div className="card" style={{ background: "var(--paper)", borderColor: "transparent" }}>
              <Rueckruf />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Grenze */

export function Grenzhinweis({ text }: { text: string }) {
  return (
    <div className="card card-quiet" style={{ marginTop: "var(--s9)" }}>
      <h3>Wo wir aufhören</h3>
      <p style={{ marginBottom: 0, fontSize: 18 }}>{text}</p>
    </div>
  );
}
