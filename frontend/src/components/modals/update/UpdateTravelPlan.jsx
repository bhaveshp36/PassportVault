/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Spin } from "antd";
import moment from "moment";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const UpdateTravelPlan = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const initialValues = {
    travelPlanName: formData.travelPlanName,
    country: formData.country,
    dateOfDeparture: formData.dateOfDeparture
      ? moment(formData.dateOfDeparture)
      : null,
    dateOfArrival: formData.dateOfArrival
      ? moment(formData.dateOfArrival)
      : null,
    members: formData.members,
    visaApplications_id: formData.visaApplications_id,
    documents: formData.documents,
    otherInfo: formData.otherInfo,
  };

  const token = Cookies.get("token");

  useEffect(() => {
    console.log("Fetching travel plan data...");
    // Fetch existing travel plan data from backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/travel-plans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { dateOfDeparture, dateOfArrival, ...restData } = response.data;
        setFormData({
          ...restData,
          dateOfDeparture: dateOfDeparture ? moment(dateOfDeparture) : null,
          dateOfArrival: dateOfArrival ? moment(dateOfArrival) : null,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching travel plan data:", error);
        setLoading(false);
      });
  }, [token]);

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleSubmit = () => {
    // Handle form submission
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
      {/* Travel Plan Name */}
      <Form.Item
        label="Travel Plan Name"
        name="travelPlanName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      {/* Country */}
      <Form.Item label="Country" name="country" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {/* Date of Departure */}
      <Form.Item
        label="Date of Departure"
        name="dateOfDeparture"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      {/* Date of Arrival */}
      <Form.Item
        label="Date of Arrival"
        name="dateOfArrival"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      {/* Members */}
      <Form.Item label="Members" name="members">
        {/* Render members */}
      </Form.Item>
      {/* Visa Applications */}
      <Form.Item label="Visa Applications" name="visaApplications_id">
        {/* Render visa applications */}
      </Form.Item>
      {/* Documents */}
      <Form.Item label="Documents" name="documents">
        {/* Render documents */}
      </Form.Item>
      {/* Other Information */}
      <Form.Item label="Other Information" name="otherInfo">
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

export default UpdateTravelPlan;
