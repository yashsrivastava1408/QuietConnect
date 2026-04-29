"use client";

import { useEffect, useState } from "react";
import { useBoard } from "@/components/board-provider";

export default function ProfilePage() {
  const { state, updateProfile } = useBoard();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [interests, setInterests] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.currentUser) {
      setName(state.currentUser.name);
    }
  }, [state.currentUser]);

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
            const result = await updateProfile({ name, bio, avatarUrl, interests });
            setError(result.error ?? "");
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
          {error ? <div className="error-text">{error}</div> : null}
          <button className="primary-button" type="submit">
            Save Profile
          </button>
        </form>
      </section>
    </>
  );
}
