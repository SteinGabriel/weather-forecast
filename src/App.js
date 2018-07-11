import React, { Component } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './App.css'

const PageWrapper = styled.div`
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const InputWrapper = styled.div`
  height: auto;
  width: 100vw;
  display: flex;
  justify-content: center;
`

const SearchInput = styled.input`
  width: 150px;
  height: 20px;
  border-radius: 5px;
`

const ResultList = styled.div`
  width: 150px;
  heght: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ForecastContainer = styled.div`
  width: 90vw;
  margin: 0 auto;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const ForecastCard = styled.div`
  width: 100px;
  height: 95%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin-right: 10px;
  border: 1px solid gray;
`

const CardPrimary = styled.h3`
  width: 100%;
  height: 15px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
const CardSecundary = styled.h5`
  width: 100%;
  height: 15px;
  display: flex;
  color: lightgray;
  justify-content: center;
  margin-bottom: 6px;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationName: null,
      locationsData: [],
      selectedLocationId: null,
      forecastData: []
    }
  }

  onLocationChange = e => {
    const locationName = e.target.value
    this.setState({ locationName }, () => this.getLocationsData())
  }

  getLocationsData() {
    const locationName = this.state.locationName
    if (String(locationName).length > 2) {
      fetch(
        `https://www.metaweather.com/api/location/search/?query=${locationName}`
      )
        .then(response => response.json())
        .then(data => this.setLocationsData(data))
    } else {
      this.clearLocationsData()
    }
  }

  setLocationsData(data) {
    this.setState({ locationsData: data })
  }

  clearLocationsData() {
    this.setState({ locationsData: [] })
  }

  onCityPressed = locationId => {
    if (locationId) {
      this.clearLocationsData()
      this.getLocationForecast(locationId)
    }
  }

  getLocationForecast(locationId) {
    fetch(`https://www.metaweather.com/api/location/${locationId}`)
      .then(response => response.json())
      .then(data => this.setCityForecastData(data))
  }

  setCityForecastData(data) {
    this.setState({ forecastData: data.consolidated_weather })
  }

  getDayName(d) {
    const date = new Date(d)
    const dayName = String(date).split(' ')[0]
    return dayName
  }

  getDayDate(d) {
    const date = new Date(d)
    const month = String(date).split(' ')[1]
    const day = String(date).split(' ')[2]
    return month + '/' + day
  }

  getFormattedTemperature(temp) {
    return Math.floor(temp) + '°'
  }

  render() {
    return (
      <PageWrapper>
        <InputWrapper>
          <TextField
            id="location"
            name="locationName"
            label="Location"
            margin="normal"
            value={this.state.locationName || ''}
            onChange={this.onLocationChange.bind(this)}
          />
        </InputWrapper>
        <ResultList>
          {this.state.locationsData.map(location => {
            const title = location.title
            const locationId = location.woeid

            return (
              <Button
                key={location.woeid}
                onClick={() => this.onCityPressed(locationId)}
                className="location-button"
              >
                {title}
              </Button>
            )
          })}
        </ResultList>
        <ForecastContainer>
          {this.state.forecastData.map(forecast => {
            const dayName = this.getDayName(forecast.applicable_date)
            const dayDate = this.getDayDate(forecast.applicable_date)
            const weatherState = forecast.weather_state_name
            const maxDegrees = this.getFormattedTemperature(forecast.max_temp)
            const minDegrees = this.getFormattedTemperature(forecast.min_temp)

            return (
              <ForecastCard key={forecast.id}>
                <CardPrimary>{dayName}</CardPrimary>
                <CardSecundary>{dayDate}</CardSecundary>
                <CardSecundary>{weatherState}</CardSecundary>
                <CardPrimary>{maxDegrees}</CardPrimary>
                <CardSecundary>{minDegrees}</CardSecundary>
              </ForecastCard>
            )
          })}
        </ForecastContainer>
      </PageWrapper>
    )
  }
}

export default App
