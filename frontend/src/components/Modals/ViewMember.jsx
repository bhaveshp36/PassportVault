/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";

const ViewMember = () => {
  const { id } = useParams();
  return (
    <>
      <Card>
        <h1>View Record</h1>
        <p>{id}</p>
      </Card>
    </>
  );
};
export default ViewMember;
