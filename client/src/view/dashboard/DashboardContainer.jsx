import React from "react";
import { useQuery } from "react-query";
import Dashboard from "./Dashboard";
import { Styles } from "./Dashboard.styles";
import { Helmet } from "react-helmet-async";
import makeRequest from "../../helpers/makeRequest";

const fetchUsers = async () => {
  const response = await makeRequest(`/api/user`);
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
