"use client";
import React from "react";
import { Button, Checkbox, Form, Upload, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { createAccount } from "../../services/account.service";

const onFinish = (values: FieldType) => {
  console.log("Success:", values);
  handlesubmitclick(values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const handlesubmitclick = async (values: FieldType) => {
  try {
    const account: Account = {
      _id: "",
      username: values?.username || "",
      password: values?.password || "",
      phoneNumber: values?.phoneNumber || "",
      remember: values?.remember === "true",
      profileImageUrl: values?.profileImageUrl || "",
    };

    await createAccount(account);

    console.log("Account created successfully!");
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

type FieldType = {
  username?: string;
  password?: string;
  phoneNumber?: string;
  remember?: string;
  profileImageUrl?: string;
};
export interface Account {
  _id: string; 
  username: string;
  password: string;
  phoneNumber: string;
  remember: boolean;
  profileImageUrl: string;
}

const normFile = (e: any) => {
  console.log("File:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const App: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Adjusted to column layout
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
        Registration Page
      </h1>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }} // Increased maxWidth for a larger form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input style={{ fontSize: "20px" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password style={{ fontSize: "20px" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^[0-9]+$/,
              message: "Please enter a valid phone number!",
            },
          ]}
        >
          <Input style={{ fontSize: "20px" }} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Profile Image URL"
          name={["profileImageUrl"]} // Wrap the field name in an array
          rules={[{ required: true, message: "Please input the image URL!" }]}
        >
          <Input style={{ fontSize: "20px" }} />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox style={{ fontSize: "20px" }}>Remember me</Checkbox>
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
            onMouseOver={(e) => (e.currentTarget.style.background = "pink")}
            onMouseOut={(e) => (e.currentTarget.style.background = "black")}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
