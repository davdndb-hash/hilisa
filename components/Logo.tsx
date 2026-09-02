/**
 * Hi Lisa — Wortmarke und Bildmarke.
 *
 * Brand Guide 02: „Hi" im Textton, „Lisa" in Farbe. Die Bildmarke steht links
 * neben der Wortmarke im Abstand einer halben Markenbreite und funktioniert ab 16 px.
 * Keine Sperrung, keine Kursivstellung, keine Großbuchstaben, keine anderen Farben.
 *
 * Hinweis aus dem Brand Guide: Die Bildmarke ist eine Skizze. Für Druck, App-Store
 * und Stickerei muss sie von einer Grafikerin als saubere Vektordatei nachgezogen
 * werden — Radien, Blasenschwanz und Punktabstände sind dann feinzujustieren.
 */

type Variant = "paper" | "ink" | "olive";

const PALETTE: Record<
  Variant,
  { hi: string; lisa: string; bubble: string; figureA: string; figureB: string }
> = {
  // Auf hellem Grund
  paper: { hi: "#191b0d", lisa: "#7c8a2a", bubble: "#7c8a2a", figureA: "#fcfbf7", figureB: "#fcfbf7" },
  // Auf Ink
  ink: { hi: "#fcfbf7", lisa: "#d64fb0", bubble: "#d64fb0", figureA: "#191b0d", figureB: "#191b0d" },
  // Auf Olive
  olive: { hi: "#fcfbf7", lisa: "#f6c7e8", bubble: "#fcfbf7", figureA: "#7c8a2a", figureB: "#d64fb0" },
};

export function Bildmarke({
  variant = "paper",
  size = 40,
  title = "Hi Lisa",
}: {
  variant?: Variant;
  size?: number;
  title?: string;
}) {
  const c = PALETTE[variant];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Sprechblase mit Schwanz unten links */}
      <path
        d="M9 3h30a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H20l-9.5 9.2A1 1 0 0 1 9 43.5V35a6 6 0 0 1-6-6V9a6 6 0 0 1 6-6z"
        fill={c.bubble}
      />
      {/* Größere Figur — die begleitete Person */}
      <circle cx="19" cy="15.5" r="5.2" fill={c.figureA} />
      <path d="M9.4 29.5c0-4.6 4.3-7.6 9.6-7.6s9.6 3 9.6 7.6z" fill={c.figureA} />
      {/* Kleinere Figur — die Begleiterin, Schulter an Schulter */}
      <circle cx="32.5" cy="17.4" r="4.1" fill={c.figureB} />
      <path d="M25 29.5c0-3.7 3.4-6 7.5-6s7.5 2.3 7.5 6z" fill={c.figureB} />
    </svg>
  );
}

export default function Logo({
  variant = "paper",
  size = 40,
  wordmark = true,
}: {
  variant?: Variant;
  size?: number;
  wordmark?: boolean;
}) {
  const c = PALETTE[variant];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.35,
        textDecoration: "none",
      }}
    >
      <Bildmarke variant={variant} size={size} title="" />
      {wordmark && (
        <span
          className="display"
          style={{
            fontSize: size * 0.78,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: c.hi }}>Hi</span>{" "}
          <span style={{ color: c.lisa }}>Lisa</span>
        </span>
      )}
    </span>
  );
}
