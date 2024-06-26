/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Spin, Modal, message } from "antd";
import axios from "axios";
import { Collapse, Descriptions } from "antd";
import Cookies from "js-cookie";

import AddVisa from "../create/AddVisa";
import AddPassport from "../create/AddPassport";
import UpdatePassport from "../update/UpdatePassport";
import UpdateVisa from "../update/UpdateVisa";

const ViewMember = () => {
  const { id } = useParams();

  const [member, setMember] = useState({});
  const [passport, setPassport] = useState([]);
  const [visa, setVisa] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandIconPosition, setExpandIconPosition] = useState("start");

  const token = Cookies.get("token");

  const handlePassportDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Passport?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/passports/${id}`
          );
          // Refresh the page or fetch the data again here after deletion
          message.success("Passport Deleted Successfully");
        } catch (error) {
          message.error("Error Deleting Passport");
          console.error(error);
        }
      },
    });
  };

  const handleVisaDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Visa?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/visas/${id}`);
          // Refresh the page or fetch the data again here after deletion
          message.success("Visa Deleted Successfully");
        } catch (error) {
          message.error("Error Deleting Visa");
          console.error(error);
        }
      },
    });
  };

  const handleAddPassport = (parent_id) => {
    Modal.info({
      title: "Add New Passport",
      content: <AddPassport />,
      onOk: () => {
        Modal.destroyAll();
      },
      width: "60vw",
      closable: true,
      okText: "Close",
    });
  };

  const handleAddVisa = (parent_id) => {
    Modal.info({
      title: "Add New Visa",
      content: <AddVisa />,
      onOk: () => {
        Modal.destroyAll();
      },
      width: "60vw",
      closable: true,
      okText: "Close",
    });
  };

  const handleEditPassport = (item) => {
    Modal.info({
      title: "Edit Passport",
      content: (
        <UpdatePassport
          passportId={item._id}
          onSubmit={(data) => {
            console.log(data);
            axios
              .put(
                `${import.meta.env.VITE_BACKEND_URL}/passports/${item._id}`,
                data
              )
              .then((response) => {
                console.log("Passport Record Updated: ", response.data);
                message.success("Passport Record Updated Successfully");
                Modal.destroyAll();
              })
              .catch((error) => {
                console.error("Error in Updating Passport Record", error);
                message.error("Error Updating Passport Record");
              });
          }}
        />
      ),
      onOk: () => {
        Modal.destroyAll();
      },
      width: "60vw",
      closable: true,
      okText: "Close",
    });
  };

  const handleEditVisa = (item) => {
    Modal.info({
      title: "Edit Visa",
      content: (
        <UpdateVisa
          visaId={item._id}
          onSubmit={(data) => {
            console.log(data);
            axios
              .put(
                `${import.meta.env.VITE_BACKEND_URL}/visas/${item._id}`,
                data
              )
              .then((response) => {
                console.log("Visa Record Updated: ", response.data);
                message.success("Visa Record Updated Successfully");
                Modal.destroyAll();
              })
              .catch((error) => {
                console.error("Error in Updating Visa Record", error);
                message.error("Error Updating Visa Record");
              });
          }}
        />
      ),
      onOk: () => {
        Modal.destroyAll();
      },
      width: "60vw",
      closable: true,
      okText: "Close",
    });
  };

  const genPassportExtra = (item) => (
    <>
      <span>
        <a
          onClick={(event) => {
            console.log("getExtra:Clicked", event.altKey);
            console.log("Item:", item);
            handleEditPassport(item);
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
          }}
        >
          Edit
        </a>
      </span>
      <span style={{ marginLeft: "10px" }}>
        <a
          onClick={(event) => {
            console.log("getExtra:Clicked", event.altKey);
            console.log("Item:", item);
            handlePassportDelete(item._id);
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
          }}
        >
          Delete
        </a>
      </span>
    </>
  );

  const genVisaExtra = (item) => (
    <>
      <span>
        <a
          onClick={(event) => {
            console.log("getExtra:Clicked", event.altKey);
            console.log("Item:", item);
            handleEditVisa(item);
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
          }}
        >
          Edit
        </a>
      </span>
      <span style={{ marginLeft: "10px" }}>
        <a
          onClick={(event) => {
            console.log("getExtra:Clicked", event.altKey);
            console.log("Item:", item);
            handleVisaDelete(item._id);
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
          }}
        >
          Delete
        </a>
      </span>
    </>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const memberResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/members/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Member Response Data:", memberResponse.data);
        setMember(memberResponse.data);

        const passportResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/passports-by-parent/${memberResponse.data._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Passport Response Data:", passportResponse.data);
        setPassport(passportResponse.data);

        const visaPromises = passportResponse.data.map((passport) =>
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/visa-by-passport/${passport._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );

        const visaResponses = await Promise.all(visaPromises);

        console.log("Visa Response Data:", visaResponses);

        const visas = visaResponses.map((response) => response.data);
        setVisa(visas);
        console.log("Visas Data:", visa);
        console.log("Data fetched successfully!");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <Spin tip="Loading..." size="large" fullscreen>
        Loading...
      </Spin>
    );
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

  const passportItems = passport.map((item, index) => {
    const visaItems = visa[index].map((item, index) => {
      const visaDescriptionItems = [
        {
          key: 1,
          label: "Parent Passport ID",
          children: item.parentPassport_id,
        },
        {
          key: 2,
          label: "Passport No",
          children: item.passportNo,
        },
        {
          key: 3,
          label: "Country",
          children: item.country,
        },
        {
          key: 4,
          label: "Visa Type",
          children: item.visaType,
        },
        {
          key: 5,
          label: "Category",
          children: item.category,
        },
        {
          key: 6,
          label: "Number of Entry",
          children: item.noOfEntry,
        },
        {
          key: 7,
          label: "Visa No",
          children: item.visaNo,
        },
        {
          key: 8,
          label: "Valid From",
          children: item.validFrom
            ? new Date(item.validFrom).toISOString().split("T")[0]
            : item.validFrom,
        },
        {
          key: 9,
          label: "Valid Until",
          children: item.validUntil
            ? new Date(item.validUntil).toISOString().split("T")[0]
            : item.validUntil,
        },
        {
          key: 10,
          label: "Duration",
          children: item.duration,
        },
        {
          key: 11,
          label: "Annotation",
          children: item.annotation,
        },
        {
          key: 12,
          label: "Visa Application ID",
          children: item.visaApplication_id,
        },
        {
          key: 13,
          label: "Documents",
          children: item.documents,
        },
        {
          key: 14,
          label: "Other Info",
          children: item.otherInfo,
        },
      ];

      return {
        key: index,
        label: `${item.country} | ${item.visaNo} | ${item.validUntil ? new Date(item.validUntil).toISOString().split("T")[0] : item.validUntil}`,
        children: (
          <>
            <Descriptions
              column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
              bordered
              title="Visa Details"
              items={visaDescriptionItems}
            />
          </>
        ),
        extra: genVisaExtra(item),
      };
    });

    const passportDescriptionItems = [
      {
        key: 1,
        label: "Country",
        children: item.country,
      },
      {
        key: 2,
        label: "Passport No",
        children: item.passportNo,
      },
      {
        key: 3,
        label: "Date of Issue",
        children: item.dateOfIssue
          ? new Date(item.dateOfIssue).toISOString().split("T")[0]
          : item.dateOfIssue,
      },
      {
        key: 4,
        label: "Date of Expiry",
        children: item.dateOfExpiry
          ? new Date(item.dateOfExpiry).toISOString().split("T")[0]
          : item.dateOfExpiry,
      },
      {
        key: 5,
        label: "Place of Issue",
        children: item.placeOfIssue,
      },
      {
        key: 6,
        label: "File No",
        children: item.fileNo,
      },
      {
        key: 7,
        label: "Previous Passport No",
        children: item.previousPassportNo,
      },
      {
        key: 8,
        label: "Previous Passport Date of Issue",
        children: item.previousPassportDateOfIssue
          ? new Date(item.previousPassportDateOfIssue)
              .toISOString()
              .split("T")[0]
          : item.previousPassportDateOfIssue,
      },
      {
        key: 9,
        label: "Previous Passport Place of Issue",
        children: item.previousPassportPlaceOfIssue,
      },
      {
        key: 10,
        label: "Cover Page",
        children: item.documents.coverPage,
      },
      {
        key: 11,
        label: "First Page",
        children: item.documents.firstPage,
      },
      {
        key: 12,
        label: "Last Page",
        children: item.documents.lastPage,
      },
      {
        key: 13,
        label: "PDF",
        children: item.documents.pdf,
      },
    ];

    return {
      key: index,
      label: `${item.country}     |     ${item.passportNo}      |     ${item.dateOfExpiry ? new Date(item.dateOfExpiry).toISOString().split("T")[0] : item.dateOfExpiry}`,
      children: (
        <>
          <Descriptions
            column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
            bordered
            title="Passport Details"
            items={passportDescriptionItems}
          />
          <br></br>
          <Card
            title="Visas"
            extra={
              <Button type="primary" onClick={handleAddVisa}>
                Add New Visa
              </Button>
            }
          >
            {visaItems && visaItems.length > 0 ? (
              <Collapse
                defaultActiveKey={["0"]}
                onChange={onChange}
                expandIconPosition={expandIconPosition}
                accordion
                items={visaItems}
              />
            ) : (
              <h3>No visas</h3>
            )}{" "}
          </Card>
        </>
      ),
      extra: genPassportExtra(item),
    };
  });

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
      children: member.birthDate
        ? new Date(member.birthDate).toISOString().split("T")[0]
        : member.birthDate,
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
      children: member.joiningDate
        ? new Date(member.joiningDate).toISOString().split("T")[0]
        : member.joiningDate,
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

  return (
    <>
      <Card
        title={member.givenName + " " + member.surname + "     " + member._id}
      >
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
            <Spin tip="Loading..." size="large">
              Loading...
            </Spin>
          )}
        </div>
        <Card
          title="Passports"
          extra={
            <Button type="primary" onClick={handleAddPassport}>
              Add New Passport
            </Button>
          }
        >
          {passportItems && passportItems.length > 0 ? (
            <Collapse
              title="Passports"
              defaultActiveKey={["0"]}
              onChange={onChange}
              expandIconPosition={expandIconPosition}
              items={passportItems}
            />
          ) : (
            <h3>No Passports</h3>
          )}
        </Card>
      </Card>
    </>
  );
};

export default ViewMember;
