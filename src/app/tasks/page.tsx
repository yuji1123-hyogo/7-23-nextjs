import { getTasks } from "@/app/_actions/tasks";
import TaskForm from "./_components/TaskForm";
import TaskList from "./_components/TaskList";
import NotificationTest from "../_components/NotificationTest";

export default async function TasksPage() {
  const tasks = await getTasks();
  // TODO: NotificationTestコンポーネントをimport
  // ヒント: import NotificationTest from '../_components/NotificationTest';

  // TODO: 既存のJSX内にNotificationTestを追加
  // ヒント: TaskFormとTaskListの間または下部に配置

  // 追加場所の例:
  // <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  //   既存のTaskForm部分...
  //   既存のTaskList部分...
  //
  //   {/* 新しく追加 */}
  //   <div className="lg:col-span-2">
  //     <NotificationTest />
  //   </div>
  // </div>
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          タスク管理アプリ
        </h1>
        <p className="text-gray-600">
          NextJS 15 App Router + useActionState を使用
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            新しいタスクを追加
          </h2>
          <TaskForm />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            タスク一覧
          </h2>
          <TaskList tasks={tasks} />
        </div>

        <div className="lg:col-span-2">
          <NotificationTest />
        </div>
      </div>
    </div>
  );
}
