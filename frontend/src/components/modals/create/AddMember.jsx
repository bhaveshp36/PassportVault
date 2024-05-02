/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { App, Form, Input, Button, DatePicker, Upload } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import { UploadOutlined } from "@ant-design/icons";

const CreateMemberForm = ({ onSubmit }) => {
  const { message } = App.useApp();
  const [formData, setFormData] = useState({});
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "xxx.png",
      status: "done",
      url: "http://www.baidu.com/xxx.png",
    },
  ]);

  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
  };
  const props = {
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange: handleChange,
    multiple: true,
  };

  const initialValues = {
    memberType: "",
    surname: "",
    givenName: "",
    birthDate: null,
    birthPlace: "",
    nationality: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    education: "",
    joiningDate: null,
    address: "",
    documents: "",
    otherInfo: "",
  };

  useEffect(() => {
    // Fetch existing member data by memberId from backend
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/members/`)
      .then((response) => {
        console.log("Member created:", response.data);
        message.success("Member created successfully");
      })
      .catch((error) => {
        console.error("Error creating member:", error);
        message.error("Error creating member");
      });
  });

  const handleFormChange = (changedValues, allValues) => {
    const handleFormChange = (changedValues, allValues) => {
      // Check if birthDate or joiningDate has changed
      if (changedValues.birthDate || changedValues.joiningDate) {
        // Format the dates to a string before setting the form data
        setFormData({
          ...allValues,
          birthDate: allValues.birthDate
            ? allValues.birthDate.format("YYYY-MM-DD")
            : null,
          joiningDate: allValues.joiningDate
            ? allValues.joiningDate.format("YYYY-MM-DD")
            : null,
        });
      } else {
        setFormData(allValues);
      }
    };
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Form
      initialValues={initialValues}
      onValuesChange={handleFormChange}
      onFinish={handleSubmit}
    >
      {/* Joining Date */}
      <Form.Item
        label="Member Type"
        name="memberType"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Joining Date" name="joiningDate">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
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
        {/* Upload */}

        {/* Identity */}
        <Form.Item
          name={["documents", "identity"]}
          label="Identity"
          style={{ display: "block" }}
        ></Form.Item>
        {/* Member Certificate */}
        <Form.Item
          name={["documents", "memberCertificate"]}
          label="Member Certificate"
          style={{ display: "block" }}
        ></Form.Item>
        {/* Other */}
        <Form.Item
          name={["documents", "other"]}
          label="Other"
          style={{ display: "block" }}
        ></Form.Item>
        <Upload {...props} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
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
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

CreateMemberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateMemberForm;
