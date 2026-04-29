import { MessagingPanel } from "@/components/messaging-panel";

export default function MessagingPage() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Messaging</p>
        <h2>Private Conversations</h2>
        <p className="hero-copy">
          Chat happens here in a focused, uncluttered space designed for one-on-one conversations.
        </p>
      </section>
      <MessagingPanel />
    </>
  );
}
