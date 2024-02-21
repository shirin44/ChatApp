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
interface ChatProps {
  selectedPerson: Person | null;
}

const Chat: React.FC<ChatProps> = ({ selectedPerson }) => {
  const [message, setMessage] = useState<string[]>([]);
  const [form] = Form.useForm();
  const handleReply = (event: any) => {
    const key = event?.key;
    const value = (event?.target as any)?.value;
    if (key === "Enter") {
      // Handle sending message here (e.g., call a function to send the message)
      console.log("Sending message:", message);

      setMessage([value, ...message]);

      // Clear the textarea after sending the message

      form.resetFields();
    }
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
        {/* Display messages in reverse order */}
        {message
          .slice()
          .reverse()
          .map((msg, index) => (
            <div key={index} className="mb-2">
              {msg}
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
            />
          </Form.Item>
        </Form>

        {/* Icons on the right */}
        <div className="flex items-center space-x-6">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="icon"
            size="2x"
            style={{ color: "black" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
