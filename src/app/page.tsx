"use client";
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import JoinRoomForm from "@/components/JoinRoomForm";
import { socket } from "../../lib/socketClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<
    {
      sender: string;
      message: string;
    }[]
  >([]);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    socket.on("user_joined", (message) => {
      console.log(message);
      setMessages((prev) => [...prev, { sender: "system", message }]);
    });
    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);
  const handleSendMessage = (message: string) => {
    const data = { room, message, sender: userName };
    setMessages((prev) => [...prev, { sender: userName, message }]);
    socket.emit("message", data);
  };
  const handleJoinRoom = () => {
    if (room && userName) {
      socket.emit("join-room", { room, username: userName });
      setJoined(true);
    }
  };
  return (
    <div className="flex mt-24 justify-center w-full">
      {!joined ? (
        <JoinRoomForm
          userName={userName}
          room={room}
          setUserName={setUserName}
          setRoom={setRoom}
          onJoin={handleJoinRoom}
        />
      ) : (
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-xl font-semibold mb-4">Room: {room}</h1>
          <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border rounded-lg">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
                isOwnMessage={msg.sender === userName}
              />
            ))}
          </div>
          <ChatForm onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}
