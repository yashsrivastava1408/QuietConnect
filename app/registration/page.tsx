 "use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useBoard } from "@/components/board-provider";

export default function RegistrationPage() {
  const router = useRouter();
  const { register } = useBoard();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState("");

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Join</p>
        <h2>Create your account</h2>
        <p className="hero-copy">
          Registration is focused on safe, real identities with SRMIST email validation and a lightweight onboarding flow.
        </p>
      </section>

      <section className="form-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Registration</p>
            <h3>Get started</h3>
          </div>
        </div>
        <form
          className="task-form"
          onSubmit={async (event) => {
            event.preventDefault();
            const result = await register({ name, email, password });
            if (result.error) {
              setError(result.error);
              return;
            }
            router.push("/login");
          }}
        >
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" />
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="SRMIST email" />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
          />
          {error ? <div className="error-text">{error}</div> : null}
          <button className="primary-button" type="submit">
            Create Account
          </button>
        </form>
      </section>
    </>
  );
}
