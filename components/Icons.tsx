/**
 * Eigene Strichzeichnungen für die Leistungen-Karten auf der Startseite
 * (siehe LEISTUNGEN in app/page.tsx), als Ersatz für die zuerst genutzten
 * Emoji — die sahen je nach Betriebssystem/Browser unterschiedlich aus und
 * passten nicht zur Marke. Jedes Icon ist in sich geschlossenes SVG (kein
 * Emoji-Font, keine externe Abhängigkeit), einheitlicher Kreis-Hintergrund
 * in --lila, Strichzeichnung in --olive-ink — nach Vorbild papa.com/
 * companion-care (dort: farbiger Kreis-Badge + einfache Linien-Illustration).
 */

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="19" fill="var(--lila)" opacity="0.14" />
      <g stroke="var(--olive-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {children}
      </g>
    </svg>
  );
}

/** Begleitung: zwei Figuren nebeneinander, angedeutet eingehakt. */
export function IconBegleitung() {
  return (
    <IconBadge>
      <circle cx="15" cy="13" r="3.2" />
      <path d="M15 16.5v9M11 20h8M15 25.5l-3.5 6M15 25.5l3.5 6" />
      <circle cx="26" cy="15.5" r="2.6" />
      <path d="M26 18.3v7.5M23 21.3h6M26 25.8l-3 5.4M26 25.8l3 5.4" />
    </IconBadge>
  );
}

/**
 * Begleitung, als eigene Kachel statt Kreis-Badge: zwei vollere Figuren
 * (Rumpf, Arme, Beine statt Strichmännchen) an den Händen, auf einem
 * Oliv-Verlauf mit Bodenschatten. Ersetzt IconBegleitung nur auf der
 * Begleitung-Karte in LEISTUNGEN (app/page.tsx) — die übrigen fünf Karten
 * bleiben beim kleinen Kreis-Badge.
 */
export function IconBegleitungTile({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="begleitung-olive" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b9a3a" />
          <stop offset="55%" stopColor="#6d7925" />
          <stop offset="100%" stopColor="#545e1c" />
        </linearGradient>
        <radialGradient id="begleitung-sheen" cx="28%" cy="20%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="begleitung-figure" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e7e4d6" />
        </linearGradient>
        <radialGradient id="begleitung-ground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#191b0d" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#191b0d" stopOpacity="0" />
        </radialGradient>
        <filter id="begleitung-shadow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="blur" />
          <feOffset in="blur" dx="0" dy="2.5" result="offsetBlur" />
          <feComponentTransfer in="offsetBlur" result="shadow">
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="200" height="200" rx="20" fill="url(#begleitung-olive)" />
      <rect width="200" height="200" rx="20" fill="url(#begleitung-sheen)" />

      <ellipse cx="65" cy="156" rx="30" ry="6" fill="url(#begleitung-ground)" />
      <ellipse cx="133" cy="156" rx="28" ry="6" fill="url(#begleitung-ground)" />

      <g filter="url(#begleitung-shadow)">
        <g
          stroke="var(--olive-ink)"
          strokeOpacity="0.16"
          strokeWidth="1"
          fill="url(#begleitung-figure)"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M60 82 L50 108" strokeWidth="9" />
          <path d="M80 84 L98 98" strokeWidth="8" />
          <path d="M65 108 L54 150" strokeWidth="10" />
          <path d="M75 108 L86 150" strokeWidth="10" />
          <rect x="57" y="70" width="26" height="40" rx="12" />
          <circle cx="70" cy="56" r="14" />

          <path d="M121 86 L102 99" strokeWidth="7" />
          <path d="M141 84 L150 106" strokeWidth="7" />
          <path d="M125 110 L116 150" strokeWidth="9" />
          <path d="M135 110 L146 150" strokeWidth="9" />
          <rect x="119" y="74" width="23" height="37" rx="11" />
          <circle cx="130" cy="62" r="12" />

          <circle cx="100" cy="98.5" r="4.4" />
        </g>

        <g stroke="#fffef9" strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <circle cx="70" cy="56" r="14" transform="translate(-0.9 -0.9)" />
          <circle cx="130" cy="62" r="12" transform="translate(-0.8 -0.8)" />
        </g>
      </g>
    </svg>
  );
}

/** Kochen und Einkauf: Topf mit Deckelgriffen und Dampf. */
export function IconKochen() {
  return (
    <IconBadge>
      <path d="M9 18h22" />
      <path d="M10 18v3a10 8.5 0 0020 0v-3" />
      <path d="M7.5 18h-2M34.5 18h2" />
      <path d="M15 12c0-2 2-2 2-4M20 12c0-2 2-2 2-4M25 12c0-2 2-2 2-4" />
    </IconBadge>
  );
}

/** Post und Papierkram: Briefumschlag. */
export function IconPost() {
  return (
    <IconBadge>
      <rect x="8" y="12" width="24" height="17" rx="1.5" />
      <path d="M8 13.5l12 8.5 12-8.5" />
    </IconBadge>
  );
}

/** Haushalt: Wäschekorb mit Henkel. */
export function IconHaushalt() {
  return (
    <IconBadge>
      <path d="M11 19h18l-2.7 12h-12.6z" />
      <path d="M11.5 19c3-1 15-1 17 0" />
      <path d="M16 19c0-3.2 1.6-5.4 4-5.4s4 2.2 4 5.4" />
    </IconBadge>
  );
}

/** Zeit zu zweit: dampfende Tasse mit Herz — Kaffee, Wärme, Nähe. */
export function IconZeitZuZweit() {
  return (
    <IconBadge>
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
export function IconHandy() {
  return (
    <IconBadge>
      <rect x="9" y="8" width="15" height="21" rx="2" />
      <path d="M14 24.5h5" />
      <rect x="21" y="15" width="10.5" height="17" rx="1.8" />
      <path d="M24.3 28.5h4" />
    </IconBadge>
  );
}
