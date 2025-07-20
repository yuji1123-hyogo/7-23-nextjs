import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "タスク管理アプリ - NextJS 15",
  description:
    "NextJS 15 App Router + Server Actions を使用したタスク管理アプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <h1 className="text-lg font-semibold text-gray-900">
              NextJS 15 学習アプリ
            </h1>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
