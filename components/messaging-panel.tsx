"use client";

import { useState } from "react";
import { useBoard } from "@/components/board-provider";

export function MessagingPanel() {
  const { state, sendMessage } = useBoard();
  const [draft, setDraft] = useState("");

  return (
    <section className="form-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Chat</p>
          <h3>Local messaging thread</h3>
        </div>
      </div>

      <div className="message-thread">
        {state.messages.map((message) => (
          <article key={message.id} className="message-card">
            <div className="message-meta">
              <strong>{message.sender}</strong>
              <span>{message.time}</span>
            </div>
            <p>{message.text}</p>
          </article>
        ))}
      </div>

      <form
        className="task-form"
        onSubmit={async (event) => {
          event.preventDefault();
          await sendMessage(draft);
          setDraft("");
        }}
      >
        <textarea
          rows={3}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message"
        />
        <button className="primary-button" type="submit">
          Send Message
        </button>
      </form>
    </section>
  );
}
