/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import moment from "moment";
import axios from "axios";
import PropTypes from "prop-types";

const EditMemberForm = ({ memberId, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const initialValues = {
    memberType: formData.memberType,
    surname: formData.surname,
    givenName: formData.givenName,
    birthDate: formData.birthDate ? moment(formData.birthDate) : null,
    birthPlace: formData.birthPlace,
    nationality: formData.nationality,
    fatherName: formData.fatherName,
    motherName: formData.motherName,
    spouseName: formData.spouseName,
    education: formData.education,
    joiningDate: formData.joiningDate ? moment(formData.joiningDate) : null,
    address: formData.address,
    documents: formData.documents,
    otherInfo: formData.otherInfo,
  };

  useEffect(() => {
    console.log("Fetching member data...");
    console.log("Member ID:", memberId);
    // Fetch existing member data by memberId from backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/members/${memberId}`)
      .then((response) => {
        const { birthDate, joiningDate, ...restData } = response.data;
        setFormData({
          ...restData,
          birthDate: birthDate ? moment(birthDate) : null,
          joiningDate: joiningDate ? moment(joiningDate) : null,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
        setLoading(false);
      });
  }, [memberId]);

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

EditMemberForm.propTypes = {
  memberId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditMemberForm;
