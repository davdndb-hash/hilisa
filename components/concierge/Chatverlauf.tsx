"use client";

import { useEffect, useRef, useState } from "react";
import { sendMessage, type Message } from "@/lib/concierge-data";
import { browserClient } from "@/lib/supabase/client";

function zeitAnzeige(iso: string) {
  return new Date(iso).toLocaleString("de-DE", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Chat mit der zugewiesenen Begleiterin — speichert echt in Supabase.
 * Was noch fehlt: dass die Begleiterin selbst irgendwo eine Ansicht hat, um
 * zu antworten — das ist ein eigenes, noch nicht gebautes Stück (eine
 * Begleiterinnen-Ansicht), kein Bug hier.
 */
export function Chatverlauf({
  customerId,
  anfangsnachrichten,
}: {
  customerId: string;
  anfangsnachrichten: Message[];
}) {
  const [nachrichten, setNachrichten] = useState(anfangsnachrichten);
  const [text, setText] = useState("");
  const [sendet, setSendet] = useState(false);
  const [fehler, setFehler] = useState("");
  const liste = useRef<HTMLDivElement>(null);
  const ersterLauf = useRef(true);

  // Beim Öffnen die neueste Nachricht zeigen, nicht den Anfang. Die Liste ist
  // eine eigene Scrollfläche (siehe .lisa-chat-liste in globals.css), deshalb
  // reicht scrollTop — unabhängig von Seitenhöhe, Schriftnachladen und der
  // Scroll-Wiederherstellung des Routers.
  useEffect(() => {
    const box = liste.current;
    if (!box) return;
    box.scrollTo({
      top: box.scrollHeight,
      behavior: ersterLauf.current ? "auto" : "smooth",
    });
    ersterLauf.current = false;
  }, [nachrichten.length]);

  async function senden(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length === 0 || sendet) return;
    setSendet(true);
    setFehler("");
    try {
      const supabase = browserClient();
      const neu = await sendMessage(supabase, customerId, text.trim());
      setNachrichten((bisherige) => [...bisherige, neu]);
      setText("");
    } catch {
      setFehler("Senden hat nicht geklappt. Bitte nochmal versuchen.");
    } finally {
      setSendet(false);
    }
  }

  return (
    <>
      {/* Der Hinweis steht über der Unterhaltung, nicht darunter: die
          Schreibzeile klebt am unteren Rand, alles was danach käme, läge
          entweder dahinter oder man müsste daran vorbeiscrollen. */}
      <p className="hint" style={{ marginTop: 0 }}>
        Nachrichten sind gespeichert, aber eure Begleiterin hat noch keine eigene Ansicht,
        um zu antworten.
      </p>

      {/* Eigene Scrollfläche heißt: wer nur die Tastatur benutzt, muss sie
          auch fokussieren können, um darin zu blättern — sonst ist der
          Verlauf nach oben hin nicht erreichbar (axe:
          scrollable-region-focusable). role="log" meldet neu eintreffende
          Nachrichten zusätzlich an Vorleseprogramme. */}
      <div
        className="lisa-chat-liste"
        ref={liste}
        tabIndex={0}
        role="log"
        aria-label="Nachrichtenverlauf"
      >
        {nachrichten.map((m) => (
          <div
            key={m.id}
            className={`lisa-chat-blase ${m.von === "kunde" ? "lisa-chat-kunde" : "lisa-chat-begleiterin"}`}
          >
            {m.text}
            <span className="lisa-chat-blase-zeit">{zeitAnzeige(m.created_at)}</span>
          </div>
        ))}
        {fehler && (
          <p role="alert" className="card card-rose" style={{ margin: 0 }}>
            {fehler}
          </p>
        )}
      </div>

      <form className="lisa-textzeile lisa-textzeile-haftend" onSubmit={senden}>
        <label htmlFor="lisa-chat-text" className="sr-only">
          Nachricht schreiben
        </label>
        <input
          id="lisa-chat-text"
          type="text"
          placeholder="Nachricht schreiben …"
          value={text}
          disabled={sendet}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="lisa-textzeile-senden"
          aria-label="Senden"
          disabled={sendet || text.trim().length === 0}
        >
          <span aria-hidden="true">➤</span>
        </button>
      </form>
    </>
  );
}
