"use client"
import React from "react";
import { Button, Form, Input } from "antd";



const App: React.FC = () => {
  const navigateToLogin = () => {
    window.location.href = "/login";
  };

  const navigateToRegister = () => {
    window.location.href = "/register";
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
        Welcome to the Yapping App
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "400px", 
        }}
      >
        <Button
          onClick={navigateToLogin}
          style={{
            fontSize: "18px",
            width: "180px",
            borderRadius: "10px",
            marginBottom: "10px",
            background: "black",
            color: "white",
            border: "none",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "pink")}
          onMouseOut={(e) => (e.currentTarget.style.background = "black")}
        >
          Log In
        </Button>
        <Button
          onClick={navigateToRegister}
          style={{
            fontSize: "18px",
            width: "180px",
            borderRadius: "10px",
            background: "black",
            color: "white",
            border: "none",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "pink")}
          onMouseOut={(e) => (e.currentTarget.style.background = "black")}
        >
          Register
        </Button>
      </div>
    </div>
  );
};



export default App;
