/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import axios from "axios";

const AddMemberModal = () => {
  const [name, setName] = useState();
  const [fatherName, setFatherName] = useState();
  const [motherName, setMotherName] = useState();
  const [dob, setDob] = useState(Date);
  const [pob, setPob] = useState();
  const [doj, setDoj] = useState(Date);

  const onDobChange = (date, dateString) => {
    // console.log(date, dateString);
    setDob(new Date(dateString));
  };
  const onDojChange = (date, dateString) => {
    // console.log(date, dateString);
    setDoj(new Date(dateString));
  };

  const handleSave = async () => {
    console.log(name, fatherName, motherName, dob, pob, doj);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/members`,
      {
        name,
        fatherName,
        motherName,
        birthdate: dob,
        placeOfBirth: pob,
        joiningDate: doj,
        memberId: "12345",
      }
    );
    console.log(response.data);
  };
  return (
    // initialValues={formData} onValuesChange={handleFormChange} onFinish={handleSubmit}
    <Form>
      {/* Personal Information */}
      <Form.Item label="Personal Information" style={{ marginBottom: "20px" }}>
        {/* Surname */}
        <Form.Item
          name={["surname"]}
          label="Surname"
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>
        {/* Given Name */}
        <Form.Item
          name={["givenName"]}
          label="Given Name"
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginLeft: "16px",
          }}
        >
          <Input />
        </Form.Item>
        {/* Birth Date */}
        <Form.Item
          name={["birthDate"]}
          label="Birth Date"
          style={{ display: "block" }}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        {/* Birth Place */}
        <Form.Item
          name={["birthPlace"]}
          label="Birth Place"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
        {/* Nationality */}
        <Form.Item
          name={["nationality"]}
          label="Nationality"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      {/* Family Information */}
      <Form.Item label="Family Information" style={{ marginBottom: "20px" }}>
        {/* Father's Name */}
        <Form.Item
          name={["fatherName", "surname"]}
          label="Father's Surname"
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["fatherName", "givenName"]}
          label="Father's Given Name"
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginLeft: "16px",
          }}
        >
          <Input />
        </Form.Item>
        {/* Mother's Name */}
        <Form.Item
          name={["motherName", "surname"]}
          label="Mother's Surname"
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["motherName", "givenName"]}
          label="Mother's Given Name"
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginLeft: "16px",
          }}
        >
          <Input />
        </Form.Item>
        {/* Spouse's Name */}
        <Form.Item
          name={["spouseName", "surname"]}
          label="Spouse's Surname"
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["spouseName", "givenName"]}
          label="Spouse's Given Name"
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginLeft: "16px",
          }}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      {/* Education */}
      <Form.Item label="Education" style={{ marginBottom: "20px" }}>
        {/* Name of Institute */}
        <Form.Item
          name={["education", "nameOfInstitute"]}
          label="Name of Institute"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
        {/* Course */}
        <Form.Item
          name={["education", "course"]}
          label="Course"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
        {/* Year From */}
        <Form.Item
          name={["education", "yearFrom"]}
          label="Year From"
          style={{ display: "block" }}
        >
          <Input type="number" />
        </Form.Item>
        {/* Year To */}
        <Form.Item
          name={["education", "yearTo"]}
          label="Year To"
          style={{ display: "block" }}
        >
          <Input type="number" />
        </Form.Item>
      </Form.Item>

      {/* Address */}
      <Form.Item label="Address" style={{ marginBottom: "20px" }}>
        {/* Line 1 */}
        <Form.Item
          name={["address", "line1"]}
          label="Line 1"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
        {/* Line 2 */}
        <Form.Item
          name={["address", "line2"]}
          label="Line 2"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
        {/* Line 3 */}
        <Form.Item
          name={["address", "line3"]}
          label="Line 3"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      {/* Documents */}
      <Form.Item label="Documents" style={{ marginBottom: "20px" }}>
        {/* Identity */}
        <Form.Item
          name={["documents", "identity"]}
          label="Identity"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
        {/* Member Certificate */}
        <Form.Item
          name={["documents", "memberCertificate"]}
          label="Member Certificate"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
        {/* Other */}
        <Form.Item
          name={["documents", "other"]}
          label="Other"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      {/* Other Information */}
      <Form.Item
        name={["otherInfo"]}
        label="Other Information"
        style={{ display: "block" }}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item style={{ textAlign: "center" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddMemberModal;
