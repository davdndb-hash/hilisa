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
