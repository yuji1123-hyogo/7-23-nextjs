// ==========================================
// 1. src/app/_lib/blog-types.ts
// ==========================================

// TODO: ブログ記事の基本的な型定義を作成
// ヒント: id, title, slug, content, publishedAt フィールドが必要
// ヒント: publishedAt は Date型またはstring型で定義
// ヒント: export interface Post { ... } の形で定義

export interface Post {
  // TODO: 記事のユニークIDを定義（string型）
  // TODO: 記事のタイトルを定義（string型）
  // TODO: URLで使用するスラッグを定義（string型）
  // TODO: 記事の本文を定義（string型）
  // TODO: 公開日時を定義（string型 - ISO 8601形式）
  id: string;
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
}
