/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import axios from "axios";
import { Collapse, Descriptions } from "antd";

const ViewMember = () => {

  const { id } = useParams();

  const [member, setMember] = useState({});
  const [passport, setPassport] = useState([]);
  const [visa, setVisa] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandIconPosition, setExpandIconPosition] = useState("start");


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const memberResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/members/${id}`
        );
        console.log("Member Response Data:", memberResponse.data);
        setMember(memberResponse.data);

        const passportResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/passports-by-parent/${memberResponse.data._id}`
        );
        console.log("Passport Response Data:", passportResponse.data);
        setPassport(passportResponse.data);

        const visaPromises = passportResponse.data.map((passport) =>
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/visa-by-passport/${passport._id}`
          )
        );

        const visaResponses = await Promise.all(visaPromises);
        console.log("Visa Response Data:", visaResponses);
        const visas = visaResponses.map((response) => response.data);
        setVisa(visas);
        console.log("Visas Data:", visa);

        console.log("Data fetched successfully!");
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };
  const onChange = (key) => {
    console.log(key);
  };

  const genExtra = () => (
    <>
      <span>
        <a
          onClick={(event) => {
            console.log("getExtra:Clicked", event.altKey);
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
          }}
        >
          Edit
        </a>
      </span>
    </>
  );

  const memberDescriptionItems = [
    {
      key: 1,
      label: "Member Type",
      children: member.memberType,
    },
    {
      key: 2,
      label: "Surname",
      children: member.surname,
    },
    {
      key: 3,
      label: "Given Name",
      children: member.givenName,
    },
    {
      key: 4,
      label: "Birth Date",
      children: member.birthDate,
    },
    {
      key: 5,
      label: "Birth Place",
      children: member.birthPlace,
    },
    {
      key: 6,
      label: "Nationality",
      children: member.nationality,
    },
    {
      key: 7,
      label: "Father's Name",
      children: `${member.fatherName.givenName} ${member.fatherName.surname}`,
    },
    {
      key: 8,
      label: "Mother's Name",
      children: `${member.motherName.givenName} ${member.motherName.surname}`,
    },
    {
      key: 9,
      label: "Spouse's Name",
      children: `${member.spouseName.givenName} ${member.spouseName.surname}`,
    },
    {
      key: 10,
      label: "Education",
      children: (
        <>
          <p>Name of Institute: {member.education.nameOfInstitute}</p>
          <br />
          <p>Course: {member.education.course}</p>
          <p>Year From: {member.education.yearFrom}</p>
          <p>Year To: {member.education.yearTo}</p>
        </>
      ),
    },
    {
      key: 11,
      label: "Joining Date",
      children: member.joiningDate,
    },
    {
      key: 12,
      label: "Address",
      children: (
        <>
          <p>Line 1: {member.address.line1}</p>
          <p>Line 2: {member.address.line2}</p>
          <p>Line 3: {member.address.line3}</p>
        </>
      ),
    },
    {
      key: 13,
      label: "Documents",
      children: (
        <>
          <p>Identity: {member.documents.identity}</p>
          <p>Member Certificate: {member.documents.memberCertificate}</p>
        </>
      ),
    },
  ];

  const itemsNest = visa.map((item, index) => ({
    key: index,
    label: item.visaNo,
    children: <p>{item.validUntil}</p>,
    extra: genExtra(),
  }));

  const items = passport.map((item, index) => {
    const correspondingVisa = itemsNest.find(
      (nestItem) => nestItem.key === item.id
    );

    return {
      key: index,
      label: `${item.passportNo} - ${item.dateOfExpiry}`,
      children: (
        <>
          {correspondingVisa && (
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition={expandIconPosition}
              accordion
              items={[correspondingVisa]}
            />
          )}
          <p>{item.dateOfIssue}</p>
        </>
      ),
      extra: genExtra(),
    };
  });

  return (
    <>
      <Card title={member.givenName + " " + member.surname}>
        <div style={{ display: "grid" }}>
          {member ? (
            <div>
              <Descriptions
                column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                bordered
                title="Member's Details"
                items={memberDescriptionItems}
              />
              <br />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Collapse
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition={expandIconPosition}
          items={items}
        />
      </Card>
    </>
  );
};

export default ViewMember;
