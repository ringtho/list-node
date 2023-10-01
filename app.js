require('dotenv').config()
const express = require('express')
const app = express()


app.get('/api/v1/hello', (req, res) => {
    res.send('Hello There')
})

const PORT = process.env.NODE_PORT || 5050
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})