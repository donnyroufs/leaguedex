import React from "react";
import { useQuery } from "react-query";
import { getToken } from "../../helpers/getToken";
import Dashboard from "./Dashboard";
import { Styles } from "./Dashboard.styles";
import Helmet from "react-helmet";

const fetchUsers = async () => {
  const response = await fetch("/api/user", {
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
      <Helmet>
        <title>Leaguedex - Dashboard</title>
      </Helmet>
      <Dashboard
        status={response.status}
        data={(response && response.data) || []}
      />
    </Styles>
  );
};

export default DashboardContainer;
