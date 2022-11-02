import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import HttpError from './models/http-error.js'
import { giftcardRouter, loginRouter, menuRouter } from './routes/index.js'

const PORT = 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(loginRouter)
app.use(menuRouter)
app.use(giftcardRouter)

app.use((req, res) => {
  const error = new HttpError('Could not find route.', 404)
  throw error
})

app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || 'Unknown error happened.' })
})

app.listen(PORT)
