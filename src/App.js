import React, { Component } from 'react'
import apiHandler from './api/handler'

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

  componentDidMount() {
    // this.getLocationsData('london')
    // this.getCityForecast(44418)
    this.getStateIcon('hr')
  }

  getLocationsData(locationName) {
    fetch(
      `https://www.metaweather.com/api/location/search/?query=${locationName}`
    )
      .then(response => response.json())
      .then(data => this.setLocationsData(data))
  }

  setLocationsData(data) {
    this.setState({ locationsData: data })
  }

  getCityForecast(locationId) {
    fetch(`https://www.metaweather.com/api/location/${locationId}`)
      .then(response => response.json())
      .then(data => this.setCityForecastData(data))
  }

  setCityForecastData(data) {
    this.setState({ forecastData: data.consolidated_weather }, () =>
      console.log(this.state.forecastData)
    )
  }

  render() {
    return <div>Hello world</div>
  }
}

export default App
