// TODO: 必要なReactフックをimport
// ヒント: useState, useEffect が必要

import { useEffect, useState } from "react";
import { ConnectionState, Notification } from "../_lib/notification-types";

// TODO: 通知の配列状態を管理
// ヒント: useState<Notification[]>([])

// TODO: 接続状態を管理
// ヒント: useState<ConnectionState>('disconnected')

// TODO: useEffectでEventSource接続を作成
// ヒント: new EventSource('/api/notifications/stream')

// TODO: eventSourceのイベントハンドラーを設定
// ヒント: onopen, onmessage, onerror

// TODO: 受信したメッセージを配列に追加
// ヒント: setNotifications(prev => [newNotification, ...prev])

// TODO: クリーンアップでeventSource.close()
// ヒント: return () => { eventSource.close() }

// TODO: notifications と connectionState を返す

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("disconnected");

  useEffect(() => {
    setConnectionState("connecting");

    const eventSource = new EventSource("/api/notifications/stream");

    eventSource.onopen = () => {
      setConnectionState("connected");
    };
    eventSource.onmessage = (event) => {
      try {
        const notification: Notification = JSON.parse(event.data);

        setNotifications((prev) => [notification, ...prev]);
      } catch (error) {
        console.error("通知データの解析に失敗:", error);
      }
    };

    eventSource.onerror = () => {
      setConnectionState("disconnected");
    };

    return () => {
      eventSource.close();
      setConnectionState("disconnected");
    };
  }, []);

  return {
    notifications,
    connectionState,
  };
}
