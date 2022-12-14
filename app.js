import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import HttpError from './models/http-error.js'
import { giftcardRouter, loginRouter, menuRouter } from './routes/index.js'

const PORT = 3001
const app = express()

// Error handling Middleware function for logging the error message
const errorLogger = (error, request, response, next) => {
  console.log(`error ${error.message}`)
  next(error) // calling next middleware
}

// Error handling Middleware function reads the error message
// and sends back a response in JSON format
const errorResponder = (error, request, response, next) => {
  const status = error.status || 400
  response.status(status).send({ message: error.message })
}
app.use(errorLogger)
app.use(errorResponder)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(loginRouter)
app.use(menuRouter)
app.use(giftcardRouter)

app.use((req, res) => {
  const error = new HttpError('Could not find route.', 404)
  throw error
})

// app.use((error, req, res, next) => {
//   res
//     .status(error.code || 500)
//     .send({ message: error.message || 'Unknown error happened.' })
// })

app.listen(PORT)
