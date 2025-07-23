// TODO: 通知の種類を定義
// ヒント: 'success' | 'error' | 'info' のUnion Type

// TODO: 通知データの型を定義
// ヒント: id, message, type, timestamp プロパティが必要

// TODO: 接続状態の型を定義
// ヒント: 'disconnected' | 'connecting' | 'connected'

export type NotificationType = "success" | "error" | "info";
export type ConnectionState = "disconnected" | "connecting" | "connected";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  timestamp: string;
}
