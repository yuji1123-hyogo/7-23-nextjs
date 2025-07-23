"use client";

import { useNotification } from "../_hooks/useNotification";

export default function NotificationTest() {
  const { notifications, connectionState } = useNotification();

  const getConnectionStateColor = () => {
    switch (connectionState) {
      case "connected":
        return "text-green-600 bg-green-50";
      case "connecting":
        return "text-yellow-600 bg-yellow-50";
      case "disconnected":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getConnectionStateText = () => {
    switch (connectionState) {
      case "connected":
        return "接続中";
      case "connecting":
        return "接続中...";
      case "disconnected":
        return "切断";
      default:
        return "不明";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">SSE接続テスト</h3>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${getConnectionStateColor()}`}
        >
          {getConnectionStateText()}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          受信した通知: {notifications.length}件
        </p>

        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded p-3">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">通知を待機中...</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id || index}
                  className="p-2 bg-gray-50 rounded text-sm"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{notification.message}</span>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        notification.type === "success"
                          ? "bg-green-100 text-green-800"
                          : notification.type === "error"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {notification.type}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {/* {new Date(notification.timestamp).toLocaleTimeString(
                      "ja-JP"
                    )} */}
                    {new Date(notification.timestamp).toLocaleString("ja-JP")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
