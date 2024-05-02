// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const AddVisa = () => {
  const token = Cookies.get("token");
  const [visa, setVisa] = useState({
    parentPassport_id: "",
    passportNo: "",
    country: "",
    visaType: "",
    category: "",
    noOfEntry: "",
    visaNo: "",
    validFrom: null,
    validUntil: null,
    duration: 0,
    annotation: "",
    visaApplication_id: "",
    documents: {},
    otherInfo: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/visas`,
        visa,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // Handle success or redirect to another page
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    setVisa({ ...visa, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, value) => {
    setVisa({ ...visa, [name]: value });
  };

  return (
    <div>
      <h1>Add Visa</h1>
      <Form
        name="visa_form"
        onFinish={handleSubmit}
        onValuesChange={handleChange}
      >
        <Form.Item name="parentPassport_id" label="Parent Passport ID">
          <Input />
        </Form.Item>
        <Form.Item name="passportNo" label="Passport Number">
          <Input />
        </Form.Item>
        <Form.Item name="country" label="Country">
          <Input />
        </Form.Item>
        <Form.Item name="visaType" label="Visa Type">
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Input />
        </Form.Item>
        <Form.Item name="noOfEntry" label="Number of Entries">
          <Input />
        </Form.Item>
        <Form.Item name="visaNo" label="Visa Number">
          <Input />
        </Form.Item>
        <Form.Item name="validFrom" label="Valid From">
          <DatePicker
            onChange={(value) => handleDateChange("validFrom", value)}
          />
        </Form.Item>
        <Form.Item name="validUntil" label="Valid Until">
          <DatePicker
            onChange={(value) => handleDateChange("validUntil", value)}
          />
        </Form.Item>
        <Form.Item name="duration" label="Duration">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="annotation" label="Annotation">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="visaApplication_id" label="Visa Application ID">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddVisa;
