"use client";

import { useState } from "react";
import { termenStornieren, type Appointment } from "@/lib/concierge-data";
import { browserClient } from "@/lib/supabase/client";
import { STATUS_TEXT, dauerText, stornierbar, terminLang } from "@/lib/termine";

/**
 * Alle Termine der Familie mit ihrem Stand, und der Weg, einen abzusagen.
 *
 * Vorher war ein abgeschickter Termin eine Sackgasse: er wurde gespeichert,
 * und danach gab es für die Kundin keinerlei Auskunft mehr darüber, ob
 * irgendetwas damit passiert, und keine Möglichkeit, ihn wieder loszuwerden.
 *
 * Das Absagen läuft über eine Datenbankfunktion, nicht über ein UPDATE —
 * siehe termenStornieren() in lib/concierge-data.ts.
 */
export function Terminliste({ anfangsTermine }: { anfangsTermine: Appointment[] }) {
  const [termine, setTermine] = useState(anfangsTermine);
  const [laeuft, setLaeuft] = useState<string | null>(null);
  const [fragt, setFragt] = useState<string | null>(null);
  const [fehler, setFehler] = useState("");

  async function absagen(id: string) {
    setLaeuft(id);
    setFehler("");
    try {
      const aktualisiert = await termenStornieren(browserClient(), id);
      setTermine((bisher) => bisher.map((t) => (t.id === id ? aktualisiert : t)));
      setFragt(null);
    } catch {
      setFehler("Das Absagen hat nicht geklappt. Bitte nochmal versuchen.");
    } finally {
      setLaeuft(null);
    }
  }

  if (termine.length === 0) {
    return (
      <p style={{ color: "var(--ink-55)" }}>
        Noch keine Termine. Über „Neue Anfrage“ kommt der erste dazu.
      </p>
    );
  }

  return (
    <>
      {fehler && (
        <p role="alert" className="card card-rose" style={{ fontWeight: 500 }}>
          {fehler}
        </p>
      )}

      <ul className="lisa-terminliste">
        {termine.map((t) => {
          const status = STATUS_TEXT[t.status];
          const vergangen = t.status === "storniert" || t.status === "erledigt";
          return (
            <li key={t.id} className="card lisa-termin" data-vergangen={vergangen || undefined}>
              <div className="lisa-termin-kopf">
                <h3 style={{ margin: 0, fontSize: 19 }}>{t.anlass}</h3>
                <span className="lisa-status" data-ton={status.ton}>
                  {status.kurz}
                </span>
              </div>

              <p style={{ margin: "var(--s2) 0 0", fontSize: 18 }}>
                {/* Altzeilen von vor der Umstellung auf einen echten Zeitpunkt
                    haben nur den früheren Freitext („Mittwoch", „11:15"). */}
                {t.starts_at ? terminLang(t.starts_at) : `${t.datum}, ${t.uhrzeit} Uhr`}
                {" · "}
                {dauerText(t.dauer_minuten)}
              </p>

              {t.notiz ? (
                <p style={{ margin: "var(--s2) 0 0", fontSize: 16, color: "var(--ink-70)" }}>
                  {t.notiz}
                </p>
              ) : null}

              <p style={{ margin: "var(--s2) 0 0", fontSize: 16, color: "var(--ink-70)" }}>
                {status.lang}
              </p>

              {stornierbar(t.status) ? (
                fragt === t.id ? (
                  // Zwischenschritt statt Sofort-Absage: ein Fehlgriff auf dem
                  // Telefon soll keinen Termin löschen.
                  <div className="lisa-termin-fuss" role="group" aria-label="Termin wirklich absagen?">
                    <span style={{ fontSize: 16 }}>Wirklich absagen?</span>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={laeuft === t.id}
                      onClick={() => absagen(t.id)}
                    >
                      {laeuft === t.id ? "Einen Moment …" : "Ja, absagen"}
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setFragt(null)}>
                      Behalten
                    </button>
                  </div>
                ) : (
                  <div className="lisa-termin-fuss">
                    <button type="button" className="btn btn-outline" onClick={() => setFragt(t.id)}>
                      Termin absagen
                    </button>
                  </div>
                )
              ) : null}
            </li>
          );
        })}
      </ul>
    </>
  );
}
