/* eslint-disable no-unused-vars */
import React from "react";
import { Card } from "antd";
const ViewRecord = (record) => (
  <>
    <Card>
      <h1>View Record</h1>
      <p>{record.givenName}</p>
    </Card>
  </>
);
export default ViewRecord;
