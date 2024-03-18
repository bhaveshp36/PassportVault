/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import axios from "axios";

const ViewTravelPlan = () => {
  const { id } = useParams();
  const [record, setRecord] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/travel-plans/${id}`
        );
        console.log("Response Data:", response.data);
        setRecord(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Card>
        <h1>View Travel Plan</h1>
        {record ? (
          <div>
            <p>ID: {record._id}</p>
            <p>Name: {record.travelPlanName}</p>
            <p>Country: {record.country}</p>
            <p>Date of Departure: {record.dateOfDeparture}</p>
            <p>Date of Arrival: {record.dateOfArrival}</p>
            
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </>
  );
};

export default ViewTravelPlan;
