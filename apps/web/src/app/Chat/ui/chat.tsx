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
import { Joan } from "next/font/google";

interface ChatProps {
  selectedPerson: Person | null;
  chatMessages: ChatMessage[];
  refresh: () => Promise<void>;
}

export interface ChatMessage {
  id: string;
  sender: {
    name: string;
    icon: string;
  };
  content: string;
  timestamp: number;
  receiverId: string;
  senderId: string;
}


const Chat: React.FC<ChatProps> = ({
  selectedPerson,
  chatMessages,
  refresh,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [form] = Form.useForm();

  const currentUser = JSON.parse(localStorage.getItem("currentUser") as any) ;

  const handleReply = (event: any) => {
    
    refresh();
    const key = event?.key;
    const value = (event?.target as any)?.value;

    if (key === "Enter" && value.trim() !== "") {
      refresh();
      const newMessage: ChatMessage = {
        id: uuidv4(),
        sender: {
          name: currentUser.username,
          icon: currentUser.profileImageUrl,
        },
        content: value.trim(),
        timestamp: Date.now(),
        receiverId: selectedPerson?.id || "",
        senderId: currentUser._id|| "",
      };

      const newList = [...messages, newMessage].sort((pre, next) =>
        pre.timestamp < next.timestamp ? -1 : 1
      );
      console.log("new ", newMessage);
      setMessages(newList);
      sendMessage(newMessage);
      form.resetFields();
      refresh();
    }
  };
  const handleLikeClick = () => {
    refresh();
    const likeMessage: ChatMessage = {
      id: uuidv4(),
      sender: {
        name: currentUser.username,
        icon: currentUser.profileImageUrl,
      },
      content: "👍", // Like emoji or any text you want to represent a like
      timestamp: Date.now(),

      receiverId: selectedPerson?.id || "",
      senderId: currentUser._id|| "",
    };
    refresh();

    const newList = [...messages, likeMessage].sort((pre, next) =>
      pre.timestamp < next.timestamp ? -1 : 1
    );
    refresh();

    setMessages(newList);
    // Call the sendMessage function with the new message
    sendMessage(likeMessage);
  };

  console.log("chatMessages ", chatMessages);

  return (
    <div className="flex-1 flex flex-col border border-gray-300 overflow-hidden">
      {/* Upper 10% */}
      <div className="h-20 border-b border-gray-300 p-4 flex items-center justify-between">
        {/* User Information */}
        <div className="flex items-center space-x-6">
          <img
            src={selectedPerson?.imageUrl || ""}
            alt="User Avatar"
            className="w-14 h-14 rounded-full"
          />
          <span className="font-bold text-3xl text-black">
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
      <div className="flex-1 overflow-y-auto p-6 text-black "
      >
        {!!chatMessages?.length &&
          chatMessages?.slice()?.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 flex ${
                msg.sender && msg.sender.name === currentUser.username
                  ? "items-end justify-end"
                  : "items-start justify-start" // Use justify-start for received messages
              }`}
            >
              {/* Sender's icon */}
              {msg.sender && (
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <img
                    src={msg.sender.icon}
                    alt="Sender Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`${
                  msg.sender && msg.sender.name === currentUser.username
                    ? " bg-pink-100"
                    : "bg-gray-300"
                } p-3 rounded-lg`}
              >
                <div>
                  {msg.sender && <strong>{msg.sender.name}:</strong>}{" "}
                  {msg.content}
                </div>
                <small>
                  {msg.timestamp &&
                    new Date(msg.timestamp).toLocaleString([], {
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
      <div className="h-20 p-6 border-t border-gray-300 flex items-center justify-between ">
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

        {/* Text area */}
        <Form form={form}>
          <Form.Item name="input-reply" style={{ display: 'flex', justifyContent: 'center' }}>
            <Input
              onPressEnter={handleReply}
              className="chat-reply"
              placeholder="Reply"
              autoFocus
              aria-label="Type your reply"
              style={{ height: '40px',width: '800px' ,fontSize: '18px' }} 
            />
          </Form.Item>
        </Form>


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
