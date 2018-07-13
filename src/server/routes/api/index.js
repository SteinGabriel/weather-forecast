const router = require('express').Router()

router.use('/forecast', require('./forecast'))
router.use('/location', require('./location'))

module.exports = router
