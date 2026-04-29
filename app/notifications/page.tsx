"use client";

import { useBoard } from "@/components/board-provider";

export default function NotificationsPage() {
  const { state, markNotificationRead } = useBoard();

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Notifications</p>
        <h2>Alerts and updates</h2>
        <p className="hero-copy">
          Keep track of requests, replies, and safety-related updates in one quiet place.
        </p>
      </section>

      <section className="stacked-layout">
        {state.notifications.map((notification) => (
          <article key={notification.id} className="task-card">
            <div className="task-header">
              <div>
                <h4>{notification.title}</h4>
                <div className="status-meta">{notification.createdAt}</div>
              </div>
              <span className={`status-pill ${notification.read ? "completed" : "in-progress"}`}>
                {notification.read ? "read" : "unread"}
              </span>
            </div>
            <p className="hero-copy">{notification.body}</p>
            {!notification.read ? (
              <button className="primary-button" type="button" onClick={() => void markNotificationRead(notification.id)}>
                Mark as Read
              </button>
            ) : null}
          </article>
        ))}
      </section>
    </>
  );
}
