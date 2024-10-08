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

  const currentUser = JSON.parse(localStorage.getItem("currentUser") as any) ;


  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsData = await getAllAccounts();
    
        const loggedInUsername = currentUser.username;
    
        const newPeople = accountsData
          .filter((account) => account.username !== loggedInUsername) 
          .map((account) => ({
            id: account._id,
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
  

  useEffect(() => {
    const fetchChat = async () => {
      try {
        if (selectedPerson) {
          // Fetch all messages
          const allChatData: ChatMessage[] = await getChat(currentUser?._id, selectedPerson.id);
  
          setChatMessages(allChatData);
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };
  
    fetchChat();
  }, [selectedPerson?.id, currentUser._id]);

  
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
      const chatData = await getChat(currentUser._id,person.id);
      setChatMessages(chatData);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  const onRefreshChat = async () => {
    try {
      const chatData: ChatMessage[] = await getChat(currentUser._id,selectedPerson?.id || '');
      setChatMessages(chatData);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };
  

  return (
    <div className="flex h-screen bg-white"style={{ background: `url('https://img.freepik.com/premium-vector/corner-frame-illustration-pink-cherry-blossoms_623790-40.jpg')no-repeat ` 
    ,backgroundSize: 'cover',}}>
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