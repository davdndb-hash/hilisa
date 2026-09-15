import Image from "next/image";

export type LisaZustand = "ruhig" | "hoert" | "denkt";

const ZUSTAND_TEXT: Record<LisaZustand, string> = {
  ruhig: "Lisa",
  hoert: "Lisa hört zu …",
  denkt: "Lisa denkt nach …",
};

/**
 * Der Avatar ist die Bühne selbst — kein Icon, kein Emoji. Der Ring um das
 * Bild trägt den Zustand (ruhig/hört/denkt), der Text darüber sagt dasselbe
 * in Worten und steht in einem aria-live-Bereich (siehe Eingabeleiste), damit
 * Vorleseprogramme den Zustandswechsel mitbekommen, nicht nur sehende Nutzer.
 */
export function LisaAvatar({ zustand = "ruhig" }: { zustand?: LisaZustand }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--s3)" }}>
      <span className="lisa-zustand">{ZUSTAND_TEXT[zustand]}</span>
      <div className="lisa-avatar-ring" data-zustand={zustand}>
        <Image
          src="/lisa/avatar.jpg"
          alt="Lisa"
          fill
          sizes="(min-width: 700px) 240px, 34vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </div>
  );
}
