interface ValidationErrorProps {
  fieldName: string;
  errors: Record<string, string>;
  className?: string;
}

export default function ValidationError({
  fieldName,
  errors,
  className = "",
}: ValidationErrorProps) {
  const error = errors[fieldName];

  if (!error) return null;
  return (
    <div className={`mt-1 flex items-center space-x-1 ${className}`}>
      <svg
        className="w-4 h-4 text-red-500 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm text-red-600 font-medium">{error}</span>
    </div>
  );
}

// 複数エラー表示用のコンポーネント
interface ValidationErrorListProps {
  errors: Record<string, string>;
  className?: string;
}

export function ValidationErrorList({
  errors,
  className = "",
}: ValidationErrorListProps) {
  const errorEntries = Object.entries(errors).filter(([_, message]) => message);

  if (errorEntries.length === 0) return null;

  return (
    <div
      className={`bg-red-50 border border-red-200 rounded-md p-3 ${className}`}
    >
      <div className="flex">
        <svg
          className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            入力内容を確認してください
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc list-inside space-y-1">
              {errorEntries.map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
