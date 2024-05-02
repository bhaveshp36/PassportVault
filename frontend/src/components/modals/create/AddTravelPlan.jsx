// eslint-disable-next-line no-unused-vars
import React from "react";
import { Form, Input, DatePicker, Button } from "antd";

const { RangePicker } = DatePicker;

const AddTravelDetail = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    // You can handle form submission logic here
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="Travel Plan Name"
        name="travelPlanName"
        rules={[{ required: true, message: "Please enter travel plan name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Please enter country" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Date of Departure and Arrival"
        name="dateRange"
        rules={[{ required: true, message: "Please select date range" }]}
      >
        <RangePicker />
      </Form.Item>

      {/* Add more form items for other fields */}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTravelDetail;
