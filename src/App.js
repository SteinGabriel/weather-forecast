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
  margin-right: 10px;
  border: 1px solid gray;
`

const CardTitle = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  justify-content: center;
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
            return (
              <Button
                key={location.woeid}
                onClick={() => this.onCityPressed(location.woeid)}
                className="location-button"
              >
                {location.title}
              </Button>
            )
          })}
        </ResultList>
        <ForecastContainer>
          {this.state.forecastData.map(forecast => {
            return <ForecastCard key={forecast.id} />
          })}
        </ForecastContainer>
      </PageWrapper>
    )
  }
}

export default App
