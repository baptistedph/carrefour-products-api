const express = require('express')
const productsController = require('../controllers/productsController')

const productsRouter = express.Router()

productsRouter.get('/products', productsController.products_get)

module.exports = productsRouter
