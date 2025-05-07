"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { HubConnection, HubConnectionBuilder, JsonHubProtocol, HttpTransportType, LogLevel } from '@microsoft/signalr';

interface SignalRContextType {
  connection: HubConnection | null;
  isConnected: boolean;
}

const SignalRContext = createContext<SignalRContextType>({
  connection: null,
  isConnected: false
});

export const useSignalRConnection = () => useContext(SignalRContext);

interface SignalRProviderProps {
  children: ReactNode;
  hubUrl: string;
}

export const SignalRProvider: React.FC<SignalRProviderProps> = ({ children, hubUrl }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Chỉ tạo kết nối một lần khi ứng dụng khởi động
    const createConnection = async () => {
      try {
        console.log(`Attempting to connect to SignalR hub at: ${hubUrl}`);
        
        const newConnection = new HubConnectionBuilder()
          .withUrl(hubUrl, {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets,
            withCredentials: false,
            timeout: 60000
          })
          .withHubProtocol(new JsonHubProtocol())
          .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
          .configureLogging(LogLevel.Debug)
          .build();

        // Xử lý sự kiện kết nối/ngắt kết nối
        newConnection.onclose((error) => {
          console.log("SignalR connection closed", error);
          setIsConnected(false);
        });

        newConnection.onreconnecting((error) => {
          console.log("SignalR attempting to reconnect", error);
          setIsConnected(false);
        });

        newConnection.onreconnected(() => {
          console.log("SignalR reconnected");
          setIsConnected(true);
        });

        // Bắt đầu kết nối
        await newConnection.start();
        console.log("SignalR connection established successfully");
        setConnection(newConnection);
        setIsConnected(true);
      } catch (error) {
        console.error("Error establishing SignalR connection:", error);
        // Try again in 5 seconds
        setTimeout(() => {
          if (!isConnected) {
            console.log("Retrying SignalR connection...");
            createConnection();
          }
        }, 5000);
      }
    };

    if (!connection) {
      createConnection();
    }

    // Đóng kết nối khi ứng dụng đóng
    return () => {
      if (connection) {
        console.log("Stopping SignalR connection");
        connection.stop();
      }
    };
  }, [hubUrl, isConnected]);

  return (
    <SignalRContext.Provider value={{ connection, isConnected }}>
      {children}
    </SignalRContext.Provider>
  );
}; 