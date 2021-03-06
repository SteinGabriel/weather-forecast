import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './App.css'
import axios from 'axios'
import {
  PageWrapper,
  InputWrapper,
  SearchInput,
  ResultList,
  ResultMessage,
  ForecastContainer,
  ForecastCard,
  CardPrimary,
  CardSecundary,
  WeatherStateRow,
  Icon
} from './style'

const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationName: null,
      selectedLocationId: null,
      locationsData: [],
      forecastData: []
    }
  }

  onLocationChange = e => {
    const locationName = e.target.value
    this.setState({ locationName }, () => this.getLocationsData())
  }

  getLocationsData() {
    const locationName = this.state.locationName
    // Results should apper after the third typed letter
    if (String(locationName).length > 2) {
      const url = `/api/location/${locationName}`

      axios
        .get(url)
        .then(response => this.setLocationsData(response.data))
        .catch(err => console.warn(err))
    } else {
      this.clearLocationsData()
      this.clearForecastData()
    }
  }

  setLocationsData(data) {
    console.log(JSON.stringify(data))
    this.setState({ locationsData: data }, () =>
      console.log(
        'locationsData => ' + JSON.stringify(this.state.locationsData)
      )
    )
  }

  clearLocationsData() {
    this.setState({ locationsData: [] })
  }

  clearForecastData() {
    this.setState({ forecastData: [] })
  }

  onCityPressed(locationId, locationName) {
    if (locationId) {
      this.clearLocationsData()
      this.setLocationName(locationName)
      this.getLocationForecast(locationId)
    }
  }

  setLocationName(locationName) {
    this.setState({ locationName })
  }

  getLocationForecast(locationId) {
    const url = `/api/forecast/${locationId}`

    fetch(url)
      .then(response => response.json())
      .then(data => this.setCityForecastData(data))
  }

  setCityForecastData(data) {
    this.setState({ forecastData: data.consolidated_weather })
  }

  // This way the message under the search input is built dynamically
  // following the input's behaviour
  //
  // If a location's name is typed it returns the number of results
  // If a location's forecast data exists, that means that the user already
  // searched for a location, so it returns the message: 5-day weather forecast for {location name}
  getResultMessage() {
    let message
    if (this.state.locationsData.length > 0) {
      const count = this.state.locationsData.length
      message = `search results (${count})`
    } else if (this.state.forecastData.length > 0) {
      const locationName = this.state.locationName
      message = `5-day weather forecast for ${locationName}`
    } else {
      message = ''
    }
    return message
  }

  // Returns the day of the week (Mon, Tue, Wed...)
  getDayName(d) {
    const date = new Date(d)
    const dayName = String(date).split(' ')[0]
    return dayName
  }

  // Returns the date format mm/dd
  getDayDate(d) {
    const date = new Date(d)
    const month = String(date).split(' ')[1]
    const day = String(date).split(' ')[2]
    return month + '/' + day
  }

  getFormattedTemperature(temp) {
    return Math.floor(temp) + '°C'
  }

  render() {
    return (
      <PageWrapper>
        <InputWrapper>
          <TextField
            name="locationName"
            label="Location"
            margin="normal"
            value={this.state.locationName || ''}
            onChange={this.onLocationChange.bind(this)}
          />
        </InputWrapper>
        <ResultMessage>{this.getResultMessage()}</ResultMessage>
        <ResultList>
          {this.state.locationsData.map(location => {
            const locationName = location.title
            const locationId = location.woeid

            return (
              <Button
                key={location.woeid}
                onClick={() => this.onCityPressed(locationId, locationName)}
                className="location-button"
              >
                {locationName}
              </Button>
            )
          })}
        </ResultList>
        <ForecastContainer>
          {this.state.forecastData.slice(0, 5).map(forecast => {
            const weatherState = forecast.weather_state_name
            const iconName = forecast.weather_state_abbr
            const iconUrl = `https://www.metaweather.com/static/img/weather/${iconName}.svg`
            const dayName = this.getDayName(forecast.applicable_date)
            const dayDate = this.getDayDate(forecast.applicable_date)
            const maxDegrees = this.getFormattedTemperature(forecast.max_temp)
            const minDegrees = this.getFormattedTemperature(forecast.min_temp)

            return (
              <ForecastCard key={forecast.id}>
                <CardPrimary>{dayName}</CardPrimary>
                <CardSecundary>{dayDate}</CardSecundary>
                <WeatherStateRow>
                  <CardSecundary>{weatherState}</CardSecundary>
                  <Icon>
                    <img src={iconUrl} alt="Weather State Icon" />
                  </Icon>
                </WeatherStateRow>
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
