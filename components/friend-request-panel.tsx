"use client";

import { useBoard } from "@/components/board-provider";

export function FriendRequestPanel() {
  const { state, respondToFriendRequest } = useBoard();

  return (
    <section className="preview-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Requests</p>
          <h3>Incoming requests</h3>
        </div>
      </div>

      <div className="cards-column">
        {state.friendRequests.map((request) => (
          <article key={request.id} className="task-card">
            <div className="task-header">
              <div>
                <div className="team-label">{request.course}</div>
                <h4>{request.from}</h4>
              </div>
              <span className={`status-pill ${request.status === "pending" ? "in-progress" : "completed"}`}>
                {request.status}
              </span>
            </div>

            <div className="button-row">
              <button
                className="secondary-button"
                type="button"
                onClick={() => void respondToFriendRequest(request.id, "accepted")}
              >
                Accept
              </button>
              <button
                className="ghost-button"
                type="button"
                onClick={() => void respondToFriendRequest(request.id, "rejected")}
              >
                Reject
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
