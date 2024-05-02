// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Spin } from "antd";
import moment from "moment";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const UpdatePassportForm = ({ passportId, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const initialValues = {
    parentMember_id: formData.parentMember_id,
    country: formData.country,
    passportNo: formData.passportNo,
    dateOfIssue: formData.dateOfIssue ? moment(formData.dateOfIssue) : null,
    dateOfExpiry: formData.dateOfExpiry ? moment(formData.dateOfExpiry) : null,
    placeOfIssue: formData.placeOfIssue,
    fileNo: formData.fileNo,
    previousPassportNo: formData.previousPassportNo,
    previousPassportDateOfIssue: formData.previousPassportDateOfIssue
      ? moment(formData.previousPassportDateOfIssue)
      : null,
    previousPassportPlaceOfIssue: formData.previousPassportPlaceOfIssue,
    documents: {
      coverPage: formData.documents?.coverPage,
      firstPage: formData.documents?.firstPage,
      lastPage: formData.documents?.lastPage,
      pdf: formData.documents?.pdf,
    },
    otherInfo: formData.otherInfo,
  };

  const token = Cookies.get("token");

  useEffect(() => {
    console.log("Fetching passport data...");
    console.log("Passport ID:", passportId);
    // Fetch existing passport data by passportId from backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/passports/${passportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const {
          dateOfIssue,
          dateOfExpiry,
          previousPassportDateOfIssue,
          ...restData
        } = response.data;
        setFormData({
          ...restData,
          dateOfIssue: dateOfIssue ? moment(dateOfIssue) : null,
          dateOfExpiry: dateOfExpiry ? moment(dateOfExpiry) : null,
          previousPassportDateOfIssue: previousPassportDateOfIssue
            ? moment(previousPassportDateOfIssue)
            : null,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching passport data:", error);
        setLoading(false);
      });
  }, [passportId, token]);

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  if (loading) {
    return (
      <Spin tip="Loading..." size="large">
        Loading...
      </Spin>
    );
  }

  return (
    <Form
      initialValues={initialValues}
      onValuesChange={handleFormChange}
      onFinish={handleSubmit}
    >
      {/* Parent Member ID */}
      <Form.Item
        label="Parent Member ID"
        name="parentMember_id"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      {/* Country */}
      <Form.Item label="Country" name="country" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {/* Passport Number */}
      <Form.Item
        label="Passport Number"
        name="passportNo"
        rules={[{ required: true }, { type: "string", max: 10 }]}
      >
        <Input />
      </Form.Item>
      {/* Date of Issue */}
      <Form.Item
        label="Date of Issue"
        name="dateOfIssue"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      {/* Date of Expiry */}
      <Form.Item
        label="Date of Expiry"
        name="dateOfExpiry"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      {/* Place of Issue */}
      <Form.Item
        label="Place of Issue"
        name="placeOfIssue"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      {/* File Number */}
      <Form.Item
        label="File Number"
        name="fileNo"
        rules={[{ required: true }, { type: "string", max: 10 }]}
      >
        <Input />
      </Form.Item>
      {/* Previous Passport Number */}
      <Form.Item
        label="Previous Passport Number"
        name="previousPassportNo"
        rules={[{ type: "string", max: 10 }]}
      >
        <Input />
      </Form.Item>
      {/* Previous Passport Date of Issue */}
      <Form.Item
        label="Previous Passport Date of Issue"
        name="previousPassportDateOfIssue"
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      {/* Previous Passport Place of Issue */}
      <Form.Item
        label="Previous Passport Place of Issue"
        name="previousPassportPlaceOfIssue"
      >
        <Input />
      </Form.Item>
      {/* Documents */}
      <Form.Item label="Documents">
        {/* Cover Page */}
        <Form.Item
          name={["documents", "coverPage"]}
          label="Cover Page"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
        {/* First Page */}
        <Form.Item
          name={["documents", "firstPage"]}
          label="First Page"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
        {/* Last Page */}
        <Form.Item
          name={["documents", "lastPage"]}
          label="Last Page"
          style={{ display: "block" }}
        >
          <Input />
        </Form.Item>
        {/* PDF */}
        <Form.Item
          name={["documents", "pdf"]}
          label="PDF"
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

UpdatePassportForm.propTypes = {
  passportId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdatePassportForm;
