/**
 * Eigene Strichzeichnungen für die Leistungen-Karten auf der Startseite
 * (siehe LEISTUNGEN in app/page.tsx), als Ersatz für die zuerst genutzten
 * Emoji — die sahen je nach Betriebssystem/Browser unterschiedlich aus und
 * passten nicht zur Marke. Jedes Icon ist in sich geschlossenes SVG (kein
 * Emoji-Font, keine externe Abhängigkeit), einheitlicher Kreis-Hintergrund
 * in --lila, Strichzeichnung in --olive-ink — nach Vorbild papa.com/
 * companion-care (dort: farbiger Kreis-Badge + einfache Linien-Illustration).
 */

function IconBadge({ children, size = 36 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="19" fill="var(--lila)" opacity="0.14" />
      <g stroke="var(--olive-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {children}
      </g>
    </svg>
  );
}

/** Begleitung: zwei Figuren nebeneinander, angedeutet eingehakt. */
export function IconBegleitung({ size }: { size?: number }) {
  return (
    <IconBadge size={size}>
      <circle cx="15" cy="13" r="3.2" />
      <path d="M15 16.5v9M11 20h8M15 25.5l-3.5 6M15 25.5l3.5 6" />
      <circle cx="26" cy="15.5" r="2.6" />
      <path d="M26 18.3v7.5M23 21.3h6M26 25.8l-3 5.4M26 25.8l3 5.4" />
    </IconBadge>
  );
}

/** Kochen und Einkauf: Topf mit Deckelgriffen und Dampf. */
export function IconKochen({ size }: { size?: number }) {
  return (
    <IconBadge size={size}>
      <path d="M9 18h22" />
      <path d="M10 18v3a10 8.5 0 0020 0v-3" />
      <path d="M7.5 18h-2M34.5 18h2" />
      <path d="M15 12c0-2 2-2 2-4M20 12c0-2 2-2 2-4M25 12c0-2 2-2 2-4" />
    </IconBadge>
  );
}

/** Post und Papierkram: Briefumschlag. */
export function IconPost({ size }: { size?: number }) {
  return (
    <IconBadge size={size}>
      <rect x="8" y="12" width="24" height="17" rx="1.5" />
      <path d="M8 13.5l12 8.5 12-8.5" />
    </IconBadge>
  );
}

/** Haushalt: Wäschekorb mit Henkel. */
export function IconHaushalt({ size }: { size?: number }) {
  return (
    <IconBadge size={size}>
      <path d="M11 19h18l-2.7 12h-12.6z" />
      <path d="M11.5 19c3-1 15-1 17 0" />
      <path d="M16 19c0-3.2 1.6-5.4 4-5.4s4 2.2 4 5.4" />
    </IconBadge>
  );
}

/** Zeit zu zweit: dampfende Tasse mit Herz — Kaffee, Wärme, Nähe. */
export function IconZeitZuZweit({ size }: { size?: number }) {
  return (
    <IconBadge size={size}>
      <path d="M11 17h13v8a6.5 6.5 0 01-13 0z" />
      <path d="M8.5 27.5h18" />
      <path d="M24 20h2.5a3 3 0 010 6H24" />
      <path d="M15 14c0-1.5 1.4-1.5 1.4-3M19 14c0-1.5 1.4-1.5 1.4-3" />
      <path
        d="M26.5 9.3c-.9-1.2-2.6-.8-2.6.6 0 1.3 2.6 2.7 2.6 2.7s2.6-1.4 2.6-2.7c0-1.4-1.7-1.8-2.6-.6z"
        fill="var(--lila)"
        stroke="none"
      />
    </IconBadge>
  );
}

/** Handy und Tablet: zwei überlappende Geräte. */
export function IconHandy({ size }: { size?: number }) {
  return (
    <IconBadge size={size}>
      <rect x="9" y="8" width="15" height="21" rx="2" />
      <path d="M14 24.5h5" />
      <rect x="21" y="15" width="10.5" height="17" rx="1.8" />
      <path d="M24.3 28.5h4" />
    </IconBadge>
  );
}

/* ---------------------------------------------------- Werteversprechen ---- */
/**
 * Fünf weitere Icons für den neuen Werteversprechen-Abschnitt auf der
 * Startseite (siehe app/page.tsx, WERTEVERSPRECHEN) — nach Vorbild
 * papa.com/companion-care ("Promote independence", "Reduce inequities" usw.),
 * dieselbe Badge-Sprache wie die Leistungen-Icons oben, aber eigene Motive,
 * damit sich der Abschnitt trotz gleicher Bauweise nicht wiederholt anfühlt.
 */

/** Unabhängigkeit fördern: eine Figur, die selbstständig eine Stufe hoch geht. */
export function IconUnabhaengigkeit({ size }: { size?: number }) {
  return (
    <IconBadge size={size}>
      <path d="M9 30h6v-5h6v-5h6" />
      <circle cx="27" cy="15" r="3" />
      <path d="M27 18v7M24 21h6M27 25l-3 5M27 25l3 5" />
    </IconBadge>
  );
}

/** Zugang für alle schaffen: eine offene Tür. */
export function IconZugang({ size }: { size?: number }) {
  return (
    <IconBadge size={size}>
      <path d="M11 9h15v22h-15z" />
      <path d="M11 9l13 3v16l-13 3" />
      <circle cx="20" cy="20" r="0.9" fill="var(--olive-ink)" stroke="none" />
    </IconBadge>
  );
}

/** Einsamkeit heilen: zwei sich überlappende Kreise — Verbindung. */
export function IconEinsamkeit({ size }: { size?: number }) {
  return (
    <IconBadge size={size}>
      <circle cx="16" cy="20" r="8.5" />
      <circle cx="25" cy="20" r="8.5" />
    </IconBadge>
  );
}

/** Wohlbefinden stärken: eine Sonne. */
export function IconWohlbefinden({ size }: { size?: number }) {
  return (
    <IconBadge size={size}>
      <circle cx="20" cy="20" r="6" />
      <path d="M20 8v3M20 29v3M8 20h3M29 20h3M11.5 11.5l2.1 2.1M26.4 26.4l2.1 2.1M28.5 11.5l-2.1 2.1M13.6 26.4l-2.1 2.1" />
    </IconBadge>
  );
}

/** Kosten senken: Sparschwein mit fallender Münze. */
export function IconKosten({ size }: { size?: number }) {
  return (
    <IconBadge size={size}>
      <ellipse cx="19" cy="22" rx="10" ry="7.5" />
      <path d="M9.5 21c-1.4 0-2.3-1-2.3-1s.9-1.4 2.6-1.4" />
      <path d="M28 17.5c1.6-.6 2.6.9 1.2 2.2" />
      <path d="M13 27.5v2.3M25 27.5v2.3M17 28v2M21 28v2" />
      <path d="M17 15.5h4" />
      <circle cx="19.5" cy="9" r="2.3" fill="var(--lila)" stroke="none" />
      <path d="M19.5 11.3v2.7" />
    </IconBadge>
  );
}
