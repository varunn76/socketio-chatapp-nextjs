import React from "react";

interface ChatMessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
}
const ChatMessage = ({ sender, message, isOwnMessage }: ChatMessageProps) => {
  const isSystemMessage = sender === "system";
  return (
    <div
      className={`flex ${
        isSystemMessage
          ? "justify-center"
          : isOwnMessage
          ? "justify-end"
          : "justify-start"
      } mb-3`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isSystemMessage
            ? "bg-gray-800"
            : isOwnMessage
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
