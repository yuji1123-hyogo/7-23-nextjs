"use client";

// TODO: useActionState をimport
// TODO: 新しい型定義とServer Actionをimport
// TODO: LoadingSpinner と ActionFeedback をimport

// TODO: useActionStateフックを使用
// ヒント: const [state, dispatch, pending] = useActionState(...)
// ヒント: 初期状態として適切なオブジェクトを設定

// TODO: フォーム送信後のリセット処理を追加
// ヒント: useEffectでstate.successを監視
// ヒント: フォームのreset()メソッドを使用

// TODO: エラー状態の表示ロジックを追加
// ヒント: フィールドごとのエラー表示

import createTaskWithState from "@/app/_actions/tasks";
import { useActionState, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ActionFeedback from "./ActionFeedback";
import ValidationError from "./ValidationError";
import { TaskFieldSchemas, titleSchema } from "@/app/_lib/schemas";
import { mergeErrors, validateField } from "@/app/_utils/validation";

export default function TaskForm() {
  const [realTimeError, setRealTimeError] = useState<Record<string, string>>(
    {}
  );
  const [state, dispatch, pending] = useActionState(createTaskWithState, {
    success: false,
    message: "",
    errors: {},
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const error = validateField(titleSchema, value);
    setRealTimeError({ [name]: error || "" });
  };

  const mergedErrors = mergeErrors(state.errors, realTimeError);

  return (
    <div className="space-y-4">
      <form action={dispatch} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            タスクタイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            disabled={pending}
            onChange={handleFieldChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              pending ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } ${state.errors?.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="例: 資料作成"
          />
          <ValidationError fieldName="title" errors={mergedErrors} />
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            優先度
          </label>
          <select
            id="priority"
            name="priority"
            disabled={pending}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              pending ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } ${state.errors?.priority ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
          </select>
          <ValidationError fieldName="priority" errors={state.errors} />
        </div>

        <button
          type="submit"
          disabled={pending}
          className={`w-full flex items-center justify-center py-2 px-4 rounded-md font-medium transition duration-200 ${
            pending
              ? "bg-gray-400 cursor-not-allowed text-gray-600"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white"
          }`}
        >
          {pending ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              作成中...
            </>
          ) : (
            "タスクを追加"
          )}
        </button>
      </form>

      <ActionFeedback state={state} pending={pending} />
    </div>
  );
}
