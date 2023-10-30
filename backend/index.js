const express = require('express');
const { StatusCodes: { BAD_GATEWAY } } = require('http-status-codes');
require('dotenv').config();
require('./connection/Connection.js');
const cors = require('cors')
const PersonRoutes=require('./routes/Routes.js')



const app = express()
app.use(express.json()) // for parsing application/json
app.use(cors())

app.use('/api/person',PersonRoutes)

app.use('*', (request, response, next) => {

    try {
        response.status(BAD_GATEWAY).json({ error: true, message: `Page Not Found` })
    } catch (error) {
        next(error)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
