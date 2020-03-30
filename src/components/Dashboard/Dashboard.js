import React from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { useProtectRoute } from "../../hooks";
import { getSummaryFetch } from "../../actions/companyActions";
import { DashboardInt } from "../../utils/int";

const Dashboard = () => {
  const summary = useSelector(state => state.company.summary);
  const lang = useSelector(state => state.controls.lang.value);

  const { trainings } = DashboardInt[lang];
  const isSummary = Object.keys(summary).length !== 0;

  useProtectRoute([getSummaryFetch()]);

  const renderLineChart = () => {
    if (!isSummary) return null;

    const data = summary.Trainings.map(item => ({
      name: item.Name,
      uv: item.Progress,
      pv: 1400,
      amt: 2400
    }));
    return (
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    );
  };

  return (
    <div>
      <h3>{trainings}</h3>
      {renderLineChart()}
    </div>
  );
};

export default Dashboard;
