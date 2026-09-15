import Link from "next/link";

/**
 * Die beiden Einstiege unter der Begrüßung — nicht Teil der Schiebemenü-
 * Navigation, sondern Vorschläge auf der Bühne selbst. Deckt sich mit dem
 * Referenzmuster (get.lana.help): "Find" und "Create" stehen dort auch nur
 * hier, nicht im Menü.
 */
export function Vorschlagschips() {
  return (
    <div className="lisa-chips">
      <Link href="/lisa/begleiterin" className="lisa-chip">
        <span className="lisa-chip-titel">Begleiterin finden</span>
        <span className="lisa-chip-hilfe">z. B. nächster Termin</span>
      </Link>
      <Link href="/lisa/neu" className="lisa-chip">
        <span className="lisa-chip-titel">Neue Anfrage</span>
        <span className="lisa-chip-hilfe">z. B. Dienstag, Arzttermin, 10 Uhr</span>
      </Link>
    </div>
  );
}
