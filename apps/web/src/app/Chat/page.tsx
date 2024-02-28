"use client";
// Page.tsx
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input as AntInput } from "antd";


import { Account } from "../register/page";
import { getAllAccounts } from "../../services/account.service";
import { getChat } from "../../services/chat.service";
import Userlist from "./ui/userlist";
import Chat, { ChatMessage } from "./ui/chat";

export interface Person {
  id: string;
  name: string;
  imageUrl: string;
}

export default function Page(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);


  const [accounts, setAccounts] = useState<Account[]>([]);
  const [form] = Form.useForm();

  useEffect( () => {

   
    const fetchAccounts = async () => {
      try {

        const accountsData = await getAllAccounts();
    
        const newPeople = accountsData.map((account) => ({
          id: account._id, // Assuming your account model has a unique identifier field
          name: account.username,
          imageUrl: account.profileImageUrl || "",
        }));
    
        setPeople(newPeople);
        setAccounts(accountsData);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    
    fetchAccounts();
  }, []);

  useEffect( () => {

    const fetchChat = async () => {
      try {

        if (selectedPerson) {
          const chatData: ChatMessage[] = await getChat(selectedPerson.id);
    
          setChatMessages(chatData);
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };
    
    fetchChat();
  }, [selectedPerson?.id]);

  
  const handleAddButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values: any) => {
    const newPeople = [...people, values];
    setPeople(newPeople);
    handleModalCancel();
    // Refresh chat after sending a message
    onRefreshChat();
  };

  const handleModalCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handlePersonClick = async (person: Person) => {
    setSelectedPerson(person);

    try {
      const chatData = await getChat(person.id);
      setChatMessages(chatData);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  const onRefreshChat = async () => {
    try {
      const chatData: ChatMessage[] = await getChat(selectedPerson?.id || '');
      setChatMessages(chatData);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-200">
      <Userlist
        people={people}
        isModalVisible={isModalVisible}
        form={form}
        handleAddButtonClick={handleAddButtonClick}
        handleFormSubmit={handleFormSubmit}
        handleModalCancel={handleModalCancel}
        handlePersonClick={handlePersonClick}
        selectedPerson={selectedPerson}
        accounts={accounts}
      />

      <Chat selectedPerson={selectedPerson} chatMessages={chatMessages} refresh={onRefreshChat} />

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