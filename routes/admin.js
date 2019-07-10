const express = require('express')

const productsController = require('../controllers/product')

const route = express.Router()

route.get('/add-product',productsController.getAddProduct)


route.post('/add-product',productsController.postAddProduct)

module.exports = route