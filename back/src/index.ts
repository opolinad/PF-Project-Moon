import express from 'express'

import cors from 'cors'

import dotenv from 'dotenv'

import { dbConnect } from './db'
const app = express()

const allRoute = require( './routes/routes')

dotenv.config()

app.use(cors())

app.use(express.json())

app.use('/api',allRoute)

app.listen(3001, ()=> {
    dbConnect()
    console.log('Server on PORT 3001')
})