import React, { useState, useEffect } from "react";
import { Divider, Steps } from "antd";
import MainNavbar from "../Common_pages/Main_navbar";

const App = () => {
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    // Fetch status data from API
    fetch("your_api_endpoint_here")
      .then((response) => response.json())
      .then((data) => {
        setStatusData(data);
      })
      .catch((error) => {
        console.error("Error fetching status data:", error);
      });
  }, []);

  return (
    <>
      <MainNavbar />
      <Steps
        progressDot
        current={1}
        status={statusData[0]} // Assuming your API returns an array of status values and you want to use the first one
        items={[
          {
            title: "Pending",
            description: "This is a description."
          },
          {
            title: "Processing",
            description: "This is a description."
          },
          {
            title: "Shipped",
            description: "This is a description."
          },
          {
            title: "Delivered",
            description: "This is a description."
          }
        ]}
      />
      <Divider />
      <Steps
        progressDot
        current={1}
        direction="vertical"
        status={statusData[1]} // Assuming your API returns an array of status values and you want to use the second one
        items={[
          {
            title: "Pending",
            description: "This is a description. This is a description."
          },
          {
            title: "Processing",
            description: "This is a description. This is a description."
          },
          {
            title: "Shipped",
            description: "This is a description. This is a description."
          },
          {
            title: "Delivered",
            description: "This is a description."
          }
        ]}
      />
    </>
  );
};

export default App;
