import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useProtectRoute } from "../../hooks";
import { getSummaryFetch } from '../../actions/company_actions';

const Dashboard = () => {
  const [canLoad, setCanLoad] = useState(null);
  useProtectRoute(setCanLoad);

  const dispatch = useDispatch();
  const summary = useSelector(state => state.company.summary)
  const isSummary = Object.keys(summary).length !== 0 

  useEffect(() => {
    if (canLoad && !isSummary) {
      console.log(1111111);
      dispatch(getSummaryFetch())
    }
  }, [canLoad]);

  const renderSummary = () => {
    if (!isSummary) return null;
    return (
      <div>
        {summary.Trainings.map(item => (
          <div>
            <h3>{item.Name}</h3>
            <h3>{item.Progress}</h3>
          </div>
        ))}
      </div>
    )
  }

  const renderLineChart = () => {
    if (!isSummary) return null;

    const data = summary.Trainings.map(item => ({name: item.Name, uv: item.Progress, pv: 1400, amt: 2400}))
    console.log(data)
    return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  )};

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Trainings Line Chart</h3>
      {renderLineChart()}
    </div>
  );
};

export default Dashboard;
