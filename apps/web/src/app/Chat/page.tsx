"use client";
// Page.tsx
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
import Chat from "./ui/chat";
import Userlist from "./ui/userlist";

export interface Person {
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
      <Userlist
        people={people}
        isModalVisible={isModalVisible}
        form={form}
        handleAddButtonClick={handleAddButtonClick}
        handleFormSubmit={handleFormSubmit}
        handleModalCancel={handleModalCancel}
        handlePersonClick={handlePersonClick}
      />
  
      {/* Main Chat Section */}
      <Chat selectedPerson={selectedPerson} />
  
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
