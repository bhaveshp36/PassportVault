// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Spin } from "antd";
import moment from "moment";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const UpdateVisaForm = ({ visaId, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const initialValues = {
    parentPassport_id: formData.parentPassport_id,
    passportNo: formData.passportNo,
    country: formData.country,
    visaType: formData.visaType,
    category: formData.category,
    noOfEntry: formData.noOfEntry,
    visaNo: formData.visaNo,
    validFrom: formData.validFrom ? moment(formData.validFrom) : null,
    validUntil: formData.validUntil ? moment(formData.validUntil) : null,
    duration: formData.duration,
    annotation: formData.annotation,
    visaApplication_id: formData.visaApplication_id,
    documents: formData.documents,
    otherInfo: formData.otherInfo,
  };

  const token = Cookies.get("token");

  useEffect(() => {
    console.log("Fetching visa data...");
    console.log("Visa ID:", visaId);
    // Fetch existing visa data by visaId from backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/visas/${visaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { validFrom, validUntil, ...restData } = response.data;
        setFormData({
          ...restData,
          validFrom: validFrom ? moment(validFrom) : null,
          validUntil: validUntil ? moment(validUntil) : null,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visa data:", error);
        setLoading(false);
      });
  }, [visaId, token]);

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
      {/* Parent Passport ID */}
      <Form.Item
        label="Parent Passport ID"
        name="parentPassport_id"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      {/* Passport No */}
      <Form.Item
        label="Passport No"
        name="passportNo"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      {/* Country */}
      <Form.Item label="Country" name="country" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {/* Visa Type */}
      <Form.Item label="Visa Type" name="visaType" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {/* Category */}
      <Form.Item label="Category" name="category" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {/* No of Entry */}
      <Form.Item
        label="No of Entry"
        name="noOfEntry"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      {/* Visa No */}
      <Form.Item label="Visa No" name="visaNo" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {/* Valid From */}
      <Form.Item
        label="Valid From"
        name="validFrom"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      {/* Valid Until */}
      <Form.Item
        label="Valid Until"
        name="validUntil"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      {/* Duration */}
      <Form.Item label="Duration" name="duration" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      {/* Annotation */}
      <Form.Item
        label="Annotation"
        name="annotation"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      {/* Visa Application ID */}
      <Form.Item label="Visa Application ID" name="visaApplication_id">
        <Input />
      </Form.Item>
      {/* Documents */}
      <Form.Item label="Documents" name="documents">
        <Input.TextArea rows={4} />
      </Form.Item>
      {/* Other Info */}
      <Form.Item label="Other Info" name="otherInfo">
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

UpdateVisaForm.propTypes = {
  visaId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateVisaForm;
