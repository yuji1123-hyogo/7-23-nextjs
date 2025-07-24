import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { Post } from "../_lib/blog-types";

// TODO: 記事データを取得する関数を作成
// ヒント: fs.readFile を使用してJSONファイルを読み込み
// ヒント: JSON.parse でオブジェクトに変換
// ヒント: 公開日順（新しい順）でソート
// ヒント: async function getPosts(): Promise<Post[]> の形で定義

//JSONファイルからモックデータを取得
async function getPosts() {
  // TODO: posts.jsonファイルのパスを取得
  // ヒント: path.join(process.cwd(), 'src/app/_data/posts.json')
  // TODO: ファイルを読み込んでパース
  // ヒント: await fs.readFile(filePath, 'utf-8')
  // ヒント: JSON.parse() でオブジェクトに変換
  // TODO: 公開日順でソート（新しい順）
  // ヒント: sort() メソッドと Date コンストラクタを使用
  // TODO: ソート済みの記事配列を返す
  try {
    const filePath = path.join(process.cwd(), "src/app/_data/posts.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const posts: Post[] = JSON.parse(fileContent);

    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

// TODO: 記事一覧ページコンポーネントを作成
// ヒント: Server Component として実装
// ヒント: getPosts() を呼び出してデータ取得
// ヒント: map() を使用して記事リストを表示

export default async function BlogPage() {
  // TODO: 記事データを取得
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      {/* ページタイトル */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">最新記事</h2>
      </div>

      {/* 記事一覧 */}
      <div className="space-y-6">
        {/* TODO: 記事データをmapで展開 */}
        {/* ヒント: posts.map((post) => ( ... )) */}
        {/* ヒント: key属性にpost.idを使用 */}
        {/* ヒント: Link コンポーネントでhref="/blog/{post.slug}"に設定 */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">まだ記事がありません</p>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.content.substring(0, 100)}
                  </p>
                  <div className="flex items-center justify-between">
                    <time className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
                    </time>
                    <span className="text-blue-600 text-sm font-medium">
                      続きを読む →
                    </span>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>

        {/* TODO: 記事が0件の場合の表示 */}
        {/* ヒント: posts.length === 0 の条件分岐 */}
      </div>
    </div>
  );
}

export const metadata = {
  title: "hello",
  openGraph: {
    title: "記事タイトル",
    description: "記事の説明",
    siteName: "My Blog",
    images: [
      {
        url: "/next.svg",
        width: 1200,
        height: 630,
      },
    ],
    type: "article",
  },
};
