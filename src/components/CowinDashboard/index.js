import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const status = {
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {dataFetchingState: status.inprogress, vaccinationData: ''}

  componentDidMount() {
    this.getVaccinationData()
  }

  loader = () => (
    <div className="loaderContainer">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </div>
  )

  formatedData = data => {
    console.log(data)
    const format = data.map(item => ({
      vaccineDate: item.vaccine_date,
      dose1: item.dose_1,
      dose2: item.dose_2,
    }))
    return format
  }

  getVaccinationData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.formatedData(data.last_7_days_vaccination)
      data.last_7_days_vaccination = updatedData
      this.setState({vaccinationData: data, dataFetchingState: status.success})
    } else {
      this.setState({dataFetchingState: status.failure})
    }
  }

  renderResult = () => {
    const {dataFetchingState} = this.state
    switch (dataFetchingState) {
      case status.inprogress:
        return this.loader()
      case status.success:
        return this.successRender()
      case status.failure:
        return this.failureRender()
      default:
        return null
    }
  }

  failureRender = () => (
    <div className="loaderContainer">
      <img
        className="failureImg"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  successRender = () => {
    const {vaccinationData} = this.state
    console.log(vaccinationData)
    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={vaccinationData.last_7_days_vaccination}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationData.vaccination_by_gender}
        />
        <VaccinationByAge
          vaccinationByAgeDetails={vaccinationData.vaccination_by_age}
        />
      </>
    )
  }

  render() {
    return (
      <div className="CowinDashboardContainer">
        <div className="headingContainer">
          <img
            className="logoImg"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          />
          <h1 className="logoHeading">Co-WIN</h1>
        </div>
        <h1 className="normalHeading">CoWIN Vaccination in India</h1>
        {this.renderResult()}
      </div>
    )
  }
}

export default CowinDashboard
