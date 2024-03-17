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
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          marginTop: 20,
          maxWidth: 600,
        }}
      >
        <Form.Item label="Full Name">
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Father's Name">
          <Input
            value={fatherName}
            onChange={(e) => {
              setFatherName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Mother's Name">
          <Input
            value={motherName}
            onChange={(e) => {
              setMotherName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Date of Birth">
          <DatePicker onChange={onDobChange} />
        </Form.Item>
        <Form.Item label="Place of Birth">
          <Input
            value={pob}
            onChange={(e) => {
              setPob(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Date of Joining">
          <DatePicker onChange={onDojChange} />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSave}>Save</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddMemberModal;
