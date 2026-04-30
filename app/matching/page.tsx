"use client";

import { useState } from "react";
import { useBoard } from "@/components/board-provider";

export default function MatchingPage() {
  const { state, saveMatch, sendConnectionRequest } = useBoard();
  const [activeProfile, setActiveProfile] = useState("Aditi");
  const [feedback, setFeedback] = useState("");
  const suggestions = [
    {
      name: "Aditi",
      course: "B.A. Literature",
      summary: "Reads fiction, prefers voice notes over crowded calls, likes slow conversations.",
      interests: ["fiction", "voice notes", "slow chats", "bookstores"]
    },
    {
      name: "Rahul",
      course: "B.Tech CSE",
      summary: "Into indie games, thoughtful texting, and small trusted circles.",
      interests: ["indie games", "night walks", "deep talks", "psychology"]
    },
    {
      name: "Sana",
      course: "B.Des",
      summary: "Enjoys sketching, journaling, and one deep chat over ten shallow ones.",
      interests: ["sketching", "journaling", "ambient music", "quiet cafes"]
    }
  ];
  const selected = suggestions.find((person) => person.name === activeProfile) ?? suggestions[0];

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Matching</p>
        <h2>Interest-based matching</h2>
        <p className="hero-copy">
          Discover people based on shared interests and communication style instead of loud popularity signals.
        </p>
      </section>

      <section className="matching-layout">
        <div className="cards-column">
        {suggestions.map((person) => (
          <article key={person.name} className="match-card">
            <div className="match-topline">
              <span className="match-badge">Compatible</span>
              <span className="status-meta">{person.course}</span>
            </div>
            <div className="member-row">
              <div className="avatar">{person.name.charAt(0)}</div>
              <div>
                <strong>{person.name}</strong>
                <div className="status-meta">{person.interests.slice(0, 2).join(" • ")}</div>
              </div>
            </div>
            <p className="hero-copy">{person.summary}</p>
            <div className="interest-chips">
              {person.interests.map((interest) => (
                <span key={interest} className="interest-chip">
                  {interest}
                </span>
              ))}
            </div>
            <div className="button-row">
              <button
                className="primary-button"
                type="button"
                onClick={async () => {
                  const result = await sendConnectionRequest({ from: person.name, course: person.course });
                  setFeedback(result.error ?? `Connection request sent to ${person.name}.`);
                }}
              >
                Connect on Campus
              </button>
              <button
                className="ghost-button"
                type="button"
                onClick={async () => {
                  const result = await saveMatch({
                    name: person.name,
                    course: person.course,
                    summary: person.summary,
                    interests: person.interests
                  });
                  if (result.error) {
                    setFeedback(result.error);
                    return;
                  }
                  setActiveProfile(person.name);
                  setFeedback(`${person.name} saved for later.`);
                }}
              >
                Save For Later
              </button>
              <button className="ghost-button" type="button" onClick={() => setActiveProfile(person.name)}>
                View Details
              </button>
            </div>
          </article>
        ))}
        </div>

        <aside className="matching-sidebar">
          <div className="profile-spotlight">
            <div className="profile-spotlight-header">
              <div className="avatar avatar-large">{selected.name.charAt(0)}</div>
              <div>
                <p className="eyebrow">Selected Match</p>
                <h3>{selected.name}</h3>
                <p className="status-meta">{selected.course}</p>
              </div>
            </div>
            <p className="hero-copy">{selected.summary}</p>
            <div className="interest-chips">
              {selected.interests.map((interest) => (
                <span key={interest} className="interest-chip">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="form-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Saved</p>
                <h3>Saved for later</h3>
              </div>
            </div>
            <div className="stacked-layout">
              {state.savedMatches.length > 0 ? (
                state.savedMatches.map((match) => (
                  <article key={match.id} className="bucket-summary">
                    <strong>{match.name}</strong>
                    <div className="status-meta">{match.course}</div>
                    <p className="hero-copy">{match.summary}</p>
                  </article>
                ))
              ) : (
                <div className="empty-state">No saved matches yet.</div>
              )}
            </div>
          </div>
        </aside>
      </section>

      {feedback ? <div className="success-banner">{feedback}</div> : null}
    </>
  );
}
