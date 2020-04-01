import React from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import { CircularLoader as Loader } from '../Loaders'
import { useProtectRoute } from '../../hooks'
import { getSummary } from '../../actions/companyActions'
import { DashboardInt } from '../../utils/int'
import { selectTrainings } from '../../utils/selectors'

const Dashboard = () => {
  useProtectRoute([getSummary()])

  const { loading: isSummaryLoading } = useSelector(
    state => state.company.summary
  )
  const lang = useSelector(state => state.controls.lang.value)
  const data = useSelector(selectTrainings)

  const isData = data.length !== 0
  if (!isData || isSummaryLoading) return <Loader />

  const { trainings } = DashboardInt[lang]

  return (
    <>
      <h3>{trainings}</h3>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </>
  )
}

export default Dashboard
