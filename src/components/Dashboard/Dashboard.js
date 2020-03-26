import React from "react";
import { useProtectRoute } from '../../hooks'


const Dashboard = () => {
  useProtectRoute()

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
