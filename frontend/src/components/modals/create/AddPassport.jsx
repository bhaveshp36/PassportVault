// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, DatePicker } from "antd";
import Cookies from "js-cookie";

const AddPassport = () => {
  const token = Cookies.get("token");
  const [passport, setPassport] = useState({
    parentMember_id: "",
    country: "",
    passportNo: "",
    dateOfIssue: "",
    dateOfExpiry: "",
    placeOfIssue: "",
    fileNo: "",
    previousPassportNo: "",
    previousPassportDateOfIssue: "",
    previousPassportPlaceOfIssue: "",
    documents: {
      coverPage: "",
      firstPage: "",
      lastPage: "",
      pdf: "",
    },
    otherInfo: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/passports`,
        passport,
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
    setPassport({ ...passport, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Add Passport</h1>
      <Form
        name="passport_form"
        onFinish={handleSubmit}
        onValuesChange={handleChange}
      >
        <Form.Item name="parentMember_id" label="Parent Member ID">
          <Input />
        </Form.Item>
        <Form.Item name="country" label="Country">
          <Input />
        </Form.Item>
        <Form.Item name="passportNo" label="Passport Number">
          <Input />
        </Form.Item>
        <Form.Item name="dateOfIssue" label="Date of Issue">
          <DatePicker />
        </Form.Item>
        <Form.Item name="dateOfExpiry" label="Date of Expiry">
          <DatePicker />
        </Form.Item>
        <Form.Item name="placeOfIssue" label="Place of Issue">
          <Input />
        </Form.Item>
        <Form.Item name="fileNo" label="File Number">
          <Input />
        </Form.Item>
        <Form.Item name="previousPassportNo" label="Previous Passport Number">
          <Input />
        </Form.Item>
        <Form.Item
          name="previousPassportDateOfIssue"
          label="Previous Passport Date of Issue"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="previousPassportPlaceOfIssue"
          label="Previous Passport Place of Issue"
        >
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

export default AddPassport;
