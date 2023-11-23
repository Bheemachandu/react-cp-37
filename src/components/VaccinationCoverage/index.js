import {BarChart, Bar, XAxis, YAxis, Legend, Tooltip} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationCoverageDetails} = props
  console.log(vaccinationCoverageDetails)

  return (
    <div className="vaccination-by-coverage-container">
      <h1 className="vaccination-by-coverage-heading">Vaccination Coverage</h1>
      <BarChart width={730} height={250} data={vaccinationCoverageDetails}>
        <XAxis dataKey="vaccineDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="dose1" fill="#8884d8" />
        <Bar dataKey="dose2" fill="#82ca9d" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
