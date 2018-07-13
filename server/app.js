const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const errorHandler = require('errorhandler')

const isProduction = process.env.NODE_ENV === 'production'
const app = express()

app.use(cors())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: 'WeatherForecast',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
)

if (!isProduction) {
  app.use(errorHandler())
}

app.set('port', process.env.PORT || 5000)

app.use(require('./routes'))

const server = app.listen(app.get('port'), () =>
  console.log(`Server started on http://localhost:${app.get('port')}! :)`)
)
