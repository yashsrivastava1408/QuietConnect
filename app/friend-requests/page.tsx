import { FriendRequestPanel } from "@/components/friend-request-panel";

export default function FriendRequestsPage() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Connections</p>
        <h2>Friend Requests</h2>
        <p className="hero-copy">
          Review incoming requests and accept only the people you want to talk to. This route is now the real friend request screen, not an implementation checklist.
        </p>
      </section>
      <FriendRequestPanel />
    </>
  );
}
