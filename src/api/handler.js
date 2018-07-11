const BASE_URL = 'https://www.metaweather.com/'

const apiHandler = {
  getLocation(locationName) {
    if (locationName) {
      fetch('https://www.metaweather.com/api/location/search/?query=london')
        .then(response => response.json())
        .then(data => console.log(data))
    }
  },
  getLocationForecast(locationId) {},
  getWeatherStateIcon(stateId) {}
}

export default apiHandler
