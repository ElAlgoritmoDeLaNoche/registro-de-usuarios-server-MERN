require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./config/db')

const authRoutes = require('./routes/auth')

// Database connection
connection()

// Middlewares
app.use(express.json())
app.use(cors())

app.use('/api', authRoutes)

const port = process.env.PORT

app.listen(port, () => console.log(`Server running on port ${port}`))