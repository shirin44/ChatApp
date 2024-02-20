"use client";
import React, { useState } from "react";
import { Button, Modal, Form, Input as AntInput } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faMicrophone,
  faImage,
  faPlus,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

interface Person {
  name: string;
  imageUrl: string;
}

export default function Page(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);


  const [form] = Form.useForm();

  const handleAddButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values: any) => {
    // Set the new person data
    const newPeoples = [...people, values];
    setPeople(newPeoples);
    // Reset the form and hide the modal
    handleModalCancel();
  };

  const handleModalCancel = () => {
    // Reset the form and hide the modal
    form.resetFields();
    setIsModalVisible(false);
  };
  const handlePersonClick = (person: Person) => {
    // Set the selected person when clicked
    setSelectedPerson(person);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300 p-4 overflow-y-auto">
        <div className="text-3xl font-bold mb-4 text-black text-center border-b-4 border-gray-300">
          Chats <span className="text-gray-500">({people.length})</span>{" "}
          <Button
            type="primary"
            shape="circle"
            size="large"
            style={{
              backgroundColor: "black",
              color: "white",
              float: "right",
              marginRight: "16px",
            }}
            onClick={handleAddButtonClick}
          >
            +
          </Button>
        </div>
        {/* Render the people list dynamically */}
        {people.map((person, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 mb-6 cursor-pointer transition-all duration-300 hover:bg-gray-200"
            onClick={() => handlePersonClick(person)}
          >
            <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden">
              <img
                src={person.imageUrl}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-black text-lg">
              {person.name}
            </span>
          </div>
        ))}
        {/* Chat Section */}
      </div>
  
      {/* Main Chat Section */}
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
        <div className="flex-1 overflow-y-auto p-6">
          {/* Your chat messages go here */}
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
          <textarea
            className="flex-1 border rounded p-3 shadow-md"
            placeholder="Type your message..."
            style={{
              borderRadius: "45px",
              marginLeft: "16px",
              width: "90%",
              color: "black",
            }}
          ></textarea>
  
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
  
      {/* Modal for adding a new person */}
      <Modal
        title="Add New Person"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleFormSubmit} form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <AntInput />
          </Form.Item>
  
          <Form.Item
            label="Image URL"
            name="imageUrl"
            rules={[{ required: true, message: "Please enter the image URL" }]}
          >
            <AntInput />
          </Form.Item>
  
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Person
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
  
}
