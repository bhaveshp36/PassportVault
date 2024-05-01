/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    let isTokenExpired = false;

    if (token) {
      const decodedToken = jwtDecode(token);
      const dateNow = new Date();
      isTokenExpired = decodedToken.exp < dateNow.getTime() / 1000;
    }

    if (token && !isTokenExpired) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async (values) => {
    console.log("Submit:", values);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        values
      );
      console.log("Success:", response.data);
      Cookies.set("token", response.data.token);
      // Here you can handle the response, for example save the token in localStorage
      // Then redirect to another page
      console.log("Token:", Cookies.get("token"));
      navigate("/dashboard");
    } catch (error) {
      console.log("Failed:", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-travel-background_52683-85109.jpg"
            alt="Login"
          />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome! to Passport Vault</p>

          <p>Login to the Dashboard</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
