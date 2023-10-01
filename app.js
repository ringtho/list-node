require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connectDB')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// Routers
const authRouter = require('./routes/users')
const itemsRouter = require('./routes/items')

// Middlewares
const authenticateUser = require('./middleware/authentication')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

// Extra security Middlewares
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
)
app.use(cors())
app.use(helmet())
app.use(xss())

app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/items', authenticateUser, itemsRouter)

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