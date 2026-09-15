"use client";

import { useState } from "react";
import type { Message } from "@/lib/concierge-data";

/**
 * Chat mit der zugewiesenen Begleiterin. Der Versand ist echt genug zum
 * Ausprobieren, aber lokal: eine neue Nachricht hängt sich nur an diese
 * Liste an, sie geht nirgendwo hin (kein Backend, siehe
 * components/Rueckruf.tsx für denselben ehrlichen Ton). Anders als bei der
 * Sprachbühne ist das kein reiner Stub — Text ist Text, kein Mikrofon nötig.
 */
export function Chatverlauf({ anfangsnachrichten }: { anfangsnachrichten: Message[] }) {
  const [nachrichten, setNachrichten] = useState(anfangsnachrichten);
  const [text, setText] = useState("");

  function senden(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length === 0) return;
    setNachrichten((bisherige) => [
      ...bisherige,
      {
        id: `lokal-${Date.now()}`,
        von: "kunde",
        text: text.trim(),
        zeitpunkt: "gerade eben",
      },
    ]);
    setText("");
  }

  return (
    <>
      <div className="lisa-chat-liste">
        {nachrichten.map((m) => (
          <div
            key={m.id}
            className={`lisa-chat-blase ${m.von === "kunde" ? "lisa-chat-kunde" : "lisa-chat-begleiterin"}`}
          >
            {m.text}
            <span className="lisa-chat-blase-zeit">{m.zeitpunkt}</span>
          </div>
        ))}
      </div>

      <form className="lisa-textzeile" onSubmit={senden}>
        <label htmlFor="lisa-chat-text" className="sr-only">
          Nachricht schreiben
        </label>
        <input
          id="lisa-chat-text"
          type="text"
          placeholder="Nachricht schreiben …"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="lisa-textzeile-senden"
          aria-label="Senden"
          disabled={text.trim().length === 0}
        >
          <span aria-hidden="true">➤</span>
        </button>
      </form>
      <p className="hint" style={{ marginTop: "var(--s3)" }}>
        Entwurfsseite — Nachrichten gehen noch nirgendwo hin, sie bleiben nur hier auf
        diesem Bildschirm.
      </p>
    </>
  );
}
