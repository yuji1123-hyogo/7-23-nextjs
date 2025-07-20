// TODO: Server Componentとして実装（'use client'不要）
// ヒント: tasksをpropsとして受け取る
// ヒント: tasks.map()でタスクを一覧表示
// ヒント: 適切なTypeScript型定義を設定

import { Task } from "@/app/_lib/types";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">まだタスクがありません</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">{task.title}</h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : task.priority === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {task.priority === "high"
                  ? "高"
                  : task.priority === "medium"
                  ? "中"
                  : "低"}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              作成日: {task.createdAt.toLocaleDateString("ja-JP")}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
