const axios = require('axios')
const router = require('express').Router()

// Search for location information
// by location name
router.get('/:name', (req, res, next) => {
  const locationName = req.params.name
  const url = `https://www.metaweather.com/api/location/search/?query=${locationName}`

  axios
    .get(url)
    .then(response => res.send(response.data))
    .catch(err => next(err))
})

module.exports = router
