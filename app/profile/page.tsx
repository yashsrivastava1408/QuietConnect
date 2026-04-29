"use client";

import { useEffect, useState } from "react";
import { useBoard } from "@/components/board-provider";

export default function ProfilePage() {
  const { state, updateProfile } = useBoard();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [interests, setInterests] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.currentUser) {
      setName(state.currentUser.name);
      // Fetch profile data here if needed to set bio/interests, but we use an API normally.
      // Assuming state doesn't have the full profile embedded natively right now without a fetch.
    }
  }, [state.currentUser]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setBio(data.bio || "");
          setAvatarUrl(data.avatarUrl || "");
          setInterests(data.interests || "");
          setNotificationsEnabled(data.notificationsEnabled !== false);
        }
      }
    }
    void load();
  }, []);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Profile</p>
        <h2>Shape how people discover you</h2>
        <p className="hero-copy">
          Keep your profile light, intentional, and honest. You control what people see before they send a request.
        </p>
      </section>
      <section className="form-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Profile Details</p>
            <h3>Edit profile</h3>
          </div>
        </div>
        <form
          className="task-form"
          onSubmit={async (event) => {
            event.preventDefault();
            const result = await updateProfile({ name, bio, avatarUrl, interests, notificationsEnabled });
            setError(result.error ?? "");
            if (!result.error) {
              alert("Profile saved successfully.");
            }
          }}
        >
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" />
          <input
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
            placeholder="Avatar URL"
          />
          <textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={4} placeholder="Short bio" />
          <textarea
            value={interests}
            onChange={(event) => setInterests(event.target.value)}
            rows={4}
            placeholder="Interests"
          />
          
          <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
            <input 
              type="checkbox" 
              id="notifs" 
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              style={{ width: "20px", height: "20px" }}
            />
            <label htmlFor="notifs" style={{ color: "var(--text-main)", fontWeight: 500 }}>
              Enable Notifications
            </label>
          </div>

          {error ? <div className="error-text">{error}</div> : null}
          <button className="primary-button" type="submit">
            Save Profile
          </button>
        </form>
      </section>
    </>
  );
}
