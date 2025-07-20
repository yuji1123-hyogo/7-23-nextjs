import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { ActionResults } from "@/app/_lib/types";

// TODO: フィードバック表示のロジックを実装
// ヒント: state, pending を props として受け取る
// ヒント: pending, success, error の3つの状態に応じた表示
// ヒント: LoadingSpinnerコンポーネントを活用
// ヒント: アイコンと色で状態を視覚的に表現

interface ActionFeedbackProps {
  state: ActionResults;
  pending: boolean;
}
function ActionFeedback({ state, pending }: ActionFeedbackProps) {
  if (pending) {
    <div>
      <LoadingSpinner size="sm" />
      <span className="text-sm font-medium">処理中です...</span>
    </div>;
  }

  if (state.success && state.message) {
    return (
      <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-md">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">{state.message}</span>
      </div>
    );
  }

  if (!state.success && state.message) {
    return (
      <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-2 rounded-md">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">{state.message}</span>
      </div>
    );
  }

  return null;
}

export default ActionFeedback;
