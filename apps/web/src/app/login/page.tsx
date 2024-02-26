"use client"
import React from "react";
import { Button, Form, Input } from "antd";


const App: React.FC = () => {
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
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input style={{ fontSize: "20px" }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password style={{ fontSize: "20px" }} />
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
