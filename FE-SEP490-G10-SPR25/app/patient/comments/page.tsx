"use client";

import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { useEffect, useState } from "react";

export default function CommentPage() {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://localhost:5220/hubs/comments", {
        withCredentials: true, // cho phép credentials
      })
      .withAutomaticReconnect()
      .build();

    setConnection(connect);

    connect
      .start()
      .then(() => {
        console.log("Connected to SignalR");

        connect.on("ReceiveComment", (message: string) => {
          console.log("Nhận từ server:", message);
          setMessages((prev) => [...prev, message]);
        });
      })
      .catch((err) => {
        console.error("Connection failed:", err);
      });

    return () => {
      connect.stop();
    };
  }, []);

  const sendMessage = async () => {
    if (!connection) return;

    try {
      await connection.invoke("SendComment", message);
      console.log("Đã gửi:", message);
      setMessage("");
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Bình luận realtime</h2>

      <div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập comment"
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>

      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
