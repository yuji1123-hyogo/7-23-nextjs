export async function GET() {
  // SSE用のReadableStreamを作成
  const stream = new ReadableStream({
    start(controller) {
      let messageCount = 0;

      // 3秒間隔でメッセージを送信
      const interval = setInterval(() => {
        messageCount++;

        // 通知データを作成
        const notification = {
          id: `msg-${messageCount}`,
          message: `テスト通知 #${messageCount}`,
          type:
            messageCount % 3 === 0
              ? "success"
              : messageCount % 3 === 1
              ? "info"
              : "error",
          timestamp: new Date().toISOString(),
        };

        // SSE形式でデータを送信
        const sseData = `data: ${JSON.stringify(notification)}\n\n`;
        controller.enqueue(new TextEncoder().encode(sseData));
      }, 3000);

      // 接続終了時のクリーンアップ
      return () => {
        clearInterval(interval);
      };
    },
  });

  // SSE用のヘッダーを設定してResponseを返す
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
