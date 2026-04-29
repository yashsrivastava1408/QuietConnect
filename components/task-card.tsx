"use client";

import { useBoard } from "@/components/board-provider";
import type { Task } from "@/lib/types";

function priorityClass(priority: string) {
  const value = priority.toLowerCase();
  if (value.startsWith("must")) return "must";
  if (value.startsWith("should")) return "should";
  return "week";
}

export function TaskCard({ task }: { task: Task }) {
  const { toggleTaskCompletion, toggleSubtask } = useBoard();
  const doneCount = task.subtasks.filter((subtask) => subtask.done).length;

  return (
    <article className="task-card">
      <div className="task-header">
        <div>
          <div className="tag-row">
            <span className={`tag ${priorityClass(task.priority)}`}>{task.priority}</span>
            <span className="tag week">{task.sprint}</span>
          </div>
          <div className="team-label">{task.team}</div>
        </div>
        <button className="ghost-button" type="button" onClick={() => toggleTaskCompletion(task.id)}>
          {task.status === "completed" ? "Reopen" : "Complete"}
        </button>
      </div>

      <div className={`task-title ${task.status === "completed" ? "done" : ""}`}>
        <button
          className={`status-toggle ${task.status === "completed" ? "done" : "open"}`}
          type="button"
          onClick={() => toggleTaskCompletion(task.id)}
          aria-label="Toggle task status"
        >
          {task.status === "completed" ? "✓" : ""}
        </button>
        <h4>{task.title}</h4>
      </div>

      <div className="subtasks">
        {task.subtasks.map((subtask, index) => (
          <button
            key={`${task.id}-${index}`}
            className={`subtask ${subtask.done ? "done" : ""}`}
            type="button"
            onClick={() => toggleSubtask(task.id, index)}
          >
            <span className="circle" />
            <span>{subtask.text}</span>
          </button>
        ))}
      </div>

      <div className="task-footer">
        <div className="task-stats">
          {task.warnings ? <span className="warning">!</span> : null}
          <span>
            ◷ {doneCount} / {task.subtasks.length}
          </span>
        </div>
        <span className={`status-pill ${task.status}`}>{task.status}</span>
      </div>

      <div className="member-row">
        <div className="avatar">{task.owner.charAt(0).toUpperCase()}</div>
        <div>
          <strong>{task.status === "completed" ? "Completed" : "Owned"}</strong> by {task.owner} on{" "}
          {task.completedOn}
        </div>
      </div>
    </article>
  );
}
