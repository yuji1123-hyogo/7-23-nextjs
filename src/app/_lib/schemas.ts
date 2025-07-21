// TODO: Zodをインポート

import { z } from "zod";

// TODO: タスクの基本スキーマを定義
// ヒント: z.object() を使用してオブジェクトスキーマを作成
// ヒント: id, title, priority, createdAt の各フィールドを定義
// ヒント: title は必須で、1文字以上100文字以内
// ヒント: priority は 'low' | 'medium' | 'high' の enum
// ヒント: 日本語のエラーメッセージを設定

export const titleSchema = z
  .string({
    required_error: "タイトルを入力してください",
  })
  .min(1, "タイトルは必須です")
  .max(100, "タイトルは100文字以内で入力してください")
  .refine(
    (title) => !title.includes("テスト") || title.length >= 10,
    "テストを含むタイトルは10文字以上で入力してください"
  );

export const prioritySchema = z.enum(["low", "medium", "high"], {
  errorMap: () => ({ message: "優先度を選択してください" }),
});

export const TaskSchema = z.object({
  id: z.string(),
  title: titleSchema,
  priority: prioritySchema,
  createdAt: z.date({
    required_error: "作成日は必須です",
    invalid_type_error: "正しい日付形式ではありません",
  }),
});

// TODO: フォーム入力用のスキーマを定義
// ヒント: TaskSchemaから必要なフィールドのみを抽出
// ヒント: .pick() または .omit() メソッドを使用
// ヒント: id と createdAt はフォーム入力では不要
export const TaskFormSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
}).refine(
  (data) => {
    if (data.priority === "high" && data.title.length < 20) {
      return false;
    }
    return true;
  },
  {
    message: "高優先度タスクはタイトルを20文字以上で入力してください",
    path: ["title"],
  }
);

export const TaskFieldSchemas = z.object({
  title: titleSchema,
  priority: prioritySchema,
});

// TODO: エラーメッセージのカスタマイズ
// ヒント: errorMap を使用して統一的なエラーメッセージを設定
