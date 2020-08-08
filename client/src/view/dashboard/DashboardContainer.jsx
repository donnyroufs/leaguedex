import React from "react";
import { useQuery } from "react-query";
import { getToken } from "../../helpers/getToken";
import Dashboard from "./Dashboard";
import { Styles } from "./Dashboard.styles";

const fetchUsers = async () => {
  const response = await fetch("/user", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: getToken(),
    },
    credentials: "include",
  });
  return response.json();
};

const DashboardContainer = () => {
  const response = useQuery("users", fetchUsers);
  return (
    <Styles>
      <Dashboard
        status={response.status}
        data={(response && response.data) || []}
      />
    </Styles>
  );
};

export default DashboardContainer;
