/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Card
          title="Login"
          style={{
            height: "60vh",
            width: "60vw",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;
