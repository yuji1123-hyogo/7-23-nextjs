import Link from "next/link";
import { ReactNode } from "react";

// TODO: ブログセクション専用のレイアウトコンポーネントを作成
// ヒント: children プロパティを受け取る必要がある
// ヒント: ブログ専用のナビゲーションを含める
// ヒント: 既存のタスク管理への戻りリンクも含める

interface BlogLayoutProps {
  // TODO: children プロパティの型定義
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* ブログセクションのヘッダー */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ブログ</h1>
            <p className="text-gray-600">学習記録と技術記事</p>
          </div>

          {/* メインアプリへの戻りリンク */}
          <Link
            href="/"
            className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← タスク管理に戻る
          </Link>
        </div>

        {/* ブログ内ナビゲーション */}
        <nav className="mt-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <Link
              href="/blog"
              className="pb-2 text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-colors"
            >
              記事一覧
            </Link>
            {/* TODO: 将来的にカテゴリページなどを追加する場合はここに記述 */}
          </div>
        </nav>
      </header>

      {/* メインコンテンツエリア */}
      <main>{children}</main>
    </div>
  );
}
