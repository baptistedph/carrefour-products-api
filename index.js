require('dotenv').config()

const express = require('express')
const productsRouter = require('./routes/productsRouter')

const app = express()

app.use(productsRouter)

app.get('/', (req, res) => {
  res.send('No endpoint here')
})

app.listen(process.env.API_PORT, () =>
  console.log(`Listening on port ${process.env.API_PORT}`),
)
