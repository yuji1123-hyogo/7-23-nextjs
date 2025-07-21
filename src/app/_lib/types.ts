// TODO: アプリケーション全体で使用する型定義を作成

import { z } from "zod";
import { TaskFormSchema } from "./schemas";

// TODO: Server Actionの戻り値型を定義
// ヒント: success, message, errors プロパティを持つインターフェース
export interface ActionResults {
  success: boolean;
  message: string;
  errors: Record<string, string>;
}

// TODO: フォームエラーの型を定義
// ヒント: Record<string, string> のような形式
export type FormErrors = Record<string, string>;

// TODO: Task型はここに移動（既存のものを移行）
export interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

export type TaskFormData = z.infer<typeof TaskFormSchema>;
