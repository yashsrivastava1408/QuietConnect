"use client";

import { useState } from "react";
import { useBoard } from "@/components/board-provider";

export default function DashboardPage() {
  const { state, sendConnectionRequest } = useBoard();
  const matches = [
    {
      name: "Ananya",
      vibe: "Loves quiet cafes and long-form chats",
      interests: "books, design, lo-fi",
      course: "B.Des Communication",
      about: "Feels most comfortable starting with text and moving slowly toward trust."
    },
    {
      name: "Kabir",
      vibe: "Prefers meaningful conversations over group noise",
      interests: "gaming, psychology",
      course: "B.Tech CSE",
      about: "Usually replies thoughtfully, likes reflective prompts, and avoids noisy group spaces."
    },
    {
      name: "Meera",
      vibe: "Late-night texter who likes reflective prompts",
      interests: "music, sketching",
      course: "B.A. English",
      about: "Enjoys quiet creative routines and conversations that feel safe rather than performative."
    }
  ];
  const [selectedMatch, setSelectedMatch] = useState(matches[0]);
  const [requestMessage, setRequestMessage] = useState("");

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Dashboard</p>
        <h2>Your calm social dashboard</h2>
        <p className="hero-copy">
          This is the product home now, not a task board. It highlights your session, pending requests, unread alerts, and suggested low-pressure connections.
        </p>
      </section>

      <section className="status-grid">
        <article className="status-tile">
          <div className="eyebrow">Requests</div>
          <div className="status-number">{state.friendRequests.filter((item) => item.status === "pending").length}</div>
          <h3>Pending requests</h3>
          <div className="status-meta">Review who wants to connect without any rush.</div>
        </article>
        <article className="status-tile">
          <div className="eyebrow">Messages</div>
          <div className="status-number">{state.messages.length}</div>
          <h3>Conversation moments</h3>
          <div className="status-meta">A quieter thread-based chat experience.</div>
        </article>
        <article className="status-tile">
          <div className="eyebrow">Alerts</div>
          <div className="status-number">{state.notifications.filter((item) => !item.read).length}</div>
          <h3>Unread notifications</h3>
          <div className="status-meta">Friend request and message alerts live here.</div>
        </article>
      </section>

      <section className="preview-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Suggested Matches</p>
            <h3>People you may feel comfortable with</h3>
          </div>
        </div>
        <div className="cards-column">
          {matches.map((match) => (
            <article key={match.name} className="match-card">
              <div className="match-topline">
                <span className="match-badge">Suggested</span>
                <span className="status-meta">{match.course}</span>
              </div>
              <div className="member-row">
                <div className="avatar">{match.name.charAt(0)}</div>
                <div>
                  <strong>{match.name}</strong>
                  <div className="status-meta">{match.vibe}</div>
                </div>
              </div>
              <p className="hero-copy">{match.interests}</p>
              <div className="button-row">
                <button
                  className="primary-button"
                  type="button"
                  onClick={async () => {
                    const result = await sendConnectionRequest({
                      from: match.name,
                      course: match.course
                    });
                    setRequestMessage(result.error ?? `Request sent to ${match.name}.`);
                  }}
                >
                  Send Request
                </button>
                <button className="ghost-button" type="button" onClick={() => setSelectedMatch(match)}>
                  View Profile
                </button>
              </div>
            </article>
          ))}
        </div>
        {requestMessage ? <div className="success-banner">{requestMessage}</div> : null}
      </section>

      <section className="profile-highlight">
        <div className="profile-spotlight">
          <div className="profile-spotlight-header">
            <div className="avatar avatar-large">{selectedMatch.name.charAt(0)}</div>
            <div>
              <p className="eyebrow">Selected Profile</p>
              <h3>{selectedMatch.name}</h3>
              <p className="status-meta">{selectedMatch.course}</p>
            </div>
          </div>
          <p className="hero-copy">{selectedMatch.about}</p>
          <div className="interest-chips">
            {selectedMatch.interests.split(",").map((item) => (
              <span key={item.trim()} className="interest-chip">
                {item.trim()}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="preview-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Conversation Starters</p>
            <h3>Gentle prompts</h3>
          </div>
        </div>
        <div className="cards-column">
          {[
            "What kind of environment helps you feel relaxed quickly?",
            "What is one hobby you enjoy quietly on your own?",
            "What kind of conversation makes you feel understood?"
          ].map((prompt) => (
            <article key={prompt} className="bucket-summary">
              <p className="hero-copy">{prompt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
