import * as dotenv from 'dotenv'
import express from 'express'
import { menuRouter } from './routes/index.js'

dotenv.config()

const PORT = 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(menuRouter)

app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || 'Unknown error happened.' })
})

app.listen(PORT)
