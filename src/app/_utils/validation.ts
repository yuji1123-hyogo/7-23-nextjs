import { z } from "zod";

// Zodエラーをフォームエラー形式に変換
export function zodErrorToFormErrors(
  error: z.ZodError
): Record<string, string> {
  const formErrors: Record<string, string> = {};

  error.issues.forEach((err) => {
    const fieldPath = err.path.join(".");
    // 最初のエラーメッセージのみを保持（複数エラーの場合）
    if (!formErrors[fieldPath]) {
      formErrors[fieldPath] = err.message;
    }
  });

  return formErrors;
}

// 個別フィールドバリデーション
export function validateField(
  schema: z.ZodSchema,
  value: string
): string | null {
  const result = schema.safeParse(value);

  if (result.success) {
    return null;
  }

  // 最初のエラーメッセージを返す
  return result.error.issues[0]?.message || "入力内容を確認してください";
}

// FormDataからオブジェクトへの変換
export function formDataToObject(formData: FormData): Record<string, string> {
  const obj: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    // ファイル以外の値を文字列として取得
    if (typeof value === "string") {
      obj[key] = value;
    }
  }

  return obj;
}

// 複数エラーのマージ
export function mergeErrors(
  ...errorObjects: Record<string, string>[]
): Record<string, string> {
  return errorObjects.reduce((merged, current) => {
    return { ...merged, ...current };
  }, {});
}
