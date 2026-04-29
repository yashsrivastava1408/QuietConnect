"use client";

import { useState } from "react";
import { useBoard } from "@/components/board-provider";

export function MessagingPanel() {
  const { state, sendMessage, blockUser, reportUser } = useBoard();
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  const handleBlock = async (sender: string) => {
    if (confirm(`Are you sure you want to block ${sender}? You will no longer see their messages.`)) {
      await blockUser(sender);
    }
  };

  const handleReport = async (sender: string) => {
    const reason = prompt(`Reason for reporting ${sender}:`);
    if (reason) {
      await reportUser(sender, reason);
      alert("Report submitted to admin queue.");
    }
  };

  return (
    <section className="form-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Chat</p>
          <h3>Local messaging thread</h3>
        </div>
      </div>

      <div className="message-thread">
        {state.messages.map((message) => {
          const isOwn = state.currentUser?.name === message.sender;
          return (
            <article key={message.id} className="message-card">
              <div className="message-meta">
                <strong>{message.sender}</strong>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span>{message.time}</span>
                  {!isOwn && (
                    <>
                      <button className="ghost-button" style={{ padding: "4px 8px", fontSize: "0.7rem" }} onClick={() => handleBlock(message.sender)}>
                        Block
                      </button>
                      <button className="ghost-button" style={{ padding: "4px 8px", fontSize: "0.7rem", color: "var(--accent-danger)" }} onClick={() => handleReport(message.sender)}>
                        Report
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p>{message.text}</p>
            </article>
          );
        })}
      </div>

      <form
        className="task-form"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          const result = await sendMessage(draft);
          if (result && result.error) {
            setError(result.error);
          } else {
            setDraft("");
          }
        }}
      >
        <textarea
          rows={3}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message"
        />
        {error && <div className="error-text">{error}</div>}
        <button className="primary-button" type="submit">
          Send Message
        </button>
      </form>
    </section>
  );
}
