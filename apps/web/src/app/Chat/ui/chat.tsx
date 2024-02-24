import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faPhone,
  faMicrophone,
  faImage,
  faPlus,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Person } from "../page";
import { Form, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { sendMessage } from "../../../services/chat.service";

interface ChatProps {
  selectedPerson: Person | null;
}

export interface ChatMessage {
  id: string;
  sender: {
    name: string;
    icon: string; // URL or icon identifier
  };
  content: string;
  timestamp: number;
}

const Chat: React.FC<ChatProps> = ({ selectedPerson }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [form] = Form.useForm();

  const handleReply = (event: any) => {
    const key = event?.key;
    const value = (event?.target as any)?.value;

    if (key === "Enter" && value.trim() !== "") {
      const newMessage: ChatMessage = {
        id: uuidv4(),
        sender: {
          name: "You",
          icon: "https://i.pinimg.com/736x/a4/c3/0f/a4c30f5c16601d21c8ca047315022eb3.jpg",
        },
        content: value.trim(),
        timestamp: Date.now(),
      };

      const newList = [...messages, newMessage].sort((pre, next) =>
        pre.timestamp < next.timestamp ? -1 : 1
      );
      console.log("new ", newMessage);
      setMessages(newList);
      sendMessage(newMessage);
      form.resetFields();
    }

  };
  const handleLikeClick = () => {
    const likeMessage: ChatMessage = {
      id: uuidv4(),
      sender: {
        name: "You",
        icon: "https://i.pinimg.com/736x/a4/c3/0f/a4c30f5c16601d21c8ca047315022eb3.jpg",
      },
      content: "👍", // Like emoji or any text you want to represent a like
      timestamp: Date.now(),
    };

    const newList = [...messages, likeMessage].sort((pre, next) =>
      pre.timestamp < next.timestamp ? -1 : 1
    );

    setMessages(newList);
    // Call the sendMessage function with the new message
    sendMessage(likeMessage);
  };

  return (
    <div className="flex-1 flex flex-col border border-black overflow-hidden">
      {/* Upper 10% */}
      <div className="h-20 bg-gray-400 border-b border-black p-4 flex items-center justify-between">
        {/* User Information */}
        <div className="flex items-center space-x-6">
          <img
            src={selectedPerson?.imageUrl || ""}
            alt="User Avatar"
            className="w-14 h-14 rounded-full"
          />
          <span className="font-bold text-3xl">
            {selectedPerson?.name || ""}
          </span>
        </div>
        {/* Video and Phone Icons */}
        <div className="flex items-center space-x-6">
          <FontAwesomeIcon
            icon={faVideo}
            className="video-icon"
            size="2x"
            style={{ color: "black" }}
          />
          <FontAwesomeIcon
            icon={faPhone}
            className="phone-icon"
            size="2x"
            style={{ color: "black" }}
          />
        </div>
      </div>

      {/* Middle 80% */}
      <div className="flex-1 overflow-y-auto p-6 text-black">
        {messages.slice().map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${
              msg.sender.name === "You"
                ? "items-end justify-end"
                : "items-start"
            }`}
          >
            {/* Sender's icon */}
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <img
                src={msg.sender.icon}
                alt="Sender Icon"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Message bubble */}
            <div
              className={`${
                msg.sender.name === "You" ? "bg-blue-500" : "bg-gray-300"
              } p-3 rounded-lg`}
            >
              <div>
                <strong>{msg.sender.name}:</strong> {msg.content}
              </div>
              <small>
                {new Date(msg.timestamp).toLocaleString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom 10% */}
      <div className="h-20 p-6 border-t border-gray-500 flex items-center justify-between">
        {/* Icons on the left */}

        <div className="flex items-center space-x-6">
          <FontAwesomeIcon
            icon={faMicrophone}
            className="icon"
            size="2x"
            style={{ color: "black" }}
          />
          <FontAwesomeIcon
            icon={faImage}
            className="icon"
            size="2x"
            style={{ color: "black" }}
          />
          <FontAwesomeIcon
            icon={faPlus}
            className="icon"
            size="2x"
            style={{ color: "black" }}
          />
        </div>

        {/* Text area in the middle taking up remaining space */}
        <Form form={form}>
          <Form.Item name="input-reply">
            <Input
              onPressEnter={handleReply}
              className="chat-reply"
              placeholder="Reply"
              autoFocus
              aria-label="Type your reply"
            />
          </Form.Item>
        </Form>

        {/* Icons on the right */}
        {/* Icons on the right */}
        <div className="flex items-center space-x-6">
          <div className="icon" onClick={handleLikeClick}>
            <FontAwesomeIcon
              icon={faThumbsUp}
              size="3x"
              style={{ color: "black" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
