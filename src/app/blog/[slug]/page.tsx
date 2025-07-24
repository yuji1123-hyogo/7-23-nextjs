import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { Post } from "@/app/_lib/blog-types";
import { Metadata } from "next";

// TODO: スラッグから記事を取得する関数を作成
// ヒント: getPosts() を呼び出して全記事を取得
// ヒント: find() メソッドでslugが一致する記事を検索
// ヒント: 見つからない場合は null を返す

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(process.cwd(), "src/app/_data/posts.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const posts: Post[] = JSON.parse(fileContent);
    const post = posts.find((post) => post.slug === slug);
    return post || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// TODO: ページコンポーネントのprops型を定義
// ヒント: params オブジェクトに slug プロパティが含まれる

interface BlogPostPageProps {
  // TODO: params の型定義
  // ヒント: { slug: string } の形
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

// TODO: 記事詳細ページコンポーネントを作成
// ヒント: async function として定義
// ヒント: params からslugを取得
// ヒント: 記事が見つからない場合は notFound() を呼び出し

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  // TODO: paramsからslugを取得

  // TODO: 記事データを取得

  // TODO: 記事が見つからない場合のハンドリング
  // ヒント: if (!post) { notFound(); }

  // TODO: 日付フォーマット関数を作成（オプション）
  // ヒント: new Date(post.publishedAt).toLocaleDateString('ja-JP')

  return (
    <article className="max-w-4xl mx-auto">
      {/* 記事ヘッダー */}
      <header className="mb-8">
        <nav className="mb-4">
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← 記事一覧に戻る
          </Link>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {/* TODO: 記事タイトルを表示 */}
          {post.title}
        </h1>

        <div className="flex items-center text-gray-600">
          <time>
            公開日:{new Date(post.publishedAt).toLocaleDateString("ja-JP")}
          </time>
        </div>
      </header>

      {/* 記事本文 */}
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {/* TODO: 記事本文を表示 */}
          {post.content}
        </div>
      </div>

      {/* 記事フッター */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/blog"
          className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          ← 他の記事を読む
        </Link>
      </footer>
    </article>
  );
}

// TODO: メタデータ生成関数を作成（オプション）
// ヒント: export async function generateMetadata() の形で定義
// ヒント: 記事のタイトルと内容をメタデータに設定
// ヒント: 記事が見つからない場合のハンドリングも必要

/*
export async function generateMetadata({ params }: BlogPostPageProps) {
  // TODO: 記事データを取得
  
  // TODO: 記事が見つからない場合のデフォルトメタデータ
  
  // TODO: 記事固有のメタデータを返す
  // ヒント: title, description を設定
}
*/
