"use client";

import { useState, useRef, useEffect } from "react";
import { useBoard } from "@/components/board-provider";

export function MessagingPanel() {
  const { state, sendMessage, blockUser, reportUser } = useBoard();
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [state.messages]);

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
    <section className="chat-container">
      <div className="chat-header">
        <div>
          <p className="eyebrow">Chat</p>
          <h3>Local messaging thread</h3>
        </div>
      </div>

      <div className="message-thread-scrollable" ref={threadRef}>
        {state.messages.length === 0 && (
          <div className="empty-state">No messages yet. Say hello!</div>
        )}
        {state.messages.map((message) => {
          const isOwn = state.currentUser?.name === message.sender;
          return (
            <div key={message.id} className={`chat-bubble-wrapper ${isOwn ? 'own' : 'other'}`}>
              {!isOwn && (
                <div className="chat-avatar">
                  {message.sender.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="chat-bubble-content">
                <div className="chat-meta">
                  <span className="chat-sender">{isOwn ? "You" : message.sender}</span>
                  <span className="chat-time">{message.time}</span>
                </div>
                <div className="chat-bubble">
                  <p>{message.text}</p>
                </div>
                {!isOwn && (
                  <div className="chat-actions">
                    <button className="chat-action-btn" onClick={() => handleBlock(message.sender)}>Block</button>
                    <button className="chat-action-btn danger" onClick={() => handleReport(message.sender)}>Report</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <form
        className="chat-input-area"
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
        <div className="chat-input-wrapper">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button className="primary-button chat-send-btn" type="submit" disabled={!draft.trim()}>
            Send
          </button>
        </div>
        {error && <div className="error-text" style={{ marginTop: '8px' }}>{error}</div>}
      </form>
    </section>
  );
}
