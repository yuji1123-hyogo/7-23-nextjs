"use server";

import { revalidatePath } from "next/cache";
import { ActionResults, FormErrors, Task } from "../_lib/types";

// 一時的なデータストレージ（初期データ付き）
const tasks: Task[] = [
  {
    id: "1",
    title: "NextJS 15を学習する",
    priority: "high",
    createdAt: new Date("2024-07-15"),
  },
  {
    id: "2",
    title: "Server Actionsを理解する",
    priority: "medium",
    createdAt: new Date("2024-07-16"),
  },
  {
    id: "3",
    title: "TypeScriptの型定義を練習する",
    priority: "low",
    createdAt: new Date("2024-07-17"),
  },
];

// タスク一覧取得
export async function getTasks(): Promise<Task[]> {
  // 実際のプロジェクトではデータベースアクセス
  return tasks.slice(); // 配列のコピーを返す
}

// タスク作成（Server Action）
export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const priority = formData.get("priority") as "low" | "medium" | "high";

  // 基本的なバリデーション
  if (!title || title.trim().length === 0) {
    return { error: "タイトルは必須です" };
  }

  // 新しいタスクを作成
  const newTask: Task = {
    id: Date.now().toString(), // 簡易的なID生成
    title: title.trim(),
    priority: priority || "medium",
    createdAt: new Date(),
  };

  // タスクを配列に追加
  tasks.unshift(newTask); // 新しいタスクを先頭に追加

  // ページの再検証（重要！）
  revalidatePath("/tasks");

  return { success: true };
}

// TODO: types.ts から型定義をimport

// TODO: useActionState用の新しいServer Action関数を作成
// ヒント: export async function createTaskWithState(prevState: any, formData: FormData)
// ヒント: 第1引数として前の状態を受け取る必要がある
// ヒント: バリデーションエラーの詳細な処理を追加
// ヒント: 統一的な戻り値形式（ActionResult型）を返す
export default async function createTaskWithState(
  prevState: ActionResults,
  formData: FormData
): Promise<ActionResults> {
  const title = formData.get("title") as string;
  const priority = formData.get("priority") as "low" | "medium" | "high";

  const errors: FormErrors = {};
  if (!title || title.trim().length === 0) {
    errors.title = "タイトルは必須です";
  } else if (title.trim().length > 100) {
    errors.title = "タイトルは100文字以内で入力してください";
  }
  if (!["low", "medium", "high"].includes(priority)) {
    errors.priority = "有効な優先度を選択してください";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "入力内容に問題があります",
      errors,
    };
  }

  try {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      priority: priority || "medium",
      createdAt: new Date(),
    };

    tasks.unshift(newTask);

    revalidatePath("/tasks");

    return {
      success: true,
      message: `タスク${newTask.title}を作成しました`,
      errors: {},
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "タスクの作成に失敗しました",
      errors: {},
    };
  }
}
