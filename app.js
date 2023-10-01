require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connectDB')

// Routers
const authRouter = require('./routes/users')

// Middlewares
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)


const PORT = process.env.PORT || 5050

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`)
        })
    } catch(error) {
        console.log(error)
    }
}

start()