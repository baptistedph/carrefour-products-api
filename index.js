require('dotenv').config()

const express = require('express')
const productsRouter = require('./routes/productsRouter')

const app = express()

app.use(productsRouter)

app.get('/', (req, res) => {
  res.send('No endpoint here')
})

const port = process.env.PORT || process.env.PORT_API

app.listen(port, () => console.log(`Listening on port ${port}`))
