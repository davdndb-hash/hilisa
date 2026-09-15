import Link from "next/link";

/**
 * Rückweg von den Unterseiten (Begleiterin, Neue Anfrage, Chats, Profil) zur
 * Bühne. Die Bühne selbst braucht das nicht — nur ihre Unterseiten.
 */
export function ZurueckLink() {
  return (
    <Link href="/lisa" className="lisa-zurueck">
      <span aria-hidden="true">←</span> Zurück zu Lisa
    </Link>
  );
}
