const axios = require('axios')
const router = require('express').Router()

// Search for location forecast
// by location id
router.get('/:id', (req, res, next) => {
  const locationId = req.params.id

  axios
    .get(`https://www.metaweather.com/api/location/${locationId}`)
    .then(response => res.send(response.data))
    .catch(err => next(err))
})

module.exports = router
