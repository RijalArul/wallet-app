const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
