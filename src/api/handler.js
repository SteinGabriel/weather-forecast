const BASE_URL = 'https://www.metaweather.com/'

export default (apiHandler = {
  getLocation(locationName) {
    locationName = 'london'
    if (locationName) {
      const URL = `${BASE_URL}api/location/search/?query=${locationName}`
      try {
        fetch(locationName)
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(err => new Error('Location not found'))
      } catch (error) {
        console.warn(error)
      }
    }
  },
  getLocationForecast(locationId) {},
  getWeatherStateIcon(stateId) {}
})
