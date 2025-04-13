"use client";

import { useState, useRef, useEffect } from 'react';
import { chatService } from '../services/chatService';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  source?: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Xin chào! Tôi là trợ lý ảo của bạn. Tôi có thể giúp gì cho nhu cầu y tế của bạn hôm nay?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleDebugInfo = () => {
    setShowDebugInfo(!showDebugInfo);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Send message to API
      console.log('Sending message:', message);
      const response = await chatService.sendMessage(message);
      console.log('Response received:', response);
      
      // Clear debug info if successful
      setDebugInfo('');
      
      // Add bot response to chat
      const botMessage: Message = {
        text: response.message,
        isUser: false,
        timestamp: new Date(response.timestamp),
        source: response.source
      };

      setMessages(prev => [...prev, botMessage]);
      setErrorCount(0); // Reset error count on successful response
    } catch (error: any) {
      console.error('Error in chat:', error);
      setErrorCount(prev => prev + 1);
      
      // Capture debug info
      setDebugInfo(JSON.stringify({
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status
      }, null, 2));
      
      // Add error message with different suggestions based on error count
      let errorText = 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn vào lúc này. Vui lòng thử lại sau.';
      
      if (errorCount >= 2) {
        errorText = 'Hệ thống đang gặp sự cố. Vui lòng thử một trong các cách sau:\n\n' +
          '1. Đặt câu hỏi ngắn gọn và đơn giản hơn\n' +
          '2. Kiểm tra kết nối mạng của bạn\n' +
          '3. Liên hệ trực tiếp với nhân viên qua số hotline: 1900-xxxx';
      }
      
      const errorMessage: Message = {
        text: errorText,
        isUser: false,
        timestamp: new Date(),
        source: 'error'
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "Tôi bị đau bụng nên khám chuyên khoa nào?",
    "Cách đặt lịch khám sức khỏe định kỳ?",
    "Thời gian làm việc của phòng khám?",
    "Bác sĩ chuyên khoa tiêu hóa giỏi?",
    "Tôi bị gãy chân cần làm gì?",
    "Chi phí khám bệnh là bao nhiêu?"
  ];

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-cyan-600 text-white rounded-full p-4 shadow-lg z-50 hover:bg-cyan-700 transition-all"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[400px] sm:w-[500px] md:w-[600px] bg-white rounded-lg shadow-xl z-50 flex flex-col h-[600px] border border-gray-300">
          {/* Chat Header */}
          <div className="p-4 bg-cyan-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold text-xl">Trợ lý Y tế</h3>
            <div className="flex items-center">
              {/* Debug button - only visible in development */}
              {process.env.NODE_ENV === 'development' && (
                <button 
                  onClick={toggleDebugInfo} 
                  className="mr-2 text-white hover:text-gray-200 text-xs flex items-center"
                  title="Debug Info"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              )}
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Debug Panel */}
          {showDebugInfo && debugInfo && (
            <div className="bg-gray-900 text-gray-100 p-2 text-xs overflow-auto max-h-40">
              <pre>{debugInfo}</pre>
            </div>
          )}
          
          {/* Chat Messages */}
          <div className="flex-1 p-5 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.isUser ? 'ml-auto mr-0 bg-cyan-600 text-white' : 'ml-0 mr-auto bg-gray-200 text-gray-800'
                } rounded-lg p-3 max-w-[85%] break-words whitespace-pre-line text-base ${msg.source === 'fallback' ? 'border-l-4 border-yellow-500' : ''} ${msg.source === 'error' ? 'border-l-4 border-red-500' : ''}`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70 block mt-1 flex items-center">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {msg.source === 'fallback' && (
                    <span className="ml-2 bg-yellow-200 text-yellow-800 text-xs px-1 rounded">Fallback</span>
                  )}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 ml-0 mr-auto bg-gray-200 text-gray-800 rounded-lg p-3">
                <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested Questions */}
          {messages.length <= 2 && (
            <div className="px-4 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Câu hỏi gợi ý:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-300 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn của bạn..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 text-base"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-cyan-600 text-white px-5 py-3 rounded-r-lg hover:bg-cyan-700 focus:outline-none disabled:bg-cyan-400"
              disabled={isLoading || !message.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}; 