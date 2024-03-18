/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import axios from "axios";

const ViewMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/members/${id}`
        );
        console.log("Response Data:", response.data);
        setMember(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Card>
        <h1>View Record</h1>
        {member ? (
          <div>
            <p>ID: {member._id}</p>
            <p>Name: {member.givenName}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </>
  );
};

export default ViewMember;
