"use client";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { login } from "../../services/account.service";
import { test } from "node:test";

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onFinish = (values: FieldType) => {
    console.log("Success:", values);
    handleloginclick(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
  };
  const handleloginclick = async (values: FieldType) => {
    try {
      const result = await login(values);

      if (result?.valid) {
        localStorage.setItem("currentUser", JSON.stringify(result?.account));

        window.location.href = "/chat";
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: `url('https://img.freepik.com/premium-vector/corner-frame-illustration-pink-cherry-blossoms_623790-40.jpg') no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          color: "black",
          fontWeight: "bold",
          fontSize: "36px",
        }}
      >
        Login Page
      </h1>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            style={{ fontSize: "20px" }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            style={{ fontSize: "20px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              fontSize: "24px",
              background: "black",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
