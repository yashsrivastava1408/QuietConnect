"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useBoard } from "@/components/board-provider";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, state } = useBoard();
  const [name, setName] = useState(state.currentUser?.name ?? "");
  const [email, setEmail] = useState(state.currentUser?.email ?? "");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState("");

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Welcome Back</p>
        <h2>Login Page</h2>
        <p className="hero-copy">
          Sign in to access your calm social space, pending requests, chat history, and profile preferences.
        </p>
      </section>

      <section className="form-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Session</p>
            <h3>Sign in to continue</h3>
          </div>
        </div>

        <form
          className="task-form"
          onSubmit={async (event) => {
            event.preventDefault();
            const result = await signIn({ email: email.trim(), password });
            if (result.error) {
              setError(result.error);
              return;
            }
            router.push("/dashboard");
          }}
        >
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Display name" />
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="SRMIST email"
            type="email"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
          />
          {error ? <div className="error-text">{error}</div> : null}
          <button className="primary-button" type="submit">
            Continue to Dashboard
          </button>
        </form>
      </section>
    </>
  );
}
