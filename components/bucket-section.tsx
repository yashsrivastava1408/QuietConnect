"use client";

import { useBoard } from "@/components/board-provider";
import { TaskCard } from "@/components/task-card";
import type { Task } from "@/lib/types";

export function BucketSection({
  bucket,
  tasks,
  mode
}: {
  bucket: string;
  tasks: Task[];
  mode: "completed" | "active" | "all";
}) {
  const { state, toggleBucket } = useBoard();
  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const visibleTasks = tasks.filter((task) => {
    if (mode === "completed") return task.status === "completed";
    if (mode === "active") return task.status !== "completed";
    return true;
  });

  return (
    <section className="bucket-section">
      <div className="bucket-header">
        <div>
          <p className="bucket-label">{bucket}</p>
          <div className="bucket-meta">
            Completed tasks <strong>{completedCount}</strong>
          </div>
        </div>
        <button className="collapse-button" type="button" onClick={() => toggleBucket(bucket)}>
          {state.collapsedBuckets[bucket] ? "Expand" : "Collapse"}
        </button>
      </div>

      {!state.collapsedBuckets[bucket] ? (
        <div className="bucket-content">
          {visibleTasks.length > 0 ? (
            visibleTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="empty-state">
              {mode === "completed"
                ? "No completed tasks in this bucket."
                : "No active tasks in this bucket."}
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
