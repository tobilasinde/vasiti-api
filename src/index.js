import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'

import express, { json, urlencoded } from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'

// Set up the express app
const app = express()

//Enable cors
app.use(cors({ origin: true }))

// Parse incoming requests data
app.use(json())
app.use(urlencoded({ extended: false }))

//Application Routes
app.use(routes)

// Handle Application Errors
app.use(errorHandler)
export default app
